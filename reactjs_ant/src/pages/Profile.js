import React, { useEffect, useState } from "react";
import { Iconify } from "utils/Iconify";
import BgProfile from "assets/images/bg-profile.jpg";
import profilavatar from "assets/images/face-1.jpg";
import { project, data } from "utils/ProfileData";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Table,
  Typography,
} from "antd";
import { getApi } from "config/networks/axiosConfig";
import { account } from "config/const/urlConfig";
import { errorResponse } from "components/NotificationCustom";
import { convertDateTime } from "utils/stringUtils";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "components/dialogs/ChangePassword";
import ChangeInfoModal from "components/dialogs/DialogChangeInfor";
export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [countReload, setCountReload] = useState(0);

  const handleReload = () => setCountReload(countReload + 1);

  const [isDialogPassword, setIsDialogPassword] = useState(false);
  const [isDialogInfo, setIsDialogInfo] = useState(false);

  const onCloseDialogPassword = () => {
    handleReload();
    setIsDialogPassword(false);
  };
  const onCloseDialogInfo = () => {
    handleReload();
    setIsDialogInfo(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    getApi(account.me)
      .then((res) => {
        setUserInfo(res);
        console.log(res);
      })
      .catch(errorResponse);
  }, []);
  const columnHiStoryMoney = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày góp vốn",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Typography>{convertDateTime(createdAt)}</Typography>
      ),
    },
  ];
  const historyData = userInfo?.FundAccounts;
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      />
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                {/* <Avatar size={74} shape="square" src={profilavatar} /> */}
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{`${userInfo?.firstName} ${userInfo?.lastName}`}</h4>
                  <p>{userInfo?.email}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button
                  value="a"
                  onClick={() => setIsDialogPassword(true)}
                >
                  Đổi mật khẩu
                </Radio.Button>
                <Radio.Button
                  value="a"
                  onClick={() => {
                    setIsDialogInfo(true);
                  }}
                >
                  Cập nhập thông tin cá nhân
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      />
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thông tin cá nhân</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              <Button type="link">
                {<Iconify icon="akar-icons:pencil" />}
              </Button>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">{userInfo?.education}</p>
            <hr className="my-25" />
            <Descriptions title={userInfo?.firstName}>
              <Descriptions.Item label="Tên đầy đủ" span={3}>
                {`${userInfo?.firstName} ${userInfo?.lastName}`}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh" span={3}>
                {convertDateTime(userInfo?.dob)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tham gia" span={3}>
                {convertDateTime(userInfo?.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={3}>
                {userInfo?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<Iconify icon="akar-icons:twitter-fill" />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {
                    <Iconify
                      icon="akar-icons:facebook-fill"
                      style={{ color: "#344e86" }}
                    />
                  }
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {
                    <Iconify
                      icon="akar-icons:instagram-fill"
                      style={{ color: "#e1306c" }}
                    />
                  }
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={16} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Lịch sử giao dịch</h6>}
          >
            <Table
              bordered={true}
              columns={columnHiStoryMoney}
              dataSource={historyData}
              size="small"
              scroll={{ x: 300 }}
              onRow={(record, rowIndex) => {
                return {
                  onDoubleClick: () => {
                    navigate(`/list-funds/${record.id}`);
                  },
                };
              }}
            />
          </Card>
        </Col>
      </Row>
      {/* Dialog */}
      {isDialogPassword && (
        <ChangePasswordModal
          visible={isDialogPassword}
          onClose={onCloseDialogPassword}
          onSubmit
        />
      )}

      {isDialogInfo && (
        <ChangeInfoModal
          visible={isDialogInfo}
          detail={userInfo}
          onClose={onCloseDialogInfo}
        />
      )}
    </>
  );
}
