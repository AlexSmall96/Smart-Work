import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { format } from 'date-fns';
import styles from '../../App.module.css';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';

/* Allows user to edit a project with a given id */
const ProjectEdit = () => {
  // Initialize variables
  const {id} = useParams();
  const history = useHistory();
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [projectData, setProjectData] = useState({});
  const [errors, setErrors] = useState({});
  const [projectSaved, setProjectSaved] = useState(false);
  const currentUser = useCurrentUser();

  // Get project data
  useEffect(() => {
    const fetchProject = async () => {
        try {
            const response = await axiosReq.get(`/projects/${id}`);
            setProjectData({
                title: response.data.title,
                description: response.data.description,
                complexity: response.data.complexity,
            });
            setStartDate(format(new Date(response.data.start_date), 'yyyy-MM-dd'));
            setDueDate(format(new Date(response.data.due_date), 'yyyy-MM-dd'));
        } catch(err){
            console.log(err);
        }
    };
    fetchProject();
  }, [id]);
  /*
  Handle change for date inputs. The below code was taken from the following stack overflow forum
  https://stackoverflow.com/questions/67866155/how-to-handle-onchange-value-in-date-reactjs
  */
  const handleStartDateChange = (event) => {
    const newStartDate = format(new Date(event.target.value), 'yyyy-MM-dd');
    setStartDate(newStartDate);
  };
  const handleDueDateChange = (event) => {
  const newDueDate = format(new Date(event.target.value), 'yyyy-MM-dd');
  setDueDate(newDueDate);
  };
  // Handle change for text inputs
  const handleChange = (event) => {
  setProjectData({
    ...projectData,
    [event.target.name]: event.target.value
    });
  };
  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('complexity', projectData.complexity);
    formData.append('start_date', startDate.concat('T00:00:00.000000Z'));
    formData.append('due_date', dueDate.concat('T00:00:00.000000Z'));
    try {
        await axiosRes.put(`/projects/${id}`, formData);
        setProjectSaved(true);
        } catch (err) {
        console.log(err);
        if (err.response?.status !== 401) {
            setErrors(err.response?.data);
        }
    }
  };
  return (
  <>
    <Card>
    {/* Feedback message */}
      <Card.Header>{projectSaved?('Project details updated.'):(`Edit details for ${projectData.title}.`)}</Card.Header>
            <Form>
             {/* Title */}     
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type="text"
                name="title"
                value={projectData.title}
                onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
             {message}
             </Alert>
             ))}
            {/* Description*/}     
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                className={styles.textField}
                as="textarea" rows={3}
                size="sm"
                type="text"
                name="description"
                value={projectData.description}
                onChange={handleChange} />
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
                onChange={handleStartDateChange} />
                </Col>
            </Form.Group>
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
                onChange={handleDueDateChange} />
                </Col>
            </Form.Group>
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
                value={projectData.complexity}
                onChange={handleChange}
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
            </Form>
            </Card>
             {/* Go Back and save buttons */} 
            {projectSaved? (
                <Button className={`${appStyles.verticalMargin} ${appStyles.horizontalMargin}`} variant="secondary" onClick={() => history.push(`/projects/${currentUser.profile_id}`)}>
                    Back to Projects.
                </Button>):(<>
                <Button className={`${appStyles.verticalMargin}`} variant="secondary" onClick={() => history.goBack()}>
                  Cancel
                </Button>
                <Button className={`${appStyles.verticalMargin} ${appStyles.horizontalMargin}`} variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
          </>)}
</>);
};

export default ProjectEdit;
