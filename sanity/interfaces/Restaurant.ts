import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Dish from "./Dish";

interface Restaurant {
    _id: string,
    name: string,
    image: SanityImageSource,
    rating: number,
    genre: string,
    address: string,
    short_description: string,
    dishes: Dish[],
    lat: number,
    long: number,
}

export default Restaurant;