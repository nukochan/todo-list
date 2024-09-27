import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';

function DeletedTasks() {
  const { deletedTasks, restoreTask } = useTaskContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">削除済みタスク</h2>
      {deletedTasks.length === 0 ? (
        <p>削除されたタスクはありません。</p>
      ) : (
        deletedTasks.map(task => (
          <div key={task.id} className="bg-gray-100 p-3 rounded-md text-gray-700 mb-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{task.title}</span>
              <button
                onClick={() => restoreTask(task.id)}
                className="bg-green-500 text-white px-2 py-1 rounded-md text-sm"
              >
                復元
              </button>
            </div>
            <div className="text-sm">
              優先度: {task.priority} | 期限: {task.dueDate} | カテゴリー: {task.category}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              削除日時: {new Date(task.deletedAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
      <Link to="/" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
        ホームに戻る
      </Link>
    </div>
  );
}

export default DeletedTasks;
