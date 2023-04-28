import { createSlice } from '@reduxjs/toolkit';

const initialState = { selected: undefined, picked: [] };

const slice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    selectCard: (state, { payload: { cardId } }) => {
      state.selected = {
        id: cardId,
      };
      state.picked = [];
    },
    pickCard: (state, { payload: { cardId } }) => {
      state.selected = {
        id: cardId,
      };
      state.picked.push({
        id: cardId,
      });
    },
    resetSelection: (state) => {
      state.selected = undefined;
      state.picked = [];
    },
  },
});

export const { selectCard, pickCard, resetSelection } = slice.actions

export default slice.reducer

export const selectSelectedCard = (state) => state.card.selected
export const selectPickedCards = (state) => state.card.picked
