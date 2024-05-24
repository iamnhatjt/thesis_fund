import { Button, Form, Input } from "antd";
import { AntCardFull } from "components/AntCard";
import { errorNotification } from "components/NotificationCustom";
import { successNotification } from "components/NotificationCustom";
import { authUrl } from "config/const/urlConfig";
import { postApi } from "config/networks/axiosConfig";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const NewPassword = () => {
  let [searchParams, _] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const onfinish = (data) => {
    postApi(authUrl.resetPassword, {
      password: data.password,
      token: token,
    })
      .then((_) => {
        successNotification("Đặt lại mật khẩu thành công");
        navigate("/sign-in");
      })
      .catch((err) => {
        errorNotification(err.message, "Đặt lại mật khẩu thất bại");
        setError(err.message);
      });
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 400,
        transform: "translate(-50%, -50%)",
      }}
    >
      <AntCardFull>
        <Form onFinish={onfinish}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
              {
                max: 20,
                message: "Mật khẩu không được quá 20 ký tự",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              style={{ borderRadius: 8 }}
              placeholder="Nhập mật khẩu"
              type="password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  console.log(value, getFieldValue("password"));
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password
              style={{ borderRadius: 8 }}
              placeholder="Nhập lại mật khẩu"
              type="password"
            />
          </Form.Item>
          <Button
            style={{
              width: "100%",
            }}
            type="primary"
            htmlType="submit"
          >
            Đặt lại mật khẩu
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </AntCardFull>
    </div>
  );
};
