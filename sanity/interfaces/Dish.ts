import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Dish {
    _id: string,
    name: string,
    short_description: string,
    price: number,
    image: SanityImageSource,
}

export default Dish;