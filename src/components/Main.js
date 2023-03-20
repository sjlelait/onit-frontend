import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import ShowList from '../pages/ShowList';
import ShowTask from '../pages/ShowTask';
import ShowImportant from '../pages/ShowImportant';
import ShowCalendar from '../pages/ShowCalendar';
import BackButton from './BackButton';


function Main(props) {
  const [tasks, setTasks] = useState(null);
  const API_URL = 'https://onit-app.herokuapp.com/home';

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
    if (props.user) {
      getTask();
    } else {
      setTasks(null);
    }
  }, [props.user]);

  // This ends here
  return (
    <main className='background'>
      <Routes>
        <Route path='/' element={<Index user={props.user} tasks={tasks} />} />
        <Route
          path='/tasks/:category'
          element={
            <>
            <BackButton />
              <ShowList user={props.user} tasks={tasks} />
            </>
          }
        />
        <Route
          path='/tasks/:taskId/subtasks'
          element={
            <>
             <BackButton />
              <ShowTask user={props.user} />
            </>
          }
        />
        <Route
          path='/tasks/important'
          element={
            <>
              <BackButton />
              <ShowImportant user={props.user} />
            </>
          }
        />
      <Route
        path='/tasks/calendar'
        element={
         <>
          <BackButton />
          <ShowCalendar user={props.user} /> 
         </>
        }
        />
      </Routes>
    </main>
  );
}

export default Main;
