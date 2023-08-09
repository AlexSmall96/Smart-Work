import React, {useState, useEffect} from 'react'
import { Button, Card } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import appStyles from '../../App.module.css'

/* Removes a member from project */
const DeleteMembers = () => {
  // Initialize state variables
    const { projectId } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [members, setMembers] = useState([]);
    const [message, setMessage] = useState('');
    const [memberSelected, setMemberSelected] = useState(false);
    const [idSelected, setIdSelected] = useState(0);
    const [deletedMembers, setDeletedMembers] = useState([]);

    // Load data when component mounts or updates
    useEffect(() => {
        // Get current members of project
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectId}`)
            setMembers(response.data)
            setTitle(response.data[0].title)
          } catch(err){
            // console.log(err.response)
          }
        };
        // Call data fetching function
        fetchMembers();
      }, [projectId]);
    
    // Save id of member selected
    const handleClick = (event) => {
        setMemberSelected(true);
        setIdSelected(event.target.id.split("-")[0]);
        // Set feedback message
        setMessage(`Are you sure you want to remove ${event.target.id.split("-")[1]} from ${title}?`)
    };

    // Delete the member selected using id
    const handleDelete = async () => {
        try {
            axiosRes.delete(`/members/${Number(idSelected)}`);
            setMemberSelected(false);
            setMessage('Member succesfully removed from project.');
            deletedMembers.push(Number(idSelected));
            setDeletedMembers(deletedMembers);
        } catch(err) {
            // console.log(err);
        }
    };

  return (
    <Card>
      {/* Form Header */}
        <Card.Header>
            {`Select member to remove from ${title}.`} 
        </Card.Header>
        <Card.Body>
        {/* List all members */}
        {members.map(member => 
          (
            deletedMembers.includes(member.id)?('')
            :(
              <p key={member.id}>
                <Avatar src={member.member_image} height={30}/>{member.member_username}
                <Button onClick={handleClick} size="sm" variant="outline-primary" className={appStyles.horizontalMargin}>
                  <i id={`${member.id}-${member.member_username}`} className="far fa-trash-can"></i>
                </Button>
              </p>
            )
          ) 
        )}
        </Card.Body>
        {/* Show member selected for deletion */}
        <Card.Footer>
            {message}
            {memberSelected? (
            <><Button onClick={handleDelete} className={appStyles.horizontalMargin}>Yes</Button><Button onClick={() => history.goBack()}>No, back to projects.</Button></>
            ):(
            <Button onClick={() => history.goBack()}>Back to projects.</Button>
            )}
        </Card.Footer>
    </Card>
  );
};

export default DeleteMembers;