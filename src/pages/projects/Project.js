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
import Member from '../../components/Member';

const Project = ({projectData}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [members, setMembers] = useState([])
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
    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectData.project}`)
            setMembers(response.data)
          } catch(err){
            console.log(err.response)
          }
        }
        fetchMembers()
      }, [projectData])

  return (
    <Card>
            <Card.Header>
                <Link to={`/profiles/${projectData.project_owner_profile_id}`}>
                    <Avatar src={projectData.project_owner_image} height={55} />
                </Link>{projectData.title}
                <Link to={`/projects/delete/${projectData.project}`}>     
                    <Button variant="primary"><i className="fa-solid fa-trash-can"></i></Button>
                </Link>
                <ProjectEditForm data={projectData} />
            </Card.Header>
            <Card.Body>
                <p>{projectData.description}</p>
                <p>Start Date: {format(new Date(projectData.start_date.slice(0,10)), "dd-MM-yyyy")}</p>
                <p>Due Date: {format(new Date(projectData.due_date.slice(0,10)), "dd-MM-yyyy")}</p>
                <p>Complexity: {projectData.complexity}</p>
                </Card.Body>
                <p className={styles.left}>
                    Members
                <Link to={`/members/add/${projectData.project}`}>
                    <Button size="sm" variant="outline-primary"><i className="far fa-plus-square"></i></Button>
                </Link> 
                </p>
                <Container className={styles.overflow}>
                    {members.map(member =>
                <div key={member.id}>
                 <Avatar src={member.member_image} height={30}/>
                 <p className={styles.memberName}>{member.member_username}</p>
                </div>
)}
                </Container>
                </Card>
    )
}
export default Project