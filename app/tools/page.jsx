"use client";
import React from "react";
import Excel2Json from "./fileConvert";
import { Accordion, Card } from "flowbite-react";
import Image from "next/image";
import JsonEditor from "./json-editor";

export default function Tools(props) {

  return (
    <React.Fragment>

      <Card className="mb-4">
        <h1 className="mb-4 text-4xl text-justify bold ">Common tools for daily life use.</h1>
      </Card>

      <Accordion collapseAll>

        <Accordion.Panel>
          <Accordion.Title>
            JSON to XLSX and XLSX to JSON.
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="text-2xl mb-4 inline-block">Convert XLSX to JSON</h1>
            <Image src="media/Excel-to-JSON.png" height={100} width={100} alt="XLSX to JSON" className="inline ml-4" />
            <Excel2Json label="Download JSON" fileType="xlsx2Json" />
            <h1 className="text-2xl mt-10 mb-4 inline-block">Convert JSON to XLSX</h1>
            <Image src="media/JSON-to-Excel.png" height={100} width={100} alt="JSON to XLSX" className="inline ml-4" />
            <Excel2Json label="Download XLSX" fileType="json2Xlsx" />
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title>
            XLSX to CSV and CSV to XLSX
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="text-2xl mt-10 mb-4 inline-block">Convert XLSX to CSV</h1>
            <Image src="media/XLSX-to-CSV.png" height={120} width={120} alt="XLSX to CSV" className="inline ml-4" />
            <Excel2Json label="Download CSV" fileType="xlsx2Csv" />
            <h1 className="text-2xl mt-10 mb-4 inline-block">Convert CSV to XLSX</h1>
            <Image src="media/CSV-to-XLSX.png" height={100} width={100} alt="CSV to XLSX" className="inline ml-4" />
            <Excel2Json label="Download XLSX" fileType="csv2Xlsx" />
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title>
            JSON Editor
          </Accordion.Title>
          <Accordion.Content>
            <JsonEditor />
          </Accordion.Content>
        </Accordion.Panel>

      </Accordion>
    </React.Fragment>
  )
}
