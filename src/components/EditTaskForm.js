import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../contexts/TaskContext';

function EditTaskForm({ task, onCancel }) {
  const [editedTask, setEditedTask] = useState(task);
  const { updateTask } = useTaskContext();

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, editedTask);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-3 mb-2 rounded-md shadow">
      <input
        type="text"
        value={editedTask.title}
        onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
        className="w-full p-2 mb-2 border rounded-md"
      />
      <div className="flex space-x-2 mb-2">
        <select
          value={editedTask.priority}
          onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
          className="p-2 border rounded-md"
        >
          <option value="">優先度</option>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
        <input
          type="date"
          value={editedTask.dueDate}
          onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="カテゴリー"
          value={editedTask.category}
          onChange={(e) => setEditedTask({...editedTask, category: e.target.value})}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="bg-gray-300 text-black p-2 rounded-md">
          キャンセル
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          更新
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
