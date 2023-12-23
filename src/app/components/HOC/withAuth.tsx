"use client";
import { useAppDispatch } from "@/app/store";
import { setAuthData, useAuthStore } from "@/app/store/authentication";
import React, { useEffect } from "react";
import { supabase } from "../../../../supabase/init";

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { redirectTo } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(data => {
      if (data.data.session) {
        dispatch(
          setAuthData({
            profile: data.data.session.user,
            authenticated: true,
            authCheck: true,
          })
        );
      } else {
        dispatch(
          setAuthData({
            authCheck: false,
          })
        );
      }
    });
  }, []);

  return <>{children}</>;
};

export default WithAuth;
