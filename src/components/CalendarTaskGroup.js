import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../styles/CalendarTaskGroup.module.css';

const CalendarTaskGroup = ({ taskGroup, projectData, projLength, year, noTasksYet }) => {
  // Gets length of task, group of tasks, gap between tasks or offset between project start date and task start date
  const getSpanLength = (task, type, isOffset) => {
    // Declare date range variables
    const allStartDates = taskGroup.map((task) => new Date(task.start_date).getTime());
    const allDueDates = taskGroup.map((task) => new Date(task.due_date).getTime());
    const minStartDate = Math.min(...allStartDates);
    const rangeStart = new Date(`01/01/${year}`).getTime();
    const rangeEnd = new Date(`12/31/${year}`).getTime();
    // If Offset argument is true, calculate the project start date
    if (isOffset) {
      const projectStartDate = new Date(projectData.start_date.slice(0, 10)).getTime();
      // Return either 0 if first start date comes before year start, length of time between project start date and first task start date
      if (minStartDate <= rangeStart) {
        return 0;
      } else {
        return (100 * (minStartDate - projectStartDate)) / projLength;
      }
    // If Offset argument not true, check case where type is group of tasks, singular task or a gap in between tasks
    } else {
      let startDate;
      let endDate;
      let outerLength;
      if (type === 'group') {
        startDate = minStartDate;
        endDate = Math.max(...allDueDates);
        outerLength = projLength;
      } else if (type === 'task') {
        startDate = new Date(task.start_date).getTime();
        endDate = new Date(task.due_date).getTime();
        outerLength = Math.max(...allDueDates) - minStartDate;
      } else if (type === 'gap') {
        const currentTaskStartDate = new Date(task.start_date).getTime();
        const pastDueDates = allDueDates.filter((date) => currentTaskStartDate >= date);
        startDate = pastDueDates.length ? Math.max(...pastDueDates) : currentTaskStartDate;
        endDate = currentTaskStartDate;
        outerLength = Math.max(...allDueDates) - minStartDate;
      }
      // Return a different length depending on year start and end, and start and end dates of span
      if (rangeStart <= startDate && endDate <= rangeEnd) {
        return (100 * (endDate - startDate)) / outerLength;
      } else if (rangeEnd < startDate || endDate < rangeStart) {
        return 0;
      } else if (startDate <= rangeStart && rangeEnd <= endDate) {
        return 100;
      } else if (startDate <= rangeStart && endDate <= rangeEnd) {
        return (100 * (endDate - rangeStart)) / outerLength;
      } else if (startDate >= rangeStart && endDate >= rangeEnd) {
        return (100 * (rangeEnd - startDate)) / outerLength;
      }
    }
  };

  // Gets the colour of a task based on status
  const getColor = (status, dueDate) => {
    // Complete tasks are green
    return status === 'Complete'
      ? '#28a745'
      // Overdue tasks are red
      : new Date(dueDate) < new Date()
        ? '#dc3545'
        // In Progress tasks are amber, not started tasks are blue
        : status === 'In Progress'
          ? '#ffc107'
          : '#17a2b8';
  };

  return (
    // Create an outer span for task group
    <span
      className={`${styles.calTask}`}
      style={{
        width: `${getSpanLength([], 'group', false)}%`,
        margin: `0 0 0 ${noTasksYet ? 0 : getSpanLength(null, null, true)}%`,
        height: '18px',
        display: 'block',
        backgroundColor: 'lightgray',
        overflow: 'hidden',
        fontSize: 'small',
        color: 'white',
      }}
    >
      {/* For each task in group, create a span and a gap based on start dates and due dates*/}
      {taskGroup.length
        ? taskGroup.map((task) => (
          <span key={task.id}>
            <span
              style={{
                width: `${getSpanLength(task, 'gap', false)}%`,
                margin: '0 0 0 0',
                backgroundColor: 'lightgray',
                height: '100%',
                display: 'inline-block',
                float: 'left',
                overflow: 'hidden',
              }}
            />
            <OverlayTrigger
              placement="top"
              delay={{ show: 150, hide: 300 }}
              overlay={
                <Tooltip id="button-tooltip">
                  {`${task.description} (Assigned to: ${task.assigned_to_username})`}
                </Tooltip>
              }
            >
              <span
                className={styles.calTask}
                style={{
                  width: `${getSpanLength(task, 'task', false)}%`,
                  margin: '0 0 0 0',
                  color: 'white',
                  height: '100%',
                  display: 'inline-block',
                  fontSize: 'small',
                  overflow: 'hidden',
                  float: 'left',
                  backgroundColor: `${getColor(task.status, task.due_date)}`,
                }}
              >
                {task.description}
              </span>
            </OverlayTrigger>
          </span>
        ))
        : 'No Tasks yet, click to add.'}
    </span>
  );
};

export default CalendarTaskGroup;