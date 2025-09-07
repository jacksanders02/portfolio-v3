import { useEffect, useRef, type ReactElement } from 'react';
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

const Leaves = (): ReactElement => {
  const masterLeafRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!masterLeafRef.current) return; // Ensure refs are set
      if (Math.random() > 0.66) return; // Limit leaf spawn rate -- 2 in 3 chance of spawning

      // Instantiate new leaf by cloning the main one
      const newLeaf = masterLeafRef.current.cloneNode(true) as HTMLDivElement;
      masterLeafRef.current.parentElement?.appendChild(newLeaf);

      newLeaf.style.display = 'block';
      newLeaf.style.top = `${event.clientY}px`;
      newLeaf.style.left = `${event.clientX}px`;

      // Randomise leaf appearance
      const leafSvg = newLeaf.querySelector('svg') as SVGSVGElement;
      const leafRotation = -90 + Math.random() * 270;
      const leafScale = 0.5 + Math.random();

      leafSvg.style.transform = `rotate(${leafRotation}deg) scale(${leafScale})`;
      leafSvg.style.fill = LEAF_COLOURS[Math.floor(Math.random() * LEAF_COLOURS.length)];

      // Animate
      const startRotation = -15 + Math.random() * 30;
      const endRotation = startRotation + (-15 + Math.random() * 30);
      newLeaf.animate(
        [
          { transform: `rotate(${startRotation}deg) translateY(0)`, opacity: 1 },
          { transform: `rotate(${endRotation}deg) translateY(300px)`, opacity: 0 },
        ],
        {
          duration: 1500 + Math.random() * 1000,
          iterations: 1,
          easing: 'cubic-bezier(0.11, 0, 0.5, 0)',
        },
      ).finished.then(() => {
        // Remove leaf after animation
        newLeaf.remove();
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up effect
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div
        ref={masterLeafRef}
        className="w-4 h-4 fixed pointer-events-none"
        style={{ display: 'none' }} // Use style instead of class to prevent FOUC
      >
        <Leaf className="w-full h-full" />
      </div>
    </div>
  );
};

export default Leaves;
