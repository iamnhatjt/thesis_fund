import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDrawer,
  handleFixedNavbar,
  handleSideNavColor,
  handleSidenavType,
  handleSidebar,
} from "Redux/features/MainSlice";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  List,
  Avatar,
  Button,
  Drawer,
  Typography,
  Switch,
  Input,
} from "antd";
import {
  data,
  bell,
  logsetting,
  toggler,
  profileSVg,
  setting,
} from "utils/HeaderData";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Iconify } from "utils/Iconify";
import { AuthContext } from "config/layoutSetting/authSetting";
import { breadcrumbDefine } from "config/const/breadcrumbDefine";
const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0px;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #1890ff;
  }
`;
const { Title, Text } = Typography;
const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown"
    style={{
      backgroundColor: "#fff",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "1rem",
    }}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item style={{ borderRadius: "1rem" }}>
        <List.Item.Meta
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "1rem",
          }}
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);
const buttonList = [
  { color: "#1890ff", type: "primary" },
  { color: "#52c41a", type: "success" },
  { color: "#d9363e", type: "danger" },
  { color: "#fadb14", type: "yellow" },
  { color: "#111", type: "black" },
];
export default function AntdHeader({ name }) {
  const { sideNavType, visible, placement } = useSelector(
    (state) => state.mainSlice
  );
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const userData = authContext.user;

  return (
    <>
      <div className="setting-drwer" onClick={() => dispatch(openDrawer(true))}>
        {setting}
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>

            {name.split("/").map((item, index) => {
              return (
                <Breadcrumb.Item key={index}>
                  <NavLink to={`/${item}`}>{breadcrumbDefine[item]}</NavLink>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {breadcrumbDefine[name.split("/").at(-1)]}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Badge size="small" count={4}>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              arrow
              overlayStyle={{ width: "20%" }}
            >
              <a href="#pablo" className="ant-dropdown-link">
                {bell}
              </a>
            </Dropdown>
          </Badge>
          <Button type="link" onClick={() => dispatch(openDrawer(true))}>
            {logsetting}
          </Button>
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => dispatch(handleSidebar())}
          >
            {toggler}
          </Button>
          <Drawer
            className="settings-drawer"
            mask={true}
            width={360}
            placement={placement}
            visible={visible}
            closable={false}
            onClose={() => dispatch(openDrawer(false))}
          >
            <div layout="vertical">
              <div className="header-top">
                <Title level={4}>
                  Cài đặt
                  <Text className="subtitle">
                    Lựa chọn những option dưới đây
                  </Text>
                </Title>
              </div>
              <div className="sidebar-color">
                <Title level={5}>Màu thanh điều hướng</Title>
                <div className="theme-color mb-2">
                  <ButtonContainer>
                    {buttonList.map(({ color, type }, index) => {
                      return (
                        <Button
                          type={type}
                          key={index}
                          onClick={() => dispatch(handleSideNavColor(color))}
                        >
                          1
                        </Button>
                      );
                    })}
                  </ButtonContainer>
                </div>
                <div className="sidebarnav-color mb-2">
                  <Title level={5}>Sidenav Type</Title>
                  <Text>Chọn một trong 2 loại hiển thị</Text>
                  <ButtonContainer className="trans">
                    <Button
                      type={sideNavType === "transparent" ? "primary" : "white"}
                      onClick={() => dispatch(handleSidenavType("transparent"))}
                    >
                      Trong suốt
                    </Button>
                    <Button
                      type={sideNavType === "white" ? "primary" : "white"}
                      onClick={() => dispatch(handleSidenavType("white"))}
                    >
                      Trắng
                    </Button>
                  </ButtonContainer>
                </div>
                <div className="fixed-nav mb-2">
                  <Title level={5}>Giữ thanh điều chỉnh</Title>
                  <Switch onChange={(e) => dispatch(handleFixedNavbar(e))} />
                </div>
                {authContext.user && (
                  <Button
                    type="primary"
                    style={{
                      width: "100%",
                    }}
                    onClick={authContext.logout}
                  >
                    Đăng Xuất
                  </Button>
                )}
              </div>
            </div>
          </Drawer>
          {userData ? (
            <Link to="/profile" className="btn-sign-in">
              {profileSVg}
              <span>{`${userData.firstName} ${userData.lastName}`}</span>
            </Link>
          ) : (
            <Link to="/sign-in" className="btn-sign-in">
              {profileSVg}
              <span>Sign in</span>
            </Link>
          )}

          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<Iconify icon="akar-icons:search" />}
          />
        </Col>
      </Row>
    </>
  );
}
