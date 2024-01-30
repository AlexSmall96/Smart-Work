import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory  } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Button, Form } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { axiosReq } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import { useRedirect } from '../../hooks/UseRedirect.js';

/* Allow user to edit their own profile*/
const ProfileEdit = () => {
  useRedirect("loggedOut");
   // Initialize state variables
    const {id} = useParams();
    const imageFile = useRef();
    const [profile, setProfile] = useState({});
    const history = useHistory();

    // Get profile data when component mounts or updates
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await axiosReq.get(`/profiles/${id}`);
            setProfile({
                owner:response.data.owner,
                profId: response.data.id,
                profName:response.data.name,
                organisation:response.data.organisation,
                role:response.data.role,
                skills:response.data.skills,
                interests:response.data.interests,
                image:response.data.image,
                created_at:response.data.created_at
            });
            
          } catch(err){
            // console.log(err.response)
          }
      };
        fetchProfile()
    }, [id]);
    
    // Handle form data change
    const handleChange = (event) => {
        setProfile({
            ...profile, 
            [event.target.name]: event.target.value
            });
    };
    
    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", profile.profName);
        formData.append("organisation", profile.organisation);
        formData.append("role", profile.role);
        formData.append("skills", profile.skills);
        formData.append("interests", profile.interests);
        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }
        try {
            await axiosReq.put(`/profiles/${id}/`, formData);
            history.push(`/profiles/${id}`);
        } catch (err) {
            // console.log(err);
        }
    };


return (
    <>
    <Card className="text-center">
    {/* Load profile data into form*/}
    <Card.Header>{profile.owner}</Card.Header>
    <Card.Body>
    <Form>
      {/* Image */}
      <Form.Group> 
        <div>
          <Form.Label
            className="btn my-auto"
            htmlFor="image-upload"
          >
            <Avatar src={profile.image} height={100} />
            Click to upload a new image.
          </Form.Label>
        </div>
          <Form.File
            id="image-upload"
            ref={imageFile}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length) {
                setProfile({
                  ...profile,
                  image: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
      </Form.Group> 
      {/* Name */}
      <Form.Group controlId="profName">
        <Form.Label>Name:</Form.Label>
        <Form.Control 
        type="text"
        name="profName"
        value={profile.profName}
        onChange={handleChange}
        className={appStyles.strongBorder}
     />
     {/* Organisation */}
    </Form.Group>
    <Form.Group controlId="organisation">
        <Form.Label>Organisation:</Form.Label>
        <Form.Control
        type="text"
        name="organisation"
        value={profile.organisation}
        onChange={handleChange}
        className={appStyles.strongBorder} />
    </Form.Group>
     {/* Role */}
    <Form.Group controlId="role">
        <Form.Label>Role:</Form.Label>
        <Form.Control
        type="text"
        name="role"
        value={profile.role}
        onChange={handleChange}
        className={appStyles.strongBorder} />
    </Form.Group>
     {/* Skills */}
    <Form.Group controlId="skills">
        <Form.Label>Skills:</Form.Label>
        <Form.Control
        type="text"
        name="skills"
        value={profile.skills}
        onChange={handleChange}
        className={appStyles.strongBorder} />
    </Form.Group>
     {/* Interests */}
    <Form.Group controlId="interests">
        <Form.Label>Interests:</Form.Label>
        <Form.Control
        type="text"
        name="interests"
        value={profile.interests}
        onChange={handleChange}
        className={appStyles.strongBorder} />
    </Form.Group>
    </Form>
  </Card.Body>
  <Card.Footer className="text-muted">{`Joined: ${profile.created_at}`}</Card.Footer>
  </Card>
{/* Go back button */}
<Button variant="primary" onClick={() => history.goBack()} className={appStyles.verticalMargin}>Back</Button>
{/* Submit form */}
<Button variant="primary" onClick={handleSubmit} className={`${appStyles.verticalMargin} ${appStyles.horizontalMargin}`}>Save Changes</Button>
</>
);
};

export default ProfileEdit;