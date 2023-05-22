"use client";
import { Tabs, Table, TextInput, Pagination, Select } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useToasts } from '../components/toast';
import { formatDate, debounce } from '../utils';
import httpCall from '../utils/httpCall';
import { InboxArrowDownIcon, MagnifyingGlassIcon, ServerIcon } from '@heroicons/react/24/solid';
import { StoreContext } from '../store/context';
import { getDeployments } from '../store/selector';

export default function Deployments() {

  const { action, getState } = useContext(StoreContext);
  const deployments = getDeployments(getState());

  const router = useRouter();
  const toast = useToasts();
  const [deploymentResults, setDeploymentResults] = useState(deployments);
  const currentPageNo = Number(useSearchParams().get('page')) || 1;
  const [publishResults, setPublishResults] = useState({});
  const [queryFilter, setQueryFilter] = useState({ operator: '', field: '' });
  const [deploymentPaginationResults, setDeploymentPaginationResults] = useState({ limit: 10, totalPages: deployments?.items?.length || 1, results: [] });
  const [publishPaginationResults, setPublishPaginationResults] = useState({ limit: 10, totalPages: 1, results: [] });

  const newOffset = (currentPageNo - 1) * publishPaginationResults.limit;

  // Updating the state based on need.
  const stateHandler = (apiResponse) => {
    if (apiResponse.items) {
      return {
        key: 'occRepository',
        value: {
          deployments: apiResponse
        }
      }
    }

  }
  const list = deploymentResults.items && deploymentResults.items.splice(newOffset, deploymentPaginationResults.limit);
  console.log(newOffset, deploymentPaginationResults.limit, list);

  // Getting deployment results
  const getDeploymentHistory = debounce(async (e) => {

    const appName = e.target.value;

    const apiResponse = await httpCall({
      url: `applicationDeployment/?appName=${appName}`
    });


    if (apiResponse.items) {
      action('stateUpdate', { stateHandler, data: apiResponse });
      toast.show({
        status: 'success',
        message: 'Results fetched successfully..',
        delay: 3,
      });
      setDeploymentResults(apiResponse);
      setDeploymentPaginationResults({ ...deploymentPaginationResults, totalPages: Math.floor(apiResponse.items.length / deploymentPaginationResults.limit), results: apiResponse.items.splice(newOffset, deploymentPaginationResults.limit) });
    } else {
      toast.show({
        status: 'failure',
        message: apiResponse.message || 'Something went wrong while fetching results',
        delay: 3,
      });
      setDeploymentResults({});
    }

  }, 3000);

  // Getting publish results
  const getPublishHistory = debounce(async (e) => {

    const query = e.target.value;

    const apiResponse = await httpCall({
      url: `publishingHistory/?q=${queryFilter.field} ${queryFilter.operator} "${query}"&limit=${publishPaginationResults.limit}&offset=${newOffset}`
    });

    if (apiResponse.items) {
      toast.show({
        status: 'success',
        message: 'Results fetched successfully..',
        delay: 3,
      });
      setPublishResults(apiResponse);
      setPublishPaginationResults({ ...publishPaginationResults, totalPages: Math.floor(apiResponse.items.length / publishPaginationResults.limit), results: apiResponse.items.slice(newOffset, publishPaginationResults.limit) })
    } else {
      toast.show({
        status: 'failure',
        message: apiResponse.message || 'Something went wrong while fetching results',
        delay: 3,
      });
      setPublishResults({});
    }

  }, 3000);

  const deploymentPaginationHandler = (pageNo) => {
    setDeploymentPaginationResults({ ...deploymentPaginationResults, results: deploymentResults.items.slice(newOffset, deploymentPaginationResults.limit) });
    router.push(`/deployment?page=${pageNo}`);
  }

  const publishPaginationHandler = (pageNo) => {
    setPublishPaginationResults({ ...publishPaginationResults, results: publishResults.items.slice(newOffset, deploymentPaginationResults.limit) });
    router.push(`/deployment?page=${pageNo}`);
  }


  const deploymentTableData = (data, index) => {
    return (
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={data.creationDate}>
        <Table.Cell>
          {index}
        </Table.Cell>
        <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
          {data.applicationId}
        </Table.Cell>
        <Table.Cell>
          {data.id}
        </Table.Cell>
        <Table.Cell>
          {data.state}
        </Table.Cell>
        <Table.Cell>
          {formatDate(data.creationDate)}
        </Table.Cell>
        <Table.Cell>
          {data.warningMessages}
        </Table.Cell>
      </Table.Row>

    );
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
    <Tabs.Group
      aria-label="Tabs with icons"
      style="underline"
      className='bg-white dark:bg-gray-800 rounded-md gap-4'
    >
      <Tabs.Item
        title="Deployments History"
        active={true}
        icon={InboxArrowDownIcon}
      >
        <TextInput id="large" className="mb-4" type="text" sizing="md" placeholder="Application name..." onInput={getDeploymentHistory} icon={MagnifyingGlassIcon} />
        <Table>
          <Table.Head>
            <Table.HeadCell className='!p-4'>
              SN
            </Table.HeadCell>
            <Table.HeadCell>
              Application Name
            </Table.HeadCell>
            <Table.HeadCell>
              Deployment Id
            </Table.HeadCell>
            <Table.HeadCell>
              Status
            </Table.HeadCell>
            <Table.HeadCell>
              Created Date
            </Table.HeadCell>
            <Table.HeadCell>
              Warning Messages
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {(deploymentPaginationResults.results && deploymentPaginationResults.results.length) > 0 ? deploymentPaginationResults.results.map((item, index) => deploymentTableData(item, index + 1)) :
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell colSpan={6} className='text-center'>No Results Found.</Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>
        <div className="flex items-center justify-center text-center mt-4 h-20">
          <Pagination
            currentPage={currentPageNo}
            layout="pagination"
            onPageChange={deploymentPaginationHandler}
            showIcons={true}
            totalPages={deploymentPaginationResults.totalPages}
            previousLabel="Previous"
            nextLabel="Next"
          />
        </div>
      </Tabs.Item>

      <Tabs.Item
        title="Publish History"
        icon={ServerIcon}
      >
        <div className='flex gap-4'>
          <Select className="mb-4"
            defaultValue={'none'}
            onChange={(e) => setQueryFilter({ ...queryFilter, field: e.target.value })}
          >
            <option value='none' disabled>Select Field</option>
            <option value='publishInitiator'>Publisher</option>
            <option value='id'>WorkSet Id</option>
            <option value='startTime'>Start Date</option>
            <option value='endTime'>End Date</option>
          </Select>
          <Select className="mb-4"
            defaultValue={'none'}
            onChange={(e) => setQueryFilter({ ...queryFilter, operator: e.target.value })}
          >
            <option value='none' disabled>Select Operator</option>
            <option value='eq'>Equal</option>
            <option value='ne'>Not Equal</option>
            <option value='co'>Contains</option>
          </Select>
          <TextInput id="large" className="mb-4" type="text" sizing="md" disabled={!queryFilter.operator || !queryFilter.field} placeholder="Query search..." onInput={getPublishHistory} icon={MagnifyingGlassIcon} />
        </div>
        <Table hoverable={true}>
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
              Publish Initiated Through
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
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell colSpan={7} className='text-center'>No Results Found.</Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>
        <div className="flex items-center justify-center text-center mt-4 h-20">
          <Pagination
            currentPage={currentPageNo}
            layout="pagination"
            onPageChange={publishPaginationHandler}
            showIcons={true}
            totalPages={publishPaginationResults.totalPages}
            previousLabel="Previous"
            nextLabel="Next"
          />
        </div>
      </Tabs.Item>
    </Tabs.Group>
  )
}
