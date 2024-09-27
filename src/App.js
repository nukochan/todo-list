import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import CompletedTasks from './components/CompletedTasks';
import DeletedTasks from './components/DeletedTasks';
import ReminderNotification from './components/ReminderNotification';
import SearchBar from './components/SearchBar';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="max-w-4xl mx-auto p-4 font-sans">
          <h1 className="text-3xl font-bold mb-4">TODOリスト</h1>
          <nav className="mb-4">
            <Link to="/" className="mr-4 text-blue-500 hover:text-blue-700">ホーム</Link>
            <Link to="/deleted" className="text-blue-500 hover:text-blue-700">削除済みタスク</Link>
          </nav>
          <Routes>
            <Route path="/" element={
              <>
                <ReminderNotification />
                <SearchBar />
                <AddTaskForm />
                <TaskList />
                <CompletedTasks />
              </>
            } />
            <Route path="/deleted" element={<DeletedTasks />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
