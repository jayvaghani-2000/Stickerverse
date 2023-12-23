import HeaderBanner from "@/app/components/HeaderBanner";
import Password from "@/app/components/Password";
import { paddingSpacing } from "@/app/utils/styles";

const PasswordPage = () => {
  return (
    <div className={paddingSpacing}>
      <HeaderBanner />
      <Password />
    </div>
  );
};

export default PasswordPage;
