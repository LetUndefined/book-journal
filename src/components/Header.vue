<script setup lang="ts">
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__brand">
        <div class="header__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h1 class="header__title">Book Journal</h1>
      </div>
      <div class="header__actions">
        <button class="header__btn" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
        <button class="header__btn header__btn--primary" aria-label="Add book">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-card-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: var(--safe-area-top);
}

.header__container {
  padding: 0 1rem;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.header__icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.header__icon svg {
  width: 20px;
  height: 20px;
}

.header__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.header__btn:active {
  transform: scale(0.95);
  background: rgba(45, 74, 62, 0.05);
}

.header__btn svg {
  width: 22px;
  height: 22px;
}

.header__btn--primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(45, 74, 62, 0.25);
}

.header__btn--primary:active {
  transform: scale(0.95);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
}
</style>
