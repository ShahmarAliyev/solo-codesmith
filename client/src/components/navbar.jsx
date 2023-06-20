import React from 'react';
import './navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/userSlice';
const Navbar = () => {
  const user = useSelector((state) => {
    return state.user.userId;
  });

  const { resoCount } = useSelector((state) => state.user);
  console.log('resocount,', resoCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      dispatch(logOutUser());
      navigate('/auth');
    } else navigate('/auth');
  };
  return (
    <nav className='navbar'>
      <div className='navLogo'>
        <NavLink to='/'>Shahmar's Notorious Food Application</NavLink>
      </div>
      <div className='navOptions'>
        <NavLink to={user ? '/favourties' : '/auth'}>
          <span>Favourites</span>
        </NavLink>
        <NavLink className='resoHold' to={user ? '/reservations' : '/auth'}>
          <span>Reservations</span>
          <div className={resoCount === 0 ? 'displayNone' : 'resoCount'}>
            {resoCount === 0 ? '' : resoCount}
          </div>
        </NavLink>
        {/* <NavLink to='auth'> */}
        <span onClick={handleClick}>{user ? 'Log out' : 'Sign In'}</span>
        {/* </NavLink> */}
      </div>
    </nav>
  );
};

export default Navbar;
