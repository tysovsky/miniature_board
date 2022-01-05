/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import albumsSlice, { AlbumHierarchyItem, albumNameToParentAlbumIdAndPath, albumIdToFullPath} from '../../../src/reducers/albumsSlice';
 
describe('albumNameToParentAlbumIdAndPath', ()=>{
  describe('when there are no albums in the hierarchy', () => {
    it('parses correctly', () => {
      const { parentAlbumId, albumFilepath } = albumNameToParentAlbumIdAndPath('one/two', []);

      expect(parentAlbumId).toEqual('');
      expect(albumFilepath).toEqual('one/two')
     });
  });

  describe('when brand new path exists', () => {
    const albumHierarachy: AlbumHierarchyItem[] = [{
      id: 'one-id',
      name: 'one',
      children: []
    }]
    it('parses correctly', () => {
      const { parentAlbumId, albumFilepath } = albumNameToParentAlbumIdAndPath('two/three', albumHierarachy);

      expect(parentAlbumId).toEqual('');
      expect(albumFilepath).toEqual('two/three')
     });
  });

  describe('when first item in the path exists', () => {
    const albumHierarachy: AlbumHierarchyItem[] = [{
      id: 'one-id',
      name: 'one',
      children: []
    }]
    it('parses correctly', () => {
      const { parentAlbumId, albumFilepath } = albumNameToParentAlbumIdAndPath('one/two', albumHierarachy);

      expect(parentAlbumId).toEqual('one-id');
      expect(albumFilepath).toEqual('two')
     });
  });

  describe('when first two items in the path exists', () => {
    const albumHierarachy: AlbumHierarchyItem[] = [{
      id: 'one-id',
      name: 'one',
      children: [
        {
          id: 'two-id',
          name: 'two',
          children: []
        }
      ]
    }]
    it('parses correctly', () => {
      const { parentAlbumId, albumFilepath } = albumNameToParentAlbumIdAndPath('one/two/three', albumHierarachy);

      expect(parentAlbumId).toEqual('two-id');
      expect(albumFilepath).toEqual('three')
     });
  });

  describe('when the entire path already exists', () => {
    const albumHierarachy: AlbumHierarchyItem[] = [{
      id: 'one-id',
      name: 'one',
      children: [
        {
          id: 'two-id',
          name: 'two',
          children: []
        }
      ]
    }]
    it('parses correctly', () => {
      const { parentAlbumId, albumFilepath } = albumNameToParentAlbumIdAndPath('one/two', albumHierarachy);

      expect(parentAlbumId).toEqual('two-id');
      expect(albumFilepath).toEqual('')
     });
  });
})

describe('albumIdToFullPath', () => {
  const albumHierarachy: AlbumHierarchyItem[] = [
    {
      id: 'one-id',
      name: 'one',
      children: [
        {
          id: 'two-id',
          name: 'two',
          children: []
        },
        {
          id: 'three-id',
          name: 'three',
          children: []
        },
        {
          id: 'four-id',
          name: 'four',
          children: [
            {
              id: 'five-id',
              name: 'five',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 'six-id',
      name: 'six',
      children: []
    },
    {
      id: 'seven-id',
      name: 'seven',
      children: [
        {
          id: 'eight-id',
          name: 'eight',
          children: []
        },
        {
          id: 'nine-id',
          name: 'nine',
          children: []
        }
      ]
    }
  ]
  it('parses correctly', () => {
    const fullPath = albumIdToFullPath('six-id', albumHierarachy);

    expect(fullPath).toEqual('six');
   });
})
 