import React, {useState} from 'react';
import styles from '../styles/Home.module.css';
import {Card, Button, Row, Carousel, Container, Col}from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { removeTokenTimestamp } from '../utils/utils';

/* Home page with pictures and links to signin/signup */
export const Home = (color) => {
  // Initialize variables
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    // Handle sign out
    const handleSignOut = async () => {
      try {
        await axios.post("dj-rest-auth/logout/");
        setCurrentUser(null);
        removeTokenTimestamp()
      } catch (err) {
        // console.log(err);
      }
    };
  
return (
  <div className={styles.darkBackground}>
      <Card className={styles.coverText}>
          <Card.Body><em>Simple, effective project management software</em></Card.Body>
      </Card>
    {/* Carousel with images */}
    <Carousel
    className={styles.carousel}
    activeIndex={index} 
    onSelect={handleSelect} 
    nextIcon={<span aria-hidden="true" className={`carousel-control-next-icon ${color}`} />}
    prevIcon={<span aria-hidden="true" className={`carousel-control-prev-icon ${color}`} />}
    indicators={false}
    >
      <Carousel.Item>
      <h3>Collaborate</h3>
      <p>Work on projects with your colleagues and friends.</p>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/dojzptdbc/image/upload/v1706630414/project2_ooqzbc.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      <h3>Customize</h3>
      <p> Personalise your profile with your organisation, role, interests and skills</p>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/dojzptdbc/image/upload/v1706630216/profile2_g9rt3h.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <h3>Plan</h3>
        <p>Never miss a deadline again with our detailed planning system.</p>
        <img
          className="d-block w-100" 
          src="https://res.cloudinary.com/dojzptdbc/image/upload/v1706630523/calender2_tbnodm.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    {
      !currentUser? (<Container className={styles.links}>
        <Row className="justify-content-md-center">
          {/* Sign in and sign up links */}
          <Col><Link to={`/signup/`}><Button variant="secondary">Get Started</Button></Link></Col>
          <Col>Already have an account?</Col>
          <Col><Link to={`/signin/`}><Button variant="secondary">Login</Button></Link></Col>
        </Row>
      </Container> ):(<Button variant="secondary" onClick={handleSignOut}>Logout</Button>)
    }
  </div>
);
};

export default Home;