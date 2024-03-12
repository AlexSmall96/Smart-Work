import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../styles/CalendarTask.module.css';

const CalendarTask = (task, width, offset, color) => {
return (
    <>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 300 }}
            overlay={
                <Tooltip id="button-tooltip">
                    {`${task.description} (Assigned to: ${task.assigned_to_username})`}
                </Tooltip>}
        >
        <div className={styles.calTask}
            style={{
                width:`${width}%`,
                margin:'0 0 0 0',
                height:'18px',
                color:'white',
                display:'block',
                fontSize:'small',
                backgroundColor:'green',
                overflow:'hidden'
            }}
        >{task.description}</div>
        </OverlayTrigger>
    </>
  )
}

export default CalendarTask