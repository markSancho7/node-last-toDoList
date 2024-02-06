import { useEffect, useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	const [tasks, setTasks] = useState([]);
	console.log(tasks);
	useEffect(() => {
		getAllTasks(setTasks);
	}, []);
	return (
		<>
			<GlobalStyles />
			<form onSubmit={event => handleSubmit(event, setTasks)}>
				<input type='text' name='task' />
			</form>
			<div>
				{tasks.map(task => (
					<div key={task._id}>
						<span>{task.task}</span>
						<input
							type='checkbox'
							name='completed'
							checked={task.completed}
							onChange={event =>
								taskCompleted(task._id, event.target.checked, setTasks)
							}
						/>
						<button onClick={() => deleteTask(task._id, setTasks)}>X</button>
					</div>
				))}
			</div>
		</>
	);
};
const taskCompleted = async (id, checkedStatus, setTasks) => {
	console.log(checkedStatus);
	try {
		const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ completed: checkedStatus }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const allTasks = await response.json();
		setTasks(allTasks);
	} catch {}
};
const deleteTask = async (id, setTasks) => {
	try {
		const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const allTasks = await response.json();
		setTasks(allTasks);
	} catch (error) {
		console.log(error);
	}
};
const handleSubmit = async (event, setTasks) => {
	event.preventDefault();
	try {
		const response = await fetch('http://localhost:3000/api/tasks', {
			method: 'POST',
			body: JSON.stringify({ task: event.target.task.value }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const allTasks = await response.json();
		setTasks(allTasks);
	} catch (error) {
		console.log(error);
	}
};

const getAllTasks = async setTasks => {
	try {
		const response = await fetch('http://localhost:3000/api/tasks', {
			method: 'GET'
		});
		const allTasks = await response.json();
		setTasks(allTasks);
	} catch (error) {
		console.log(error);
	}
};

export default App;
