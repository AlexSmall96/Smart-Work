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

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary">Year</Button>
        <Button variant="secondary">Month</Button>
      </ButtonGroup>
      <Container>
        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            <Card>
              <Card.Header>
                <Container>
                  <Row>
                    <Col className={styles.cell}>Jan</Col>
                    <Col className={styles.cell}>Feb</Col>
                    <Col className={styles.cell}>Mar</Col>
                    <Col>Apr</Col>
                    <Col>May</Col>
                    <Col>Jun</Col>
                    <Col>Jul</Col>
                    <Col>Aug</Col>
                    <Col>Sep</Col>
                    <Col>Oct</Col>
                    <Col>Nov</Col>
                    <Col>Dec</Col>
                  </Row>
                </Container>
              </Card.Header>
              <Card.Header>
            <ProgressBar>
                <ProgressBar variant="danger" now={40} min={10} label={'task 1'} />
                <ProgressBar variant="warning" now={20} label={'task 2'} />
            </ProgressBar>
            <ProgressBar className={styles.blankProgress}>
                <ProgressBar now={0} />
                <ProgressBar variant="warning" now={40} label={'task 3'} />
            </ProgressBar>
          </Card.Header>
          </Card>
          </Col>
        </Row>
        {members.length?(
          members.map(member => (
              <CalendarProject key={member.id} projectData={member} />
          ))
        ):('')}
      </Container>
    </>
  )
}

export default Calendar