import { useParams } from 'react-router-dom';


function ShowList(props) {

    const { id } = useParams();
    const tasks = props.tasks;
    const task = tasks ? tasks.find((t) => t._id === id) : null;
  
const loaded = () => {
    return (
      <>
        <h1>{task.category}</h1>
        <h2>{task.title}</h2>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="task">
      { task ? loaded() : loading() }
    </div>
  );
}
  
  export default ShowList;