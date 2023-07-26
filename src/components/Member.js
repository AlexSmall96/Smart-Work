import React from 'react'
import Avatar from './Avatar'

const Member = ({profile}) => {
  return (
    <div id={profile.id}>
      <Avatar src={profile.image} height={55} />
    {profile.owner}
  </div>
  )
}

export default Member