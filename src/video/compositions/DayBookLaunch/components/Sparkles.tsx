import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface SparkleProps {
	delay: number;
	x: number;
	y: number;
	size: number;
}

const Sparkle: React.FC<SparkleProps> = ({ delay, x, y, size }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const adjustedFrame = Math.max(0, frame - delay);

	const scale = spring({
		frame: adjustedFrame,
		fps,
		config: { damping: 12 },
		durationInFrames: 15,
	});

	const opacity = interpolate(adjustedFrame, [0, 10, 20], [0, 1, 0], {
		extrapolateRight: "clamp",
	});

	const translateY = interpolate(adjustedFrame, [0, 20], [0, -20], {
		extrapolateRight: "clamp",
	});

	const translateX = interpolate(adjustedFrame, [0, 20], [0, x > 0 ? 10 : -10], {
		extrapolateRight: "clamp",
	});

	if (adjustedFrame === 0) return null;

	return (
		<div
			style={{
				position: "absolute",
				top: `calc(50% + ${y}px)`,
				left: `calc(50% + ${x}px)`,
				width: size,
				height: size,
				backgroundColor: COLORS.brand,
				borderRadius: "50%",
				opacity,
				transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
			}}
		/>
	);
};

export const Sparkles: React.FC<{ startFrame: number }> = ({ startFrame }) => {
	const frame = useCurrentFrame();
	if (frame < startFrame) return null;

	return (
		<AbsoluteFill>
			<Sparkle delay={startFrame} x={120} y={-40} size={8} />
			<Sparkle delay={startFrame + 3} x={-120} y={-30} size={6} />
			<Sparkle delay={startFrame + 6} x={140} y={20} size={6} />
			<Sparkle delay={startFrame + 2} x={-140} y={10} size={8} />
		</AbsoluteFill>
	);
};
