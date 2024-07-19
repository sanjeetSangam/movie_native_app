import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";

import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
	const { params: movie } = useRoute();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [isFavourite, setIsFavourite] = useState(false);
	const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
	const [cast, setCast] = useState([]);
	const [movieDetails, setMovieDetails] = useState({});

	const getMovieDetails = async (id) => {
		const data = await fetchMovieDetails(id);
		if (data) setMovieDetails(data);
		setIsLoading(false);
	};

	const getMovieCredits = async (id) => {
		const data = await fetchMovieCredits(id);
		if (data && data?.cast) {
			setCast(data.cast);
		}
	};

	const getSimilarMovies = async (id) => {
		const data = await fetchSimilarMovies(id);
		if (data && data?.results) {
			setSimilarMovies(data.results);
		}
	};

	useEffect(() => {
		getMovieDetails(movie.id);
		getMovieCredits(movie.id);
		getSimilarMovies(movie.id);
	}, [movie]);

	return (
		<ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
			{/* back button and movie poster */}
			<View className="w-full">
				<SafeAreaView
					className={
						"absolute z-20 w-full flex-row justify-between items-center px-4 " +
						topMargin
					}
				>
					<TouchableOpacity
						style={styles.background}
						className="rounded-xl p-1"
						onPress={() => navigation.goBack()}
					>
						<ChevronLeftIcon color={"white"} size={"28"} strokeWidth={2.5} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setIsFavourite((prev) => !prev)}>
						<HeartIcon
							color={isFavourite ? theme.background : "white"}
							size={"35"}
							strokeWidth={2.5}
						/>
					</TouchableOpacity>
				</SafeAreaView>

				{isLoading ? (
					<Loading />
				) : (
					<View>
						<Image
							source={{ uri: image500(movieDetails?.poster_path) }}
							style={{
								width: screenWidth,
								height: screenHeight * 0.55,
								backgroundColor: "red",
							}}
						/>
						<LinearGradient
							colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
							style={{ width: screenWidth, height: screenHeight * 0.4 }}
							start={{ x: 0.5, y: 0.5 }}
							end={{ x: 0.5, y: 1 }}
							className="absolute bottom-0"
						/>
					</View>
				)}
			</View>

			{/* movie details */}
			<View style={{ marginTop: -(screenHeight * 0.09) }} className="space-y-3">
				{/* title */}
				<Text className="text-white text-center text-3xl font-bold tracking-wider">
					{movieDetails?.title}
				</Text>

				{/* stats */}
				<Text className="text-neutral-400 font-semibold text-base text-center">
					{movieDetails?.status} • {movieDetails?.release_date?.split("-")[0]} •{" "}
					{movieDetails?.runtime} min
				</Text>

				{/* genres */}
				<View className="flex-row justify-center mx-4 space-x-2 flex-wrap">
					{movieDetails?.genres?.length > 0 &&
						movieDetails.genres.map((genre, index) => {
							let showDots = index + 1 != movieDetails.genres.length;
							return (
								<Text
									className="text-neutral-400 font-semibold text-base text-center"
									key={genre.id}
								>
									{genre.name} {showDots ? " • " : ""}
								</Text>
							);
						})}
				</View>

				{/* description */}
				<Text className="text-neutral-400 mx-4 tracking-wide">
					{movieDetails?.overview}
				</Text>
			</View>

			{/* casts */}
			{cast?.length > 0 && <Cast cast={cast} navigation={navigation} />}

			{/* similar movies */}
			{similarMovies?.length > 0 && (
				<MovieList title="Similar Movies" hideSeeAll data={similarMovies} />
			)}
		</ScrollView>
	);
};

export default MovieScreen;
