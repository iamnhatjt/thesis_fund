import React from "react";
import { Typography, Row, Col } from "antd";
import ReactApexChart from "react-apexcharts";
import { eChart } from "./config/eChart";
const { Title, Paragraph } = Typography;
const items = [
  {
    title: "20",
    user: "Người dùng",
  },
  {
    title: "5k",
    user: "Clicks",
  },
  {
    title: "$1000",
    user: "Sử dụng",
  },
];
export default function Echat() {
  return (
    <>
      <div id="chart">
        <ReactApexChart
          series={eChart.series}
          options={eChart.options}
          height={220}
          className="bar-chart"
          type="bar"
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Người dùng hoạt động</Title>
        <Paragraph className="lastweek">
          Tăng trong tuần <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Chúng tôi có những theo dõi hoạt động của website trong tuần vừa rồi
        </Paragraph>
        <Row>
          {items.map(({ title, user }, index) => (
            <Col xs={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{title}</Title>
                <span>{user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
