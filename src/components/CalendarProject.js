import React, { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { Card, Col, Container, Row} from 'react-bootstrap';
import styles from '../styles/CalendarProject.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CalendarTaskGroup from './CalendarTaskGroup';

const CalendarProject = ({projectData, userId, taskFilter, year}) => {

  // Initialize variables
  const [tasks, setTasks] = useState([]);
  const [taskGroups, setTaskGroups] = useState([]);
  // Get the tasks associated with the project    
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosReq.get(`/tasks/?assigned_to__project=${projectData.project}`);
        const data = taskFilter == 'all-tasks' ? (response.data):(response.data.filter(task => task.assigned_to_profile_id === parseInt(userId)));
        // All Tasks
        setTasks(data);
        // Initialize taskRows with first task in data
        let taskRows = [[data[0]]];
        // Try to place each task in a row
        for (let task of data){
          if (task != data[0]){
            let notPlaced = true;
            // Loop through all rows to find suitable position based on start and due dates
            for (let taskRow of taskRows){
              let n = taskRow.length;
              // If task fits, add it to row
              if (new Date(task.start_date) >= new Date(taskRow[n-1].due_date)){
                taskRow.push(task);
                notPlaced = false;
                break;
              } 
            }
            // If no suitable row found, create a new one
            if (notPlaced){
              taskRows.push([task]);
            }
          }
        }
        // Update state
        setTaskGroups(taskRows);

      } catch(err){
        // console.log(err.response);
      };
    };
    fetchTasks();
  }, [projectData.project, taskFilter]);

  // Calculate length of project in relation to year
  const getProjectLength = (startDate, dueDate) => {
    let length;
    let rangeStart = new Date(`01/01/${year}`).getTime();
    let rangeEnd = new Date(`12/31/${year}`).getTime();
    // Sandwhiched in range
    if (rangeStart <= startDate && dueDate <= rangeEnd){
      length = dueDate - startDate;
    }
    // 0 length case
    else if (rangeEnd < startDate || dueDate < rangeStart)  {
      length = 0;
    // Full range case
    } else if (startDate <= rangeStart && rangeEnd <= dueDate) {
      length = rangeEnd - rangeStart;
    // Starts before range
    } else if (startDate <= rangeStart && dueDate <= rangeEnd){
      length = dueDate - rangeStart;
    // Ends after range
    } else if (startDate >= rangeStart && dueDate >= rangeEnd){
      length = rangeEnd - startDate;
    }
    return length;   
  };

  // Calculate time between project start date and range start
  const getProjectOffset = (startDate) => {
    let rangeStart = new Date(`01/01/${year}`);
    return (
      100*Math.max(
        startDate.getTime()-rangeStart.getTime(),0
      ) / (1000 * 3600 * 24* 365)
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
                <div className={`${styles.greyBackground} ${taskGroups.length == 1 ? (styles.verticalCenter):('')}`}
                  style={{
                    width:`${100*getProjectLength(
                      new Date(projectData.start_date.slice(0,10)).getTime(),
                      new Date(projectData.due_date.slice(0,10)).getTime()
                    ) / (1000 * 3600 * 24 *365)}%`,
                    margin:`0 0 0 ${getProjectOffset(new Date(projectData.start_date.slice(0,10)))}%`,
                  }}
                >
                  {tasks.length? (taskGroups.map(
                    taskGroup =>
                      <CalendarTaskGroup
                        key={taskGroup[0].id}
                        taskGroup={taskGroup} 
                        projectData={projectData} 
                        projLength={
                          getProjectLength(
                            new Date(projectData.start_date.slice(0,10)).getTime(),
                            new Date(projectData.due_date.slice(0,10)).getTime())
                        }
                        year={year}
                        noTasksYet={false}/>
                  )):(
                    <CalendarTaskGroup
                      taskGroup={[]} 
                      projectData={projectData} 
                      projLength={
                        getProjectLength(
                          new Date(projectData.start_date.slice(0,10)).getTime(),
                          new Date(projectData.due_date.slice(0,10)).getTime())
                      }
                      year={year}
                      noTasksYet={true}/>)}
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