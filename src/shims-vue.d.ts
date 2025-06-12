// shims-vue.d.ts
// This file tells TypeScript how to handle `.vue` imports

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, object, unknown>;
  export default component;
}
