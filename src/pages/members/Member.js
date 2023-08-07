import React from 'react'
import Avatar from '../../components/Avatar'
import { Button } from 'react-bootstrap'
import styles from '../../styles/Member.module.css'

const Member = ({
  variant="outline-secondary", disabled=false, src, owner='', organisation='', onClick={}, id=0, height=55, active=true, selected=false
}) => {
  return (
    <Button className={styles.btn} 
      id={id} variant={variant} disabled={disabled} onClick={onClick} active={active}
    >
      <Avatar src={src} height={height}/>
    {owner}
    <br></br>
    {organisation}
    {selected? (<i className="fa-solid fa-check fa-sm"></i>):('')}
    <br></br>
    {disabled? (<small>Existing Member</small>):('')}
  </Button> 
  )
}

export default Member