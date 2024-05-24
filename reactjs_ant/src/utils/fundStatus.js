import { Tag } from "antd";

export const fundStatus = [
  {
    value: "open",
    label: "Mở cửa",
    card: "success",
  },
  {
    value: "close",
    label: "Đóng cửa",
    card: "processing",
  },
  {
    value: "prevent",
    label: "Cấm rút",
    card: "warning",
  },
  {
    value: "cancel",
    label: "Hủy bỏ",
    card: "error",
  },
];

export const FundTag = ({ value }) => {
  const fund = fundStatus.find((item) => item.value === value);

  return (
    <Tag
      style={{
        borderRadius: 8,
      }}
      color={fund?.card}
    >
      {fund?.label ?? value?.toString()}
    </Tag>
  );
};
