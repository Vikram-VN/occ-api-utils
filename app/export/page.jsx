'use client';
import { Card, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import adminApi from '../utils/api';
import { useToasts } from '../store/hooks';

export default function Export() {

  const toast = useToasts();
  const [exportList, setExportList] = useState({});

  useEffect(() => {
    (async () => {

      const response = await adminApi({
        url: `exportOperations`
      });
      if (response.items) {
        toast.show({
          status: 'success',
          message: 'Results fetched successfully',
          clearAll: true,
          delay: 3,
        });
        setExportList(response);
      } else {
        toast.show({
          status: 'failure',
          message: response.message || 'Something went wrong while fetching results',
          clearAll: true,
          delay: 3,
        });
        setExportList({});
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Card className='mb-4'>
        <h1 className='mb-2 text-4xl text-justify bold '>Export</h1>
        <p>Execute, Get, and Abort Export.</p>
      </Card>
      <div className='grid gap-4 grid-cols-2'>
        {
          exportList.items && exportList.items.map(item => {
            return (
              <Card className='mb-4 gap-2' key={item.typeName}>
                <h1 className='text-bold'>{item.typeName}</h1>
                <div className='flex'>
                  <Select className='mb-4'
                    defaultValue={'none'}
                    onChange={(e) => setQueryFilter({ ...queryFilter, field: e.target.value })}
                  >
                    <option value='none' disabled>Select Format</option>
                    {item.formats.map(format => <option value={format} key={format}>{format.toUpperCase()}</option>)}
                  </Select>
                </div>
              </Card>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}
