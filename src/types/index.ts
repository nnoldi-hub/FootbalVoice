export type Category = 
  | 'all'
  | 'match-analysis'
  | 'player-portraits'
  | 'news-transfers'
  | 'predictions'
  | 'imaginary-interviews';

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: Category;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  featured: boolean;
  imageUrl?: string;
  audioUrl?: string;
  readTime: number;
  views: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  avatar?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string;
  subscribedAt: string;
  active: boolean;
  preferences: {
    categories: Category[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

export interface VoiceRecordingState {
  isRecording: boolean;
  isPaused: boolean;
  recordingType: 'title' | 'content' | 'both';
  audioChunks: Blob[];
}

export interface NewsletterTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
}