import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { image500 } from "../api/moviedb";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const TrendingMovies = ({ trending }) => {
	const navigation = useNavigation();
	const handleClick = (item) => {
		navigation.navigate("Movie", item);
	};
	return (
		<View className="mb-8">
			<Text className="text-white text-xl mx-4 mb-5">Trending</Text>

			<Carousel
				width={screenWidth}
				height={screenWidth * 0.6}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				vertical={false}
				data={trending}
				scrollAnimationDuration={1000}
				renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
				loop
				autoPlay={true}
			/>
		</View>
	);
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
	return (
		<TouchableWithoutFeedback onPress={() => handleClick(item)}>
			<Image
				source={{ uri: image500(item?.poster_path) }}
				style={{ width: screenWidth * 0.6, height: screenHeight * 0.4, margin: "auto" }}
				className="rounded-xl bg-slate-200"
			/>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({});
