import * as React from 'react';
import Image from 'next/image';
import loading from '../../../../assets/src/loading.svg';

const LoadingLogin = React.forwardRef<HTMLDivElement>(() => {
  return (
    <Image
      className="w-40"
      src={loading}
      alt="Loading"
    />
  );
});
LoadingLogin.displayName = 'LoadingLogin';

export { LoadingLogin };
