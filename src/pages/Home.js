import React from 'react'
import styles from '../styles/Home.module.css'
import { Col, Container, Row } from 'react-bootstrap';


export const Home = () => {
  return (
    <div>
        <div className={styles.homeBox}>
            Plan. Share. Collaborate.
        </div>
            <Container id={styles.homeImages}>
                <Row className={styles.imageRow}>
                    <Col sm={4} xs={12}>
                        <i className="fa-solid fa-diagram-project fa-2xl"></i>
                        <p>Work on projects with your colleagues and friends.</p>
                    </Col>
                    <Col sm={4} xs={12}>
                         <i className="fa-regular fa-id-card fa-2xl"></i>
                         <p>Customize your profile with your role, organisation, skills and interests.</p>
                    </Col>
                    <Col sm={4} xs={12}>
                        <i className="fa-solid fa-calendar-check fa-2xl"></i>
                        <p>Update projects and tasks in real time.</p>
                    </Col>
                </Row>
            </Container>
        <div className={styles.homeBox}>
            Get Started
        </div>
        <p>Already have an account? Login</p>
    </div>
  )
}

export default Home;