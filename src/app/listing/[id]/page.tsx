import React from "react";

const UserListing = ({ params }: any) => {
  return (
    <div>
      <h1>listing page</h1>
      <span>{params.id}</span>
      <hr />
    </div>
  );
};

export default UserListing;
