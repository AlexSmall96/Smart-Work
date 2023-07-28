import React, { useEffect, useState } from "react";
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const MembersList = () => {
  const [members, setMembers] = useState({})
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || ""

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosReq.get(`/members/${profile_id}`)
        setMembers(response.data)
      } catch(err){
        console.log(err.response.data)
      }
    }
    fetchMembers()
  }, [profile_id])

  return (
    <div>   
      {/* {members.map(member => <p key={member.id}>{member.member_username}</p>)} */}
      <p>{members.member_username}</p>
    </div>
  );
};

export default MembersList