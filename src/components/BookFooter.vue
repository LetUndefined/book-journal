<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faBook, faChartColumn, faUser } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <footer class="footer">
    <nav class="footer__nav">
      <a href="#" class="footer__nav-item footer__nav-item--active">
        <font-awesome-icon :icon="faHouse" />
        <span>Home</span>
      </a>
      <a href="#" class="footer__nav-item">
        <font-awesome-icon :icon="faBook" />
        <span>Library</span>
      </a>
      <a href="#" class="footer__nav-item">
        <font-awesome-icon :icon="faChartColumn" />
        <span>Stats</span>
      </a>
      <a href="#" class="footer__nav-item">
        <font-awesome-icon :icon="faUser" />
        <span>Profile</span>
      </a>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-card-bg);
  border-top: 1px solid var(--color-border);
  position: sticky;
  bottom: 0;
  z-index: 100;
  padding-bottom: var(--safe-area-bottom);
}

.footer__nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
}

.footer__nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
  -webkit-tap-highlight-color: transparent;
}

.footer__nav-item:active {
  transform: scale(0.95);
}

.footer__nav-item svg {
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.footer__nav-item span {
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.footer__nav-item--active {
  color: var(--color-primary);
}

.footer__nav-item--active svg {
  font-weight: 900;
}
</style>
