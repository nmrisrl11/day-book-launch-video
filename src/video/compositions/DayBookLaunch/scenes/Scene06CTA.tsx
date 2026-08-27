import React from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from "remotion";
import { DayBookLogo } from "../components/DayBookLogo";
import { COLORS, FONT_FAMILY } from "../constants";
import { Sparkles } from "../components/Sparkles";

export const Scene06CTA: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacityIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
	const contentY = interpolate(frame, [0, 30], [20, 0], { extrapolateRight: "clamp" });
	const ctaScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14 } });

	// Pointer Animation
	const pointerX = interpolate(frame, [70, 90], [500, 30], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const pointerY = interpolate(frame, [70, 90], [400, 10], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const pointerOpacity =
		interpolate(frame, [60, 70], [0, 1], { extrapolateRight: "clamp" }) *
		interpolate(frame, [130, 140], [1, 0], { extrapolateRight: "clamp" });

	// Click interaction on URL
	const clickScale = interpolate(frame, [100, 105, 115, 120], [1, 0.95, 0.95, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Closing Animation (2 seconds)
	const closingCircleScale = interpolate(frame, [160, 220], [0, 2.5], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.inOut(Easing.cubic),
	});

	return (
		<AbsoluteFill style={{ opacity: opacityIn, justifyContent: "center", alignItems: "center" }}>
			<div
				style={{
					transform: `translateY(${contentY}px)`,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "24px",
					position: "relative",
				}}
			>
				<div style={{ position: "relative" }}>
					<DayBookLogo />
					<Sparkles startFrame={20} />
				</div>

				<div
					style={{
						fontFamily: FONT_FAMILY,
						fontSize: "40px",
						fontWeight: "900",
						color: COLORS.dark,
						transform: `scale(${ctaScale})`,
					}}
				>
					Remember the people you love
				</div>

				<div
					style={{
						fontFamily: FONT_FAMILY,
						fontSize: "32px",
						fontWeight: "600",
						opacity: interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp" }),
					}}
				>
					Try DayBook today!
				</div>

				<div style={{ position: "relative" }}>
					<div
						style={{
							fontFamily: FONT_FAMILY,
							fontSize: "28px",
							fontWeight: "500",
							color: COLORS.white,
							opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" }),
							backgroundColor: COLORS.dark,
							padding: "16px 32px",
							borderRadius: "100px",
							transform: `scale(${clickScale})`,
						}}
					>
						day-book-app.vercel.app
					</div>

					{/* Pointer */}
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: `translate(calc(-50% + ${pointerX}px), calc(-50% + ${pointerY}px))`,
							opacity: pointerOpacity,
							zIndex: 50,
							pointerEvents: "none",
						}}
					>
						{/* SVG Cursor */}
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))" }}
						>
							<path
								d="M4.5 3L20 12.5L13.5 14L16 20L13 21.5L10.5 15.5L5 19V3Z"
								fill="white"
								stroke="black"
								strokeWidth="1.5"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Closing Circle Transition */}
			{frame >= 160 && (
				<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
					<div
						style={{
							width: "1000px",
							height: "1000px",
							borderRadius: "50%",
							backgroundColor: COLORS.white,
							transform: `scale(${closingCircleScale})`,
						}}
					/>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};
