import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { axiosReq } from '../../api/axiosDefaults';
import { Card } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ProfileEditForm from './ProfileEditForm';

const Profile = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [profile, setProfile] = useState({});


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
    <Card.Header>{profile.owner}</Card.Header>
    <Card.Body>
        <Card.Title>
            {profile.name? profile.name : ''}
            <small>
                {profile.role? (<p>{profile.role}{
                    profile.organisation? (`at ${profile.organisation}`):('')
                }</p>)
                :('')
            }
            </small>
        </Card.Title>
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
      <ProfileEditForm profile={profile}/>
    ):('')}
    </>
  )
}

export default Profile