import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
	const [trending, setTrending] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [topRated, setTopRated] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigation = useNavigation();

	const getTrendingMovies = async () => {
		const data = await fetchTrendingMovies();
		if (data && data?.results) setTrending(data.results);
		setIsLoading(false);
	};

	const getUpcomingMovies = async () => {
		const data = await fetchUpcomingMovies();
		if (data && data?.results) setUpcoming(data.results);
		setIsLoading(false);
	};

	const getTopRatedMovies = async () => {
		const data = await fetchTopRatedMovies();
		if (data && data?.results) setTopRated(data.results);
		setIsLoading(false);
	};

	useEffect(() => {
		getTrendingMovies();
		getUpcomingMovies();
		getTopRatedMovies();
	}, []);

	return (
		<View className="flex-1 bg-neutral-800">
			<SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
				<StatusBar style="light" />

				<View className="flex-row justify-between items-center mx-4">
					<Bars3CenterLeftIcon size={"30"} strokeWidth={2} color={"white"} />
					<Text className="text-white text-3xl font-bold">
						<Text style={styles.text}>M</Text>ovies
					</Text>

					<TouchableOpacity onPress={() => navigation.navigate("Search")}>
						<MagnifyingGlassIcon size={"30"} strokeWidth={2} color={"white"} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{isLoading ? (
				<Loading />
			) : (
				<ScrollView
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ padding: 10 }}
				>
					{/* Trending movies carousel */}
					{trending?.length > 0 && <TrendingMovies trending={trending} />}

					{/* upcoming movies */}
					<MovieList title="Upcoming" data={upcoming} />

					{/* top-rated movies */}
					<MovieList title="Top Rated" data={topRated} />
				</ScrollView>
			)}
		</View>
	);
};

export default HomeScreen;
