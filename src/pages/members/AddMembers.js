import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults';
import { Button, Card } from 'react-bootstrap';
import Avatar from '../../components/Avatar';

const AddMembers = () => {
    const { projectId } = useParams();
    const history = useHistory();
    const [members, setMembers] = useState([])
    const [memberProfileIds, setMemberProfileIds] = useState([])
    const [profiles, setProfiles] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectId}`)
            setMembers(response.data)
            setMemberProfileIds(response.data.map(member => member.profile))
            setTitle(response.data[0].title)
          } catch(err){
            console.log(err.response)
          }
        }
        const fetchProfiles = async () => {
            try {
                const response = await axiosReq.get('/profiles/')
                setProfiles(response.data)
            } catch(err) {
                console.log(err.response)
            }
        }
        fetchMembers()
        fetchProfiles()
      }, [projectId])

    
    // On success after member add, redirect back to project page //
  return (
    <Card>
        <Card.Header>
            {`Select users to add to ${title}`} 
        </Card.Header>
        <Card.Body>
            members of project: 
        {members.map(member => <p key={member.id}>{member.member_username}</p>)}
            all profiles:
        {profiles.map(profile =>
        <Button 
        variant="outline-secondary" 
        disabled={memberProfileIds.includes(profile.id)} 
        key={profile.id}
        ><Avatar src={profile.image}/>{profile.owner}</Button>
        )}
        </Card.Body>
    </Card>
  )
}

export default AddMembers