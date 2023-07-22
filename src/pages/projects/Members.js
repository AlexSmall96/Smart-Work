import React from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'

const Members = () => {
    
  const handleClick = () => {
    axiosReq.post("/members/", {
      "profile": 1,
      "project": 4,
  });
  }
  const list = axiosReq.get('/members/')
  return (
    <div>
    <Button onClick={handleClick}>Create Test Member</Button>
    <p>{list.results}</p>
    </div>
  )
}

export default Members