import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults';
import { Button, Card, Form } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import Member from '../../components/Member';
import styles from '../../styles/AddMembers.module.css'

const AddMembers = () => {
    const { projectId } = useParams();
    const history = useHistory();
    const [memberProfileIds, setMemberProfileIds] = useState([])
    const [selectedProfileIds, setSelectedProfileIds] = useState([])
    const [selectedProfiles, setSelectedProfiles] = useState([])
    const [profiles, setProfiles] = useState([])
    const [title, setTitle] = useState('')
    const [query, setQuery] = useState('');
    const [feedback, setFeedback] = useState('');

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
                const response = await axiosReq.get(`/profiles/?search=${query}`)
                setProfiles(response.data)
            } catch(err) {
                console.log(err.response)
            }
        }
        fetchMembers()
        fetchProfiles()
      }, [projectId, query])

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

    const handleSubmit = async () => {
        try {
            await Promise.all([
                selectedProfileIds.map(id => axiosReq.post('/members/', {'project': projectId, 'profile': Number(id)}))
              ])
            setFeedback('Users successfully added to project.')
        } catch(err){
            console.log(err.response)
        }
    }

    // On success after member add, redirect back to project page //
  return (
    <>
    <Card>
        <Card.Header>
            {`Select users to add to ${title}`} 
        </Card.Header>
        <Card.Body className={styles.profilesCard}>
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search profiles by username, name or organsation"
          />
        </Form>
        
        {profiles.length?(
        profiles.map(profile => (
            <Member
                key={profile.id}
                variant={`outline-${memberProfileIds.includes(profile.id)?'secondary':'primary'}`}
                disabled={memberProfileIds.includes(profile.id)}
                src={profile.image}
                owner={profile.owner}
                organisation={profile.organisation}
                onClick={selectMember}
                id={profile.id}
                selected={selectedProfileIds.includes(profile.id.toString())}
            />
            ))):('No results, please try a different search')}
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
            {selectedProfileIds.length?(
                <Button onClick={handleSubmit} variant="primary">Add Users to Project</Button>
            ):('')}
        </Card.Footer>
    </Card>
    <Button variant="primary" onClick={() => history.goBack()}>Back to Projects</Button>
    </>
  )
}

export default AddMembers