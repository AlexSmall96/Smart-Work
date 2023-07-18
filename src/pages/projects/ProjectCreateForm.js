import React, { useState } from "react";
import styles from '../../App.module.css'
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router";;


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
                className={styles.textField}
                as="textarea" rows={3}
                size="sm"
                type="text"
                name="description"
                value={description}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Row} controlId="start-date">
                <Form.Label column xs="6">Start Date</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="start-date"
                value={startDate}
                onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="due-date">
                <Form.Label column xs="6">Due Date</Form.Label>
                <Col xs="6">
                <Form.Control 
                type="date"
                name="due-date"
                value={dueDate}
                onChange={handleChange} />
                </Col>
            </Form.Group>
            
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
            <Button variant="primary" type="submit">
                Create Project
            </Button>
            </Form>
        </div>
    )
}


export default ProjectCreateForm;