import {
	View,
	Text,
	Dimensions,
	TextInput,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchSearchedMovies, image185 } from "../api/moviedb";
import { debounce } from "lodash";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SearchScreen = () => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();

	const handleSearch = (value) => {
		if (value && value.length > 2) {
			setIsLoading(true);
			fetchSearchedMovies({
				query: value,
				include_adults: "false",
				language: "en-US",
				page: "1",
			}).then((data) => {
				if (data && data?.results) setResults(data?.results);
				setIsLoading(false);
			});
		} else {
			setIsLoading(false);
			setResults([]);
		}
	};

	const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

	return (
		<SafeAreaView className="bg-neutral-800 flex-1">
			<View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
				<TextInput
					onChangeText={handleTextDebounce}
					placeholder="Search Movie"
					placeholderTextColor={"lightgray"}
					className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
				/>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Home");
					}}
					className="rounded-full p-3 m-1 bg-neutral-500"
				>
					<XMarkIcon size={"25"} color={"white"} />
				</TouchableOpacity>
			</View>

			{isLoading ? (
				<Loading />
			) : results?.length > 0 ? (
				<ScrollView
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
					className="space-y-3"
				>
					<Text className="text-white font-semibold ml-1">
						Results ({results?.length})
					</Text>

					<View className="flex-row justify-between flex-wrap">
						{results?.map((item, index) => {
							return (
								<TouchableWithoutFeedback
									key={item?.id}
									onPress={() => navigation.push("Movie", item)}
								>
									<View className="space-y-2 mb-4">
										<Image
											className="rounded-3xl"
											source={{ uri: image185(item?.poster_path) }}
											style={{
												width: screenWidth * 0.44,
												height: screenHeight * 0.3,
											}}
										/>
										<Text className="text-neutral-300 ml-1 text-center">
											{item?.title.length > 14
												? item.title.slice(0, 14) + "..."
												: item.title}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							);
						})}
					</View>
				</ScrollView>
			) : (
				<View className="flex-row justify-center mt-5">
					<Image source={require("../assets/chill.png")} className="h-96 w-96" />
				</View>
			)}
		</SafeAreaView>
	);
};

export default SearchScreen;
