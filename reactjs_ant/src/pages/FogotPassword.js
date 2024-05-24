import { Button, Form, Input } from "antd";
import { AntCardFull } from "components/AntCard";
import { errorResponse } from "components/NotificationCustom";
import { successNotification } from "components/NotificationCustom";
import { authUrl } from "config/const/urlConfig";
import { postApi } from "config/networks/axiosConfig";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onFinish = (value) => {
    postApi(authUrl.forgotPassword, value)
      .then((_) => {
        setIsSuccess(true);
        successNotification("Vui lòng kiểm tra mail của bạn...");
      })
      .catch(errorResponse);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
      }}
    >
      <AntCardFull>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                message: "Email bắt buộc phải được nhập!",
                type: "email",
                required: true,
                whitespace: false,
              },
            ]}
          >
            <Input placeholder="Nhập email của bạn vào đây" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                marginTop: "12px",
              }}
              disabled={isSuccess}
            >
              {isSuccess ? "Vui lòng mở mail" : "Gửi"}
            </Button>
          </Form.Item>
        </Form>
        <p className="font-semibold text-muted">
          Bạn chưa có tài khoản?{" "}
          <Link to="/sign-up" className="text-dark font-bold">
            Đăng ký
          </Link>
        </p>
        <p className="font-semibold text-muted">
          Bạn đã có tài khoản?{" "}
          <Link to="/sign-in" className="font-bold text-dark">
            Đăng nhập
          </Link>
        </p>
      </AntCardFull>
    </div>
  );
};
