import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const { tipo, nombres, telefono, turno, sede, tratamiento } = await req.json();

    if (!tipo || !sede || !tratamiento) {
      return NextResponse.json(
        { mensaje: "Missing required fields" },
        { status: 400 }
      );
    }

    if (tipo === "formulario") {
      if (!nombres || String(nombres).trim().length === 0) {
        return NextResponse.json(
          { mensaje: "El nombre es requerido" },
          { status: 400 }
        );
      }

      if (!telefono || !/^9\d{8}$/.test(String(telefono))) {
        return NextResponse.json(
          { mensaje: "El teléfono debe tener 9 dígitos y comenzar con 9" },
          { status: 400 }
        );
      }
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail || !rawPrivateKey || !spreadsheetId) {
      const missing = [
        !serviceAccountEmail && 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
        !rawPrivateKey && 'GOOGLE_PRIVATE_KEY',
        !spreadsheetId && 'GOOGLE_SHEET_ID',
      ].filter(Boolean).join(', ');
      return NextResponse.json({ mensaje: "Faltan variables de entorno", detalle: missing }, { status: 500 });
    }

    // Normalizar saltos de línea del private key (puede venir con \\n o \n según el proveedor)
    const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

    // Configurar auth de Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });
    
    // Obtener la fecha y hora actual de Perú
    const now = new Date();
    const timestamp = now.toLocaleString('es-PE', { timeZone: 'America/Lima' });

    // Preparar la fila a insertar
    // Columnas esperadas: Timestamp, Tipo, Nombres, Teléfono, Turno, Sede, Tratamiento
    const row = [
      timestamp,
      tipo, // "formulario", "whatsapp_cta", "whatsapp_flotante"
      nombres || "-",
      telefono || "-",
      turno || "-",
      sede,
      tratamiento
    ];

    // Insertar fila
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Hoja 1!A:G", // Ajustar "Hoja 1" al nombre de la pestaña si es necesario
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error saving to Google Sheets:", errorMessage);
    return NextResponse.json(
      { mensaje: "Error saving to Google Sheets", detalle: errorMessage },
      { status: 500 }
    );
  }
}
