import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface BasketItem {
    id: string,
	name: string,
	short_description: string,
	price: number,
	image: SanityImageSource,
}

interface BasketAddAction {
    payload: BasketItem,
    type: string,
}

interface BasketRemoveAction {
    payload: { id: string },
    type: string,
}

export interface CounterState {
  items: BasketItem[],
}

const initialState: CounterState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: BasketAddAction) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: BasketRemoveAction) => {
      const index = state.items.findIndex((item) => item.id  === action.payload.id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove item, not in basket. (item id: ${action.payload.id})`);
      }

      state.items = newBasket;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketItemsWithId = (state: RootState, id: string) => state.basket.items.filter(item => item.id === id);

export const selectBasketTotal = (state: RootState) => state.basket.items.reduce((total: number, item: BasketItem) => total += item.price, 0);

export default basketSlice.reducer