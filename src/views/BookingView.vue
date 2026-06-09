<script setup lang="ts">
import { ref, computed } from 'vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import PaymentBadge from '@/components/destination/PaymentBadge.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { NAVIGATION_LINKS, SOCIAL_LINKS, DESTINATIONS } from '@/data/mockData';

const fullName = ref('');
const email = ref('');
const selectedDestinationId = ref('1');
const travelDate = ref('');
const guestsCount = ref(1);
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

const incrementGuests = () => {
  if (guestsCount.value < 10) {
    guestsCount.value++;
  }
};

const decrementGuests = () => {
  if (guestsCount.value > 1) {
    guestsCount.value--;
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
  guestsCount.value = 1;
  hasGuide.value = false;
  hasInsurance.value = false;
  hasShuttle.value = false;
  isSubmitted.value = false;
};
</script>

<template>
  <div class="bookings-view">
    <TheNavbar :links="NAVIGATION_LINKS" />

    <main class="main-content container">
      <div class="bookings-layout-wrapper">
        <header class="bookings-header">
          <span class="header-subtitle">- Complete Reservation</span>
          <h1 class="header-title">Booking Checkout</h1>
        </header>

        <div v-if="isSubmitted" class="success-screen">
          <div class="success-card">
            <div class="success-icon-circle">
              <BaseIcon name="check" size="40" color="var(--color-white)" />
            </div>
            <h2 class="success-title">Booking Confirmed!</h2>
            <p class="success-message">
              Thank you, {{ fullName }}. Your adventure to {{ activeDestination.title }} on {{ travelDate }} is booked. A confirmation email has been sent to {{ email }}.
            </p>
            <div class="booking-receipt-summary">
              <div class="receipt-row">
                <span>Destination</span>
                <strong>{{ activeDestination.title }}</strong>
              </div>
              <div class="receipt-row">
                <span>Guests</span>
                <strong>{{ guestsCount }} Travelers</strong>
              </div>
              <div class="receipt-row">
                <span>Total Amount Paid</span>
                <strong class="teal-text">${{ totalAmount }}</strong>
              </div>
            </div>
            <BaseButton variant="solid" @click="resetForm" class="continue-btn">
              Book Another Trip
            </BaseButton>
          </div>
        </div>

        <div v-else class="checkout-grid">
          <div class="checkout-form-container">
            <h2 class="section-title">Traveler Information</h2>
            <form @submit.prevent="validateAndSubmit" class="checkout-form">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  v-model="fullName"
                  placeholder="e.g. John Doe"
                  :class="['form-input', { 'input-error': showErrors && !fullName }]"
                />
                <span v-if="showErrors && !fullName" class="error-msg">Name is required</span>
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="e.g. john@example.com"
                  :class="['form-input', { 'input-error': showErrors && !email }]"
                />
                <span v-if="showErrors && !email" class="error-msg">Email is required</span>
              </div>

              <h2 class="section-title margin-top-lg">Trip Specifications</h2>

              <div class="form-group">
                <label for="destination">Destination</label>
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
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label for="travelDate">Departure Date</label>
                  <input
                    type="date"
                    id="travelDate"
                    v-model="travelDate"
                    :class="['form-input', { 'input-error': showErrors && !travelDate }]"
                  />
                  <span v-if="showErrors && !travelDate" class="error-msg">Date is required</span>
                </div>

                <div class="form-group">
                  <label>Number of Guests</label>
                  <div class="guests-counter">
                    <button type="button" @click="decrementGuests" class="counter-btn">
                      <BaseIcon name="minus" size="16" />
                    </button>
                    <span class="counter-value">{{ guestsCount }}</span>
                    <button type="button" @click="incrementGuests" class="counter-btn">
                      <BaseIcon name="plus" size="16" />
                    </button>
                  </div>
                </div>
              </div>

              <h2 class="section-title margin-top-lg">Add-on Upgrades</h2>

              <div class="addons-list">
                <label class="addon-item">
                  <input type="checkbox" v-model="hasGuide" class="addon-checkbox" />
                  <span class="addon-label-wrapper">
                    <span class="addon-name">Personal Tour Guide</span>
                    <span class="addon-description">Expert guide for local history & trails</span>
                  </span>
                  <span class="addon-price">+$50 / guest</span>
                </label>

                <label class="addon-item">
                  <input type="checkbox" v-model="hasInsurance" class="addon-checkbox" />
                  <span class="addon-label-wrapper">
                    <span class="addon-name">Full Travel Insurance</span>
                    <span class="addon-description">Comprehensive coverage & flexible cancellation</span>
                  </span>
                  <span class="addon-price">+$20 / guest</span>
                </label>

                <label class="addon-item">
                  <input type="checkbox" v-model="hasShuttle" class="addon-checkbox" />
                  <span class="addon-label-wrapper">
                    <span class="addon-name">Airport Shuttle Service</span>
                    <span class="addon-description">Direct pickup/drop-off to your accommodation</span>
                  </span>
                  <span class="addon-price">+$30 flat</span>
                </label>
              </div>

              <div class="form-submit-wrapper">
                <BaseButton type="submit" variant="solid" class="submit-booking-btn">
                  Complete Booking Checkout
                </BaseButton>
              </div>
            </form>
          </div>

          <div class="invoice-summary-container">
            <div class="invoice-card">
              <div
                class="invoice-dest-image"
                :style="{ backgroundImage: `url(${activeDestination.imageUrl})` }"
              >
                <div class="image-gradient-overlay"></div>
                <div class="image-text-overlay">
                  <span class="dest-badge-category">Selected Escape</span>
                  <h3 class="dest-badge-title">{{ activeDestination.title }}</h3>
                </div>
              </div>

              <div class="invoice-billing-details">
                <h3 class="invoice-title">Price Invoice</h3>
                
                <div class="invoice-row">
                  <span class="invoice-row-label">
                    Base Fare ({{ guestsCount }} × ${{ basePrice }})
                  </span>
                  <span class="invoice-row-price">${{ subtotal }}</span>
                </div>

                <div v-if="hasGuide" class="invoice-row">
                  <span class="invoice-row-label">
                    Tour Guide ({{ guestsCount }} × $50)
                  </span>
                  <span class="invoice-row-price">${{ guideCost }}</span>
                </div>

                <div v-if="hasInsurance" class="invoice-row">
                  <span class="invoice-row-label">
                    Travel Insurance ({{ guestsCount }} × $20)
                  </span>
                  <span class="invoice-row-price">${{ insuranceCost }}</span>
                </div>

                <div v-if="hasShuttle" class="invoice-row">
                  <span class="invoice-row-label">Airport Shuttle</span>
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

                <div class="invoice-row total-row">
                  <span class="total-label">Total Payment</span>
                  <span class="total-price">${{ totalAmount }}</span>
                </div>
              </div>

              <div class="invoice-badge-wrapper">
                <PaymentBadge />
              </div>
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
  padding-top: 2.5rem;
  position: relative;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  padding-bottom: 6rem;
  z-index: 1;
}

