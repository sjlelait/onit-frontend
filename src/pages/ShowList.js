import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../index.css';
import Ellipses from "../components/Ellipses";

const ShowList = (props) => {

  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [message, setMessage] = useState('loading...');

  function AnimatedExample() {
    return <div class="progressBar">
    <ProgressBar animated now={completedPercentage} />
    </div>;
  };

  // if (completedPercentage < 100) {
  //   setMessage(`You are ${completedPercentage}% done with this list. Keep going!`);
  // } else if (completedPercentage === 100) {
  //   setMessage("Congratulations, you're all done!");
  // };

  const { category } = useParams();

  const url = ` http://localhost:3001/tasks/${category}`;


  // State to hold the list data
  const [list, setList] = useState(null);
  const [newForm, setNewForm] = useState({
    title: '',
    category: `${category}`,
    timeframe: '00:00', //must change model to accept string
  });
  
  

  // fetch category data
  const getList = async () => {
    try {
      const token = await props.user.getIdToken();
      const response = await fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      console.log(data);
      setList(data);
      //for the progress bar 
      const completedTasks = data.filter(task => task.complete);
      const percentage = Math.round((completedTasks.length / data.length) * 100);
      setCompletedPercentage(percentage);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const createTask = async (item) => {
    try {
      const token = await props.user.getIdToken();
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(item),
      });
      getList();
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getList();
  }, []);


  const handleChange = (event) => {
    setNewForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(newForm);
    setNewForm({
      title: '',
      category: `${category}`,
      timeframe: '',
    });
  };

  const handleClick = async (task) => {
  const updatedTask = { ...task, important: !task.important };
    console.log(updatedTask)
  try {
    const token = await props.user.getIdToken();
    await fetch(`http://localhost:3001/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(updatedTask),
    });
    setList((list) => {
      const listsCopy = [...list];
      const foundListIndex = listsCopy.findIndex((l) => l._id === task._id);
      const listCopy = listsCopy[foundListIndex];
      listsCopy.splice(foundListIndex, 1, updatedTask);
      return listsCopy;
    });
  } catch (error) {
    console.log(error);
  }
};


const handleClickComplete = async (task) => {
  console.log(task)
  const updatedTask = { ...task, complete: !task.complete };

  try {
    const token = await props.user.getIdToken();
    await fetch(`http://localhost:3001/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(updatedTask),
    });
    setList((list) => {
      const listsCopy = [...list];
      console.log(listsCopy)
      const foundListIndex = listsCopy.findIndex((l) => l._id === task._id);
      const listCopy = listsCopy[foundListIndex];
      listsCopy.splice(foundListIndex, 1, updatedTask);
      return listsCopy;
    });
  } catch (error) {
    console.log(error);
  }
};

// function to handle delete 
const handleDelete = (itemId) => {
  setList(list.filter((list) => list._id !== itemId));
};

  //Loaded function for when data is fetched
  const loaded = () => {
    return (
        <div>
          <h1>{category}</h1>
          <Table >
            <thead>
              <tr>
               <th></th>
               <th></th>
               <th>Completed</th>
               <th>Important</th>
               <th>Time</th>
              </tr>
            </thead>
                {list.map((item, index) => (
            <tbody>
              <tr>
               <td>{index + 1}</td>
               <td className="flex-container">
                 <Link to={`/tasks/${item._id}/subtasks`}>
                 <span className="item-title">{item.title}</span>
                 </Link>
                </td>
                <td><input type="checkbox" onClick={() => handleClickComplete(item)}/></td>
               <td><button onClick={() => handleClick(item)}>
                 {item.important ? "★" : "☆"}
                   </button>
               </td>               
                <td>
                 <span className="item-timeframe">{item.timeframe}</span>
                 </td>
                 <td>
                  <Ellipses itemId={item._id} onDelete={handleDelete} user={props.user} />
                </td>
              </tr>
            </tbody>
            ))}
          </Table>
    </div>
    );
  };

  const loading = () => {
    return <h1 className="h1">Loading...</h1>;
  };
 
  return (
    
    <section className="task-section">
        {list ? loaded() : loading()}
        <AnimatedExample />
        <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="name"
          onChange={handleChange}
        />
         <input
          type="text"
          value={newForm.timeframe}
          name="timeframe"
          placeholder="00:00"
          onChange={handleChange}
        />


       <button type="submit">Create Task</button>
      </form>
    
    </section>
  );


}

  export default ShowList;
