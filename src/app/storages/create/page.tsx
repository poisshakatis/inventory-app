'use client';

import Input from '@/components/Input';
import SelectInput from '@/components/Select';
import StorageDTO from '@/dtos/storage.dto';
import OptionData from '@/interfaces/OptionData';
import StorageService from '@/services/StorageService';
import { useUser } from '@/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { z } from 'zod';

interface FormData {
  name: string;
  parentStorageId?: string;
}

const schema = z.object({
  name: z.string().min(1, 'Required').max(128),
  parentStorageId: z.string()
});

export default function Create() {
  const userContext = useUser();
  
  if (!userContext.user) {
    return notFound();
  }

  const router = useRouter();

  const methods = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const [options, setOptions] = useState([] as OptionData[]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await new StorageService().getAll(userContext);
      
      if (response.data) {
        const options: OptionData[] = [];
        
        for (const storage of response.data) {
          options.push({
            label: storage.name,
            value: storage.id!
          });
        }
        
        setOptions(options);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log(data)
    const storage = { name: data.name } as StorageDTO;

    if (data.parentStorageId) {
      const parentStorage = options.find(s => s.value === data.parentStorageId);

      storage.parentStorageId = parentStorage?.value;
      storage.parentStorageName = parentStorage?.label;
    }

    // const response = await new StorageService().add(storage, userContext);
    
    // if (response.data) {
    //   router.push('/storages');
    // }
  };

  return (
    <FormProvider {...methods}>
      <div className='row col-md-4'>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name='name'
            label='Name' />

          <SelectInput
            name='parentStorageId'
            label='Parent Storage Name'
            options={options} />

          <Button
            type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};