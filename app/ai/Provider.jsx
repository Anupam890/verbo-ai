"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useCallback, useState } from "react";
import { supabase } from "@/services/supabase";
import { UserDataContext } from "@/context/UserContext";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userDataDetails, setUserDataDetails] = useState([]);

  const createAccount = useCallback(async () => {
    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("email", user?.primaryEmailAddress?.emailAddress);

    if (selectError) return;

    if (!existingUser || existingUser.length === 0) {
      const { data, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
          },
        ])
        .select();
      if (!insertError) setUserDataDetails(data[0]);
      return;
    } else {
      setUserDataDetails(existingUser[0]);
    }
  }, [user]);

  useEffect(() => {
    if (user) createAccount();
  }, [user, createAccount]);

  return (
    <UserDataContext.Provider value={{ user, userDataDetails ,setUserDataDetails}}>
      <div className="w-full">{children}</div>
    </UserDataContext.Provider>
  );
};

export default Provider;
