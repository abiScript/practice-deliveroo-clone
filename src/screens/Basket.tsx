import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NavigationStackParamList from '../types/NavigationStackParamList';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import {
	removeFromBasket,
	selectBasketItems,
	selectBasketTotal,
} from '../features/basketSlice';
import { useDispatch } from 'react-redux';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../../sanity';

type NavigationProps = NativeStackNavigationProp<NavigationStackParamList>;

interface BasketItem {
	id: string;
	name: string;
	short_description: string;
	price: number;
	image: SanityImageSource;
}

const BasketScreen = () => {
	const navigation = useNavigation<NavigationProps>();
	const dispatch = useDispatch();

	const restaurant = useSelector(selectRestaurant);
	const items = useSelector(selectBasketItems);
	const basketTotal = useSelector(selectBasketTotal);

	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState<
		Record<string, BasketItem[]>
	>({});

	const formatter = Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
	});

	useEffect(() => {
		const groupedItems: Record<string, BasketItem[]> = items.reduce(
			(results: Record<string, BasketItem[]>, item: BasketItem) => {
				(results[item.id] = results[item.id] || []).push(item);
				return results;
			},
			{}
		);

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<View className='flex-1 bg-gray-100'>
				<View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
					<View>
						<Text className='text-lg font-bold text-center'>Basket</Text>
						<Text className='text-center text-gray-400'>{restaurant.name}</Text>
					</View>

					<TouchableOpacity
						onPress={navigation.goBack}
						className='rounded-full bg-gray-100 absolute top-3 right-5'
					>
						<XCircleIcon
							color='#00CCBB'
							height={50}
							width={50}
						></XCircleIcon>
					</TouchableOpacity>
				</View>

				<View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
					<Image
						source={{ uri: 'https://links.papareact.com/wru' }}
						className='h-7 w-7 bg-gray-300 p-4 rounded-full'
					/>
					<Text className='flex-1'>Deliver in 50-75 minutes</Text>
					<TouchableOpacity>
						<Text className='text-[#00CCBB]'>Change</Text>
					</TouchableOpacity>
				</View>

				<ScrollView className='divide-y divide-gray-200'>
					{Object.entries(groupedItemsInBasket).map(([key, items]) => (
						<View
							key={key}
							className='flex-row items-center space-x-3 bg-white py-2 px-5'
						>
							<Text className='text-[#00CCBB]'>{items.length} x</Text>
							<Image
								source={{ uri: urlFor(items[0]?.image).url() }}
								className='h-12 w-12 rounded-full'
							/>
							<Text className='flex-1'>{items[0]?.name}</Text>
							<Text className='text-gray-600'>
								{formatter.format(items[0]?.price)}
							</Text>

							<TouchableOpacity>
								<Text
									className='text-[#00CCBB] text-xs'
									onPress={() =>
										dispatch(removeFromBasket({ id: items[0]?.id }))
									}
								>
									Remove
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
				<View className='p-5 bg-white mt-5 space-y-4'>
					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Subtotal</Text>
						<Text className='text-gray-400'>
							{formatter.format(basketTotal)}
						</Text>
					</View>

					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Delivery Fee</Text>
						<Text className='text-gray-400'>{formatter.format(5.99)}</Text>
					</View>

					<View className='flex-row justify-between'>
						<Text>Order Total</Text>
						<Text className='font-extrabold'>
							{formatter.format(basketTotal + 5.99)}
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate('PreparingOrder')}
						className='rounded-lg bg-[#00CCBB] p-4'
					>
						<Text className='text-center text-white text-lg font-bold'>
							Place Order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default BasketScreen;
