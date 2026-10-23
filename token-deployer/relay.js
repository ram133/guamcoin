export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      try {
        const data = await request.json();
        return new Response(JSON.stringify({ status: "success", received: data }), {
          headers: { "Content-Type": "application/json" },
          status: 200
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          headers: { "Content-Type": "application/json" },
          status: 400
        });
      }
    }
    return new Response("Digital Factory Relay Worker is active.", { status: 200 });
  }
};
