import React from "react";
import { Form, Button } from "react-bootstrap";

function ProjectCreateForm() {
    return (
        <div>
            <Form>  
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Project Title" />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Project Description" />
            </Form.Group>
            <Form.Group controlId="start-date">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="due-date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="complexity">
                <Form.Label>Complexity</Form.Label>
                <Form.Control as="select">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Project
            </Button>
            </Form>
        </div>
    )
}


export default ProjectCreateForm;