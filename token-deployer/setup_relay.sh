#!/usr/bin/env bash
set -e

# File 1: package.json
cat << 'JSON' > package.json
{
"name": "digital-factory-relay",
"version": "1.0.0",
"private": true,
"main": "worker.js",
"dependencies": {}
}
JSON

# File 2: worker.js
cat << 'JS' > worker.js
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
JS

echo "Relay files created successfully. Running Wrangler deployment..."
npx wrangler deploy

