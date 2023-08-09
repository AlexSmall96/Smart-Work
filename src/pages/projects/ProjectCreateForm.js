import React, { useState } from "react";
import { format } from 'date-fns';
import styles from '../../App.module.css'
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from '../../App.module.css';

/* Allow users to create a new project */
function ProjectCreateForm() {
    // Initialize state variables
    const [errors, setErrors] = useState({});
    const [dueDateFeedback, setDueDateFeedback] = useState('')
    const [startDateFeedback, setStartDateFeedback] = useState('')
    const history = useHistory();
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        complexity: 'Low',
    });
    const currentUser = useCurrentUser();
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const {title, description, complexity} = projectData;
    /*
    Handle change for date inputs. The below code was taken from the following stack overflow forum
    https://stackoverflow.com/questions/67866155/how-to-handle-onchange-value-in-date-reactjs
    */
    const handleStartDateChange = (event) => {
        const newStartDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        if (newStartDate >= format(new Date(), 'yyyy-MM-dd')){
            setStartDate(newStartDate);
            setStartDateFeedback('')
        } else {
            setStartDateFeedback('Start Date cannot be in the past.')
        } 
    }
    const handleDueDateChange = (event) => {
        const newDueDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        if (newDueDate >= startDate){
            setDueDate(newDueDate);
            setDueDateFeedback('')
        } else {
            setDueDateFeedback('Due Date must be ahead of Start Date.')
        }
    }
    // Handle change for text inputs
    const handleChange = (event) => {
        setProjectData({
            ...projectData,
            [event.target.name]: event.target.value
        });
    };
    // Handle submit function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('complexity', complexity);
        formData.append('start_date', startDate.concat('T00:00:00.000000Z'));
        formData.append('due_date', dueDate.concat('T00:00:00.000000Z'));
        try {
            await axiosReq.post("/projects/", formData);
            history.push(`/projects/${currentUser?.profile_id}`);
            } catch (err) {
            // console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };
    
    return (
        <div>
            {/* Form to input chosen project details */}
            <Form onSubmit={handleSubmit}> 
            {/* Title */} 
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                className={appStyles.strongBorder} />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
             {message}
             </Alert>
             ))}
            {/* Description */}
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                className={`${styles.textField} ${appStyles.strongBorder}`}
                as="textarea" rows={3}
                size="sm"
                type="text"
                name="description"
                value={description}
                onChange={handleChange}/>
            </Form.Group>
            {errors?.description?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
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
                onChange={handleStartDateChange}
                className={appStyles.strongBorder} />
                </Col>
            </Form.Group>
            {startDateFeedback?(
            <Alert variant="warning">
                {startDateFeedback}
            </Alert>
            ):('')}
            {errors?.startDate?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
                {message}
             </Alert>
             ))}
            {/* Due Date */}
            <Form.Group as={Row} controlId="due-date">
                <Form.Label column xs="6">Due Date</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="due-date"
                value={dueDate}
                onChange={handleDueDateChange}
                className={appStyles.strongBorder} />
                </Col>
            </Form.Group>
            {dueDateFeedback?(
            <Alert variant="warning">
                {dueDateFeedback}
            </Alert>
            ):('')}
            {errors?.dueDate?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
             {message}
             </Alert>
             ))}
            {/* Complexity */}
            <Form.Group as={Row} controlId="complexity">
                <Form.Label column xs="6">Complexity</Form.Label>
                <Col xs="6">
                <Form.Control 
                as="select"
                name="complexity"
                value={complexity}
                onChange={handleChange}
                className={appStyles.strongBorder}
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
            {/* Cancel and create buttons */}
            <Button className={styles.horizontalMargin} onClick={() => history.goBack()} variant="primary" type="button">
                Cancel
            </Button>
            <Button variant="primary" type="submit">
                Create Project
            </Button>
            </Form>
        </div>
    );
};


export default ProjectCreateForm;