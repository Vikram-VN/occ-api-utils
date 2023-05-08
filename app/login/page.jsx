"use client";
import React, { useContext } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useToasts } from "../components/toast/";
import { StoreContext } from "../store/context";
import { formToJson } from "../utils";
import { fetchUser } from "../store/reducers/user";
import { TextInput, Button, Label } from "flowbite-react";
import { KeyIcon, WindowIcon } from "@heroicons/react/24/solid";

export default function Login() {

  const { action } = useContext(StoreContext);

  (async () => {
    console.log( await action(fetchUser()));
  })()


  const toast = useToasts();
  const router = useRouter();

  const submitForm = (event) => {
    event.preventDefault();
    const formData = event.target;
    const payload = formToJson(formData);
    axios.request({
      url: '/api',
      method: 'post',
      data: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        toast.show({
          status: "success",
          message: "You are successfully logged in..",
          delay: 3,
        });
        setTimeout(() => router.push('/files'), 1000);
      })
      .catch(error => {
        toast.show({
          status: "failure",
          message: error.response.data.error || error.response.data.message,
          delay: 3,
        });
      });
  }

  return (
    <form onSubmit={submitForm} className="block">
      <section className="m-auto w-5/6 my-6 lg:flex bg-slate-200 dark:bg-slate-800 p-10 rounded-md gap-4 lg">
        <div className="w-3/1 flex m-auto mb-4 lg:mb-0">
          <img src="/apexian.jpg" className="rounded" alt="apexit banner" />
        </div>
        <div className="w-full m-auto">
          <div className="mb-2 block">
            <Label
              htmlFor="instanceId"
              value="Instance Id"
            />
          </div>
          <TextInput id="instanceId" className="mb-2" name="instanceId" required placeholder="Ex: p1234567890dev" icon={WindowIcon} />
          <div className="mb-2 block mt-4">
            <Label
              htmlFor="token"
              value="Access (Bearer) Token"
            />
          </div>
          <TextInput id="token" className="block" name="accessToken" required autoComplete="off" placeholder="Ex: eyJ2ZXJzaW9uIjowLCJ1cmkiOiJjbGllbnRBcHBsaWNhdGlvbnMvbXRtLXN0b3JlZnJvbnQvcGFnZS9sb2dpbi8iLCJoYXNoIjoiOEdnY2tBPT0ifQ==" icon={KeyIcon} />
          <TextInput type="hidden" name="url" value="/ccadmin/v1/login" />
          <TextInput type="hidden" name="data" value="grant_type=client_credentials" />
          <TextInput type="hidden" name="contentType" value="application/x-www-form-urlencoded" />
          <TextInput type="hidden" name="method" value="post" />
          <Button className="mt-10 m-auto w-2/6" value="signin" type="submit">Sig in </Button>
        </div>
      </section>
    </form>

  )
}
