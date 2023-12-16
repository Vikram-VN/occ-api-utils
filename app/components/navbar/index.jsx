"use client";
import React from "react";
import {
  DocumentIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  InboxArrowDownIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { Tooltip } from "flowbite-react";
import { useLoginStatus } from "@/store/hooks";

const NavBar = () => {
  // Rendering children"s conditionally
  const isLoggedIn = useLoginStatus();

  return (
    <div
      className="flex bg-slate-100 dark:bg-slate-800"
      suppressHydrationWarning
    >
      <div className="h-full mt-6">
        <Tooltip content="General Tools" placement="auto" className="z-20">
          <Link
            href="/tools"
            className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <WrenchScrewdriverIcon
              className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
              fill="currentColor"
              stroke="currentColor"
            />
            <span className="sr-only">General Tools</span>
          </Link>
        </Tooltip>

        {isLoggedIn && (
          <React.Fragment>
            {" "}
            <Tooltip content="Deployment" placement="auto" className="z-20">
              <Link
                href="/deployment"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <InboxArrowDownIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Deployment</span>
              </Link>
            </Tooltip>
            <Tooltip content="Export" placement="auto" className="z-20">
              <Link
                href="/export"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowUpTrayIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Export</span>
              </Link>
            </Tooltip>
            <Tooltip content="Extensions" placement="auto" className="z-20">
              <Link
                href="/extensions"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <PuzzlePieceIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Extensions</span>
              </Link>
            </Tooltip>
            <Tooltip content="Files" placement="auto" className="z-20">
              <Link
                href="/files"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <DocumentIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Files</span>
              </Link>
            </Tooltip>
            <Tooltip content="Import" placement="auto" className="z-20">
              <Link
                href="/import"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowDownTrayIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Import</span>
              </Link>
            </Tooltip>
            <Tooltip content="Item Types" placement="auto" className="z-20">
              <Link
                href="/items"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <CubeIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Item Types</span>
              </Link>
            </Tooltip>
            <Tooltip content="Merchant" placement="auto" className="z-20">
              <Link
                href="/merchant"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <BuildingStorefrontIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Merchant</span>
              </Link>
            </Tooltip>
            <Tooltip content="Organizations" placement="auto" className="z-20">
              <Link
                href="/organizations"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <UserGroupIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Organizations</span>
              </Link>
            </Tooltip>
            <Tooltip content="Profiles" placement="auto" className="z-20">
              <Link
                href="/profiles"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <UsersIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Profiles</span>
              </Link>
            </Tooltip>
            <Tooltip content="Search" placement="auto" className="z-20">
              <Link
                href="/search"
                className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <MagnifyingGlassIcon
                  className="w-6 h-6 text-slate-600 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <span className="sr-only">Search</span>
              </Link>
            </Tooltip>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default NavBar;
