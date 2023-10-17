"use client";
import React, { useState, useCallback } from "react";
import { Pagination, Table, TextInput } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { getDeployments } from "../store/selector";
import { formatDate, debounce } from "../utils";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import adminApi from "../utils/api";

const Deployment = (props) => {

    const {
        getState,
        action,
        router,
        toast
    } = props;

    const deployments = getDeployments(useSelector(getState));
    const [deploymentResults, setDeploymentResults] = useState(deployments);
    const currentPageNo = Number(useSearchParams().get("page")) || 1;
    const [deploymentPaginationResults, setDeploymentPaginationResults] = useState({ limit: 10, totalPages: deployments?.items?.length || 1, results: deployments?.items?.slice((currentPageNo - 1) * 10, ((currentPageNo - 1) * 10) + 10) || [] });
    const newOffset = (currentPageNo - 1) * deploymentPaginationResults.limit;

    // Updating the state based on need.
    const stateHandler = useCallback((apiResponse) => {
        if (apiResponse.items) {
            return {
                key: "occRepository",
                value: {
                    deployments: apiResponse
                }
            }
        }

    }, []);

    // Getting deployment results
    const getDeploymentHistory = debounce(async (e) => {

        const appName = e.target.value;

        const apiResponse = await adminApi({
            url: `applicationDeployment/?appName=${appName}`
        });


        if (apiResponse.items) {
            action("stateUpdate", { stateHandler, data: apiResponse });
            toast.show({
                status: "success",
                message: "Deployment results fetched successfully.."
            });
            setDeploymentResults(apiResponse);
            setDeploymentPaginationResults({ ...deploymentPaginationResults, totalPages: Math.ceil(apiResponse.items.length / deploymentPaginationResults.limit), results: apiResponse.items.slice(newOffset, newOffset + deploymentPaginationResults.limit) });
        } else {
            toast.show({
                status: "failure",
                message: apiResponse.message || "Something went wrong while fetching deployment results"
            });
            setDeploymentResults({});
        }

    }, 2000);

    const deploymentPaginationHandler = (pageNo) => {
        setDeploymentPaginationResults({ ...deploymentPaginationResults, results: deploymentResults.items.slice(newOffset, newOffset + deploymentPaginationResults.limit) });
        router.push(`/deployment?page=${pageNo}`);
    }

    const deploymentTableData = (data, index) => {
        return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data.creationDate}>
                <Table.Cell>
                    {index}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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


    return (
        <React.Fragment>
            <TextInput id="large" className="mb-4" type="text" sizing="md" placeholder="Application name..." onInput={getDeploymentHistory} icon={MagnifyingGlassIcon} />
            <Table>
                <Table.Head>
                    <Table.HeadCell className="!p-4">
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
                <Table.Body className="divide-y">
                    {(deploymentPaginationResults.results && deploymentPaginationResults.results.length) > 0 ? deploymentPaginationResults.results.map((item, index) => deploymentTableData(item, index + 1)) :
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={"no-results"}>
                            <Table.Cell colSpan={6} className="text-center">No Results Found.</Table.Cell>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
            <div className="flex items-center justify-center text-center mt-4 h-20">
                {deploymentPaginationResults.totalPages > 1 && <Pagination
                    currentPage={currentPageNo}
                    layout="pagination"
                    onPageChange={deploymentPaginationHandler}
                    showIcons={true}
                    totalPages={deploymentPaginationResults.totalPages}
                    previousLabel="Back"
                    nextLabel="Next"
                />}
            </div>
        </React.Fragment>
    )
}

export default Deployment;