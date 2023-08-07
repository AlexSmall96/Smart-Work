import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import styles from './../../styles/TasksPage.module.css'
import appStyles from '../../App.module.css'

const TasksPage = () => {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axiosReq.get(`/tasks/?assigned_to__profile=${id}`)
            setTasks(response.data)
        } catch(err){
            console.log(err)
        }
    }
    fetchTasks()
  }, [id])

  return (
    <>
    <Card>
        <Card.Header><strong>Your Tasks</strong></Card.Header>
        <Card.Header>
          <Row>
            <Col>Description</Col>
            <Col>Due Date</Col>
            <Col>Status</Col>
          </Row>
        </Card.Header>
        <Card.Body>
            {tasks.length?(
                tasks.map(task => 
                <Row className={styles.taskRow} key={task.id}>
                    <Col><strong>{task.project_title}: </strong>{task.description}</Col>
                    <Col>{task.due_date}</Col>
                    <Col>{task.status}</Col>
                </Row>)
            ):('No results')}
        </Card.Body>
    </Card>
      <Link to={`/projects/${id}`}><Button className={appStyles.verticalMargin}>Go to My Projects to edit your tasks.</Button></Link>
    </>
  )
}

export default TasksPage