.bookings-layout-wrapper {
  position: relative;
  width: 100%;
}

.bookings-header {
  background-color: var(--color-bg-light);
  border-radius: var(--radius-panel);
  padding: 4rem;
  margin-bottom: 3rem;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-subtitle {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.header-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-dark) 40%, var(--color-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: start;
}

.checkout-form-container {
  background-color: rgba(4, 5, 6, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-panel);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3rem;
  animation: fadeInUp 0.6s ease backwards;
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.margin-top-lg {
  margin-top: 2.5rem;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group label {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-dark);
}

.form-input,
.form-select {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-btn);
  background-color: var(--color-bg-light);
  color: var(--color-dark);
  transition: all 0.25s ease;
  outline: none;
}

.form-input:focus,
.form-select:focus {
  border-color: var(--color-primary);
  background-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 4px var(--color-primary-light);
}

.form-select option {
  background-color: #040608;
  color: var(--color-text-body);
}

.input-error {
  border-color: #ff4d4f;
  background-color: rgba(255, 77, 79, 0.08);
}

.error-msg {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #ff4d4f;
}

.guests-counter {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-btn);
  padding: 0.5rem;
  align-self: flex-start;
  height: calc(2.25rem + 18px);
}

.counter-btn {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-dark);
  transition: all 0.2s ease;
}

.counter-btn:hover {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.counter-value {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-dark);
  min-width: 20px;
  text-align: center;
}

.addons-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.addon-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: all 0.25s ease;
}

.addon-item:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.addon-checkbox {
  width: 20px;
  height: 20px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.addon-label-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.addon-name {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-dark);
}

.addon-description {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.addon-price {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
}

.form-submit-wrapper {
  margin-top: 1.5rem;
}

.submit-booking-btn {
  width: 100%;
  padding: 1.2rem !important;
  font-size: 1.1rem !important;
  font-weight: 700 !important;
}

.invoice-summary-container {
  position: sticky;
  top: 6rem;
}

.invoice-card {
  background-color: rgba(4, 5, 6, 0.95);
  border-radius: var(--radius-panel);
  overflow: hidden;
  box-shadow: var(--shadow-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
  animation: fadeInUp 0.6s ease 0.15s backwards;
}

.invoice-dest-image {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem 2rem;
}

.image-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(18, 22, 25, 0) 30%, rgba(18, 22, 25, 0.85) 100%);
  z-index: 1;
}

.image-text-overlay {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dest-badge-category {
  font-family: var(--font-body);
  font-size: 0.75rem;
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
}

.invoice-billing-details {
  padding: 2rem;
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
  margin-bottom: 0.5rem;
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
  color: var(--color-text-muted);
}

.invoice-row-price {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-white);
}

.invoice-divider {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0.25rem 0;
}

.total-row {
  margin-top: 0.5rem;
}

.total-label {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-white);
}

.total-price {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-primary);
}

.invoice-badge-wrapper {
  background-color: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.success-screen {
  background-color: rgba(4, 5, 6, 0.9);
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
  box-shadow: var(--shadow-btn);
  margin-bottom: 0.5rem;
}

.success-title {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-dark);
  margin: 0;
}

.success-message {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text-body);
  margin: 0;
}

.booking-receipt-summary {
  width: 100%;
  background-color: var(--color-bg-light);
  border-radius: var(--radius-btn);
  border: 1px solid var(--color-border);
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
}

.receipt-row span {
  color: var(--color-text-muted);
}

.receipt-row strong {
  color: var(--color-dark);
}

.teal-text {
  color: var(--color-primary) !important;
  font-size: 1.25rem;
}

.continue-btn {
  padding: 1rem 2rem !important;
  font-weight: 750 !important;
}



@media (max-width: 992px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .invoice-summary-container {
    position: static;
  }

  .bookings-header {
    padding: 3rem 2rem;
  }

  .header-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .checkout-form-container {
    padding: 2rem 1.5rem;
  }

  .form-row-2 {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .guests-counter {
    align-self: stretch;
    justify-content: space-between;
  }

  .addon-item {
    padding: 1rem;
    gap: 0.75rem;
  }
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
</style>
