import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";
// import Project from "./Project";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Task from "./Task";
import ProjectForm from "./ProjectForm";

function ProjectsPage(props) {
    const currentUser = useCurrentUser();
    const [disabled, setDisabled] = useState(true)
    const [members, setMembers] = useState([]);
    const [usersMembers, setUsersMembers] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false)
    // 
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Need to filter members based on user
                const response = await axiosReq.get(`/members/`)
                setMembers(response.data)
                setUsersMembers(
                    members.filter(member => member.profile === currentUser.profile_id)
                )
                setHasLoaded(true)
            } catch(err){
                console.log(err)
                console.log(err.response)
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
          fetchMembers();
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
    },[members, currentUser, disabled])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
            <>
                {usersMembers.length ? (
                    usersMembers.map(member => (
                        <ProjectForm key={member.id} data={member}/>
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

                        /* member is the instance of Member filtered by profile, memb is arbitary instance of Member */
                        /* <Project key={member.id} projectData={member} members={members.filter(memb => memb.project === member.project)} /> */