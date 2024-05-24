import {
  Card,
  Row,
  Col,
  Typography,
  Radio,
  Upload,
  message,
  Button,
  Timeline,
} from "antd";
import Echat from "components/charts/Echat";
import LineChart from "components/charts/LineChart";
import React, { useState } from "react";
import { count, list } from "utils/HomeData";
import { Iconify } from "utils/Iconify";
import AntCard from "components/AntCard";
import card from "../assets/images/info-card-1.jpg";
import { timelineList } from "utils/HomeData";
const { Title, Paragraph, Text } = Typography;
export default function Home() {
  const [reverse, setReverse] = useState(false);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };
  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => {
            return (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{c.today}</span>
                        <Title level={3}>
                          {c.title} <small className={c.bnb}>{c.persent}</small>
                        </Title>
                      </Col>
                      <Col xs={6}>
                        <div className="icon-box">{c.icon}</div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row gutter={[24, 0]}>
          <AntCard xl={10}>
            <Echat />
          </AntCard>
          <AntCard xl={14}>
            <LineChart />
          </AntCard>
        </Row>
        <Row gutter={[24, 0]}>
          <AntCard cardClass="cardbody" xl={16}>
            <div className="project-ant">
              <div>
                <Title level={5}>Các nhà tài trợ</Title>
                <Paragraph className="lastweek">
                  Tăng trưởng <span className="blue">4%</span>
                </Paragraph>
              </div>
              <div className="ant-filtertabs">
                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">Tất cả</Radio.Button>
                    <Radio.Button value="b">Công ty</Radio.Button>
                    <Radio.Button value="c">Tổ chức</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="ant-list-box table-responsive">
              <table className="width-100">
                <thead>
                  <tr>
                    <th>Công ty</th>
                    <th>Người đại diện</th>
                    <th>Cam kết</th>
                    <th>hoàn thiện</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((d, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}
                          </span>
                        </td>
                        <td className="percent-progress">{d.progress}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <div className="uploadfile shadow-none">
              <Upload {...uploadProps}>
                <Button
                  type="dashed"
                  className="ant-full-box"
                  icon={<Iconify icon="akar-icons:align-to-top" />}
                >
                  <span className="click">Click to Upload</span>
                </Button>
              </Upload>
            </div> */}
          </AntCard>
          <AntCard xl={8}>
            <div className="timeline-box">
              <Title level={5}>Lịch sử giao dịch</Title>
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                Tháng này <span className="bnb2">10%</span>
              </Paragraph>
              <Timeline
                pending="Recording..."
                className="timelinelist"
                reverse={reverse}
              >
                {timelineList.map((t, index) => (
                  <Timeline.Item color={t.color} key={index}>
                    <Title level={5}>{t.title}</Title>
                    <Text>{t.time}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
              <Button
                type="primary"
                className="width-100"
                onClick={() => setReverse(!reverse)}
              >
                {<Iconify icon="eva:menu-2-fill" />} Cập nhập
              </Button>
            </div>
          </AntCard>
        </Row>
        <Row gutter={[24, 0]}>
          <AntCard xl={14}>
            <Row>
              <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
                <div className="h-full col-content p-20">
                  <div className="ant-muse">
                    <Text>
                      Đươc xây dựng bởi sunny Trịnh (Trịnh Dương Nhật)
                    </Text>
                    <Title level={5}>Design base on for Ant Design</Title>
                    <Paragraph className="lastweek mb-36">
                      Cộng tác với chúng tôi để tạo ra những sản phẩm có lợi ích
                      cho xã hội
                    </Paragraph>
                  </div>
                  <div className="card-footer">
                    <a href="#pablo" className="icon-move-right">
                      Liên hệ
                      {
                        <Iconify
                          icon="eva:chevron-right-fill"
                          width="17px"
                          height="17px"
                        />
                      }
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12} sm={24} lg={12} xl={10} className="col-img">
                <div className="ant-cret text-right">
                  <img src={card} className="border10" alt="" />
                </div>
              </Col>
            </Row>
          </AntCard>
          <AntCard xl={10} cardClass="card-info-2">
            <div className="gradent h-full col-content">
              <div className="card-content">
                <Title level={5}>Các sản phẩm khác của sunny (Nhật)</Title>
                <p>
                  Là một developer, chúng tôi có trách nhiệm trong từng dòng
                  code mà chúng tôi viết ra để tạo nên những sản phẩm tuyệt vời
                  nhất gửi đến quý vị và các bạn.
                </p>
              </div>
              <div className="card-footer">
                <a href="#pablo" className="icon-move-right bnb2">
                  Liên hệ với chúng tôi
                  {<Iconify icon="eva:chevron-right-fill" />}
                </a>
              </div>
            </div>
          </AntCard>
        </Row>
      </div>
    </>
  );
}
