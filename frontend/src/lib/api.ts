import { ApiResponse, CollegeFilters } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: { message: 'Network error' } }));
    throw new Error(error.error?.message || `API error: ${res.status}`);
  }
  return res.json();
}

function buildQuery(params: Record<string, any>): string {
  const filtered = Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== null);
  if (filtered.length === 0) return '';
  return '?' + new URLSearchParams(filtered.map(([k, v]) => [k, String(v)])).toString();
}

export const api = {
  // Colleges
  getColleges: (filters: CollegeFilters) =>
    fetchApi<any[]>(`/api/colleges${buildQuery(filters)}`),

  getCollege: (id: number) =>
    fetchApi<any>(`/api/colleges/${id}`),

  searchColleges: (q: string, limit = 10) =>
    fetchApi<any[]>(`/api/colleges/search?q=${encodeURIComponent(q)}&limit=${limit}`),

  getStates: () =>
    fetchApi<string[]>('/api/colleges/states'),

  getCities: (state?: string) =>
    fetchApi<string[]>(`/api/colleges/cities${state ? `?state=${encodeURIComponent(state)}` : ''}`),

  // Courses
  getCourses: (filters: { stream?: string; level?: string; page?: number; limit?: number }) =>
    fetchApi<any[]>(`/api/courses${buildQuery(filters)}`),

  getCourse: (id: number) =>
    fetchApi<any>(`/api/courses/${id}`),

  getStreams: () =>
    fetchApi<string[]>('/api/courses/streams'),

  // Exams
  getExams: (filters: { type?: string; page?: number; limit?: number }) =>
    fetchApi<any[]>(`/api/exams${buildQuery(filters)}`),

  getExam: (id: number) =>
    fetchApi<any>(`/api/exams/${id}`),

  // Compare
  compareColleges: (collegeIds: number[]) =>
    fetchApi<any[]>('/api/compare', {
      method: 'POST',
      body: JSON.stringify({ collegeIds }),
    }),

  // Auth
  register: (data: { name: string; email: string; password: string }) =>
    fetchApi<any>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    fetchApi<any>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  // Saved
  getSaved: (token: string) =>
    fetchApi<any[]>('/api/saved', { headers: { Authorization: `Bearer ${token}` } }),

  getSavedIds: (token: string) =>
    fetchApi<number[]>('/api/saved/ids', { headers: { Authorization: `Bearer ${token}` } }),

  saveCollege: (collegeId: number, token: string) =>
    fetchApi<any>('/api/saved', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ collegeId }),
    }),

  removeCollege: (collegeId: number, token: string) =>
    fetchApi<any>(`/api/saved/${collegeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Reviews
  getReviews: (collegeId: number, page = 1) =>
    fetchApi<any[]>(`/api/reviews/${collegeId}?page=${page}`),

  // Stats
  getStats: () =>
    fetchApi<{ totalColleges: number; totalCourses: number; totalExams: number }>('/api/stats'),
};
