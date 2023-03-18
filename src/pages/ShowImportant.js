import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Ellipses from "../components/Ellipses";

const ShowImportant = (props) => {
  const url = "http://localhost:3001/tasks/important";
  const [task, setTask] = useState([]);

  const getTask = async () => {
    try {
      const token = await props.user.getIdToken();
      const response = await fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      setTask(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.user) {
      getTask();
    }
  }, [props.user]);
  
  
  // function to handle delete 
const handleDelete = (itemId) => {
  setTask(task.filter((task) => task._id !== itemId));
};

    // handle edit
    const handleEdit = async (itemId, newData) => {
      try {
        const token = await props.user.getIdToken();
        const response = await fetch(`http://localhost:3001/tasks/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(newData)
        });
        const updatedTask = await response.json();
        setTask(task.map((task) => (task._id === itemId ? updatedTask : task)));
      } catch (error) {
        console.error(error);
      }
    };

const loaded = () => {
  return (
    <div>
      <h1>Important Tasks</h1>
        {task.map(task => (
          <div key={task._id}>
            <Link to={`/tasks/${task._id}/subtasks`}>{task.title}</Link>
            <Ellipses
              itemId={task._id}
              onDelete={() => handleDelete(task._id)}
              onEdit={(newData) => handleEdit(task._id, newData)}
            />
          </div>
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
