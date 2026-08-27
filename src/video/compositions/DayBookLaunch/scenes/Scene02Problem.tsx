import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const KineticText: React.FC<{ text: string; delay: number; y: number; scaleSize?: number }> = ({
	text,
	delay,
	y,
	scaleSize = 1,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const adjusted = Math.max(0, frame - delay);

	const opacity = interpolate(adjusted, [0, 10], [0, 1], { extrapolateRight: "clamp" });
	const scale = spring({ frame: adjusted, fps, config: { damping: 12 }, from: 0.8, to: scaleSize });

	// fade out globally at the end of the scene
	const sceneEndFade = interpolate(frame, [220, 240], [1, 0], { extrapolateRight: "clamp" });

	if (adjusted === 0) return null;

	return (
		<div
			style={{
				position: "absolute",
				top: `calc(50% + ${y}px)`,
				left: "50%",
				transform: `translate(-50%, -50%) scale(${scale})`,
				opacity: opacity * sceneEndFade,
				fontFamily: FONT_FAMILY,
				fontSize: "64px",
				fontWeight: "bold",
				color: COLORS.dark,
				textAlign: "center",
				width: "100%",
			}}
		>
			{text}
		</div>
	);
};

const FloatingItem: React.FC<{ text: string; delay: number; x: number; y: number }> = ({
	text,
	delay,
	x,
	y,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const adjusted = Math.max(0, frame - delay);

	const scale = spring({ frame: adjusted, fps, config: { damping: 12 } });
	const fadeOut = interpolate(frame, [130, 140], [1, 0], { extrapolateRight: "clamp" });

	if (adjusted === 0) return null;

	return (
		<div
			style={{
				position: "absolute",
				top: `calc(50% + ${y}px)`,
				left: `calc(50% + ${x}px)`,
				transform: `translate(-50%, -50%) scale(${scale})`,
				opacity: fadeOut,
				fontFamily: FONT_FAMILY,
				fontSize: "32px",
				color: COLORS.blue,
				backgroundColor: COLORS.white,
				padding: "16px 24px",
				borderRadius: "24px",
				boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
				fontWeight: "600",
			}}
		>
			{text}
		</div>
	);
};

export const Scene02Problem: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill>
			{frame < 60 && <KineticText text="Ever been there?" delay={5} y={0} />}

			{frame > 60 && frame < 110 && (
				<KineticText
					text="You didn't forget because you don't care."
					delay={60}
					y={-40}
					scaleSize={0.8}
				/>
			)}
			{frame > 75 && frame < 110 && (
				<KineticText text="You forgot because life got loud." delay={80} y={40} scaleSize={0.8} />
			)}

			{frame > 110 && frame < 140 && (
				<>
					<FloatingItem text="Mom's birthday" delay={110} x={-300} y={-150} />
					<FloatingItem text="Dad's birthday" delay={112} x={250} y={-150} />
					<FloatingItem text="Best friend" delay={114} x={-200} y={150} />
					<FloatingItem text="Cousin" delay={116} x={300} y={50} />
					<FloatingItem text="That one coworker" delay={118} x={0} y={-300} />
					<FloatingItem text="The gift you promised" delay={120} x={120} y={200} />
					<FloatingItem text="The little detail" delay={122} x={-400} y={0} />
				</>
			)}

			{frame > 140 && frame < 190 && (
				<>
					<KineticText text="Your brain wasn't built" delay={140} y={-60} />
					<KineticText text="to remember everyone." delay={155} y={20} />
				</>
			)}

			{frame > 190 && (
				<>
					<KineticText text="You care." delay={190} y={-40} scaleSize={1.2} />
					<KineticText
						text="You just can't remember everything."
						delay={205}
						y={60}
						scaleSize={0.8}
					/>
				</>
			)}
		</AbsoluteFill>
	);
};
