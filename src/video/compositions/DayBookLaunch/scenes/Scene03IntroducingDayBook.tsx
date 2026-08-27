import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DayBookLogo } from "../components/DayBookLogo";
import { COLORS, FONT_FAMILY } from "../constants";
import { Sparkles } from "../components/Sparkles";

export const Scene03IntroducingDayBook: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const bgBlobScale = spring({
		frame,
		fps,
		config: { damping: 100, mass: 2 },
		from: 0,
		to: 4,
	});

	const logoY = interpolate(frame, [0, 20, 60], [100, 0, -80], { extrapolateRight: "clamp" });
	const textOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" });

	const fadeOut = interpolate(frame, [130, 150], [1, 0], { extrapolateRight: "clamp" });

	return (
		<AbsoluteFill style={{ opacity: fadeOut }}>
			{/* Expanding blob that covers previous scene */}
			<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
				<div
					style={{
						width: "800px",
						height: "800px",
						borderRadius: "50%",
						backgroundColor: COLORS.white,
						transform: `scale(${bgBlobScale})`,
					}}
				/>
			</AbsoluteFill>

			<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						transform: `translateY(${logoY}px)`,
					}}
				>
					<div style={{ position: "relative" }}>
						<DayBookLogo />
						<Sparkles startFrame={20} />
					</div>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							opacity: textOpacity,
							fontFamily: FONT_FAMILY,
							textAlign: "center",
							gap: "16px",
							marginTop: "40px",
						}}
					>
						<div style={{ fontSize: "64px", fontWeight: "bold", color: COLORS.dark }}>
							Meet DayBook
						</div>
						<div
							style={{
								fontSize: "36px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							Your personal people manager
						</div>
						<div style={{ fontSize: "28px", color: "#666", maxWidth: "600px", lineHeight: "1.4" }}>
							Birthdays, relationships, and the little things that make people special.
						</div>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
