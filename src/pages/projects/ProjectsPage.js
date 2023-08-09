import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Project from './Project';
import appStyles from '../../App.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Container } from 'react-bootstrap';
import Asset from '../../components/Asset';

/* Loads all the users current projects */
const ProjectsPage = () => {
    // Initialize variables
    const { id } = useParams();
    const [members, setMembers] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Get the users projects via member data
    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axiosReq.get(`/members/?profile=${id}`);
            setMembers(response.data);
            setHasLoaded(true);
          } catch(err){
            console.log(err.response);
          }
        }
        fetchMembers();
      }, [id]);

  /* Load all project data using project component */
  return (
    hasLoaded?(
      <div className={appStyles.background}>
      {members.length?(
          members.map(member => <Project key={member.id} projectData={member} />
      )
      ):(<>You're not currently a member of any projects. <Link to='/create'><Button variant="primary">Create a Project</Button></Link></>)
      }
  </div>
    ):(<Container className={appStyles.Content}>
      <Asset spinner />
    </Container>)
  );
};

export default ProjectsPage;