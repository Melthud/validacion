"use client";
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
    const resultU = await query({
      query: 'SELECT COUNT(*) as count FROM usuario WHERE idusuario = ?',
      values: [cedula],
    });

    const resultC = await query({
        query: 'SELECT COUNT(*) as count FROM certificado WHERE estudiante = ?',
        values: [cedula],
    });

    const exists = resultC[0].count > 0 || resultU[0].count > 0;
    return new Response(JSON.stringify({ exists }), {
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