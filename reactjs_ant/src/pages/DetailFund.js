import { Row, Col, Typography, Button, Table } from "antd";
import { AntCardFull } from "components/AntCard";
import { errorResponse } from "components/NotificationCustom";
import { TableDoc } from "components/TableDoc";
import { docFund } from "config/const/urlConfig";
import { fund } from "config/const/urlConfig";
import { getApi } from "config/networks/axiosConfig";
import React, { isValidElement } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { FundTag } from "utils/fundStatus";
import { GpStatus } from "utils/gpStatus";
import { convertDateTime } from "utils/stringUtils";

export const DetailFund = () => {
  const [detailFund, setDetailFund] = React.useState([]);
  const [countReload, setCountReload] = React.useState(0);
  const [dataDoc, setDataDoc] = React.useState([]);

  const fundInfo = detailFund?.fundData;
  const historyData = detailFund?.historyData;
  const companyInfo = detailFund?.fundData?.GpCompany;
  console.log(companyInfo, "companyInfo");
  const displayFund = {
    "Tên công ty: ": fundInfo?.name,
    "Trạng thái: ": fundInfo?.status,
    "Tổng tiền quỹ: ": `$ ${fundInfo?.invested}`,
    "Ngày tạo quỹ: ": convertDateTime(fundInfo?.createdAt),
    "Hoạt động gần nhất: ": convertDateTime(fundInfo?.updatedAt),
  };

  const displayCompany = {
    "Tên công ty: ": companyInfo?.name,
    "Loại công ty: ": companyInfo?.category,
    "Trạng thái công ty: ": companyInfo?.status,
    "Ngày khởi tạo công ty: ": convertDateTime(companyInfo?.createdAt),
  };

  const columnHiStoryMoney = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Typography>
          {status !== "extract" ? "Đóng góp" : "Trích quỹ"}
        </Typography>
      ),
    },
    {
      title: "Người đóng góp",
      dataIndex: "Account",
      key: "Account",
      render: (Account) => (
        <Typography>{`${Account.firstName} ${Account.lastName}`}</Typography>
      ),
    },
    {
      title: "Số tiền ($)",
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

  const handleReload = () => setCountReload(countReload + 1);

  React.useEffect(() => {
    const fundID = window.location.pathname.split("/").pop();
    getApi(fund.idFund(fundID))
      .then((data) => setDetailFund(data))
      .catch(errorResponse);
  }, []);
  React.useEffect(() => {
    const fundID = window.location.pathname.split("/").pop();
    getApi(docFund.idDoc(fundID))
      .then((data) => setDataDoc(data))
      .catch(errorResponse);
  }, [countReload]);
  return (
    <>
      <Row gutter={12}>
        <Col xs={24} md={12}>
          <AntCardFull>
            <Col>
              <Typography.Title level={2}> Thông tin quỹ </Typography.Title>
            </Col>
            {Object.entries(displayFund).map((item, index) => (
              <Col
                style={{
                  margin: "12px 0px",
                }}
              >
                <Typography.Text key={index}>{item[0]}</Typography.Text>
                {item[0] === "Trạng thái: " ? (
                  FundTag({ value: item[1] })
                ) : (
                  <Typography.Text> {item[1]}</Typography.Text>
                )}
              </Col>
            ))}
          </AntCardFull>
        </Col>
        <Col xs={24} md={12}>
          <AntCardFull>
            <Col>
              <Typography.Title level={2}> Thông tin đầu tư </Typography.Title>
            </Col>
            <Col>
              <Table
                bordered={true}
                columns={columnHiStoryMoney}
                dataSource={historyData}
                size="small"
                scroll={{ x: 300 }}
              />
            </Col>
          </AntCardFull>
        </Col>
        <Col xs={24} md={12}>
          <AntCardFull>
            <Col>
              <Typography.Title level={2}>Công ty trực thuộc</Typography.Title>
            </Col>
            {Object.entries(displayCompany).map((item, index) => (
              <Col
                style={{
                  margin: "12px 0px",
                }}
              >
                <Typography.Text key={index}>{item[0]}</Typography.Text>
                {item[0].includes("Trạng thái") ? (
                  GpStatus(item[1])
                ) : (
                  <Typography.Text> {item[1]}</Typography.Text>
                )}
              </Col>
            ))}
          </AntCardFull>
        </Col>
      </Row>
      <TableDoc isGPDoc={false} dataDoc={dataDoc} handleReload={handleReload} />
    </>
  );
};
