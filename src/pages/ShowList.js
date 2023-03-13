import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ShowList = (props) => {



  const { category } = useParams();

  const url = ` http://localhost:3001/tasks/${category}`;


  // State to hold the list data
  const [list, setList] = useState(null);

  // fetch category data
  const getList = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    setList(data);
   
  }

  useEffect(() => {
    getList();
  }, []);



  //Loaded function for when data is fetched
  const loaded = () => {
    return (
        <div>
      <h1>{category} List</h1>
      <ul>
        {list.map((item) => (
            <Link to={`/tasks/${category}/${item.title}`}>
          <li key={item.id}>{item.title}</li>
          </Link>
        ))}
      </ul>
    </div>
    );
  };



  const loading = () => {
    return <h1>Loading...</h1>;
  };
 
  return list ? loaded() : loading();


}

  export default ShowList;

