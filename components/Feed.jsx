import React, { useState } from 'react';
import Post from '../components/Post';
import '../styles/feed.css';

import firstImage from '../src/images/1.png';
import secondImage from '../src/images/2.png';
import thirdImage from '../src/images/4.png';

const images = [
  firstImage,
  secondImage,
  thirdImage,
  firstImage,
  secondImage,
  thirdImage,
  firstImage,
  secondImage,
  thirdImage
];

const Feed = () => {
  const data = JSON.parse(localStorage.getItem('posts'));

  return (
    <div className="feed">
      {data.map((item, index) => (
        <Post
          data={item}
          image={images[index]}
          className={'post'}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default Feed;
