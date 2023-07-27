import React from 'react'
import Avatar from './Avatar'
import { Button } from 'react-bootstrap'

const Member = ({profile, onClick, selected, disabled}) => {
  return (
    <Button id={profile.id} onClick={onClick} selected={selected} disabled={disabled} className="btn-secondary">
      <Avatar src={profile.image} height={55}/>
    {profile.owner}
  </Button> 
  )
}

export default Member