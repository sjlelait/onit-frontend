import React from 'react';

const { category } = useParams();

const ProgressBar = ({ list }) => {
  const completeTasks = list.filter((task) => task.complete);
  const percentage = Math.round((completeTasks.length / list.length) * 100);

  return (
    <div>
      <h1>{ category } List</h1>
      <div className="progress-bar" role="progressbar" style={{ 
        height: "100%", 
        backgroundColor: "#ddd", 
        position: "relative"
        }}>
        <div className="progress-bar-fill" style={{ 
          height: "100%", 
          backgroundColor: "#007bff", 
          position: "absolute", 
          width: `${percentage}%`}}>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;