import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import { getFeaturedCategoryRestaurants } from '../../sanity';
import FeaturedCategoryRestaurants from '../../sanity/interfaces/FeaturedCategoryRestaurants';

interface Properties {
	key: string;
	id: string;
	title: string;
	description: string;
}

const FeaturedRow: React.FC<Properties> = ({ id, title, description }) => {
	const [featuredRestaurants, setFeaturedRestaurants] = useState<
		FeaturedCategoryRestaurants[]
	>([]);

	useEffect(() => {
		getFeaturedCategoryRestaurants(id).then(
			(data: FeaturedCategoryRestaurants[]) => setFeaturedRestaurants(data)
		);
	}, [id]);

	return (
		<View>
			<View className='mt-4 flex-row items-center justify-between px-4'>
				<Text className='font-bold text-lg'>{title}</Text>
				<ArrowRightIcon color='#00CCBB' />
			</View>

			<Text className='text-xs text-gray-500 px-4'>{description}</Text>

			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				showsHorizontalScrollIndicator={false}
				className='pt-4'
			>
				{/* ResturantCard */}
				{featuredRestaurants.map(
					(featuredRestaurant: FeaturedCategoryRestaurants) =>
						featuredRestaurant.restaurants?.map((restaurant) => (
							<RestaurantCard
								key={id + restaurant._id}
								id={restaurant._id}
								imageSource={restaurant.image}
								title={restaurant.name}
								rating={restaurant.rating}
								genre={restaurant.genre}
								address={restaurant.address}
								short_description={restaurant.short_description}
								dishes={restaurant.dishes}
								lat={restaurant.lat}
								long={restaurant.long}
							/>
						))
				)}
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
