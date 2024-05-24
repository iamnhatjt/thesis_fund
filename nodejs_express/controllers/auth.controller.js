const bcrypt = require("bcrypt");
const db = require("../db/models");
const responseApi = require("../config/responseApi");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../config/configNodeMailer");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await db.Account.findOne({
      where: { email: normalizedEmail },
    });

    if (user) {
      return res
        .status(400)
        .json(
          responseApi.error({ message: "Email already exists", code: 400 }),
        );
    }

    const hashPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.BCRYPT_ROUNDS),
    );

    const createdAccount = await db.Account.create({
      ...req.body,
      password: hashPassword,
    });

    return res.json(responseApi.success({ data: createdAccount }));
  } catch (err) {
    return res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const signIn = async (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  db.Account.findOne({
    where: {
      email: email,
    },
  })
    .then(async (data) => {
      if (!data) {
        res.status(400).json(responseApi.error("Email not found"));
      } else {
        const check = bcrypt.compareSync(req.body.password, data.password);
        if (check) {
          const token = jwt.sign(data.toJSON(), process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          res.json(
            responseApi.success({
              data: { ...data.toJSON(), tokenAccess: token },
            }),
          );
        } else {
          throw Error("Password incorrect");
        }
      }
    })
    .catch((err) => {
      res.status(500).json(responseApi.error({ message: err.message }));
    });
};

const forgotPassword = async (req, res) => {
  try {
    const emailUser = req.body.email;
    const user = await db.Account.findOne({
      where: {
        email: emailUser,
      },
    });
    if (!user) {
      throw Error("Email not found");
    }

    await sendEmail({
      subject: "QUỸ ĐẦU TƯ - MAKE BY SUNNY TRINH",
      text: `Xin chào ${emailUser}, Mời bạn click vào button phía dưới để cài đặt mật khẩu.`,
      to: emailUser,
      from: process.env.EMAIL,
      html: layoutEmail(
        `${process.env.URL_FRONTEND}/resetPassword?token=${user.password}`,
      ),
    });
    return res.json(responseApi.success({ message: "Email sent" }));
  } catch (err) {
    return res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const user = await db.Account.findOne({
      where: {
        password: token,
      },
    });
    if (!user) {
      throw Error("Token not found");
    }

    const hashPassword = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.BCRYPT_ROUNDS),
    );
    await user.update({
      password: hashPassword,
    });
    res.json(responseApi.success({ message: "Password reset successfully" }));
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const authController = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
};

module.exports = authController;

const layoutEmail = (url) => `
<html lang="en">
<head>
<title>Salted | A Responsive Email Template</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
    .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */
    body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
    table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
    img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

    /* RESET STYLES */
    body{margin:0; padding:0;}
    img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
    table{border-collapse:collapse !important;}
    body{height:100% !important; margin:0; padding:0; width:100% !important;}

    /* iOS BLUE LINKS */
    .appleBody a {color:#68440a; text-decoration: none;}
    .appleFooter a {color:#999999; text-decoration: none;}

    /* MOBILE STYLES */
    @media screen and (max-width: 525px) {

        /* ALLOWS FOR FLUID TABLES */
        table[class="wrapper"]{
          width:100% !important;
        }

        /* ADJUSTS LAYOUT OF LOGO IMAGE */
        td[class="logo"]{
          text-align: left;
          padding: 20px 0 20px 0 !important;
        }

        td[class="logo"] img{
          margin:0 auto!important;
        }

        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
        td[class="mobile-hide"]{
          display:none;}

        img[class="mobile-hide"]{
          display: none !important;
        }

        img[class="img-max"]{
          max-width: 100% !important;
          height:auto !important;
        }

        /* FULL-WIDTH TABLES */
        table[class="responsive-table"]{
          width:100%!important;
        }

        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
        td[class="padding"]{
          padding: 10px 5% 15px 5% !important;
        }

        td[class="padding-copy"]{
          padding: 10px 5% 10px 5% !important;
          text-align: center;
        }

        td[class="padding-meta"]{
          padding: 30px 5% 0px 5% !important;
          text-align: center;
        }

        td[class="no-pad"]{
          padding: 0 0 20px 0 !important;
        }

        td[class="no-padding"]{
          padding: 0 !important;
        }

        td[class="section-padding"]{
          padding: 50px 15px 50px 15px !important;
        }

        td[class="section-padding-bottom-image"]{
          padding: 50px 15px 0 15px !important;
        }

        /* ADJUST BUTTONS ON MOBILE */
        td[class="mobile-wrapper"]{
            padding: 10px 5% 15px 5% !important;
        }

        table[class="mobile-button-container"]{
            margin:0 auto;
            width:100% !important;
        }

        a[class="mobile-button"]{
            width:80% !important;
            padding: 15px !important;
            border: 0 !important;
            font-size: 16px !important;
        }

    }
</style>
</head>
<body style="margin: 0; padding: 0;">

<!-- HEADER -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
        <td bgcolor="#ffffff">
            <div align="center" style="padding: 0px 15px 0px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="500" class="wrapper">
                    <!-- LOGO/PREHEADER TEXT -->
                    <tr>
                        <td style="padding: 20px 0px 30px 0px;" class="logo">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td bgcolor="#ffffff" width="100" align="left"><a href="http://alistapart.com/article/can-email-be-responsive/" target="_blank"><img alt="Logo" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/48935/logo.jpg" width="52" height="78" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0"></a></td>
                                    <td bgcolor="#ffffff" width="400" align="right" class="mobile-hide">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="right" style="padding: 0 0 5px 0; font-size: 14px; font-family: Arial, sans-serif; color: #666666; text-decoration: none;"><span style="color: #666666; text-decoration: none;">QUẢN LÝ QUỸ - Sunny Trịnh<br>Công cụ hiệu quả để quản lý quỹ.</span></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </td>
    </tr>
</table>

<!-- ONE COLUMN SECTION -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
        <td bgcolor="#ffffff" align="center" style="padding: 70px 15px 70px 15px;" class="section-padding">
            <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table">
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <!-- HERO IMAGE -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                             <tr>
                                                  <td class="padding-copy">
                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                              <td>
                                                                  <a href="http://alistapart.com/article/can-email-be-responsive/" target="_blank"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/48935/responsive-email.jpg" width="500" height="200" border="0" alt="Can an email really be responsive?" style="display: block; padding: 0; color: #666666; text-decoration: none; font-family: Helvetica, arial, sans-serif; font-size: 16px; width: 500px; height: 200px;" class="img-max"></a>
                                                              </td>
                                                            </tr>
                                                        </table>
                                                  </td>
                                              </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <!-- COPY -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Bạn quên mật khẩu ?</td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Nếu bạn không thực hiện thao tác quên mật khẩu, Đừng share link button này bằng bất cứ giá nào? Nếu có bất cứ thắc mắc gì hãy phản với tôi <b>iamnhatjt@gmail.com</b></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <!-- BULLETPROOF BUTTON -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container">
                                        <tr>
                                            <td align="center" style="padding: 25px 0 0 0;" class="padding-copy">
                                                <table border="0" cellspacing="0" cellpadding="0" class="responsive-table">
                                                    <tr>
                                                        <td align="center"><a href="${url}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #5D9CEC; border-top: 15px solid #5D9CEC; border-bottom: 15px solid #5D9CEC; border-left: 25px solid #5D9CEC; border-right: 25px solid #5D9CEC; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; display: inline-block;" class="mobile-button">👉 Đặt lại mật khẩu 👈</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>


</body>
</html>`;
