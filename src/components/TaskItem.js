import React, { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import EditTaskForm from './EditTaskForm';

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const { completeTask } = useTaskContext();

  const handleComplete = () => {
    completeTask(task.id);
  };

  if (isEditing) {
    return <EditTaskForm task={task} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="bg-white p-3 mb-2 rounded-md shadow">
      <div className="flex justify-between items-center">
        <span className="font-medium">{task.title}</span>
        <div className="space-x-2">
          <button className="text-blue-500" onClick={() => setIsEditing(true)}>
            編集
          </button>
          <button className="text-green-500" onClick={handleComplete}>
            完了
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        優先度: {task.priority} | 期限: {task.dueDate} | カテゴリー: {task.category}
      </div>
    </div>
  );
}

export default TaskItem;
