const url = 'http://localhost:3001';

export const deleteItem = async (itemId) => {
    try {
        const response = await fetch(`${url}/tasks/${itemId}`, {
          method: 'DELETE',
        });
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export const editItem = async (itemId, newData) => {
    try {
        const response = await fetch(`${url}/tasks/${itemId}`, {
          method: 'PUT',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}