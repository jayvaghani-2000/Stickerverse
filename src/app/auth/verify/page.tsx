"use client";
import Nova from "@/app/components/Font/nova";
import Loader from "@/app/components/Loader";
import { useLazyGetUserByIdQuery } from "@/app/store/authentication/api";
import { useEffect } from "react";
import { supabase } from "../../../../supabase/init";

const Verify = () => {
  const [getUser] = useLazyGetUserByIdQuery();

  const getCurrentSession = async () => {
    const res = await supabase.auth.getUser();
    if (res.data.user) {
      const user = await getUser({ id: res.data.user.id });
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
