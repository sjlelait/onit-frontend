const url = 'http://localhost:3001';

export const deleteItem = async (itemId, user) => {
  console.log('Deleting item with id:', itemId);

  try {
    const token = await user.getIdToken();
    const response = await fetch(`${url}/tasks/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    if (response.ok) {
      return true;
    } else {
      console.error('Error:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export const editItem = async (itemId, newData) => {
  try {
    const response = await fetch(`${url}/tasks/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};