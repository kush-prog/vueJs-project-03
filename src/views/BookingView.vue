<script setup lang="ts">
import { ref, computed } from 'vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { NAVIGATION_LINKS, SOCIAL_LINKS, DESTINATIONS } from '@/data/mockData';

const fullName = ref('');
const email = ref('');
const selectedDestinationId = ref('1');
const travelDate = ref('');

const adultsCount = ref(1);
const childrenCount = ref(0);
const guestsCount = computed(() => {
  return adultsCount.value + childrenCount.value;
});

const hasGuide = ref(false);
const hasInsurance = ref(false);
const hasShuttle = ref(false);
const isSubmitted = ref(false);
const showErrors = ref(false);

const destinationPrices: Record<string, number> = {
  '1': 450,
  '2': 790,
  '3': 1200
};

const activeDestination = computed(() => {
  const found = DESTINATIONS.find(d => d.id === selectedDestinationId.value);
  return found || DESTINATIONS[0]!;
});

const basePrice = computed(() => {
  return destinationPrices[selectedDestinationId.value] ?? 500;
});

const subtotal = computed(() => {
  return basePrice.value * guestsCount.value;
});

const guideCost = computed(() => {
  return hasGuide.value ? 50 * guestsCount.value : 0;
});

const insuranceCost = computed(() => {
  return hasInsurance.value ? 20 * guestsCount.value : 0;
});

const shuttleCost = computed(() => {
  return hasShuttle.value ? 30 : 0;
});

const totalAmountBeforeTax = computed(() => {
  return subtotal.value + guideCost.value + insuranceCost.value + shuttleCost.value;
});

const taxAmount = computed(() => {
  return Math.round(totalAmountBeforeTax.value * 0.1);
});

const totalAmount = computed(() => {
  return totalAmountBeforeTax.value + taxAmount.value;
});

const incrementAdults = () => {
  if (adultsCount.value < 10) {
    adultsCount.value++;
  }
};

const decrementAdults = () => {
  if (adultsCount.value > 1) {
    adultsCount.value--;
  }
};

const incrementChildren = () => {
  if (childrenCount.value < 10) {
    childrenCount.value++;
  }
};

const decrementChildren = () => {
  if (childrenCount.value > 0) {
    childrenCount.value--;
  }
};

const validateAndSubmit = () => {
  if (!fullName.value || !email.value || !travelDate.value) {
    showErrors.value = true;
    return;
  }
  showErrors.value = false;
  isSubmitted.value = true;
};

const resetForm = () => {
  fullName.value = '';
  email.value = '';
  selectedDestinationId.value = '1';
  travelDate.value = '';
  adultsCount.value = 1;
  childrenCount.value = 0;
  hasGuide.value = false;
  hasInsurance.value = false;
  hasShuttle.value = false;
  isSubmitted.value = false;
};
</script>

