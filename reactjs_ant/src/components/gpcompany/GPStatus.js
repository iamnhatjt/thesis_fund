import {
  MoneyCollectOutlined,
  TikTokFilled,
  WifiOutlined,
} from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import Title from "antd/lib/skeleton/Title";
import { AntCardFull } from "components/AntCard";
import { errorResponse } from "components/NotificationCustom";
import { gpCompany } from "config/const/urlConfig";
import { getApi } from "config/networks/axiosConfig";
import React from "react";

const GPStatus = () => {
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    getApi(gpCompany.status)
      .then((res) => {
        setStatus(res);
      })
      .catch(errorResponse);
  }, []);
  return (
    <>
      {status && (
        <AntCardFull xl={12}>
          <Row justify="space-around">
            <Col style={{ textAlign: "center" }}>
              <WifiOutlined
                style={{
                  fontSize: 30,
                  padding: "12px 0",
                }}
              />

              <Typography.Title level={5}>
                Số lượng Công ty: {status?.totalCompany}
              </Typography.Title>
            </Col>

            <Col style={{ textAlign: "center" }}>
              <WifiOutlined
                style={{
                  fontSize: 30,
                  padding: "12px 0",
                }}
              />
              <Typography.Title level={5}>
                Số lượng quỹ: {status?.totalFund}
              </Typography.Title>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <WifiOutlined
                style={{
                  fontSize: 30,
                  padding: "12px 0",
                }}
              />

              <Typography.Title level={5}>
                số lượng Tiền: {status?.totalFundMoney}
              </Typography.Title>
            </Col>
          </Row>
        </AntCardFull>
      )}
    </>
  );
};

export default GPStatus;
