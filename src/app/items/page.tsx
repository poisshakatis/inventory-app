'use client';

import SearchBar from '@/components/SearchBar';
import ItemReceiveDTO from '@/dtos/itemReceive.dto';
import ItemReceiveService from '@/services/ItemReceiveService';
import StorageService from '@/services/StorageService';
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
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStorages();
  }, []);

  const itemService = new ItemReceiveService();

  const fetchItems = async (value: string) => {
    const response = await itemService.getAll(userContext, value, 10);

    if (response.data) {
      return response.data;
    }

    return [];
  };

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

        <SearchBar<ItemReceiveDTO>
          fetchData={fetchItems}
          suggestionKey='name'
          indexEndpoint='items' />

      </> : <Link href={'/storages/create'}>Create a storage first</Link>
  );
};