import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button, Card,  Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { format } from 'date-fns';
import styles from '../../styles/Project.module.css'
import { axiosReq } from '../../api/axiosDefaults';

/* Project component to display all project data */
const Project = ({projectData}) => {
    // Initialize state variables
    const [tasks, setTasks] = useState([]);
    const currentUser = useCurrentUser();

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
                    </Row>
                </Container>
            </div>
        </Card.Header>
        <Card.Body>
            {tasks.length?(
                <div>
                Tasks:
                <ProgressBar>
                    <ProgressBar variant="success" now={
                        100*tasks.filter(task => task.status === 'Complete').length/(tasks.length)
                    } 
                    key={1} 
                    label={
                        tasks.filter(task => task.status === 'Complete').length
                    } />
                    <ProgressBar variant="warning" now={
                        100*tasks.filter(task => (task.status === 'In Progress' && format(new Date(task.due_date), 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd'))).length/(tasks.length)
                    } 
                    key={2} 
                    label={
                        tasks.filter(task => (task.status === 'In Progress' && format(new Date(task.due_date), 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd'))).length
                    }/>
                    <ProgressBar variant="info" now={
                        100*tasks.filter(task => (task.status === 'Not Started' && format(new Date(task.due_date), 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd'))).length/(tasks.length)
                        } 
                    key={3} 
                    label={
                        tasks.filter(task => (task.status === 'Not Started' && format(new Date(task.due_date), 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd'))).length
                        }/>
                    <ProgressBar variant="danger" now={
                        100*tasks.filter(task => (task.status != 'Complete' && format(new Date(task.due_date), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')
                        )).length/(tasks.length)
                    } key={4} label={tasks.filter(task => (task.status != 'Complete' && format(new Date(task.due_date), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')
                    )).length}/>
                </ProgressBar>
                </div>
            ):('No Tasks Yet')}
        </Card.Body>
        <Link to={`/projects/project/${projectData.project}`}>
                    <Button variant="outline-primary" className={`${styles.projectButtons} ${styles.verticalMarginTopBottom}`} size="sm">View Project Details</Button>
        </Link>
    </Card>
    );
};
export default Project;