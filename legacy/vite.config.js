import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        home: resolve(__dirname, 'home.html'),
        events: resolve(__dirname, 'events.html'),
        team: resolve(__dirname, 'team.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        leader: resolve(__dirname, 'leader-dashboard.html'),
        student: resolve(__dirname, 'student-dashboard.html'),
      },
    },
  },
});
