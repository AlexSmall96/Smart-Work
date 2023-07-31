import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import { Carousel } from 'react-bootstrap';
import project from '../images/project.jpeg';
import profile from '../images/profile.jpeg';
import calender from '../images/calender.jpeg'
import {Card, Button}from 'react-bootstrap';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Home = () => {
  const [projects, setProjects] = useState([])
  const currentUser = useCurrentUser();
    const [index, setIndex] = useState(0);
    const history = useHistory();
    const [hasLoaded, setHasLoaded] = useState(false)
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    
    useEffect(() => {
      const fetchProjects = async () => {
        try {
            const response = await axiosReq.get(`/members/?profile=1`)
            setProjects(response.data)
        } catch(err){
          console.log(err)
        }
      }
      setHasLoaded(false);
      const timer = setTimeout(() => {
        fetchProjects();
      }, 1000);
  
      return () => {
        clearTimeout(timer);
      };
    }, [projects])


  return (
    <div className={styles.darkBackground}>
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
        <Button variant="light">
            Get Started
        </Button>
        <p>Already have an account?<Button variant="light">
            Login
        </Button></p>
        {projects.map(project => <p key={project.id}>{project.title}</p>)}
    </div>
  )
}

export default Home;