<template>
  <div class="bookings-view">
    <!-- Ambient Background Atmospheric Glows -->
    <div class="ambient-glow glow-indigo" aria-hidden="true"></div>
    <div class="ambient-glow glow-cyan" aria-hidden="true"></div>

    <TheNavbar :links="NAVIGATION_LINKS" />

    <main class="main-content container">
      <div class="bookings-layout-wrapper">
        
        <!-- Premium Checkout Header -->
        <header class="bookings-header">
          <div class="header-pre">
            <span class="header-subtitle">— Reservation Checkout</span>
            <span class="step-indicator-text">Step 2 of 3</span>
          </div>
          <h1 class="header-title">Confirm Traveler Details</h1>
          
          <div class="progress-bar-wrapper">
            <div class="progress-bar-fill"></div>
          </div>
          
          <div class="progress-steps-label">
            <span class="step completed">1. Select Adventure ✓</span>
            <span class="step active">2. Traveler Information</span>
            <span class="step pending">3. Payment & Confirmation</span>
          </div>
        </header>

        <!-- Booking Success Confirmation Screen -->
        <div v-if="isSubmitted" class="success-screen">
          <div class="success-card">
            <div class="success-icon-circle">
              <BaseIcon name="check" size="40" color="var(--color-white)" />
            </div>
            <h2 class="success-title">Reservation Confirmed!</h2>
            <p class="success-message">
              Thank you, {{ fullName }}. Your adventure to {{ activeDestination.title }} is locked. A complete reservation receipt and packing guide have been sent to <strong>{{ email }}</strong>.
            </p>
            
            <div class="booking-receipt-summary">
              <div class="receipt-row">
                <span>Destination</span>
                <strong>{{ activeDestination.title }}</strong>
              </div>
              <div class="receipt-row">
                <span>Travelers</span>
                <strong>{{ guestsCount }} Guest(s) ({{ adultsCount }} Adult, {{ childrenCount }} Child)</strong>
              </div>
              <div class="receipt-row">
                <span>Departure Date</span>
                <strong>{{ travelDate }}</strong>
              </div>
              <div class="receipt-row total-paid-row">
                <span>Amount Charged</span>
                <strong class="paid-amount-text">${{ totalAmount }}</strong>
              </div>
            </div>
            
            <BaseButton variant="solid" @click="resetForm" class="continue-btn">
              Explore More Journeys
            </BaseButton>
          </div>
        </div>

        <div v-else class="checkout-grid">
          <!-- Left Column: Checkout Fields Form -->
          <div class="checkout-form-container">
            <!-- Confidence Trust Strip -->
            <div class="confidence-strip">
              <div class="confidence-badge">
                <span class="icon">✓</span>
                <span class="lbl">Secure Checkout</span>
              </div>
              <div class="confidence-badge">
                <span class="icon">✓</span>
                <span class="lbl">Free Cancellations</span>
              </div>
              <div class="confidence-badge">
                <span class="icon">✓</span>
                <span class="lbl">Instant Confirmation</span>
              </div>
            </div>

            <h2 class="section-title">1. Traveler Information</h2>
            <form @submit.prevent="validateAndSubmit" class="checkout-form">
              <div class="form-fields-grid">
                <!-- Floating Label Full Name -->
                <div class="form-group floating-group">
                  <input
                    type="text"
                    id="fullName"
                    v-model="fullName"
                    placeholder=" "
                    :class="['form-input', { 'input-error': showErrors && !fullName }]"
                    required
                  />
                  <label for="fullName">Full Name</label>
                  <span v-if="showErrors && !fullName" class="error-msg">Full Name is required</span>
                </div>

                <!-- Floating Label Email -->
                <div class="form-group floating-group">
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder=" "
                    :class="['form-input', { 'input-error': showErrors && !email }]"
                    required
                  />
                  <label for="email">Email Address</label>
                  <span v-if="showErrors && !email" class="error-msg">Email is required</span>
                </div>
              </div>

              <h2 class="section-title margin-top-lg">2. Trip Specifications</h2>

              <div class="form-fields-grid">
                <!-- Select Destination -->
                <div class="form-group select-group">
                  <label for="destination" class="classic-label">Destination Escape</label>
                  <div class="select-wrapper">
                    <select
                      id="destination"
                      v-model="selectedDestinationId"
                      class="form-select"
                    >
                      <option
                        v-for="dest in DESTINATIONS"
                        :key="dest.id"
                        :value="dest.id"
                      >
                        {{ dest.title }} (${{ destinationPrices[dest.id] }}/person)
                      </option>
                    </select>
                    <BaseIcon name="chevron-down" size="18" class="select-chevron" color="rgba(255, 255, 255, 0.4)" />
                  </div>
                </div>

                <!-- Departure Date -->
                <div class="form-group">
                  <label for="travelDate" class="classic-label">Departure Date</label>
                  <input
                    type="date"
                    id="travelDate"
                    v-model="travelDate"
                    :class="['form-input', { 'input-error': showErrors && !travelDate }]"
                  />
                  <span v-if="showErrors && !travelDate" class="error-msg">Departure date is required</span>
                </div>
              </div>

              <!-- Multi-Guest Pickers Split -->
              <div class="form-group">
                <label class="classic-label">Travelers count</label>
                <div class="guests-picker-row">
                  <div class="picker-column">
                    <div class="picker-label-info">
                      <span class="picker-title">Adults</span>
                      <span class="picker-desc">Age 13 or above</span>
                    </div>
                    <div class="guests-counter">
                      <button type="button" @click="decrementAdults" class="counter-btn" aria-label="Decrease adults">
                        <BaseIcon name="minus" size="14" />
                      </button>
                      <span class="counter-value">{{ adultsCount }}</span>
                      <button type="button" @click="incrementAdults" class="counter-btn" aria-label="Increase adults">
                        <BaseIcon name="plus" size="14" />
                      </button>
                    </div>
                  </div>

                  <div class="picker-column">
                    <div class="picker-label-info">
                      <span class="picker-title">Children</span>
                      <span class="picker-desc">Ages 2 – 12</span>
                    </div>
                    <div class="guests-counter">
                      <button type="button" @click="decrementChildren" class="counter-btn" aria-label="Decrease children">
                        <BaseIcon name="minus" size="14" />
                      </button>
                      <span class="counter-value">{{ childrenCount }}</span>
                      <button type="button" @click="incrementChildren" class="counter-btn" aria-label="Increase children">
                        <BaseIcon name="plus" size="14" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <h2 class="section-title margin-top-lg">3. Premium Add-on Upgrades</h2>

              <!-- Card-Based Addons -->
              <div class="addons-cards-grid">
                <div 
                  :class="['addon-card', { selected: hasGuide }]" 
                  @click="hasGuide = !hasGuide"
                  role="checkbox"
                  :aria-checked="hasGuide"
                  tabindex="0"
                  @keydown.enter="hasGuide = !hasGuide"
                >
                  <div class="card-tick-box">
                    <span v-if="hasGuide" class="tick">✓</span>
                  </div>
                  <div class="addon-icon">
                    <BaseIcon name="pin" size="22" color="var(--color-primary)" />
                  </div>
                  <div class="addon-details">
                    <span class="addon-title">Personal Tour Guide</span>
                    <span class="addon-desc">Expert navigation and history deep dives.</span>
                    <span class="addon-spec">✓ Priority support • ✓ Expert recommendations</span>
                  </div>
                  <div class="addon-pricing">
                    <span class="price-val">+$50</span>
                    <span class="price-unit">/ traveler</span>
                  </div>
                </div>

                <div 
                  :class="['addon-card', { selected: hasInsurance }]" 
                  @click="hasInsurance = !hasInsurance"
                  role="checkbox"
                  :aria-checked="hasInsurance"
                  tabindex="0"
                  @keydown.enter="hasInsurance = !hasInsurance"
                >
                  <div class="card-tick-box">
                    <span v-if="hasInsurance" class="tick">✓</span>
                  </div>
                  <div class="addon-icon">
                    <BaseIcon name="check" size="22" color="var(--color-primary)" />
                  </div>
                  <div class="addon-details">
                    <span class="addon-title">Full Travel Insurance</span>
                    <span class="addon-desc">Comprehensive medical and booking protection.</span>
                    <span class="addon-spec">✓ Free cancellations • ✓ Fast claims filing</span>
                  </div>
                  <div class="addon-pricing">
                    <span class="price-val">+$20</span>
                    <span class="price-unit">/ traveler</span>
                  </div>
                </div>

                <div 
                  :class="['addon-card', { selected: hasShuttle }]" 
                  @click="hasShuttle = !hasShuttle"
                  role="checkbox"
                  :aria-checked="hasShuttle"
                  tabindex="0"
                  @keydown.enter="hasShuttle = !hasShuttle"
                >
                  <div class="card-tick-box">
                    <span v-if="hasShuttle" class="tick">✓</span>
                  </div>
                  <div class="addon-icon">
                    <BaseIcon name="payment" size="22" color="var(--color-primary)" />
                  </div>
                  <div class="addon-details">
                    <span class="addon-title">Airport Shuttle pickups</span>
                    <span class="addon-desc">Direct private transfer to and from airport.</span>
                    <span class="addon-spec">✓ Private driver • ✓ Luggage assistance</span>
                  </div>
                  <div class="addon-pricing">
                    <span class="price-val">+$30</span>
                    <span class="price-unit">flat fee</span>
                  </div>
                </div>
              </div>

              <!-- Secure Form Submit Area -->
              <div class="form-submit-wrapper">
                <BaseButton type="submit" variant="solid" class="submit-booking-btn">
                  Complete Secure Reservation
                </BaseButton>
                <p class="submit-disclaimer">
                  🔒 Encrypted SSL connection. By clicking above, you agree to our booking policies.
                </p>
              </div>
            </form>
          </div>

          <!-- Right Column: Sticky Booking Summary Panel -->
          <div class="invoice-summary-container">
            <div class="invoice-card">
              
              <!-- Destination Banner Preview with Rating -->
              <div
                class="invoice-dest-image"
                :style="{ backgroundImage: `url(${activeDestination.imageUrl})` }"
              >
                <div class="image-gradient-overlay"></div>
                <div class="image-text-overlay">
                  <span class="dest-badge-category">Selected Escape</span>
                  <h3 class="dest-badge-title">{{ activeDestination.title }}</h3>
                  
                  <div class="dest-specs-badge">
                    <span>★ {{ activeDestination.rating }} (1,200 Reviews)</span>
                    <span class="bullet">•</span>
                    <span>{{ activeDestination.duration || '7 Days' }}</span>
                  </div>
                </div>
              </div>

              <!-- Billing Itemized Breakdown -->
              <div class="invoice-billing-details">
                <h3 class="invoice-title">Reservation Summary</h3>
                
                <div class="invoice-row">
                  <span class="invoice-row-label">
                    Base Fare ({{ guestsCount }} guests × ${{ basePrice }})
                  </span>
                  <span class="invoice-row-price">${{ subtotal }}</span>
                </div>

                <div v-if="hasGuide" class="invoice-row">
                  <span class="invoice-row-label">
                    Tour Guide ({{ guestsCount }} guests × $50)
                  </span>
                  <span class="invoice-row-price">${{ guideCost }}</span>
                </div>

                <div v-if="hasInsurance" class="invoice-row">
                  <span class="invoice-row-label">
                    Travel Insurance ({{ guestsCount }} guests × $20)
                  </span>
                  <span class="invoice-row-price">${{ insuranceCost }}</span>
                </div>

                <div v-if="hasShuttle" class="invoice-row">
                  <span class="invoice-row-label">Airport Shuttle service</span>
                  <span class="invoice-row-price">${{ shuttleCost }}</span>
                </div>

                <hr class="invoice-divider" />

                <div class="invoice-row">
                  <span class="invoice-row-label">Subtotal</span>
                  <span class="invoice-row-price">${{ totalAmountBeforeTax }}</span>
                </div>

                <div class="invoice-row">
                  <span class="invoice-row-label">Taxes & Fees (10%)</span>
                  <span class="invoice-row-price">${{ taxAmount }}</span>
                </div>

                <hr class="invoice-divider" />

                <!-- Highlighted Total Box -->
                <div class="invoice-row total-row">
                  <span class="total-label">Total Payment</span>
                  <span class="total-price">${{ totalAmount }}</span>
                </div>
              </div>

              <!-- SSL Security Badges and Credit Cards -->
              <div class="invoice-badge-wrapper">
                <div class="badge-header-lock">
                  <span class="lock-icon">🔒</span>
                  <span class="lock-text">SECURE 256-BIT SSL RESERVATION</span>
                </div>
                <div class="payment-cards-icons">
                  <span class="card-icon font-visa">Visa</span>
                  <span class="card-icon font-master">Mastercard</span>
                  <span class="card-icon font-paypal">PayPal</span>
                  <span class="card-icon font-stripe">Stripe</span>
                </div>
              </div>
            </div>

            <!-- Social Proof Testimonial Card -->
            <div class="social-proof-card">
              <span class="stars-proof">★★★★★</span>
              <p class="proof-quote">
                "One of the best Himalayan experiences we've ever had. Highly recommend the tour guide add-on!"
              </p>
              <span class="proof-author">— Sarah K., London</span>
            </div>
          </div>
        </div>

        <TheSidebar :socials="SOCIAL_LINKS" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.bookings-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding-top: 0;
  position: relative;
  overflow: hidden;
  background-color: #030506;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6.5rem;
  padding-bottom: 6rem;
  z-index: 1;
}

