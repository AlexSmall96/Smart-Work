import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Card, Button } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

const ProjectDelete = () => {
    const [project, setProject] = useState({})
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const [message, setMessage] = useState('')
    const [projectDeleted, setProjectDeleted] = useState(false)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axiosReq.get(`/projects/${id}`)
                setProject(response.data)
                setMessage(`Are you sure you want to delete ${response.data.title}?`)
            } catch(err){
                console.log(err.response)
            }
        }
        fetchProject()
    },[id])
  
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/projects/${id}`)
            setMessage('Project deleted.')
            setProjectDeleted(true)
        } catch(err){
            console.log(err.response)
        }
    }

  return (
<Card>
  <Card.Body>
    <Card.Title>{message}</Card.Title>
    {projectDeleted? (
        <Button onClick={() => history.push(`/projects/${currentUser.profile_id}`)}>Back to Projects</Button>
    ):(<>
        <Button onClick={() => history.goBack()}>No</Button>
        <Button onClick={handleDelete}>Yes</Button>
    </>)}
  </Card.Body>
</Card>
  )
}

export default ProjectDelete