import { createSlice } from "@reduxjs/toolkit"
import { DefaultRootState } from "react-redux";
import CoolMiniOrNotPost from "../models/CoolMiniOrNotPost";

export const MODAL_ADD_TO_ALBUM = 'ADD_TO_ALBUM';

export type Modal = typeof MODAL_ADD_TO_ALBUM;

const initialState = {
  showModal: false,
  activeModal: MODAL_ADD_TO_ALBUM,
  activeCoolMiniOrNotPost: undefined as undefined | CoolMiniOrNotPost,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.showModal = false;
    },
    showModal: (state) => {
      state.showModal = true;
    },
    setActiveModal: (state, action) => {
      state.activeModal = action.payload as Modal;
    },
    setActiveCoolMminiOrNotPost: (state, { payload }) => {
      state.activeCoolMiniOrNotPost = payload as CoolMiniOrNotPost | undefined;
    }
  }
});

export const { hideModal, showModal, setActiveModal, setActiveCoolMminiOrNotPost } = modalSlice.actions;

export const selectShowModal = (state: any) => (state.modal as typeof initialState).showModal;
export const selectActiveCoolMiniOrNotPost = (state: any) => (state.modal as typeof initialState).activeCoolMiniOrNotPost;


export default modalSlice.reducer;