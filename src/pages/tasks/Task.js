import React, {useEffect, useState} from 'react';
import { Container, Form, Col, Row, Button, Accordion, Card } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Task.module.css';
import { format } from 'date-fns';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Alert from "react-bootstrap/Alert";
import appStyles from '../../App.module.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

/* Task component to be attached to the corresponding project */
const Task = ({task, setTasks, projectData}) => {
    // Initialize variables
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id;
    const is_task_owner = profile_id === task.assigned_to_profile_id;
    const [taskUpdated, setTaskUpdated] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskDueDate, setTaskDueDate] = useState(format(new Date(task.start_date), 'yyyy-MM-dd'));
    const [taskStartDate, setTaskStartDate] = useState(format(new Date(task.due_date), 'yyyy-MM-dd'));
    const [status, setStatus] = useState(task.status);
    const [taskClass, setTaskClass] = useState(styles.taskHeader);
    const [dueDateFeedback, setDueDateFeedback] = useState('')
    const [startDateFeedback, setStartDateFeedback] = useState('')
    const [errors, setErrors] = useState({});
    const [warning, setWarning] = useState(styles.hidden)


    // Colour tasks based on status when component updates
    useEffect(() => {
        const colourTask = () => {
            setTaskClass(
                `${styles.taskHeader} ${task.status === 'Complete'?
                (styles.complete):(
                   format(new Date(task.due_date), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')? (styles.overdue):(
                    task.status === 'In Progress' ? (styles.inProgress):('')
                   )
                )}`
            );
        }
        const showWarning = () => {
            setWarning(
                format(new Date(task.due_date), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')?(styles.visible):(styles.hidden)
            )
        }
        colourTask();
        showWarning();
    }, [task]);
    
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Task overdue
        </Tooltip>
      );
    /*
    Handle change for date inputs. The below code was taken from the following stack overflow forum
    https://stackoverflow.com/questions/67866155/how-to-handle-onchange-value-in-date-reactjs
    */
    const handleDueDateChange = (event) => {
        const newDueDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        if (newDueDate >= taskStartDate){
            setTaskDueDate(newDueDate);
            setDueDateFeedback('')
        } else {
            setDueDateFeedback('Due Date must be ahead of Start Date.')
        }
    }
    const handleStartDateChange = (event) => {
        const newStartDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        if (newStartDate >= format(new Date(), 'yyyy-MM-dd')){
            setTaskStartDate(newStartDate);
            setStartDateFeedback('')
        } else {
            setStartDateFeedback('Start Date cannot be in the past.')
        } 
    }
    // Handle text field changes
    const handleDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', taskDescription);
        formData.append('start_date', taskStartDate.concat('T00:00:00.000000Z'));
        formData.append('due_date', taskDueDate.concat('T00:00:00.000000Z'));
        formData.append('status', status);
        formData.append('assigned_to', task.assigned_to);
        try {
            await axiosRes.put(`/tasks/${task.id}`, formData);
            setTaskUpdated(true);
        } catch(err){
            setErrors(err.response?.data);
        }
        try {
            const newTasks = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`);
            setTasks(newTasks.data);
            setTaskClass(
                `${styles.taskHeader} ${task.status === 'In Progress'?
                (styles.inProgress):(
                   task.status === 'Complete'? (styles.complete):('')
                )}`
            );
        } catch (err) {
            // console.log(err.response);
        }   
    };
        // Set expanded and updated flags
        const handleClick = () => {
            setTaskUpdated(false);
        };
        const handleHide = () => {
            if (expanded){
                setExpanded(false);
                setTaskUpdated(false);
            } else {
                setExpanded(true);
            }
        };

  return (
    <Accordion>
    <Card>
        <Card.Header className={`${taskClass}`}>
        <Container fluid>
                        {/* Show task data*/}
                        <Row>
                            <Col xs={{span:6, order:3}} md={{span:2, order:1}}><span className={styles.hidden}>Assigned To: </span>{task.assigned_to_username}</Col>
                            <Col xs={{span:6, order:5}} md={{span:1, order:2}}>
                            <Link to={`/profiles/${task.assigned_to_profile_id}`}><Avatar src={task.assigned_to_image} height={30}/></Link>
                            </Col>                      
                            <Col xs={{span:8, order:1}} md={{span:3, order:3}} className={styles.description}>{task.description}</Col>
                            <Col xs={{span:6, order:4}} md={{span:2, order:4}}><span className={styles.hidden}> Due: </span>    
    <OverlayTrigger
      placement="left"
      delay={{ show: 150, hide: 300 }}
      overlay={renderTooltip}
    >
        <i className={`${warning} fa-solid fa-triangle-exclamation`}></i>
    </OverlayTrigger>
         {` ${format(new Date(task.due_date), "dd-MM-yyyy")}`}</Col>
                            <Col xs={{span:4, order:2}} md={{span:2, order:5}} className={styles.description}>{task.status}</Col>
                            <Col xs={{span:6, order:6}} md={{span:2, order:6}}>
                            {is_task_owner?(<>
                            <Link to={`/tasks/delete/${task.id}`}><i className="fa-solid fa-trash-can"></i></Link>
                            <Accordion.Toggle onClick={handleHide} as={Button} variant="link" eventKey="0">
                            {expanded?(<strong>Hide</strong>):(<i className="fa-solid fa-pen-to-square"></i>)}
                            </Accordion.Toggle>
                            </>):('')}
                            </Col>
                        </Row>
        </Container>

        </Card.Header>
        <Accordion.Collapse eventKey="0">
        {/* Feedback message */}
        <Card.Body>
        {taskUpdated?(<div><p>Task Updated Succesfully</p><Button onClick={handleClick}>Update more details</Button></div>):(
        <Form>
        {/* Description */}
        <Form.Group as={Row} controlId="description">
                <Form.Label column xs="6">Description:</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="text"
                name="description"
                value={taskDescription}
                onChange={handleDescriptionChange}
                className={appStyles.strongBorder}
                />
                </Col>
            </Form.Group>
            {errors.description?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
        {/* Start Date */}
        <Form.Group as={Row} controlId="start-date">
            <Form.Label column xs="6">Start Date:</Form.Label>
            <Col xs="6">
            <Form.Control 
            type="date"
            name="start-date"
            value={taskStartDate}
            onChange={handleStartDateChange}
            className={appStyles.strongBorder}
            />
            </Col>
        </Form.Group>
        {startDateFeedback?(
            <Alert variant="warning">
                {startDateFeedback}
            </Alert>
            ):('')}
        {/* Due Date */}
        <Form.Group as={Row} controlId="due-date">
            <Form.Label column xs="6">Due Date:</Form.Label>
            <Col xs="6">
            <Form.Control 
            type="date"
            name="due-date"
            value={taskDueDate}
            onChange={handleDueDateChange}
            className={appStyles.strongBorder}
            />
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
            onChange={handleStatusChange}
            className={appStyles.strongBorder}
            >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Complete</option>
            </Form.Control>
            </Col>
        </Form.Group>
        {/* Submit button */}
        <Button type="button" variant="primary" onClick={handleSubmit}>
            Save Changes
        </Button>
    </Form>
    )}
</Card.Body>
</Accordion.Collapse>
</Card>
</Accordion>
);
};

export default Task;