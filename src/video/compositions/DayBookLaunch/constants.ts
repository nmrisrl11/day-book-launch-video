import { loadFont } from "@remotion/google-fonts/Fredoka";

export const { fontFamily } = loadFont();

export const COLORS = {
	white: "#FFFFFF",
	dark: "#191919",
	grayBorder: "rgba(128, 128, 128, 0.12)",
	blue: "#3b82f6",
	pink: "#ec4899",
	green: "#22c55e",
	lightGray: "#F5F5F5",
	brand: "#191919", // mapping brand to dark as fallback
};

export const FONT_FAMILY = fontFamily;
