import { View, Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import NavigationStackParamList from '../types/NavigationStackParamList';
import { urlFor } from '../../sanity';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import {
	ChevronRightIcon,
	MapPinIcon,
	QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

type restaurantScreenRouteType = RouteProp<
	NavigationStackParamList,
	'Restaurant'
>;

const RestaurantScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const {
		params: {
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
		},
	} = useRoute<restaurantScreenRouteType>();

	useEffect(() => {
		dispatch(
			setRestaurant({
				id: id,
				image: imageSource,
				name: title,
				rating: rating,
				genre: genre,
				address: address,
				short_description: short_description,
				dishes: dishes,
				lat: lat,
				long: long,
			})
		);
	}, [dispatch]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<>
			<BasketIcon />
			<ScrollView>
				<View className='relative'>
					<Image
						source={{ uri: urlFor(imageSource).url() }}
						className='w-full h-56 bg-gray-300 p-4'
					/>
					<TouchableOpacity
						className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'
						onPress={navigation.goBack}
					>
						<ArrowLeftIcon
							size={20}
							color={'#00CCBB'}
						/>
					</TouchableOpacity>
				</View>

				<View className='bg-white'>
					<View className='px-4 pt-4'>
						<Text className='text-3xl font-bold'>{title}</Text>

						<View className='flex-row space-x-2 my-1'>
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
									opacity={0.5}
									size={22}
								/>
								<Text className='text-xs text-gray-500'>
									Nearby · {address}
								</Text>
							</View>
						</View>

						<Text className='text-gray-500 mt-2 p-4'>{short_description}</Text>
					</View>

					<TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
						<QuestionMarkCircleIcon
							color='gray'
							opacity={0.5}
							size={22}
						/>
						<Text className='pl-2 flex-1 text-md font-bold'>
							Have a food allergy?
						</Text>
						<ChevronRightIcon color='#00CCBB' />
					</TouchableOpacity>
				</View>

				<View className='pb-36'>
					<Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>

					{/* Dish Row */}

					{dishes.map((dish) => (
						<DishRow
							key={id + dish._id}
							id={dish._id}
							name={dish.name}
							short_description={dish.short_description}
							price={dish.price}
							image={dish.image}
						/>
					))}
				</View>
			</ScrollView>
		</>
	);
};

export default RestaurantScreen;
