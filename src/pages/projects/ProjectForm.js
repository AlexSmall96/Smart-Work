import React from 'react'
import { useState } from 'react'
import { format } from 'date-fns';
import styles from '../../App.module.css'

import { Col, Row, Form, Alert, Card, Button } from 'react-bootstrap'
const ProjectForm = ({data}) => {
    const [disabled, setDisabled] = useState(true)
    const allowEdit = () => {
        console.log('clicked')
        setDisabled(false)
    }
    const [startDate, setStartDate] = useState(format(new Date(data.start_date), 'yyyy-MM-dd'))
    const [dueDate, setDueDate] = useState(format(new Date(data.due_date), 'yyyy-MM-dd'))
    const [projectData, setProjectData] = useState({
      title: data.title,
      description: data.description,
      complexity: data.complexity,
  })
    const {title, description, complexity} = projectData
    const [errors, setErrors] = useState({});
    const handleStartDateChange = (event) => {
        const newStartDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        setStartDate(newStartDate)
      }
      const handleDueDateChange = (event) => {
      const newDueDate = format(new Date(event.target.value), 'yyyy-MM-dd');
      setDueDate(newDueDate)
      }
      const handleChange = (event) => {
      setProjectData({
        ...projectData,
        [event.target.name]: event.target.value
        })
      }


  return (
    <Card>
    <Form>  
    <Form.Group controlId="title">
        <Form.Label className="d-none">Title</Form.Label>
        <Form.Control
        disabled={disabled}
        type="text"
        name="title"
        value={title}
        onChange={handleChange} />
    </Form.Group>
    {errors?.title?.map((message, idx) => (
    <Alert variant="warning" key={idx}>
     {message}
     </Alert>
     ))}
    <Form.Group controlId="description">
        <Form.Label className="d-none">Description</Form.Label>
        <Form.Control
        disabled={disabled}
        className={styles.textField}
        as="textarea" rows={3}
        size="sm"
        type="text"
        name="description"
        value={description}
        onChange={handleChange} />
    </Form.Group>
    {errors?.description?.map((message, idx) => (
    <Alert variant="warning" key={idx}>
     {message}
     </Alert>
     ))}
    <Form.Group as={Row} controlId="start-date">
        <Form.Label column xs="6">Start Date</Form.Label>
        <Col xs="6">
        <Form.Control
        disabled={disabled}
        type="date"
        name="start-date"
        value={startDate}
        onChange={handleStartDateChange} />
        </Col>
    </Form.Group>
    {errors?.startDate?.map((message, idx) => (
    <Alert variant="warning" key={idx}>
     {message}
     </Alert>
     ))}
    <Form.Group as={Row} controlId="due-date">
        <Form.Label column xs="6">Due Date</Form.Label>
        <Col xs="6">
        <Form.Control
        disabled={disabled}
        type="date"
        name="due-date"
        value={dueDate}
        onChange={handleDueDateChange} />
        </Col>
    </Form.Group>
    {errors?.dueDate?.map((message, idx) => (
    <Alert variant="warning" key={idx}>
     {message}
     </Alert>
     ))}
    <Form.Group as={Row} controlId="complexity">
        <Form.Label column xs="6">Complexity</Form.Label>
        <Col xs="6">
        <Form.Control
        disabled={disabled}
        as="select"
        name="complexity"
        value={complexity}
        onChange={handleChange}
        >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
        </Form.Control>
        </Col>
    </Form.Group>
    {errors?.complexity?.map((message, idx) => (
    <Alert variant="warning" key={idx}>
     {message}
     </Alert>
     ))}
    </Form>
    <Button type="button" onClick={allowEdit}>Edit Project</Button>
    </Card>
  )
}

export default ProjectForm