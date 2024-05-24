import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../styles/CalendarTaskGroup.module.css';

const CalendarTaskGroup = ({taskGroup, projectData, projLength, year, noTasksYet}) => {

  /* Calculates the length of task group, individual task or gap in tasks */
  const getLength = (task, type) => {
    // Create arrays for all start dates and due dates in group
    let allStartDates = taskGroup.map(task => new Date(task.start_date).getTime());
    let allDueDates = taskGroup.map(task => new Date(task.due_date).getTime());
    // Declare start date and end date variables, value is dependent on type of span (group, task or gap)
    let startDate;
    let endDate;
    let outerLength;
    // If type is group take earliest start date and latest due date
    if (type == 'group'){
      startDate = Math.min(...allStartDates);
      endDate = Math.max(...allDueDates);
      outerLength = projLength;
    // If type is individual task take its own start date and due dates
    } else if (type == 'task'){
      startDate = new Date(task.start_date).getTime();
      endDate = new Date(task.due_date).getTime();
      outerLength = Math.max(...allDueDates) - Math.min(...allStartDates);
    // If type is a gap take the most recent due date and its own start date
    } else if (type == 'gap'){
      let currentTaskStartDate = new Date(task.start_date).getTime()
      let allDueDates = taskGroup.map(task => new Date(task.due_date).getTime());
      let pastDueDates = allDueDates.filter(date => currentTaskStartDate >= date);
      startDate = pastDueDates.length ? (Math.max(...pastDueDates)):(currentTaskStartDate);
      endDate = currentTaskStartDate;
      outerLength = Math.max(...allDueDates) - Math.min(...allStartDates);
    }
    // Determine entire range start and end points based on year
    let rangeStart = new Date(`01/01/${year}`).getTime()
    let rangeEnd = new Date(`12/31/${year}`).getTime()
    // // Sandwhiched in range
    if (rangeStart <= startDate && endDate <= rangeEnd){
      return 100 * (endDate - startDate) / outerLength;
    } 
    // 0 length case
    else if (rangeEnd < startDate || endDate < rangeStart){
      return 0;
    }
    // Full range case
    else if (startDate <= rangeStart && rangeEnd <= endDate){
      return 100;
    }
    // Starts before range
    if (startDate <= rangeStart && endDate <= rangeEnd){
      return 100 * (endDate - rangeStart) / outerLength;
    }
    // Ends after range
    else if (startDate >= rangeStart && endDate >= rangeEnd){
      return 100 * (rangeEnd - startDate) / outerLength;
    }
  };

  // Set colour of task based on status
  const getColor = (status, dueDate) => {
    return(
      status === 'Complete' ? ('#28a745'):(
        new Date(dueDate) < new Date() ? ('#dc3545'):(
          status === 'In Progress'?('#ffc107'):('#17a2b8')
        )
      )
    );
  };

  // Calculate time between first task start date and project start date
  const getOffset = () => {
    let allStartDates = taskGroup.map(task => new Date(task.start_date).getTime());
    let taskStartDate = Math.min(...allStartDates);
    let projectStartDate = new Date(projectData.start_date.slice(0,10)).getTime();
    let rangeStart = new Date(`01/01/${year}`)
    if (taskStartDate <= rangeStart){
      return 0;
    } else { 
      return 100 * (taskStartDate - projectStartDate) / projLength;
    };
  };

  return (
    <span className={`${styles.calTask}`}
      style={{
        width:`${getLength([], 'group')}%`,
        margin:`0 0 0 ${noTasksYet ? (
          0
        ):(
          getOffset())
        }%`,
        height:'18px',
        display:'block',
        backgroundColor:`lightgray`,
        overflow:'hidden',
        fontSize:'small',
        color:'white'
      }}
    > 
    {taskGroup.length ? (taskGroup.map(
      task => (
        <span key={task.id}>
          <span
            style={{
              width:`${getLength(task, 'gap')}%`,
              margin: '0 0 0 0',
              backgroundColor:`lightgray`,
              height:'100%',
              display:'inline-block',
              float:'left',
              overflow:'hidden',
            }}>
          </span>
          <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 300 }}
            overlay={
              <Tooltip id="button-tooltip">
                {(`${task.description} (Assigned to: ${task.assigned_to_username})`)}
              </Tooltip>
              }
          >
          <span className={styles.calTask}
            style={{
              width:`${getLength(task, 'task')}%`,
              margin: `0 0 0 0`,
              color:'white',
              height:'100%',
              display:'inline-block',
              fontSize:'small',
              overflow:'hidden',
              float:'left',
              backgroundColor: `${getColor(task.status, task.due_date)}`
            }}>
            {task.description}
          </span>
          </OverlayTrigger>
        </span>
      )
    )):('No Taks yet, click to add.')}
    </span>
  );
};

export default CalendarTaskGroup;
