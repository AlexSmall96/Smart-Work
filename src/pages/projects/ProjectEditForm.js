import React from 'react'
import { useState } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { format } from 'date-fns';
import styles from '../../App.module.css'
import { axiosReq } from '../../api/axiosDefaults';

const ProjectEditForm = ({data}) => {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(format(new Date(data.start_date), 'yyyy-MM-dd'))
  const [dueDate, setDueDate] = useState(format(new Date(data.due_date), 'yyyy-MM-dd'))
  const [projectData, setProjectData] = useState({
    title: data.title,
    description: data.description,
    complexity: data.complexity,
})
  const {title, description, complexity} = projectData
  const [errors, setErrors] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    
    formData.append('title', title)
    formData.append('description', description)
    formData.append('complexity', complexity)
    formData.append('start_date', startDate.concat('T00:00:00.000000Z'))
    formData.append('due_date', dueDate.concat('T00:00:00.000000Z'))

    try {
        const { data } = await axiosReq.put(`/projects/${data.project}`, formData);
        } catch (err) {
        console.log(err);
        if (err.response?.status !== 401) {
            setErrors(err.response?.data);
        }
    }
    };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          Edit Project
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details for {data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>  
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
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
                <Form.Label>Description</Form.Label>
                <Form.Control
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectEditForm
