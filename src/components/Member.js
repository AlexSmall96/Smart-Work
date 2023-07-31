import React from 'react'
import Avatar from './Avatar'
import { Button } from 'react-bootstrap'

const Member = ({
  variant, disabled, src, owner, onClick, id, height=55
}) => {
  return (
    <Button id={id} variant={variant} disabled={disabled} onClick={onClick}>
      <Avatar src={src} height={height}/>
    {owner}
  </Button> 
  )
}

export default Member