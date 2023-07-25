import React from 'react'
import { Form, Col, Row, Button, Accordion, Card } from 'react-bootstrap'

const Task = () => {
  return (
    <Accordion>
    <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
            task header
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
                // value={description}
                // onChange={handleChange} 
                />
            </Form.Group>
            <Form.Group as={Row} controlId="start-date">
                <Form.Label column xs="6">Start Date</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="start-date"
                // value={startDate}
                // onChange={handleStartDateChange} 
                />
                </Col>
            </Form.Group>
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
            <Form.Group as={Row} controlId="assigned-to">
                <Form.Label column xs="6">Assigned To:</Form.Label>
                <Col xs="6">
                <Form.Control 
                as="select"
                name="assigned-to"
                // value={assignedTo}
                // onChange={handleAssignedToChange}
                >
                  <option>User 1</option>
                  <option>User 2</option>
                {/* {members.map(member => <option key={member.id}>{member.member_username}</option> )} */}
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