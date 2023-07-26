import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import Avatar from '../../components/Avatar';

const ProfileEditForm = ({profile}) => {

    const [profileData, setProfileData] = useState({
        profName:profile.name,
        organisation:profile.organisation,
        role:profile.role,
        skills:profile.skills,
        interests:profile.interests
    })

    const {profName, organisation, role, skills, interests} = profileData

    const [image, setImage] = useState(profile.image)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
            })
          }

  return (
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
        <button><Form.File id="image" label="Select Profile Image" /></button>
    </Form.Group>  
    <Form.Group controlId="profName">
        <Form.Label>Name:</Form.Label>
        <Form.Control 
        type="text"
        name="profName"
        value={profName}
        onChange={handleChange}
     />
    </Form.Group>
    <Form.Group controlId="organisation">
        <Form.Label>Organisation:</Form.Label>
        <Form.Control
        type="text"
        name="organisation"
        value={organisation}
        onChange={handleChange} />
    </Form.Group>
    <Form.Group controlId="role">
        <Form.Label>Role:</Form.Label>
        <Form.Control
        type="text"
        name="role"
        value={role}
        onChange={handleChange} />
    </Form.Group>
    <Form.Group controlId="skills">
        <Form.Label>Skills:</Form.Label>
        <Form.Control
        type="text"
        name="skills"
        value={skills}
        onChange={handleChange} />
    </Form.Group>
    <Form.Group controlId="interests">
        <Form.Label>Interests:</Form.Label>
        <Form.Control
        type="text"
        name="interests"
        value={interests}
        onChange={handleChange} />
    </Form.Group>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
    </Modal.Footer>
</Modal>
</Form>
  )
}

export default ProfileEditForm