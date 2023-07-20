import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function ProjectsPage(props) {
    const [projects, setProjects] = useState({results:[]});
    const [hasLoaded, setHasLoaded] = useState(false)
    const {pathname} = useLocation();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Need to filter projects based on user
                const {data} = await axiosReq.get('/projects/' )
            } catch(err){
                
            }
        }
    })
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>List of projects here</p>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default ProjectsPage;