import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.neurojuegos',
  appName: 'NeuroJuegos',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
