import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { axiosReq } from '../../api/axiosDefaults';
import { Card, Button } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import appStyles from '../../App.module.css'

const Profile = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const history = useHistory();
  const [tasks, setTasks] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const {data} = await axiosReq.get(`/profiles/${id}`)
          setProfile(data)
        } catch(err){
          console.log(err.response)
        }
      }
      const fetchTasks = async () => {
        try {
            const response = await axiosReq.get(`/tasks/?assigned_to__profile=${id}`)
            setTasks(response.data.filter(task => task.status === "Complete"))
        } catch(err){
            console.log(err)
        }
    }
    const fetchMembers = async () => {
      try {
        const response = await axiosReq.get(`/members/?profile=${id}`)
        setMembers(response.data)
      } catch(err){
        console.log(err)
    }
    }
    fetchTasks()
    fetchProfile()
    fetchMembers()
    }, [id, history ])

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
                    profile.organisation? (` at ${profile.organisation}`):('')
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
      <Link to={`/profiles/edit/${id}`}>
        <Button className={appStyles.verticalMargin}>Edit Profile</Button>
        <Button onClick={() => history.goBack()} className={`${appStyles.verticalMargin} ${appStyles.horizontalMargin}`}>Back</Button>
      </Link>
    ):(<Button onClick={() => history.goBack()} className={appStyles.verticalMargin}>Back</Button>)}
    <Card className={appStyles.verticalMargin}>
      <Card.Header>
        Stats
      </Card.Header>
      <Card.Header>
        {`Total Tasks Completed: ${tasks.length}`}
      </Card.Header>
      <Card.Header>
        {`Projects Currently a Member of: ${members.length}`}
      </Card.Header>  
    </Card>
    </>
  )
}

export default Profile