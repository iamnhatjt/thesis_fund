import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Col, Dropdown, Row, Table, Typography } from "antd";
import { AntCardFull } from "components/AntCard";
import { errorResponse } from "components/NotificationCustom";
import { TableDoc } from "components/TableDoc";
import { doc } from "config/const/urlConfig";
import { gpCompany } from "config/const/urlConfig";
import { fund } from "config/const/urlConfig";
import { getApi } from "config/networks/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FundTag } from "utils/fundStatus";
import { GpStatus } from "utils/gpStatus";
import { convertDateTime } from "utils/stringUtils";

export const DetailCompany = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataDoc, setDataDoc] = useState([]);
  const companyInfo = data.gp;
  const listFund = data.funds;
  const [reloadCount, setReloadCount] = useState(0);
  const handleReload = () => {
    setReloadCount(reloadCount + 1);
  };

  const displayCompany = {
    "Tên công ty: ": companyInfo?.name,
    "Loại công ty: ": companyInfo?.category,
    "Trạng thái công ty: ": companyInfo?.status,
    "Ngày khởi tạo công ty: ": convertDateTime(companyInfo?.createdAt),
  };

  const columnFund = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên quỹ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <FundTag value={status} />,
    },
    {
      title: "Tổng tiền của quỹ ($)",
      dataIndex: "invested",
      key: "invested",
      render: (invested) => <Typography>${invested}</Typography>,
    },

    {
      title: "Ngày khởi tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Typography>{convertDateTime(createdAt)}</Typography>
      ),
    },
  ];

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    getApi(doc.idDoc(id))
      .then((res) => {
        setDataDoc(res);
      })
      .catch(errorResponse);

    getApi(gpCompany.idGpCompany(id))
      .then((res) => {
        setData(res);
      })
      .catch(errorResponse);
  }, [reloadCount]);

  return (
    <>
      <Row gutter={12}>
        <Col xs={24} md={12}>
          <AntCardFull>
            <Col>
              <Typography.Title level={2}> Thông tin công ty </Typography.Title>
            </Col>
            {Object.entries(displayCompany).map((item, index) => (
              <Col
                style={{
                  margin: "12px 0px",
                }}
              >
                <Typography.Text key={index}>{item[0]}</Typography.Text>
                {item[0] === "Trạng thái công ty: " ? (
                  GpStatus(item[1])
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
              <Typography.Title level={2}>
                {" "}
                Thông tin quỹ trực thuộc{" "}
              </Typography.Title>
            </Col>
            <Col>
              <Table
                bordered={true}
                columns={columnFund}
                dataSource={listFund}
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
            </Col>
          </AntCardFull>
        </Col>
      </Row>
      <TableDoc isGPDoc={true} dataDoc={dataDoc} handleReload={handleReload} />
    </>
  );
};
