import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const FadeText: React.FC<{ text: string; start: number; end: number; highlight?: boolean }> = ({
	text,
	start,
	end,
	highlight,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const adjustedStart = Math.max(0, frame - start);
	const opacityIn = interpolate(adjustedStart, [0, 20], [0, 1], { extrapolateRight: "clamp" });
	const opacityOut = interpolate(frame, [end - 20, end], [1, 0], { extrapolateRight: "clamp" });
	const opacity = Math.min(opacityIn, opacityOut);

	const y = interpolate(adjustedStart, [0, 30], [20, 0], { extrapolateRight: "clamp" });

	const scale = highlight ? spring({ frame: adjustedStart, fps, config: { damping: 14 } }) : 1;

	if (frame < start || frame > end + 20) return null;

	return (
		<div
			style={{
				position: "absolute",
				top: highlight ? "55%" : "45%",
				left: "50%",
				transform: `translate(-50%, -50%) translateY(${y}px) scale(${scale})`,
				opacity,
				fontFamily: FONT_FAMILY,
				fontSize: highlight ? "80px" : "48px",
				fontWeight: highlight ? "900" : "600",
				color: COLORS.dark,
				textAlign: "center",
				width: "100%",
			}}
		>
			{text}
		</div>
	);
};

export const Scene04WhyItMatters: React.FC = () => {
	return (
		<AbsoluteFill>
			<FadeText text="Because a birthday isn't really about the date." start={10} end={80} />

			<FadeText text="It's about making someone feel" start={90} end={160} />
			<FadeText text="REMEMBERED." start={105} end={160} highlight />

			<FadeText text="It's about making them feel like" start={170} end={260} />
			<FadeText text="THEY MATTER." start={185} end={260} highlight />
		</AbsoluteFill>
	);
};
