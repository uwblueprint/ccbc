import { createContext } from "react";

import { NotificationContextAction } from "../types/NotificationContextTypes";

/**
 * New context instance of a NotificationContextAction Dispatch function with an empty default function
 */
const NotificationContextDispatcherContext = createContext<
  React.Dispatch<NotificationContextAction>
>(() => {});

export default NotificationContextDispatcherContext;
