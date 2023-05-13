import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NavigationStackParamList from '../types/NavigationStackParamList';

type NavigationProps = NativeStackNavigationProp<NavigationStackParamList>;

const PreparingOrderScreen = () => {
	const navigation = useNavigation<NavigationProps>();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Delivery');
		}, 4000);
	}, []);

	return (
		<SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
			<Animatable.Image
				source={require('../../assets/anime-cooking.gif')}
				animation='fadeInUp'
				iterationCount={1}
				className='h-50 w-50'
			/>

			<Animatable.Text
				animation='fadeInUp'
				iterationCount={1}
				className='text-lg my-10 text-white font-bold text-center'
			>
				Waiting for Restaurant to accept your order!
			</Animatable.Text>

			<Progress.Circle
				size={60}
				indeterminate={true}
				color='white'
			/>
		</SafeAreaView>
	);
};

export default PreparingOrderScreen;
