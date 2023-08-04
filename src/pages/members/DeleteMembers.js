import React, {useState, useEffect} from 'react'
import { Button, Card } from 'react-bootstrap';
import AddMembers from './AddMembers';
import Avatar from '../../components/Avatar';
import Member from '../../components/Member';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DeleteMembers = () => {
    const { projectId } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState('')
    const [members, setMembers] = useState([])
    const [message, setMessage] = useState('')
    const [memberSelected, setMemberSelected] = useState(false)
    const [idSelected, setIdSelected] = useState(0)
    const [deletedMembers, setDeletedMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?project=${projectId}`)
            setMembers(response.data)
            setTitle(response.data[0].title)
          } catch(err){
            console.log(err.response)
          }
        }
        fetchMembers()
      }, [projectId])

    const handleClick = (event) => {
        setMemberSelected(true)
        setIdSelected(event.target.id.split("-")[0])
        setMessage(`Are you sure you want to remove ${event.target.id.split("-")[1]} from ${title}?`)
    }

    const handleDelete = async () => {
        try {
            axiosRes.delete(`/members/${Number(idSelected)}`)
            setMemberSelected(false)
            setMessage('Member succesfully removed from project.')
            deletedMembers.push(Number(idSelected))
            setDeletedMembers(deletedMembers)
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <Card>
        <Card.Header>
            {`Select member to remove from ${title}.`} 
        </Card.Header>
        <Card.Body>
        {members.map(member => 
          (
            deletedMembers.includes(member.id)?('')
            :(
              <p key={member.id}>
                <Avatar src={member.member_image} height={30}/>{member.member_username}
                <Button onClick={handleClick} size="sm" variant="outline-primary"><i id={`${member.id}-${member.member_username}`} className="far fa-trash-can"></i></Button>
              </p>
            )
          ) 
        )}
        </Card.Body>
        <Card.Footer>
            {message}
            {memberSelected? (
            <><Button onClick={handleDelete}>Yes</Button><Button onClick={() => history.goBack()}>No, back to projects.</Button></>
            ):(
            <Button onClick={() => history.goBack()}>Back to projects.</Button>
            )}
        </Card.Footer>
    </Card>
  )
}

export default DeleteMembers