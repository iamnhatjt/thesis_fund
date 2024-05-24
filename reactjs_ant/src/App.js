import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "pages/SignUp";
import SignIn from "pages/SignIn";
import { Main } from "components/Layout";
import Home from "pages/Home";
import Tables from "pages/Tables";
import Billing from "pages/Billing";
import Profile from "pages/Profile";
import { ListGpCompany } from "pages/ListGpCompany";
import { ListFund } from "pages/ListFund";
import { DetailFund } from "pages/DetailFund";
import { ForgotPassword } from "pages/FogotPassword";
import { NewPassword } from "pages/NewPassword";
import { DetailCompany } from "pages/DetailCompany";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<NewPassword />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="tables" element={<Tables />} />
          <Route path="billing" element={<Billing />} />
          <Route path="rtl" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="list-GP-company" element={<ListGpCompany />} />
          <Route path="list-GP-company/:id" element={<DetailCompany />} />
          <Route path="list-funds" element={<ListFund />} />
          <Route path="list-funds/:id" element={<DetailFund />} />
        </Route>
      </Routes>
    </>
  );
}
