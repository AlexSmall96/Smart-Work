import React, {useEffect, useState} from 'react';
import { Card, Tooltip, OverlayTrigger, ProgressBar } from 'react-bootstrap'
import styles from '../styles/CalendarTask.module.css'
import { format } from 'date-fns';

const CalendarTask = ({description, startDate, dueDate, status}) => {
    const [taskColor, setTaskColor] = useState(styles.notStarted);

    useEffect(() => {
        const colourTask = () => {
            setTaskColor(
                `${status === 'Complete'?
                (styles.complete):(
                   format(new Date(dueDate), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')? (styles.overdue):(
                    status === 'In Progress' ? (styles.inProgress):(styles.notStarted)
                   )
                )}`
            );
        }
        colourTask();
    }, [status]);

    const getLength = (startDate, dueDate) => {
        return 100*((new Date(dueDate)).getTime()-(new Date(startDate)).getTime())/ (1000 * 3600 * 24*365)
    }
    
    const yearStart = new Date("01/01/2024")
    const getOffset = (startDate) => {
        return Math.max(100*((new Date(startDate)).getTime()-(new Date(yearStart)).getTime())/ (1000 * 3600 * 24*365),0)
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {description}
        </Tooltip>
      );
 // Add hover box to show full task name
  return (
    <OverlayTrigger
    placement="top"
    delay={{ show: 150, hide: 300 }}
    overlay={renderTooltip}
>
    <ProgressBar>
        <ProgressBar className={styles.blankProgress} now={getOffset(startDate)} />
        <ProgressBar variant="warning" now={getLength(startDate, dueDate)} label={description} />
    </ProgressBar>
    </OverlayTrigger>
  )
}

export default CalendarTask