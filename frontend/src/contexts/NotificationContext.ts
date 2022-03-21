import { createContext } from "react";

import { NotificationContextType } from "../types/NotificationContextTypes";

/**
 * Default value for the Notification Context
 */
export const DEFAULT_NOTIFICATION_CONTEXT: NotificationContextType = {
  notifications: [],
};

/**
 * New context instance of NotificationContext with the default value
 */
const NotificationContext = createContext<NotificationContextType>(
  DEFAULT_NOTIFICATION_CONTEXT,
);

export default NotificationContext;
