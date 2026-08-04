export const config = { runtime: 'edge' };
const encoder = new TextEncoder();

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

function loginHtml(error) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>PX Ops Console — Login</title>
<style>
  body{background:#0a0c10;color:#e2e8f0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
  form{background:#12151c;border:1px solid #262b36;border-radius:12px;padding:32px;width:280px}
  h1{font-size:15px;margin:0 0 20px}
  input{width:100%;padding:8px;margin-bottom:12px;border-radius:8px;border:1px solid #262b36;background:#0a0c10;color:#e2e8f0;box-sizing:border-box}
  button{width:100%;padding:9px;border-radius:8px;border:none;background:#7c3aed;color:white;font-weight:500;cursor:pointer}
  p.err{color:#f87171;font-size:13px;margin:0 0 12px}
</style></head>
<body>
<form method="POST" action="/login">
  <h1>PX Ops Console</h1>
  ${error ? `<p class="err">${error}</p>` : ''}
  <input name="username" placeholder="Username" autocomplete="username" required />
  <input name="password" type="password" placeholder="Password" autocomplete="current-password" required />
  <button type="submit">Sign in</button>
</form>
</body></html>`;
}

export default async function handler(req) {
  if (req.method === 'GET') {
    return new Response(loginHtml(null), { headers: { 'content-type': 'text/html' } });
  }
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const form = await req.formData();
  const username = (form.get('username') || '').toString().toLowerCase().trim();
  const password = (form.get('password') || '').toString();

  let users = {};
  try { users = JSON.parse(process.env.APP_USERS || '{}'); } catch {}

  if (!users[username] || users[username] !== password) {
    return new Response(loginHtml('Invalid username or password'), { status: 401, headers: { 'content-type': 'text/html' } });
  }

  const payload = btoa(JSON.stringify({ u: username, exp: Date.now() + 1000 * 60 * 60 * 24 * 14 }));
  const sig = await sign(payload, process.env.AUTH_SECRET || '');
  const token = encodeURIComponent(`${payload}.${sig}`);

  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': `px_auth=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 14}`,
      Location: '/',
    },
  });
}
