import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Index(props) {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  const api_url = "https://type.fit/api/quotes";

  async function getapi(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
 }
  const [data, setData] = useState(null);

  const quoteapi = () => {
    if (data) {
      const quote = data[0];
      return (
        <div>
          <div className='quote'>
            <p>{quote.text}</p>
            <p>- {quote.author}</p>
          </div>
          </div>
  );
      }
 };
 
 
  useEffect(() => {
    async function fetchData() {
      const result = await getapi(api_url);
      setData(result);
    }
    fetchData();
  }, []);
 

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
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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
      <div>{quoteapi()}</div>
      <div>{tasks ? loaded() : loading()}</div>
    </>
  );
}

export default Index;