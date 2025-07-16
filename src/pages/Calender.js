import React, {useState, useEffect} from 'react';
import { Button, ButtonGroup, Card, Container, Col, Row, ProgressBar } from 'react-bootstrap';
import styles from '../styles/Calendar.module.css';
import appStyles from '../App.module.css';
import CalendarProject from '../components/CalendarProject';
import { useRedirect } from '../hooks/UseRedirect';
import { axiosReq } from '../api/axiosDefaults';
import Asset from '../components/Asset';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ProjectDataProvider } from '../contexts/ProjectDataContext';
import { useCalender } from '../contexts/CalenderContext';

const Calendar = () => {
  useRedirect('loggedOut');

  // Initialize variables
  const [members, setMembers] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { year, setYear, taskFilter, setTaskFilter } = useCalender()
  const { id } = useParams()

  // Month Array for heading
  const months =[
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

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

  // Handle tasks filter - users tasks or all tasks
  const handleFilter = (event) => {
    setTaskFilter(event.target.id);
  };

  // Handle change year
  const handleYearChange = (event) => {
    setYear(
      event.target.id === 'right' ? (year + 1) : (year-1)
    );
  };

  return (
    hasLoaded?(
      <>
        {/* Colour Key for task status */}
        <Container className={`${styles.taskKey} ${styles.verticalMarginTopBottom}`} >
          <Row>
            <Col xs={6} sm={4} lg={3}>
              <Card>
                <Card.Header>Key</Card.Header>
                <Card.Body>
                  <ProgressBar variant='success' now={100} label='Complete'/>
                  <ProgressBar variant='warning' now={100} label='In Progress'/>
                  <ProgressBar variant='danger' now={100} label='Overdue'/>
                  <ProgressBar variant='info' now={100} label='Not Started'/>
                </Card.Body>
              </Card>
            </Col>
            {/* Buttons to filter tasks */}
            <Col xs={2}>
              <ButtonGroup className={styles.filter} aria-label='Basic example'>
                <Button variant='secondary' id='all-tasks' disabled={taskFilter === 'all-tasks'} onClick={handleFilter}>All Tasks</Button>
                <Button variant='secondary' id='my-tasks' disabled={taskFilter === 'my-tasks'} onClick={handleFilter}>My Tasks</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
        {/* Year and month heading */}
        <Card className={`${styles.months}`}>
          <Card.Header className={styles.projectCard}>
            <Row className={styles.noMarginMobile}>
              <Col xs={12} sm={12} md={2}> 
                <div className={`${styles.arrow}`}><i className='fa-solid fa-circle-chevron-left' id={`left`} onClick={handleYearChange}></i></div>
                <Button 
                  variant='secondary' 
                  disabled
                  className={`${styles.yearHeading} ${styles.monthHeading}`}> 
                  {year} 
                </Button>
                <div className={`${styles.arrow}`}><i className='fa-solid fa-circle-chevron-right' id={`right`} onClick={handleYearChange}></i></div>
              </Col>
              <Col xs={{span:12, offset:0}} sm={{span:10, offset:2}} md={{span:10, offset:0}}>
                {
                  months.map(month => 
                    <Button 
                      id={month} 
                      key={month} 
                      className={styles.monthHeading}
                      disabled
                      variant='light'
                    >
                      {month}
                    </Button>
                  )
                }
              </Col>
            </Row>
          </Card.Header>
        </Card>
        {/* Map through members data to show timeline for each project */}
        {members.length?(
          members.map(member => (
            <ProjectDataProvider key={member.id} projectData={member} >
              <CalendarProject />
            </ProjectDataProvider>
          ))
        ):(<>You&apos;re not currently a member of any projects. <Link to='/create'><Button variant='primary'>Create a Project</Button></Link></>)}
      </>):(<Container className={appStyles.Content}>
      <Asset spinner />
    </Container>)
  );
};

export default Calendar;