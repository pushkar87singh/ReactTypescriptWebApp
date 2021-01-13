export function ensure<T>(argument: T | undefined | null, message: string) {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }
  return argument;
}
