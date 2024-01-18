import React, { lazy } from 'react';

const CitiesComponent = lazy(() => import('../components/CitiesComponent'));

const Cities = () => {
  return (
    <>
      <CitiesComponent />
    </>
  );
};

export default Cities;
