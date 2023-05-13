import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../../sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NavigationStackParamList from '../types/NavigationStackParamList';
import Dish from '../../sanity/interfaces/Dish';

interface Properties {
	key: string;
	id: string;
	imageSource: SanityImageSource;
	title: string;
	rating: number;
	genre: string;
	address: string;
	short_description: string;
	dishes: Dish[];
	lat: number;
	long: number;
}

type NavigationProps = NativeStackNavigationProp<NavigationStackParamList>;

const RestaurantCard: React.FC<Properties> = ({
	id,
	imageSource,
	title,
	rating,
	genre,
	address,
	short_description,
	dishes,
	lat,
	long,
}) => {
	const navigation = useNavigation<NavigationProps>();

	return (
		<TouchableOpacity
			className='bg-white mr-3 shadow'
			onPress={() => {
				navigation.navigate('Restaurant', {
					id,
					imageSource,
					title,
					rating,
					genre,
					address,
					short_description,
					dishes,
					lat,
					long,
				});
			}}
		>
			<Image
				source={{ uri: urlFor(imageSource).width(500).url() }}
				className='h-36 w-64 rounded-sm'
			/>

			<View className='px-3 pb-4'>
				<Text className='font-bold text-lg pt-2'>{title}</Text>

				<View className='flex-row items-center space-x-1'>
					<StarIcon
						color='green'
						opacity={0.5}
						size={22}
					/>
					<Text className='text-xs text-gray-500'>
						<Text className='text-green-500'>{rating}</Text> · {genre}
					</Text>
				</View>

				<View className='flex-row items-center space-x-1'>
					<MapPinIcon
						color='gray'
						opacity={0.4}
						size={22}
					/>
					<Text className='text-xs text-gray-500'>Nearby . {address}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default RestaurantCard;
