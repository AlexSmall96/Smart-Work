import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import Project from './Project';
 
const ProjectsPage = () => {
    const { id } = useParams();
    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?profile=${id}`)
            setMembers(response.data)
          } catch(err){
            console.log(err.response)
          }
        }
        fetchMembers()
      }, [id])
  return (
    <div>
        
        {members.map(member => <Project key={member.id} projectData={member} />)}
    </div>
  )
}

export default ProjectsPage