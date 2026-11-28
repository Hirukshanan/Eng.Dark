import { useEffect, useRef } from 'react';

function NeuralField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = canvas.parentElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let particles = [];

    const pointer = {
      x: 0,
      y: 0,
      active: false
    };

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    // Responsive canvas and particle density

    function resize() {
      width = frame.clientWidth;
      height = frame.clientHeight;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particleCount = Math.min(
        180,
        Math.max(
          45,
          Math.floor((width * height) / 9500)
        )
      );

      particles = Array.from(
        { length: particleCount },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 1
        })
      );

      draw(false);
    }

    // Render particles

    function draw(animate = true) {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) {
            p.vx *= -1;
            p.x = Math.max(0, Math.min(width, p.x));
          }

          if (p.y < 0 || p.y > height) {
            p.vy *= -1;
            p.y = Math.max(0, Math.min(height, p.y));
          }
        }
      });

      // Connections between particles

      const connectionDistance = 125;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

          const a = particles[i];
          const b = particles[j];

          const distance = Math.hypot(
            a.x - b.x,
            a.y - b.y
          );

          if (distance < connectionDistance) {
            ctx.beginPath();

            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle =
              `rgba(179,154,255,${
                0.45 * (1 - distance / connectionDistance)
              })`;

            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Mouse-responsive neural connections

      particles.forEach(p => {
        let proximity = 0;

        if (
          pointer.active &&
          !reducedMotion.matches
        ) {
          const distance = Math.hypot(
            p.x - pointer.x,
            p.y - pointer.y
          );

          const mouseRadius = 180;

          if (distance < mouseRadius) {
            proximity = 1 - distance / mouseRadius;

            ctx.beginPath();

            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);

            ctx.strokeStyle =
              `rgba(89,227,239,${proximity * 0.95})`;

            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        ctx.beginPath();

        ctx.arc(
          p.x,
          p.y,
          p.size + proximity * 2.5,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          proximity > 0
            ? '#59e3ef'
            : '#b39aff';

        ctx.fill();
      });
    }

    // Animation loop

    function animate() {
      draw(true);
      animationId = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(animationId);

      if (
        !document.hidden &&
        !reducedMotion.matches
      ) {
        animationId = requestAnimationFrame(animate);
      } else {
        draw(false);
      }
    }

    // Global mouse movement

    function handlePointerMove(event) {
      if (
        event.pointerType === 'touch' ||
        reducedMotion.matches
      ) return;

      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function handlePointerOut(event) {
      if (!event.relatedTarget) {
        handlePointerLeave();
      }
    }

    // Listen to the entire browser window

    window.addEventListener(
      'pointermove',
      handlePointerMove
    );

    window.addEventListener(
      'pointerout',
      handlePointerOut
    );

    window.addEventListener(
      'pointercancel',
      handlePointerLeave
    );

    window.addEventListener(
      'blur',
      handlePointerLeave
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);

    document.addEventListener(
      'visibilitychange',
      syncAnimation
    );

    reducedMotion.addEventListener(
      'change',
      syncAnimation
    );

    resize();
    syncAnimation();

    // Cleanup

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();

      window.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      window.removeEventListener(
        'pointerout',
        handlePointerOut
      );

      window.removeEventListener(
        'pointercancel',
        handlePointerLeave
      );

      window.removeEventListener(
        'blur',
        handlePointerLeave
      );

      document.removeEventListener(
        'visibilitychange',
        syncAnimation
      );

      reducedMotion.removeEventListener(
        'change',
        syncAnimation
      );
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-field"
      aria-hidden="true"
    />
  );
}

export default NeuralField;