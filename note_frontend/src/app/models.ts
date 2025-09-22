export interface AuthResponse {
  // token returned from backend after login/signup
  token: string;
  user?: {
    id?: string | number;
    email: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name?: string;
}

export interface Note {
  id: string | number;
  title: string;
  content: string;
  updated_at?: string;
  created_at?: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
}

export interface UpdateNotePayload {
  title?: string;
  content?: string;
}
