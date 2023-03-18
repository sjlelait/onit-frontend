import { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { deleteItem } from '../helper';

const Ellipses = (props) => {
    
    const { itemId } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [newTaskData, setNewTaskData] = useState({
        title: '',
        timeframe: ''
    });

    useEffect(() => {
        setShowForm(true);
    }, []);

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
        setShowForm(false);
        console.log(itemId);
      };
        
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTaskData(prevData => ({ ...prevData, [name]: value }));
        console.log(newTaskData);
    };

    const handleEditTask = async (itemId, newData) => {
        // error for props.user
        try {
            if (!props.user) {
                throw new Error('User is not defined');
            }
            const token = await props.user.getIdToken();
            const response = await fetch(`https://onit-app.herokuapp.com/${itemId}`, {
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
        setShowForm(false);
        console.log(itemId);
    };

    const handleSubmit = async event => {
        event.preventDefault(); 
        await handleEditTask(itemId, newTaskData);
      };
    
    return (
        <DropdownButton variant="outline-secondary" title="...">
        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
        
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
        ) : (
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
        )}
    </DropdownButton>
    );
}
    
export default Ellipses;