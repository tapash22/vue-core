import { toast } from 'vue3-toastify';

const getAutoClose = (message: string) =>
  Math.min(Math.max(message.length * 80, 2500), 8000);

export const Toast = {
  success: (message: string) =>
    toast.success(message, { autoClose: getAutoClose(message) }),

  error: (message: string) =>
    toast.error(message, { autoClose: getAutoClose(message) }),

  warning: (message: string) =>
    toast.warning(message, { autoClose: getAutoClose(message) }),

  info: (message: string) =>
    toast.info(message, { autoClose: getAutoClose(message) }),
};
