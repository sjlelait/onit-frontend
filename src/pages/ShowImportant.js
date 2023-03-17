import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ShowImportant = (props) => {
  const url = "http://localhost:3001/tasks/important";
  const [task, setTask] = useState([]);

  const getTask = async () => {
    const token = await props.user.getIdToken();
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    const data = await response.json();
    setTask(data);
  };

  useEffect(() => {
    if (props.user) {
      getTask();
    }
  }, [props.user]);

  const loaded = () => {
    return (
      <div>
        <h1>Important Tasks</h1>
        {task.map(task => (
          <p key={task._id}>
            <Link to={`/tasks/${task._id}/subtasks`}>{task.title}</Link>
          </p>
        ))}
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return task ? loaded() : loading();
};

export default ShowImportant;
