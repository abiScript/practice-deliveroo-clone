import { Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import MenuCategory from '../../sanity/interfaces/MenuCategory';
import { getMenuCategories } from '../../sanity';

const Categories: React.FC = () => {
	const [categories, setCategories] = useState<MenuCategory[]>([]);

	useEffect(() => {
		getMenuCategories().then((data: MenuCategory[]) => setCategories(data));
	}, []);

	return (
		<ScrollView
			contentContainerStyle={{
				paddingHorizontal: 15,
				paddingTop: 10,
			}}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			{/* Category Cards */}
			{categories.map((category: MenuCategory) => (
				<CategoryCard
					key={category._id}
					id={category._id}
					title={category.name}
					imageSource={category.image}
				/>
			))}
		</ScrollView>
	);
};

export default Categories;
