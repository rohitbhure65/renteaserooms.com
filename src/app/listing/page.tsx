"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Listing = () => {
  //fixme
  const [data, setData] = useState("nothing");

  const getListingDetails= async () => {
    const res = await axios.get("/api/property/listing");
    // console.log(res.data);
    setData(res.data.data._id);
  };

  return (          
    <>    
      <h1>listing page</h1>
      <h2>
        {data === "nothing" ? ( 
          "Nothing" 
        ) : (
          <Link href={`/listing/${data}`}>{data}</Link>
        )}
      </h2>
      <button onClick={getListingDetails}>Get Listing Details</button>
    </>
  );
};  

export default Listing;
