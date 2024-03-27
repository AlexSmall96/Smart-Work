import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Button } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import { useRedirect } from '../../hooks/UseRedirect.js';

/* Allow the task assigned to user to delete task*/
const TaskDelete = () => {
  useRedirect('loggedOut');
  // Initialize variables
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [taskDeleted, setTaskDeleted] = useState(false);

  // Get task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosReq.get(`/tasks/${id}`);
        setMessage(`Are you sure you want to delete ${response.data.description} from ${response.data.project_title}?`);
      } catch(err){
        // console.log(err.response);
      }
    };
    fetchTask();
  },[id]);
    
  // Handle task deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}`);
      setMessage('Task deleted.');
      setTaskDeleted(true);
    } catch(err){
      // console.log(err.response);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{message}</Card.Title>
        {taskDeleted? (
          <Button onClick={() => history.push(`/projects/${currentUser.profile_id}`)}>Back to Projects</Button>
        ):(<>
          <Button onClick={() => history.goBack()}>No</Button>
          <Button className={appStyles.horizontalMargin} onClick={handleDelete}>Yes</Button>
        </>)}
      </Card.Body>
    </Card>
  );
};

export default TaskDelete;