import React from "react";
import { Col, Card } from "antd";
export default function AntdCard({ xl, children, cardClass = "" }) {
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={xl} className="mb-24">
      <Card bordered={false} className={`criclebox h-full ${cardClass}`}>
        {children}
      </Card>
    </Col>
  );
}

export function AntCardFull({ xl, children, cardClass = "" }) {
  return (
    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
      <Card bordered={false} className={`criclebox h-full ${cardClass}`}>
        {children}
      </Card>
    </Col>
  );
}
