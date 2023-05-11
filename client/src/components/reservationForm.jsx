import React, { useState } from 'react';

const ReservationForm = (props) => {
  const [res, setRes] = useState({
    size: '2',
    date: new Date(),
    time: '4pm',
  });
  const handleChange = (e) => {
    // console.log(e.target.value);
    console.log(e.target.value, e.target.name);
    let name = e.target.name;
    let val = e.target.value;
    setRes((prevState) => {
      return { ...prevState, [name]: val };
    });
  };
  const handleSubmit = () => {
    props.onSubmit(res);
  };

  console.log('res', res);
  return (
    <div className='reservations'>
      <div className='resHolder'>
        <p className='resText'>Make a reservation</p>
        <hr className='br' />
        <form>
          <label>
            Party Size
            <select name='size' onChange={handleChange}>
              <option value={2}>2 people</option>
              <option value={3}>3 people</option>
              <option value={4}>4 people</option>
              <option value={5}>5 people</option>
              <option value={6}>6+ people</option>
            </select>
          </label>
          <hr className='br' />

          <label>
            Date
            <input type='date' name='date' onChange={handleChange} />
          </label>
          <hr className='br' />

          <label>
            Time
            <select name='time' onChange={handleChange}>
              <option value={'4pm'}>4pm</option>
              <option value={'5pm'}>5pm</option>
              <option value={'6pm'}>6pm</option>
              <option value={'7pm'}>7pm</option>
              <option value={'8pm'}>8pm</option>
              <option value={'9pm'}>9pm</option>
            </select>
          </label>
        </form>
        <button type='submit' className='btn' onClick={handleSubmit}>
          Save this reservation
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;
