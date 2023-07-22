import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import Project from "./Project";

function ProjectPage() {
  const {id} = useParams();
  const [project, setProject] = useState({results:[]});
  
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data:project}] = await Promise.all([
          axiosReq.get(`/projects/1`)
        ])
        setProject({results: [project]})
        console.log(project)
      } catch(err){
        console.log(err)
      }
    }

    handleMount()
  }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Project {...project.results[0]} setProjects={setProject}/>
      </Col>
    </Row>
  );
}

export default ProjectPage;