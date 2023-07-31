import React from 'react'
import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';
import { axiosReq } from '../../api/axiosDefaults'
import styles from '../../styles/Task.module.css'

const TaskCreateForm = () => {
    // const usernameToId = {}
    // for (let member of members){
    //     usernameToId[member.username] = member.id
    // }
    
    const [taskData, setTaskData] = useState({
        description: '',
        status: 'Not Started',
    })
    const {description, status} = taskData
    
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    // const [assignedTo, setAssignedTo] = useState('')

    const handleDueDateChange = (event) => {
        const newDueDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        setDueDate(newDueDate)
    }

    const handleStartDateChange = (event) => {
        const newStartDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        setStartDate(newStartDate)
    }
    const handleChange = (event) => {
        setTaskData({
            ...taskData,
            [event.target.name]: event.target.value
        })
    }

    // const handleAssignedToChange = (event) => {
    //     setAssignedTo(event.target.value)
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', '')
        formData.append('status', 'Not Started')
        // Update assigned to using project members list
        formData.append('assigned_to', 1)
        formData.append('start_date', '2023-07-20T00:00:00.000000Z')
        formData.append('due_date', '2023-07-02T00:00:00.000000Z')
        try {
            await axiosReq.post("/tasks/", formData);
            } catch (err) {
            console.log(err.response);
        }
    }

  return (
    <Accordion>
    <Card>
        <Card.Header className={styles.taskHeader}>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <i className="fa-solid fa-list-check"></i> Add Task
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        <Form onSubmit={handleSubmit}>  
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                type="text"
                name="description"
                value={description}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Row} controlId="start-date">
                <Form.Label column xs="6">Start Date</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="start-date"
                value={startDate}
                onChange={handleStartDateChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="due-date">
                <Form.Label column xs="6">Due Date</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="due-date"
                value={dueDate}
                onChange={handleDueDateChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="status">
                <Form.Label column xs="6">Status</Form.Label>
                <Col xs="6">
                <Form.Control 
                as="select"
                name="status"
                value={status}
                onChange={handleChange}
                >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Complete</option>
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="assigned-to">
                <Form.Label column xs="6">Assigned To:</Form.Label>
                <Col xs="6">
                <Form.Control 
                as="select"
                name="assigned-to"
                >
                <option>User 1</option>
                <option>User 2</option>
                </Form.Control> 
                </Col>
            </Form.Group>
            <Button variant="primary" type="button">
                Cancel
            </Button>
            <Button variant="primary" type="submit">
                Create Task
            </Button>
            </Form>
        </Card.Body>
        </Accordion.Collapse>
    </Card>
    </Accordion>
  )
}

export default TaskCreateForm