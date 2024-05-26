// app/certificado/[idcertificado].js
"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CertificadoPage() {
  const router = useRouter();
  const { idcertificado } = router.query;
  const [certificado, setCertificado] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const valueC = searchParams.get('idcertificado');
    setCedula(valueC);
  }, [router]);

  useEffect(() => {
    if (idcertificado) {
      const fetchCertificado = async () => {
        try {
          const res = await fetch(`/api/valcertificado?idcertificado=${idcertificado}`);
          if (!res.ok) {
            throw new Error("No se encontraron datos para este certificado");
          }
          const data = await res.json();
          setCertificado(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchCertificado();
    }
  }, [idcertificado]);

  if (error) {
    return <p className="text-red-500 mt-2">{error}</p>;
  }

  if (!certificado) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Detalles del Certificado</h1>
      <p>ID: {certificado.idcertificado}</p>
      <p>Nombre del Curso: {certificado.nombreCurso}</p>
      <p>Nota: {certificado.nota}</p>
      {/* Agrega más detalles si es necesario */}
    </div>
  );
}
