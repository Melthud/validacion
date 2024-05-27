

"use client";
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetear error
    try {
      
      const res = await fetch(`/api/validar?cedula=${cedula}`);
     
      if (!res.ok) {
        throw new Error("Cédula no encontrada");
      }
      const data = await res.json();
      if (data.exists) {
        router.push(`/validacion?cedula=${cedula}`);
      } else {
        setError("Cédula no encontrada");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section >
      <div className="mt-[10%] text-center">
       

        <p className="text-gray-900 font-black dark:text-white text-7xl">SEIDUQ - VALIDACIONES</p>
        <p className="p-5 text-lg text-gray-900 ">Ponga su número de cédula (En caso de no mostrar nada, póngase en contacto con administración)</p>
      </div>
      <div className="relative">
        <div className="p-2">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <label id="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Buscar</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cédula..."
                required
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buscar
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}