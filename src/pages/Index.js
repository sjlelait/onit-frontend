import { useState } from 'react';
import { Link } from 'react-router-dom';
function Index(props) {
  const loaded = () => {
    return props.tasks.map((task) => (
      <div key={task._id} className='task'>
        <Link to={`/tasks/${task._id}`}>
          <p>{task.title}</p>
        </Link>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return props.tasks ? loaded() : loading();
}

export default Index;
