'use client';

import StorageDTO from '@/dtos/storage.dto';
import StorageService from '@/services/StorageService';
import { useUser } from '@/UserContext';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';

export default function Index() {
  const userContext = useUser();

  if (!userContext.user) {
    return notFound();
  }

  const [data, setData] = useState([] as StorageDTO[]);

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
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Storages</Breadcrumb.Item>
      </Breadcrumb>

      <Link href='/storages/create'>
        <Button>Create New</Button>
      </Link>

      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent Storage Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(storage =>
            <tr key={storage.id}>
              <td>{storage.name}</td>
              <td>{storage.parentStorageName}</td>
              <td>
                <Link href={`/storages/edit/${storage.id}`}>
                  <Button>Edit</Button>
                </Link>
                &nbsp;
                {!data.find(s => s.parentStorageId === storage.id) &&
                  <Button variant='danger' onClick={() => onClick(storage.id!)}>
                    Delete
                  </Button>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};