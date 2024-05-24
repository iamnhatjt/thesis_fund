import { successNotification } from "components/NotificationCustom";
import { fund } from "config/const/urlConfig";
import { postApi } from "config/networks/axiosConfig";
import React from "react";

const {
  Modal,
  Form,
  AutoComplete,
  Row,
  Button,
  Input,
  Dropdown,
  Select,
} = require("antd");
const { errorResponse } = require("components/NotificationCustom");
const { account } = require("config/const/urlConfig");
const { getApi } = require("config/networks/axiosConfig");
const { debounce } = require("utils/other");

export const FundProviderDialog = ({ isOpen, onClose, detail }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [listAccount, setListAccount] = React.useState([]);
  const [isProvide, setIsProvide] = React.useState(true);

  const onSearchListAccount = (value) => {
    getApi(account.allAccount, {
      params: {
        email: value,
      },
    })
      .then((res) => {
        setListAccount(
          res.map((item) => {
            return {
              label: item.email,
              value: item.email,
            };
          })
        );
      })
      .catch(errorResponse);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    postApi(fund.moneyFund(detail.id), values)
      .then((_) => {
        setIsLoading(false);
        onClose();
        successNotification("Đóng góp thành công!");
      })
      .catch((error) => {
        setIsLoading(false);
        errorResponse(error);
      });
  };

  return (
    <Modal
      open={isOpen}
      title="Đầu tư ngay"
      onCancel={onClose}
      closable={false}
      footer={false}
      destroyOnClose={true}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="accountEmail"
          label="Tài khoản đóng góp"
          rules={[
            {
              required: isProvide,
              message: "Tài khoản đóng góp không được để trống",
            },
          ]}
          style={{
            display: isProvide ? "block" : "none",
          }}
        >
          <AutoComplete
            notFoundContent="Không tìm thấy tài khoản"
            options={listAccount}
            onSearch={debounce(onSearchListAccount)}
            allowClear={true}
            placeholder="Nhập email tài khoản đóng góp"
          />
        </Form.Item>
        <Form.Item
          label="Thông tin chia sẻ"
          name="description"
          rules={[
            {
              required: true,
              message: "Thông tin mô tả thêm không được để trống",
            },
          ]}
        >
          <Input placeholder="Khác Hàng chuyển khoản..." />
        </Form.Item>
        <Form.Item
          label="Số tiền"
          name="money"
          rules={[
            {
              required: true,
              message: "Thông tin mô tả thêm không được để trống",
            },
          ]}
        >
          <Input placeholder="2000" type="number" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Loại cung cấp"
          name="status"
          rules={[
            {
              required: true,
              message: "Trạng thái không được để trống",
            },
          ]}
          initialValue={"provide"}
        >
          <Select
            value={"provide"}
            onChange={(value) => {
              setIsProvide(value !== "extract");
            }}
          >
            <Select.Option value={"extract"}>Rút khỏi quỹ</Select.Option>
            <Select.Option value={"provide"}>Đóng góp</Select.Option>
          </Select>
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
