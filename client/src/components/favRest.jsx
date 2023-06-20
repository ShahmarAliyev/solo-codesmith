import React, { useState } from 'react';
import './favrest.scss';
import { useSelector } from 'react-redux';
const FavRest = ({ rest }) => {
  const userId = useSelector((state) => state.user.userId);
  rest['is_closed'] ? (open = 'Closed Now') : (open = 'Open Now');
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState(null);

  let userComments;
  const handleClick = async (restName) => {
    const response = await fetch('/api/favourites/comment', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ comment, userId, restName }),
    });
    const data = await response.json();
    setAllComments(data);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleEditClick = async (commentId, restName) => {
    const response = await fetch('/api/favourites/comment/', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ comment, userId, commentId, restName }),
    });
  };

  return (
    <div className='favRestHolder'>
      <div className='name'>{rest.restName}</div>
      <p className='pfav'> {open}</p>
      <p className='plocation'> {rest.location}</p>
      <img src={rest['image_url']} alt='rest' />
      <div className='commentInput'>
        <input
          type='text'
          placeholder='What is your comment'
          onChange={handleChange}
        />
        <button onClick={() => handleClick(rest.restName)}>Submit</button>
      </div>
      <div className='commentSection'>
        {allComments?.map((comment) => {
          return (
            <div className='singleComment' key={comment._id}>
              <p contentEditable>{comment.message} </p>
              <div
                className='editComment'
                onChange={handleChange}
                onClick={() => handleEditClick(comment._id, rest.restName)}
              >
                ✅
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavRest;
