import React, {useState, useRef} from 'react'
import { Modal, Form, Button, Image } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

const ProfileEditForm = ({profile}) => {

    const [profileData, setProfileData] = useState({
        id: profile.id,
        profName:profile.name,
        organisation:profile.organisation,
        role:profile.role,
        skills:profile.skills,
        interests:profile.interests
    })

    const {id, profName, organisation, role, skills, interests, image} = profileData
    const imageFile = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
            })
          }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("name", profName);
      formData.append("organisation", organisation);
      formData.append("role", role);
      formData.append("skills", skills);
      formData.append("interests", interests);
  
      if (imageFile?.current?.files[0]) {
        formData.append("image", imageFile?.current?.files[0]);
      }
  
      try {
        await axiosReq.put(`/profiles/${id}/`, formData);
        // setCurrentUser((currentUser) => ({
        //   ...currentUser,
        //   profile_image: data.image,
        // }));
        // history.goBack();
      } catch (err) {
        console.log(err);
        // setErrors(err.response?.data);
      }
    };

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
      <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              <div>
                <Form.Label
                  className="btn my-auto"
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
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
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
    </Modal.Footer>
</Modal>
</Form>
  )
}

export default ProfileEditForm