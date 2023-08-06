import React, {useState} from 'react'
import styles from '../styles/Home.module.css'
import appStyles from '../App.module.css'
import project from '../images/project.jpeg';
import profile from '../images/profile.jpeg';
import calender from '../images/calender.jpeg'
import {Card, Button, Row, Carousel, Container, Col}from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser } from '../contexts/CurrentUserContext';

export const Home = () => {
  const currentUser = useCurrentUser();
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
  return (
    <div className={styles.darkBackground}>
        <Card>
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
      src={project}
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
      src={profile}
      alt="Second slide"
    />
    <span aria-hidden="true" className={`carousel-control-next-icon ${styles.nextItem}`} />
    <Carousel.Caption>
      <p className={styles.caption}>Personalise your profile with your organisation, role, interests and skills.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <h3 className={styles.caption}>Plan</h3>
    <img
      className="d-block w-100"
      src={calender}
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
  </Container> ):(<Button variant="secondary">Logout</Button>)
}

</div>
)
}

export default Home;