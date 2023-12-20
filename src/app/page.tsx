"use client";

// import { useEffect } from "react";
import { supabase } from "../../supabase/init";
import Homepage from "@/app/components/Home";
import { useEffect } from "react";

function Home() {
  // const handleLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: `${window.location.origin}`,
  //     },
  //   });
  // };

  useEffect(() => {
    supabase.auth.getSession().then(data => {
      if (data.data.session) {
        console.log(data.data.session);
      }
    });
  }, []);

  return <Homepage />;
}

export default Home;
