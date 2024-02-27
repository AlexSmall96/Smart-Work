import React, { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { Card, Container, Col, Row, ProgressBar } from 'react-bootstrap';
import CalendarTask from '../components/CalendarTask';
import styles from '../styles/CalendarProject.module.css';
import { format } from 'date-fns';

const CalendarProject = ({projectData}) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`);
            setTasks(response.data);
            setHasLoaded(true);
          } catch(err){
            // console.log(err.response);
          }
        }
        fetchTasks();
      }, [projectData.project]);

    const getLength = (startDate, dueDate) => {
        return 100*((new Date(dueDate)).getTime()-(new Date(startDate)).getTime())/ (1000 * 3600 * 24*365)
    }
    
    const yearStart = new Date("01/01/2024")
    const getOffset = (startDate) => {
        return Math.max(100*((new Date(startDate)).getTime()-(new Date(yearStart)).getTime())/ (1000 * 3600 * 24*365),0)
    }
    
    const getVariant = (status, dueDate) => {
        return(
            status === 'Complete'?('success'):(
                format(new Date(dueDate), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')?('danger'):(
                    status === 'In Progress'?('warning'):('info')
                )
            )
        )
    }
    
  return (
        <Row>
            <Col sm={2}>
                <Card>
                    <Card.Header>
                        {projectData.title}
                    </Card.Header>
                </Card>
            </Col>
            <Col sm={10}>
                <Card>
                    <Card.Header>{
                    tasks.length?(
                        tasks.map(
                            task => 
                                <ProgressBar key={task.id}>
                                    <ProgressBar className={styles.blankProgress} now={getOffset(task.start_date)} />
                                    <ProgressBar variant={getVariant(task.status, task.due_date)} now={getLength(task.start_date, task.due_date)} label={task.description} />
                                </ProgressBar>)):('')}
                    </Card.Header>
                </Card>
            </Col>
        </Row>
  )
}

export default CalendarProject