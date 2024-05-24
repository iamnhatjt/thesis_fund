import {
  AutoComplete,
  Button,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { errorResponse } from "components/NotificationCustom";
import { successNotification } from "components/NotificationCustom";
import { gpCompany } from "config/const/urlConfig";
import { fund } from "config/const/urlConfig";
import { patchApi } from "config/networks/axiosConfig";
import { getApi } from "config/networks/axiosConfig";
import { postApi } from "config/networks/axiosConfig";
import React from "react";
import { fundStatus } from "utils/fundStatus";
import { debounce } from "utils/other";

export const FundDialog = ({ isOpen, onClose, detail }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [listCompany, setListCompany] = React.useState([]);

  const onGetListCompany = async (data) => {
    const res = await getApi(gpCompany.gpCompany, {
      params: {
        searchText: data,
      },
    });
    setListCompany(
      res.map((item) => {
        return {
          label: `${item?.id} - ${item?.name}`,
          value: `${item?.id} - ${item?.name}`,
        };
      })
    );
  };

  const onFinish = async (values) => {
    const formatValues = {
      ...values,
      GpCompanyId: values.GpCompanyId.split(" - ")[0],
    };

    setIsLoading(true);
    if (detail) {
      await patchApi(fund.idFund(detail.id), formatValues)
        .then((res) => successNotification("Chỉnh sửa quỹ thành công"))
        .catch((err) => errorResponse(err, "Chỉnh sửa quỹ thất bại"));
    } else {
      await postApi(fund.fund, formatValues)
        .then((res) => successNotification("Tạo quỹ thành công"))
        .catch((err) => errorResponse(err, "Tạo quỹ thất bại"));
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      footer={false}
      onCancel={onClose}
      closable={false}
      destroyOnClose={true}
      title={detail ? "Chỉnh sửa quỹ" : "Tạo quỹ"}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: detail?.name,
          status: detail?.status,
        }}
      >
        <Form.Item
          label="Tên quỹ"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên quỹ",
            },
          ]}
        >
          <Input placeholder="Quỹ phát triển thịnh vượng" />
        </Form.Item>
        <Form.Item
          label="Trạng thái quỹ"
          name="status"
          rules={[
            {
              required: true,
              message: "Vui lòng cập nhập trạng thái của quỹ",
            },
          ]}
        >
          <Select bordered={true}>
            {fundStatus.map((item) => (
              <Select.Option value={item?.value} key={item.value}>
                {item?.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Công ty quản lý"
          initialValue={
            detail?.GpCompany &&
            `${detail?.GpCompany?.id} - ${detail?.GpCompany?.name}`
          }
          name="GpCompanyId"
          rules={[{ required: true, message: "vui lòng nhập thông tin" }]}
        >
          <AutoComplete
            placeholder="Công ty quản lý"
            onSearch={debounce(onGetListCompany)}
            options={listCompany}
            notFoundContent={<Typography>Không tìm thấy dữ liệu</Typography>}
            value={"trinhnht"}
            variant="borderless"
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
              loading={isLoading}
              shape="round"
            >
              Hủy
            </Button>
            <Button htmlType="submit" type="primary">
              Oke
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
