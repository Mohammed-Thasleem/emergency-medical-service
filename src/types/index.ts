// Core type definitions for EMS application

export type UserRole = 'attendee' | 'paramedic' | 'organizer';

export type EmergencyStatus = 'requested' | 'assigned' | 'on-the-way' | 'resolved' | 'cancelled';

export type EmergencySeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
}

export interface Paramedic {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location: Location;
  assignedIncidentId?: string;
}

export interface Emergency {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterPhone?: string;
  location: Location;
  status: EmergencyStatus;
  severity: EmergencySeverity;
  description: string;
  category: string;
  assignedParamedicId?: string;
  assignedParamedicName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  responseTime?: number; // in minutes
}

export interface EventStats {
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  averageResponseTime: number; // in minutes
  availableParamedics: number;
  busyParamedics: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
