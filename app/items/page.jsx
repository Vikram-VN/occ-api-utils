"use client";
import React, { useEffect, useState } from "react";
import { useToasts } from "../store/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Table, Pagination, Modal, TextInput, Button, Select, Label } from "flowbite-react";
import { debounce } from "../utils";
import { ArrowDownTrayIcon, TrashIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import adminApi, { fileDownload } from "../utils/api";
import { useCallback } from "react";

export default function ItemTypes() {

    const router = useRouter();
    const [items, setItems] = useState({});
    const currentPageNo = Number(useSearchParams().get("page")) || 1;
    const [form, setForm] = useState();
    const [customAttributesCreateModalShow, setCustomAttributesCreateModalShow] = useState(false);
    const [showModal, setModalView] = useState(false);
    const [itemType, updateItemType] = useState(useSearchParams().get("type") || 'none');
    const [pagination, setPagination] = useState({ limit: 10, totalPages: 1 });
    const toast = useToasts();

    const newOffset = (currentPageNo - 1) * pagination.limit;

    const onSuccess = useCallback((res) => {
        toast.show({
            status: "success",
            message: "Attribute as been deleted successfully.."
        });
    }, [toast]);

    const onAttributeCreation = useCallback((res) => {
        toast.show({
            status: "success",
            message: "Attribute as been created successfully.."
        });
    }, [toast])


    // Used to show notifications
    const onError = useCallback((error) => {
        toast.show({
            status: "failure",
            message: error.message
        });

    }, [toast]);

    const paginationHandler = (pageNo) => {
        router.push(`items?page=${pageNo}&type=${itemType}`);
    }

    // Refreshing table data based on filters
    const fetchItemTypeAttributes = debounce(async () => {
        const apiResponse = await adminApi({
            url: `itemTypes/${itemType}`
        });
        if (apiResponse.specifications) {
            setItems(apiResponse);
            setPagination({ ...pagination, totalPages: Math.ceil(apiResponse.propertiesOrder.length / pagination.limit) })
        } else {
            toast.show({
                status: "failure",
                message: apiResponse.message || "Something went wrong while fetching results"
            });
            setItems({});
        }
    }, 2000);

    useEffect(() => {
        itemType && fetchItemTypeAttributes();
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemType]);

    const fileDelete = useCallback(async (filePath) => {
        adminApi({
            method: "post",
            url: "items/deleteFile",
            data: {
                filename: filePath
            },
            showNotification: true,
            onSuccess,
            onError,
        });
        fetchItemTypeAttributes();
    }, [fetchItemTypeAttributes, onError, onSuccess]);

    // Custom attribute creation function
    const itemTypeAttributesCreationHandler = useCallback((uploadType, file) => {
        const formData = new FormData();
        formData.append("filename", file.name);
        formData.append("uploadType", uploadType);
        formData.append("fileUpload", file);

        adminApi({
            method: "put",
            url: `itemTypes/${itemType}`,
            data: formData,
            showNotification: true,
            onSuccess: onAttributeCreation,
            onError,
        });
        fetchItemTypeAttributes();
        setCustomAttributesCreateModalShow(false);
    }, [itemType, onAttributeCreation, onError, fetchItemTypeAttributes])

    const tableData = data => {
        return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {data.label}
                </Table.Cell>
                <Table.Cell>
                    {data.id}
                </Table.Cell>
                <Table.Cell>
                    {data.type}
                </Table.Cell>
                <Table.Cell>
                    {data.custom.toString()}
                </Table.Cell>
                <Table.Cell>
                    {data['length']}
                </Table.Cell>
            </Table.Row>

        )
    }

    return (
        <React.Fragment>
            <Modal
                show={showModal}
                size="md"
                popup={true}
                onClose={() => setModalView(false)}
                className="z-60"
            >
                <Modal.Body>
                    <div className="text-center">
                        <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to create item attributes?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => { }}>
                                Yes, I am sure
                            </Button>
                            <Button color="gray" onClick={() => setModalView(false)} >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={customAttributesCreateModalShow}
                size="4xl"
                popup={true}
                onClose={() => setCustomAttributesCreateModalShow(false)}
            >
                <Modal.Header>Custom Attributes Creation</Modal.Header>
                <Modal.Body>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        setForm(event);
                        setModalView(true);
                    }}>
                        <Button className="mt-10 w-2/6 mb-4" value="sign-in" type="submit">Add More Attributes</Button>
                        <div className="w-full m-auto">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="customAttribute"
                                    value="Custom Attribute"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Select type="text" id="customAttribute" className="mb-2" name="attributes[0][type]"
                                    defaultValue="shortText"
                                >
                                    <option value="none" disabled>Select Data Type</option>
                                    <option value="shortText">Short Text</option>
                                    <option value="longText">Long Text</option>
                                    <option value="richText">Rich Text</option>
                                    <option value="number">Number</option>
                                    <option value="checkbox">Check Box</option>
                                    <option value="date">Date</option>
                                    <option value="enumerated">Selection List</option>
                                </Select>
                                <TextInput type="text" className="mb-2" name="attributes[0][id]" required placeholder="Ex: x_newAttribute" />
                                <TextInput type="text" className="mb-2" name="attributes[0][label]" required placeholder="Ex: New Attribute" />
                                <TextInput type="number" className="mb-2" name="attributes[0][length]" required placeholder="Ex: 10000" />
                            </div>
                            <div className="flex gap-4">
                                <Button className="m-auto mt-10 w-2/6" value="sign-in" type="submit">Create</Button>
                                <Button color="gray" className="m-auto mt-10 w-2/6" onClick={() => setCustomAttributesCreateModalShow(false)} >
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Card className="mb-4">
                <div className="flex flex-col phone:flex-row justify-end gap-4">
                    <Select
                        defaultValue={itemType}
                        onClick={fetchItemTypeAttributes}
                        onChange={(e) => updateItemType(e.target.value)}
                        className="w-min:w-10"
                    >
                        <option value="none" disabled>Select Item Type</option>
                        <option value="appeasement">Appeasement</option>
                        <option value="appeasementComment">Appeasement Comment</option>
                        <option value="appeasementRefund">Appeasement Refund</option>
                        <option value="category">Category</option>
                        <option value="commerceItem">Commerce Item</option>
                        <option value="contactInfo">Contact Info</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="creditCardAppeasementRefund">Credit Card Appeasement Refund</option>
                        <option value="customCurrencyAppeasementRefund">Custom Currency Appeasement Refund</option>
                        <option value="customCurrencyPaymentGroup">Custom Currency Payment Group</option>
                        <option value="electronicShippingGroup">Electronic Shipping Group</option>
                        <option value="externalAppeasementRefund">External Appeasement Refund</option>
                        <option value="gift-item">Gift Item</option>
                        <option value="gift-list">Gift List</option>
                        <option value="hardgoodShippingGroup">Hardgood Shipping Group</option>
                        <option value="inStorePickupShippingGroup">In-Store Pickup Shipping Group</option>
                        <option value="inStoreTakeWithShippingGroup">In-Store Take With Shipping Group</option>
                        <option value="invoiceRequest">Invoice Request</option>
                        <option value="loyaltyPrograms">Loyalty Programs</option>
                        <option value="mailing">Mailing</option>
                        <option value="onlinePaymentGroup">Online Payment Group</option>
                        <option value="onlinePaymentGroupAppeasementRefund">Online Payment Group Appeasement Refund</option>
                        <option value="orderAgentComment">Order Agent Comment</option>
                        <option value="organization">Organization</option>
                        <option value="organizationRequest">Organization Request</option>
                        <option value="physicalGiftCard">Physical Gift Card</option>
                        <option value="physicalGiftCardAppeasementRefund">Physical Gift Card Appeasement Refund</option>
                        <option value="profileAgentComment">Profile Agent Comment</option>
                        <option value="profileRequest">Profile Request</option>
                        <option value="promotion">Promotion</option>
                        <option value="quoteInfo">Quote Info</option>
                        <option value="returnComment">Return Comment</option>
                        <option value="returnItem">Return Item</option>
                        <option value="storeCreditAppeasementRefund">Store Credit Appeasement Refund</option>
                        <option value="tokenizedCreditCard">Tokenized Credit Card</option>
                        <option value="tokenizedCreditCardAppeasementRefund">Tokenized Credit Card Appeasement Refund</option>
                        <option value="userSiteProperties">User Site Properties</option>
                    </Select>

                    <Button type="button" onClick={() => setCustomAttributesCreateModalShow(true)}>Create Custom Attributes</Button>
                </div>
            </Card>
            {
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>
                            Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Id
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Type
                        </Table.HeadCell>
                        <Table.HeadCell>
                            OOTB Type
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Length
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {(items.specifications && items.specifications.length) > 0 ? items.specifications.slice(newOffset, newOffset + pagination.limit).map(item => tableData(item)) :
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={"no-results"}>
                                <Table.Cell colSpan={6} className="text-center">No Results Found.</Table.Cell>
                            </Table.Row>
                        }
                    </Table.Body>
                </Table>
            }
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
        </React.Fragment >
    )
}
