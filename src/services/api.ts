// API service layer - ready for Django backend integration
import {
  Emergency,
  Paramedic,
  EventStats,
  ApiResponse,
  Location,
  EmergencyStatus,
  EmergencySeverity,
} from "../types";
import { mockEmergencies, mockParamedics, mockEventStats } from "./mockData";

// Base API configuration - replace with actual Django backend URL
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Simulated network delay for realistic mock behavior
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// In-memory state for mock data (will be replaced by real API calls)
let emergenciesStore = [...mockEmergencies];
let paramedicsStore = [...mockParamedics];
let statsStore = { ...mockEventStats };

/**
 * Emergency API endpoints
 */
export const emergencyApi = {
  // Get all emergencies
  getAll: async (): Promise<ApiResponse<Emergency[]>> => {
    await simulateDelay(300);
    return {
      success: true,
      data: emergenciesStore,
    };
  },

  // Get emergency by ID
  getById: async (id: string): Promise<ApiResponse<Emergency>> => {
    await simulateDelay(200);
    const emergency = emergenciesStore.find((e) => e.id === id);
    if (!emergency) {
      throw new Error("Emergency not found");
    }
    return {
      success: true,
      data: emergency,
    };
  },

  // Create new emergency
  create: async (data: {
    reporterId: string;
    reporterName: string;
    reporterPhone?: string;
    location: Location;
    description: string;
    severity: EmergencySeverity;
    category: string;
  }): Promise<ApiResponse<Emergency>> => {
    await simulateDelay(400);

    const newEmergency: Emergency = {
      id: `e${Date.now()}`,
      ...data,
      status: "requested",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    emergenciesStore = [newEmergency, ...emergenciesStore];
    statsStore.totalIncidents++;
    statsStore.activeIncidents++;

    return {
      success: true,
      data: newEmergency,
      message: "Emergency request created successfully",
    };
  },

  // Update emergency status
  updateStatus: async (
    id: string,
    status: EmergencyStatus,
    paramedicId?: string,
  ): Promise<ApiResponse<Emergency>> => {
    await simulateDelay(300);

    const index = emergenciesStore.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error("Emergency not found");
    }

    const emergency = emergenciesStore[index];
    const now = new Date().toISOString();

    const updatedEmergency: Emergency = {
      ...emergency,
      status,
      updatedAt: now,
      ...(paramedicId && { assignedParamedicId: paramedicId }),
      ...(status === "resolved" && {
        resolvedAt: now,
        responseTime: Math.round(
          (new Date(now).getTime() - new Date(emergency.createdAt).getTime()) /
            60000,
        ),
      }),
    };

    emergenciesStore[index] = updatedEmergency;

    // Update stats
    if (status === "resolved") {
      statsStore.activeIncidents--;
      statsStore.resolvedIncidents++;
    }

    return {
      success: true,
      data: updatedEmergency,
      message: `Emergency status updated to ${status}`,
    };
  },

  // Get active emergencies (not resolved or cancelled)
  getActive: async (): Promise<ApiResponse<Emergency[]>> => {
    await simulateDelay(250);
    const active = emergenciesStore.filter(
      (e) => e.status !== "resolved" && e.status !== "cancelled",
    );
    return {
      success: true,
      data: active,
    };
  },
};

/**
 * Paramedic API endpoints
 */
export const paramedicApi = {
  // Get all paramedics
  getAll: async (): Promise<ApiResponse<Paramedic[]>> => {
    await simulateDelay(300);
    return {
      success: true,
      data: paramedicsStore,
    };
  },

  // Get available paramedics
  getAvailable: async (): Promise<ApiResponse<Paramedic[]>> => {
    await simulateDelay(250);
    const available = paramedicsStore.filter((p) => p.status === "available");
    return {
      success: true,
      data: available,
    };
  },

  // Update paramedic location
  updateLocation: async (
    id: string,
    location: Location,
  ): Promise<ApiResponse<Paramedic>> => {
    await simulateDelay(200);

    const index = paramedicsStore.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Paramedic not found");
    }

    paramedicsStore[index] = {
      ...paramedicsStore[index],
      location,
    };

    return {
      success: true,
      data: paramedicsStore[index],
    };
  },

  // Assign paramedic to emergency
  assign: async (
    paramedicId: string,
    emergencyId: string,
  ): Promise<ApiResponse<Paramedic>> => {
    await simulateDelay(300);

    const index = paramedicsStore.findIndex((p) => p.id === paramedicId);
    if (index === -1) {
      throw new Error("Paramedic not found");
    }

    paramedicsStore[index] = {
      ...paramedicsStore[index],
      status: "busy",
      assignedIncidentId: emergencyId,
    };

    // Update emergency status
    const emergencyIndex = emergenciesStore.findIndex(
      (e) => e.id === emergencyId,
    );
    if (emergencyIndex !== -1) {
      emergenciesStore[emergencyIndex] = {
        ...emergenciesStore[emergencyIndex],
        status: "assigned",
        assignedParamedicId: paramedicId,
        assignedParamedicName: paramedicsStore[index].name,
        updatedAt: new Date().toISOString(),
      };
    }

    // Update stats
    statsStore.availableParamedics--;
    statsStore.busyParamedics++;

    return {
      success: true,
      data: paramedicsStore[index],
      message: "Paramedic assigned successfully",
    };
  },
};

/**
 * Event Statistics API endpoints
 */
export const statsApi = {
  // Get event statistics
  get: async (): Promise<ApiResponse<EventStats>> => {
    await simulateDelay(200);

    // Recalculate stats based on current data
    const activeIncidents = emergenciesStore.filter(
      (e) => e.status !== "resolved" && e.status !== "cancelled",
    ).length;

    const resolvedIncidents = emergenciesStore.filter(
      (e) => e.status === "resolved",
    ).length;

    const responseTimes = emergenciesStore
      .filter((e) => e.responseTime !== undefined)
      .map((e) => e.responseTime!);

    const averageResponseTime =
      responseTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;

    const availableParamedics = paramedicsStore.filter(
      (p) => p.status === "available",
    ).length;

    const busyParamedics = paramedicsStore.filter(
      (p) => p.status === "busy",
    ).length;

    const currentStats: EventStats = {
      totalIncidents: emergenciesStore.length,
      activeIncidents,
      resolvedIncidents,
      averageResponseTime: Math.round(averageResponseTime * 10) / 10,
      availableParamedics,
      busyParamedics,
    };

    statsStore = currentStats;

    return {
      success: true,
      data: currentStats,
    };
  },
};

/**
 * Utility function to reset mock data (useful for testing)
 */
export const resetMockData = () => {
  emergenciesStore = [...mockEmergencies];
  paramedicsStore = [...mockParamedics];
  statsStore = { ...mockEventStats };
};
