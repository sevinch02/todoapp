import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  function setLocalStorage(value) {
    setTodos(value);
    localStorage.setItem('items', JSON.stringify(value));
  }

  function addTodo(evt) {
    if (evt.keyCode === 13) {
      const newTodo = {
        id: todos.at(-1)?.id + 1 || 1,
        text: evt.target.value,
        isCompleted: false,
      };
      setLocalStorage([...todos, newTodo]);
      evt.target.value = null;
    }
  }

  function editTodo(id, text) {
    let editText = prompt('Edit text', text);
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
    });
    setLocalStorage([...todos]);
  }

  return (
    <>
     <div className='content'>
        <input className='input' type="text" placeholder="todo..." onKeyUp={addTodo} required />
     
     
      <ul className='list'>
        {todos.map((todo, i) => (
          <li className='list-item' key={todo.id}>
            <span>
            <input className='list-item__input'
              defaultChecked={todo.isCompleted}
              onChange={(evt) => {
                todos[i].isCompleted = evt.target.checked;
                setLocalStorage([...todos]);
              }}
              type="checkbox"
            />
            <label className='todo-text'
              style={todo.isCompleted ? { textDecoration: 'line-through' } : {}}
            >
              {todo.text}
            </label>
            </span>
            <div className='btn-div'>
              <button className='btn edit-btn' onClick={() => editTodo(todo.id, todo.text)}>✎</button>
              <button className='btn delete-btn'
              onClick={() => {
                let filtredTodos = todos.filter((item) => item.id !== todo.id);
                setLocalStorage(filtredTodos); }}> &times; </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
export default App;