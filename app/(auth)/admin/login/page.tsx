"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../../../(landing)/components/ui/button";
import { toastError, toastSuccess } from "../../../utils/toast-notification";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { login } from "../../../services/auth.service";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/products");
    }
  }, [router]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await login({ email, password });

      if (data.token) {
        toastSuccess("Login success, redirecting to admin dashboard");
        setTimeout(() => {
          router.push("/admin/products");
        }, 2000);
      }
    } catch (error) {
      toastError(
        error.message || "Something went wrong, please try again later.",
      );
      setErrorMsg(
        error.message || "Something went wrong, please try again later.",
      );
      console.error("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-[#F7F9FA]">
      <ToastContainer />
      <div className="w-full bg-white rounded-xl max-w-136 border-t-6 border-primary py-12 px-18">
        <Image
          src={"/images/logo-admin.svg"}
          alt="logo admin"
          width={304}
          height={51}
          className="mx-auto mb-4"
        />
        <p className="opacity-50 text-sm text-center mb-9">
          Enter your credentials to access the dashboard
        </p>
        {errorMsg && (
          <div className="px-3 py-1 bg-primary-light border border-r-primary rounded-md text-primary text-sm text-center w-full mb-3">
            {errorMsg}
          </div>
        )}
        <div className="input-group-admin mb-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Please type your email"
            className="rounded-lg!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full rounded-lg! mb-4" onClick={handleLogin}>
          {isLoading ? "Signing in ..." : "Sign in"}
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
