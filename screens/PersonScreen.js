import {
	View,
	Text,
	Dimensions,
	Platform,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { useRoute } from "@react-navigation/native";
import { fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = ({ navigation }) => {
	const { params: person } = useRoute();
	const [isLoading, setIsLoading] = useState(true);
	const [isFavourite, setIsFavourite] = useState(false);
	const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
	const [cast, setCast] = useState({});

	const getPersonDetails = async (id) => {
		const data = await fetchPersonDetails(id);
		if (data) setCast(data);
		setIsLoading(false);
	};

	const getPersonMovies = async (id) => {
		const data = await fetchPersonMovies(id);
		if (data && data?.cast) setSimilarMovies(data.cast);
	};

	useEffect(() => {
		getPersonDetails(person?.id);
		getPersonMovies(person?.id);
	}, [person]);

	return (
		<ScrollView className="flex-1 bg-neutral-900">
			<SafeAreaView
				className={
					"z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin
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

			{/* person details */}

			{isLoading ? (
				<Loading />
			) : (
				<View>
					<View
						className="flex-row justify-center"
						style={{
							shadowColor: "gray",
							shadowRadius: 40,
							shadowOffset: { width: 0, height: 5 },
							shadowOpacity: 1,
						}}
					>
						<View className="overflow-hidden rounded-full h-72 w-72 items-center border-2 border-neutral-500 ">
							<Image
								source={{ uri: image342(cast?.profile_path) }}
								style={{
									width: screenWidth * 0.74,
									height: screenHeight * 0.43,
									backgroundColor: "gray",
								}}
							/>
						</View>
					</View>
					<View className="mt-6">
						<Text className="text-3xl text-white font-bold text-center">
							{cast?.name}
						</Text>
						<Text className="text-base text-neutral-500 text-center">
							{cast?.place_of_birth}
						</Text>
					</View>

					<View className="mx-3 p-4 flex-row mt-6 justify-between items-center bg-neutral-700 rounded-full">
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold">Gender</Text>
							<Text className="text-neutral-300 text-sm">
								{cast?.gender == 1 ? "Female" : "Male"}
							</Text>
						</View>
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold">Birthday</Text>
							<Text className="text-neutral-300 text-sm">{cast?.birthday}</Text>
						</View>
						<View className="border-r-2 border-r-neutral-400 px-2 items-center">
							<Text className="text-white font-semibold">Known for</Text>
							<Text className="text-neutral-300 text-sm">
								{cast?.known_for_department}
							</Text>
						</View>
						<View className="px-2 items-center">
							<Text className="text-white font-semibold">Popularity</Text>
							<Text className="text-neutral-300 text-sm">{cast?.popularity} %</Text>
						</View>
					</View>

					<View className="mx-3 my-6 space-y-2">
						<Text className="text-white text-lg ">Biography</Text>
						<Text className="text-neutral-400 tracking-wide">{cast?.biography}</Text>
					</View>

					{/* actor related movies */}
					{similarMovies?.length > 0 && (
						<MovieList title="Movies" hideSeeAll data={similarMovies} />
					)}
				</View>
			)}
		</ScrollView>
	);
};

export default PersonScreen;
