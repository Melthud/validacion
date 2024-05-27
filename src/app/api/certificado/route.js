

import { query } from '../../../lib/db';

async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cedula = searchParams.get('cedula');

  if (!cedula) {
    return new Response(JSON.stringify({ error: 'Cédula es requerida' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const result = await query({
      query: 'SELECT * FROM certificado WHERE estudiante = ?',
      values: [cedula],
    });
    if (result.length === 0) {
      return new Response(JSON.stringify({ error: 'No se encontraron datos para esta cédula' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}