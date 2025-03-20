import { ComponentPublicInstance } from 'vue';
import Store from './src/store/index';
declare module 'vue/types/options' {
  interface ComponentOptions<V extends ComponentPublicInstance> {
    store?: Store<any>;
  }
}

declare module 'vue/types/vue' {
  interface ComponentPublicInstance {
    $store: Store<any>;
  }
}
