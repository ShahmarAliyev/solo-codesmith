import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './restDetails.scss';
import ReservationForm from './reservationForm';
import { addToRes } from '../redux/userSlice';
const RestDetails = (props) => {
  const url = '/api/details';
  const [rest, setRest] = useState(null);
  const { restId } = useSelector((state) => state.restaurant);
  const { userId } = useSelector((state) => state.user);
  const [reservations, setReservations] = useState(null);
  const dispatch = useDispatch();
  const addReservation = async (formState) => {
    const { size, date, time } = formState;
    const location = rest.location['address1'] + ', ' + rest.location['city'];
    const response = await fetch('/api/reservations/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        date,
        time,
        size,
        location,
        name: rest.name,
        image: rest.image_url,
      }),
    });
    const data = await response.json();
    dispatch(addToRes());
    setReservations(data);
  };

  const getDetails = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restId }),
    });
    let data = await res.json();

    setRest(data);
  };
  useEffect(() => {
    getDetails();
  }, []);
  let transactions = rest?.transactions.reduce((acc, curr) => {
    acc += curr + '  ';
    return acc;
  }, '');
  const handleAddFav = async (e) => {
    const res = await fetch('/api/favourites/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rest, userId }),
    });
    let data = await res.json();
  };
  return (
    <div className='container'>
      <div className='restPics'>
        {rest?.photos?.map((link) => {
          return <img key={link} src={link} />;
        })}
      </div>
      {rest ? (
        <div className='nameSection'>
          <div className='details'>
            <p className='name'>{rest?.name}</p>
            <div className='revcount'>
              <p>
                Rating: <span> {'⭐️ '.repeat(rest?.rating)}</span>
              </p>
              <p>
                Reviews:<span>{rest?.review_count}</span>
              </p>
            </div>
            <p>
              Adress:
              <span>
                {rest?.location['address1']}, {rest?.location['city']}
              </span>
            </p>
            <p>
              Categories: <span>{rest?.categories[0]['title']}</span>
            </p>
            <p>
              Price : <span>{'💸  '.repeat(rest?.price?.length)}</span>
            </p>

            <p>
              Phone: <span>{rest?.phone}</span>{' '}
            </p>
            <p>
              Transactions: <span> {transactions}</span>
            </p>
            <button
              className='btn'
              onClick={(e) => {
                handleAddFav(e);
              }}
            >
              Add to your favourites
            </button>
          </div>
          <ReservationForm onSubmit={addReservation} />
        </div>
      ) : null}

      <div></div>
    </div>
  );
};
export default RestDetails;
