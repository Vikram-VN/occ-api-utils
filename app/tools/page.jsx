"use client";
import React from "react";
import Excel2Json from "./fileConvert";
import { Accordion, Card } from "flowbite-react";

export default function Tools(props) {
  return (
    <React.Fragment>

      <Card className="mb-4">
        <h1 className="mb-4 text-4xl text-justify bold ">Common tools for daily life use.</h1>
      </Card>

      <Accordion collapseAll>

        <Accordion.Panel>
          <Accordion.Title>
            Convert json to xlsx and vice versa.
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="text-2xl mb-4">Convert xlsx to json</h1>
            <Excel2Json label="Download JSON" fileType="json" />
            <h1 className="text-2xl mt-10 mb-4">Convert json to xlsx</h1>
            <Excel2Json label="Download XLSX" fileType="xlsx" />
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title>
            Xlsx to csv and csv to xlsx
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="text-2xl mt-10 mb-4">Convert xlsx to csv</h1>
            <Excel2Json label="Download CSV" fileType="csv" />
            <h1 className="text-2xl mt-10 mb-4">Convert csv to xlsx</h1>
            <Excel2Json label="Download XLSX" fileType="xlsx" />
          </Accordion.Content>
        </Accordion.Panel>

      </Accordion>
    </React.Fragment>
  )
}
