import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults';
import { Button, Card } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import Member from '../../components/Member';

const AddMembers = () => {
    const { projectId } = useParams();
    const history = useHistory();
    const [memberProfileIds, setMemberProfileIds] = useState([])
    const [selectedProfileIds, setSelectedProfileIds] = useState([])
    const [selectedProfiles, setSelectedProfiles] = useState([])
    const [profiles, setProfiles] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectId}`)
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

    const selectMember = (event) => {
        if (selectedProfileIds.includes(event.target.id)){
            let index = selectedProfileIds.indexOf(event.target.id)
            selectedProfileIds.splice(index, 1)
            setSelectedProfileIds(
                selectedProfileIds
            )
            setSelectedProfiles(
                profiles.filter(profile => selectedProfileIds.includes(profile.id.toString()))
            )
            event.target.selected = false
            event.target.variant = "outline-secondary"
        } else {
            selectedProfileIds.push(event.target.id)
            setSelectedProfileIds(
                selectedProfileIds
            )
            setSelectedProfiles(
                profiles.filter(profile => selectedProfileIds.includes(profile.id.toString()))
            )
            event.target.selected = true
        }
    }

    
    // On success after member add, redirect back to project page //
  return (
    <Card>
        <Card.Header>
            {`Select users to add to ${title}`} 
        </Card.Header>
        <Card.Body>
        {profiles.map(profile => (
        <Member
            key={profile.id}
            variant={`outline-${memberProfileIds.includes(profile.id)?'secondary':'primary'}`}
            disabled={memberProfileIds.includes(profile.id)}
            src={profile.image}
            owner={profile.owner}
            onClick={selectMember}
            id={profile.id}
            selected={selectedProfileIds.includes(profile.id.toString())}
        />
        ))}
        </Card.Body>
        <Card.Footer>
            Selected Users:
            {selectedProfiles.map(profile => (
            <Member
            key={profile.id}
            variant={"outline-primary"}
            disabled={memberProfileIds.includes(profile.id)}
            src={profile.image}
            owner={profile.owner}
            onClick={selectMember}
            height={35}
            id={profile.id}
            selected={selectedProfileIds.includes(profile.id.toString())}
            />))}
        </Card.Footer>
    </Card>
  )
}

export default AddMembers