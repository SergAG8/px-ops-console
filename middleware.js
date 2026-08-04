export const config = { matcher: '/:path*' };

const encoder = new TextEncoder();

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function verify(token, secret) {
  try {
    const [payload, sig] = token.split('.');
    const expected = await sign(payload, secret);
    if (expected !== sig) return null;
    const data = JSON.parse(atob(payload));
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function middleware(req) {
  const url = new URL(req.url);
  if (url.pathname === '/login' || url.pathname === '/api/login') {
    return;
  }
  const secret = process.env.AUTH_SECRET || '';
  const cookieHeader = req.headers.get('cookie') || '';
  const m = cookieHeader.match(/px_auth=([^;]+)/);
  const token = m ? decodeURIComponent(m[1]) : null;
  const session = token ? await verify(token, secret) : null;
  if (!session) {
    return Response.redirect(new URL('/login', req.url), 302);
  }
}
