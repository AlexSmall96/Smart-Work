import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Button } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import { useRedirect } from '../../hooks/UseRedirect.js';

/* Allows user to delete a project */
const ProjectDelete = () => {
  useRedirect('loggedOut');
  // Initialize variables
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [projectDeleted, setProjectDeleted] = useState(false);

  // Get project data when component mounts or updates
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosReq.get(`/projects/${id}`);
        setMessage(`Are you sure you want to delete ${response.data.title}?`);
      } catch(err){
        // console.log(err.response);
      }
    };
    fetchProject();
  },[id]);
    
  // Delete project based on id
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/projects/${id}`);
      setMessage('Project deleted.');
      setProjectDeleted(true);
    } catch(err){
      // console.log(err.response);
    }
  };

  return (
    <Card>
      <Card.Body>
        {/* Get user to confirm project deletion or go back*/}
        <Card.Title>{message}</Card.Title>
        {projectDeleted? (
          <Button onClick={() => history.push(`/projects/${currentUser.profile_id}`)}>Back to Projects</Button>
        ):(<>
          <Button onClick={() => history.goBack()}>No</Button>
          <Button onClick={handleDelete} className={appStyles.horizontalMargin}>Yes</Button>
        </>)}
      </Card.Body>
    </Card>
  );
};

export default ProjectDelete;