'use client';

import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import StorageDTO from '@/dtos/storage.dto';
import OptionData from '@/interfaces/OptionData';
import { StorageService } from '@/services/StorageService';
import { useUser } from '@/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';

interface FormData {
  name: string;
  parentStorageId?: string;
}

const schema = object({
  name: string().required('Name is required').max(128)
});

export default function Create() {
  const userContext = useUser();
  if (!userContext.user) {
    return notFound();
  }

  const router = useRouter();

  const methods = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
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
    const storage = { name: data.name } as StorageDTO;

    if (data.parentStorageId) {
      const parentStorage = options.find(s => s.value === data.parentStorageId);

      storage.parentStorageId = parentStorage?.value;
      storage.parentStorageName = parentStorage?.label;
    }

    const response = await new StorageService().add(storage, userContext);
    if (response.data) {
      router.push('/storages');
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='row col-md-4'>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput
            name='name'
            label='Name' />

          <SelectInput
            name='parentStorageId'
            label='Parent Storage Name'
            options={options} />

          <button
            className='btn btn-primary'
            type='submit'>
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};