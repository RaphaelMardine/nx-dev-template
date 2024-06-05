import * as React from 'react';

const Loading = React.forwardRef<HTMLDivElement>(() => {
  return (
    <div className="m-auto flex items-center justify-center gap-4 p-4">
      <span className="relative flex h-6 w-6">
        <span className="absolute left-0 right-0 inline-flex h-full w-full animate-ping rounded-full bg-green-dark opacity-75 "></span>
        <span className="relative inline-flex h-6 w-6 rounded-full bg-primary-hover"></span>
      </span>
      <span className="relative flex h-6 w-6">
        <span className="absolute left-0 right-0 inline-flex h-full w-full animate-ping rounded-full bg-green-dark opacity-75 "></span>
        <span className="relative inline-flex h-6 w-6 rounded-full bg-primary-hover"></span>
      </span>
      <span className="relative flex h-6 w-6">
        <span className="absolute left-0 right-0 inline-flex h-full w-full animate-ping rounded-full bg-green-dark opacity-75 "></span>
        <span className="relative inline-flex h-6 w-6 rounded-full bg-primary-hover"></span>
      </span>
    </div>
  );
});
Loading.displayName = 'Loading';

export { Loading };
