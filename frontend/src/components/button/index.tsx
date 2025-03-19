import { ComponentProps } from 'react';

import buttonStyles from './button.module.scss';

type ButtonProps = ComponentProps<'button'>;

// EXAMPLE
// import { tv } from 'tailwind-variants';

// const button = tv({
//   base: 'font-medium bg-blue-500 text-white rounded-full active:opacity-80',
//   variants: {
//     color: {
//       primary: 'bg-blue-500 text-white',
//       secondary: 'bg-purple-500 text-white'
//     },
//     size: {
//       sm: 'text-sm',
//       md: 'text-base',
//       lg: 'px-4 py-3 text-lg'
//     }
//   },
//   compoundVariants: [
//     {
//       size: ['sm', 'md'],
//       class: 'px-3 py-1'
//     }
//   ],
//   defaultVariants: {
//     size: 'md',
//     color: 'primary'
//   }
// });

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button className={buttonStyles.button} {...rest}>
      {children}
    </button>
  );
}

export { Button };
