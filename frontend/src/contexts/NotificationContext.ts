import { createContext } from "react";

import { NotificationContextType } from "../types/NotificationContextTypes";

export const DEFAULT_NOTIFICATION_CONTEXT = {
  notifications: [],
};

const NotificationContext = createContext<NotificationContextType>(
  DEFAULT_NOTIFICATION_CONTEXT,
);

export default NotificationContext;
