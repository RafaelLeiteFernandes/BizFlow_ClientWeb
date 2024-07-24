import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children?: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative inline-block">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-block">
        <span className="cursor-pointer text-xs text-gray-500 text-opacity-70">{children}</span>
      </div>
      {isTooltipVisible && (
       <div className="absolute bg-gray-800 text-white p-2 rounded-lg text-sm bottom-8 left-0 z-10 shadow-md" style={{ width: '200px' }}>
        {content}
      </div>
      )}
    </div>
  );
};

export default Tooltip;
