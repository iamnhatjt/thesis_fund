import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import { AntCardFull } from "./AntCard";
import { convertDateTime } from "utils/stringUtils";
import { useEffect, useState } from "react";
import { doc } from "config/const/urlConfig";
import { getApi } from "config/networks/axiosConfig";
import { errorResponse, successNotification } from "./NotificationCustom";
import {
  EditOutlined,
  MoreOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { deleteApi } from "config/networks/axiosConfig";
import { patchApi } from "config/networks/axiosConfig";
import { docFund } from "config/const/urlConfig";

export const TableDoc = ({ isGPDoc, dataDoc, handleReload }) => {
  const url = (id) => (isGPDoc ? doc.idDoc(id) : docFund.idDoc(id));
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dataChange, setDataChange] = useState(null);
  const onCloseDialog = () => {
    setIsOpenDialog(false);
    handleReload();
  };
  const MoreDetailComponent = ({ data }) => {
    const deleteDoc = () => {
      deleteApi(url(data.id))
        .then((_) => {
          successNotification("Đã xóa thành công");
          handleReload();
        })
        .catch(errorResponse);
    };
    const items = [
      {
        key: "1",
        label: <Typography>Chỉnh sửa</Typography>,
        icon: <EditOutlined />,
        onClick: () => {
          console.log(data, isOpenDialog);
          setDataChange(data);
          setIsOpenDialog(true);
        },
      },
      {
        key: "2",
        label: (
          <Popconfirm
            title="Bạn muốn xóa Doc này"
            cancelText="Hủy"
            okText="Đồng ý"
            onConfirm={deleteDoc}
          >
            <Typography>Xóa</Typography>
          </Popconfirm>
        ),

        icon: <PoweroffOutlined twoToneColor="#eb2f96" />,
        danger: true,
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
  const docColumn = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên file",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Typography>{convertDateTime(createdAt)}</Typography>
      ),
    },
    {
      title: "Chỉnh sửa gần nhất",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => (
        <Typography>{convertDateTime(updatedAt)}</Typography>
      ),
    },

    {
      title: " ",
      key: "moreDetail",
      render: (data) => <MoreDetailComponent data={data} />,
    },
  ];

  return (
    <>
      <AntCardFull>
        <Table
          scroll={{
            x: 100,
          }}
          bordered={true}
          dataSource={dataDoc}
          columns={docColumn}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: () => {
                window.open(
                  `https://drive.google.com/file/d/${record.doc}/view`
                );
              },
            };
          }}
        />
      </AntCardFull>
      {/* Dialog */}
      {isOpenDialog && (
        <DialogChangeDoc
          isOpen={isOpenDialog}
          detail={dataChange}
          url={url}
          onClose={onCloseDialog}
        />
      )}
    </>
  );
};

const DialogChangeDoc = ({ detail, url, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (data) => {
    setIsLoading(true);
    await patchApi(url(detail.id), data)
      .then((_) => {
        successNotification("Thay đổi thành công");
        onClose();
      })
      .catch(errorResponse);
    setIsLoading(false);
  };

  return (
    <Modal
      width={600}
      open={isOpen}
      footer={false}
      onCancel={onClose}
      closable={false}
      destroyOnClose={true}
      title="Chỉnh sửa doc"
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={detail}>
        <Form.Item
          label="Tên file"
          name="fileName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên file",
            },
          ]}
        >
          <Input placeholder="abc.pdf" bordered={true} />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
            },
          ]}
        >
          <Input
            placeholder="Cung cấp thêm mô tả của file này..."
            bordered={true}
          />
        </Form.Item>
        <Form.Item>
          <Row align="end">
            <Button
              type="default"
              style={{
                marginRight: 12,
              }}
              onClick={onClose}
              shape="round"
            >
              Hủy
            </Button>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Oke
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
