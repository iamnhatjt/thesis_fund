import { AuthContext } from "config/layoutSetting/authSetting";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
