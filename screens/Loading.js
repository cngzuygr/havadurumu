import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

const Loading = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "purple",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ActivityIndicator size="large" color="yellow" />
		</View>
	);
};

export default Loading;
