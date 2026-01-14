"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../../../(landing)/components/ui/button";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/admin/products");
  };
  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-[#F7F9FA]">
      <div className="w-full bg-white rounded-xl max-w-136 border-t-6 border-primary py-12 px-18">
        <Image
          src={"/images/logo-admin.svg"}
          alt="logo admin"
          width={304}
          height={51}
          className=" mx-auto mb-4"
        />
        <p className="opacity-50 text-sm text-center mb-9">
          Enter your credentials to access the dashboard
        </p>
        <div className="input-group-admin mb-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Please type your email"
            className="rounded-lg!"
          />
        </div>
        <div className="input-group-admin mb-12">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••••••••••••••"
            className="rounded-lg!"
          />
        </div>
        <Button className="w-full rounded-lg! mb-8" onClick={handleLogin}>
          Sign in
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
