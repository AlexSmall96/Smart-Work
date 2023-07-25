import React from 'react'
import { useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Modal, Button, Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import MemberCreateForm from './MemberCreateForm';
import TaskCreateForm from '../../components/TaskCreateForm';
import ProjectEditForm from './ProjectEditForm';

const Project = ({projectData, members}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === projectData.project_owner_username

  return (
    <div>
    <Card>
        <Card.Body>
            <h2>{projectData.title}</h2>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${projectData.project_owner_profile_id}`}>
                    <p>Project Owner:</p>
                    <Avatar src={projectData.project_owner_image} height={55} />{projectData.project_owner_username}
                </Link>
                <p>Start Date: {projectData.start_date}</p>
                <p>Due Date: {projectData.due_date}</p>
                <p>Complexity: {projectData.complexity}</p>
            </Media>
            {is_owner ? (
                <>
                    <MemberCreateForm projectId={projectData.project} title={projectData.title} memberProfileIds={members.map(member => member.profile)} />
                    <ProjectEditForm data={projectData} />
                    <Button variant="primary" onClick={handleShow}>
                        Delete Project
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete {projectData.title}? This can't be undone.</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <TaskCreateForm members={members} />
                </>
            ): (
                <TaskCreateForm members={members} />
            )}
        </Card.Body>
    </Card>

    </div>
  )
}

export default Project