import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import styles from './../../styles/TasksPage.module.css';
import appStyles from '../../App.module.css';
import { useRedirect } from '../../hooks/UseRedirect.js';

/* Loads the users tasks onto a seperate page, read only*/
const TasksPage = () => {
  useRedirect("loggedOut");
  // Initialize variables
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);

  // Load all users tasks
  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axiosReq.get(`/tasks/?assigned_to__profile=${id}`);
            setTasks(response.data);
        } catch(err){
            // console.log(err);
        }
    }
    fetchTasks();
  }, [id]);
  
  // Handleclick to add a task to workspace
  const handleClick = (event) => {
    setActiveTasks(
      activeTasks.concat(
        tasks.filter(task => task.id === parseInt(event.target.id))
    ))
  }


return (
  <>
    <h3>My Workspace</h3>
    <DropdownButton 
      id="dropdown-basic-button" 
      title="Add Task"
    >
      <Row>
        <Col sm={6}>Description</Col>
        <Col sm={2}>Due Date</Col>
        <Col sm={2}>Status</Col>
        <Col sm={2}></Col>
      </Row>
      <Dropdown.Divider />  
      {tasks.length?(
        tasks.filter(
          task => task.status != 'Complete'
          ).map(
              task =>
                <Dropdown.Item href="#" key={task.id}>
                  <Row>
                    <Col sm={6}><strong>{task.project_title}: </strong>{task.description}</Col>
                    <Col sm={2}>{task.due_date}</Col>
                    <Col sm={2}>{task.status}</Col>
                    <Col sm={2}>
                      <Button
                        variant="outline-secondary"
                        onClick={handleClick}
                      >
                        <i id={task.id} className="far fa-plus-square"></i>
                      </Button>
                    </Col>
                  </Row>
                </Dropdown.Item>
             )
         ):("You're not currently assigned to any tasks.")}
      </DropdownButton>
      <Card className={appStyles.verticalMargin}>
        <Card.Header>
          <Row>
            <Col><strong>Description</strong></Col>
            <Col><strong>Notes</strong></Col>
            <Col></Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {activeTasks.length?(
            activeTasks.filter(task => task.status != 'Complete').map(task =>
              <Row key={task.id}>
                <Col><strong>{task.project_title}: </strong>{task.description}</Col>
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Control type="text">
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Link to={`/projects/${id}`}><Button className={appStyles.verticalMargin}>Update</Button></Link>
                </Col>
              </Row>
            )
            ):("No tasks added yet")}
        </Card.Body>
      </Card>
    </>
  );
};

export default TasksPage;