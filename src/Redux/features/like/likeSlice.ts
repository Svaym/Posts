import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface LikeState {
  value: number
}
const initialState: LikeState = {
  value: 0
}
export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})
export const { increment } = likeSlice.actions
export const selectLike = (state: RootState) => state.like.value
export default likeSlice.reducer