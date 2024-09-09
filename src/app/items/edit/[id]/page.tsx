'use client';

import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import Category from '@/constants/Category';
import ItemDTO from '@/dtos/item.dto';
import OptionData from '@/interfaces/OptionData';
import { ItemService } from '@/services/ItemService';
import { StorageService } from '@/services/StorageService';
import { useUser } from '@/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { number, object, string } from 'yup';

interface FormData {
  name: string;
  image?: string;
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
      image: '',
      serialNumber: '',
      description: '',
      category: '',
      quantity: 1,
      storageId: ''
    }
  });

  const [storageOptions, setStorageOptions] = useState([] as OptionData[]);
  const { id } = useParams();
  const itemService = new ItemService();

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
        methods.setValue('image', item.image);
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

    const item: ItemDTO = {
      id: id as string,
      name: data.name,
      image: data.image,
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
          <TextInput
            name='name'
            label='Name' />

          <TextInput
            name='image'
            label='Image' />

          <TextInput
            name='serialNumber'
            label='Serial Number' />

          <TextInput
            name='description'
            label='Description' />

          <SelectInput
            name='category'
            label='Category'
            options={categoryOptions}
            isOptional={false} />

          <TextInput
            name='quantity'
            label='Quantity' />

          <SelectInput
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