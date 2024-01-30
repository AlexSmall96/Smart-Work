import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import styles from "../styles/Settings.module.css";
import appStyles from "../App.module.css";

const Settings = ({setColor}) => {
  return (
    <div>
    Choose Colour theme:
    <ButtonToolbar aria-label="Toolbar with button groups">
    <ButtonGroup className={"me-2"} aria-label="First group">
      <Button id="green" onClick={() => setColor(appStyles.green)} className={`${appStyles.green} ${styles.colorSelect}`}></Button> 
      <Button id="white" onClick={() => setColor(appStyles.white)} className={`${appStyles.white} ${styles.colorSelect}`}></Button> 
      <Button id="blue" onClick={() => setColor(appStyles.blue)} className={`${appStyles.blue} ${styles.colorSelect}`}></Button>
      <Button id="pink" onClick={() => setColor(appStyles.pink)} className={`${appStyles.pink} ${styles.colorSelect}`}></Button>
    </ButtonGroup>
  </ButtonToolbar>
  </div>
  )
}

export default Settings