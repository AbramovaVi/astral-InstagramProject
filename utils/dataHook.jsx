import React, { useState } from 'react';
import Axios from 'axios';

// let initialState;

// Axios.get('/data').then(res => initialState = res.data);

const useData = (initialState) => {
  const [data, setData] = useState(initialState);

  const actions = {
    setData: () => setData(initialState),
    getData: () => Axios.get('/data').then(res => setData(res.data))
  };
  return [data, actions];
};

export { useData };