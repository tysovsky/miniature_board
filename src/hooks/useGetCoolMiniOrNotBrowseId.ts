import React, { useState, useEffect, useMemo } from 'react';

import useAxiosPost from './useAxiosPost';

const BASE_URL = 'http://www.coolminiornot.com/browse'

const headers = { 
  'Content-Type': 'application/x-www-form-urlencoded'
}

const useGetCoolMiniOrNotBrowseId = (searchTerm: string, perPage = 50): [boolean, string] => {
  const [browseId, setBrowseId] = useState('')

  const body = useMemo(() => {
    const data = {
      "manufacturer": "",
      "category": "",
      "order": "RATING_DESC",
      "artist": "",
      "artist_exact": "0",
      "auctions": "NO",
      "description": searchTerm,
      "scores_from": "1",
      "scores_to": "10",
      "page_size": perPage.toString(),
      "tag": "",
      "set": "Go"
    };

    var formBody = [];
    for (let [key, value] of Object.entries(data)) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }, [searchTerm, perPage]);

  const { response, responseUrl, loading } = useAxiosPost(BASE_URL, body, headers);

  useEffect(()=>{
    if(loading) return;
    const temp = responseUrl.split('/');
    const browseId = temp[temp.length - 1];

    setBrowseId(browseId);
  }, [loading, response, responseUrl])

  return [loading, browseId];
}

export default useGetCoolMiniOrNotBrowseId;