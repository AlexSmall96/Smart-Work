import React from 'react'
import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';

const Task = () => {

    const [taskData, setTaskData] = useState({
        description: '',
        status: 'Not Started',
    })

    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'))

    const {description, status} = taskData

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

  return (
    <Accordion>
    <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <i className="fa-solid fa-list-check"></i> Add Task
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        <Form>  
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
            <Button variant="primary" type="button">
                Cancel
            </Button>
            <Button variant="primary" type="submit">
                Confirm
            </Button>
            </Form>
        </Card.Body>
        </Accordion.Collapse>
    </Card>
    </Accordion>
  )
}

export default Task