import React from 'react'
import { useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Modal, Button, Card, Media, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { format } from 'date-fns';
import MemberCreateForm from './MemberCreateForm'
import Task from './Task'
import TaskCreateForm from '../../components/TaskCreateForm'
import ProjectEditForm from './ProjectEditForm'
import styles from '../../styles/Project.module.css'
// import MemberCreateForm from './MemberCreateForm';
// import TaskCreateForm from '../../components/TaskCreateForm'
// import Task from './Task'
// // import TaskCreateForm from '../../components/TaskCreateForm';
// import ProjectEditForm from './ProjectEditForm';
// import Task from './Task';
import { axiosRes } from '../../api/axiosDefaults';

const Project = ({projectData, members}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === projectData.project_owner_username

    const handleDelete = async () => {  
        try {
            await axiosRes.delete(`/projects/${Number(projectData.project)}`)
        } catch(err){
            console.log(err)    
        }
    }

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
                            <MemberCreateForm projectId={projectData.project} title={projectData.title} memberProfileIds={members.map(member => member.profile)} />
                        </Col>
                        <Col xs={4}>
                            <ProjectEditForm data={projectData} />
                        </Col>
                            
                        <Col xs={4}>
                            <Link to={`/projects/delete/${projectData.project}`}>     
                                <Button variant="primary"><i class="fa-solid fa-trash-can"></i></Button>
                            </Link> 
                        </Col>                    
                    </Row>
                </Container>
                <TaskCreateForm members={members} /> 
                <Task />
                     
                </>
            ): (<>
                <TaskCreateForm members={members} /> 
                <Task />
            </>)}
        </Card.Body>
    </Card>

    </div>
  )
}

export default Project