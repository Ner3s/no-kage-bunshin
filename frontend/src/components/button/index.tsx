import buttonStyles from './button.module.scss';

import { cn } from '@/utils/helpers/class-concat';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

function Button({ children, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <button
      className={cn([buttonStyles.button, buttonStyles[variant]])}
      {...rest}
    >
      {children}
    </button>
  );
}

export { Button };
