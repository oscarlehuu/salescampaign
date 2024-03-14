import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ color: "info", content: "" });
  const [open, setOpen] = useState(false);

  const handleOpenNoti = (notification) => {
    setOpen(true);
    setNotification(notification);
  };

  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const value = {
    notification,
    open,
    handleOpenNoti,
    handleCloseNoti,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotificationContext = () => useContext(NotificationContext);
