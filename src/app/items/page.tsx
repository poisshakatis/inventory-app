'use client';

import ItemDto from '@/dtos/ItemDto';
import { ItemService } from '@/services/ItemService';
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

  const [hasUserStorages, setHasUserStorages] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStorages = async () => {
      try {
        const response = await new StorageService().getAll(userContext);
        if (response.data && response.data.length === 0) {
          setHasUserStorages(false);
        } else if (response.data) {
          fetchItems();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStorages();
  }, []);

  const [items, setItems] = useState([] as ItemDto[]);
  const itemService = new ItemService();

  const fetchItems = async () => {
    const response = await itemService.getAll(userContext);
    if (response.data) {
      setItems(response.data);
    }
  };

  async function onClick(id: string) {
    await itemService.remove(id, userContext);

    setItems(items.filter(i => i.id !== id));

    fetchItems();
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    hasUserStorages ?
      <>
        <h1>Index</h1>

        <p>
          <Link href={'/items/create'}>Create New</Link>
        </p>

        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>SerialNumber</th>
              <th>Description</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>StorageName</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item =>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.image}</td>
                <td>{item.serialNumber}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.storageName}</td>
                <td>
                  <Link href={`/items/edit/${item.id}`}>Edit</Link>
                  |
                  <button
                    className='btn btn-danger'
                    onClick={() => onClick(item.id!)}>
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </> : <Link href={'/storages/create'}>Create a storage first</Link>
  );
};