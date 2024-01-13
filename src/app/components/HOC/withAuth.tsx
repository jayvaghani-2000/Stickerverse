import { useAppDispatch } from "@/app/store";
import { setAuthData, useAuthStore } from "@/app/store/authentication";
import { handleSetToken } from "@/app/utils/handleSetToken";
import { Session } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { supabase } from "../../../../supabase/init";
import Nova from "../Font/nova";
import Loader from "../Loader";

const loginRoute = ["/auth/login"];
const authRoute = [
  "/auth/password",
  "/auth/verify",
  "/orders",
  "/profile",
  "/wishlist",
];

const privateTillAuthRoute = [
  "/auth/login",
  "/auth/password",
  "/auth/verify",
  "/orders",
  "/profile",
  "/wishlist",
];

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const { authCheck } = useAuthStore();
  const dispatch = useAppDispatch();

  const handleCreateSession = async () => {
    const currentSession = await supabase.auth.getSession();
    const { data: currentSessionData, error } = currentSession;

    if (currentSessionData && currentSessionData.session && !error) {
      const session = currentSessionData.session as Session;
      dispatch(
        setAuthData({
          profile: session.user,
          authenticated: true,
          token: session.access_token,
          authCheck: true,
        })
      );

      if (loginRoute.includes(path!)) {
        router.replace("/");
      }
    } else {
      const { data } = await supabase.auth.refreshSession();
      if (data && data.session) {
        await handleSetToken(data.session.access_token);
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
        if (loginRoute.includes(path!)) {
          router.replace("/");
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
