import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { axiosReq } from '../../api/axiosDefaults';
import { Modal, Form, Button, Card } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Profile = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const {data} = await axiosReq.get(`/profiles/${id}`)
          setProfile(data)
        } catch(err){
          console.log(err.response)
        }
      }
      fetchProfile()
    }, [id])

    const is_owner = currentUser?.username === profile?.owner;
  return (
    <>
    <Card className="text-center">
    <Card.Header>{`${profile.role} at ${profile.organisation}`}</Card.Header>
    <Card.Body>
        <Card.Title>{profile.owner}</Card.Title>
        <Card.Text>
        <Avatar src={profile.image} height={200} />
        <br />
        {`Skills: ${profile.skills}`}
        <br />
        {`Interests: ${profile.interests}`}
        </Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">{`Joined: ${profile.created_at}`}</Card.Footer>
    </Card>
    {is_owner? (
        <>
        <Form>  
            <Button variant="primary" onClick={handleShow}>
              Edit Profile
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{`Edit profile details for ${profile.owner}`}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form.Group controlId="image">
                <Avatar src={profile.image} height={100}/>
                <Form.File id="image" label="Select Profile Image" />
            </Form.Group>
            <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                type="text"
                name="name" />
            </Form.Group>
            <Form.Group controlId="organisation">
                <Form.Label>Organisation:</Form.Label>
                <Form.Control
                type="text"
                name="organisation" />
            </Form.Group>
            <Form.Group controlId="role">
                <Form.Label>Role:</Form.Label>
                <Form.Control
                type="text"
                name="role" />
            </Form.Group>
            <Form.Group controlId="skills">
                <Form.Label>Skills:</Form.Label>
                <Form.Control
                type="text"
                name="skills" />
            </Form.Group>
            <Form.Group controlId="interests">
                <Form.Label>Interests:</Form.Label>
                <Form.Control
                type="text"
                name="interests" />
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </Form>
        </>
    ):('')}
    </>
  )
}

export default Profile