"use client";
import Nova from "@/app/components/Font/nova";
import Loader from "@/app/components/Loader";
import { useLazyGetUserByIdQuery } from "@/app/store/authentication/api";
import { getDifferenceInHours } from "@/app/utils/dates";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../../../../supabase/init";

const Verify = () => {
  const router = useRouter();
  const [getUser] = useLazyGetUserByIdQuery();

  const getCurrentSession = async () => {
    const res = await supabase.auth.getUser();
    if (res.data.user) {
      const createdBefore = getDifferenceInHours(res.data.user.created_at);
      if (createdBefore > 24) {
        router.replace("/");
      }

      const user = await getUser({ id: res.data.user.id });
      if (user.isSuccess && !user.data.password) {
        router.replace("/auth/password");
      } else {
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  };

  useEffect(() => {
    getCurrentSession();
  }, []);

  return (
    <div className="h-[calc(100dvh-60px)] sm:h-[calc(100dvh-85px)] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Loader />
        <Nova>Verifying...</Nova>
      </div>
    </div>
  );
};

export default Verify;
