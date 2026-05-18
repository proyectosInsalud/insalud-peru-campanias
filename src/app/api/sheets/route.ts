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

    // Configurar auth de Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Importante reemplazar \n
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
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
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
