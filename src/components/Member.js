import React, { useState } from 'react'
import Avatar from './Avatar'

const Member = ({profile, selected}) => {
    const [checked, setChecked] = useState(selected)
  return (
    <div id={profile.id} selected={selected}>
      <Avatar src={profile.image} height={55} />
    {profile.owner}
  </div>
  )
}

export default Member