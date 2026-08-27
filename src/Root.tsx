import "./index.css";
import { Composition } from "remotion";
import { DayBookLaunch } from "./video/compositions/DayBookLaunch/DayBookLaunch";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="DayBookLaunch"
				component={DayBookLaunch}
				durationInFrames={1850}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
