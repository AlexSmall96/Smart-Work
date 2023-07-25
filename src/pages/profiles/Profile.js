import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { axiosReq } from '../../api/axiosDefaults';

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState({})
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await axiosReq.get(`/profiles/${id}/`)
                setProfile(data)
            } catch(err){
                console.log(err.response)
            }
        }
        fetchProfile()
    })

  return (
    <div>{profile.owner}</div>
  )
}

export default Profile