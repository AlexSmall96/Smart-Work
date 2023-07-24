import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import Member from '../../components/Member';
import { axiosReq } from '../../api/axiosDefaults';
import { useEffect } from 'react';
// https://react-bootstrap.netlify.app/docs/components/modal/ //

function MemberCreateForm({project, title}) {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState({results:[]});
  const [selectedProfileIds, setSelectedProfileIds] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
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
    const formData = new FormData();
    formData.append('project', project)
    formData.append('profile', 1)

    event.preventDefault()
    try {
      const member = await axiosReq.post('/members/', formData)
    } catch(err){
      console.log(err.response)
    }
  }

  const handleClick = (event) => {
    selectedProfileIds.push(event.target.id)
    setSelectedProfileIds(selectedProfileIds)
    setSelectedProfiles(
      profiles.results.filter(profile => selectedProfileIds.includes((profile.id).toString()))
    )
    console.log(selectedProfiles)
  }

  return (
    <>
    <form>
      <Button type="button" variant="primary" onClick={handleShow}>
          <i className="fa-solid fa-users"></i> Add Member
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Select users to add to ${title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        {
          profiles.results.length ? 
          (
            profiles.results.map(
              profile => (
                <Button key={profile.id} onClick={handleClick}>
                    <Member profile={profile} selected={false} />
                </Button>
              )
            )
          ): ('No Users found. Add a user to your colleages list to add them to a project.')
        }
        <p>Selected Users:</p>
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