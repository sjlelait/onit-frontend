
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import ShowList from '../pages/ShowList';
import ShowTask from '../pages/ShowTask';

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
  return (
    <main>
      <Routes>
        <Route path='/' element={<Index user={props.user} tasks={tasks} />} />
        <Route path='/tasks/:category' element={<ShowList tasks={tasks} />} />
        <Route path='/tasks/:taskId/subtasks' element={<ShowTask />} />
      </Routes>
    </main>
  );
}

export default Main;
