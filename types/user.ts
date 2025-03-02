export interface User {
  id: string; // UUID
  email: string;
  name: string;
  role: 'admin' | 'editor';
  status: 'active' | 'inactive';
  avatar_url: string;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface Session {
  user: User;
  token: string; // UUID
  expires_at: string;
}

export interface AuthResponse {
  session: Session | null;
  error: string | null;
} 