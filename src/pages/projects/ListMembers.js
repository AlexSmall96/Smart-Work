import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'

const ListMembers = () => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await axiosReq.get('/members/')
                setMembers(data)
            } catch(err){
                console.log(err.response)
            }
        }
        fetchMembers()
    })

  return (
    <div>
        {members.length? (
            members.map(member => <p>{member.profile}</p>)
        ):('no members found')}
    </div>
  )
}

export default ListMembers