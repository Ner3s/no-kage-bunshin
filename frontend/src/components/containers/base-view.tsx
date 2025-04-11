import React from 'react';

import { tv, VariantProps } from 'tailwind-variants';

const textTw = tv({
  base: 'mb-4 text-2xl font-extrabold',
  variants: {
    text: {
      large: 'text-4xl',
      normal: 'text-2xl'
    }
  },
  defaultVariants: {
    text: 'normal'
  }
});

export type BaseViewProps = VariantProps<typeof textTw> & {
  children: React.ReactNode;
  Icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
};

function BaseView({ children, Icon, title, subtitle, text }: BaseViewProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-6 rounded-full bg-orange-200 p-6">{Icon}</div>
      <div className="mb-6 text-center">
        <h2 className={textTw({ text })}>{title}</h2>
        <span className="font-normal text-gray-500">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

export { BaseView };
