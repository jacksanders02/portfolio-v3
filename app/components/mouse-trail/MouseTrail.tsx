import { useEffect, useRef, type ReactElement } from 'react';

interface PathSegment {
  from: { x: number; y: number };
  to: { x: number; y: number };
  drawTime: number;
}

const PATH_LIFESPAN = 250;

const MouseTrail = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return () => {};

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return () => {};

    const lastMousePos: { x: null | number; y: null | number } = { x: null, y: null };
    const pathSegments: PathSegment[] = [];

    function handleMouseMove(event: MouseEvent) {
      if (!ctx) return;

      if (lastMousePos.x && lastMousePos.y) {
        const jitterX = (Math.random() - 0.5) * 0.5;
        const jitterY = (Math.random() - 0.5) * 0.5;

        pathSegments.push({
          from: { x: lastMousePos.x + jitterX, y: lastMousePos.y + jitterY },
          to: { x: event.clientX + jitterX, y: event.clientY + jitterY },
          drawTime: 0,
        });
      }
      lastMousePos.x = event.clientX;
      lastMousePos.y = event.clientY;
    }

    let lastFrame;
    let animationRequestId = 0;

    function drawPath(timestamp: number) {
      ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      lastFrame ??= timestamp;

      const sinceLastFrame = timestamp - lastFrame;
      let removeUpTo = 0;
      let previousWidth = 2;

      pathSegments.forEach((segment) => {
        if (segment.drawTime > PATH_LIFESPAN) {
          removeUpTo += 1;
        } else {
          // eslint-disable-next-line no-param-reassign
          segment.drawTime += sinceLastFrame;
          const distanceFromLast = Math.sqrt(
            (segment.to.x - segment.from.x) ** 2 + (segment.to.y - segment.from.y) ** 2,
          );

          if (!ctx) return;

          // Vary line width based on pointer speed
          // Maximum one pixel difference to ensure smooth transition
          ctx.lineWidth = Math.max(2, Math.min(previousWidth + 1, distanceFromLast / 3));
          previousWidth = ctx.lineWidth;
          ctx.beginPath();
          ctx.moveTo(segment.from.x, segment.from.y);
          ctx.lineTo(segment.to.x, segment.to.y);
          ctx.stroke();
        }
      });
      pathSegments.splice(0, removeUpTo); // Remove old path segments

      lastFrame = timestamp;
      animationRequestId = requestAnimationFrame(drawPath);
    }

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    window.addEventListener('mousemove', handleMouseMove);
    animationRequestId = requestAnimationFrame(drawPath);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(animationRequestId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed w-screen h-screen pointer-events-none" />
  );
};

export default MouseTrail;
