import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthImage from '../images/auth-image.jpg';
import { useForm } from 'react-hook-form';
import { login } from '../apis/login';
import { setUsername, setUserRole } from '../service/localstorage';

import Logo from '../images/logo.svg';

function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data, event) => {
    event.preventDefault();
    // console.log(data);
    // try {
    const response = await login(data.username, data.password);
    if (response.status) {
      setUserRole(response.body.role);
      setUsername(response.body.username);
      // console.log(response);

      switch (response.body.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'TEACHER':
          navigate('/faculty/dashboard');
          break;
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
      }
    }
  };

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                Welcome back! ✨
              </h1>
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="form-input w-full"
                      id="username"
                      aria-describedby="emailHelp"
                      {...register('username', {
                        required: 'Username must be required.',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Invalid username.',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-input w-full"
                      id="password"
                      {...register('password', {
                        required: 'Password must be required.',
                        // minLength: {
                        //   value: 0,
                        //   message: "Password must be at least 6 characters long",
                        // },
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
                    Sign In
                  </button>
                </div>
              </form>
              {/* Footer */}
              {/*<div className="pt-5 mt-6 border-t border-slate-200">*/}
              {/*<div className="text-sm">*/}
              {/*  Don’t you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signup">Sign Up</Link>*/}
              {/*</div>*/}
              {/* Warning */}
              {/*<div className="mt-5">*/}
              {/*  <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded">*/}
              {/*    <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">*/}
              {/*      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />*/}
              {/*    </svg>*/}
              {/*    <span className="text-sm">*/}
              {/*      To support you during the pandemic super pro features are free until March 31st.*/}
              {/*    </span>*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
          {/*<img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />*/}
        </div>
      </div>
    </main>
  );
}

export default Signin;
