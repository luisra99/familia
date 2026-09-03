import { Alert, AlertTitle, IconButton } from "@mui/material";

import { AlertColor } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useNotifications from "@/_pwa-framework/store/notifications";

function NotificationProvider() {
  const [, notificationsActions] = useNotifications();

  const notify = (notification: CustomNotification) => {
    const key = Math.random().toString();
    notificationsActions.push({
      message: notification.title,
      options: {
        key,
        content: (
          <Alert
            severity={notification.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  notificationsActions.close(key);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>{notification.title}</AlertTitle>
            {notification.content}
          </Alert>
        ),
      },
    });
  };
  return notify;
}

export interface CustomNotification {
  type?: AlertColor;
  title: string;
  content?: string;
}

export default NotificationProvider;
