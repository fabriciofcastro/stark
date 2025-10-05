export interface ApiConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

class ApiService {
  private baseUrl: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiConfig = {}) {
    this.baseUrl = config.baseUrl || '/api';
    this.timeout = config.timeout || 10000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
        error.status = response.status;
        error.code = errorData.code;
        throw error;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          const timeoutError: ApiError = new Error('Request timeout');
          timeoutError.code = 'TIMEOUT';
          throw timeoutError;
        }
        throw error;
      }
      
      throw new Error('Erro desconhecido na requisição');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return this.request<T>(endpoint + (params ? `?${url.searchParams.toString()}` : ''));
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();

// Candidate API
export const candidateApi = {
  create: (data: any) => api.post('/candidates', data),
  getByEmail: (email: string) => api.get(`/candidates/profile?email=${encodeURIComponent(email)}`),
  update: (email: string, data: any) => api.put(`/candidates/profile?email=${encodeURIComponent(email)}`, data),
  applyToJob: (email: string, data: any) => api.post(`/candidates/apply?email=${encodeURIComponent(email)}`, data),
  getApplications: (email: string) => api.get(`/candidates/applications?email=${encodeURIComponent(email)}`),
  getJobs: () => api.get('/candidates/jobs'),
  getJobById: (id: string) => api.get(`/candidates/jobs/${id}`),
};

// Auth API
export const authApi = {
  loginWithGoogle: (data: any) => api.post('/auth/google', data),
  loginWithEmail: (email: string) => api.post('/auth/email', { email }),
  logout: () => api.post('/auth/logout'),
};

export default api;
