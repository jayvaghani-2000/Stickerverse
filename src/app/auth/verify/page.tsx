"use client";
import Nova from "@/app/components/Font/nova";
import Loader from "@/app/components/Loader";
import { useAppDispatch } from "@/app/store";
import { setAuthData, useAuthStore } from "@/app/store/authentication";
import { useLazyGetUserByIdQuery } from "@/app/store/authentication/api";
import { setGlobalData, useGlobalStore } from "@/app/store/global";
import { getDifferenceInHours } from "@/app/utils/dates";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../../../../supabase/init";

const Verify = () => {
  const router = useRouter();
  const { redirectTo } = useAuthStore();
  const { toast } = useGlobalStore();
  const { show } = toast;
  const dispatch = useAppDispatch();
  const [getUser] = useLazyGetUserByIdQuery();

  const handleCompleteVerify = () => {
    router.replace(redirectTo);
  };

  const getCurrentSession = async () => {
    const res = await supabase.auth.getUser();

    const resSession = await supabase.auth.getSession();
    if (res.data.user && resSession.data.session) {
      dispatch(
        setGlobalData({
          toast: {
            show: true,
            message: "Logged in successfully",
            type: "success",
          },
        })
      );
      dispatch(
        setAuthData({
          profile: res.data.user,
          authenticated: true,
          token: resSession.data.session.access_token,
        })
      );
      const createdBefore = getDifferenceInHours(res.data.user.created_at);
      if (createdBefore > 24) {
        handleCompleteVerify();
      }

      const user = await getUser({ id: res.data.user.id });
      if (user.isSuccess && !user.data.password) {
        router.replace("/auth/password");
      } else {
        handleCompleteVerify();
      }
    } else {
      setGlobalData({
        toast: {
          show: true,
          message: "Something went wrong!",
          type: "error",
        },
      });
      handleCompleteVerify();
    }
  };

  useEffect(() => {
    getCurrentSession();
  }, []);

  return (
    <div className="h-[calc(100dvh-60px)] sm:h-[calc(100dvh-85px)] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Loader />
        <Nova>{show ? "Redirecting..." : "Verifying..."}</Nova>
      </div>
    </div>
  );
};

export default Verify;
