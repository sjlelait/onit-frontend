import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ShowList = (props) => {



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

  const handleClick = (task) => {
    setList((list) => {
      const listsCopy = [...list];
      const foundListIndex = listsCopy.findIndex((l) => l._id === task._id);
      const listCopy = listsCopy[foundListIndex];
      listsCopy.splice(foundListIndex, 1, {
        ...listCopy,
        important: !listCopy.important
      });
      return listsCopy;
    });
  };

  const handleClickComplete = (task) => {
    setList((list) => {
      const listsCopy = [...list];
      const foundListIndex = listsCopy.findIndex((l) => l._id === task._id);
      const listCopy = listsCopy[foundListIndex];
      listsCopy.splice(foundListIndex, 1, {
        ...listCopy,
        complete: !listCopy.complete
      });
      return listsCopy;
    });
  };


  //Loaded function for when data is fetched
  const loaded = () => {
    return (
        <div>
      <h1>{category} List</h1>
      <ul>
        {list.map((item, index) => (
            <section>


        important: {`${item.important}`}
        <button onClick={() => handleClick(item)}>
          {item.important ? "true" : "false"}
        </button>
        complete: {`${item.complete}`}
        <button onClick={() => handleClickComplete(item)}>
          {item.complete ? "true" : "false"}
        </button>

            <Link to={`/tasks/${item._id}/subtasks`}>
          <li key={item.id}>{item.title} {item.timeframe} {item.important ? 'important' : 'unimportant'} {item.complete ? "done" : "need to do" }{index} </li>
          </Link>
         
          </section>
        ))}
      </ul>
      
    </div>
    );
  };



  const loading = () => {
    return <h1>Loading...</h1>;
  };
 
  return (
    <section className="task-section">
        {list ? loaded() : loading()}
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
       
        
        <input type="submit" value="Create Task" />
      </form>
    
    </section>
  );


}

  export default ShowList;

