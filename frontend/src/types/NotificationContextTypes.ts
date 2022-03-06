export type NotificationContextType = {
  notifications: string[];
};

export type NotificationContextAction = {
  type: "EDIT_NOTIFICATIONS";
  value: string[];
};
