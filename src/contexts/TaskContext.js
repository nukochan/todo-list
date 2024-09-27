import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [deletedTasks, setDeletedTasks] = useLocalStorage('deletedTasks', []);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    setDeletedTasks([...deletedTasks, { ...taskToDelete, deletedAt: new Date() }]);
  };

  const deleteTasks = (ids) => {
    const tasksToDelete = tasks.filter(task => ids.includes(task.id));
    setTasks(tasks.filter(task => !ids.includes(task.id)));
    setDeletedTasks([...deletedTasks, ...tasksToDelete.map(task => ({ ...task, deletedAt: new Date() }))]);
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
  };

  const restoreTask = (id) => {
    const taskToRestore = deletedTasks.find(task => task.id === id);
    setDeletedTasks(deletedTasks.filter(task => task.id !== id));
    setTasks([...tasks, { ...taskToRestore, deletedAt: undefined }]);
  };

  const searchTasks = (filters) => {
    let filtered = tasks;

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(task => {
        if (filters.exactMatch) {
          return task.title.toLowerCase() === keyword || task.category.toLowerCase() === keyword;
        } else {
          return task.title.toLowerCase().includes(keyword) || task.category.toLowerCase().includes(keyword);
        }
      });
    }

    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    if (filters.date) {
      filtered = filtered.filter(task => task.dueDate === filters.date);
    }

    if (filters.status !== undefined) {
      filtered = filtered.filter(task => task.completed === filters.status);
    }

    if (filters.category) {
      const category = filters.category.toLowerCase();
      filtered = filtered.filter(task => {
        if (filters.exactMatch) {
          return task.category.toLowerCase() === category;
        } else {
          return task.category.toLowerCase().includes(category);
        }
      });
    }

    setFilteredTasks(filtered);
  };

  const value = {
    tasks,
    filteredTasks,
    deletedTasks,
    setFilteredTasks,
    addTask,
    updateTask,
    deleteTask,
    deleteTasks,
    completeTask,
    restoreTask,
    searchTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
