import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { axiosReq } from '../../api/axiosDefaults';
import { useEffect } from 'react';
// https://react-bootstrap.netlify.app/docs/components/modal/ //

function MemberCreateForm(props) {
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
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          <i className="fa-solid fa-users"></i> Add Member
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Users to add to Project:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        
          {profiles.results.length ? 
          (
            <form>
            {
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
            }
            </form>
          ): ('no results')}
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MemberCreateForm