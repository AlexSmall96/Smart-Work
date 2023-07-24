import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Project from "./Project";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProjectsPage(props) {
    const currentUser = useCurrentUser();
    const [projects, setProjects] = useState({results:[]});
    const [members, setMembers] = useState({results:[]});
    const [profiles, setProfiles] = useState({results:[]});
    const [hasLoaded, setHasLoaded] = useState(false)
    const {pathname} = useLocation();
    // 
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Need to filter projects based on user
                const {data} = await axiosReq.get(`/members/?profile=${currentUser.profile_id}`)
                setProjects(data)
                setHasLoaded(true)
            } catch(err){
                console.log(err)
            }
        }
        fetchProjects()
    })


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
            <>
                {projects.results.length ? (
                    projects.results.map(project => (
                        <Project key={project.id} {...project} setProjects={setProjects} />
                    ))
                ) : ('no results')}
            </>
        ) : ('loading projects...')}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default ProjectsPage;