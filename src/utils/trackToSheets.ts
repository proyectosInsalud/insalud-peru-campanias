export async function trackToSheets(
  tipo: string,
  sede: string,
  tratamiento: string
) {
  try {
    await fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, sede, tratamiento }),
    });
  } catch (error) {
    console.error(`Error tracking ${tipo}:`, error);
  }
}
