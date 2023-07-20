import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';

const Project = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        start_date,
        due_date,
        title,
        description,
        complexity
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

  return (
    <Card>
        <Card.Body>
            <h2>{title}</h2>
            <p>{description}</p>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    <p>Project Owner:</p>
                    <Avatar src={profile_image} height={55} />{owner}
                </Link>
                <p>Start Date: {start_date}</p>
                <p>Due Date: {due_date}</p>
            </Media>
        </Card.Body>
    </Card>
  )
}

export default Project