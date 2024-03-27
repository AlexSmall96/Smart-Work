import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Project from './Project';
import appStyles from '../../App.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Container, Card, Col, ProgressBar, Row } from 'react-bootstrap';
import Asset from '../../components/Asset';
import { useRedirect } from '../../hooks/UseRedirect.js';
import styles from '../../styles/Project.module.css';

/* Loads all the users current projects */
const ProjectsPage = () => {
  useRedirect('loggedOut');
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
      // console.log(err.response);
      }
    };
    fetchMembers();
  }, [id]);

  /* Load all project data using project component */
  return (
    hasLoaded?(
      <div className={appStyles.background}>
        <Container className={`${styles.taskKey} ${styles.verticalMarginTopBottom}`} >
          <Row>
            <Col xs={6} sm={4} lg={3}>
              <Card>
                <Card.Header>
                  Key
                </Card.Header>
                <Card.Body>
                  <ProgressBar variant='success' now={100} label='Complete'/>
                  <ProgressBar variant='warning' now={100} label='In Progress'/>
                  <ProgressBar variant='danger' now={100} label='Overdue'/>
                  <ProgressBar variant='info' now={100} label='Not Started'/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {members.length?(
          members.map(
            member => <Project key={member.id} projectData={member} />
          )
        ):(<>You&apos;re not currently a member of any projects. <Link to='/create'><Button variant='primary'>Create a Project</Button></Link></>)
        }  
      </div>
    ):(
      <Container className={appStyles.Content}>
        <Asset spinner />
      </Container>)
  );
};

export default ProjectsPage;