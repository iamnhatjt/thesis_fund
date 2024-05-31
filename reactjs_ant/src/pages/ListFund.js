import {
  AliwangwangOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Row, Table, Typography } from "antd";
import Search from "antd/lib/transfer/search";
import { AntCardFull } from "components/AntCard";
import { errorResponse } from "components/NotificationCustom";
import { FundDialog } from "components/dialogs/FundDialog";
import { fund } from "config/const/urlConfig";
import { getApi } from "config/networks/axiosConfig";
import React from "react";
import { convertDateTime } from "utils/stringUtils";
import { FundTag } from "utils/fundStatus";
import { FundProviderDialog } from "components/dialogs/FundProviderDialog";
import { useNavigate } from "react-router-dom";
import { DocInfoDialog } from "components/dialogs/DocInfo";
import EditorDialog from "components/dialogs/EditorDialog";
import { formFundRegister } from "utils/fom";

export const ListFund = () => {
  const navigate = useNavigate();
  const [listFund, setListFund] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [isOpenDialogFund, setIsOpenDialogFund] = React.useState(false);
  const [detailFund, setDetailFund] = React.useState(null);
  const [reload, setReload] = React.useState(0);
  const [isOpenFundProvider, setIsOpenFundProvider] = React.useState(false);
  const [isOpenDialogExtract, setIsOpenDialogExtract] = React.useState(false);
  const [isOpenDialogEditor, setIsOpenDialogEditor] = React.useState(false);
  const [isDialogDoc, setIsOpenDialogDoc] = React.useState(false);

  const handleReload = () => setReload((reload) => reload + 1);

  React.useEffect(() => {
    getApi(fund.fund, {
      params: {
        searchText: searchText,
      },
    })
      .then((data) => setListFund(data))
      .catch((err) => errorResponse(err));
  }, [reload, searchText]);

  const MoreDetailComponent = ({ data }) => {
    const items = [
      {
        key: "1",
        label: <Typography> Chỉnh sửa </Typography>,
        icon: <EditOutlined />,
        onClick: () => {
          setDetailFund(data);
          setIsOpenDialogFund(true);
        },
      },
      {
        key: "2",
        label: <Typography> Biến động </Typography>,
        icon: <AliwangwangOutlined />,
        onClick: () => {
          setDetailFund(data);
          setIsOpenFundProvider(true);
        },
      },
      {
        key: "3",
        label: <Typography> Cung cấp giấy tờ </Typography>,
        icon: <EditOutlined />,
        onClick: () => {
          setDetailFund(data);
          setIsOpenDialogDoc(true);
        },
      },
    ];
    return (
      <>
        <Dropdown placement="bottom" arrow menu={{ items }}>
          <MoreOutlined />
        </Dropdown>
      </>
    );
  };

  const columns = [
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
      title: "Trực thuộc công ty",
      dataIndex: "GpCompany",
      key: "GpCompany",
      render: (data) => (
        <Typography>{`${data?.id} - ${data?.name}`}</Typography>
      ),
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
    {
      title: "",
      render: (fund) => <MoreDetailComponent data={fund} />,
    },
  ];

  return (
    <>
      {/* <AntCardFull>Status here</AntCardFull> */}
      <AntCardFull>
        <Row justify="space-between">
          <Col span={6}>
            <h4>Danh sách quỹ</h4>
            <Button type="primary" onClick={() => setIsOpenDialogEditor(true)}>
              Form đăng ký quỹ
            </Button>
          </Col>

          <Col span={12} offset={4}>
            <div className="d-flex">
              <Input
                style={{ borderRadius: 8, marginRight: 20 }}
                size="small"
                placeholder="Tìm kiếm quỹ"
                onPressEnter={(e) => {
                  setSearchText(e?.target?.value?.trim());
                }}
                suffix={<SearchOutlined />}
              />
              <Button
                type="primary"
                style={{ borderRadius: 8 }}
                icon={<PlusOutlined />}
                size="small"
                onClick={() => {
                  setDetailFund(null);
                  setIsOpenDialogFund(true);
                }}
              >
                Thêm quỹ
              </Button>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={listFund}
          scroll={{ x: 1000 }}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: () => {
                navigate(`/list-funds/${record.id}`);
              },
            };
          }}
        />
      </AntCardFull>
      {/* Dialog  fund info*/}
      {isOpenDialogFund && (
        <FundDialog
          isOpen={isOpenDialogFund}
          detail={detailFund}
          onClose={() => {
            setIsOpenDialogFund(false);
            handleReload();
          }}
          onReload={handleReload}
        />
      )}

      {/* Dialog provider fund */}
      {isOpenFundProvider && (
        <FundProviderDialog
          isOpen={isOpenFundProvider}
          onClose={() => {
            setIsOpenFundProvider(false);
            handleReload();
          }}
          detail={detailFund}
        />
      )}
      {isDialogDoc && (
        <DocInfoDialog
          isGPDoc={false}
          isOpen={isDialogDoc}
          onClose={() => {
            setIsOpenDialogDoc(false);
          }}
          detail={detailFund}
        />
      )}

      {isOpenDialogEditor && (
        <EditorDialog
          visible={isOpenDialogEditor}
          onClose={() => setIsOpenDialogEditor(false)}
        />
      )}
    </>
  );
};
