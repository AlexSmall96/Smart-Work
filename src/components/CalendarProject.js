import React, { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { Card, Col, Row, Container } from 'react-bootstrap';
import styles from '../styles/CalendarProject.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CalendarTask from './CalendarTask';

const CalendarProject = ({projectData, userId, taskFilter, year, month, monthNum, yearView}) => {

  // Initialize variables
  const [tasks, setTasks] = useState([]);
  const [usersTasks, setUsersTasks] = useState([]);
  const daysInMonth = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];

  // Get the tasks associated with the project    
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`);
        // All Tasks
        setTasks(response.data);
        // Users tasks based on filter
        setUsersTasks(
          response.data.filter(
            task => task.assigned_to_profile_id === parseInt(userId)
          )
        );
      } catch(err){
        // console.log(err.response);
      };
    };
    fetchTasks();
  }, [projectData.project]);

  // Calculate length of project in relation to year or month
  const getProjectLength = (startDate, dueDate) => {
    let length;
    let rangeStart = yearView ? (
      new Date(`01/01/${year}`).getTime()
    ):(
      new Date(`${monthNum + 1}/01/${year}`).getTime()
    );
    let rangeEnd = yearView ? (
      new Date(`12/31/${year}`).getTime()
    ):(
      new Date(`${monthNum + 1}/${daysInMonth[monthNum]}/${year}`).getTime() 
    );
    // Sandwhiched in range
    if (rangeStart <= startDate && dueDate <= rangeEnd){
      length = dueDate - startDate + (yearView ? (0):(1000 * 3600 * 24));
    }
    // 0 length case
    else if (rangeEnd < startDate || dueDate < rangeStart)  {
      length = 0;
    // Full range case
    } else if (startDate <= rangeStart && rangeEnd <= dueDate) {
      length = rangeEnd - rangeStart + (yearView ? (0):(1000 * 3600 * 24));
    // Starts before range
    } else if (startDate <= rangeStart && dueDate <= rangeEnd){
      length = dueDate - rangeStart + (yearView ? (0):(1000 * 3600 * 24));
    // Ends after range
    } else if (startDate >= rangeStart && dueDate >= rangeEnd){
      length = rangeEnd - startDate + (yearView ? (0):(1000 * 3600 * 24));
    }
    return length;   
  };

  // Calculate time between project start date and range start
  const getProjectOffset = (startDate) => {
    let rangeStart = yearView ? (
      new Date(`01/01/${year}`)
    ):(
      new Date(`${monthNum + 1}/01/${year}`)
    );
    return (
      100*Math.max(
        startDate.getTime()-rangeStart.getTime(),0
      ) / (1000 * 3600 * 24* (
        yearView ? (365):(daysInMonth[monthNum])
      ))
    );
  };

  return (
    <Card className={styles.outerProjectCard}>
      <Card.Header className={styles.projectCard}>
        <Container className={styles.noPadding}>
          <Row className={styles.noMarginMobile}>
            <Col className={styles.projectTitle} xs={12} sm={2}>
              {projectData.title}
            </Col>
            <Col xs={{span:12, offset:0}} sm={{span:10, offset:0}} className={styles.topMargin}>
              {/* Project span based on its start and due dates */}
              <Link to={`/projects/project/${projectData.project}`}>
                <div className={styles.greyBackground}
                  style={{
                    width:`${100*getProjectLength(
                      new Date(projectData.start_date.slice(0,10)).getTime(),
                      new Date(projectData.due_date.slice(0,10)).getTime()
                    ) / (1000 * 3600 * 24 * (yearView ? (365):(daysInMonth[monthNum])))}%`,
                    margin:`0 0 0 ${getProjectOffset(new Date(projectData.start_date.slice(0,10)))}%`
                  }}
                >
                  {/* List all tasks */}
                  {taskFilter === 'all-tasks' ? (
                    tasks.length?(
                      tasks.map(task =>
                        <CalendarTask
                          key={task.id}
                          task={task} 
                          projectData={projectData} 
                          projLength={
                            getProjectLength(
                              new Date(projectData.start_date.slice(0,10)).getTime(),
                              new Date(projectData.due_date.slice(0,10)).getTime())
                          }
                          yearView={yearView}
                          year={year}
                          month={month}
                          monthNum={monthNum}
                          emptyProject={false}/>
                      )
                    ):(
                      // Case when there is no tasks yet assigned to project
                      <CalendarTask 
                        projectData={projectData} 
                        projLength={
                          getProjectLength(
                            new Date(projectData.start_date.slice(0,10)).getTime(),
                            new Date(projectData.due_date.slice(0,10)).getTime())
                        }
                        yearView={yearView}
                        year={year}
                        month={month}
                        monthNum={monthNum}
                        emptyProject={true}/>
                    )
                  ):(// List only users tasks when filter is selected
                    usersTasks.length?(
                      usersTasks.map(task =>
                        <CalendarTask 
                          key={task.id}
                          task={task} 
                          projectData={projectData} 
                          projLength={
                            getProjectLength(
                              new Date(projectData.start_date.slice(0,10)).getTime(),
                              new Date(projectData.due_date.slice(0,10)).getTime())
                          }
                          yearView={yearView}
                          year={year}
                          month={month}
                          monthNum={monthNum}
                          emptyProject={false}
                        />
                      )
                    ):( 
                      // Case when there is no tasks yet assigned to project                                       
                      <CalendarTask 
                        projectData={projectData} 
                        projLength={
                          getProjectLength(
                            new Date(projectData.start_date.slice(0,10)).getTime(),
                            new Date(projectData.due_date.slice(0,10)).getTime())
                        }
                        yearView={yearView}
                        year={year}
                        month={month}
                        monthNum={monthNum}
                        emptyProject={true}
                      />
                    )
                  )
                  }
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </Card.Header>
    </Card> 
  );
};

export default CalendarProject;