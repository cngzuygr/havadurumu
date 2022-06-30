import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { BACKGROUND_COLOR } from "../constants/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTemp } from "../context/TemperatureContext";
import Loading from "./Loading";
import DailyData from "../components/DailyData";

const { height, width } = Dimensions.get("window");

const Home = () => {
	const date = new Date();
	const Full_Date = date.toDateString();

	const { tempMode, weatherData, StateWeatherData } = useTemp();

	if (weatherData) {
		const { temp, humidity, wind_speed, weather, pressure, dt } =
			weatherData.current;
		const { daily } = weatherData;
		const date = new Date();
		const hour = date.getHours();
		const { main } = weather[0];
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const daysData = [];
		const tempData = [];

		{
			daily.map((e, index) => {
				if (index >= 1) {
					const dd = new Date(e.dt * 1000).getUTCDay();
					daysData.push(days[dd]);
					tempData.push(e.temp["day"]);
				}
			});
		}

		return (
			<View style={styles.main}>
				<StatusBar style="inverted" />
				<View style={styles.date}>
					<Text style={styles.dateText}>{Full_Date}</Text>
				</View>
				<View style={styles.location}>
					<Text style={styles.locationText}>Today</Text>
				</View>

				<View style={[styles.weatherIconView]}>
					{main === "Haze" ? (
						<Image
							style={{ height: 120, width: 160 }}
							source={require(`../assets/weatherIcons/Haze.png`)}
						/>
					) : null}
					{main === "Rain" ? (
						<Image
							style={{ height: 160, width: 160 }}
							source={require(`../assets/weatherIcons/Rain.png`)}
						/>
					) : null}
					{main === "Snow" ? (
						<Image
							style={{ height: 130, width: 160 }}
							source={require(`../assets/weatherIcons/SnowFall.png`)}
						/>
					) : null}
					{main === "Thunderstorm" ? (
						<Image
							style={{ height: 160, width: 160 }}
							source={require(`../assets/weatherIcons/ThunderStorm.png`)}
						/>
					) : null}
					{main === "Drizzle" && hour < 19 ? (
						<Image
							style={{ height: 160, width: 160 }}
							source={require(`../assets/weatherIcons/Drizzle.png`)}
						/>
					) : null}
					{main === "Drizzle" && hour >= 19 ? (
						<Image
							style={{ height: 160, width: 160 }}
							source={require(`../assets/weatherIcons/Night_Drizzle.png`)}
						/>
					) : null}
					{main === "Mist" && hour < 19 ? (
						<Image
							style={{ height: 130, width: 170 }}
							source={require(`../assets/weatherIcons/Mist.png`)}
						/>
					) : null}
					{main === "Mist" && hour >= 19 ? (
						<Image
							style={{ height: 150, width: 150 }}
							source={require(`../assets/weatherIcons/Night_Mist.png`)}
						/>
					) : null}
					{main === "Clouds" && hour < 19 ? (
						<Image
							style={{ height: 130, width: 170 }}
							source={require(`../assets/weatherIcons/Cloudy.png`)}
						/>
					) : null}
					{main === "Clouds" && hour >= 19 ? (
						<Image
							style={{ height: 160, width: 160 }}
							source={require(`../assets/weatherIcons/Night_Cloudy.png`)}
						/>
					) : null}
					{main === "Clear" && hour < 19 ? (
						<Image
							style={{ height: 160, width: 160 }}
							source={require(`../assets/weatherIcons/Sunny.png`)}
						/>
					) : null}
					{main === "Clear" && hour >= 19 ? (
						<Image
							style={{ height: 150, width: 160 }}
							source={require(`../assets/weatherIcons/Night_Clear.png`)}
						/>
					) : null}
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						alignSelf: "center",
					}}
				>
					<Text style={styles.locationText}>{StateWeatherData?.name}</Text>
				</View>
				<View>
					<Text style={styles.tempText}>
						{parseInt(temp)}
						<Text style={styles.tempmodeText}>{tempMode ? "°F" : "°C"}</Text>
					</Text>
				</View>
				<View>
					<Text style={styles.weatherState}>{main}</Text>
				</View>
				<View style={styles.otherData}>
					<View style={styles.Humidity}>
						<MaterialCommunityIcons
							name="water-outline"
							size={36}
							color="purple"
						/>
						<Text style={styles.otherDataValueText}>
							{humidity} <Text style={styles.unitText}>%</Text>
						</Text>
						<Text style={styles.otherDataText}>Humidity</Text>
					</View>
					<View style={styles.Pressure}>
						<MaterialCommunityIcons
							name="weather-windy"
							size={36}
							color="purple"
						/>
						<Text style={styles.otherDataValueText}>
							{wind_speed} <Text style={styles.unitText}>km/h</Text>
						</Text>
						<Text style={styles.otherDataText}>Wind</Text>
					</View>
					<View style={styles.WindSpeed}>
						<MaterialCommunityIcons
							name="weather-pouring"
							size={36}
							color="purple"
						/>
						<Text style={styles.otherDataValueText}>
							{pressure} <Text style={styles.unitText}>hPa</Text>
						</Text>
						<Text style={styles.otherDataText}>pressure</Text>
					</View>
				</View>
				<View style={styles.DailyData}>
					<DailyData dayData={daysData} tempData={tempData} />
				</View>
			</View>
		);
	} else {
		return <Loading />;
	}
};

export default Home;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR,
	},
	date: {
		marginTop: "15%",
		marginLeft: "7%",
	},
	dateText: {
		color: "yellow",
		fontSize: 12,
	},
	location: {
		marginTop: 3,
		marginLeft: "6%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	locationText: {
		color: "yellow",
		fontSize: 25,
		fontWeight: "bold",
		marginLeft: 4,
	},
	weatherIconView: {
		display: "flex",
		alignItems: "center",
		marginVertical: 30,
	},
	tempText: {
		color: "yellow",
		fontSize: 60,
		alignSelf: "center",
	},
	tempmodeText: {
		color: "yellow",
	},
	weatherState: {
		color: "rgba(256,256,256,0.55)",
		fontSize: 16,
		alignSelf: "center",
		textTransform: "uppercase",
		fontWeight: "600",
		letterSpacing: 2,
	},
	otherData: {
		flex: 0.8,
		flexDirection: "row",
		width: width - 30,
		alignSelf: "center",
		justifyContent: "space-between",
		marginVertical: 10,
		borderRadius: 30,
	},
	Humidity: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		backgroundColor: "#FFFFA7",
		borderRadius: 25,
		marginHorizontal: 5,
	},
	Pressure: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		backgroundColor: "#FFFFA7",
		borderRadius: 25,
		marginHorizontal: 5,
	},
	WindSpeed: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		backgroundColor: "#FFFFA7",
		borderRadius: 25,
		marginHorizontal: 5,
	},
	otherDataValueText: {
		fontSize: 14,
		color: "purple",
	},
	otherDataText: {
		fontSize: 14,
		color: "purple",
		marginTop: 10,
		textTransform: "capitalize",
	},
	unitText: {
		fontSize: 11,
		color: "purple",
	},
	DailyData: {
		flex: 1,
		width: width - 30,
		alignSelf: "center",
		borderRadius: 30,
	},
});
