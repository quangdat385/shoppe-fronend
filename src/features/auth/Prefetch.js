import { store } from '~/app/store';
import PropTypes from 'prop-types';



import { usersApiSlice } from '~/features/users/usersApiSlice';

import { useEffect } from 'react';


const Prefetch = ({ children }) => {

  useEffect(() => {
    store.dispatch(usersApiSlice.util.prefetch('getUser', 'userInfo', { force: true }))
  }, [])
  return children
}

Prefetch.prototype = {
  children: PropTypes.node.isRequired
}
export default Prefetch;