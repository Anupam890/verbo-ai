"use client";

import React from 'react'
import { useParams } from 'next/navigation'

const FetchSearch = () => {
    const chatId = useParams();
  return (
    <div>{chatId}</div>
  )
}

export default FetchSearch