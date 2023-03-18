import React, { useState} from 'react';
import { useParams } from "react-router-dom";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { deleteItem } from '../helper';


function Ellipses(props) {
    const url = "http://localhost:3001";

    const { itemId } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newTaskData, setNewTaskData] = useState('');

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
        setShowForm(true);
        setIsEditing(!isEditing);
        console.log(props.itemId)
      }; 
        
      const handleInputChange = (event) => {
        setNewTaskData(event.target.value);
        console.log(event.target.value);
      };

        const handleEditTask = async (itemId, newData) => {
            try {
                const token = await props.user.getIdToken();
                const response = await fetch(`${url}/tasks/${itemId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ newData }),
              });
              const data = await response.json();
              setIsEditing(false);
              setShowForm(false);
              console.log(itemId);
            } catch (error) {
              console.error(error);
            }
          };

          const handleSubmit = event => {
            event.preventDefault(); 
            handleEditTask(itemId, newTaskData);
          };
    
          return (
            <DropdownButton variant="outline-secondary" title="...">
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
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
                    
                    <input type="submit" value="Save" />
                  </form>
                 ) : (
                    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                )}
            </DropdownButton>
        );
    }
    
    export default Ellipses;