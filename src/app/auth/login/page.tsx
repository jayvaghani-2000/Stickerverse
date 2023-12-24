import WithHeader from "@/app/components/HOC/withHeader";
import Login from "@/app/components/Login";

const LoginPage = () => {
  return (
    <WithHeader>
      <Login />
    </WithHeader>
  );
};

export default LoginPage;
