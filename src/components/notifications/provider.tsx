// src/components/NotificationProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Notification from './';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

type Notification = {
  id: number;
  message: string;
  type: NotificationType;
};

type NotificationContextType = {
  notify: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, type: NotificationType = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((n,i) => (
          <Notification key={n.id+i} message={n.message} type={n.type} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
