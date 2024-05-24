const { Tag } = require("antd");

export const GpStatus = (status) => {
  return (
    <Tag
      style={{ borderRadius: 8 }}
      color={status === "active" ? "success" : "warning"}
    >
      {status === "active" ? "Kích hoạt" : "Chưa kích hoạt"}
    </Tag>
  );
};
