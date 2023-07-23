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
  
  const listProfiles = async () => {
    const profiles = await axiosReq.get('/profiles/')
    console.log(profiles)
  }
  
  return (
    <div>
    <Button onClick={listProfiles}>Log profiles</Button>
    </div>
  )
}

export default Members