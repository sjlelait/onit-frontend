import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { deleteItem, editItem } from '../helper';

function Ellipses(props) {

        const handleDelete = async () => {
            const success = await deleteItem(props.itemId);
            if (success) {
                props.onDelete(props.itemId);
            } else {
                console.error('Failed to delete item');
            }
        }
        
    
        const handleEdit = async () => {
            const success = await editItem(props.itemId, props.newData);
            if (success) {
                
                props.onEdit(props.itemId, props.newData);
            } else {
                console.error('Failed to edit item');
            }
        }
    
        return (
            <DropdownButton variant="outline-secondary" title="...">
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
            </DropdownButton>
        );
    }
    
    export default Ellipses;