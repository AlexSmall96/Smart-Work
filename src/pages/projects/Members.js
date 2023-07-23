import React from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'

const Members = () => {
    
  const handleClick = () => {
    axiosReq.post("/members/", {
      "profile": 2,
      "project": 1,
  });
  }
  
  return (
    <div>
    <Button onClick={handleClick}>Create Member</Button>
    </div>
  )
}

export default Members