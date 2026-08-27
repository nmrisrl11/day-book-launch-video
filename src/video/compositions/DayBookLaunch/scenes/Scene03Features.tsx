import React from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const SyncArrowPiece: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
	<svg viewBox="8 8 104 60" style={style} xmlns="http://www.w3.org/2000/svg">
		<path
			d="m16 64c0 2.209-1.791 4-4 4s-4-1.791-4-4c0-30.879 25.121-56 56-56 15.391 0 29.632 6.133 40 16.693v-12.693c0-2.209 1.791-4 4-4s4 1.791 4 4v24c0 2.209-1.791 4-4 4h-24c-2.209 0-4-1.791-4-4s1.791-4 4-4h15.908c-8.975-10.096-21.886-16-35.908-16-26.467 0-48 21.533-48 48z"
			fill={COLORS.dark}
		/>
	</svg>
);

const FeatureSlide: React.FC<{
	title: string;
	subtitle: string;
	startFrame: number;
	endFrame: number;
	children: React.ReactNode;
}> = ({ title, subtitle, startFrame, endFrame, children }) => {
	const frame = useCurrentFrame();

	const adjusted = Math.max(0, frame - startFrame);
	const isVisible = frame >= startFrame && frame < endFrame + 20;

	const y = interpolate(adjusted, [0, 20], [40, 0], { extrapolateRight: "clamp" });
	const opacityIn = interpolate(adjusted, [0, 20], [0, 1], { extrapolateRight: "clamp" });
	const opacityOut = interpolate(frame, [endFrame - 20, endFrame], [1, 0], {
		extrapolateRight: "clamp",
	});
	const opacity = Math.min(opacityIn, opacityOut);

	if (!isVisible) return null;

	return (
		<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
			<div
				style={{
					transform: `translateY(${y}px)`,
					textAlign: "center",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h2
					style={{
						fontSize: "64px",
						fontWeight: "bold",
						color: COLORS.dark,
						margin: "0 0 16px 0",
						fontFamily: FONT_FAMILY,
					}}
				>
					{title}
				</h2>
				<p
					style={{
						fontSize: "36px",
						margin: "0 0 48px 0",
						fontFamily: FONT_FAMILY,
						fontWeight: "600",
					}}
				>
					{subtitle}
				</p>
				<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>{children}</div>
			</div>
		</AbsoluteFill>
	);
};

const BirthdayCard: React.FC<{
	delay: number;
	avatar: string;
	name: string;
	date: string;
	age: string;
	countdown: string;
}> = ({ delay, avatar, name, date, age, countdown }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const springProgress = spring({
		frame: Math.max(0, frame - delay),
		fps,
		config: { damping: 14, mass: 0.8 },
	});

	const badgeProgress = spring({
		frame: Math.max(0, frame - (delay + 15)),
		fps,
		config: { damping: 12, mass: 0.6 },
	});

	const scale = interpolate(springProgress, [0, 1], [0.92, 1]);
	const translateY = interpolate(springProgress, [0, 1], [20, 0]);
	const rotateStart = name.length % 2 === 0 ? 2 : -2;
	const rotate = interpolate(springProgress, [0, 1], [rotateStart, 0]);
	const opacity = interpolate(frame - delay, [0, 5], [0, 1], {
		extrapolateRight: "clamp",
		extrapolateLeft: "clamp",
	});

	const badgeScale = interpolate(badgeProgress, [0, 1], [0.5, 1]);
	const badgeOpacity = interpolate(badgeProgress, [0, 0.5], [0, 1], {
		extrapolateRight: "clamp",
		extrapolateLeft: "clamp",
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: COLORS.white,
				padding: "50px 24px 32px 24px",
				borderRadius: "24px",
				boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
				border: `1px solid ${COLORS.grayBorder}`,
				fontFamily: FONT_FAMILY,
				minWidth: "220px",
				opacity,
				transform: `scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`,
				position: "relative",
				marginTop: "40px",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: "-40px",
					width: "80px",
					height: "80px",
					borderRadius: "50%",
					overflow: "hidden",
					backgroundColor: COLORS.white,
					border: `4px solid ${COLORS.white}`,
					boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Img
					src={staticFile(avatar)}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
				/>
			</div>
			<div
				style={{ fontSize: "24px", fontWeight: "bold", color: COLORS.dark, marginBottom: "4px" }}
			>
				{name}
			</div>
			<div style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>{date}</div>
			<div
				style={{
					backgroundColor: "#F3F4F6",
					color: COLORS.dark,
					padding: "8px 16px",
					borderRadius: "100px",
					fontSize: "14px",
					fontWeight: "700",
					transform: `scale(${badgeScale})`,
					opacity: badgeOpacity,
				}}
			>
				{age} {countdown}
			</div>
		</div>
	);
};

const Card: React.FC<{
	delay: number;
	text: string;
	subtext?: string;
	rotate?: number;
	x?: number;
	y?: number;
}> = ({ delay, text, subtext, rotate = 0, x, y }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const adjusted = Math.max(0, frame - delay);

	const scale = spring({ frame: adjusted, fps, config: { damping: 14 } });

	// if (adjusted === 0) return null;

	const isAbsolute = x !== undefined || y !== undefined;
	const posX = x ?? 0;
	const posY = y ?? 0;

	return (
		<div
			style={{
				position: isAbsolute ? "absolute" : "relative",
				top: isAbsolute ? `calc(50% + ${posY}px)` : "auto",
				left: isAbsolute ? `calc(50% + ${posX}px)` : "auto",
				transform: isAbsolute
					? `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`
					: `scale(${scale}) rotate(${rotate}deg)`,
				backgroundColor: COLORS.white,
				padding: "24px 32px",
				borderRadius: "24px",
				boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
				border: `1px solid ${COLORS.grayBorder}`,
				fontFamily: FONT_FAMILY,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "8px",
				margin: isAbsolute ? 0 : "0 16px",
				width: "max-content",
			}}
		>
			<div style={{ fontSize: "32px", fontWeight: "bold", color: COLORS.dark }}>{text}</div>
			{subtext && (
				<div
					style={{
						backgroundColor: COLORS.blue,
						color: COLORS.white,
						padding: "8px 16px",
						borderRadius: "100px",
						fontSize: "20px",
						fontWeight: "600",
					}}
				>
					{subtext}
				</div>
			)}
		</div>
	);
};

export const Scene03Features: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill>
			{/* Feature 1: Birthdays */}
			<FeatureSlide
				title="Never miss a birthday"
				subtitle="See what's coming before it's too late!"
				startFrame={0}
				endFrame={100}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "32px",
						marginTop: "16px",
						transform: "scale(1.1)",
					}}
				>
					<BirthdayCard
						delay={10}
						avatar="assets/avatars/avatar1.svg"
						name="Alex"
						date="August 31"
						age="Turning 28"
						countdown="in 5 days"
					/>
					<BirthdayCard
						delay={20}
						avatar="assets/avatars/avatar2.svg"
						name="Mia"
						date="September 4"
						age="Turning 25"
						countdown="in 9 days"
					/>
					<BirthdayCard
						delay={30}
						avatar="assets/avatars/avatar3.svg"
						name="Sam"
						date="November 19"
						age="Turning 26"
						countdown="in 84 days"
					/>
				</div>
			</FeatureSlide>

			{/* Feature 2: Relationships */}
			<FeatureSlide
				title="Remember who they are"
				subtitle="Not just when they were born, but who they are to you."
				startFrame={100}
				endFrame={200}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginTop: "16px",
						transform: "scale(1.1)",
					}}
				>
					<Card delay={110} text="Alex" subtext="Friend" rotate={-5} />
					<Card delay={115} text="Mia" subtext="Family" rotate={0} />
					<Card delay={120} text="Sam" subtext="Colleague" rotate={5} />
				</div>
			</FeatureSlide>

			{/* Feature 3: Little things */}
			<FeatureSlide
				title="Remember the little things"
				subtitle="Because the right gift feels personal."
				startFrame={200}
				endFrame={310}
			>
				<div style={{ position: "relative", width: "1000px", height: "400px" }}>
					<Card delay={210} text="Obsessed with matcha 🍵" x={-250} y={-120} rotate={-6} />
					<Card delay={250} text="Started a new job 💼" x={300} y={-80} rotate={10} />
					<Card delay={220} text="Hates surprises 😅" x={-50} y={0} rotate={0} />
					<Card delay={230} text="Gift idea: headphones 🎧" x={-250} y={120} rotate={4} />
					<Card delay={240} text="Loves painting 🎨" x={300} y={120} rotate={-8} />
				</div>
			</FeatureSlide>

			{/* Feature 4: Share Link */}
			<FeatureSlide
				title="Invite someone to share their birthday"
				subtitle="No awkward asking. Just send them a link."
				startFrame={310}
				endFrame={410}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "24px",
						marginTop: "32px",
						alignItems: "center",
						transform: "scale(1.2)",
					}}
				>
					<Card delay={320} text="When's your bday? 😳" rotate={-4} />

					<div
						style={{
							width: "80px",
							height: "60px",
							margin: "0 16px",
							opacity: interpolate(frame, [325, 330], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							}),
						}}
					>
						<svg
							height="100%"
							viewBox="0 -32 426.66667 426"
							width="100%"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="m213.332031 181.667969c0 4.265625-1.277343 8.53125-3.625 11.730469l-106.667969 160c-3.839843 5.761718-10.238281 9.601562-17.707031 9.601562h-64c-11.730469 0-21.332031-9.601562-21.332031-21.332031 0-4.269531 1.28125-8.535157 3.625-11.734375l98.773438-148.265625-98.773438-148.269531c-2.34375-3.199219-3.625-7.464844-3.625-11.730469 0-11.734375 9.601562-21.335938 21.332031-21.335938h64c7.46875 0 13.867188 3.839844 17.707031 9.601563l106.667969 160c2.347657 3.199218 3.625 7.464844 3.625 11.734375zm0 0"
								fill={COLORS.dark}
								style={{
									transform: `translateX(${Math.sin(Math.max(0, frame - 325) / 6) * 40}px)`,
								}}
							/>
							<path
								d="m426.667969 181.667969c0 4.265625-1.28125 8.53125-3.628907 11.730469l-106.664062 160c-3.839844 5.761718-10.242188 9.601562-17.707031 9.601562h-64c-11.734375 0-21.335938-9.601562-21.335938-21.332031 0-4.269531 1.28125-8.535157 3.628907-11.734375l98.773437-148.265625-98.773437-148.269531c-2.347657-3.199219-3.628907-7.464844-3.628907-11.730469 0-11.734375 9.601563-21.335938 21.335938-21.335938h64c7.464843 0 13.867187 3.839844 17.707031 9.601563l106.664062 160c2.347657 3.199218 3.628907 7.464844 3.628907 11.734375zm0 0"
								fill={COLORS.dark}
								style={{
									transform: `translateX(${Math.sin(Math.max(0, frame - 320) / 6) * 40}px)`,
								}}
							/>
						</svg>
					</div>

					<Card delay={330} text="Invite link 🔗" rotate={4} />
				</div>
			</FeatureSlide>

			{/* Feature 5: Privacy */}
			<FeatureSlide
				title="Private by default, no account needed"
				subtitle="Your data stays on your device. No cloud. No creepy ads.."
				startFrame={410}
				endFrame={510}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "24px",
						marginTop: "32px",
						alignItems: "center",
						transform: "scale(1.2)",
					}}
				>
					<Card delay={420} text="On device 📱" rotate={-4} />
					<Card delay={430} text="No cloud ☁️" rotate={0} />
					<Card delay={440} text="No creepy ads 👁️" rotate={4} />
				</div>
			</FeatureSlide>

			{/* Feature 6: Sync Across Devices */}
			<FeatureSlide
				title="Sync across devices"
				subtitle="Your birthdays stay up to date across your phone, tablet, and computer."
				startFrame={510}
				endFrame={610}
			>
				<div
					style={{
						position: "relative",
						width: "600px",
						height: "400px",
						marginTop: "32px",
						transform: "scale(1.2)",
					}}
				>
					{/* Left: Phone */}
					<Card delay={520} text="Phone 📱" x={-200} y={0} rotate={-6} />

					{/* Top Right: Laptop */}
					<Card delay={530} text="Laptop 💻" x={120} y={-100} rotate={4} />

					{/* Bottom Right: Tablet */}
					<Card delay={540} text="Tablet 🖥️" x={120} y={100} rotate={-4} />

					{/* Sync Arrow 1 (Phone to Laptop) */}
					<div
						style={{
							position: "absolute",
							top: "calc(50% - 80px)",
							left: "calc(50% - 50px)",
							transform: "translate(-50%, -50%) rotate(-20deg)",
							opacity: interpolate(frame, [535, 545], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							}),
							width: "50px",
							height: "50px",
						}}
					>
						<SyncArrowPiece style={{ width: "100%", height: "100%" }} />
					</div>

					{/* Sync Arrow 2 (Laptop to Tablet) */}
					<div
						style={{
							position: "absolute",
							top: "calc(50% + 0px)",
							left: "calc(50% + 220px)",
							transform: "translate(-50%, -50%) rotate(90deg)",
							opacity: interpolate(frame, [545, 555], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							}),
							width: "50px",
							height: "50px",
						}}
					>
						<SyncArrowPiece style={{ width: "100%", height: "100%" }} />
					</div>

					{/* Sync Arrow 3 (Tablet to Phone) */}
					<div
						style={{
							position: "absolute",
							top: "calc(50% + 80px)",
							left: "calc(50% - 50px)",
							transform: "translate(-50%, -50%) rotate(200deg)",
							opacity: interpolate(frame, [555, 565], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							}),
							width: "50px",
							height: "50px",
						}}
					>
						<SyncArrowPiece style={{ width: "100%", height: "100%" }} />
					</div>
				</div>
			</FeatureSlide>

			{/* And more... */}
			{frame >= 610 && (
				<AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
					<div
						style={{
							fontSize: "80px",
							fontWeight: "900",
							color: COLORS.dark,
							fontFamily: FONT_FAMILY,
							opacity: interpolate(frame, [610, 620], [0, 1], { extrapolateRight: "clamp" }),
							transform: `scale(${spring({ frame: frame - 610, fps: 30, config: { damping: 14 } })})`,
						}}
					>
						And more...
					</div>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};
