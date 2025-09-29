
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/ed2b132e66660932ae3972504fc2fac4b26cbd68.png': path.resolve(__dirname, './src/assets/ed2b132e66660932ae3972504fc2fac4b26cbd68.png'),
        'figma:asset/c35a7d3850c13da826eb704ee7b6ff3550e73b52.png': path.resolve(__dirname, './src/assets/c35a7d3850c13da826eb704ee7b6ff3550e73b52.png'),
        'figma:asset/a8874300174de4824a1addb97775a9cd28f6f762.png': path.resolve(__dirname, './src/assets/a8874300174de4824a1addb97775a9cd28f6f762.png'),
        'figma:asset/8d5a368abcc2f3aae0405a99719edc7142e70ae2.png': path.resolve(__dirname, './src/assets/8d5a368abcc2f3aae0405a99719edc7142e70ae2.png'),
        'figma:asset/3a8603163d49c6cc36d717f3c233ef19737140e8.png': path.resolve(__dirname, './src/assets/3a8603163d49c6cc36d717f3c233ef19737140e8.png'),
        'figma:asset/3606a7520ab77fa7198e35a59aac25f2b54aa822.png': path.resolve(__dirname, './src/assets/3606a7520ab77fa7198e35a59aac25f2b54aa822.png'),
        'figma:asset/24ffbe288bce42e59626a63b1da81bcb21dce94f.png': path.resolve(__dirname, './src/assets/24ffbe288bce42e59626a63b1da81bcb21dce94f.png'),
        'figma:asset/19dbf2dbedb00b9e97d44bc39a5ca3e1cbafd48e.png': path.resolve(__dirname, './src/assets/19dbf2dbedb00b9e97d44bc39a5ca3e1cbafd48e.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            // React core - always needed
            'react-vendor': ['react', 'react-dom'],
            
            // Animation libraries - used across app
            'animation': ['motion/react'],
            
            // UI components - used across multiple pages
            'ui-vendor': ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
            
            // Three.js ecosystem - only for 3D content
            'three-core': ['three'],
            'three-fiber': ['@react-three/fiber', '@react-three/drei'],
            
            // Form and validation
            'forms': ['react-hook-form'],
            
            // Stripe payment
            'payments': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
            
            // Other vendors (client-side only)
            'vendor': ['validator']
          }
        }
      },
      // Increase chunk size warning limit for 3D assets
      chunkSizeWarningLimit: 1000,
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });
