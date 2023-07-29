import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Member from '../../components/Member';
import { axiosReq } from '../../api/axiosDefaults';
import { useEffect } from 'react';
// https://react-bootstrap.netlify.app/docs/components/modal/ //

function MemberCreateForm({projectId, title, memberProfileIds}) {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileIds, setSelectedProfileIds] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [feedback, setFeedback] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axiosReq.get('/profiles/') 
        setProfiles(response.data)
      } catch(err){
        console.log(err)
      }
    }
    fetchProfiles()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await Promise.all([
        selectedProfileIds.map(id => axiosReq.post('/members/', {'project': projectId, 'profile': Number(id)}))
      ])
      setFeedback('Users successfully added to project')
    } catch(err){
      console.log(err)
    }
  }
  
  // const handleChange = (event) => {
  //     selectedProfileIds.push(event.target.parentNode.id)
  //     setSelectedProfiles(
  //       profiles.results.filter(profile => selectedProfileIds.includes((profile.id).toString()))
  //     )
  // }

  const handleClick = (event) => {
    if (event.target.selected === false){
      selectedProfileIds.push(event.target.id)
      setSelectedProfileIds(selectedProfileIds)
      setSelectedProfiles(  
        profiles.filter(profile => selectedProfileIds.includes((profile.id).toString()))
      )
      event.target.selected = true
    } else {
      let index = selectedProfileIds.indexOf(event.target.id)
      selectedProfileIds.splice(index, 1)
      setSelectedProfileIds(selectedProfileIds)
      setSelectedProfiles(
        profiles.filter(profile => selectedProfileIds.includes((profile.id).toString()))
      )
      event.target.selected = false
    }
  }

  return (
    <>
    <form>
      <Button type="button" variant="primary" onClick={handleShow}>
          + <i className="fa-solid fa-users"></i>
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{feedback? 'Users succesfully added to project':`Select users to add to ${title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          profiles.length && !feedback ? 
          (
            profiles.map(
              profile => (
                <Member key={profile.id} profile={profile} onClick={handleClick} selected={false} disabled={memberProfileIds.includes(profile.id)} />
              )
            )
          ): ('')
        }
        <p>{feedback? '': 'Selected Users:'}</p>
        {
        selectedProfiles.length ?
        (
          selectedProfiles.map(
          profile => (
            <Member key={profile.id} profile={profile} onClick={handleClick} selected={true} disabled={false}/>
          )
        )
        ) : ('')
        }
        </Modal.Body> 
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      </form>
    </>
  );
}

export default MemberCreateForm