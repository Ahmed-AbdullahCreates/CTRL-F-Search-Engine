import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Point {
  x: number;
  y: number;
}

interface Circuit {
  start: Point;
  end: Point;
  points: Point[];
  progress: number;
  speed: number;
  color: string;
  width: number;
  pulse: boolean;
  pulseSpeed: number;
  pulseProgress: number;
  glowIntensity: number;
  colorShift: number;
  branchPoints: Point[];
  parentId?: number;
  id: number;
  isHighlighted: boolean;
}

interface Node {
  x: number;
  y: number;
  radius: number;
  pulseRadius: number;
  color: string;
  speed: number;
  progress: number;
  isConnection: boolean;
  connectedCircuits: number[];
  glowIntensity: number;
}

const circuitIdRef = { current: 0 };

export const CircuitAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const circuits: Circuit[] = [];
    const nodes: Node[] = [];
    const numCircuits = isMobile
      ? Math.floor(canvas.width / 200)
      : Math.floor(canvas.width / 120);

    const numNodes = isMobile
      ? Math.floor(canvas.width / 300)
      : Math.floor(canvas.width / 200);

    for (let i = 0; i < numCircuits; i++) {
      createCircuit(circuits, canvas);
    }

    for (let i = 0; i < numNodes; i++) {
      createNode(nodes, canvas);
    }

    createConnectionNodes(nodes, circuits, canvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHovering) {
        const gradient = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          200
        );
        gradient.addColorStop(0, 'rgba(51, 195, 240, 0.05)');
        gradient.addColorStop(1, 'rgba(51, 195, 240, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const proximityThreshold = 100;

      nodes.forEach((node, index) => {
        const dx = mousePos.x - node.x;
        const dy = mousePos.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (isHovering && distance < proximityThreshold) {
          node.glowIntensity = Math.max(0.2, 1 - distance / proximityThreshold);
        } else {
          node.glowIntensity = 0;
        }

        drawNode(ctx, node);
        node.progress += node.speed;

        if (node.progress >= 1) {
          nodes[index].progress = 0;
        }
      });

      circuits.forEach((circuit, index) => {
        let minDistance = Infinity;
        circuit.points.forEach((point) => {
          const dx = mousePos.x - point.x;
          const dy = mousePos.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            minDistance = distance;
          }
        });

        circuit.isHighlighted = isHovering && minDistance < proximityThreshold;

        circuit.colorShift = (circuit.colorShift + 0.002) % 1;

        if (circuit.isHighlighted) {
          circuit.glowIntensity = Math.max(
            0.2,
            1 - minDistance / proximityThreshold
          );
        } else {
          circuit.glowIntensity = 0;
        }

        drawCircuit(ctx, circuit);
        circuit.progress += circuit.speed * 0.5;

        if (circuit.pulse) {
          circuit.pulseProgress += circuit.pulseSpeed * 0.5;
          if (circuit.pulseProgress > 1) {
            circuit.pulseProgress = 0;
          }
        }

        if (circuit.progress >= 1) {
          if (
            Math.random() > 0.92 &&
            circuit.branchPoints.length > 0 &&
            circuits.length < 60
          ) {
            const branchPoint =
              circuit.branchPoints[
                Math.floor(Math.random() * circuit.branchPoints.length)
              ];
            const branch = createBranchCircuit(canvas, branchPoint, circuit.id);
            circuits.push(branch);
          }

          circuits[index] = createNewCircuit(canvas);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, mousePos, isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"
    />
  );
};

function createCircuit(circuits: Circuit[], canvas: HTMLCanvasElement): Circuit {
  const circuit = createNewCircuit(canvas);
  circuits.push(circuit);
  return circuit;
}

function createNewCircuit(canvas: HTMLCanvasElement): Circuit {
  const id = circuitIdRef.current++;

  const edgeMargin = 100;
  const start: Point = {
    x: Math.random() * (canvas.width - edgeMargin * 2) + edgeMargin,
    y: Math.random() * (canvas.height - edgeMargin * 2) + edgeMargin,
  };

  const end: Point = {
    x: Math.random() * (canvas.width - edgeMargin * 2) + edgeMargin,
    y: Math.random() * (canvas.height - edgeMargin * 2) + edgeMargin,
  };

  const points: Point[] = [start];
  let current = { ...start };

  const steps = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < steps; i++) {
    if (Math.random() > 0.5) {
      current = {
        x: current.x + (end.x - current.x) * (Math.random() * 0.5 + 0.25),
        y: current.y,
      };
    } else {
      current = {
        x: current.x,
        y: current.y + (end.y - current.y) * (Math.random() * 0.5 + 0.25),
      };
    }
    points.push({ ...current });
  }

  points.push(end);

  const branchPoints: Point[] = [];
  for (let i = 1; i < points.length - 1; i++) {
    if (Math.random() > 0.9) {
      branchPoints.push(points[i]);
    }
  }

  const hasPulse = Math.random() > 0.85;

  const hue = 195 + (Math.random() * 20 - 10);
  const saturation = 70 + Math.random() * 30;
  const lightness = 50 + Math.random() * 10;

  return {
    id,
    start,
    end,
    points,
    progress: 0,
    speed: Math.random() * 0.0015 + 0.0006,
    color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${
      Math.random() * 0.3 + 0.5
    })`,
    width: Math.random() * 1.5 + 0.5,
    pulse: hasPulse,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulseProgress: 0,
    glowIntensity: 0,
    colorShift: Math.random(),
    branchPoints,
    isHighlighted: false,
  };
}

function createBranchCircuit(
  canvas: HTMLCanvasElement,
  startPoint: Point,
  parentId: number
): Circuit {
  const id = circuitIdRef.current++;

  const endPoint: Point = {
    x: startPoint.x + (Math.random() * 200 - 100),
    y: startPoint.y + (Math.random() * 200 - 100),
  };

  endPoint.x = Math.max(50, Math.min(canvas.width - 50, endPoint.x));
  endPoint.y = Math.max(50, Math.min(canvas.height - 50, endPoint.y));

  const points: Point[] = [startPoint];
  let current = { ...startPoint };

  const steps = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < steps; i++) {
    if (Math.random() > 0.5) {
      current = {
        x: current.x + (endPoint.x - current.x) * (Math.random() * 0.5 + 0.3),
        y: current.y,
      };
    } else {
      current = {
        x: current.x,
        y: current.y + (endPoint.y - current.y) * (Math.random() * 0.5 + 0.3),
      };
    }
    points.push({ ...current });
  }

  points.push(endPoint);

  const branchPoints: Point[] = [];

  const hue = 195 + (Math.random() * 20 - 10);
  const saturation = 70 + Math.random() * 30;
  const lightness = 55 + Math.random() * 15;

  return {
    id,
    start: startPoint,
    end: endPoint,
    points,
    progress: 0,
    speed: Math.random() * 0.002 + 0.0008,
    color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${
      Math.random() * 0.5 + 0.5
    })`,
    width: Math.random() * 1.2 + 0.4,
    pulse: Math.random() > 0.5,
    pulseSpeed: Math.random() * 0.025 + 0.015,
    pulseProgress: 0,
    glowIntensity: 0,
    colorShift: Math.random(),
    branchPoints,
    parentId,
    isHighlighted: false,
  };
}

