import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults';
import { Button, Card, Form } from 'react-bootstrap';
import Member from './Member';
import styles from '../../styles/AddMembers.module.css'
import appStyles from'../../App.module.css'

/* Form to add members to a project */
const AddMembers = () => {
    // Initialize state variables
    const { projectId } = useParams();
    const history = useHistory();
    const [memberProfileIds, setMemberProfileIds] = useState([]);
    const [selectedProfileIds, setSelectedProfileIds] = useState([]);
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const [membersAdded, setMembersAdded] = useState(false);

    // Load data when component mounts or updates
    useEffect(() => {
        // Get current members of project
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectId}`);
            setMemberProfileIds(response.data.map(member => member.profile));
            setTitle(response.data[0].title);
          } catch(err){
            console.log(err.response);
          }
        };
        // Get all profiles with search
        const fetchProfiles = async () => {
            try {
                const response = await axiosReq.get(`/profiles/?search=${query}`);
                setProfiles(response.data);
            } catch(err) {
                console.log(err.response);
            }
        };
        // Call both data fetching functions
        fetchMembers();
        fetchProfiles();
      }, [projectId, query]);
    
    // Add selected members to array
    const selectMember = (event) => {
        if (selectedProfileIds.includes(event.target.id)){
            let index = selectedProfileIds.indexOf(event.target.id);
            selectedProfileIds.splice(index, 1);
            setSelectedProfileIds(
                selectedProfileIds
            );
            setSelectedProfiles(
                profiles.filter(profile => selectedProfileIds.includes(profile.id.toString()))
            );
            event.target.selected = false;
            event.target.variant = "outline-secondary";
        } else {
            selectedProfileIds.push(event.target.id)
            setSelectedProfileIds(
                selectedProfileIds
            );
            setSelectedProfiles(
                profiles.filter(profile => selectedProfileIds.includes(profile.id.toString()))
            );
            event.target.selected = true;
        }
    };
    // Post the selected member to the database
    const handleSubmit = async () => {
        try {
            await Promise.all([
                selectedProfileIds.map(id => axiosReq.post('/members/', {'project': projectId, 'profile': Number(id)}))
              ]);
            setMembersAdded(true);
        } catch(err){
            console.log(err.response);
        }
    };

  return (
    <>
    <Card>
        {/* Form Header */}
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
        {/* Display all profiles based on search */}
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
        {/* Show which members have been selected */}
        <Card.Footer>
        {membersAdded?('Members added to project.'):(
            <div>
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
            {/* Submit button */}
            {selectedProfileIds.length?(     
                <Button onClick={handleSubmit} variant="primary" className={styles.horizMargin}>Add Users to Project</Button>
            ):('')}
            </div>
        )
    }
        </Card.Footer>
    </Card>
    {/* Back button */}
    <Button variant="primary" onClick={() => history.goBack()} className={appStyles.verticalMargin}>Back to Projects</Button>
    </>
  );
};

export default AddMembers;