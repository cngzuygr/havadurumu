import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface props {
	dayData: string[];
	tempData: any;
}

const { width } = Dimensions.get("window");

import { LineChart } from "react-native-chart-kit";

const DailyData: React.FC<props> = ({ dayData, tempData }) => {
	return (
		<View style={styles.main}>
			<LineChart
				data={{
					labels: dayData,
					datasets: [
						{
							data: tempData,
						},
					],
				}}
				width={width - 40}
				height={115}
				withInnerLines={false}
				yAxisInterval={1}
				chartConfig={{
					backgroundGradientFrom: "purple",
					backgroundGradientTo: "gray",
					decimalPlaces: 1,
					color: (opacity = 1) => `rgba(255, 255, 167, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 167, ${opacity})`,
					style: {
						borderRadius: 25,
					},
					propsForDots: {
						r: "4",
						strokeWidth: "2",
						stroke: "purple",
					},
				}}
				bezier
				style={{
					borderRadius: 25,
					alignSelf: "center",
					paddingBottom: 50,
				}}
			/>
		</View>
	);
};

export default DailyData;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		marginHorizontal: "auto",
	},
});
