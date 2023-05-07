"use client";
import React from "react";
import Alert, { AlertInfo } from "../components/alert"
import { TextInput, Button, Label } from "flowbite-react";
import { KeyIcon, WindowIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function Login() {

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target).entries();
    const payload = Object.fromEntries(formData);
  }

  return (
    <form onSubmit={submitForm} className="block">
      <AlertInfo
        color="success"
        className="z-10"
        icon={CheckBadgeIcon}
        // delay={3}
        message="You are successfully logged in..."
      />

      <section className="m-auto w-5/6 my-6 lg:flex bg-slate-200 dark:bg-slate-800 p-10 rounded-md gap-4 lg">
        <div className="w-3/1 flex m-auto mb-4 lg:mb-0">
          <img src="/apexian.jpg" className="rounded" alt="apexit banner" />
          </div>
        <div className="w-full m-auto">
          <div className="mb-2 block">
            <Label
              htmlFor="url"
              value="Instance URL"
            />
          </div>
          <TextInput id="url" className="mb-2" name="url" required placeholder="Ex: https://p1234567890dev-store.occa.ocs.oraclecloud.com" icon={WindowIcon} />
          <div className="mb-2 block mt-4">
            <Label
              htmlFor="token"
              value="Access (Bearer) Token"
            />
          </div>
          <TextInput id="token" className="block" name="token" required autoComplete="off" placeholder="Ex: eyJ2ZXJzaW9uIjowLCJ1cmkiOiJjbGllbnRBcHBsaWNhdGlvbnMvbXRtLXN0b3JlZnJvbnQvcGFnZS9sb2dpbi8iLCJoYXNoIjoiOEdnY2tBPT0ifQ==" icon={KeyIcon} />
          <Button className="mt-10 m-auto w-2/6" value="signin" type="submit">Sig in </Button>
        </div>
      </section>
    </form>

  )
}
