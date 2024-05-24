import React from "react";
import {
  Button,
  Col,
  Dropdown,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AntCardFull } from "components/AntCard";
import { getApi } from "config/networks/axiosConfig";
import { gpCompany } from "config/const/urlConfig";
import { errorResponse } from "components/NotificationCustom";
import { GpCompanyDialog } from "components/dialogs/GpCompanyDialog";
import { patchApi } from "config/networks/axiosConfig";
import { successNotification } from "components/NotificationCustom";
import { convertDateTime } from "utils/stringUtils";
import { debounce } from "utils/other";
import GPStatus from "components/gpcompany/GPStatus";
import { useNavigate } from "react-router-dom";
import { DocInfoDialog } from "components/dialogs/DocInfo";

export const ListGpCompany = () => {
  const [listGPCompanies, setListGPCompanies] = React.useState([]);
  const [isOpenDialogGPCompany, setIsOpenDialogGPCompany] =
    React.useState(false);
  const [isDialogDoc, setIsOpenDialogDoc] = React.useState(false);
  const [reload, setReload] = React.useState(0);
  const [DetailGPCompany, setDetailGPCompany] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const navigator = useNavigate();

  const handleReload = () => setReload(reload + 1);

  React.useEffect(() => {
    getApi(gpCompany.gpCompany, {
      params: {
        searchText: searchText,
      },
    })
      .then((data) => {
        setListGPCompanies(data);
      })
      .catch(errorResponse);
  }, [reload, searchText]);

  const MoreDetailComponent = ({ data }) => {
    const isGPCompanyActive = data?.status === "active";

    const deativateGP = () => {
      patchApi(gpCompany.idGpCompany(data.id), {
        status: isGPCompanyActive ? "deactive" : "active",
      })
        .then((_) => {
          successNotification("Cập nhật trạng thái thành công");
          handleReload();
        })
        .catch((err) => errorResponse(err, "Lỗi, vui lòng thử lại"));
    };
    const items = [
      {
        key: "1",
        label: <Typography>Chỉnh sửa</Typography>,
        icon: <EditOutlined />,
        onClick: () => {
          setDetailGPCompany(data);
          setIsOpenDialogGPCompany(true);
        },
      },
      {
        key: "2",
        label: (
          <Popconfirm
            title="Thay Đổi trạng thái công ty?"
            cancelText="Hủy"
            okText="Đồng ý"
            onConfirm={deativateGP}
          >
            <Typography>
              {isGPCompanyActive ? "Tắt hoạt động" : "Kích hoạt"}
            </Typography>
          </Popconfirm>
        ),

        icon: <PoweroffOutlined twoToneColor="#eb2f96" />,
        danger: true,
      },
      {
        key: "3",
        label: <Typography>Cung cấp giấy tờ</Typography>,
        icon: <EditOutlined />,
        onClick: () => {
          setDetailGPCompany(data);
          setIsOpenDialogDoc(true);
        },
      },
    ];

    return (
      <>
        <Dropdown
          placement="bottom"
          menu={{
            items,
          }}
          arrow
        >
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
      title: "Tên công ty",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại công ty",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          style={{ borderRadius: 8 }}
          color={status === "active" ? "success" : "warning"}
        >
          {status === "active" ? "Kích hoạt" : "Chưa kích hoạt"}
        </Tag>
      ),
    },
    {
      title: "Tài khoản người quản lý",
      dataIndex: "Accounts",
      key: "startDate",
      render: (accounts) => (
        <Typography>{accounts[0]?.email ?? "Chưa có người quản lý"}</Typography>
      ),
    },
    {
      title: "Ngày bắt đầu hoạt động",
      dataIndex: "createdAt",
      key: "startDate",
      render: (date) => <Typography>{convertDateTime(date)}</Typography>,
    },
    {
      title: " ",
      key: "moreDetail",
      render: (data) => <MoreDetailComponent data={data} />,
    },
  ];

  return (
    <>
      {/* <GPStatus /> */}
      <AntCardFull xl={24}>
        <Row justify="space-between">
          <Col span={6}>
            <h4>Danh sách công ty</h4>
          </Col>

          <Col span={12} offset={4}>
            <div className="d-flex">
              <Input
                style={{ borderRadius: 8, marginRight: 20 }}
                size="small"
                placeholder="Tìm kiếm công ty"
                onChange={debounce((data) => {
                  setSearchText(data.target.value?.trim());
                })}
                suffix={<SearchOutlined />}
              />
              <Button
                type="primary"
                style={{ borderRadius: 8 }}
                icon={<PlusOutlined />}
                onClick={() => {
                  setDetailGPCompany(null);
                  setIsOpenDialogGPCompany(true);
                }}
              >
                Thêm công ty
              </Button>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={listGPCompanies}
          scroll={{ x: 1000 }}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: () => {
                navigator(`/list-GP-company/${record.id}`);
              },
            };
          }}
        />
      </AntCardFull>
      {/* Dialog GP company */}
      <GpCompanyDialog
        isOpen={isOpenDialogGPCompany}
        onClose={() => {
          setIsOpenDialogGPCompany(false);
          handleReload();
        }}
        detail={DetailGPCompany}
      />
      {isDialogDoc && (
        <DocInfoDialog
          isGPDoc={true}
          isOpen={isDialogDoc}
          onClose={() => {
            setIsOpenDialogDoc(false);
          }}
          detail={DetailGPCompany}
        />
      )}
    </>
  );
};
