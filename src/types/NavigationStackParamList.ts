import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Dish from "../../sanity/interfaces/Dish";

type NavigationStackParamList = {
	Home: undefined;
	Restaurant: {
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
	};
	Basket: undefined;
	PreparingOrder: undefined;
	Delivery: undefined;
};

export default NavigationStackParamList;