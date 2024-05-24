import React, { useContext } from "react";
import {
  Layout,
  Button,
  Typography,
  Form,
  Input,
  Col,
  Row,
  Switch,
} from "antd";
import { Link } from "react-router-dom";
import signinbg from "../assets/images/img-signin.png";
import { Footer } from "components/Layout";
import { AuthContext } from "config/layoutSetting/authSetting";

const { Content } = Layout;
const { Title } = Typography;

// console.log(Menu);
export default function SignIn() {
  const useAuth = useContext(AuthContext);
  const [isRemember, setIsRemember] = React.useState(true);

  const onFinish = (values) => {
    const data = { ...values, remember: isRemember };
    useAuth.login(data);
  };
  const onFinishFailed = (errInfo) => {
    console.log("Error : ", errInfo);
  };
  function onChange(checked) {
    setIsRemember(checked);
  }
  return (
    <>
      <div className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Đăng Nhập</Title>
              <Title className="font-regular text-muted" level={5}>
                Nhập Email và mật khẩu của bạn để đăng nhập hệ thống
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Vui lòng nhập email hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                    {
                      min: 6,
                      message: "Mật khẩu phải ít nhất 6 ký tự",
                    },
                  ]}
                >
                  <Input.Password
                    style={{
                      borderRadius: 8,
                      // heigh
                    }}
                    placeholder="Mật khẩu"
                  />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch
                    defaultChecked
                    onChange={onChange}
                    checked={isRemember}
                  />
                  Ghi nhớ tài khoản
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  <Link to="/forgot-password" className="text-dark font-bold">
                    Quên mật khẩu
                  </Link>
                </p>
                <p className="font-semibold text-muted">
                  Bạn chưa có tài khoản?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Đăng ký
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" style={{ height: "80vh" }} />
            </Col>
          </Row>
        </Content>
        <Footer />
      </div>
    </>
  );
}
