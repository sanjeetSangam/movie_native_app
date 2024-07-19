import React from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { image342 } from "../api/moviedb";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll = false }) => {
	const navigation = useNavigation();
	return (
		<View className="mb-8 space-y-8">
			<View className="mx-4 flex-row justify-between items-center">
				<Text className="text-white text-xl">{title}</Text>

				{!hideSeeAll && (
					<TouchableOpacity>
						<Text style={styles.text} className="text-lg">
							See All
						</Text>
					</TouchableOpacity>
				)}
			</View>

			{/* movie row */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{data.map((movie) => {
					return (
						<TouchableWithoutFeedback
							key={movie?.id}
							onPress={() => navigation.push("Movie", movie)}
						>
							<View className="space-y-1 mr-4">
								<Image
									source={{ uri: image342(movie?.poster_path) }}
									className="rounded-3xl"
									style={{
										width: screenWidth * 0.33,
										height: screenHeight * 0.22,
									}}
								/>
								<Text className="text-neutral-300 ml-1 text-center">
									{movie?.title?.length > 14
										? movie.title.slice(0, 14) + "..."
										: movie.title}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default MovieList;
