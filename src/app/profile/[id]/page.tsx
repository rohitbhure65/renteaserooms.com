import React from 'react'
import User from '@/lib/model/UserModel';

const Userprofile = ({params}:any) => {
  return (
    <div>
      <h1>profile page</h1>
      <span>{params.id}</span>
    </div>
  )
}

export default Userprofile;
