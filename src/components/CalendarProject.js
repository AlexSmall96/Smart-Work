import React, { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { Button, Card, Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import styles from '../styles/CalendarProject.module.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CalendarProject = ({projectData, userId, taskFilter, year, month, monthNum, yearView}) => {
    // Initialize variables
    const [tasks, setTasks] = useState([]);
    const [stackedTasks, setStackedTasks] = useState([])
    const [singleTasks, setSingleTasks] = useState([])
    const [usersTasks, setUsersTasks] = useState([])
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
    // Get the tasks associated with the project
    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`);
            // All Tasks
            setTasks(response.data);
            // Users tasks based on filter
            setUsersTasks(
                response.data.filter(
                    task => task.assigned_to_profile_id === parseInt(userId)
                )
            )
            // Tasks which can be stacked on same line
            setStackedTasks(
                [response.data[0]].concat(
                    response.data.filter(task => new Date(task.start_date) >= new Date(response.data[0].due_date))
                )
            )
            // Tasks which are on seperate lines
            setSingleTasks(
                response.data.filter(
                    task => new Date(task.start_date) < new Date(response.data[0].due_date) && task.id != response.data[0].id
                )
            )
          } catch(err){
            // console.log(err.response);
          }
        }
        fetchTasks();
      }, [projectData.project]);
    

    // Calculate length of project in relation to year or month
    const getProjectLength = (startDate, dueDate) => {
    let length;
        let yearStart = new Date(`01/01/${year}`).getTime()
        let yearEnd = new Date(`12/31/${year}`).getTime()
        // Sandwhiched in year
        if (yearStart <= startDate && dueDate <= yearEnd){
            length = dueDate - startDate
        }
        // 0 length case
        else if (yearEnd < startDate || dueDate < yearStart)  {
            length = 0
        // Full year case
        } else if (startDate <= yearStart && yearEnd <= dueDate) {
            length = yearEnd - yearStart
        // Starts before year
        } else if (startDate <= yearStart && dueDate <= yearEnd){
            length = dueDate - yearStart
        // Ends after year
        } else if (startDate >= yearStart && dueDate >= yearEnd){
            length = yearEnd - startDate
        }
        return length
    }

    const getProjectLengthMonth = (startDate, dueDate) => {
        let monthStart = new Date(`${monthNum + 1}/01/${year}`).getTime()
        let monthEnd = new Date(`${monthNum + 1}/${daysInMonth[monthNum]}/${year}`).getTime() 
        // Sandwhiched in month
        let length;
        if (monthStart <= startDate && dueDate <= monthEnd){
            length = dueDate - startDate + 1000 * 3600 * 24
        }
        // 0 length case
        else if (monthEnd < startDate || dueDate < monthStart)  {
            length = 0
        // Full month case
        } else if (startDate <= monthStart && monthEnd <= dueDate) {
            length = monthEnd + 1000 * 3600 * 24 - monthStart
        // Starts before month
        } else if (startDate <= monthStart && dueDate <= monthEnd){
            length = dueDate - monthStart + 1000 * 3600 * 24
        // Ends after month
        } else if (startDate >= monthStart && dueDate >= monthEnd){
            length = monthEnd + 1000 * 3600 * 24 - startDate 
        }
        return length ;
    }

    
            
    // Calculate length of task in relation to project
    const getTaskLength = (taskStartDate, taskDueDate, projStartDate, projDueDate) => {
        let projLength = getProjectLength(projStartDate, projDueDate)
        let yearStart = new Date(`01/01/${year}`).getTime()
        let yearEnd = new Date(`12/31/${year}`).getTime()
        // Sandwhiched in year
        if (yearStart <= taskStartDate && taskDueDate <= yearEnd){
            length = 100 * (taskDueDate - taskStartDate) / projLength
        // 0 length case
        } else if (yearEnd < taskStartDate || taskDueDate < yearStart){
            length = 0
        // Full year case
        } else if (taskStartDate <= yearStart && yearEnd <= taskDueDate){
            length = 100
        // Starts before year
        } else if (taskStartDate <= yearStart && taskDueDate <= yearEnd){
            length = 100 * (taskDueDate - yearStart) / projLength
        // Ends after year
        } else if (taskStartDate >= yearStart && taskDueDate >= yearEnd){
            length = 100 * (yearEnd - taskStartDate) / projLength
        }
        return length
    }

    const getTaskLengthMonth = (taskStartDate, taskDueDate, projStartDate, projDueDate) => {
        let projLengthMonth = getProjectLengthMonth(projStartDate, projDueDate)
        let monthStart = new Date(`${monthNum + 1}/01/${year}`).getTime()
        let monthEnd = new Date(`${monthNum + 1}/${daysInMonth[monthNum]}/${year}`).getTime()
        // Sandwhiched in month
        if (monthStart <= taskStartDate && taskDueDate <= monthEnd){
            length = 100 * (taskDueDate + 1000 * 3600 * 24 - taskStartDate) / projLengthMonth
        // 0 length case
        } else if (monthEnd < taskStartDate || taskDueDate < monthStart){
            length = 0
        // Full month case
        } else if (taskStartDate <= monthStart && monthEnd <= taskDueDate){
            length = 100
        // Starts before month
        } else if (taskStartDate <= monthStart && taskDueDate <= monthEnd){
            length = 100 * (taskDueDate + 1000 * 3600 * 24 - monthStart) / projLengthMonth
        // Ends after month
        } else if (taskStartDate >= monthStart && taskDueDate >= monthEnd){
            length = 100 * (monthEnd + 1000 * 3600 * 24 - taskStartDate) / projLengthMonth
        }
        return length
    }

    // Calculate time between project start date and year start
    const getProjectOffset = (startDate) => {
        let yearStart = new Date(`01/01/${year}`)
        return 100*Math.max(startDate.getTime()-yearStart.getTime(),0) / (1000 * 3600 * 24*365)
    }

    const getProjectOffsetMonth = (startDate) => {
        let monthStart = new Date(`${monthNum + 1}/01/${year}`)
        return 100*Math.max(startDate.getTime()-monthStart.getTime(),0) / (1000 * 3600 * 24 * daysInMonth[monthNum])
    }

    // Calculate time between task start date and project start date
    const getTaskOffset = (taskStartDate, projStartDate, projDueDate) => {
        let yearStart = new Date(`01/01/${year}`)
        let projLength = getProjectLength(projStartDate, projDueDate)
        if (taskStartDate <= yearStart){
            return 0
        } else { 
            return 100 * (taskStartDate - projStartDate) / projLength
        }
    }

    const getTaskOffsetMonth = (taskStartDate, projStartDate, projDueDate) => {
        let monthNum = months.findIndex((element) => element === month)
        let monthStart = new Date(`${monthNum + 1}/01/${year}`)
        let projLengthMonth = getProjectLengthMonth(projStartDate, projDueDate)
        if (taskStartDate <= monthStart){
            return 0
        } else { 
            return 100 * (taskStartDate - projStartDate) / projLengthMonth
        }
    }

    // Calculate position of stacked tasks
    const getStackedOffset = (startDate, prevDueDate) => {
        return Math.max(100*((new Date(startDate)).getTime()-(new Date(prevDueDate)).getTime())/ (1000 * 3600 * 24*365),0)
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
    <Card className={styles.outerProjectCard}>
        <Card.Header className={styles.projectCard}>
            <Row>
                <Col className={styles.projectTitle} xs={2}>
                    {projectData.title}
                </Col>
                <Col xs={10}>
                <Link to={`/projects/project/${projectData.project}`}>
                    <div className={styles.greyBackground}
                    style={{
                            width: yearView? (
                                `${100*getProjectLength(
                                    new Date(projectData.start_date.slice(0,10)).getTime(),
                                    new Date(projectData.due_date.slice(0,10)).getTime()
                                ) / (1000 * 3600 * 24 * 365)}%`
                            ):(
                                `${100*getProjectLengthMonth(
                                new Date(projectData.start_date.slice(0,10)).getTime(),
                                new Date(projectData.due_date.slice(0,10)).getTime()
                                )/ (1000 * 3600 * 24 * daysInMonth[monthNum])}%`
                            ),
                        margin:`0 0 0 ${
                            yearView? (
                                getProjectOffset(new Date(projectData.start_date.slice(0,10)))
                            ):(
                                getProjectOffsetMonth(new Date(projectData.start_date.slice(0,10)))
                            )
                        }%`
                    }}
                    >
                    {/* {
                    stackedTasks.length?(
                        stackedTasks.map(
                            task => 
                                <div className={styles.calTask}
                                    style={{
                                        width:`${getLength(task.start_date, task.due_date)}%`,
                                        margin:`0 0 -7px ${
                                            task.id === stackedTasks[0].id ? (getOffset(task.start_date)):(getStackedOffset(task.start_date, stackedTasks[0].due_date))
                                        }%`,
                                        height:'18px',
                                        color:'white',
                                        display:'inline-block',
                                        fontSize:'small',
                                        backgroundColor:`${getColor(task.status, task.due_date)}`,
                                        overflow:'hidden'
                                    }}
                                >{task.description}</div>
                        )):('')} */}
                    {taskFilter === "all-tasks" ? (
                        tasks.length?(
                            tasks.map(task =>
                                    <OverlayTrigger
                                        key={task.id}
                                        placement="top"
                                        delay={{ show: 150, hide: 300 }}
                                        overlay={
                                            <Tooltip id="button-tooltip">
                                                {`${task.description} (Assigned to: ${task.assigned_to_username})`}
                                            </Tooltip>}
                                    >
                                        <div className={styles.calTask}
                                            style={{
                                                width:`${yearView ? (
                                                    getTaskLength(
                                                        new Date(task.start_date).getTime(), 
                                                        new Date(task.due_date).getTime(), 
                                                        new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                        new Date(projectData.due_date.slice(0,10)).getTime())
                                                ):(
                                                    getTaskLengthMonth(
                                                        new Date(task.start_date).getTime(), 
                                                        new Date(task.due_date).getTime(), 
                                                        new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                        new Date(projectData.due_date.slice(0,10)).getTime())                                                    
                                                )
                                            }%`,
                                                margin:`0 0 0 ${
                                                    yearView?(
                                                        getTaskOffset(
                                                            new Date(task.start_date).getTime(),
                                                            new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                            new Date(projectData.due_date.slice(0,10)).getTime())
                                                    ):(
                                                        getTaskOffsetMonth(
                                                            new Date(task.start_date).getTime(),
                                                            new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                            new Date(projectData.due_date.slice(0,10)).getTime())                                                       
                                                    )
                                                }%`,
                                                height:'18px',
                                                color:'white',
                                                display:'block',
                                                fontSize:'small',
                                                backgroundColor:`${getColor(task.status, task.due_date)}`,
                                                overflow:'hidden'
                                            }}
                                        >{task.description}</div>
                                    </OverlayTrigger>
                                
                            )
                        ):
                        ('')
                    ) : (usersTasks.length?(
                            usersTasks.map(task =>
                                <OverlayTrigger
                                    key={task.id}
                                    placement="top"
                                    delay={{ show: 150, hide: 300 }}
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                            {`${task.description} (Assigned to: ${task.assigned_to_username})`}
                                        </Tooltip>}
                                >
                                    <div className={styles.calTask}
                                        style={{
                                            width:`${yearView ? (
                                                getTaskLength(
                                                    new Date(task.start_date).getTime(), 
                                                    new Date(task.due_date).getTime(), 
                                                    new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                    new Date(projectData.due_date.slice(0,10)).getTime())
                                            ):(
                                                getTaskLengthMonth(
                                                    new Date(task.start_date).getTime(), 
                                                    new Date(task.due_date).getTime(), 
                                                    new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                    new Date(projectData.due_date.slice(0,10)).getTime())                                                    
                                            )
                                        }%`,
                                            margin:`0 0 0 ${
                                                yearView?(
                                                    getTaskOffset(
                                                        new Date(task.start_date).getTime(),
                                                        new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                        new Date(projectData.due_date.slice(0,10)).getTime())
                                                ):(
                                                    getTaskOffsetMonth(
                                                        new Date(task.start_date).getTime(),
                                                        new Date(projectData.start_date.slice(0,10)).getTime(), 
                                                        new Date(projectData.due_date.slice(0,10)).getTime())                                                       
                                                )
                                            }%`,
                                            height:'18px',
                                            color:'white',
                                            display:'block',
                                            fontSize:'small',
                                            backgroundColor:`${getColor(task.status, task.due_date)}`,
                                            overflow:'hidden'
                                        }}
                                    >{task.description}</div>
                                </OverlayTrigger>
                            )
                        ):('')
                    )
                    }
                    </div>
                </Link>
                </Col>
            </Row>
        </Card.Header>
    </Card> 
  )
}

export default CalendarProject