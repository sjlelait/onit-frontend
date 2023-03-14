import { useState } from 'react';
import { Link } from 'react-router-dom';
function Index(props) {
  const loaded = () => {
    const categories = props.tasks.map((task) => task.category);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories.map((category) => (
      <div key={category} className='task'>
        {console.log(categories)}
        <Link to={`/tasks/${category}`}>
          <p>{category}</p>
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
