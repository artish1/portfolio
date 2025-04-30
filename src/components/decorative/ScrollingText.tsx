import classNames from 'classnames';
import React from 'react';

const ScrollingText = ({
  children,
  reverse = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) => {
  const repeatCount = 10;

  const repeatedChildren = Array.from({ length: repeatCount }, (_, i) => (
    <span key={i} className="px-4">
      {children}
    </span>
  ));

  return (
    <div className="relative w-full overflow-hidden h-[6rem]"> {/* Fixed height ensures visibility */}
      <div
        className={classNames(
          "absolute left-0 top-0 -translate-y-1/2 flex whitespace-nowrap will-change-transform",
          reverse ? 'animate-scroll-reverse' : 'animate-scroll'
        )}
      >
        {repeatedChildren}
      </div>
    </div>
  );
};

export default ScrollingText;
