import React, { useState } from 'react';
import { commentRequest, commentDeleter } from '../utils/index';
import Post from './Post';
import '../styles/comment.css';

import deleteIcon from '../src/images/delete.png';

const Comments = ({ handleComment, image, id }) => {
  const buf = {
    author: localStorage.currentUser,
    text: ''
  };

  const [data, setData] = useState(JSON.parse(localStorage.posts));
  const [comment, setComment] = useState(buf);

  const addComment = e => {
    e.preventDefault();
    const buf = JSON.parse(localStorage.getItem('posts'));
    buf[id].comments.push(comment);

    commentRequest(buf).then(res => {
      localStorage.posts = JSON.stringify(res.data);
      setData(res.data);
      setComment({ text: '' });
    });
  };

  const changeHandler = e => {
    const { name, value } = e.target;
    setComment(prevState => ({ ...prevState, [name]: value }));
  };

  const deleteComment = e => {
    const commentId = +e.target.id;
    let arr = JSON.parse(localStorage.posts);
    if (arr[id].comments[commentId].author === localStorage.currentUser) {
      arr[id].comments = arr[id].comments.filter(
        (item, index) => index !== commentId
      );

      commentDeleter(arr).then(res => {
        localStorage.posts = JSON.stringify(res.data);
        setData(res.data);
      });
    } else {
      alert('you can delete yours comments only');
    }
  };

  return (
    <div className="overlay">
      <div className="comment">
        <Post
          data={data[id]}
          image={image}
          className={'comment-post'}
          disabled={true}
        />
        <div className="comment-form">
          {data[id].comments.map((item, index) => (
            <p key={index}>
              <span style={{ color: '#07319D' }}>{item.author}</span>
              <span>{item.text}</span>
              <img src={deleteIcon} id={index} onClick={deleteComment} />
            </p>
          ))}
          <form className="comment-form" onSubmit={addComment}>
            <input
              className="comment-input"
              placeholder="author"
              value={comment.author}
              type="text"
              name="author"
              readOnly
            />
            <input
              className="comment-input"
              placeholder="comment"
              value={comment.text}
              type="text"
              name="text"
              onChange={changeHandler}
              required
            />
            <button
              className={
                localStorage.currentUser
                  ? 'comment-button__blue'
                  : 'comment-button__disabled'
              }
              disabled={localStorage.currentUser ? false : true}
            >
              add
            </button>
            <button className="comment-button" onClick={handleComment}>
              close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comments;
