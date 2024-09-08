'use client';

import StorageDto from '@/dtos/StorageDto';
import { StorageService } from '@/services/StorageService';
import { useUser } from '@/UserContext';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Index() {
  const userContext = useUser();

  if (!userContext.user) {
    return notFound();
  }

  const [data, setData] = useState([] as StorageDto[]);

  useEffect(() => {
    fetchData();
  }, []);

  const storageService = new StorageService();

  const fetchData = async () => {
    const response = await storageService.getAll(userContext);

    if (response.data) {
      setData(response.data);
    }
  };

  async function onClick(id: string) {
    await storageService.remove(id, userContext);

    setData(data.filter(s => s.id !== id));

    fetchData();
  }

  return (
    <>
      <h1>Index</h1>

      <p>
        <Link href={'/storages/create'}>Create New</Link>
      </p>

      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>ParentStorageName</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(storage =>
            <tr key={storage.id}>
              <td>{storage.name}</td>
              <td>{storage.parentStorageName}</td>
              <td>
                <Link href={`/storages/edit/${storage.id}`}>Edit</Link>
                |
                {!data.find(s => s.parentStorageId === storage.id) && <button
                  className='btn btn-danger'
                  onClick={() => onClick(storage.id!)}>
                  Delete
                </button>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};