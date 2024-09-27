import React, { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';

function AddTaskForm() {
  const [task, setTask] = useState({ title: '', priority: '', dueDate: '', category: '' });
  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim()) {
      addTask(task);
      setTask({ title: '', priority: '', dueDate: '', category: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded-md">
      <h2 className="text-xl font-semibold mb-2">新規タスク追加</h2>
      <input
        type="text"
        placeholder="タスク名"
        value={task.title}
        onChange={(e) => setTask({...task, title: e.target.value})}
        className="w-full p-2 mb-2 border rounded-md"
      />
      <div className="flex space-x-2 mb-2">
        <select
          value={task.priority}
          onChange={(e) => setTask({...task, priority: e.target.value})}
          className="p-2 border rounded-md"
        >
          <option value="">優先度</option>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({...task, dueDate: e.target.value})}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="カテゴリー"
          value={task.category}
          onChange={(e) => setTask({...task, category: e.target.value})}
          className="p-2 border rounded-md"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
        追加
      </button>
    </form>
  );
}

export default AddTaskForm;

