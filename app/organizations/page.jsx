"use client";
import React, { useEffect, useState } from "react";
import { agentApi } from "@/utils/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useToasts } from "@/store/hooks";
import { Card, Pagination, Select, Table, TextInput } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { debounce } from "@/utils";

export default function Organizations() {
  const toast = useToasts();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageNo = Number(searchParams.get("page")) || 1;
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [queryFilter, setQueryFilter] = useState({
    operator: searchParams.get("operator") || "",
    field: searchParams.get("field") || "",
  });
  const [pagination, setPagination] = useState({ limit: 10, totalPages: 1 });
  const [response, setResponse] = useState({});
  const [id, setId] = useState("");
  const [showModal, setModalView] = useState(false);
  const newOffset = (currentPageNo - 1) * pagination.limit;
  const [isLoading, setIsLoading] = useState(false);

  const paginationHandler = (pageNo) => {
    router.push(
      `/organizations?page=${pageNo}&field=${queryFilter.field}&operator=${queryFilter.operator}&query=${query}`,
    );
  };

  const filterOrganizations = debounce(async () => {
    const response = await agentApi({
      url: query
        ? `organizations/?q=${queryFilter.field} ${queryFilter.operator} "${query}"&limit=${pagination.limit}&offset=${newOffset}`
        : `organizations/?limit=${pagination.limit}&offset=${newOffset}`,
    });
    if (response.items) {
      setResponse(response);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(response.totalResults / response.limit),
      });
      toast.show({
        status: "success",
        message: "Profile results fetched successfully",
      });
    } else {
      toast.show({
        status: "failure",
        message:
          response.message ||
          "Something went wrong while fetching organizations results",
      });
      setResponse({});
    }
    setIsLoading(false);
  }, 2000);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      filterOrganizations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, newOffset]);

  const organizationTableData = (data, index) => {
    console.log("data--->", data);
    return (
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={data.id}
      >
        <Table.Cell>{index}</Table.Cell>
        <Table.Cell>{data.id}</Table.Cell>
        <Table.Cell className="whitespace-nowrap ">{data.name}</Table.Cell>
        <Table.Cell>{data.active === true ? "Active" : "Inactive"}</Table.Cell>
        <Table.Cell>
          {data.description === null ? "NA" : data.description}
        </Table.Cell>
        <Table.Cell>
          {data.punchoutUserId === null ? "NA" : data.punchoutUserId}
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <React.Fragment>
      <Card className="mb-4">
        <h1 className="mb-4 text-2xl text-justify bold ">Organizations</h1>
        <div className="flex gap-4">
          <Select
            className="mb-4"
            defaultValue={queryFilter.field || "none"}
            onClick={filterOrganizations}
            onChange={(e) =>
              setQueryFilter({ ...queryFilter, field: e.target.value })
            }
          >
            <option value="none" disabled>
              Select Field
            </option>
            <option value="id">ID</option>
            <option value="name">Organization Name</option>
            <option value="active">Active</option>
            <option value="description">Description</option>
          </Select>
          <Select
            className="mb-4"
            defaultValue={queryFilter.operator || "none"}
            onClick={filterOrganizations}
            onChange={(e) =>
              setQueryFilter({ ...queryFilter, operator: e.target.value })
            }
          >
            <option value="none" disabled>
              Select Operator
            </option>
            <option value="eq">Equal</option>
            <option value="ne">Not Equal</option>
            <option value="co">Contains</option>
          </Select>
          <TextInput
            id="large"
            className="mb-4"
            type="text"
            sizing="md"
            disabled={!queryFilter.operator || !queryFilter.field}
            placeholder="Query search..."
            value={query}
            onInput={(e) => setQuery(e.target.value)}
            icon={MagnifyingGlassIcon}
            onKeyUp={filterOrganizations}
          />
        </div>
      </Card>
      <Table>
        <Table.Head>
          <Table.HeadCell className="!p-4">SN</Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Active</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Punchout</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {(response.items && response.items.length) > 0 ? (
            response.items.map((item, index) =>
              organizationTableData(item, index + 1),
            )
          ) : (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={"no-results"}
            >
              <Table.Cell colSpan={6} className="text-center">
                No Results Found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div className="flex items-center justify-center text-center mt-4 h-20">
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={currentPageNo}
            layout="pagination"
            onPageChange={paginationHandler}
            showIcons={true}
            totalPages={pagination.totalPages}
            previousLabel="Back"
            nextLabel="Next"
          />
        )}
      </div>
    </React.Fragment>
  );
}
