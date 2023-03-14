import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowTask = () => {
  const { taskId } = useParams();
  const url = `http://localhost:3001/tasks/${taskId}/subtasks`;
  const [task, setTask] = useState(null);

  const getTask = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setTask(data);
    console.log(data)
  };

  useEffect(() => {
    getTask();
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        {task.subtask && task.subtask.length > 0 ? (
          task.subtask.map((subtask) => (
            <p key={subtask.id}>{subtask.name}</p>
          ))
        ) : (
          <p>No subtasks found.</p>
        )}
        {console.log(task)}
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return task ? loaded() : loading();
};

export default ShowTask;
