import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { dashboard } from "utils/SideNavData";
import MenuItem from "utils/SideNavData";
import { Button } from "antd";
export default function SideNav({ color }) {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Quản lý qũy đầu tư</span>
      </div>
      <hr />
      <MenuItem pathname={pathname} color={color} />
      <div className="aside-footer">
        <div className="footer-box" style={{ backgroundColor: color }}>
          <span className="icon" style={{ color: "red" }}>
            {dashboard(color)}
          </span>
          <h6>Cần trợ giúp?</h6>
          <p>Vui lòng đọc kỹ điều khoản sử dụng</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            Điều khoản và chính sách
          </Button>
        </div>
      </div>
    </>
  );
}
