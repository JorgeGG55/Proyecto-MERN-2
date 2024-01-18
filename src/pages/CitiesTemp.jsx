import React, { lazy } from 'react';

const CitiesTemp = lazy(() => import('../components/CitiesTemp'));

const Cities = () => {
  return (
    <>
      <CitiesTemp />
    </>
  );
};

export default Cities;
