import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'

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
        <Card.Header>Your Tasks</Card.Header>
        <Card.Header>
          <Row>
            <Col>Description</Col>
            <Col>Start Date</Col>
            <Col>Due Date</Col>
            <Col>Status</Col>
          </Row>
        </Card.Header>
        <Card.Body>
            {tasks.length?(
                tasks.map(task => 
                <Row key={task.id}>
                    <Col>{task.description}</Col>
                    <Col>{task.start_date}</Col>
                    <Col>{task.due_date}</Col>
                    <Col>{task.status}</Col>
                </Row>)
            ):('No results')}
        </Card.Body>
    </Card>
      <Link to={`/projects/${id}`}><Button>Go to My Projects to edit your tasks.</Button></Link>
    </>
  )
}

export default TasksPage