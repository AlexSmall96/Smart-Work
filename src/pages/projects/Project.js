import React, { useEffect } from 'react'
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

const Project = ({projectData}) => {
    const [members, setMembers] = useState([])
    const [expanded, setExpanded] = useState(false)
    const [tasks, setTasks] = useState([])
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === projectData.project_owner_username

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectData.project}`)
            setMembers(response.data)
          } catch(err){
            console.log(err.response)
          }
        }
        
        const fetchTasks = async () => {
            try {
                const response = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`)
                setTasks(response.data)
            } catch(err){
                console.log(err.response)
            }
        }
        fetchMembers()
        fetchTasks()
      }, [projectData])

return (
    <Card className={styles.projectCard}>
        <Card.Header>
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={2}>
                            <Link to={`/profiles/${projectData.project_owner_profile_id}`}>
                                <Avatar src={projectData.project_owner_image} height={40} />
                            </Link>
                        </Col>
                        <Col xs={8}><strong>{projectData.title}</strong></Col>
                        <Col xs={2} sm={{ span: 1, offset: 1 }}>
                        {is_owner?(<>
                            <Link to={`/projects/delete/${projectData.project}`}>     
                                <Button variant="outline-primary" className={styles.projectButtons} size="sm"><i className="fa-solid fa-trash-can"></i></Button>
                            </Link>
                            <Link to={`/projects/edit/${projectData.project}`}>     
                                <Button variant="outline-primary" className={`${styles.projectButtons} ${styles.verticalMargin}`} size="sm"><i className="fa-solid fa-pen-to-square"></i></Button>
                            </Link>
                        </>):('')}
                        </Col>
                        <Col>Due: {format(new Date(projectData.due_date.slice(0,10)), "dd-MM-yyyy")}</Col>
                    </Row>
                </Container>
            </div>
        </Card.Header>
        <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className={styles.projectAccord} onClick={() => setExpanded(!expanded)}>
                    {expanded?('Hide Details'):('View Details')}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className={styles.noPadding}>
                    <p className={styles.left}>{projectData.description}</p>
            <Container>
                <Row>
                    <Col md={6}>Start Date: {format(new Date(projectData.start_date.slice(0,10)), "dd-MM-yyyy")}</Col>
                    <Col md={6}>Due Date: {format(new Date(projectData.due_date.slice(0,10)), "dd-MM-yyyy")}</Col>
                </Row>  
                <Row>
                    <Col md={6}>Complexity: {projectData.complexity}</Col>
                    <Col md={6}>{`Outstanding Tasks: ${tasks.filter(task => task.status !== 'Complete').length} `}</Col>
                </Row>
            </Container>
                <p className={styles.left}>
                    Members
                    {is_owner?(<>
                    <Link to={`/members/add/${projectData.project}`}>
                        <Button size="sm" variant="outline-primary" className={styles.projectButtons}><i className="far fa-plus-square"></i></Button>
                    </Link>
                    <Link to={`/members/delete/${projectData.project}`}>
                        <Button size="sm" variant="outline-primary" className={styles.projectButtons}><i className="far fa-trash-can"></i></Button>
                    </Link></>):('')}
                </p>
                <Container className={styles.overflow}>
                    {
                    members.map(
                        member =>
                            <div key={member.id}>
                                <Link to={`/profiles/${member.profile}`}>
                                    <Avatar src={member.member_image} height={30}/><p className={styles.memberName}>{member.member_username}</p>
                                </Link>
                            </div>
                        )
                    }
                </Container>
                <TaskCreateForm members={members} projectData={projectData} tasks={tasks} setTasks={setTasks}/>
                <Card.Header className={styles.hideSmall}>
                        <Row>
                            <Col md={2}>Assigned To</Col>
                            <Col md={4}>Description</Col>
                            <Col md={2}>Due Date</Col>
                            <Col md={2}>Status</Col>
                            <Col md={2}></Col>
                        </Row>
                </Card.Header>
                        {tasks.map(task => <Task key={task.id} task={task} projectData={projectData} setTasks={setTasks} />)}
                    </Card.Body>
                </Accordion.Collapse>
                </Accordion>

    </Card>
    )

}
export default Project