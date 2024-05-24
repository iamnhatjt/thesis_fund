import { errorNotification } from "components/NotificationCustom";
import { errorResponse } from "components/NotificationCustom";
import { successNotification } from "components/NotificationCustom";
import constKey from "config/const/constKey";
import { authUrl } from "config/const/urlConfig";
import { postApi } from "config/networks/axiosConfig";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultContext = {
  login: null,
  logout: null,
  signUp: null,
  user: null,
};

const AuthContext = createContext(defaultContext);

const AuthSetting = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const path = window.location.pathname;
    if (
      path === "/sign-in" ||
      path === "/sign-up" ||
      path.includes("resetPassword")
    ) {
      return;
    }
    const userRaw = localStorage.getItem(constKey.userData);
    if (!userRaw) {
      navigate("/sign-in");
      return;
    }
    const user = JSON.parse(userRaw);

    setUser(user);
  }, []);

  const login = async (data) => {
    postApi(authUrl.signIn, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if (data.remember) {
          localStorage.setItem(constKey.accessKey, res.tokenAccess);
          localStorage.setItem(
            constKey.userData,
            JSON.stringify({
              firstName: res.firstName,
              lastName: res.lastName,
              address: res.address,
              dob: res.dob,
            })
          );
          setUser(res);
        } else {
          localStorage.removeItem(constKey.accessKey);
          localStorage.removeItem(constKey.userData);
        }

        successNotification(
          "Đăng Nhập thành công",
          "Chào mừng bạn đến với trang web của chúng tôi!"
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        errorResponse(error, "Đăng nhập thất bại");
      });
  };

  const logout = () => {
    navigate("/sign-in");
    localStorage.clear();
  };

  const signUp = (data) => {
    postApi(authUrl.signUp, {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      dob: moment(data.dob).toDate(),
      email: data.email,
      password: data.password,
      education: data.education,
    })
      .then((_) => {
        successNotification(
          "Tạo tài khoản thành công",
          "Bạn có thể đăng nhập ngay bay giờ"
        );
        navigate("/sign-in");
      })
      .catch((error) => {
        errorResponse(error, "Tạo tài khoản thất bại");
      });
  };

  const value = {
    login: login,
    logout: logout,
    signUp: signUp,
    user: user,
    setUser: setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthSetting };
