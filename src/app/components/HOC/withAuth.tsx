"use client";
import { useAppDispatch } from "@/app/store";
import { setAuthData } from "@/app/store/authentication";
import React, { useEffect } from "react";
import { supabase } from "../../../../supabase/init";

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const handleCreateSession = async () => {
    const { data } = await supabase.auth.refreshSession();

    if (data && data.session) {
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

  return <>{children}</>;
};

export default WithAuth;
