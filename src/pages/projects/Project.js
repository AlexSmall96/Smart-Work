import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button, Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import MemberCreateForm from './MemberCreateForm';
import Task from '../../components/TaskCreateForm';
import TaskCreateForm from '../../components/TaskCreateForm';

const Project = (props) => {
    // Data passed down from /members/ 
    const {
        id,
        member_name,
        title,
        start_date,
        due_date,
        project_owner_image,
        project_owner_name,
        project_owner_profile_id,
        project_owner_username,
        complexity,
        created_at,
        profile,
        project,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === project_owner_username

  return (
    <div>
    <Card>
        <Card.Body>
            <h2>{title}</h2>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${project_owner_profile_id}`}>
                    <p>Project Owner:</p>
                    <Avatar src={project_owner_image} height={55} />{project_owner_username}
                </Link>
                <p>Start Date: {start_date}</p>
                <p>Due Date: {due_date}</p>
                <p>Complexity: {complexity}</p>
            </Media>
            {is_owner ? (
                <>
                    <MemberCreateForm project={project} title={title} profile={profile} />
                    <TaskCreateForm projectId={project} />
                    {/* {project is id of project associated with member} */}
                </>
            ): (
                <Task />
            )}
        </Card.Body>
    </Card>

    </div>
  )
}

export default Project