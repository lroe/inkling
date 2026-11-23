import {useCurrentFrame, useVideoConfig} from "remotion";

export const useT = () => useCurrentFrame() / useVideoConfig().fps;
