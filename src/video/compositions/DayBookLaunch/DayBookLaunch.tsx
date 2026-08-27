import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { Scene01Chat } from "./scenes/Scene01Chat";
import { Scene02Problem } from "./scenes/Scene02Problem";
import { Scene03IntroducingDayBook } from "./scenes/Scene03IntroducingDayBook";
import { Scene03Features } from "./scenes/Scene03Features";
import { Scene04WhyItMatters } from "./scenes/Scene04WhyItMatters";
import { Scene06CTA } from "./scenes/Scene06CTA";
import { COLORS } from "./constants";

export const DayBookLaunch: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.white,
				translate: "-2px 0px",
			}}
		>
			<Img
				src={staticFile("assets/background/bg-v3.svg")} // Ensure this matches your exact filename
				style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}
			/>

			<Sequence durationInFrames={270}>
				<Scene01Chat />
			</Sequence>

			<Sequence from={270} durationInFrames={240}>
				<Scene02Problem />
			</Sequence>

			<Sequence from={510} durationInFrames={150}>
				<Scene03IntroducingDayBook />
			</Sequence>

			<Sequence from={660} durationInFrames={650}>
				<Scene03Features />
			</Sequence>

			<Sequence from={1310} durationInFrames={300}>
				<Scene04WhyItMatters />
			</Sequence>

			<Sequence from={1610} durationInFrames={240}>
				<Scene06CTA />
			</Sequence>
		</AbsoluteFill>
	);
};
