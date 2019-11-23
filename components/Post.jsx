import React, { useState } from 'react';
import { likeRequest } from '../utils/index';
import '../styles/post.css';

import like_disabled from '../src/images/like_disabled.png';
import comment from '../src/images/comment.png';
import like from '../src/images/like.png';

import Comments from './Comments';

const Post = ({ data, image, className, disabled }) => {
  const [commentIsOpen, setOpenComment] = useState(false);
  const [isLikeAdded, setLike] = useState(
    data.likedUsers.includes(localStorage.currentUser) ? true : false
  );
  const [likeCounter, setLikeCounter] = useState(data.likedUsers.length);

  const handleComment = e => {
    e.preventDefault();
    setOpenComment(!commentIsOpen);
    if (commentIsOpen) {
      document.location.href = '/';
    }
  };

  const handleLike = () => {
    setLike(!isLikeAdded);
    const { id } = data;
    const { currentUser } = localStorage;

    likeRequest(id, currentUser).then(res => {
      localStorage.setItem('posts', JSON.stringify(res.data));
      setLikeCounter(res.data[data.id].likedUsers.length);
    });
  };

  return (
    <div className="post-wrapper">
      <div className={className} id={data.id}>
        <img src={image} />
        <p className="post-text">
          {data.descr} <span style={{ color: '#07319D' }}>{data.hashtags}</span>
        </p>
        <div className="post-interface">
          <button
            className="post-button"
            disabled={!localStorage.getItem('currentUser')}
            onClick={handleLike}
          >
            <img src={isLikeAdded ? like : like_disabled} />
            <span>{likeCounter}</span>
          </button>
          <button
            className="post-button"
            onClick={handleComment}
            disabled={disabled}
          >
            <img src={comment} />
            <span>{data.comments.length}</span>
          </button>
        </div>
      </div>
      {commentIsOpen && (
        <Comments
          handleComment={handleComment}
          image={image}
          data={data}
          id={data.id}
          handleLike={handleLike}
          likeCounter={likeCounter}
          isLikeAdded={isLikeAdded}
        />
      )}
    </div>
  );
};

export default Post;
