import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowTask = (props) => {
  const { taskId } = useParams();
  const url = `http://localhost:3001/tasks/${taskId}/subtasks`;
  const [task, setTask] = useState(null);
  const [newSubtask, setNewSubtask] = useState({
    name: '',
  });
  const [isCrossed, setCrossed] = useState({
    key: '',
    value: '',
  })

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
      setTask((prevState) => ({
        ...prevState,
        subtask: [...prevState.subtask, subtask]
      }));
      setNewSubtask({
        name: '',
      });
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

const handleClickComplete = (subtask) => {
  const subtasksCopy = [...task.subtask];
  const foundSubtaskIndex = subtasksCopy.findIndex((t) => t._id === subtask._id);
  subtasksCopy[foundSubtaskIndex] = {
    ...subtasksCopy[foundSubtaskIndex],
    complete: !subtasksCopy[foundSubtaskIndex].complete
  };
  setTask((prevState) => ({
    ...prevState,
    subtask: subtasksCopy
  }));
};

  const loaded = () => {

    return (
      <div>
        
        <h1>{task.title}</h1>
        <h3>Subtasks</h3>
        <p>{task.description}</p>
        {task.subtask && task.subtask.length > 0 ? 
        (
          task.subtask.map((subtask, index) => (
            <div>
            <div>
            <div key={subtask.id} className={`${subtask.complete ? 'crossed-line' : ''}`}>
              <input type="checkbox" onClick={() => handleClickComplete(subtask)} className="subtask-checkbox"/> 
              {subtask.name} - {subtask.complete ? 'Complete' : 'Incomplete'}
              
            </div>
            </div>
            </div>

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
