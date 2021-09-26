import { useEffect, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';

import UsersList from '../components/UsersList';

// ==============================================

const User = () => {
  // --------------------------------------------

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  // --------------------------------------------

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/users`
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  // --------------------------------------------

  return (
    <div style={{ color: 'black' }}>
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </div>
  );
};

// ==============================================

export default User;
