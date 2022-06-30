import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigator from "./components/RootNavigator";
import TemperatureContextProvider from "./context/TemperatureContext";

export default function App() {
	return (
		<TemperatureContextProvider>
			<RootNavigator />
		</TemperatureContextProvider>
	);
}
