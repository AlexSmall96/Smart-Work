import React from 'react'
import Avatar from '../../components/Avatar'
import { Button } from 'react-bootstrap'
import styles from '../../styles/Member.module.css'

const Member = ({
  variant, disabled, src, owner, organisation, onClick, id, height=55, active, selected
}) => {
  return (
    <Button className={`${styles.btn} ${styles.horizMargin}`} 
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