import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button, Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import MemberCreateForm from './MemberCreateForm';
import Task from '../../components/TaskCreateForm';
import TaskCreateForm from '../../components/TaskCreateForm';

const Project = ({projectData, members}) => {
    
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
                    <MemberCreateForm projectId={projectData.project} title={projectData.title} />
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