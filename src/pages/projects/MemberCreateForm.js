import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { axiosReq } from '../../api/axiosDefaults';
import { useEffect } from 'react';
// https://react-bootstrap.netlify.app/docs/components/modal/ //

function MemberCreateForm({id}) {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState({results:[]});
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
    formData.append('project', 1)
    formData.append('profile', 2)

    event.preventDefault()
    try {
      const member = await axiosReq.post('/members/', formData)
    } catch(err){
      console.log(err)
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
          <Modal.Title>Select Users to add to Project:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        {
          profiles.results.length ? 
          (
            profiles.results.map(
              profile => (
              <div key={profile.id}>
                <Link to={`/profiles/${profile.id}`}>
                  <Avatar src={profile.image} height={55} />
                </Link>
                {profile.owner}
                <input type="checkbox"></input>
              </div>
              )
            )
          ): ('No Users found. Add a user to your colleages list to add them to a project.')
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