import React, { useState, useEffect, useMemo } from 'react';

import { extractPostsFromHtml } from '../utils/CoolMiniOrNotHtmlParser';
import CoolMiniOrNotPost from '../models/CoolMiniOrNotPost';

import useAxiosPost from './useAxiosPost';
import useGetCoolMiniOrNotBrowseId from './useGetCoolMiniOrNotBrowseId';
import useAxiosGet from './useAxiosGet';

const BASE_URL = 'http://www.coolminiornot.com/browse'

const headers = { 
  'Content-Type': 'application/x-www-form-urlencoded'
}

const useGetCoolMiniOrNotPosts = (searchTerm: string, page = 1, perPage = 50): [boolean, CoolMiniOrNotPost[]] => {
  const [browseIdLoading, browseId] = useGetCoolMiniOrNotBrowseId(searchTerm, perPage);
  const [posts, setPosts] = useState<CoolMiniOrNotPost[]>([]);

  const url = useMemo(()=>{
    if (browseIdLoading || browseId.length == 0) return undefined;
    return `http://www.coolminiornot.com/browse/${page}/browseid/${browseId}`
  }, [browseIdLoading, browseId, page])

  const { response, loading } = useAxiosGet(url)

  useEffect(()=>{
    if(browseIdLoading || loading || !response) return;

    setPosts(extractPostsFromHtml(response));
  }, [loading, response, page ])

  return [browseIdLoading || loading, posts];
}

export default useGetCoolMiniOrNotPosts;