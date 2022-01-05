import axios from 'axios';
import { Buffer } from "buffer"

import { readFile, mkdir, writeFile, readDir, MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';

import { extractFullResImageFromHtml } from './CoolMiniOrNotHtmlParser';

import { EnhancedPlatform } from 'react-native-platforms'

const getDataFolder = () => {
  return DocumentDirectoryPath + '/MiniatureBoard/';
}

const isImageFile = (name: string) => {
  const temp = name.split('.');
  const extension = temp[temp.length - 1]

  return ['png', 'jpg', 'jpeg'].includes(extension.toLowerCase())
}

const getBase64Image = async (url: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  const b64img = Buffer.from(response.data, 'binary').toString('base64');
  return b64img;
}

export const makeDirsForAlbums = async (albumName: string) => {
  const dir = getDataFolder() + albumName
  try {
    await mkdir(getDataFolder() + albumName);
  }
  catch (e) {
    console.error('failed to make dirs for album ' + dir + '\n' + e);
    throw e;
  }
}

export const fetchAndSaveImage = (coolMiniOrNotPostId: string, albumName: string) => {
  return fetch('http://www.coolminiornot.com/' + coolMiniOrNotPostId).then(res => res.text()).then(body => {
    const extractedUrl = extractFullResImageFromHtml(body);
    return saveImage(extractedUrl, albumName)
  })
}

export const saveImage = async (url: string, albumName: string) => {
  try {
    const temp = url.split('/')
    const filename = getDataFolder() + albumName + '/' + temp[temp.length - 1]

    const base64Image = await getBase64Image(url);

    await writeFile(filename, base64Image, 'base64');

    return filename;
  }
  catch (e) {
    console.error('failed to save image: ' + url + ' to album ' + albumName);
    throw e;
  }
}

export const readImage = async (filePath: string) => {
  try {
    return await readFile(filePath, 'base64');
  }
  catch (e) {
    console.error('failed to read image ' + filePath);
    throw e;
  }
}

export const readImagesInDir = async (dir: string, recursive: true) => {
  try {
    var images: string[] = []
    const items = await readDir(dir);
    for(let i = 0; i < items.length; i++){
      const item = items[i];
      if (recursive &&  item.isDirectory()) {
        const imagesInDir = await readImagesInDir(item.path, recursive)
        images = images.concat(imagesInDir);
      }

      if(item.isFile() && isImageFile(item.name)){
        images.push(item.path);
      }
    }
    return images;

  }
  catch(e) {
    throw e;
  }
}

export const readAllImages = async () => {
  await mkdir(getDataFolder())
  return await readImagesInDir(getDataFolder(), true);
}

export const filenameToAlbumName = (filename: string) => {
  filename = filename.split(getDataFolder())[1];

  const temp = filename.split('/');

  if(temp.length < 2) return '';
  return temp.slice(0, temp.length - 1).join('/')
}