import { UploadOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { errorNotification } from "components/NotificationCustom";
import {
  successNotification,
  errorResponse,
} from "components/NotificationCustom";
import constKey from "config/const/constKey";
import { docFund } from "config/const/urlConfig";
import { account } from "config/const/urlConfig";
import { gpCompany, doc } from "config/const/urlConfig";
import { getApi } from "config/networks/axiosConfig";
import { postApi, patchApi } from "config/networks/axiosConfig";
import { useState } from "react";
import { debounce } from "utils/other";

export const DocInfoDialog = ({ isOpen, onClose, detail, isGPDoc }) => {
  const [isLoading, setLoading] = useState(false);

  const propsUpload = {
    name: "file",
    multimultiple: false,
    action: isGPDoc ? doc.idDoc(detail?.id) : docFund.idDoc(detail?.id),
    headers: {
      "x-access-token": localStorage.getItem(constKey.accessKey),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        successNotification(
          `${info.file.name} Gửi file lên hệ thống thành công`
        );
        onClose();
      } else if (info.file.status === "error") {
        errorNotification(`${info.file.name} Gửi file lên hệ thống thất bại`);
      }
    },
  };

  return (
    <Modal
      open={isOpen}
      title={"Cung cấp thông tin"}
      onCancel={onClose}
      confirmLoading={isLoading}
      closable={false}
      footer={false}
      destroyOnClose={true}
    >
      <Upload {...propsUpload}>
        <Typography>
          Chọn file cung cấp đầy đủ thông tin, những thông tin này sẽ được sử
          dụng để minh bạch hóa công ty của bạn (*.pdf, .png,...)
        </Typography>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Modal>
  );
};
