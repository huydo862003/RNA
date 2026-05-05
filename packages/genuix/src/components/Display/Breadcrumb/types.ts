import type {
  Component,
  ComputedRef,
  InjectionKey,
  Ref,
} from 'vue';
import type {
  GIconName,
} from '@/components/Display/Icon/types';

export interface BreadcrumbContext {
  items: Ref<symbol[]>;
  collapsedSet: ComputedRef<Set<symbol>>;
  register(id: symbol): void;
  unregister(id: symbol): void;
  separator: string | GIconName;
}

export const BREADCRUMB_KEY: InjectionKey<BreadcrumbContext> = Symbol('GBreadcrumb');

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: GIconName;
  as?: Component | string;
  props?: Record<string, unknown>;
}
