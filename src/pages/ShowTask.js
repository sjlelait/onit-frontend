import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowTask = (props) => {
  const { taskId } = useParams();
  const url = `http://localhost:3001/tasks/${taskId}/subtasks`;
  const [task, setTask] = useState(null);
  const [newSubtask, setNewSubtask] = useState({
    name: '',
  });

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
  
  

  const createSubtask = async (subtask) => {
    try {
      const token = await props.user.getIdToken();
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(subtask),
      });
      getTask();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleChange = (event) => {
    setNewSubtask((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createSubtask(newSubtask);
    setNewSubtask({
      name: '',
    });
  };

  useEffect(() => {
    getTask();
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>{task.title}</h1>
        <ul>{task.description}</ul>
        {task.subtask && task.subtask.length > 0 ? (
          task.subtask.map((subtask) => (
            <ul key={subtask.id}>
              {subtask.name} - {subtask.complete ? 'Complete' : 'Incomplete'}
            </ul>
          ))
        ) : (
          <p>No subtasks found.</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="New Subtask"
            value={newSubtask.name}
            onChange={handleChange}
          />
          <button type="submit">Add Subtask</button>
        </form>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return task ? loaded() : loading();
};

export default ShowTask;
