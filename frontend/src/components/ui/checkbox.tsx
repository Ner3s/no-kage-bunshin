import { ComponentProps, forwardRef } from 'react';

import { tv, VariantProps } from 'tailwind-variants';

const checkbox = tv({
  base: 'peer h-5 w-5 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:border-amber-600 checked:bg-amber-600 hover:shadow-md relative',
  variants: {
    shape: {
      rounded: 'rounded',
      circle: 'rounded-full' // Variante totalmente redonda
    }
  },
  defaultVariants: {
    shape: 'rounded' // Padrão: bordas arredondadas
  }
});

type CheckboxProps = ComponentProps<'input'> &
  VariantProps<typeof checkbox> & {
    label?: string;
    labelClassName?: string;
  };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, shape, label, labelClassName, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="inline-flex items-center">
        <label className="relative flex cursor-pointer items-center">
          <input
            ref={ref}
            type="checkbox"
            className={checkbox({ shape, className })}
            id={checkboxId}
            {...props}
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
        {label && (
          <label
            htmlFor={checkboxId}
            className={`ml-2 cursor-pointer text-sm ${labelClassName || ''}`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
