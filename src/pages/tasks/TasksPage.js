import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'

const TasksPage = () => {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axiosReq.get(`/tasks/?assigned_to_profile_id=${id}`)
            setTasks(response.data)
        } catch(err){
            console.log(err)
        }
    }
    fetchTasks()
  }, [id])

  return (
    <Card>
        <Card.Header>Your Tasks</Card.Header>
        <Card.Body>
            {tasks.length?(
                tasks.map(task => <p key={task.id}>{task.description}</p>)
            ):('No results')}
        </Card.Body>
    </Card>
  )
}

export default TasksPage