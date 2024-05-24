import React, { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import { successNotification } from "components/NotificationCustom";
import { patchApi } from "config/networks/axiosConfig";
import { account } from "config/const/urlConfig";
import { errorResponse } from "components/NotificationCustom";

const ChangeInfoModal = ({ visible, onClose, detail }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    patchApi(account.me, values)
      .then((res) => {
        onClose();
        successNotification("Cập nhật thông tin thành công!");
      })
      .catch(errorResponse);
  };

  return (
    <Modal
      title="Cập nhật thông tin cá nhân"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          Lưu
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Tên"
          name="firstName"
          initialValue={detail?.firstName}
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="họ"
          initialValue={detail?.lastName}
          rules={[{ required: true, message: " Vui lòng nhập họ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Học vấn"
          name="education"
          initialValue={detail?.education}
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeInfoModal;
