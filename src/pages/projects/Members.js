import React from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Button } from 'react-bootstrap'
const Members = () => {
    
  const handleClick = () => {
    axiosReq.post("/members/", {
      "profile": 1,
      "project": 1,
  });
  }
  return (
    <Button onClick={handleClick}>Create Test Member</Button>
  )
}

export default Members