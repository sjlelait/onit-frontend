import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';


function Main(props) {
  // FB - Important! Example of using JWT to confirm a user is authorized
  //FB - This is a hypothetical request that has the neceesary token authorization components that are demonstrated at the end of the part 2 video.

  const [tasks, setTasks] = useState(null);
  const API_URL = 'http://localhost:3001/home';

  const getTask = async () => {
    let token;

    if (props.user) {
      token = await props.user.getIdToken();
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await response.json();
      setTasks(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getTask();
  }, [props.user]);

  // This ends here
  return <h1>Test</h1>;
}

export default Main;
