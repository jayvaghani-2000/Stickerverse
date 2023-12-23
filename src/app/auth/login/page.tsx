"use client";
import HeaderBanner from "@/app/components/HeaderBanner";
import Login from "@/app/components/Login";
import { paddingSpacing } from "@/app/utils/styles";

const LoginPage = () => {
  return (
    <div className={paddingSpacing}>
      <HeaderBanner />
      <Login />
    </div>
  );
};

export default LoginPage;
