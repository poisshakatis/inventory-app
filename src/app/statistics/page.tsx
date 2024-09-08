'use client';

import UserItemCountDto from '@/dtos/UserItemCountDto';
import { AdminStatsService } from '@/services/AdminStatsService';
import { useUser } from '@/UserContext';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Index() {
  const userContext = useUser();

  if (!userContext.user) {
    return notFound();
  }

  const [data, setData] = useState([] as UserItemCountDto[]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await new AdminStatsService().getUsersWithItemCount(userContext);

    if (response.data) {
      setData(response.data);
    }
  };

  return (
    <>
      <h1>Statistics</h1>

      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>ItemCount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(u =>
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.itemCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};