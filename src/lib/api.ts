const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8090";

export const api = {
  get: async (path: string, requireAuth = true) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (requireAuth) {
      const token = localStorage.getItem("boho_token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_URL}${path}`, { headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  post: async (path: string, body: any, requireAuth = true) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (requireAuth) {
      const token = localStorage.getItem("boho_token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  put: async (path: string, body: any, requireAuth = true) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (requireAuth) {
      const token = localStorage.getItem("boho_token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  delete: async (path: string, requireAuth = true) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (requireAuth) {
      const token = localStorage.getItem("boho_token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
};
