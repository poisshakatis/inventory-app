'use client';

import Input from '@/components/Input';
import Select from '@/components/Select';
import Category from '@/constants/Category';
import ItemSendDTO from '@/dtos/itemSend.dto';
import OptionData from '@/interfaces/OptionData';
import ItemSendService from '@/services/ItemSendService';
import StorageService from '@/services/StorageService';
import { useUser } from '@/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { number, object, string } from 'yup';

interface FormData {
  name: string;
  image?: FileList;
  serialNumber?: string;
  description: string;
  category: string;
  quantity: number;
  storageId: string;
}

const schema = object({
  name: string().required('Name is required').max(128),
  description: string().required('Description is required').max(2048),
  category: string().required(),
  quantity: number().typeError('Quantity must be a number').integer().min(1).required(),
  storageId: string().required()
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
      serialNumber: '',
      description: '',
      category: '',
      quantity: 1,
      storageId: ''
    }
  });

  const [storageOptions, setStorageOptions] = useState([] as OptionData[]);
  const { id } = useParams();
  const itemService = new ItemSendService();

  useEffect(() => {
    const fetchData = async () => {
      fetchCurrentItem();

      const response = await new StorageService().getAll(userContext);

      if (response.data) {
        const options: OptionData[] = [];

        for (const storage of response.data) {
          options.push({
            label: storage.name,
            value: storage.id!
          });
        }

        setStorageOptions(options);
      }
    };

    const fetchCurrentItem = async () => {
      const response = await itemService.find(id as string, userContext);

      const item = response.data;

      if (item) {
        methods.setValue('name', item.name);
        methods.setValue('serialNumber', item.serialNumber);
        methods.setValue('description', item.description);
        methods.setValue('category', item.category);
        methods.setValue('quantity', item.quantity);
        methods.setValue('storageId', item.storageId);
      }
    };

    fetchData();
  }, [setStorageOptions]);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const storage = storageOptions.find(s => s.value === data.storageId);

    const item: ItemSendDTO = {
      id: id as string,
      name: data.name,
      image: data.image![0],
      serialNumber: data.serialNumber,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      storageId: data.storageId,
      storageName: storage?.label!
    };

    await itemService.update(id as string, item, userContext);
    router.push('/items');
  };

  const categoryOptions = Object.keys(Category)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      label: key,
      value: key
    }));

  return (
    <FormProvider {...methods}>
      <div className='row col-md-4'>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name='name'
            label='Name' />

          <Input
            type='file'
            name='image'
            label='Image' />

          <Input
            name='serialNumber'
            label='Serial Number' />

          <Input
            name='description'
            label='Description' />

          <Select
            name='category'
            label='Category'
            options={categoryOptions}
            isOptional={false} />

          <Input
            name='quantity'
            label='Quantity' />

          <Select
            name='storageId'
            label='Storage Name'
            options={storageOptions}
            isOptional={false} />

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