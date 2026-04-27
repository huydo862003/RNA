<template>
  <section class="hero-section">
    <div class="hero-header">
      <slot name="header" />
    </div>
    <div class="hero-icon">
      <slot name="icon" />
    </div>
    <div class="hero-title">
      <slot name="title" />
    </div>
    <div class="hero-description">
      <slot name="description" />
    </div>
    <div class="hero-footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
@reference '@/style.css';

.hero-section {
  @apply flex flex-col items-center text-center gap-3;
}

.hero-header,
.hero-footer {
  @apply self-stretch;
}
</style>
