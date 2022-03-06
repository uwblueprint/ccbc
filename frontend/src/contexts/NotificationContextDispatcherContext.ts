import { createContext } from "react";

import { NotificationContextAction } from "../types/NotificationContextTypes";

const NotificationContextDispatcherContext = createContext<
  React.Dispatch<NotificationContextAction>
>(() => {});

export default NotificationContextDispatcherContext;
