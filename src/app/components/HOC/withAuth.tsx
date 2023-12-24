import { useAppDispatch } from "@/app/store";
import { setAuthData, useAuthStore } from "@/app/store/authentication";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { supabase } from "../../../../supabase/init";
import Nova from "../Font/nova";
import Loader from "../Loader";

const loginRoute = ["/auth/login"];
const authRoute = ["/auth/password", "/auth/verify"];

const privateTillAuthRoute = ["/auth/login", "/auth/password", "/auth/verify"];

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const { authCheck } = useAuthStore();
  const dispatch = useAppDispatch();

  const handleCreateSession = async () => {
    const { data } = await supabase.auth.refreshSession();

    if (data && data.session) {
      if (loginRoute.includes(path!)) {
        dispatch(
          setAuthData({
            authCheck: true,
          })
        );
        return router.replace("/");
      }
      const res = await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      if (res.data.user && res.data.session) {
        dispatch(
          setAuthData({
            profile: res.data.user,
            authenticated: true,
            token: res.data.session.access_token,
            authCheck: true,
          })
        );
      }
    } else {
      if (authRoute.includes(path!)) {
        router.replace("/");
      }
      dispatch(
        setAuthData({
          authCheck: true,
        })
      );
    }
  };

  useEffect(() => {
    handleCreateSession();
  }, []);

  return !authCheck && privateTillAuthRoute.includes(path!) ? (
    <div className="h-[calc(100dvh-60px)] sm:h-[calc(100dvh-85px)] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Loader />
        <Nova>Verifying...</Nova>
      </div>
    </div>
  ) : (
    children
  );
};

export default WithAuth;
