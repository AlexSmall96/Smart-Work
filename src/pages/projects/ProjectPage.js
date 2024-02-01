import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useRedirect } from '../../hooks/UseRedirect.js';
import { axiosReq } from '../../api/axiosDefaults.js';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Project.module.css'
import appStyles from  '../../App.module.css';
import Avatar from '../../components/Avatar.js';
import TaskCreateForm from '../tasks/TaskCreateForm'
import Task from '../tasks/Task.js';
import memberStyles from '../../styles/Member.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// ProjectPage component to display a single project detail view
const ProjectPage = () => {
  //Redirect logged out users  
  useRedirect("loggedOut");
  //Initialize state variables
  const { id } = useParams();
  const [projectData, setProjectData] = useState({});
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const currentUser = useCurrentUser();
  const history = useHistory();
  // Fetch project and task data
  useEffect(() => {
    const fetchProject = async () => {
        try {
            const response = await axiosReq.get(`/members/?project=${id}`);
            setProjectData({
                title: response.data[0].title,
                description: response.data[0].description,
                complexity: response.data[0].complexity,
                owner: response.data[0].project_owner_username,
                projectId: response.data[0].project,
                ownerImage:response.data[0].project_owner_image,
                ownerId:response.data[0].project_owner_profile_id
            });
            setMembers(response.data)
            setStartDate(format(new Date(response.data[0].start_date), 'yyyy-MM-dd'));
            setDueDate(format(new Date(response.data[0].due_date), 'yyyy-MM-dd'));
        } catch(err){
            // console.log(err);
        }
    };
    const fetchTasks = async () => {
        try {
            const response = await axiosReq.get(`/tasks/?assigned_to__project=${id}`);
            setTasks(response.data);
        } catch(err){
            // console.log(err.response);
        }
    };
    fetchProject();
    fetchTasks();
  }, [id]);

  const is_owner = currentUser?.username === projectData.owner;

  return (
    <>
    <Card>
        <Card.Header>
            <Container>
                <Row>
                    <Col xs={6} sm={4} lg={4}><h3 className={styles.left}>{projectData.title}</h3></Col>
                    <Col xs={3}sm={6} lg={7}><p className={styles.right}>{`Project Owner:`}</p>
                    </Col>
                    <Col xs={3} sm={2} lg={1}>
                    <div>
                        <Link to={`/profiles/${projectData.ownerId}`}>
                            <Avatar src={projectData.ownerImage} height={30}/><p className={memberStyles.memberName}>{projectData.owner}</p>
                        </Link>
                    </div>
                    </Col>
     
                </Row>
                <Row>
                {is_owner?(<>
                    <Link to={`/projects/delete/${projectData.projectId}`}>     
                        <Button variant="outline-primary" className={`${styles.projectButtons} ${styles.wideMargin}`} size="sm"><i className="fa-solid fa-trash-can"></i></Button>
                    </Link>
                    <Link to={`/projects/edit/${projectData.projectId}`}>     
                        <Button variant="outline-primary" className={`${styles.projectButtons}`} size="sm"><i className="fa-solid fa-pen-to-square"></i></Button>
                    </Link>
                </>):('')}
                </Row>
            </Container>
        </Card.Header>
        <Card.Body>
        <Container>
            <Row>
                <Col className={styles.italics}>
                    {projectData.description}
                </Col>
            </Row>
                <Row>
                    <Col md={6}><span className={styles.bold}>Start Date:</span> {format(new Date(startDate.slice(0,10)), "dd-MM-yyyy")}</Col>
                    <Col md={6}><span className={styles.bold}>Due Date:</span> {format(new Date(dueDate.slice(0,10)), "dd-MM-yyyy")}</Col>
                </Row>  
                <Row>
                    <Col md={6}><span className={styles.bold}>Complexity:</span> {projectData.complexity}</Col>
                    <Col md={6}><span className={styles.bold}>Outstanding Tasks:</span>{` ${tasks.filter(task => task.status !== 'Complete').length} `}</Col>
                </Row>
            </Container>
        </Card.Body>
        <Card.Footer className={styles.narrowFooter}>
        <p className={styles.left}>
        Members
                    {is_owner?(<>
                    <Link to={`/members/add/${projectData.projectId}`}>
                        <Button size="sm" className={styles.projectButtons}><i className="far fa-plus-square"></i></Button>
                    </Link>
                    <Link to={`/members/delete/${projectData.projectId}`}>
                        <Button size="sm" className={styles.projectButtons}><i className="far fa-trash-can"></i></Button>
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
    <Card className={appStyles.verticalMargin}>
    <TaskCreateForm members={members} projectData={members[0]} tasks={tasks} setTasks={setTasks}/>
    {tasks.length?(
                <Card.Header className={styles.hideSmall}>
                <Row>
                    <Col md={3}>Assigned To</Col>
                    <Col md={3}>Description</Col>
                    <Col md={2}>Due Date</Col>
                    <Col md={2}>Status</Col>
                    <Col md={2}></Col>
                </Row>
                </Card.Header>
                ):(<Card.Header>
                    No Tasks yet
                </Card.Header>)}
    {tasks.map(task => <Task key={task.id} task={task} projectData={projectData} setTasks={setTasks} />)}
    </Card>
    <Button variant="secondary" className={appStyles.verticalMargin} onClick={() => history.push(`/projects/${currentUser?.profile_id}`)}>
        Back to My Projects
    </Button>
    </>
  )
}

export default ProjectPage