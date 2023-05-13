import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Dish from '../../sanity/interfaces/Dish';

interface Restaurant {
    id: string ,
    name: string ,
    image: SanityImageSource,
    rating: number,
    genre: string ,
    address: string ,
    short_description: string,
    dishes: Dish[] | [],
    lat: number,
    long: number,
}

interface RestaurantSetAction {
    payload: Restaurant,
    type: string,
}

interface RestaruantRemoveAction {
    payload: { id: string },
    type: string,
}

export interface CounterState {
  restaurant: Restaurant,
}

const initialState: CounterState = {
  restaurant: {
    id: '',
    name: '',
    image: '',
    rating: 0,
    genre: '',
    address: '',
    short_description: '',
    dishes: [],
    lat: 0,
    long: 0,
  },
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action: RestaurantSetAction) => {
      state.restaurant = action.payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions

export const selectRestaurant = (state: RootState) => state.restaurant.restaurant;

export default restaurantSlice.reducer