import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NavigationStackParamList from '../types/NavigationStackParamList';

type NavigationProps = NativeStackNavigationProp<NavigationStackParamList>;

const BasketIcon: React.FC = () => {
	const items = useSelector(selectBasketItems);
	const navigation = useNavigation<NavigationProps>();
	const basketTotal = useSelector(selectBasketTotal);

	if (items.length === 0) return null;

	const formatter = Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
	});

	const formattedTotal = formatter.format(basketTotal);

	return (
		<View className='absolute bottom-10 w-full z-50'>
			<TouchableOpacity
				onPress={() => navigation.navigate('Basket')}
				className='bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1'
			>
				<Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
					{items.length}
				</Text>
				<Text className='flex-1 text-white font-extrabold text-lg text-center'>
					View Basket
				</Text>
				<Text className='text-lg text-white font-extrabold'>
					{formattedTotal}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BasketIcon;
