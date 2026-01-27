<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faBook, faChartColumn, faUser } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <footer class="footer">
    <nav class="footer-nav">
      <router-link :to="{ name: 'home' }" class="footer-nav-item">
        <font-awesome-icon :icon="faHouse" />
        <span>Home</span>
      </router-link>
      <router-link :to="{ name: 'library' }" href="#" class="footer-nav-item">
        <font-awesome-icon :icon="faBook" />
        <span>Library</span>
      </router-link>
      <router-link :to="{ name: 'stats' }" class="footer-nav-item">
        <font-awesome-icon :icon="faChartColumn" />
        <span>Stats</span>
      </router-link>
      <router-link :to="{ name: 'profile' }" class="footer-nav-item">
        <font-awesome-icon :icon="faUser" />
        <span>Profile</span>
      </router-link>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  background-color: var(--color-card-bg);
  border-top: 1px solid var(--color-border);
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: var(--safe-area-bottom);
  box-shadow: 0px 0px 10px -4px;

}

.footer-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
}

.footer-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);

}

.footer-nav-item:active {
  transform: scale(0.95);
}

.footer-nav-item svg {
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.footer-nav-item span {
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.footer-nav-item--active {
  color: var(--color-primary);
}

.footer-nav-item--active svg {
  font-weight: 900;
}

.router-link-exact-active{
  box-shadow: 0px 0px 10px -1px;
}
</style>
