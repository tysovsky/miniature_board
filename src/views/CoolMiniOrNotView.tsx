import React, { useCallback, useEffect, useMemo, useState } from "react";

import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { EnhancedPlatform } from 'react-native-platforms'
import { useDispatch } from "react-redux";

import { showModal, setActiveCoolMminiOrNotPost } from "../reducers/modalSlice";

import CoolMiniOrNotPostsList from "../components/CoolMiniOrNotPostsList";
import useGetCoolMiniOrNotPosts from "../hooks/useGetCoolMiniOrNotPosts";
import LoadingIndicator from "../components/LoadingIndicator";
import SearchBar from "../components/SearchBar";
import CoolMiniOrNotPost from "../models/CoolMiniOrNotPost";
import { BrowseStackParamsList } from "./CoolMiniOrNotPage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SearchBarNative from 'react-native-search-bar';

const arrayUnique = (array: CoolMiniOrNotPost[]) => {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i].id === a[j].id)
              a.splice(j--, 1);
      }
  }

  return a;
}

type CoolMiniOrNotViewProps = NativeStackScreenProps<BrowseStackParamsList, 'CoolMiniOrNotView'>;

const CoolMiniOrNotView = ( { navigation }: CoolMiniOrNotViewProps) => {
  const [searchTem, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, page] = useGetCoolMiniOrNotPosts(searchTem, currentPage, 20);
  const [currentPageItems, setCurrentPageItems] = useState<CoolMiniOrNotPost[]>([]);
  const [posts, setPosts] = useState<CoolMiniOrNotPost[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setPosts([]);
    setCurrentPage(1);
  }, [searchTem]);

  useEffect(() => {
    const newPosts = arrayUnique(posts.concat(currentPageItems));
    setPosts(newPosts);
  }, [currentPageItems]);

  useEffect(() => {
    if (loading) return;

    setCurrentPageItems(page);
  }, [page, loading]);

  const onAddToAlbumPressed = useCallback((post: CoolMiniOrNotPost) => {
    dispatch(setActiveCoolMminiOrNotPost(post));

    if(EnhancedPlatform.isMacOS){
      dispatch(showModal());
    }
    else{
      navigation.push('AddToAlbumModal');
    }
  }, [dispatch, setActiveCoolMminiOrNotPost]);

  const onSearchSubmit = useCallback((text) => {
    setSearchTerm(text)
  }, [setSearchTerm])

  return (
    <View>
      { EnhancedPlatform.isMacOS && 
        <SearchBar 
          placeholder="Search"
          onSubmit={onSearchSubmit}
        />
      }
      { !EnhancedPlatform.isMacOS && 
          <SearchBarNative 
            placeholder="Search"
            onSearchButtonPress={onSearchSubmit}
          />
      }
      
      <CoolMiniOrNotPostsList
        posts={posts} 
        onAddToAlbumPress={onAddToAlbumPressed} 
        onEndReached={() => {
          if (loading) return;
          console.log(`end of page ${currentPage} reached. Fetching next page...`)
          setCurrentPage(currentPage + 1)
        }}
      />
      {loading && <LoadingIndicator/>}
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

export default CoolMiniOrNotView