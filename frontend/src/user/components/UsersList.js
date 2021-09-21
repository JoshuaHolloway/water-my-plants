import { useEffect, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';

// ==============================================

const UsersList = (props) => {
  // --------------------------------------------

  console.log('props.items: ', props.items);

  // --------------------------------------------

  return (
    <ul>
      UsersList
      {props.items &&
        props.items.map((item) => {
          return (
            <>
              <li key={item.id}>
                <ul>
                  <li>{item.name}</li>
                  <li>{item.id}</li>
                </ul>
              </li>
              <hr />
            </>
          );
        })}
    </ul>
  );
};

// ==============================================

export default UsersList;
