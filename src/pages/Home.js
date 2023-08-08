import React, {useState} from 'react'
import styles from '../styles/Home.module.css'
import {Card, Button, Row, Carousel, Container, Col}from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';

export const Home = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const handleSignOut = async () => {
      try {
        await axios.post("dj-rest-auth/logout/");
        setCurrentUser(null);
      } catch (err) {
        console.log(err);
      }
    };
  
  return (
    <div className={styles.darkBackground}>
        <Card className={styles.coverText}>
            <Card.Body><em>Simple, effective project management software</em></Card.Body>
        </Card>
<Carousel
className={styles.carousel}
activeIndex={index} 
onSelect={handleSelect} 
nextIcon={<span aria-hidden="true" className={`carousel-control-next-icon ${styles.carouselIicon}`} />}
prevIcon={<span aria-hidden="true" className={`carousel-control-prev-icon ${styles.carouselIicon}`} />}
indicators={false}
>
  <Carousel.Item>
  <h3 className={styles.caption}>Collaborate</h3>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/dojzptdbc/image/upload/v1691443644/project_kzsven.jpg"
      alt="First slide"
    />
    <Carousel.Caption className={styles.paddedCaption}>
    </Carousel.Caption>
    <p className={styles.caption}>Work on projects with your colleagues and friends.</p>
  </Carousel.Item>
  <Carousel.Item>
  <h3 className={styles.caption}>Customize</h3>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/dojzptdbc/image/upload/v1691444198/profile_gm4afv.jpg"
      alt="Second slide"
    />
    <Carousel.Caption className={styles.paddedCaption}>
    </Carousel.Caption>
    <p className={styles.caption}> Personalise your profile with your organisation, role, interests and skills</p>
  </Carousel.Item>
  <Carousel.Item>
    <h3 className={styles.caption}>Plan</h3>
    <img
      className="d-block w-100" 
      src="https://res.cloudinary.com/dojzptdbc/image/upload/v1691443751/calender_ldwpt4.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
      <p className={styles.caption}>Never miss a deadline again with our detailed planning system.</p>
  </Carousel.Item>
</Carousel>
{
  !currentUser? (<Container className={styles.links}>
    <Row className="justify-content-md-center">
      <Col md={4} sm={12}><Link to={`/signup/`}><Button variant="secondary">Get Started</Button></Link></Col>
      <Col md={4} sm={12}>Already have an account?</Col>
      <Col md={4} sm={12}><Link to={`/signin/`}><Button variant="secondary">Login</Button></Link></Col>
    </Row>
  </Container> ):(<Button variant="secondary" onClick={handleSignOut}>Logout</Button>)
}

</div>
)
}

export default Home;