import { TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '../../sanity';

interface Properties {
	key: string;
	id: string;
	imageSource: SanityImageSource;
	title: string;
}

const CategoryCard: React.FC<Properties> = ({ id, imageSource, title }) => {
	return (
		<TouchableOpacity className='relative mr-2'>
			<Image
				source={{ uri: urlFor(imageSource).width(200).url() }}
				className='h-20 w-20 rounded'
			/>
			<Text className='absolute bottom-1 left-1 text-white font-bold'>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CategoryCard;
