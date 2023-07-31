import React from 'react'
import { Container, Form, Col, Row, Button, Accordion, Card } from 'react-bootstrap'
import Avatar from '../../components/Avatar'
import styles from '../../styles/Task.module.css'
import { format } from 'date-fns';

const Task = ({projectData}) => {
  return (
    <Accordion>
    <Card>
        {/*Replace the projectData below with task data */}
        <Card.Header className={styles.taskHeader}>
        

        <Container>
                        <Row>
                            <Col xs={2}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <i className="fa-solid fa-pen-to-square"></i>
                                {/*Only allow edit permissions if task owner */}
                                </Accordion.Toggle>
                            </Col>
                            <Col xs={2}><Avatar  src={projectData.project_owner_image} height={30}/></Col>                       
                            <Col xs={3}>Learn React</Col>
                            <Col xs={2}>{format(new Date(projectData.due_date.slice(0,10)), "dd-MM-yyyy")}</Col>
                            <Col xs={3}>In Progress</Col>
                        </Row>
        </Container>

        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        <Form>  
            <Form.Group as={Row} controlId="due-date">
                <Form.Label column xs="6">Due Date</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="due-date"
                // value={dueDate}
                // onChange={handleDueDateChange} 
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="status">
                <Form.Label column xs="6">Status</Form.Label>
                <Col xs="6">
                <Form.Control 
                as="select"
                name="status"
                // value={status}
                // onChange={handleChange}
                >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Complete</option>
                </Form.Control>
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
            </Form>
        </Card.Body>
        </Accordion.Collapse>
    </Card>
    </Accordion>
  )
}

export default Task