.bookings-layout-wrapper {
  position: relative;
  width: 100%;
}

/* Ambient glows */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
}

.glow-indigo {
  top: 10%;
  left: -5%;
  width: 600px;
  height: 600px;
  background-color: rgba(30, 45, 180, 0.15);
}

.glow-cyan {
  bottom: 20%;
  right: -5%;
  width: 550px;
  height: 550px;
  background-color: rgba(26, 176, 166, 0.12);
}

/* Checkout Header & Tracker Styles */
.bookings-header {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-hero);
  padding: 4rem;
  margin-bottom: 3.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.header-pre {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.header-subtitle {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.step-indicator-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.header-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 800;
  color: var(--color-white);
  margin: 0 0 1.75rem 0;
  letter-spacing: -0.5px;
}

.progress-bar-wrapper {
  height: 4px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  width: 66.6%;
  background: linear-gradient(90deg, var(--color-primary) 0%, #4ae5db 100%);
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(26, 176, 166, 0.5);
}

.progress-steps-label {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.progress-steps-label .step.completed {
  color: var(--color-primary);
}

.progress-steps-label .step.active {
  color: var(--color-white);
}

/* Grid Layout styling */
.checkout-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

.checkout-form-container {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-panel);
  padding: 3rem;
  box-shadow: 0 25px 55px rgba(0, 0, 0, 0.4);
  animation: fadeInUp 0.6s ease backwards;
}

.confidence-strip {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.confidence-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(26, 176, 166, 0.06);
  border: 1px solid rgba(26, 176, 166, 0.15);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-pill);
}

.confidence-badge .icon {
  color: var(--color-primary);
  font-weight: 800;
  font-size: 0.85rem;
}

.confidence-badge .lbl {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-white);
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-white);
  margin-top: 0;
  margin-bottom: 1.75rem;
  letter-spacing: -0.2px;
}

