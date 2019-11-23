import Axios from 'axios';

const getData = () => Axios.get('/data');

const likeRequest = (id, user) => Axios.post('/like', { params: { id, user }});

const commentRequest = (comment) =>  Axios.post('/comment', comment);

const commentDeleter = arr => Axios.post('/delete', arr);

export { getData, likeRequest, commentRequest, commentDeleter };