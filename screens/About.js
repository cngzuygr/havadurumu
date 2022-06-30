import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { BACKGROUND_COLOR } from "../constants/colors";
import { SimpleLineIcons } from "@expo/vector-icons";

const Setting = () => {
	const localSettingData = ["About", "Temperature Unit"];
	return (
		<View style={styles.main}>
			<StatusBar style="inverted" />
			<Text
				style={{
					textAlign: "center",
					fontSize: 22,
					padding: 20,
					paddingBottom: 0,
					color: "white",
				}}
			>
				Hava durumu uygulamam Selçuk Üniversitesi Teknoloji Fakültesi proje
				yönetimi dersi için, değerli proje danışmanım {"\n"}
				<Text style={{ fontWeight: "bold", color: "yellow", fontSize: 24 }}>
					Doç. Dr. Humar KAHRAMANLI ÖRNEK'in{"\n"}
				</Text>
				yardımı ve desteği ile tasarlanmış ve geliştirilmiştir.
			</Text>
			<Image
				resizeMethod="resize"
				resizeMode="center"
				style={{ height: 300 }}
				source={require("../assets/tf_logo.jpg")}
			/>
		</View>
	);
};

export default Setting;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "rgba(256,256,256,0.9)",
	},
	option: {
		justifyContent: "space-between",
		flexDirection: "row",
		padding: 12,
		paddingHorizontal: 25,
	},
});
