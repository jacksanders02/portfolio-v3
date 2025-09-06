import React from 'react';
import Leaf from './Leaf';

// Random leaf colours, weighted towards green
const LEAF_COLOURS = [
  '#8BA726',
  '#8BA726',
  '#8BA726',
  '#D9D32F',
  '#D9D32F',
  '#FF9828',
];

const Leaves = (): React.ReactElement => {
  const masterLeafRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!masterLeafRef.current) return; // Ensure refs are set
      if (Math.random() > 0.66) return; // Limit leaf spawn rate

      const startRotation = -15 + Math.random() * 30;
      const endRotation = startRotation + (-15 + Math.random() * 30);

      const newLeaf = masterLeafRef.current.cloneNode(true) as HTMLDivElement;
      masterLeafRef.current.parentElement?.appendChild(newLeaf);

      const leafSvg = newLeaf.querySelector('svg') as SVGSVGElement;
      const leafRotation = -90 + Math.random() * 270;
      const leafScale = 0.5 + Math.random();

      leafSvg.style.transform = `rotate(${leafRotation}deg) scale(${leafScale})`;
      leafSvg.style.fill = LEAF_COLOURS[Math.floor(Math.random() * LEAF_COLOURS.length)];

      newLeaf.classList.remove('hidden');
      newLeaf.style.top = `${event.clientY}px`;
      newLeaf.style.left = `${event.clientX}px`;

      newLeaf.animate(
        [
          { transform: `rotate(${startRotation}deg) translate(0, 0)`, opacity: 1 },
          { transform: `rotate(${endRotation}deg) translate(0, 300px)`, opacity: 0 },
        ],
        {
          duration: 1500 + Math.random() * 1000,
          iterations: 1,
          easing: 'linear',
        },
      ).finished.then(() => {
        // Remove leaf after animation
        newLeaf.remove();
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div ref={masterLeafRef} className="w-4 h-4 hidden fixed">
        <Leaf className="w-full h-full" />
      </div>
    </div>
  );
};

export default Leaves;
