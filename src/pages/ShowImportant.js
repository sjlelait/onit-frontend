import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ShowImportant = (props) => {
  const url = "https://onit-app.herokuapp.com/tasks/important";
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
    console.log('User object in ShowImportant:', props.user);
    if (props.user) {
      getTask();
    }
  }, [props.user]);
  


    // not working quite yet
const handleEdit = async (itemId, newData) => {
  try {
    const updatedTask = await Promise.all(
      task.map(async (task) => {
        if (task._id === itemId) {
          return { ...task, ...newData };
        } else {
          return task;
        }
      })
    );
    setTask(updatedTask);
  } catch (error) {
    console.error(error);
  }
};

const loaded = () => {
  return (
    <div className="container">
      <h1>Important Tasks</h1>
        {task.map(task => (

          <ul className="important" key={task._id}>
            <p className="star">★ </p>
            <Link className="link" to={`/tasks/${task._id}/subtasks`}>{task.title}</Link>
          </ul>
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