import React from 'react';
import Auth from '../../components/Auth';
import Journals from '../Journals';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user) {
      component = <Journals />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div className='Home'>
      {loadComponent()}
    </div>
  );
}
