import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Index(props) {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'category') {
      setCategory(event.target.value);
    } else {
      setTitle(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form with category:', category, 'and title:', title);
    try {
      const token = await props.user.getIdToken();
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ category: category, title: title || 'Untitled' }),
      });
      const data = await response.json();
      console.log('Response from server:', data);
      setCategory('');
      setTitle('');
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const API_URL = 'http://localhost:3001/home';

  const getTasks = async () => {
    try {
      const token=await props.user.getIdToken();
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });
      const data = await response.json();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    if (props.user) {
      getTasks();
    }
  }, [props.user]);
  

  const loaded = () => {
    const categories = tasks.map((task) => task.category);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories.map((category) => (
      <div key={category} className='task'>
        <Link to={`/tasks/${category}`}>
          <p>{category}</p>
        </Link>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <>
    {
      !props.user ?
      <h1>Please Login</h1>
      :
      <section>
    
   
   
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='category'>Category &nbsp;</label>
          <input
            type='text'
            name='category'
            value={category}
            onChange={handleChange}
          />
          {/* <label htmlFor='title'>Title:</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
          /> */}
          <input type='submit' value='Create Category' />
        </form>
      </div>
      <div>{tasks ? loaded() : loading()}</div>
      </section>
}
    </>
            
  );
}

export default Index;
