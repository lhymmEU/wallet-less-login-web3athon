import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Steganography } from '../utils/steganography';

export default function Login() {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [selectedFile, setSelectedFile] = useState();

  const welcome = "Welcome Back!";

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    const img = new Image();
    img.onload = function () {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }
    }
    img.src = URL.createObjectURL(event.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the encrypted mnemonic object from the image
    const retrievedMessage = Steganography.retrieve(canvasRef.current);
    console.log("The mnemonic contained in this access pass is: ", retrievedMessage);

  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="/goat.svg"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verify Your Pass!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <canvas className="stegano-canvas" ref={canvasRef} ></canvas>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.password}
                    onChange={handleChange}
                 />
                </div>
              </div>

              <div>
                <label htmlFor="fileUpload" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Pass
                </label>
                <div className="mt-2">
                  <input
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleFileUpload}
                  />
                  {selectedFile && <p>Pass selected: {selectedFile.name}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Verify My Pass
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#a9a9a9] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                >
                  <svg width="20" height="20" viewBox="0 0 212 203" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M199.559 80.5232L208.062 89.0257L191.057 106.031L208.062 157.046L199.559 199.559L148.544 182.554L123.036 199.559H89.0257L63.518 182.554L12.5026 199.559L4 157.046L21.0051 106.031L4 89.0257L12.5026 80.5232L4 38.0103L12.5026 4L72.0206 38.0103H140.041L199.559 4L208.062 38.0103L199.559 80.5232Z" stroke="black" strokeWidth="4.25129" />
                    <path d="M140.041 38.0103L131.539 72.0206L123.036 140.041H89.0258L80.5232 72.0206L72.0206 38.0103" stroke="black" strokeWidth="4.25129" />
                    <path d="M89.0258 140.041L63.5181 182.554" stroke="black" strokeWidth="4.25129" />
                    <path d="M123.036 140.041L148.544 182.554" stroke="black" strokeWidth="4.25129" />
                    <path d="M106.031 174.051V199.559" stroke="black" strokeWidth="4.25129" />
                    <path d="M21.0051 106.031L80.5231 72.0206" stroke="black" strokeWidth="4.25129" />
                    <path d="M131.539 72.0206L191.057 106.031" stroke="black" strokeWidth="4.25129" />
                    <path d="M89.0257 140.041L46.5128 123.036" stroke="black" strokeWidth="4.25129" />
                    <path d="M123.036 140.041L165.549 123.036" stroke="black" strokeWidth="4.25129" />
                  </svg>
                  <span className="text-sm font-semibold leading-6">Metamask</span>
                </a>

                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#b6b6b6] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                >
                  <svg width="20" height="20" viewBox="0 0 205 205" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M102.215 204.804C158.566 204.804 204.246 159.124 204.246 102.774C204.246 46.4235 158.566 0.742676 102.215 0.742676C45.8653 0.742676 0.18457 46.4235 0.18457 102.774C0.18457 159.124 45.8653 204.804 102.215 204.804Z" fill="#1652F0" />
                    <path d="M111.621 134.658C116.843 134.658 122.064 133.502 126.687 131.769L136.531 146.834C127.843 151.477 118.556 153.789 108.712 153.789C79.1589 153.789 57.1187 134.08 57.1187 102.774C57.6966 71.4668 80.3147 51.7581 109.29 51.7581C119.732 51.7581 127.265 54.0698 135.376 58.135L126.109 73.7785C121.466 72.0447 116.265 70.8889 111.044 70.8889C93.6465 70.8889 79.7368 81.909 79.7368 102.774C79.7368 122.482 93.0686 134.658 111.621 134.658Z" fill="white" />
                  </svg>
                  <span className="text-sm font-semibold leading-6">Coinbase</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
