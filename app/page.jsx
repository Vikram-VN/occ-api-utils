import React from "react";
import Image from "next/image";
import { Carousel, Button } from "flowbite-react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <React.Fragment>
      <div className="h-[32rem] m-auto rounded-md hidden tablet:block">
        <Carousel>
          <Image
            src="/media/apiBanner.png"
            alt="apiBanner"
            width={1000}
            height={500}
          />
          <Image
            src="/media/apiInfoBanner.png"
            alt="apiInfoBanner"
            width={1000}
            height={500}
          />
          <Image
            src="/media/storeBanner.png"
            alt="storeBanner"
            width={1000}
            height={500}
          />
          <Image
            src="/media/dataBaseBanner.png"
            alt="dataBaseBanner"
            width={1000}
            height={500}
          />
        </Carousel>
      </div>
      <div className="inline-flex ml-1 flex-col tablet:flex-row">
        <div className="w-full">
          <h1 className="mt-10 mb-4 text-4xl text-start bold ">
            Oracle Commerce
          </h1>
          <div className="occ-primary pr-5">
            <p>
              Oracle Commerce is an ecommerce platform that helps B2C and B2B
              businesses connect customer and sales data from their CRM to their
              financial and operational data so they can offer personalized
              experiences to buyers across sales channels.
            </p>
            <Link
              href="https://www.oracle.com/in/cx/product-tours/#commerce"
              target="blank"
            >
              <Button
                pill={true}
                className="rounded-full hover:scale-105 ease-in duration-300 mt-4 pl-4 pr-4"
              >
                Take a product tour
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <h1 className="mt-10 mb-4 text-4xl text-start bold  pr-5">
            About the REST APIs
          </h1>
          <div className="occ-primary">
            <p className="mb-6">
              The Oracle Commerce Service REST APIs provide an extensive set of
              endpoints for configuring and managing your store. You can also
              use these APIs to extend the capabilities of your store by
              integrating with other Oracle Cloud offerings and external
              systems, including order management systems and payment providers.
            </p>
            <span>You can view a list of all &nbsp; </span>
            <Link
              href="https://docs.oracle.com/en/cloud/saas/cx-commerce/cxocc/rest-endpoints.html"
              className="inline-block"
              target="blank"
            >
              <Button
                pill={true}
                className="pl-4 pr-4 hover:scale-105 ease-in duration-300"
              >
                REST Endpoints
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="inline-flex gap-x-20 flex-col tablet:flex-row">
        <div className="primary w-full pr-1 text-start">
          <h1 className="mt-10 mb-4 text-4xl  text-start bold">
            About Commerce API Utils
          </h1>
          <p>
            <b>Commerce API Utils</b> is a powerful and versatile tool designed
            to facilitate the seamless handling of Oracle Commerce Cloud API
            actions. It serves as a comprehensive solution to streamline the
            communication and interaction between applications and the Oracle
            Commerce Cloud platform.
          </p>
          <br />
          <p>
            With Commerce API Utils, developers and system administrators can
            effectively manage and automate various tasks related to Oracle
            Commerce Cloud API operations. The tool provides a set of utility
            functions, libraries, and modules that simplify the integration and
            interaction with the API, reducing the complexity and effort
            required to perform common actions.
          </p>
          <br />
          <p>
            One of the key features of Commerce API Utils is its ability to
            handle authentication and authorization mechanisms, ensuring secure
            access to the Oracle Commerce Cloud API. It provides convenient
            methods to generate and manage authentication tokens, enabling
            seamless communication between applications and the platform.
          </p>
          <br />
          <p>
            Overall, Commerce API Utils serves as a valuable tool for developers
            and system administrators working with Oracle Commerce Cloud. By
            simplifying API interactions, handling authentication, and providing
            a range of useful utilities, the tool enhances productivity and
            efficiency when working with Oracle Commerce Cloud API actions.
          </p>
          <br />
        </div>
        <div className="w-full shadow-2xl hover:scale-105 ease-in duration-300 bg-white mt-10 mb-4 text-justify  bold rounded pt-16 pl-5 pr-5 text-slate-950  dark:bg-gray-800 dark:text-white">
          <div className="flex justify-evenly text-white text-4xl font-bold mb-8 hover:scale-105 ease-in duration-300  ">
            Quick Guide
          </div>
          <div className="flex flex-col items-center ">
            <p className="text-lg	hover:scale-105 ease-in duration-300">
              In the top right corner of the screen, select Log in.
            </p>
            <ArrowDownIcon className="h-10 w-7 " />
            <p className="text-lg	hover:scale-105 ease-in duration-300">
              Login with the instance ID and AppKey.
            </p>
            <ArrowDownIcon className="h-10 w-7 " />
            <p className="text-lg	hover:scale-105 ease-in duration-300">
              Use the sidebar to navigate to the menu of your choice.
            </p>
            <ArrowDownIcon className="h-10 w-7 " />
            <p className="text-lg	hover:scale-105 ease-in duration-300">
              Start using it
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
