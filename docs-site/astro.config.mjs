import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'mossy-ui',
      description: 'Expo UI 기반 React Native 디자인 시스템 문서',
      customCss: ['./src/styles/parity.css'],
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'Design Tokens', link: '/design-tokens/' },
        { label: 'Components', link: '/components/' },
      ],
    }),
  ],
});
