import type {
  Linter,
} from 'eslint';

/* Vue script rules enforce best practices in <script setup> */

export const vueScriptRules: Linter.RulesRecord = {
  // Enforce promise style for nextTick
  'vue/next-tick-style': [
    'error',
    'promise',
  ],
  // Prefer useTemplateRef over ref attribute
  'vue/prefer-use-template-ref': 'error',
  // Prefer v-model over manual value + event binding
  'vue/prefer-v-model': 'error',
  // Prefer single-argument event payloads
  'vue/prefer-single-event-payload': 'error',
};
