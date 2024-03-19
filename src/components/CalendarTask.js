import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../styles/CalendarTask.module.css';
import format from 'date-fns/format';

const CalendarTask = ({task, projectData, projLength, yearView, year, month, monthNum, emptyProject}) => {
    
    const months =[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    const daysInMonth = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ]
    // Calculate length of task in relation to project
    const getTaskLength = (taskStartDate, taskDueDate) => {
        let length;
        let rangeStart = yearView ? (new Date(`01/01/${year}`).getTime()):(new Date(`${monthNum + 1}/01/${year}`).getTime())
        let rangeEnd = yearView ? (new Date(`12/31/${year}`).getTime()):(new Date(`${monthNum + 1}/${daysInMonth[monthNum]}/${year}`).getTime() )
        // Sandwhiched in range
        if (rangeStart <= taskStartDate && taskDueDate <= rangeEnd){
            length = 100 * (taskDueDate - taskStartDate + (yearView ? (0):(1000 * 3600 * 24))) / projLength
        // 0 length case
        } else if (rangeEnd < taskStartDate || taskDueDate < rangeStart){
            length = 0
        // Full range case
        } else if (taskStartDate <= rangeStart && rangeEnd <= taskDueDate){
            length = 100
        // Starts before range
        } else if (taskStartDate <= rangeStart && taskDueDate <= rangeEnd){
            length = 100 * (taskDueDate - rangeStart + (yearView ? (0):(1000 * 3600 * 24))) / projLength
        // Ends after range
        } else if (taskStartDate >= rangeStart && taskDueDate >= rangeEnd){
            length = 100 * (rangeEnd - taskStartDate + (yearView ? (0):(1000 * 3600 * 24))) / projLength
        }
        return length
    }

    // Calculate time between task start date and project start date
    const getTaskOffset = (taskStartDate, projStartDate) => {
        let monthNum = months.findIndex((element) => element === month)
        let rangeStart = yearView ? (new Date(`${monthNum + 1}/01/${year}`)):(new Date(`${monthNum + 1}/01/${year}`))   
        if (taskStartDate <= rangeStart){
            return 0
        } else { 
            return 100 * (taskStartDate - projStartDate) / projLength
        }
    }

    // Set colour of task based on status
    const getColor = (status, dueDate) => {
        return(
            status === 'Complete' ? ('#28a745'):(
                format(new Date(dueDate), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')?('#dc3545'):(
                    status === 'In Progress'?('#ffc107'):('#17a2b8')
                )
            )
        )
    }

return (
    <OverlayTrigger
    placement="top"
    delay={{ show: 150, hide: 300 }}
    overlay={
        <Tooltip id="button-tooltip">
            {!emptyProject ? (`${task.description} (Assigned to: ${task.assigned_to_username})`):(`No tasks yet, click to add.`)}
        </Tooltip>}
>
    <div className={styles.calTask}
        style={{
            width:`${!emptyProject ? (
                getTaskLength(
                    new Date(task.start_date).getTime(), 
                    new Date(task.due_date).getTime())):(
                getTaskLength(
                    new Date(projectData.start_date.slice(0,10)).getTime(), 
                    new Date(projectData.due_date.slice(0,10)).getTime())    
                )
                }%`,
            margin:`0 0 0 ${!emptyProject ? (
                getTaskOffset(
                    new Date(task.start_date).getTime(),
                    new Date(projectData.start_date.slice(0,10)).getTime())):(
                0)
            }%`,
            height:'18px',
            color:'white',
            display:'block',
            fontSize:'small',
            backgroundColor:`${!emptyProject ? (getColor(task.status, task.due_date)):('lightgray')}`,
            overflow:'hidden',
        }}
    >{!emptyProject ? (task.description):('')}</div>
</OverlayTrigger>
  )
}

export default CalendarTask