"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabase";
import Navbar from "../_components/Navbar";

const SearchData = () => {
  const [searchData, setSearchData] = useState("");
  const { chatId } = useParams();
  useEffect(() => {
    getSearchData();
  }, []);

  const getSearchData = async () => {
    const { data, error } = await supabase
      .from("chatHistory")
      .select("*")
      .eq("chatId", chatId);
  };
  return (
    <div>
        <Navbar searchInputData={searchData}/>
    </div>
  )
};

export default SearchData;
