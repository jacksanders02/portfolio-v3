function debounce(callback: (...args: unknown[]) => void, delay: number) {
  let timeout: NodeJS.Timeout;

  return (...args: unknown[]): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default debounce;
