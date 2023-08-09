import React from 'react';
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/TaskCreateForm.module.css';
import Alert from "react-bootstrap/Alert";

/* Allows any member of a project to create a task */
const TaskCreateForm = ({members, projectData, setTasks}) => {
    // Initialize variables
    const [errors, setErrors] = useState({});
    const [taskCreated, setTaskCreated] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [taskData, setTaskData] = useState({
        description: '',
        status: 'Not Started',
    });
    const {description, status} = taskData;
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [dueDateFeedback, setDueDateFeedback] = useState('')
    const [startDateFeedback, setStartDateFeedback] = useState('')
    const [assignedToId, setAssignedToId] = useState(0);

    // Set default assigned to as first member in list
    useEffect(() => {
        const fetchDefaultId = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectData.project}`);
            setAssignedToId(response.data[0].id);
          } catch(err){
            // console.log(err.response);
          }
        }
        fetchDefaultId();
      }, [projectData]);

    /*
    Handle change for date inputs. The below code was taken from the following stack overflow forum
    https://stackoverflow.com/questions/67866155/how-to-handle-onchange-value-in-date-reactjs
    */
    const handleDueDateChange = (event) => {
        const newDueDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        if (newDueDate >= startDate){
            setDueDate(newDueDate);
            setDueDateFeedback('')
        } else {
            setDueDateFeedback('Due Date must be ahead of Start Date.')
        }
    }
    const handleStartDateChange = (event) => {
        const newStartDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        if (newStartDate >= format(new Date(), 'yyyy-MM-dd')){
            setStartDate(newStartDate);
            setStartDateFeedback('')
        } else {
            setStartDateFeedback('Start Date cannot be in the past.')
        } 
    }
    // Handle text field changes
    const handleChange = (event) => {
        setTaskData({
            ...taskData,
            [event.target.name]: event.target.value
        });
    };
    // Handle assigned to change
    const handleAssignedToChange = (event) => {
        for (let child of event.target.children){
            if (child.value === event.target.value){
                setAssignedToId(child.id);
            }
        }
    };
    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('status', status);
        formData.append('assigned_to', Number(assignedToId));
        formData.append('start_date', startDate.concat('T00:00:00.000000Z'));
        formData.append('due_date', dueDate.concat('T00:00:00.000000Z'));
        try {
            await axiosReq.post("/tasks/", formData);
            setTaskCreated(true);
            } catch (err) {
                setErrors(err.response?.data);
        }
        try {
            const newTasks = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`);
            setTasks(newTasks.data);
            } catch (err) {
            // console.log(err.response);
        }
    }

    // Set expanded and task created variables
    const handleClick = () => {
        setTaskCreated(false)
        setTaskData({
            description: '',
            status: 'Not Started',
        });
        setStartDate(format(new Date(), 'yyyy-MM-dd'));
        setDueDate(format(new Date(), 'yyyy-MM-dd'));
    };
    const handleHide = () => {
        if (expanded){
            setExpanded(false);
            setTaskCreated(false);
        } else {
            setExpanded(true);
        }
    };

  return (
    <Accordion>
    <Card>
        <div className={styles.left}>
        Tasks: 
        <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={handleHide}>
             {expanded?(
             <strong>Hide</strong>
             ):(<>
            <i className="far fa-plus-square"></i></>)}
        </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        {taskCreated?(<div><p>Task Created Succesfully</p><Button onClick={handleClick}>Create new task</Button></div>):(
        <Form onSubmit={handleSubmit}>
        {/* Description */}
        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            type="text"
            name="description"
            value={description}
            onChange={handleChange} />
        </Form.Group>
        {errors.description?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
        {/* Start Date */}
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
        {startDateFeedback?(
            <Alert variant="warning">
                {startDateFeedback}
            </Alert>
            ):('')}
        {/* Due Date */}
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
        {dueDateFeedback?(
            <Alert variant="warning">
                {dueDateFeedback}
            </Alert>
            ):('')}
        {/* Status */}
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
        {/* Assigned to */}
        <Form.Group as={Row} controlId="assigned-to">
            <Form.Label column xs="6">Assigned To:</Form.Label>
            <Col xs="6">
            <Form.Control 
            as="select"
            name="assigned-to"
            onChange={handleAssignedToChange}
            >
            {members.map(member => <option id={member.id} key={member.id}>{member.member_username}</option>)}
            </Form.Control> 
            </Col>
        </Form.Group>
        {/* Submit button */}
        <Button variant="primary" type="submit">
            Create Task
        </Button>
        </Form>
        )}
        </Card.Body>
        </Accordion.Collapse>
    </Card>
    </Accordion>
  );
};

export default TaskCreateForm;