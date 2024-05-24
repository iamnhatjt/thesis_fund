import React, { Component, useContext } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";
import logo1 from "../assets/images/logos-facebook.svg";
import logo2 from "../assets/images/logo-apple.svg";
import logo3 from "../assets/images/Google__G__Logo.svg.png";
import { Header, Footer } from "components/Layout";
import moment from "moment";
import { AuthContext } from "config/layoutSetting/authSetting";
const { Content } = Layout;
const { Title } = Typography;
export default function SignUp() {
  const useAuth = useContext(AuthContext);
  const onFinish = (values) => {
    console.log("values : ", values);
    useAuth.signUp(values);
  };
  const onFinishFailed = (errInfo) => {
    console.log("Error : ", errInfo);
  };
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Đăng ký tài khoản</Title>
            </div>
          </div>
          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Đăng nhập với</h5>}
            bordered={false}
          >
            <div className="sign-up-gateways">
              <Button type={false}>
                <img src={logo1} alt="" />
              </Button>
              <Button type={false}>
                <img src={logo2} alt="" />
              </Button>
              <Button type={false}>
                <img src={logo3} alt="" />
              </Button>
            </div>
            <p className="text-center my-25 font-semibold text-muted">hoặc</p>
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
              name="basic"
              layout="vertical"
              size="large"
              autoComplete="off"
            >
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên của bạn",
                  },
                ]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "vui long nhập họ của bạn",
                  },
                ]}
              >
                <Input placeholder="Họ" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Vui lòng nhập địa chỉ email hợp lệ",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

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
              <Form.Item
                name="education"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập trình độ học vấn của bạn",
                  },
                ]}
              >
                <Input placeholder="Trình độ học vấn" />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập địa chỉ",
                  },
                ]}
              >
                <Input placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày sinh",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  showTime={false}
                  showToday={false}
                  disabledDate={(current) => {
                    return current && current > moment().endOf("day");
                  }}
                  style={{ width: "100%", borderRadius: 8 }}
                  placeholder="Ngày sinh"
                />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng đồng ý với điều khoản",
                  },
                ]}
              >
                <Checkbox>
                  I agree the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms & Conditions
                  </a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  htmlType="submit"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted">
              <Link to="/forgot-password" className="text-dark font-bold">
                Quên mật khẩu
              </Link>
            </p>
            <p className="font-semibold text-muted text-center">
              Bạn đã có tài khoản?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Đăng nhập
              </Link>
            </p>
          </Card>
        </Content>
        {/* footer */}
        <Footer />
      </div>
    </>
  );
}
