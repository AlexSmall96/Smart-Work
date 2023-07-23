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
    <div>
    <Link to={`/profiles/${profile.id}`}>
      <Avatar src={profile.image} height={55} />
    </Link>
    {profile.owner}
    <input id={profile.id} type="checkbox" checked={checked} onChange={handleChange}></input>
  </div>
  )
}

export default Member