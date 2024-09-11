'use client';

import ItemReceiveDTO from '@/dtos/itemReceive.dto';
import ItemReceiveService from '@/services/ItemReceiveService';
import { useUser } from '@/UserContext';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Details() {
  const userContext = useUser();

  if (!userContext.user) {
    return notFound();
  }

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({} as ItemReceiveDTO);
  const { id } = useParams();
  const itemService = new ItemReceiveService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await itemService.find(id as string, userContext);

        console.log(response);

        if (response.data) {
          setItem(response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  const router = useRouter();

  async function onClick(id: string) {
    await itemService.remove(id, userContext);
    router.push('/items');
  }

  return (
    <>
      <h1>Details</h1>

      <div>
        <h4>Item</h4>
        <hr />
        <dl className='row'>
          <dt className='col-sm-2'>Name</dt>
          <dd className='col-sm-10'>
            {item.name}
          </dd>
          <dt className='col-sm-2'>Image</dt>
          <dd className='col-sm-10' style={{ height: '900px', overflow: 'hidden' }}>
            <img src={'http://localhost:8080/uploads/' + item.imageName} style={{ width: '60%', height: 'auto' }} />
          </dd>
        </dl>
      </div>

      <div>
        <button
          className='btn btn-primary'
          onClick={() => router.push(`/items/edit/${id}`)}>
          Edit
        </button>
        
        &nbsp;

        <button
          className='btn btn-danger'
          onClick={() => onClick(item.id!)}>
          Delete
        </button>
      </div>
    </>
  );
};