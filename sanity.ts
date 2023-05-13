import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import FeaturedCategoryTitle from "./sanity/interfaces/FeatureCategoryTitle";
import FeaturedCategoryRestaurants from "./sanity/interfaces/FeaturedCategoryRestaurants";
import MenuCategory from "./sanity/interfaces/MenuCategory";

const sanityClient = createClient({
    projectId: "vbe25d5h",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-01-12",
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => builder.image(source);

/** Getting the titles and subtitles for featured categories. */
export function getFeaturedCategoryTitles(): Promise<FeaturedCategoryTitle[]> {
  const result = sanityClient.fetch(`
    *[_type == "featured"] {
      _id,
      name,
      short_description,
    }
  `);

  return result;
}

/** Getting the restaurant information associated with a specific featured category. */
export function getFeaturedCategoryRestaurants(id: string): Promise<FeaturedCategoryRestaurants[]> {
  const result = sanityClient.fetch(`
    *[_type == "featured" && _id == "${id}" ] {
      restaurants[]->{
        _id,
        name,
        image,
        rating,
        address,
        "genre": type->name,
        short_description,
        dishes[]->{
          _id,
          name,
          short_description,
          price,
          image,
        },
        lat,
        long,
      }
    }
  `);
  
  return result;
}

/** Get all menu categories. */
export function getMenuCategories(): Promise<MenuCategory[]> {
  const result = sanityClient.fetch(`
    *[_type == "category"] {
      _id,
      name,
      image,
    }
  `);

  return result;
}

