import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { API_KEY } from "../constants/keys";

interface TempContextType {
	TempMode: boolean;
}

const TemperatureContext = React.createContext<TempContextType | null>(null);

export const useTemp = () => useContext(TemperatureContext);

const TemperatureContextProvider = ({ children }) => {
	{
		/* C | F*/
	}
	const [tempMode, setTempMode] = useState(false);
	const [weatherData, setWeatherData] = useState(null);
	const [StateWeatherData, setStateWeatherData] = useState(null);
	const [FetchError, setFetchError] = useState(false);

	{
		/*Accessing Location From Expo and*/
	}
	{
		/*Weather Api Call */
	}
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				alert("permission is required");
				return;
			} else {
				let location = await Location.getCurrentPositionAsync({
					enableHighAccuracy: true,
					accuracy: Location.Accuracy.BestForNavigation,
					maximumAge: 1000,
				});
				let Data = "Waiting..";
				let Longitude_Latitude = null;
				Data = JSON.stringify(location.coords);
				Longitude_Latitude = JSON.parse(Data);

				//APi Call After Getting Location
				const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${Longitude_Latitude["latitude"]}&lon=${Longitude_Latitude["longitude"]}&units=metric&appid=${API_KEY}`;
				try {
					const res = await fetch(URL);
					const data = await res.json();
					setWeatherData(data);
				} catch (e) {
					setFetchError(true);
				}
			}
		})();
	}, []);

	const getStateWeatherData = async (cityVal) => {
		// setStateWeatherData(null);
		try {
			const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${API_KEY}`;
			const res = await fetch(URL);
			const data = await res.json();
			setStateWeatherData(data);
		} catch (e) {
			setFetchError(true);
		}
	};

	const value = {
		tempMode,
		weatherData,
		StateWeatherData,
		getStateWeatherData,

		FetchError,
	};
	return (
		<TemperatureContext.Provider value={value}>
			{children}
		</TemperatureContext.Provider>
	);
};

export default TemperatureContextProvider;
