import { notification } from "antd";

const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export const successNotification = (message, description) =>
  openNotification("success", message, description);

export const infoNotification = (message, description) =>
  openNotification("info", message, description);

export const warningNotification = (message, description) =>
  openNotification("warning", message, description);

export const errorNotification = (message, description) =>
  openNotification("error", message, description);

export const errorResponse = (error, title) =>
  openNotification(
    "error",
    title ?? error?.message ?? "Lỗi, vui lòng thử lại",
    error?.message
  );
