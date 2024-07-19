import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../theme";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Loading = () => {
	return (
		<View
			style={{ height: screenHeight, width: screenWidth }}
			className="absolute flex-row justify-center items-center"
		>
			<Progress.Circle
				thickness={40}
				size={100}
				color={theme.background}
				indeterminate={true}
			/>
		</View>
	);
};

export default Loading;
