import {
  h, render,
} from 'vue';
import GToast from '@/components/Overlay/Toast/GToast.vue';
import type {
  GToastOptions,
} from '@/components/Overlay/Toast/types';
import {
  GToastSemantic,
} from '@/components/Overlay/Toast/types';

let globalToast: InstanceType<typeof GToast> | undefined;

export function useToast () {
  function info (
    message: string,
    options: GToastOptions = {},
  ) {
    const globalToast = getGlobalToast();

    globalToast?.push(message, GToastSemantic.Info, options);

  }

  function warning (
    message: string,
    options: GToastOptions = {},
  ) {
    const globalToast = getGlobalToast();

    globalToast?.push(message, GToastSemantic.Warning, options);

  }

  function danger (
    message: string,
    options: GToastOptions = {},
  ) {
    const globalToast = getGlobalToast();

    globalToast?.push(message, GToastSemantic.Danger, options);

  }

  function notice (
    message: string,
    options: GToastOptions = {},
  ) {
    const globalToast = getGlobalToast();

    globalToast?.push(message, GToastSemantic.Notice, options);

  }

  function message (
    message: string,
    semantic: GToastSemantic,
    options: GToastOptions = {},
  ) {
    const globalToast = getGlobalToast();

    globalToast?.push(message, semantic, options);

  }

  return {
    notice,
    danger,
    warning,
    info,
    message,
  };
}

function getGlobalToast (): InstanceType<typeof GToast> | undefined {
  if (!globalToast) return undefined;
  if (typeof window === 'undefined') return undefined;

  const mount = document.createElement('div');

  document.body.appendChild(mount);

  const toastVNode = h(GToast);

  render(toastVNode, mount);
  const instance = toastVNode.component?.proxy;

  globalToast = instance as InstanceType<typeof GToast> | undefined;

  return globalToast;
}
