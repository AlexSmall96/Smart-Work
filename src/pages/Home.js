import React, {useState} from 'react'
import styles from '../styles/Home.module.css'
import { Col, Container, Row, Image, Carousel } from 'react-bootstrap';
import project from '../images/project.jpeg';
import profile from '../images/profile.jpeg';
import untitled from '../images/Untitled.jpeg'
import untitled1 from '../images/Untitled-1.jpeg'
import calender from '../images/calender.jpeg'
import {Card, Button}from 'react-bootstrap';

export const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  return (
    <div>
        <Card>
            <Card.Body><em>Simple, effective project management software</em></Card.Body>
        </Card>
<Carousel 
activeIndex={index} 
onSelect={handleSelect} 
nextIcon={<span aria-hidden="true" className={`carousel-control-next-icon ${styles.carouselIicon}`} />}
prevIcon={<span aria-hidden="true" className={`carousel-control-prev-icon ${styles.carouselIicon}`} />}
indicators={false}
>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={project}
      alt="First slide"
    />
    <Carousel.Caption className={styles.paddedCaption}>
    </Carousel.Caption>
    <h3 className={styles.caption}>Collaborate</h3>
    <p className={styles.caption}>Work on projects with your colleagues and friends.</p>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={profile}
      alt="Second slide"
    />
    <span aria-hidden="true" className={`carousel-control-next-icon ${styles.nextItem}`} />

    <Carousel.Caption>
      <h3 className={styles.caption}>Customize</h3>
      <p className={styles.caption}>Personalise your profile with your organisation, role, interests and skills.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={calender}
      alt="Third slide"
    />

    <Carousel.Caption>
    </Carousel.Caption>
    <h3 className={styles.caption}>Plan</h3>
      <p className={styles.caption}>Never miss a deadline again with our detailed planning system.</p>
  </Carousel.Item>
</Carousel>
        <Button variant="light">
            Get Started
        </Button>
        <p>Already have an account?<Button variant="light">
            Login
        </Button></p>
    </div>
  )
}

export default Home;