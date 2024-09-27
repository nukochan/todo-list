import React from 'react';
import { Bell } from 'lucide-react';

function ReminderNotification() {
  // 期限切れのタスクがあるかどうかをチェックするロジックをここに実装します
  const hasOverdueTasks = true;

  if (!hasOverdueTasks) return null;

  return (
    <div className="bg-yellow-100 p-3 mb-4 rounded-md flex items-center">
      <Bell className="mr-2" />
      <span>期限切れのタスクがあります！</span>
    </div>
  );
}

export default ReminderNotification;
