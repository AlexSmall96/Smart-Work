import React, { useEffect } from 'react'
import { useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Modal, Button, Card, Media, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { format } from 'date-fns';
import ProjectEditForm from './ProjectEditForm'
import styles from '../../styles/Project.module.css'
import Task from './Task';
import TaskCreateForm from './TaskCreateForm';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Project = ({projectData}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === projectData.project_owner_username
    // const handleDelete = async () => {  
    //     try {
    //         await axiosRes.delete(`/projects/${Number(projectData.project)}`)
    //     } catch(err){
    //         console.log(err)    
    //     }
    // }

  return (
    <div>
    <Card>
        <Card.Body>
            <h2><Link to={`/profiles/${projectData.project_owner_profile_id}`}>
                    <Avatar src={projectData.project_owner_image} height={55} />
                </Link>{projectData.title}
            </h2>
            <p>{projectData.description}</p>
            <Media className="align-items-center justify-content-between">

                <p>Start Date: {format(new Date(projectData.start_date.slice(0,10)), "dd-MM-yyyy")}</p>
                <p>Due Date: {format(new Date(projectData.due_date.slice(0,10)), "dd-MM-yyyy")}</p>
                <p>Complexity: {projectData.complexity}</p>
            </Media>
            {is_owner ? (
                <>
                <Container className={styles.ownerButtons}>
                    <Row>
                        <Col xs={4}>
                            <Link to={`/members/add/${projectData.project}`}>
                                <Button variant="primary">Add Members</Button>
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <ProjectEditForm data={projectData} />
                        </Col>
                            
                        <Col xs={4}>
                            <Link to={`/projects/delete/${projectData.project}`}>     
                                <Button variant="primary"><i className="fa-solid fa-trash-can"></i></Button>
                            </Link> 
                        </Col>                    
                    </Row>
                </Container>
                <Card>
                    <Card.Header>Tasks</Card.Header>
                    <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={2}></Col>
                            <Col xs={2}>Assigned To</Col>
                            <Col xs={3}>Description</Col>
                            <Col xs={2}>Due</Col>
                            <Col xs={3}>Status</Col>
                        </Row>
                    </Container>
                    </Card.Body>
                </Card>
                 <Task projectData={projectData} />
                 <Task projectData={projectData} />
                 <TaskCreateForm />
                </>
            ): (<>
                {/* <Task projectData={projectData} />
                <Task projectData={projectData} />
                <TaskCreateForm members={members} /> */}
            </>)}
        </Card.Body>
    </Card>

    </div>
  )
}

export default Project