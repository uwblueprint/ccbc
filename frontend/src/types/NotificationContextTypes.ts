/**
 * Type of the object provided by the NotificationContext
 */
export type NotificationContextType = {
  notifications: string[];
};

/**
 * Type of the action that can be dispatched by the NotificationContextDispatcherContext
 */
export type NotificationContextAction = {
  type: "EDIT_NOTIFICATIONS";
  value: string[];
};
