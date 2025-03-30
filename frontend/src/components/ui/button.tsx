import { ComponentProps } from 'react';

import { tv, VariantProps } from 'tailwind-variants';

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>;

const button = tv({
  base: 'font-medium active:opacity-80 rounded-xl cursor-pointer p-2.5 min-w-16 h-11 md:text-xs lg:text-base flex items-center justify-center',
  variants: {
    color: {
      primary: 'bg-orange-300',
      delete: 'bg-red-500 text-white'
    },
    disabled: {
      true: 'opacity-50 pointer-events-none'
    }
  },
  defaultVariants: {
    color: 'primary'
  }
});

function Button({
  children,
  color,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={button({ color, disabled, className })}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export { Button };
