import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import {  Accordion, Button, Card,  Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { format } from 'date-fns';
import styles from '../../styles/Project.module.css'
import { axiosReq } from '../../api/axiosDefaults';
import TaskCreateForm from '../tasks/TaskCreateForm'
import Task from '../tasks/Task';

/* Project component to display all project data */
const Project = ({projectData}) => {
    // Initialize state variables
    const [members, setMembers] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === projectData.project_owner_username;

    // Fetch members and tasks associated with project
    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectData.project}`);
            setMembers(response.data);
          } catch(err){
            // console.log(err.response);
          }
        };
        const fetchTasks = async () => {
            try {
                const response = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`);
                setTasks(response.data);
            } catch(err){
                // console.log(err.response);
            }
        };
        fetchMembers();
        fetchTasks();
      }, [projectData]);

return (
    <Card className={styles.projectCard}>
        <Card.Header>
            <div>
                <Container>
                    {/* Header */}
                    <Row className="justify-content-md-center">
                        <Col xs={3}>
                            <Link to={`/profiles/${projectData.project_owner_profile_id}`}>
                                <Avatar src={projectData.project_owner_image} height={40} />
                            </Link>
                        </Col>
                        <Col xs={6}><strong>{projectData.title}</strong></Col>
                        <Col xs={3}>Due: {format(new Date(projectData.due_date.slice(0,10)), "dd-MM-yyyy")}</Col>
                        <Col>{`Outstanding Tasks: ${tasks.filter(task => task.status !== 'Complete').length} `}</Col>
                    </Row>
                </Container>
            </div>
        </Card.Header>
        <Link to={`/projects/project/${projectData.project}`}>
                    <Button variant="outline-primary" className={`${styles.projectButtons} ${styles.verticalMarginTopBottom}`} size="sm">View Project Details</Button>
        </Link>
    </Card>
    );
};
export default Project;