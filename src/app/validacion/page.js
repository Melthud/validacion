"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ValidacionPage() {
  const router = useRouter();

  const [cedula, setCedula] = useState(null);
  const [dataU, setDataU] = useState([]);
  const [dataC, setDataC] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cedulaValue = searchParams.get('cedula');
    setCedula(cedulaValue);
  }, [router]);

  useEffect(() => {
    if (cedula) {
      const fetchData = async () => {
        try {
          const resU = await fetch(`/api/usuarios?cedula=${cedula}`);
          const resC = await fetch(`/api/certificado?cedula=${cedula}`);
          if (!resU.ok && !resC.ok) {
            throw new Error("No se encontraron datos para esta cédula");
          }
       

          const dataU = await resU.json();
          const dataC = await resC.json();
          setDataU(dataU);
          setDataC(dataC);
          
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [cedula]);

  return (
    <div >
        <div>
        <p class="text-6xl font-black dark:text-white  text-gray-900  text-center pt-8">CERTIFICACIONES</p>
        <br></br>
        
        <p class="text-xl text-gray-900  text-center">Hola, bienvenido al sistema de verificacion de conocimientos de SEIDUQ.</p>
        
        <p class="text-xl text-gray-900  text-center">A continuacion tienes un tabla, donde se veran todos los certificados obtenidos de la persona que hayas buscado.</p>
        </div>
      {error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : (
        <div>
          {dataU.length > 0 && (
            <div className="text-center">
              <p className="font-black  text-gray-900  text-center pt-8">Información del Estudiante</p>
              {dataU.map((item) => (
                <div key={item.idusuario}>
                  <a className="font-black">Cedula: </a>
                  <a>{item.idusuario}</a>
                  <p></p>
                  <a className="font-black">Nombres: </a>
                  <a>{item.nombres}</a>
                  <p></p>
                  <a className="font-black">Apellidos: </a>
                  <a>{item.apellidos}</a>
                </div>
              ))}
            </div>
          )}

          {dataC.length > 0 && (
            <div className="px-[10%]">
              <h1 className="pb-3 font-black">Información de las Certificaciones Obtenidas</h1>
             
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID CERTIFICADO
                </th>
                <th scope="col" class="px-6 py-3">
                    NOMBRE DEL CURSO
                </th>
                <th scope="col" class="px-6 py-3">
                    NOTA
                </th>
                <th scope="col" class="px-6 py-3">
                    HORAS ACADEMICAS
                </th>
                <th scope="col" class="px-6 py-3">
                    CEDULA
                </th>
            </tr>
        </thead>
        <tbody>
            
        {dataC.map((item) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.estudiante}>
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{item.idcertificado}</td>
                      <td class="px-6 py-4">{item.nombreCurso}</td>
                      <td class="px-6 py-4">{item.nota}</td>
                      <td class="px-6 py-4">{item.horas}</td>
                      <td class="px-6 py-4">{item.estudiante}</td>
                    </tr>
                  ))}
           
        </tbody>
    </table>
    
</div>


            <div>
                <p class="text-sm text-gray-900 dark:text-white text-center">Nota Legal: SEIDUQ y la Dra. Isamar Quito Cabezas valida que los datos presentados anteriormente son reales y validos.</p>
                
            </div>
                        
            </div>
          )}
          {dataU.length === 0 && dataC.length === 0 && (
            <p>No se encontraron datos para esta cédula</p>
          )}
        </div>
      )}
    </div>
  );
}