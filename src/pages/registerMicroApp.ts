import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'vue app1', // app name registered
    entry: '//localhost:7100',
    container: '#app1Cont',
    activeRule: '/app1Ru',
  },
  {
    name: 'vue app2',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#app2Cont',
    activeRule: '/app2Ru',
  },
]);

start();