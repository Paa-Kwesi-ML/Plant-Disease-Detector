export interface PlantDiagnosticReport {
  plantName: string;
  healthStatus: "Healthy" | "Diseased" | "Unknown" | string;
  diagnosedDisease: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  preventiveMeasures: string[];
}

export interface PredictionRecord {
  id: string;
  timestamp: string;
  image: string;
  plantName: string;
  diagnosedDisease: string;
  confidence: number;
  healthStatus: "Healthy" | "Diseased" | "Unknown" | string;
  symptoms: string[];
  treatment: string[];
  preventiveMeasures: string[];
}

export interface DatasetItem {
  id: string;
  name: string;
  description: string;
  sampleCount: number;
  fileSize: string;
  downloadUrl: string;
  category: "Leaves" | "Fruit" | "Mixed Crops" | "Vegetables";
  imageCountLabel?: string;
  accuracyScore?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  topic: string;
  message: string;
}

declare global {
  interface Window {
    tmImage?: {
      load: (modelUrl: string, metadataUrl: string) => Promise<{
        getTotalClasses: () => number;
        getClassLabels: () => string[];
        predict: (imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, maxPredictions?: number) => Promise<Array<{ className: string; probability: number }>>;
      }>;
    };
  }
}
