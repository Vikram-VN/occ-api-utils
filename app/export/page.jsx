'use client';
import { Button, Card, Checkbox, Select, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import adminApi from '../utils/api';
import { CloudArrowDownIcon, StopCircleIcon } from '@heroicons/react/24/solid';
import { useToasts } from '../store/hooks';

export default function Export() {

  const toast = useToasts();
  const [exportList, setExportList] = useState({});
  const [multiExportList, setMultiExportList] = useState({});
  const [exportProcessList, setExportProcessList] = useState({});
  const [exportItems, setExportItems] = useState([]);

  useEffect(() => {
    (async () => {

      const response = await adminApi({
        url: `exportOperations`
      });
      if (response.items) {
        toast.show({
          status: 'success',
          message: 'Export results fetched successfully'
        });
        setExportList(response);
      } else {
        toast.show({
          status: 'failure',
          message: response.message || 'Something went wrong while fetching export results'
        });
        setExportList({});
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportItemsHandler = (isSelected, itemName) => {
    if (isSelected) {
      setExportItems([...exportItems, itemName]);
    } else {
      const itemIdex = exportItems.indexOf(itemName);
      itemIdex >= 0 && exportItems.splice(itemIdex, 1);
      setExportItems([...exportItems]);
    }
  }

  const exportStatusCheck = async processId => {
    const response = await adminApi({
      url: `exportProcess/${processId}`,
      method: 'get'
    });
    if (response.completed) {
      setMultiExportList({ ...multiExportList, [id]: { ...multiExportList[id], downloadLink: response.links[1].href } });
    }
  }

  useEffect(() => {
    const exportStatus = Object.keys(exportProcessList).length > 0 && setInterval(() => {
      Object.keys(exportProcessList).forEach(async key => {
        const token = exportProcessList[key].processId;
        if (token) {
          const result = await adminApi({ url: `exportProcess/${token}` });
          if (result.completed) {
            exportProcessList[key].downloadLink = result.links[2].href;
            delete exportProcessList[key].processId;
            setExportProcessList({ ...exportProcessList });
          }
        }
      })
    }, 1000 * 30);
    return () => clearInterval(exportStatus);
  }, [exportProcessList]);

  // Stopping export process
  const stopProcess = async (id, processId) => {
    const response = await adminApi({
      url: `exportProcess/${processId}/abort`,
      method: 'post'
    });
    if (response.success === true) {
      toast.show({
        status: 'success',
        message: 'Export process stopped successfully'
      });
      delete multiExportList[id].processId
      setMultiExportList({ ...multiExportList });
    } else {
      toast.show({
        status: 'failure',
        message: response.message
      });
    }
  }

  const exportHandler = async id => {
    const response = await adminApi({
      url: `exportProcess`,
      method: 'post',
      data: {
        fileName: `export${id}.zip`,
        format: multiExportList[id]?.format,
        id,
        mode: 'standalone'
      }
    });
    if (response.processId) {
      toast.show({
        status: 'success',
        message: 'Export process started'
      });
      setMultiExportList({ ...multiExportList, [id]: { ...multiExportList[id], processId: response.processId } });
      setExportProcessList({ ...exportProcessList, [id]: response.processId });
    } else {
      toast.show({
        status: 'failure',
        message: response.message || 'Something went wrong while fetching results'
      });
    }
  }

  return (
    <React.Fragment>
      <Card className='mb-4'>
        <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center'>
          <div className='block'>
            <h1 className='mb-2 text-4xl text-justify bold '>Export</h1>
            <p>Export items from the server.</p>
          </div>
          <Button type='button' disabled={!(exportItems.length > 1)}>Export Items</Button>
        </div>
      </Card>
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
        {
          exportList.items && exportList.items.map(item => {
            return (
              <Card className='mb-4 gap-2' key={item.typeName}>
                <div className='flex gap-2 items-center justify-between'>
                  <div className='flex gap-4 items-center'>
                    <Checkbox name={item.typeName} className='inline'
                      disabled={(item.formats.length > 0 && !multiExportList[item.id]?.format)}
                      onClick={(ev) => exportItemsHandler(ev.target.checked, item.id)}
                    />
                    <h1 className='text-bold text-2xl'>{item.typeName}</h1>
                  </div>
                  <div className='flex gap-4 items-center'>
                    {multiExportList[item.id]?.processId && <StopCircleIcon title='Stop export' className='w-8 h-8' onClick={() => stopProcess(item.id, multiExportList[item.id]?.processId)} />}
                    {multiExportList[item.id]?.processId && <Spinner aria-label="Export started" />}
                    {multiExportList[item.id]?.downloadLink && <CloudArrowDownIcon title='Download exported file' className='w-8 h-8' />}
                  </div>
                </div>
                <div className='grid md:grid-flow-col gap-4'>
                  {
                    item.formats.length > 0 && <Select className='mb-4'
                      defaultValue={'none'}
                      onChange={(e) => setMultiExportList({ ...multiExportList, [item.id]: { id: item.id, format: e.target.value } })}
                    >
                      <option value='none' disabled>Select Format</option>
                      {item.formats.map(format => <option value={format} key={format}>{format.toUpperCase()}</option>)}
                    </Select>
                  }
                  <Button type='button' onClick={() => exportHandler(item.id)} disabled={(item.formats.length > 0 && !multiExportList[item.id]?.format)}>{`Export ${item.id}`}</Button>
                </div>
              </Card>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}
