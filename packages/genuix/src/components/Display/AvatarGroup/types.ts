import { InjectionKey } from 'vue';

export interface AvatarGroupContext {
  register (avatar: unknown): void;
  unregister (avatar: unknown): void;
  isVisible (avatar: unknown): boolean;
}

export const AVATAR_GROUP_KEY: InjectionKey<AvatarGroupContext> = Symbol('GAvatarGroup');
