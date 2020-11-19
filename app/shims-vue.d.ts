// shims-vue.d.ts
// map vue file to TypeScript module for me
// enables import statements
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
