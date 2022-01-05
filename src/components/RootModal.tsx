import React, { useEffect } from "react";

import Modal from "react-native-root-modal";

import { View, StyleSheet, useWindowDimensions } from 'react-native';

import { Provider, useSelector, } from 'react-redux';
import { selectShowModal } from '../reducers/modalSlice';

import AddToAlbumModal from './AddToAlbumModal';

import store from '../store/store';

import { setSiblingWrapper } from 'react-native-root-siblings';

const MODAL_WIDTH = 600;
const MODAL_HEIGHT = 300;

interface RooModalProps {
  children?: JSX.Element;
}

const RootModal = ( { children }: RooModalProps) => {
  setSiblingWrapper((sibling) => <Provider store={store}>{sibling}</Provider>);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const showModal = useSelector(selectShowModal);

  return (
    <Provider store={store}>
      <Modal
        style={[styles.modal, {
          top: windowHeight/2 - MODAL_HEIGHT/2,
          left: windowWidth/2 - MODAL_WIDTH/2,
        }]}
        visible={showModal}
      >
        <AddToAlbumModal/>
      </Modal>
      { children }
    </Provider>
  )
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    height: MODAL_HEIGHT,
    width: MODAL_WIDTH,
  }
});

export default RootModal;