import { ComponentProps, forwardRef } from 'react';

type CheckboxProps = ComponentProps<'input'> & {};

export const CheckboxCustom = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, children, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label className="flex cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className="peer hidden"
          id={checkboxId}
          {...props}
        />
        <div className={'checkbox-custom'}>{children}</div>
      </label>
    );
  }
);
