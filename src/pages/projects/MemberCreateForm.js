import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import Member from '../../components/Member';
import { axiosReq } from '../../api/axiosDefaults';
import { useEffect } from 'react';
// https://react-bootstrap.netlify.app/docs/components/modal/ //

function MemberCreateForm({projectId, title}) {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState({results:[]});
  const [selectedProfileIds, setSelectedProfileIds] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [feedback, setFeedback] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const {data} = await axiosReq.get('/profiles/') 
        setProfiles(data)
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

  const handleClick = (event) => {
    if (event.target.selected === false){
      event.target.parentNode.classList.remove("btn-secondary")
      event.target.parentNode.classList.add("btn-primary")
      selectedProfileIds.push(event.target.id)
      setSelectedProfileIds(selectedProfileIds)
      setSelectedProfiles(
        profiles.results.filter(profile => selectedProfileIds.includes((profile.id).toString()))
      )
      event.target.selected = true
    } else {
      event.target.parentNode.classList.add("btn-secondary")
      event.target.parentNode.classList.remove("btn-primary")
      let index = selectedProfileIds.indexOf(event.target.id)
      selectedProfileIds.splice(index, 1)
      setSelectedProfileIds(selectedProfileIds)
      setSelectedProfiles(
        profiles.results.filter(profile => selectedProfileIds.includes((profile.id).toString()))
      )
      event.target.selected = false
    }
  }

  return (
    <>
    <form>
      <Button type="button" variant="primary" onClick={handleShow}>
          <i className="fa-solid fa-users"></i> Add Member
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{feedback? 'Users succesfully added to project':`Select users to add to ${title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          profiles.results.length && !feedback ? 
          (
            profiles.results.map(
              profile => (
                <Button key={profile.id} onClick={handleClick} variant="secondary">
                    <Member profile={profile} />
                </Button>
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
            <Member key={profile.id} profile={profile} selected={false}/>
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