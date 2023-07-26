import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { axiosReq } from '../../api/axiosDefaults';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
      const fetchProfiles = async () => {
        try {
          const {data} = await axiosReq.get(`/profiles/${id}`)
          setProfile(data)
        } catch(err){
          console.log(err.response)
        }
      }
      fetchProfiles()
    }, [])

  return (
    <p>{profile.owner}</p>
  )
}

export default Profile