.margin-top-lg {
  margin-top: 3rem;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Floating Label Inputs */
.floating-group {
  position: relative;
}

.floating-group input {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 1.4rem 1.1rem 0.6rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-btn);
  background-color: rgba(255, 255, 255, 0.02);
  color: var(--color-white);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  width: 100%;
}

.floating-group input::placeholder {
  color: transparent;
}

.floating-group label {
  position: absolute;
  left: 1.1rem;
  top: 1rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-group input:focus ~ label,
.floating-group input:not(:placeholder-shown) ~ label {
  top: 0.35rem;
  font-size: 0.725rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.floating-group input:focus {
  border-color: var(--color-primary);
  background-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 3px rgba(26, 176, 166, 0.15);
}

.classic-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Select wrapper styling */
.select-group {
  display: flex;
  flex-direction: column;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-select {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 1rem;
  padding-right: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-btn);
  background-color: rgba(255, 255, 255, 0.02);
  color: var(--color-white);
  transition: all 0.3s ease;
  outline: none;
  width: 100%;
  appearance: none;
  cursor: pointer;
}

.form-select:focus {
  border-color: var(--color-primary);
  background-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 3px rgba(26, 176, 166, 0.15);
}

.select-chevron {
  position: absolute;
  right: 1rem;
  pointer-events: none;
}

.form-select option {
  background-color: #121619;
  color: var(--color-white);
}

/* Classic date input */
.form-input[type="date"] {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-btn);
  background-color: rgba(255, 255, 255, 0.02);
  color: var(--color-white);
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-input[type="date"]:focus {
  border-color: var(--color-primary);
  background-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 3px rgba(26, 176, 166, 0.15);
}

.input-error {
  border-color: #ef4444 !important;
  background-color: rgba(239, 68, 68, 0.04) !important;
}

.error-msg {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

/* Multi Guest counter picker row */
.guests-picker-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-btn);
  padding: 1.25rem;
}

.picker-column {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.picker-label-info {
  display: flex;
  flex-direction: column;
}

.picker-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-white);
}

