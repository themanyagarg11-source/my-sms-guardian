import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.6616616c81b24d79b5aa9e043428cfd4',
  appName: 'MyHelper - SMS Assistant',
  webDir: 'dist',
  server: {
    url: 'https://6616616c-81b2-4d79-b5aa-9e043428cfd4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3b82f6',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;