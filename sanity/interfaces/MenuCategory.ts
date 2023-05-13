import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface MenuCategory {
    _id: string,
    name: string,
    image: SanityImageSource,
}

export default MenuCategory;