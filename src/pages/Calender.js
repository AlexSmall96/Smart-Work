import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, ButtonGroup, Card, Container, Col, Row, ProgressBar } from 'react-bootstrap'
import styles from '../styles/Calendar.module.css';
import appStyles from '../App.module.css';
import CalendarProject from '../components/CalendarProject';
import { useRedirect } from '../hooks/UseRedirect'
import { axiosReq } from '../api/axiosDefaults';
import Asset from '../components/Asset';

const Calendar = () => {
  useRedirect("loggedOut");
  // Initialize variables
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([])
  const [taskFilter, setTaskFilter] = useState("all-tasks")
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState('Jan')
  const [yearView, setYearView] = useState(true)
  const [monthNum, setMonthNum] = useState(0)
  const [daysArr, setDaysArr] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false);
  
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
  const daysInMonth = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
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

  // Handle tasks filter - users tasks or all tasks
  const handleFilter = (event) => {
      setTaskFilter(event.target.id)
  }

  // Handle change year
  const handleYearChange = (event) => {
      setYear(
        event.target.id === "right" ? (year + 1) : (year-1)
      )
  }

  const handleMonthChange = (event) => {
    setMonth(
      event.target.id
    )
    setMonthNum(
      months.findIndex((element) => element === event.target.id)
    )
    let newArr = []
    for (let i=1;i<daysInMonth[months.findIndex((element) => element === event.target.id)]+1;i++){
      newArr.push(i)
    }
    setDaysArr(newArr)
    setYearView(false)
  }

  const handleMonthUpDown = (event) => {
    let change = event.target.id.slice(4,6) === 'dn' ? (
      month != 'Jan' ? (-1):(11)
    ):(
      month != 'Dec' ? (1):(-11)
    )
      setMonth(
        months[months.findIndex((element) => element === event.target.id.slice(0,3)) + change]
      )
      setMonthNum(
        months.findIndex((element) => element === event.target.id.slice(0,3)) + change
      )
      let newArr = []
      for (let i=1;i<daysInMonth[months.findIndex((element) => element === event.target.id.slice(0,3)) + change]+1;i++){
      newArr.push(i)
      }
      setDaysArr(newArr)
      setYear(
        event.target.id.slice(4,6) === 'dn' ? (
          month === 'Jan' ? (year - 1):(year)
        ):(month === 'Dec' ? (year + 1):(year))
      )
  }

  const handleTimeChange = () => {
    setYearView(true)
  }

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
    <Card className={`${styles.months}`}>
      <Card.Header className={styles.projectCard}>
        <Row className={styles.noMarginMobile}>
          <Col xs={12} sm={12} md={2} className={yearView?(''):(styles.yearButtonMonthView)}> 
          <div className={`${styles.arrow}`}><i className="fa-solid fa-circle-chevron-left" id={`left`} onClick={handleYearChange}></i></div>
                <Button 
                  variant="secondary" 
                  disabled={yearView} 
                  className={`${styles.yearHeading} ${styles.monthHeading} ${yearView?(''):(styles.singleMonthHeading)}`} 
                  onClick={handleTimeChange}> 

                    {year} 
                </Button>
              <div className={`${styles.arrow}`}><i className="fa-solid fa-circle-chevron-right" id={`right`} onClick={handleYearChange}></i></div>
          </Col>
          <Col xs={{span:12, offset:0}} sm={{span:10, offset:2}} md={{span:10, offset:0}}>{
          yearView ? (
            months.map(
              month => <Button 
              id={month} 
              key={month} 
              className={styles.monthHeading}
              onClick={handleMonthChange}
              >{month}</Button>
              )
          ):(<>
              <div className={styles.monthButtonArrows}>
                  <div className={`${styles.arrow} `}><i className="fa-solid fa-circle-chevron-left" id={`${month}-dn`} onClick={handleMonthUpDown}></i></div>
                    <div className={`${styles.singleMonthHeading} ${styles.monthHeading}`}> {month} </div>
                  <div className={`${styles.arrow}`}><i className="fa-solid fa-circle-chevron-right" id={`${month}-up`} onClick={handleMonthUpDown}></i></div>
              </div>
              <div className={styles.wideScreenOnly}>
                {
                  daysArr.map(num => <span
                     key={num}
                     className={`${styles.monthHeading} ${styles.dayHeading}`}
                     style={{
                      width:`${100/daysInMonth[monthNum]}%`
                     }}
                     >{num}</span>)
                }
              </div>
            </>)
          }
          </Col>
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
          year={year}
          month={month}
          monthNum={monthNum}
          yearView={yearView}
          />
      ))
    ):('')}
  </>):(<Container className={appStyles.Content}>
      <Asset spinner />
    </Container>)
)

}

export default Calendar