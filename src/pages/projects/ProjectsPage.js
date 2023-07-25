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
    const [members, setMembers] = useState({results:[]});
    const [usersMembers, setUsersMembers] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false)
    // 
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Need to filter members based on user
                const {data} = await axiosReq.get(`/members/`)
                setMembers(data)
                setUsersMembers(
                    members.results.filter(member => member.profile === currentUser.profile_id)
                )
                setHasLoaded(true)
            } catch(err){
                console.log(err)
            }
        }
        fetchMembers()
    })

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
            <>
                {usersMembers.length ? (
                    usersMembers.map(member => (
                        // member is the instance of Member filtered by profile, memb is arbitary instance of Member
                        <Project key={member.id} projectData={member} members={members.results.filter(memb => memb.project === member.project)} />
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