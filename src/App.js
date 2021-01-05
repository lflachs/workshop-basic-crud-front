import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [todolistTitle, setTodolistTitle] = useState('');
	const [updateTodolistTitle, setupdateTodolistTitle] = useState('');
	const [updateTodolistId, setupdateTodolistId] = useState('');
	const [todolists, setTodolists] = useState([]);
	useEffect(() => {
		fetch('http://localhost:8000/todolist')
			.then((resp) => resp.json())
			.then((todolists) => setTodolists(todolists))
			.catch((err) => console.log(err));
	}, []);
	const handleDelete = (todolistId) => {
		fetch(`http://localhost:8000/todolist/${todolistId}`, {
			method: 'DELETE',
		})
			.then((resp) => resp.json())
			.then((deletedTodolist) =>
				setTodolists(todolists.filter((todo) => todo.id !== deletedTodolist.id))
			)
			.catch((err) => console.log(err));
	};
	const handleUpdate = (event) => {
		event.preventDefault();
		fetch(`http://localhost:8000/todolist/${updateTodolistId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'content-Type': 'application/json',
			},
			body: JSON.stringify({ title: updateTodolistTitle }),
		})
			.then((resp) => resp.json())
			.then((updatedTodolist) => {
				setTodolists(
					todolists.map((todo) =>
						todo.id === updatedTodolist.id ? updatedTodolist : todo
					)
				);
			})
			.catch((err) => console.log(err));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setTodolistTitle('');
		fetch('http://localhost:8000/todolist', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'content-Type': 'application/json',
			},
			body: JSON.stringify({ title: todolistTitle }),
		})
			.then((resp) => resp.json())
			.then((newTodo) =>
				setTodolists((todolist) => {
					return [...todolist, newTodo];
				})
			)
			.catch((err) => console.log(err));
	};
	return (
		<div className='App'>
			<ul>
				{todolists.map((todolist) => {
					return (
						<li key={todolist.id} onClick={() => handleDelete(todolist.id)}>
							{todolist.id} = {todolist.title}
						</li>
					);
				})}
			</ul>
			<h1>Create a todolist</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='todolist-title'>Title:</label>
				<input
					type='text'
					value={todolistTitle}
					onChange={(event) => setTodolistTitle(event.target.value)}
				/>
				<input type='submit' value='send'></input>
			</form>
			<h1>Update a todolist</h1>
			<form onSubmit={handleUpdate}>
				<label htmlFor='todolist-title'>Title:</label>
				<input
					type='text'
					value={updateTodolistTitle}
					onChange={(event) => setupdateTodolistTitle(event.target.value)}
				/>
				<br />
				<label htmlFor='todolist-title'>id:</label>
				<input
					type='number'
					value={updateTodolistId}
					onChange={(event) => setupdateTodolistId(event.target.value)}
				/>
				<input type='submit' value='send'></input>
			</form>
		</div>
	);
}

export default App;
