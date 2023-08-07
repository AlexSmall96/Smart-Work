import React, {useEffect, useState} from 'react'
import { Container, Form, Col, Row, Button, Accordion, Card, Modal } from 'react-bootstrap'
import Avatar from '../../components/Avatar'
import styles from '../../styles/Task.module.css'
import { format } from 'date-fns';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

const Task = ({task, setTasks, projectData}) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id
    const is_task_owner = profile_id === task.assigned_to_profile_id
    const [taskUpdated, setTaskUpdated] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [taskDescription, setTaskDescription] = useState(task.description)
    const [taskDueDate, setTaskDueDate] = useState(format(new Date(task.start_date), 'yyyy-MM-dd'))
    const [taskStartDate, setTaskStartDate] = useState(format(new Date(task.due_date), 'yyyy-MM-dd'))
    const [status, setStatus] = useState(task.status)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [taskClass, setTaskClass] = useState(styles.taskHeader)

    useEffect(() => {
        const colourTask = () => {
            setTaskClass(
                `${styles.taskHeader} ${task.status === 'In Progress'?
                (styles.inProgress):(
                   task.status === 'Complete'? (styles.complete):('')
                )}`
            )
        }
        colourTask()
    }, [task])

    const handleDueDateChange = (event) => {
        const newDueDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        setTaskDueDate(newDueDate)
    }

    const handleStartDateChange = (event) => {
        const newStartDate = format(new Date(event.target.value), 'yyyy-MM-dd');
        setTaskStartDate(newStartDate)
    }

    const handleDescriptionChange = (event) => {
        setTaskDescription(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('description', taskDescription)
        formData.append('start_date', taskStartDate.concat('T00:00:00.000000Z'))
        formData.append('due_date', taskDueDate.concat('T00:00:00.000000Z'))
        formData.append('status', status)
        formData.append('assigned_to', task.assigned_to)
        try {
            axiosRes.put(`/tasks/${task.id}`, formData);
            setTaskUpdated(true)
            const newTasks = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`)
            setTasks(newTasks.data)
            setTaskClass(
                `${styles.taskHeader} ${task.status === 'In Progress'?
                (styles.inProgress):(
                   task.status === 'Complete'? (styles.complete):('')
                )}`
            )
            } catch (err) {
            console.log(err.response);
        }
        };

        const handleClick = () => {
            setTaskUpdated(false)
        }

        const handleDelete = async (event) => {
            try {
                axiosRes.delete(`/tasks/${event.target.id}`)
                const newTasks = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`)
                setTasks(newTasks.data)
            } catch(err){
                console.log(err)
            }
        }

  return (
    <Accordion>
    <Card>
        <Card.Header className={taskClass}>
        <Container>
                        <Row>
                            <Col xs={1}>
                                {is_task_owner?(<>
                                <Accordion.Toggle onClick={() => setExpanded(!expanded)} as={Button} variant="link" eventKey="0">
                                {expanded?('Hide'):(<i className="fa-solid fa-pen-to-square"></i>)}
                                </Accordion.Toggle>
                                </>):('')}
                            </Col>
                            <Col xs={1}><Avatar  src={task.assigned_to_image} height={30}/></Col>                       
                            <Col xs={5}>{task.description}</Col>
                            <Col xs={2}>{format(new Date(task.due_date.slice(0,10)), "dd-MM-yyyy")}</Col>
                            <Col xs={2}>{task.status}</Col>
                            <Col xs={1}>
                            {is_task_owner?(<>
                                <Button variant="outline-primary" onClick={handleShow}>
                                <i className="fa-solid fa-trash-can"></i>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>{`Are you sure you want to delete ${task.description}`}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            No
                                        </Button>
                                        <Button id={task.id} variant="primary" onClick={handleDelete}>
                                            Yes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                </>):('')}
                            </Col>
                        </Row>
        </Container>

        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        {taskUpdated?(<div><p>Task Updated Succesfully</p><Button onClick={handleClick}>Update more details</Button></div>):(
        <Form>
        <Form.Group as={Row} controlId="description">
                <Form.Label column xs="6">Description:</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="text"
                name="description"
                value={taskDescription}
                onChange={handleDescriptionChange} 
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="due-date">
                <Form.Label column xs="6">Start Date:</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="due-date"
                value={taskStartDate}
                onChange={handleStartDateChange} 
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="due-date">
                <Form.Label column xs="6">Due Date:</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="due-date"
                value={taskDueDate}
                onChange={handleDueDateChange} 
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="status">
                <Form.Label column xs="6">Status</Form.Label>
                <Col xs="6">
                <Form.Control 
                as="select"
                name="status"
                value={status}
                onChange={handleStatusChange}
                >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Complete</option>
                </Form.Control>
                </Col>
            </Form.Group>
            <Button type="button" variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Form>
        )}
        </Card.Body>
        </Accordion.Collapse>
    </Card>
    </Accordion>
  )
}

export default Task