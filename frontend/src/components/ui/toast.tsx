import { CircleCheck, XCircle, CircleAlert, X } from 'lucide-react';
import { tv } from 'tailwind-variants';

export type ToastProps = {
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible?: boolean;
  hideToast?: () => void;
};

const toastContainerStyles = tv({
  base: 'fixed right-6 bottom-6 z-50 flex flex-col gap-2'
});

const toastStyles = tv({
  base: 'flex min-w-80 flex-col rounded-xl bg-white p-4 shadow-md transition-all duration-300 ease-in-out transform',
  variants: {
    isVisible: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 translate-y-2'
    }
  }
});

const ICONS = {
  success: <CircleCheck color="var(--color-green-500)" />,
  error: <XCircle color="var(--color-red-500)" />,
  warning: <CircleAlert color="var(--color-yellow-500)" />,
  info: <CircleAlert color="var(--color-blue-500)" />
};

const DEFAULT_MESSAGES = {
  success: 'Operation completed successfully.',
  error: 'An error occurred. Please try again.',
  warning: 'Warning: Please check your input.',
  info: 'Information: Please note the changes.'
};

function Toast({
  message = '',
  type = 'success',
  isVisible = false,
  hideToast = () => {}
}: ToastProps) {
  return (
    <section className={toastStyles({ isVisible: isVisible })}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {ICONS[type]}
          <span className="text-sm text-gray-500">
            {message || DEFAULT_MESSAGES[type]}
          </span>
        </div>
        <button
          data-testid="close-toast"
          onClick={hideToast}
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200"
        >
          <X size={16} />
        </button>
      </div>
    </section>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return <div className={toastContainerStyles()}>{children}</div>;
}

export { Toast };
