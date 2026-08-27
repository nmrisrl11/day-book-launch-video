import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

interface ChatBubbleProps {
	text: React.ReactNode;
	isSender: boolean;
	delay: number;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isSender, delay }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const adjustedFrame = Math.max(0, frame - delay);

	const scale = spring({
		frame: adjustedFrame,
		fps,
		config: { damping: 14, mass: 0.8 },
	});

	const opacity = interpolate(adjustedFrame, [0, 5], [0, 1], {
		extrapolateRight: "clamp",
	});

	const translateY = interpolate(adjustedFrame, [0, 10], [20, 0], {
		extrapolateRight: "clamp",
	});

	if (adjustedFrame === 0) return null;

	return (
		<div
			style={{
				alignSelf: isSender ? "flex-end" : "flex-start",
				backgroundColor: isSender ? COLORS.blue : COLORS.lightGray,
				color: isSender ? COLORS.white : COLORS.dark,
				padding: "16px 24px",
				borderRadius: "24px",
				borderBottomRightRadius: isSender ? "4px" : "24px",
				borderBottomLeftRadius: isSender ? "24px" : "4px",
				marginBottom: "12px",
				maxWidth: "70%",
				fontFamily: FONT_FAMILY,
				fontSize: "36px",
				lineHeight: "1.4",
				opacity,
				transform: `translateY(${translateY}px) scale(${scale})`,
				transformOrigin: isSender ? "bottom right" : "bottom left",
				boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
				// boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
			}}
		>
			{text}
		</div>
	);
};

export const TypingIndicator: React.FC<{ delay: number; duration: number }> = ({
	delay,
	duration,
}) => {
	const frame = useCurrentFrame();
	const adjustedFrame = frame - delay;

	if (adjustedFrame < 0 || adjustedFrame > duration) return null;

	const dot1 = Math.sin(adjustedFrame * 0.3) * 5;
	const dot2 = Math.sin((adjustedFrame - 2) * 0.3) * 5;
	const dot3 = Math.sin((adjustedFrame - 4) * 0.3) * 5;

	return (
		<div
			style={{
				alignSelf: "flex-start",
				backgroundColor: COLORS.lightGray,
				padding: "16px 24px",
				borderRadius: "24px",
				borderBottomLeftRadius: "4px",
				marginBottom: "12px",
				display: "flex",
				gap: "6px",
				alignItems: "center",
				height: "60px",
			}}
		>
			<div
				style={{
					width: 10,
					height: 10,
					borderRadius: "50%",
					backgroundColor: "#999",
					transform: `translateY(${dot1}px)`,
				}}
			/>
			<div
				style={{
					width: 10,
					height: 10,
					borderRadius: "50%",
					backgroundColor: "#999",
					transform: `translateY(${dot2}px)`,
				}}
			/>
			<div
				style={{
					width: 10,
					height: 10,
					borderRadius: "50%",
					backgroundColor: "#999",
					transform: `translateY(${dot3}px)`,
				}}
			/>
		</div>
	);
};
