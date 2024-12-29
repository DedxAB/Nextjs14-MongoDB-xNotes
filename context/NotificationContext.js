'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSession } from 'next-auth/react';
import { fetchNotificationsByUserIdForClient } from '@/services/notification/client/notification.service';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const fetchNotifications = useCallback(async () => {
    if (session?.user?.id) {
      try {
        setIsLoading(true);
        const data = await fetchNotificationsByUserIdForClient(session.user.id);
        setNotifications(data?.data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [session?.user?.id]);

  // Polling logic
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [session?.user?.id, fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
