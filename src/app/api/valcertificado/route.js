// app/api/certificado/route.js
import { query } from '../../../lib/db';

async function GET(req) {
  const { searchParams } = new URL(req.url);
  const idcertificado = searchParams.get('idcertificado');

  if (!idcertificado) {
    return new Response(JSON.stringify({ error: 'ID de certificado es requerido' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const certificado = await query({
      query: 'SELECT * FROM certificado WHERE idcertificado = ?',
      values: [idcertificado],
    });

    if (certificado.length === 0) {
      return new Response(JSON.stringify({ error: 'Certificado no encontrado' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(certificado), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
