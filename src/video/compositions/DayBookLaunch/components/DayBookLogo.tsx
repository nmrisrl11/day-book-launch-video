import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const DayBookLogo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// 1. Appear softly (opacity)
	const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

	// 2-5. Scale, Squash, Stretch, Bounce, Jelly
	// We can use a custom spring or keyframe approach
	// Let's use a spring for the overall scale
	const scale = spring({
		frame,
		fps,
		config: {
			damping: 10,
			mass: 0.5,
			stiffness: 100,
		},
	});

	// Squash and stretch can be done via scaleX and scaleY using interpolate
	const squashX = interpolate(frame, [5, 12, 18, 25, 35], [1, 1.1, 0.95, 1.02, 1], {
		extrapolateRight: "clamp",
		extrapolateLeft: "clamp",
	});

	const squashY = interpolate(frame, [5, 12, 18, 25, 35], [1, 0.9, 1.05, 0.98, 1], {
		extrapolateRight: "clamp",
		extrapolateLeft: "clamp",
	});

	const currentScaleX = scale * squashX;
	const currentScaleY = scale * squashY;

	return (
		<div
			style={{
				...style,
				opacity,
				transform: `scale(${currentScaleX}, ${currentScaleY})`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Img
				src={staticFile("branding-logos/daybook-logo-dark.svg")}
				style={{ width: "300px", height: "auto" }}
			/>
		</div>
	);
};
