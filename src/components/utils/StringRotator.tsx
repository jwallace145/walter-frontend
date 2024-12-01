import React, { useState, useEffect } from 'react';

interface StringRotatorProps {
  strings: string[];
  interval: number;
}

const StringRotator: React.FC<StringRotatorProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % props.strings.length);
    }, props.interval);

    return () => clearInterval(timer);
  }, [props.strings, props.interval]);

  return <div>{props.strings[currentIndex]}</div>;
};

export default StringRotator;