.picker-desc {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

.guests-counter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-btn);
  padding: 0.4rem;
  height: 40px;
}

.counter-btn {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-white);
  transition: all 0.2s ease;
  outline: none;
}

.counter-btn:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  transform: scale(1.05);
}

.counter-value {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-white);
  min-width: 16px;
  text-align: center;
}

/* Card-Based Addon Grid */
.addons-cards-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.addon-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background-color: rgba(255, 255, 255, 0.01);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  outline: none;
}

.addon-card:focus-visible {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26, 176, 166, 0.15);
}

.addon-card:hover {
  border-color: rgba(26, 176, 166, 0.25);
  background-color: rgba(255, 255, 255, 0.03);
  transform: translateY(-2px);
}

.addon-card.selected {
  border-color: var(--color-primary);
  background-color: rgba(26, 176, 166, 0.04);
  box-shadow: 0 10px 25px rgba(26, 176, 166, 0.06);
}

.card-tick-box {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.addon-card.selected .card-tick-box {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
}

.card-tick-box .tick {
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 900;
}

.addon-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: rgba(26, 176, 166, 0.1);
  border: 1px solid rgba(26, 176, 166, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.addon-details {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}

.addon-title {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-white);
}

.addon-desc {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
}

.addon-spec {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-top: 0.1rem;
}

.addon-pricing {
  text-align: right;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.price-val {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-white);
}

.price-unit {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

/* Secure checkout CTA area */
.form-submit-wrapper {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.submit-booking-btn {
  width: 100%;
  padding: 1.1rem !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 14px rgba(26, 176, 166, 0.35);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.submit-booking-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 176, 166, 0.5);
}

.submit-disclaimer {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
}

/* Sidebar sticky panel styling */
.invoice-summary-container {
  position: sticky;
  top: 6.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.invoice-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-panel);
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  animation: fadeInUp 0.6s ease 0.15s backwards;
}

.invoice-dest-image {
  height: 190px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 1.75rem 2rem;
}

.image-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(3, 5, 6, 0) 30%, rgba(3, 5, 6, 0.9) 100%);
  z-index: 1;
}

