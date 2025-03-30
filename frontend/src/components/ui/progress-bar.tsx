import { useEffect, useState } from 'react';

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-2.5 rounded-full bg-orange-400 transition-all duration-300 ease-in-out dark:bg-orange-400"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export { ProgressBar };
