'use client';
import React, { useState, useEffect } from 'react';
import { Pagination, Select, Table, TextInput } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';
import adminApi from '../utils/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { formatDate, debounce } from '../utils';


const Publish = (props) => {

    const { router, toast } = props;

    const [publishResults, setPublishResults] = useState({});
    const [query, setQuery] = useState('');
    const searchParams = useSearchParams();
    const currentPageNo = Number(searchParams.get('page')) || 1;
    const [queryFilter, setQueryFilter] = useState({ operator: '', field: '' });
    const [publishPaginationResults, setPublishPaginationResults] = useState({ limit: 10, totalPages: 1, results: [] });

    const newOffset = (currentPageNo - 1) * publishPaginationResults.limit;


    // Getting publish results
    useEffect(() => debounce(async () => {
        if (query) {

            const apiResponse = await adminApi({
                url: `publishingHistory/?q=${queryFilter.field} ${queryFilter.operator} "${query}"&limit=${publishPaginationResults.limit}&offset=${newOffset}`
            });

            if (apiResponse.items) {
                toast.show({
                    status: 'success',
                    message: 'Publish results fetched successfully..'
                });
                setPublishResults(apiResponse);
                setPublishPaginationResults({ ...publishPaginationResults, totalPages: Math.floor(apiResponse.items.length / publishPaginationResults.limit), results: apiResponse.items.slice(newOffset, newOffset + publishPaginationResults.limit) })
            } else {
                toast.show({
                    status: 'failure',
                    message: apiResponse.message || 'Something went wrong while fetching publish results'
                });
                setPublishResults({});
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 2000), [query, queryFilter]);



    const publishPaginationHandler = (pageNo) => {
        setPublishPaginationResults({ ...publishPaginationResults, results: publishResults.items.slice(newOffset, newOffset + publishPaginationResults.limit) });
        router.push(`/deployment?page=${pageNo}`);
    }



    const publishTableData = (data, index) => {
        return (
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={data.creationDate}>
                <Table.Cell>
                    {index}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {data.worksetName}
                </Table.Cell>
                <Table.Cell>
                    {data.publishInitiator}
                </Table.Cell>
                <Table.Cell>
                    {data.id}
                </Table.Cell>
                <Table.Cell>
                    {data.publishInitiatorProfileType}
                </Table.Cell>
                <Table.Cell>
                    {formatDate(data.startTime)}
                </Table.Cell>
                <Table.Cell>
                    {formatDate(data.endTime)}
                </Table.Cell>
            </Table.Row>

        )
    }
    return (
        <React.Fragment>
            <div className='flex gap-4'>
                <Select className='mb-4'
                    defaultValue={'none'}
                    onChange={(e) => setQueryFilter({ ...queryFilter, field: e.target.value })}
                >
                    <option value='none' disabled>Select Field</option>
                    <option value='publishInitiator'>Publisher</option>
                    <option value='worksetName'>WorkSet Name</option>
                    <option value='id'>WorkSet Id</option>
                    <option value='startTime'>Start Date</option>
                    <option value='endTime'>End Date</option>
                </Select>
                <Select className='mb-4'
                    defaultValue={'none'}
                    onChange={(e) => setQueryFilter({ ...queryFilter, operator: e.target.value })}
                >
                    <option value='none' disabled>Select Operator</option>
                    <option value='eq'>Equal</option>
                    <option value='ne'>Not Equal</option>
                    <option value='co'>Contains</option>
                </Select>
                <TextInput id='large' className='mb-4' type='text' sizing='md' disabled={!queryFilter.operator || !queryFilter.field} placeholder='Query search...' onInput={(e) => setQuery(e.target.value)} icon={MagnifyingGlassIcon} />
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell className='!p-4'>
                        SN
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Work-Set Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Publisher
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Publish Id
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Initiated Through
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Start Date
                    </Table.HeadCell>
                    <Table.HeadCell>
                        End date
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y'>
                    {(publishPaginationResults.results && publishPaginationResults.results.length) > 0 ? publishPaginationResults.results.map((item, index) => publishTableData(item, index + 1)) :
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={'no-results'}>
                            <Table.Cell colSpan={7} className='text-center'>No Results Found.</Table.Cell>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
            <div className='flex items-center justify-center text-center mt-4 h-20'>
                {publishPaginationResults.totalPages > 1 && <Pagination
                    currentPage={currentPageNo}
                    layout='pagination'
                    onPageChange={publishPaginationHandler}
                    showIcons={true}
                    totalPages={publishPaginationResults.totalPages}
                    previousLabel='Back'
                    nextLabel='Next'
                />}
            </div>
        </React.Fragment>
    )
}

export default Publish;