function createNode(nodes: Node[], canvas: HTMLCanvasElement) {
  const node: Node = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    pulseRadius: Math.random() * 20 + 10,
    color: `rgba(51, 195, 240, ${Math.random() * 0.4 + 0.2})`,
    speed: Math.random() * 0.01 + 0.005,
    progress: Math.random(),
    isConnection: false,
    connectedCircuits: [],
    glowIntensity: 0,
  };

  nodes.push(node);
  return node;
}

function createConnectionNodes(
  nodes: Node[],
  circuits: Circuit[],
  canvas: HTMLCanvasElement
) {
  if (circuits.length < 2) return;

  const numConnections = Math.min(
    Math.floor(Math.random() * 4) + 2,
    Math.floor(circuits.length / 2)
  );

  for (let i = 0; i < numConnections; i++) {
    const circuit1Index = Math.floor(Math.random() * circuits.length);
    let circuit2Index;

    do {
      circuit2Index = Math.floor(Math.random() * circuits.length);
    } while (circuit2Index === circuit1Index);

    const circuit1 = circuits[circuit1Index];
    const circuit2 = circuits[circuit2Index];

    const point1Index =
      Math.floor(Math.random() * (circuit1.points.length - 1)) + 1;
    const point2Index =
      Math.floor(Math.random() * (circuit2.points.length - 1)) + 1;

    const point1 = circuit1.points[point1Index];
    const point2 = circuit2.points[point2Index];

    const connectionPoint = {
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2,
    };

    const connectionNode: Node = {
      x: connectionPoint.x,
      y: connectionPoint.y,
      radius: Math.random() * 3 + 2,
      pulseRadius: Math.random() * 25 + 15,
      color: `rgba(51, 220, 255, ${Math.random() * 0.5 + 0.3})`,
      speed: Math.random() * 0.008 + 0.004,
      progress: Math.random(),
      isConnection: true,
      connectedCircuits: [circuit1.id, circuit2.id],
      glowIntensity: 0,
    };

    nodes.push(connectionNode);
  }
}

