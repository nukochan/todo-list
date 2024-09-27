import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';

function SearchBar() {
  const { searchTasks } = useTaskContext();
  const [filters, setFilters] = useState({
    keyword: '',
    priority: '',
    date: '',
    status: undefined,
    category: '',
  });
  const [exactMatch, setExactMatch] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === '' ? undefined : e.target.value === 'true';
    setFilters(prev => ({ ...prev, status: value }));
  };

  const handleExactMatchChange = (e) => {
    setExactMatch(e.target.checked);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchTasks({ ...filters, exactMatch });
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 p-4 bg-gray-100 rounded-md">
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={exactMatch}
            onChange={handleExactMatchChange}
            className="mr-2"
          />
          完全一致で検索
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="keyword"
          placeholder="キーワード検索..."
          value={filters.keyword}
          onChange={handleInputChange}
          className="p-2 border rounded-md"
        />
        <select
          name="priority"
          value={filters.priority}
          onChange={handleInputChange}
          className="p-2 border rounded-md"
        >
          <option value="">優先度を選択</option>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleInputChange}
          className="p-2 border rounded-md"
        />
        <select
          name="status"
          value={filters.status === undefined ? '' : filters.status.toString()}
          onChange={handleStatusChange}
          className="p-2 border rounded-md"
        >
          <option value="">状態を選択</option>
          <option value="false">未完了</option>
          <option value="true">完了</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="カテゴリー..."
          value={filters.category}
          onChange={handleInputChange}
          className="p-2 border rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full flex items-center justify-center">
        <Search className="mr-2" />
        検索
      </button>
    </form>
  );
}

export default SearchBar;
