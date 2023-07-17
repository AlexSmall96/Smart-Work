import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function ProjectCreateForm() {

    const [projectData, setProjectData] = useState({
        title:'',
        description:'',
        complexity:'Low',
        startDate:'',
        dueDate:'',
    })

    const {title, description, complexity, startDate, dueDate} = projectData

    const handleChange = (event) => {
        setProjectData({
            ...projectData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <Form>  
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type="text"
                name="title"
                value={title}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                type="text"
                name="description"
                value={description}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="start-date">
                <Form.Label>Start Date</Form.Label>
                <Form.Control 
                type="date"
                name="start-date"
                value={startDate}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="due-date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control 
                type="date"
                name="due-date"
                value={dueDate}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="complexity">
                <Form.Label>Complexity</Form.Label>
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
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Project
            </Button>
            </Form>
        </div>
    )
}


export default ProjectCreateForm;