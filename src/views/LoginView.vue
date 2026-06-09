<script setup lang="ts">
import { ref } from 'vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showErrors = ref(false);
const isSubmitted = ref(false);

const handleLogin = () => {
  if (!email.value || !password.value) {
    showErrors.value = true;
    return;
  }
  showErrors.value = false;
  isSubmitted.value = true;
};

const goHome = () => {
  window.location.hash = '';
};

const goSignup = () => {
  window.location.hash = '#signup';
};
</script>

<template>
  <div class="auth-page-container">
    <div class="auth-split-layout">
      <div class="scenic-backdrop-side">
        <div class="backdrop-image"></div>
        <div class="backdrop-overlay"></div>
        <div class="backdrop-content">
          <a href="#" @click.prevent="goHome" class="brand-logo">Entrada</a>
          <div class="backdrop-text-group">
            <span class="backdrop-tagline">- Start Your Journey</span>
            <h2 class="backdrop-title">Explore the World's Unseen Wonders</h2>
            <p class="backdrop-description">
              Join millions of global adventurers and secure booking packages to remote corners of the globe.
            </p>
          </div>
          <div class="backdrop-footer">
            <span class="copyright-text">© 2026 Entrada Travel. All Rights Reserved.</span>
          </div>
        </div>
      </div>

      <div class="form-wrapper-side">
        <div class="form-content-container">
          <div class="back-home-wrapper">
            <a href="#" @click.prevent="goHome" class="back-home-link">
              <BaseIcon name="arrow-left" size="18" />
              <span>Back to Home</span>
            </a>
          </div>

          <div v-if="isSubmitted" class="auth-success-state">
            <div class="success-icon-badge">
              <BaseIcon name="check" size="36" color="var(--color-white)" />
            </div>
            <h2 class="auth-success-title">Welcome Back!</h2>
            <p class="auth-success-msg">
              You have successfully authenticated as <strong>{{ email }}</strong>. Directing you to your homepage...
            </p>
            <BaseButton variant="solid" @click="goHome" class="explore-btn">
              Go to Home Page
            </BaseButton>
          </div>

          <div v-else class="auth-form-panel">
            <div class="panel-header">
              <h1 class="panel-title">Sign in to Entrada</h1>
              <p class="panel-subtitle">Enter your credentials below to access your account</p>
            </div>

            <form @submit.prevent="handleLogin" class="auth-form">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="e.g. john@example.com"
                  :class="['auth-input', { 'input-error': showErrors && !email }]"
                />
                <span v-if="showErrors && !email" class="field-error">Email is required</span>
              </div>

              <div class="form-group">
                <div class="label-row">
                  <label for="password">Password</label>
                  <a href="#" class="forgot-pass-link">Forgot?</a>
                </div>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="Enter your password"
                  :class="['auth-input', { 'input-error': showErrors && !password }]"
                />
                <span v-if="showErrors && !password" class="field-error">Password is required</span>
              </div>

              <div class="form-options-row">
                <label class="remember-me-label">
                  <input type="checkbox" v-model="rememberMe" class="auth-checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              <BaseButton type="submit" variant="solid" class="auth-submit-btn">
                Log in
              </BaseButton>
            </form>

            <div class="auth-switch-prompt">
              <span>Don't have an account yet?</span>
              <a href="#" @click.prevent="goSignup" class="switch-link">Sign up free</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page-container {
  min-height: 100vh;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
}

.auth-split-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 100vh;
  width: 100%;
}

.scenic-backdrop-side {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.backdrop-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1200&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  transition: transform 10s ease;
}

.scenic-backdrop-side:hover .backdrop-image {
  transform: scale(1.05);
}

.backdrop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(4, 6, 8, 0.95) 20%, rgba(26, 176, 166, 0.35) 100%);
  z-index: 1;
}

.backdrop-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 4rem;
  color: var(--color-white);
}

.brand-logo {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-white);
  text-decoration: none;
  letter-spacing: 1px;
  align-self: flex-start;
}

.backdrop-text-group {
  max-width: 540px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.backdrop-tagline {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.backdrop-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  color: var(--color-white);
}

.backdrop-description {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0;
  color: var(--color-white);
}

.backdrop-footer {
  font-family: var(--font-body);
  font-size: 0.85rem;
  opacity: 0.6;
  color: var(--color-white);
}

.form-wrapper-side {
  position: relative;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  overflow: hidden;
}

.form-content-container {
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.back-home-wrapper {
  align-self: flex-start;
}

.back-home-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-body);
  transition: color 0.25s ease;
}

.back-home-link:hover {
  color: var(--color-primary);
}

.auth-form-panel {
  background-color: rgba(4, 6, 8, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-panel);
  padding: 3rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-panel);
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.panel-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-dark);
  margin: 0;
}

.panel-subtitle {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group label {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-dark);
}

.forgot-pass-link {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.forgot-pass-link:hover {
  text-decoration: underline;
}

.auth-input {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-btn);
  background-color: rgba(255, 255, 255, 0.02);
  color: var(--color-dark);
  transition: all 0.25s ease;
  outline: none;
}

.auth-input:focus {
  border-color: var(--color-primary);
  background-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 4px var(--color-primary-light);
}

.input-error {
  border-color: #ff4d4f;
  background-color: rgba(255, 77, 79, 0.08);
}

.field-error {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: #ff4d4f;
}

.form-options-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remember-me-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-body);
  cursor: pointer;
}

.auth-checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.auth-submit-btn {
  width: 100%;
  padding: 1.1rem !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  margin-top: 0.5rem;
}

.auth-switch-prompt {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-body);
  margin-top: 2rem;
}

.switch-link {
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.switch-link:hover {
  text-decoration: underline;
}

.auth-success-state {
  background-color: rgba(4, 6, 8, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-panel);
  padding: 4rem 3rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: var(--shadow-panel);
}

.success-icon-badge {
  width: 72px;
  height: 72px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-btn);
  margin-bottom: 0.5rem;
}

.auth-success-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-dark);
  margin: 0;
}

.auth-success-msg {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-body);
  margin: 0;
}

.explore-btn {
  padding: 1rem 2rem !important;
  font-weight: 700 !important;
}



@media (max-width: 1024px) {
  .auth-split-layout {
    grid-template-columns: 1fr;
  }

  .scenic-backdrop-side {
    display: none;
  }

  .form-wrapper-side {
    min-height: 100vh;
    padding: 2rem 1.5rem;
  }

  .auth-form-panel,
  .auth-success-state {
    padding: 2.5rem 1.5rem;
  }
}
</style>
