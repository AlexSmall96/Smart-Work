import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, ButtonGroup, Card, Container, Col, Row, ProgressBar } from 'react-bootstrap'
import styles from '../styles/Calendar.module.css';
import CalendarProject from '../components/CalendarProject';
import { useRedirect } from '../hooks/UseRedirect'
import { axiosReq } from '../api/axiosDefaults';

const Calendar = () => {
  useRedirect("loggedOut");
  // Initialize variables
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([])
  const [taskFilter, setTaskFilter] = useState("all-tasks")
  const [year, setYear] = useState(new Date().getFullYear())

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
  ]

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
    }
    fetchMembers();
  }, [id]);

  // Handdle tasks filter - users tasks or all tasks
  const handleFilter = (event) => {
      setTaskFilter(event.target.id)
  }

  // Handle change year
  const handleYearChange = (event) => {
    setYear(
      event.target.id === "right" ? (year + 1) : (year-1)
    )
  }

return (
  <>
    {/* Colour Key for task status */}
    <Container className={`${styles.taskKey} ${styles.verticalMarginTopBottom}`} >
      <Row>
        <Col xs={6} sm={4} lg={3}>
          <Card>
            <Card.Header>Key</Card.Header>
            <Card.Body>
              <ProgressBar variant="success" now={100} label="Complete"/>
              <ProgressBar variant="warning" now={100} label="In Progress"/>
              <ProgressBar variant="danger" now={100} label="Overdue"/>
              <ProgressBar variant="info" now={100} label="Not Started"/>
            </Card.Body>
          </Card>
        </Col>
        {/* Buttons to filter tasks */}
        <Col xs={2}>
          <ButtonGroup className={styles.filter} aria-label="Basic example">
            <Button variant="secondary" id="all-tasks" disabled={taskFilter === "all-tasks"} onClick={handleFilter}>All Tasks</Button>
            <Button variant="secondary" id="my-tasks" disabled={taskFilter === "my-tasks"} onClick={handleFilter}>My Tasks</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
    {/* Year and month heading */}
    <Card className={styles.months}>
      <Card.Header className={styles.projectCard}>
        <Row>
          <Col xs={2} className={styles.year}> 
            <i className="fa-solid fa-chevron-left" id="left" onClick={handleYearChange}></i> {year} <i className="fa-solid fa-chevron-right" id="right" onClick={handleYearChange}></i>
          </Col>
          <Col xs={10}>{months.map(month => <div key={month} className={styles.monthHeading}>{month}</div>)}</Col>
        </Row>
      </Card.Header>
    </Card>
    {/* Map through members data to show timeline for each project */}
    {members.length?(
      members.map(member => (
        <CalendarProject 
          key={member.id} 
          projectData={member} 
          userId={id} 
          taskFilter={taskFilter}
          year={year} />
      ))
    ):('')}
  </>
)

}

export default Calendar