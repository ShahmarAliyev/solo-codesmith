import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './reservations.scss';
import { deleteReso } from '../redux/userSlice';
const Reservations = () => {
  const [reservations, setReservation] = useState(null);

  const dispatch = useDispatch();
  const url = '/api/reservations/';
  const { userId } = useSelector((state) => state.user);
  const getReservations = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    setReservation(data);
  };
  const handleClick = async (name) => {
    const response = await fetch(url + 'delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, name }),
    });
    const text = await response.json();
    dispatch(deleteReso());
    window.location.reload();
  };
  useEffect(() => {
    getReservations();
  }, []);
  useEffect(() => {}, []);

  return (
    <div className='resCont'>
      <h1>Your Reservations</h1>
      {reservations?.map((res) => {
        const readableDate = res.date.slice(0, 10);

        return (
          <div key={res.location + res.name} className='resoContainer'>
            <div className='deleteReso' onClick={() => handleClick(res.name)}>
              X
            </div>
            <div className='reserv'>
              <div className='nameImage'>
                <p>{res.name}</p>
                <img src={res.image} />
              </div>
              <div className='timereserv'>
                <p> Your reservation date is: {readableDate}</p>
                <p> Time for your reservation is at: {res.time}</p>
                <p> Your have {res.size} people in your party </p>
                <p> Your reservation is at: {res.location}</p>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};
export default Reservations;
