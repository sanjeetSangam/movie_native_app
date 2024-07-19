import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { image185 } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
	return (
		<View className="my-6">
			<Text className="text-white text-lg mx-4 mb-5">Top Casts</Text>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{cast &&
					cast.map((person, index) => {
						return (
							<TouchableOpacity
								key={person?.id}
								className="mr-4 items-center"
								onPress={() => navigation.navigate("Person", person)}
							>
								<View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
									<Image
										className="rounded-2xl h-24 w-20 bg-slate-200"
										source={{ uri: image185(person?.profile_path) }}
									/>
								</View>

								<Text className="text-white text-xs mt-1">
									{person?.character?.length > 10
										? person.character.slice(0, 10) + "..."
										: person.character}
								</Text>
								<Text className="text-neutral-400 text-xs mt-1">
									{person?.name?.length > 10
										? person.name.slice(0, 10) + "..."
										: person.name}
								</Text>
							</TouchableOpacity>
						);
					})}
			</ScrollView>
		</View>
	);
};

export default Cast;
