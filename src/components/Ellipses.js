import { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { deleteItem, editItem, deleteSubtask } from '../helper';

const Ellipses = (props) => {
    
    const { itemId, page, subtaskId } = props;

    
    const [newTaskData, setNewTaskData] = useState({
        title: '',
        timeframe: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    // delete task
    const handleDelete = async () => {
        const success = await deleteItem(props.itemId, props.user);
        if (success) {
          props.onDelete(props.itemId);
        } else {
          console.error('Failed to delete item');
        }
      };

      
      // delete subtask
      const handleDeleteSubtask = async () => {
        const success = await deleteSubtask(props.itemId, props.subtaskId, props.user);
        console.log(props.itemId);
        console.log(props.subtaskId);
        if (success) {
          props.onDelete(props.subtaskId)
        } else {
          console.error('Failed to delete subtask');
        }
      };
      
    // edit task
    const handleEdit = (itemId) => {
        setIsEditing(!isEditing);
        console.log(itemId);
      };
        
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTaskData(prevData => ({ ...prevData, [name]: value }));
        console.log(newTaskData);
    };

    const handleEditTask = async (itemId, newData) => {
        try {
            if (!props.user) {
                throw new Error('User is not defined');
            }
            const token = await props.user.getIdToken();
            const response = await fetch(`https://onit-app.herokuapp.com/tasks/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  },
                body: JSON.stringify(newData)
            });
            const updatedTaskItem = await response.json();
            props.onEdit(itemId, updatedTaskItem);
        } catch (error) {
            console.error(error);
            return false;
        }
        setIsEditing(!isEditing);
        console.log(itemId);
    };

    const handleSubmit = async event => {
        event.preventDefault(); 
        await handleEditTask(itemId, newTaskData);
        setIsEditing(false);
      };
    
      return (
        <DropdownButton variant="outline-secondary" title="...">
        {page === 'tasks' && (
        <>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
        </>
        )}
        {page === 'subtasks' && (
        <>
            <Dropdown.Item onClick={handleDeleteSubtask}>Delete</Dropdown.Item>
         </>
        )}
        {isEditing && (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTaskData.title}
                    name="title"
                    placeholder="change title"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    value={newTaskData.timeframe}
                    name="timeframe"
                    placeholder="00:00"
                    onChange={handleInputChange}
                />
            <button type="submit">Save</button>
        </form>
        )}
    </DropdownButton>
    );          
}
    
    export default Ellipses;