import React, { useEffect } from 'react'
import { useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import {  Button, Card,  Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { format } from 'date-fns';
import ProjectEditForm from './ProjectEditForm'
import styles from '../../styles/Project.module.css'
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import TaskCreateForm from './TaskCreateForm'

const Project = ({projectData}) => {
    const [members, setMembers] = useState([])
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === projectData.project_owner_username
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <div className={styles.left}>
                <Link to={`/profiles/${projectData.project_owner_profile_id}`}>
                    <Avatar src={projectData.project_owner_image} height={55} />
                </Link>{projectData.title}
                </div>
                {is_owner?(
                <>
                <Link to={`/projects/delete/${projectData.project}`}>     
                    <Button variant="primary"><i className="fa-solid fa-trash-can"></i></Button>
                </Link>
                <Link to={`/projects/edit/${projectData.project}`}>     
                    <Button variant="primary"><i className="fa-solid fa-pen-to-square"></i></Button>
                </Link>
                </>
                ):('')}
            </Card.Header>
            <Card.Body>
                <p className={styles.left}>{projectData.description}</p>
                <p>Start Date: {`${format(new Date(projectData.start_date.slice(0,10)), "dd-MM-yyyy")} `}
                    Due Date: {format(new Date(projectData.due_date.slice(0,10)), "dd-MM-yyyy")}</p>
                <p>Complexity: {projectData.complexity}</p>
                <p>Outstanding Tasks: 3</p>
                </Card.Body>
                <p className={styles.left}>
                Members
                {is_owner?(<><Link to={`/members/add/${projectData.project}`}>
                    <Button size="sm" variant="outline-primary"><i className="far fa-plus-square"></i></Button>
                </Link>
                <Link to={`/members/delete/${projectData.project}`}>
                    <Button size="sm" variant="outline-primary"><i className="far fa-trash-can"></i></Button>
                </Link></>):('')}
                </p>
                <Container className={styles.overflow}>
                    {members.map(member =>
                <div key={member.id}>
                 <Avatar src={member.member_image} height={30}/>
                 <p className={styles.memberName}>{member.member_username}</p>
                </div>
)}
                </Container>
                <TaskCreateForm members={members} />
                </Card>
    )
}
export default Project