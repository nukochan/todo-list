import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';

function CompletedTasks() {
  const { filteredTasks, deleteTasks } = useTaskContext();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const handleCheckboxChange = (taskId) => {
    setSelectedTasks(prevSelected => 
      prevSelected.includes(taskId)
        ? prevSelected.filter(id => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  const handleDeleteSelected = () => {
    deleteTasks(selectedTasks);
    setSelectedTasks([]);
    setShowDeletedMessage(true);
    setTimeout(() => setShowDeletedMessage(false), 3000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">完了タスク</h2>
      {completedTasks.map(task => (
        <div key={task.id} className="bg-gray-200 p-3 rounded-md text-gray-500 mb-2 flex items-center">
          <input
            type="checkbox"
            checked={selectedTasks.includes(task.id)}
            onChange={() => handleCheckboxChange(task.id)}
            className="mr-2"
          />
          <div>
            {task.title}
            <div className="text-sm">
              優先度: {task.priority} | 期限: {task.dueDate} | カテゴリー: {task.category}
            </div>
          </div>
        </div>
      ))}
      {selectedTasks.length > 0 && (
        <button 
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white p-2 rounded-md mt-2"
        >
          選択したタスクを削除 ({selectedTasks.length})
        </button>
      )}
      {showDeletedMessage && (
        <div className="mt-2 text-green-500">
          タスクが削除されました。
          <Link to="/deleted" className="ml-2 text-blue-500 hover:text-blue-700">
            削除済みタスクを表示
          </Link>
        </div>
      )}
    </div>
  );
}

export default CompletedTasks;
