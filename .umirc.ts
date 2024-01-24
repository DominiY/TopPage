import { defineConfig } from 'umi';

// 域名您可以自定义一个方便好记的
const domain = 'http://top.page.com';
const title = 'TopPage导航页';

export default defineConfig({
  title,
  favicons: [`${domain}/logo.png`],
  define: {
    'process.env.DOMAIN': domain,
    'process.env.TITLE': title,
  },
  routes: [{ path: '/', component: 'index' }],
  npmClient: 'pnpm',
});
