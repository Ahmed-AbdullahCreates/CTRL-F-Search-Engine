import React, { useEffect, useRef } from 'react';
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
}

interface Node {
  x: number;
  y: number;
  radius: number;
  pulseRadius: number;
  color: string;
  speed: number;
  progress: number;
}

export const CircuitAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Circuit parameters
    const circuits: Circuit[] = [];
    const nodes: Node[] = [];
    const numCircuits = isMobile ? 
      Math.floor(canvas.width / 200) : 
      Math.floor(canvas.width / 120); // Adjust density based on device
    
    const numNodes = isMobile ?
      Math.floor(canvas.width / 300) :
      Math.floor(canvas.width / 200);
    
    // Create initial circuits
    for (let i = 0; i < numCircuits; i++) {
      createCircuit(circuits, canvas);
    }
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      createNode(nodes, canvas);
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach((node, index) => {
        drawNode(ctx, node);
        node.progress += node.speed;
        
        // Reset node pulse
        if (node.progress >= 1) {
          nodes[index].progress = 0;
        }
      });
      
      // Update and draw circuits
      circuits.forEach((circuit, index) => {
        drawCircuit(ctx, circuit);
        circuit.progress += circuit.speed;
        
        // Update pulse progress
        if (circuit.pulse) {
          circuit.pulseProgress += circuit.pulseSpeed;
          if (circuit.pulseProgress > 1) {
            circuit.pulseProgress = 0;
          }
        }
        
        // Replace completed circuits
        if (circuit.progress >= 1) {
          circuits[index] = createNewCircuit(canvas);
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"
    />
  );
};

// Helper functions
function createCircuit(circuits: Circuit[], canvas: HTMLCanvasElement): Circuit {
  const circuit = createNewCircuit(canvas);
  circuits.push(circuit);
  return circuit;
}

function createNewCircuit(canvas: HTMLCanvasElement): Circuit {
  // Random start and end points
  const edgeMargin = 100;
  const start: Point = {
    x: Math.random() * (canvas.width - edgeMargin * 2) + edgeMargin,
    y: Math.random() * (canvas.height - edgeMargin * 2) + edgeMargin
  };
  
  const end: Point = {
    x: Math.random() * (canvas.width - edgeMargin * 2) + edgeMargin,
    y: Math.random() * (canvas.height - edgeMargin * 2) + edgeMargin
  };
  
  // Generate path points (Manhattan-style paths with right angles)
  const points: Point[] = [start];
  let current = { ...start };
  
  // Add 1-3 intermediate points
  const steps = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < steps; i++) {
    if (Math.random() > 0.5) {
      // Move horizontally
      current = { x: current.x + (end.x - current.x) * (Math.random() * 0.5 + 0.25), y: current.y };
    } else {
      // Move vertically
      current = { x: current.x, y: current.y + (end.y - current.y) * (Math.random() * 0.5 + 0.25) };
    }
    points.push({ ...current });
  }
  
  points.push(end);
  
  // Determine if this circuit will have a pulse effect
  const hasPulse = Math.random() > 0.7;
  
  return {
    start,
    end,
    points,
    progress: 0,
    speed: Math.random() * 0.005 + 0.002, // Random speed
    color: `rgba(51, 195, 240, ${Math.random() * 0.4 + 0.6})`, // Random opacity
    width: Math.random() * 1.5 + 0.5, // Random line width
    pulse: hasPulse,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulseProgress: 0
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
    progress: Math.random() // Random initial progress
  };
  
  nodes.push(node);
  return node;
}

function drawNode(ctx: CanvasRenderingContext2D, node: Node) {
  const { x, y, radius, pulseRadius, color, progress } = node;
  
  // Draw main node
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  
  // Draw pulse effect
  const pulseSize = radius + (pulseRadius - radius) * progress;
  const pulseOpacity = (1 - progress) * 0.5;
  
  ctx.beginPath();
  ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(51, 195, 240, ${pulseOpacity})`;
  ctx.fill();
}

function drawCircuit(ctx: CanvasRenderingContext2D, circuit: Circuit) {
  const { points, progress, color, width, pulse, pulseProgress } = circuit;
  
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Calculate total path length
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
  
  // Draw path up to current progress
  let currentLength = 0;
  let drawLength = totalLength * progress;
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const segmentLength = segments[i - 1];
    
    if (currentLength + segmentLength <= drawLength) {
      // Draw complete segment
      ctx.lineTo(p2.x, p2.y);
      currentLength += segmentLength;
    } else {
      // Draw partial segment
      const remainingLength = drawLength - currentLength;
      const ratio = remainingLength / segmentLength;
      const x = p1.x + (p2.x - p1.x) * ratio;
      const y = p1.y + (p2.y - p1.y) * ratio;
      ctx.lineTo(x, y);
      break;
    }
  }
  
  ctx.stroke();
  
  // Draw connection points
  points.forEach((point, index) => {
    const pointProgress = index / (points.length - 1);
    if (progress >= pointProgress) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, width + 1, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  });
  
  // Draw pulse traveling along completed path if pulse is enabled
  if (pulse && progress > 0.1) {
    let pulsePosition = pulseProgress;
    let pulsePoint: Point | null = null;
    
    // Find pulse position
    let lengthSum = 0;
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      const segLength = segments[i - 1];
      const segmentRatio = segLength / totalLength;
      
      if (lengthSum <= pulsePosition && pulsePosition <= lengthSum + segmentRatio) {
        // Pulse is on this segment
        const ratio = (pulsePosition - lengthSum) / segmentRatio;
        pulsePoint = {
          x: p1.x + (p2.x - p1.x) * ratio,
          y: p1.y + (p2.y - p1.y) * ratio
        };
        break;
      }
      
      lengthSum += segmentRatio;
    }
    
    // Draw pulse if within completed path
    if (pulsePoint && pulsePosition <= progress) {
      ctx.beginPath();
      ctx.arc(pulsePoint.x, pulsePoint.y, width * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(51, 195, 240, 0.8)`;
      ctx.fill();
    }
  }
}
