import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  // The type will be placed at the end of the state.
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    
    // Crie uma nova task com um id random, 
    // -não permita criar caso o título seja vazio.

    let generatedId = Math.floor((1 + Math.random()) * 0x10000)

    const newTask: Task = {
      id: generatedId!,
      isComplete: false,
      title: newTaskTitle,
    };

    // check if title is empty.
    if (newTaskTitle === '') {
      return;
    } else {
      // If title is not empty send the task to the state.
      setTasks((tasks) => [...tasks, newTask])
    }
  }

  function handleToggleTaskCompletion(id: number) {
    /*
    Altere entre `true` ou `false` o campo `isComplete` 
    de uma task com dado ID
    */ 

    // gets the id passed.
    const taskIndex = tasks.findIndex((task) => task.id === id);
    
    // set newTask == to tasks (a state).
    const newTasks = tasks;

    // sets the new completion to true that !== from the default value.
    newTasks[taskIndex].isComplete = !newTasks[taskIndex].isComplete;

    // pass the new value to the state.
    setTasks([...newTasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    setTasks(tasks => tasks.filter((item) => item.id !== id));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}