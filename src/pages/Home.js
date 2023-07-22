import React from 'react'
import styles from '../styles/Home.module.css'
import { Col, Container, Row, Image } from 'react-bootstrap';
import project from '../images/project.jpeg';
import profile from '../images/profile.jpeg';
import calender from '../images/calender.jpeg';
import CollaboratorsProfiles from './profiles/CollaboratorsProfiles';
import Members from './projects/Members';

export const Home = () => {
  return (
    <div>
        <div className={styles.homeBox}>
            Plan. Share. Collaborate.
        </div>
            <Container id={styles.homeImages}>
                <Row>
                    <Col sm={4} xs={12}>
                    <Image src={project} fluid />
                        <p>Work on projects with your colleagues and friends.</p>
                    </Col>
                    <Col sm={4} xs={12}>
                    <Image src={profile} fluid />
                         <p>Customize your profile with your role, organisation, skills and interests.</p>
                    </Col>
                    <Col sm={4} xs={12}>
                    <Image src={calender} fluid />
                        <p>Update projects and tasks in real time.</p>
                    </Col>
                </Row>
            </Container>
        <div className={styles.homeBox}>
            Get Started
        </div>
        <p>Already have an account? Login</p>
        {/* <CollaboratorsProfiles /> */}
        <Members />
    </div>
  )
}

export default Home;