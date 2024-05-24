import {
  AutoComplete,
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {
  successNotification,
  errorResponse,
} from "components/NotificationCustom";
import { account } from "config/const/urlConfig";
import { gpCompany } from "config/const/urlConfig";
import { getApi } from "config/networks/axiosConfig";
import { postApi, patchApi } from "config/networks/axiosConfig";
import { useState } from "react";
import { debounce } from "utils/other";

export const GpCompanyDialog = ({ isOpen, onClose, detail }) => {
  const [isLoading, setLoading] = useState(false);
  const [accountSuggest, setAccountSuggest] = useState([]);

  const onSearchAccount = async (value) => {
    try {
      const res = await getApi(account.allAccount, {
        params: {
          email: value,
        },
      });
      setAccountSuggest(
        res.map((item) => {
          return { label: item.email, value: item.email, id: item.id };
        })
      );
    } catch (err) {
      errorResponse(err, "Xảy ra lỗi khi lấy dữ liệu");
    }
  };

  const clickConfirm = async (data) => {
    setLoading(true);
    if (detail) {
      await patchApi(gpCompany.idGpCompany(detail.id), data)
        .then((_) => {
          successNotification("Sửa công ty thành công");
          if (onClose) onClose();
        })
        .catch((err) => errorResponse(err, "Có lỗi xảy ra!"));
    } else {
      await postApi(gpCompany.gpCompany, {
        ...data,
      })
        .then(() => {
          successNotification("Tạo công ty thành công");
          if (onClose) onClose();
        })
        .catch((err) => errorResponse(err, "Có lỗi xảy ra!"));
    }
    setLoading(false);
  };

  return (
    <Modal
      open={isOpen}
      title={detail ? "Sửa công ty" : "Thêm công ty"}
      onCancel={onClose}
      confirmLoading={isLoading}
      closable={false}
      footer={false}
      destroyOnClose={true}
    >
      <Form
        layout="vertical"
        onFinish={clickConfirm}
        initialValues={{
          name: detail?.name,
          category: detail?.category,
          status: detail?.status,
        }}
      >
        <Form.Item
          label="Tên công ty"
          name="name"
          rules={[
            {
              required: true,
              message: "Tên công ty không được bỏ trống.",
            },
          ]}
        >
          <Input placeholder="Công ty trách nhiệm hữu hạn" />
        </Form.Item>

        <Form.Item
          label="Loại công ty"
          name="category"
          rules={[
            {
              required: true,
              message: "Loại công ty không được bỏ trống.",
            },
          ]}
        >
          <Input placeholder="Công ty tư nhân" />
        </Form.Item>

        <Form.Item label="Trạng thái công ty" name="status">
          <Select>
            <Select.Option value={"active"}>Kích hoạt</Select.Option>
            <Select.Option value={"deactivate"}>Chưa kích hoạt</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Người quản lý"
          name="emailAccount"
          style={{ borderRadius: 8 }}
          initialValue={detail?.Accounts[0]?.email}
          rules={[
            {
              required: true,
              message: "Người quản lý không được bỏ trống.",
            },
          ]}
        >
          <AutoComplete
            placeholder="Nhập email người quản lý"
            style={{ borderRadius: 8 }}
            options={accountSuggest}
            allowClear={true}
            onChange={debounce(onSearchAccount)}
            notFoundContent={<Typography>Email không tìm thấy</Typography>}
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
