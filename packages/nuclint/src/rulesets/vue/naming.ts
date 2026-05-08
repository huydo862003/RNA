import type {
  Linter,
} from 'eslint';

/* Vue naming rules enforce consistent naming conventions for components, slots, and events */

export const vueNamingRules: Linter.RulesRecord = {
  // Enforce PascalCase for referencing components in templates
  'vue/component-name-in-template-casing': [
    'error',
    'PascalCase',
    {
      registeredComponentsOnly: false,
    },
  ],
  // Enforce kebab-case for slot names
  'vue/slot-name-casing': [
    'error',
    'kebab-case',
  ],
  // Enforce kebab-case for custom event names
  'vue/custom-event-name-casing': [
    'error',
    'kebab-case',
  ],
  // Enforce consistent macro variable naming
  'vue/require-macro-variable-name': [
    'error',
    {
      'defineProps': 'props',
      'defineEmits': 'emit',
      'defineSlots': 'slots',
      'useSlots': 'slots',
      'useAttrs': 'attrs',
    },
  ],
};
