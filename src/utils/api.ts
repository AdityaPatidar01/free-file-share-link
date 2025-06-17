
// API configuration and utility functions
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export interface FileUploadResponse {
  shareCode: string;
  fileName: string;
  fileSize: number;
  uploadTime: string;
  expiryTime: string;
}

export interface FileInfo {
  fileName: string;
  fileSize: number;
  uploadTime: string;
  expiryTime: string;
}

export const uploadFile = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
};

export const getFileInfo = async (shareCode: string): Promise<FileInfo> => {
  const response = await fetch(`${API_BASE_URL}/api/files/info/${shareCode}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('File not found');
  }

  return response.json();
};

export const downloadFile = async (shareCode: string): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/api/files/download/${shareCode}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Download failed');
  }

  return response.blob();
};

export const generateShareLink = (shareCode: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}?code=${shareCode}`;
};
