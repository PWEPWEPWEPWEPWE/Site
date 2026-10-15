export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify({ status: "API Hazır" }), {
    headers: { 'content-type': 'application/json' },
  });
}
