import {
  NotificationContextAction,
  NotificationContextType,
} from "../types/NotificationContextTypes";

/**
 * Reducer for NotificationContext
 * @param state - The current state of the context
 * @param action - The action being performed
 * @returns New state for NotificationContext
 */
export default function notificationContextReducer(
  state: NotificationContextType,
  action: NotificationContextAction,
): NotificationContextType {
  switch (action.type) {
    case "EDIT_NOTIFICATIONS":
      return {
        notifications: action.value,
      };
    default:
      return state;
  }
}
