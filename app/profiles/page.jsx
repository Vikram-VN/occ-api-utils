'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { agentApi } from '../utils/api';
import { useSearchParams } from 'next/navigation';
import { useToasts } from '../store/hooks';
import { Button, Card, Modal, Pagination, Select, Table, TextInput } from 'flowbite-react';
import { ExclamationCircleIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { debounce } from '../utils';

export default function Profiles() {

  const toast = useToasts();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageNo = Number(searchParams.get('page')) || 1;
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [queryFilter, setQueryFilter] = useState({ operator: searchParams.get('operator') || '', field: searchParams.get('field') || '' });
  const [pagination, setPagination] = useState({ limit: 10, totalPages: 1 });
  const [response, setResponse] = useState({});
  const [id, setId] = useState('')
  const [showModal, setModalView] = useState(false);
  const newOffset = (currentPageNo - 1) * pagination.limit;

  const profileDelete = useCallback(async () => {

    const onSuccess = (res) => {
      toast.show({
        status: 'success',
        message: 'Profile deleted successfully..'
      });
    }
    // Used to show notifications
    const onError = (error) => {
      toast.show({
        status: 'failure',
        message: error.message,
      });

    }

    agentApi({
      method: 'delete',
      data: {},
      url: `profiles/${id}`,
      showNotification: true,
      onSuccess,
      onError,
    });
    setQueryFilter({ ...queryFilter });
    setModalView(false);
  }, [id, queryFilter, toast]);

  const paginationHandler = (pageNo) => {
    router.push(`/profiles?page=${pageNo}&field=${queryFilter.field}&operator=${queryFilter.operator}&query=${query}`);
  }


  const filterProfiles = debounce(async () => {
    if (query) {

      const response = await agentApi({
        url: `profiles/?q=${queryFilter.field} ${queryFilter.operator} "${query}"&queryFormat=SCIM&limit=${pagination.limit}&offset=${newOffset}`
      });
      if (response.items) {
        setResponse(response);
        setPagination({ ...pagination, totalPages: Math.floor(response.totalResults / response.limit) });
        toast.show({
          status: 'success',
          message: 'Profile results fetched successfully'
        });
      } else {
        toast.show({
          status: 'failure',
          message: response.message || 'Something went wrong while fetching profile results'
        });
        setResponse({});
      }
    }
  }, 2000);


  const profileTableData = (data, index) => {
    return (
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={data.creationDate}>
        <Table.Cell>
          {index}
        </Table.Cell>
        <Table.Cell>
          {data.id}
        </Table.Cell>
        <Table.Cell className='whitespace-nowrap '>
          {data.lastName}
        </Table.Cell>
        <Table.Cell>
          {data.firstName}
        </Table.Cell>
        <Table.Cell>
          {data.parentOrganization.name}
        </Table.Cell>
        <Table.Cell>
          {data.email}
        </Table.Cell>
        <Table.Cell>
          <TrashIcon className='h-6 w-6 cursor-pointer' onClick={() => {
            setId(data.id);
            setModalView(true);
          }
          } />
        </Table.Cell>
      </Table.Row>

    );
  }


  return (
    <React.Fragment>
      <Modal
        show={showModal}
        size='md'
        popup={true}
        onClose={() => setModalView(false)}
      >
        <Modal.Body>
          <div className='text-center'>
            <ExclamationCircleIcon className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want delete contact?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={profileDelete}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => {
                setModalView(false)
                setId('');
              }} >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Card className='mb-4'>
        <h1 className='mb-4 text-4xl text-justify bold '>Profiles</h1>
        <div className='flex gap-4'>
          <Select className='mb-4'
            defaultValue={queryFilter.field || 'none'}
            onClick={filterProfiles}
            onChange={(e) => setQueryFilter({ ...queryFilter, field: e.target.value })}
          >
            <option value='none' disabled>Select Field</option>
            <option value='firstName'>First Name</option>
            <option value='lastName'>Last Name</option>
            <option value='email'>Email</option>
            <option value='id'>ID</option>
          </Select>
          <Select className='mb-4'
            defaultValue={queryFilter.operator || 'none'}
            onClick={filterProfiles}
            onChange={(e) => setQueryFilter({ ...queryFilter, operator: e.target.value })}
          >
            <option value='none' disabled>Select Operator</option>
            <option value='eq'>Equal</option>
            <option value='ne'>Not Equal</option>
            <option value='co'>Contains</option>
          </Select>
          <TextInput id='large' className='mb-4'
            type='text' sizing='md'
            disabled={!queryFilter.operator || !queryFilter.field}
            placeholder='Query search...' value={query}
            onInput={(e) => setQuery(e.target.value)} icon={MagnifyingGlassIcon}
            onKeyUp={filterProfiles}
          />
        </div>
      </Card>
      <Table>
        <Table.Head>
          <Table.HeadCell className='!p-4'>
            SN
          </Table.HeadCell>
          <Table.HeadCell>
            ID
          </Table.HeadCell>
          <Table.HeadCell>
            Last Name
          </Table.HeadCell>
          <Table.HeadCell>
            First Name
          </Table.HeadCell>
          <Table.HeadCell>
            Organization
          </Table.HeadCell>
          <Table.HeadCell>
            Email
          </Table.HeadCell>
          <Table.HeadCell>
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {(response.items && response.items.length) > 0 ? response.items.map((item, index) => profileTableData(item, index + 1)) :
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={'no-results'}>
              <Table.Cell colSpan={7} className='text-center'>No Results Found.</Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
      <div className="flex items-center justify-center text-center mt-4 h-20">
        {pagination.totalPages > 1 && <Pagination
          currentPage={currentPageNo}
          layout="pagination"
          onPageChange={paginationHandler}
          showIcons={true}
          totalPages={pagination.totalPages}
          previousLabel="Back"
          nextLabel="Next"
        />}
      </div>
    </React.Fragment>
  )
}
