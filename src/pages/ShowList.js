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
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    setList(data);
  }

  const createTask = async (item) => {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(item),
      });
      getList();
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  }

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


  //Loaded function for when data is fetched
  const loaded = () => {
    return (
        <div>
      <h1>{category} List</h1>
      <ul>
        {list.map((item) => (
            <Link to={`/tasks/${item._id}/subtasks`}>
          <li key={item.id}>{item.title} {item.timeframe} {item.important ? 'important' : 'unimportant'} {item.complete ? "done" : "need to do" }</li>
          </Link>
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
        <input
        type="checkbox"
        checked={newForm.important}
        name="important"
        onChange={() => {
            setNewForm(prevState => ({ ...prevState, important: !prevState.important }));
        }}
        />
        <label htmlFor="important">Important?</label>
        <input type="submit" value="Create Task" />
      </form>
    
    </section>
  );


}

  export default ShowList;

