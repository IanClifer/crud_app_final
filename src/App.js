import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    // Fetch todos from the API
    fetch('/api.php') // Adjust the URL based on your server setup
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleInputChange = event => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    // Add a new todo to the database
    fetch('/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newTodo }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Fetch updated todos after adding a new one
        fetch('/api.php')
          .then(response => response.json())
          .then(updatedTodos => setTodos(updatedTodos))
          .catch(error => console.error('Error fetching todos:', error));
      })
      .catch(error => console.error('Error adding todo:', error));
      setNewTodo('');
  };

  const handleEditClick = id => {
    // Set the editingTodo state to the id of the todo being edited
    setEditingTodo(id);
  };

  const handleUpdateTodo = (id, updatedDescription) => {
    // Update the todo in the database
    fetch('/api.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, description: updatedDescription }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Fetch updated todos after editing
        fetch('/api.php')
          .then(response => response.json())
          .then(updatedTodos => {
            setTodos(updatedTodos);
            setEditingTodo(null); // Reset editingTodo state after editing
          })
          .catch(error => console.error('Error fetching todos:', error));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const handleDeleteClick = (id) => {
    // Delete the todo from the database
    fetch('/api.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Fetch updated todos after deleting
        fetch('/api.php')
          .then((response) => response.json())
          .then((updatedTodos) => setTodos(updatedTodos))
          .catch((error) => console.error('Error fetching todos:', error));
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  const handleDeleteClick2 = (id) => {
    // Redirect to delete.php with the appropriate parameters
    window.location.href = `delete.php?id=${id}`;
  };
  const handleUpdateClick2 = (id, description) => {
    // Redirect to delete.php with the appropriate parameters
    window.location.href = `update.php?de=${description}&id=${id}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List:</h1>
        <div>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {editingTodo === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={todo.description}
                      onChange={(e) => setTodos((prevTodos) =>
                        prevTodos.map((prevTodo) =>
                          prevTodo.id === todo.id
                            ? { ...prevTodo, description: e.target.value }
                            : prevTodo
                        )
                      )}
                    />
                    <button onClick={() => handleUpdateClick2(todo.id, todo.description)}>Save</button>
                  </>
                ) : (
                  <>
                    {todo.description}
                    <button onClick={() => handleEditClick(todo.id)}>Edit</button>
                    <button onClick={() => handleDeleteClick2(todo.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
      </header>
    </div>
  );
}

export default App;
