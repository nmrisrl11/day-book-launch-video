import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DayBookLogo } from "../components/DayBookLogo";
import { Sparkles } from "../components/Sparkles";
import { COLORS } from "../constants";

export const Scene05Logo: React.FC = () => {
	const frame = useCurrentFrame();

	const opacityIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
	const fadeOut = interpolate(frame, [130, 150], [1, 0], { extrapolateRight: "clamp" });

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.white, opacity: Math.min(opacityIn, fadeOut) }}>
			<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
				{/* We re-render DayBookLogo and Sparkles to get that fresh interaction feeling */}
				<DayBookLogo style={{ position: "relative", zIndex: 10 }} />
				<Sparkles startFrame={15} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