.image-text-overlay {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.dest-badge-category {
  font-family: var(--font-body);
  font-size: 0.725rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.dest-badge-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-white);
  margin: 0;
  letter-spacing: -0.2px;
}

.dest-specs-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.25rem;
}

.dest-specs-badge .bullet {
  color: rgba(255, 255, 255, 0.3);
}

.invoice-billing-details {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.invoice-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-white);
  margin-top: 0;
  margin-bottom: 0.4rem;
}

.invoice-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.invoice-row-label {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
}

.invoice-row-price {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-white);
}

.invoice-divider {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin: 0.1rem 0;
}

.total-row {
  margin-top: 0.5rem;
  background-color: rgba(26, 176, 166, 0.04);
  border: 1px dashed rgba(26, 176, 166, 0.25);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.total-label {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-white);
}

.total-price {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-primary);
  text-shadow: 0 0 10px rgba(26, 176, 166, 0.25);
}

/* SSL secure seal block */
.invoice-badge-wrapper {
  background-color: rgba(255, 255, 255, 0.01);
  padding: 1.75rem 2.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.badge-header-lock {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.lock-text {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 1px;
}

.payment-cards-icons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.card-icon {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.02);
  user-select: none;
}

/* Testimonial Card */
.social-proof-card {
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
}

.stars-proof {
  color: #fbbf24;
  font-size: 1rem;
}

.proof-quote {
  font-family: var(--font-body);
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

.proof-author {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  text-align: right;
  display: block;
}

/* Success screens overrides */
.success-screen {
  background-color: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-panel);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInUp 0.6s ease backwards;
}

.success-card {
  max-width: 550px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.success-icon-circle {
  width: 80px;
  height: 80px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(26, 176, 166, 0.4);
  margin-bottom: 0.5rem;
}

.success-title {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-white);
  margin: 0;
}

.success-message {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.success-message strong {
  color: var(--color-white);
}

.booking-receipt-summary {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-btn);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem 0;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-body);
  font-size: 0.95rem;
}

.receipt-row span {
  color: rgba(255, 255, 255, 0.45);
}

.receipt-row strong {
  color: var(--color-white);
}

.total-paid-row {
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  margin-top: 0.5rem;
}

.paid-amount-text {
  color: var(--color-primary) !important;
  font-size: 1.35rem;
}

.continue-btn {
  padding: 1rem 2rem !important;
  font-weight: 700 !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Breakpoints */
@media (max-width: 992px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .invoice-summary-container {
    position: static;
  }

  .bookings-header {
    padding: 3rem 2rem;
    margin-bottom: 2.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 4.5rem;
    padding-bottom: 4rem;
  }

  .checkout-form-container {
    padding: 2rem 1.5rem;
  }

  .form-fields-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .guests-picker-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .addon-card {
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .addon-card .addon-icon {
    display: none;
  }
}
</style>
