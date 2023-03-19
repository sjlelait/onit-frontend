import { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { deleteItem, editItem } from '../helper';

const Ellipses = (props) => {
    
    const { itemId } = props;

    
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        title: '',
        timeframe: ''
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    // delete task
    const handleDelete = async () => {
        const success = await deleteItem(props.itemId, props.user);
        if (success) {
          props.onDelete(props.itemId);
        } else {
          console.error('Failed to delete item');
        }
      };

    // edit task
    const handleEdit = (itemId) => {
        setIsEditing(true);
        setIsFormSubmitted(false);
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
        setIsEditing(false);
        console.log(itemId);
    };

    const handleSubmit = async event => {
        event.preventDefault(); 
        await handleEditTask(itemId, newTaskData);
      };
    
      return (
        <DropdownButton variant="outline-secondary" title="...">
        {isEditing && !isFormSubmitted ? (
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
        ) : null}
        {isFormSubmitted ? null : (
            <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
        )}
        
        {isEditing ? (
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
        ) : null}
    </DropdownButton>
    );
    }
    
    export default Ellipses;