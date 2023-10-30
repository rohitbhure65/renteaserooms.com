import React from "react";

const Userprofile = ({ params }: any) => {
  return (
    <div>
      <h1>profile page</h1>
      <span>{params.id}</span>
      <hr />
    </div>
  );
};

export default Userprofile;
