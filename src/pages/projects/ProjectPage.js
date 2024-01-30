import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useRedirect } from '../../hooks/UseRedirect.js';
import { axiosReq } from '../../api/axiosDefaults.js';
import { Button, Card, Container } from 'react-bootstrap';
import { format } from 'date-fns';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Project.module.css'
import Avatar from '../../components/Avatar.js';

const ProjectPage = () => {
  useRedirect("loggedOut");
  const { id } = useParams();
  const [projectData, setProjectData] = useState({});
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const currentUser = useCurrentUser();
  const is_owner = true
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
        try {
            const response = await axiosReq.get(`/members/?project=${id}`);
            setProjectData({
                title: response.data[0].title,
                description: response.data[0].description,
                complexity: response.data[0].complexity,
                owner: response.data[0].project_owner_name,
                projectId: response.data[0].project
            });
            setMembers(response.data)
            setStartDate(format(new Date(response.data[0].start_date), 'yyyy-MM-dd'));
            setDueDate(format(new Date(response.data[0].due_date), 'yyyy-MM-dd'));
        } catch(err){
            // console.log(err);
        }
    };
    fetchProject();
  }, [id]);
  return (
    <Card>
        <Card.Header>
            <h3>{projectData.title}</h3>
            <p>{projectData.description}</p>
        </Card.Header>
        <Card.Body>
            <p>{`Project Owner: ${projectData.owner}`}</p>
            <p>{`Start Date: ${startDate}`}</p>
            <p>{`Due Date: ${dueDate}`}</p>
            <p>{`Complexity: ${projectData.complexity}`}</p>
        </Card.Body>
        <Card.Footer>
        <p className={styles.left}>
        Members
                    {is_owner?(<>
                    <Link to={`/members/add/${projectData.projectId}`}>
                        <Button size="sm" variant="outline-primary" className={styles.projectButtons}><i className="far fa-plus-square"></i></Button>
                    </Link>
                    <Link to={`/members/delete/${projectData.projectId}`}>
                        <Button size="sm" variant="outline-primary" className={styles.projectButtons}><i className="far fa-trash-can"></i></Button>
                    </Link></>):('')}
        </p>
        </Card.Footer>
        <Card.Footer>
       <Container className={styles.overflow}>
        {
            members.map(
                member =>
                    <div key={member.id}>
                        <Link to={`/profiles/${member.profile}`}>
                            <Avatar src={member.member_image} height={30}/><p className={styles.memberName}>{member.member_username}</p>
                        </Link>
                    </div>
                )
        }
        </Container>
        </Card.Footer>
    </Card>
  )
}

export default ProjectPage