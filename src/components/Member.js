import React, { useState } from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Member = ({profile, selected}) => {
    const [checked, setChecked] = useState(selected)
    const handleChange = () => {
        setChecked(!checked)
        console.log(checked)
    }
  return (
    <div id={profile.id}>
    <Link to={`/profiles/${profile.id}`}>
      <Avatar src={profile.image} height={55} />
    </Link>
    {profile.owner}
  </div>
  )
}

export default Member