export type Role = "ADMIN" | "USER";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: number;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}


export interface Bitacora {
  id: number;
  action: string;
  entityType: string;
  entityId?: number;
  userId: number;
  details?: string;
  createdAt: string;
  user: { email: string; name?: string };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