function drawNode(ctx: CanvasRenderingContext2D, node: Node) {
  const {
    x,
    y,
    radius,
    pulseRadius,
    color,
    progress,
    isConnection,
    glowIntensity,
  } = node;

  if (glowIntensity > 0) {
    ctx.beginPath();
    const glow = ctx.createRadialGradient(x, y, radius, x, y, radius * 8);
    glow.addColorStop(0, `rgba(51, 195, 240, ${0.2 * glowIntensity})`);
    glow.addColorStop(1, 'rgba(51, 195, 240, 0)');
    ctx.fillStyle = glow;
    ctx.arc(x, y, radius * 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);

  ctx.fillStyle = color;
  ctx.fill();

  const pulseSize = radius + (pulseRadius - radius) * progress;
  const pulseOpacity = (1 - progress) * (isConnection ? 0.6 : 0.5);

  ctx.beginPath();
  ctx.arc(x, y, pulseSize, 0, Math.PI * 2);

  if (isConnection) {
    ctx.fillStyle = `rgba(51, 220, 255, ${pulseOpacity})`;
  } else {
    ctx.fillStyle = `rgba(51, 195, 240, ${pulseOpacity})`;
  }

  ctx.fill();

  if (isConnection) {
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(51, 220, 255, 0.6)`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

function drawCircuit(ctx: CanvasRenderingContext2D, circuit: Circuit) {
  const {
    points,
    progress,
    width,
    pulse,
    pulseProgress,
    glowIntensity,
    colorShift,
    isHighlighted,
  } = circuit;

  const hue = 195 + Math.sin(colorShift * Math.PI * 2) * 15;
  const saturation = 70 + Math.sin(colorShift * Math.PI * 4) * 10;
  const lightness = isHighlighted ? 60 : 50;
  const opacity = isHighlighted ? 0.9 : 0.7;

  const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;

  if (glowIntensity > 0) {
    ctx.shadowColor = `rgba(51, 195, 240, ${glowIntensity})`;
    ctx.shadowBlur = 10;
  } else {
    ctx.shadowBlur = 0;
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  let totalLength = 0;
  const segments: number[] = [];

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const segmentLength = Math.sqrt(dx * dx + dy * dy);
    segments.push(segmentLength);
    totalLength += segmentLength;
  }

  let currentLength = 0;
  let drawLength = totalLength * progress;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const segmentLength = segments[i - 1];

    if (currentLength + segmentLength <= drawLength) {
      ctx.lineTo(p2.x, p2.y);
      currentLength += segmentLength;
    } else {
      const remainingLength = drawLength - currentLength;
      const ratio = remainingLength / segmentLength;
      const x = p1.x + (p2.x - p1.x) * ratio;
      const y = p1.y + (p2.y - p1.y) * ratio;
      ctx.lineTo(x, y);
      break;
    }
  }

  ctx.stroke();
  ctx.shadowBlur = 0;

  points.forEach((point, index) => {
    const pointProgress = index / (points.length - 1);
    if (progress >= pointProgress) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, width + 1, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  });

  if (pulse && progress > 0.1) {
    let pulsePosition = pulseProgress;
    let pulsePoint: Point | null = null;

    let lengthSum = 0;
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      const segLength = segments[i - 1];
      const segmentRatio = segLength / totalLength;

      if (lengthSum <= pulsePosition && pulsePosition <= lengthSum + segmentRatio) {
        const ratio = (pulsePosition - lengthSum) / segmentRatio;
        pulsePoint = {
          x: p1.x + (p2.x - p1.x) * ratio,
          y: p1.y + (p2.y - p1.y) * ratio,
        };
        break;
      }

      lengthSum += segmentRatio;
    }

    if (pulsePoint && pulsePosition <= progress) {
      const pulseHue = hue + 10;

      const pulseGlow = ctx.createRadialGradient(
        pulsePoint.x,
        pulsePoint.y,
        0,
        pulsePoint.x,
        pulsePoint.y,
        width * 6
      );

      pulseGlow.addColorStop(0, `hsla(${pulseHue}, 100%, 70%, 0.8)`);
      pulseGlow.addColorStop(1, `hsla(${pulseHue}, 100%, 70%, 0)`);

      ctx.beginPath();
      ctx.fillStyle = pulseGlow;
      ctx.arc(pulsePoint.x, pulsePoint.y, width * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pulsePoint.x, pulsePoint.y, width * 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${pulseHue}, 100%, 70%, 0.8)`;
      ctx.fill();
    }
  }
}
