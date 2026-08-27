import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ChatBubble, TypingIndicator } from "../components/ChatBubble";

export const Scene01Chat: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Zooming in slightly as it gets more awkward
	const scale = spring({
		frame: Math.max(0, frame - 150),
		fps,
		config: { damping: 200, mass: 1 },
		from: 1,
		to: 1.15,
	});

	const fadeOut = interpolate(frame, [250, 270], [1, 0], { extrapolateRight: "clamp" });

	const messages = [
		{ text: "You forgot. 😐", sender: false, delay: 10 },
		{ text: "Forgot what?", sender: true, delay: 40 },
		{ text: "My birthday.", sender: false, delay: 70 },
		{ text: "I didn't forget...", sender: true, delay: 100 },
		{ text: "I just... lost track of the date. 😭", sender: true, delay: 130 },
		{ text: "It's the SAME date.\nEvery year.\nFor 25 years. 💀", sender: false, delay: 170 },
		{ text: "Okay but that's not helping.", sender: true, delay: 200 },
		{ text: "I'M LITERALLY THE ONE BORN ON IT. 😭", sender: false, delay: 220 },
		{ text: "Wow.", sender: true, delay: 240 },
	];

	// We move the container up as new messages arrive
	const containerTranslateY = interpolate(
		frame,
		[10, 40, 70, 100, 130, 170, 200, 220, 240],
		[0, -40, -80, -120, -180, -300, -360, -420, -460],
		{ extrapolateRight: "clamp", extrapolateLeft: "clamp" },
	);

	return (
		<AbsoluteFill style={{ opacity: fadeOut }}>
			<AbsoluteFill
				style={{ justifyContent: "center", alignItems: "center", transform: `scale(${scale})` }}
			>
				<div
					style={{
						width: "600px",
						display: "flex",
						flexDirection: "column",
						transform: `translateY(${containerTranslateY + 200}px)`,
					}}
				>
					{messages.map((msg, i) => (
						<React.Fragment key={i}>
							{!msg.sender && <TypingIndicator delay={msg.delay - 20} duration={20} />}
							<ChatBubble text={msg.text} isSender={msg.sender} delay={msg.delay} />
						</React.Fragment>
					))}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
