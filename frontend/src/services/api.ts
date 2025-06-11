export interface CreateBookingRequest {
    customerName: string;
    email: string;
    phone: string;
    sportType: string;
    planType: string;
    date: string;
    time: string;
    location: string;
    participants: number;
    skillLevel?: string;
    requests?: string;
  }
  
  export interface Booking {
    id: number;
    customerName: string;
    email: string;
    phone: string;
    sportType: string;
    planType: string;
    date: string;
    time: string;
    location: string;
    participants: number;
    skillLevel?: string;
    status: string;
    requests?: string;
    assignedOperator?: Operator;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Operator {
    id: number;
    name: string;
    rating: number;
    experience: string;
    specialty: string;
    avatar: string;
    available: boolean;
  }
  
  const API_BASE_URL = 'http://localhost:3000/api';
  
  class ApiService {
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.statusText} - ${errorText}`);
      }
  
      return response.json();
    }
  
    // Bookings
    async createBooking(booking: CreateBookingRequest): Promise<Booking> {
      return this.request<Booking>('/bookings', {
        method: 'POST',
        body: JSON.stringify(booking),
      });
    }
  
    async getBookings(): Promise<Booking[]> {
      return this.request<Booking[]>('/bookings');
    }
  
    async getBooking(id: number): Promise<Booking> {
      return this.request<Booking>(`/bookings/${id}`);
    }
  
    async assignOperator(bookingId: number, operatorId: number): Promise<Booking> {
      return this.request<Booking>(`/bookings/${bookingId}/assign-operator`, {
        method: 'PATCH',
        body: JSON.stringify({ operatorId }),
      });
    }
  
    // Operators
    async getOperators(): Promise<Operator[]> {
      return this.request<Operator[]>('/operators');
    }
  
    async getAvailableOperators(): Promise<Operator[]> {
      return this.request<Operator[]>('/operators/available');
    }
  
    // 初期データ投入
    async seedOperators(): Promise<void> {
      return this.request<void>('/operators/seed', {
        method: 'POST',
      });
    }
  }
  
  export const apiService = new ApiService();