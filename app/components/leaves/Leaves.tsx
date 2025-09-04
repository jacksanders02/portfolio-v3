import React from "react";
import Leaf from "./Leaf";

export default function Leaves(): React.ReactElement {
  const [mousePos, setMousePos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const leafContainerRef = React.useRef<HTMLDivElement>(null);
  const masterLeafRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!leafContainerRef.current || !masterLeafRef.current) return; // Ensure refs are set

      if (Math.random() > 0.66) return; // Limit leaf spawn rate

      setMousePos({ x: event.clientX, y: event.clientY });

      const startRotation = -15 + Math.random() * 30;
      const endRotation = startRotation + (-15 + Math.random() * 30);

      const newLeaf = masterLeafRef.current.cloneNode(true) as SVGSVGElement;
      leafContainerRef.current.appendChild(newLeaf);

      newLeaf.classList.remove("hidden");
      newLeaf.style.top = `${event.clientY}px`;
      newLeaf.style.left = `${event.clientX}px`;
      
      newLeaf.animate(
        [
          { transform: `rotate(${startRotation}deg) translate(0, 0)`, opacity: 1 },
          { transform: `rotate(${endRotation}deg) translate(0, 300px)`, opacity: 0 }
        ],
        {
            duration: 1500 + Math.random() * 1000,
            iterations: 1,
            easing: "linear",
        }
      ).finished.then(() => {
        // Remove leaf after animation
        newLeaf.remove();
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={leafContainerRef}
      style={{
        position: "fixed",
        pointerEvents: "none",
      }}
    >
      <Leaf ref={masterLeafRef} className="w-4 h-4 hidden fixed" />
    </div>
  );
}