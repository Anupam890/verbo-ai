"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabase";
import Navbar from "../_components/Navbar";
import Datadisplay from "../_components/Datadisplay";

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

    setSearchData(data);
  };
  return (
    <div>
      <Navbar searchInputData={searchData} />
      <Datadisplay searchInputData={searchData} />
    </div>
  );
};

export default SearchData;
