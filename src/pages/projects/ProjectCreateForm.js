import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router";


function ProjectCreateForm() {
    const [errors, setErrors] = useState({});
    const history = useHistory();
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
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
     
        formData.append('title', title)
        formData.append('description', description)

        try {
            const { data } = await axiosReq.post("/projects/", formData);
            history.push(`/projects/${data.id}`);
            } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
        };

    return (
        <div>
            <Form onSubmit={handleSubmit}>  
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