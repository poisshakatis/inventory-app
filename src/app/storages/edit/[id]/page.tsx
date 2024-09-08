'use client';

import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import StorageDto from '@/dtos/StorageDto';
import OptionData from '@/interfaces/OptionData';
import { StorageService } from '@/services/StorageService';
import { useUser } from '@/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { notFound, useParams, useRouter } from 'next/navigation';
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

export default function Edit() {
  const userContext = useUser();
  if (!userContext.user) {
    return notFound();
  }

  const methods = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      parentStorageId: ''
    },
  });

  const [options, setOptions] = useState([] as OptionData[]);
  const { id } = useParams();
  const storageService = new StorageService();

  useEffect(() => {
    const fetchData = async () => {
      const response = await storageService.getAll(userContext);

      if (response.data) {
        const currentStorage = response.data.find(s => s.id === id);

        methods.setValue('name', currentStorage?.name!);
        methods.setValue('parentStorageId', currentStorage?.parentStorageId);

        const options = [] as OptionData[];
        for (let index = 0; index < response.data.length; index++) {
          const storage = response.data[index];
          options.push({
            label: storage.name,
            value: storage.id!
          });
        }
        setOptions(options);
      }
    };

    fetchData();
  }, [setOptions]);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const storage = { id: id, name: data.name } as StorageDto;

    if (data.parentStorageId) {
      const parentStorage = options.find(s => s.value === data.parentStorageId);
      storage.parentStorageId = parentStorage?.value;
      storage.parentStorageName = parentStorage?.label;
    }

    await new StorageService().update(id as string, storage, userContext);
    router.push('/storages');
  };

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};