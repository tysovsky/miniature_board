import React, { useState, useEffect } from 'react';

import { extractFullResImageFromHtml } from '../utils/CoolMiniOrNotHtmlParser';
import useAxiosGet from './useAxiosGet';

const BASE_URL = 'http://www.coolminiornot.com/'

const useGetCoolMiniOrNotFullImageUrl = (id: string): [boolean, string] => {
  const { response, loading } = useAxiosGet(BASE_URL + id);
  const [url, setUrl] = useState<string>('');

  useEffect(()=>{
    if (!loading && response){
      const extractedUrl = extractFullResImageFromHtml(response);
      setUrl(extractedUrl)
    }
  },[loading])

  return [loading, url];
}

export default useGetCoolMiniOrNotFullImageUrl;