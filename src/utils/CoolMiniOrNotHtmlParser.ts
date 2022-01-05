import { parse } from 'node-html-parser';

import CoolMiniOrNotPost from '../models/CoolMiniOrNotPost';

export const extractPostsFromHtml = (html: string) => {
  const posts: CoolMiniOrNotPost[] = [];

  const dom = parse(html)
  const mainblocks = dom.querySelectorAll('.mainblock');

  for (let post of mainblocks) {
    const img = post.querySelector('img');
    const link = post.querySelector('a');
    const span = post.querySelector('.inlineblock-featured');

    if (img == null || link == null || span == null) continue;

    const info = span.text.split('\n').filter((text) => text.trim().length > 0).map((x) => x.trim());

    const id = link.attributes.href.split('?')[0].substring(1);
    const image_url = img.attributes.src;
    
    const title = info[0];
    const submittedDate = info[1].substring('Submitted on '.length);
    const score = info[3];
    const votes = info[5];
    const comments = info[6].substring('Comments: '.length);
    const artist = info[7].substring('by '.length);

    posts.push({
      id: id,
      title: title,
      imageUrl: image_url,
      submittedDate: submittedDate,
      score: score,
      votes: votes,
      comments: comments,
      artist: artist
    })
  }

  return posts
}

export const extractFullResImageFromHtml = (html: string) => {
  const dom = parse(html)
  const img = dom.querySelector('#artwork_image')?.querySelector('img');

  if(!img) return '';

  return img.attributes.src;
}  
