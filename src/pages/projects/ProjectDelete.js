import React, { useEffect, useState } from 'react'
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Card, Button } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

const ProjectDelete = () => {
    const [project, setProject] = useState({})
    // const currentUser = useCurrentUser();
    const { id } = useParams();
    const history = useHistory();
 
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const {data} = await axiosReq.get(`/projects/${id}`)
                setProject(data)
            } catch(err){
                console.log(err.response)
            }
        }
        fetchProject()
    },[id, history ])
  
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/projects/1`)
        } catch(err){
            console.log(err)
        }
    }

  return (
<Card>
  <Card.Body>
    <Card.Title>{`Are you sure you want to delete ${project.title}`}</Card.Title>
    <Button onClick={() => history.goBack()}>No</Button>
    <Button onClick={handleDelete}>Yes</Button>
  </Card.Body>
</Card>
  )
}

export default ProjectDelete