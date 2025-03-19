export function cn(args: string | string[]) {
  if (typeof args === 'string') {
    return args;
  }

  return args.filter(Boolean).join(' ');
}
