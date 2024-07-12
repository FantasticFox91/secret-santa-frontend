<template>
  <section class="events">
    <h1 class="title">Events list</h1>
    <ul class="events-list">
      <li v-for="event in userEvents" :key="event.id" class="events-list__item">
        <div class="invitation__headings">
          <div>
            <p class="invitation__date">{{ useDateUntil(event.date) }}</p>
            <p class="invitation__name">{{ event.name }}</p>
          </div>
          <div class="invitation__buttons">
            <MainButton class="edit-button" type="button" @click="() => onEventViewButtonClick(event)">View</MainButton>
          </div>
        </div>
      </li>
    </ul>
    <div class="accordion" :class="{'accordion--open': isShown}">
      <p class="accordion__toggler" @click="toggleAccordion">Past events</p>
      <Transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" name="accordion">
        <div class="accordion_body" v-show="isShown">
          <ul class="events-list">
            <li v-for="event in userEvents" :key="event.id" class="events-list__item">
              <div class="invitation__headings">
                <div>
                  <p class="invitation__date">{{ useDateUntil(event.date) }}</p>
                  <p class="invitation__name">{{ event.name }}</p>
                </div>
                <div class="invitation__buttons">
                  <MainButton class="edit-button" type="button" @click="() => onEventViewButtonClick(event)">View</MainButton>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
    <MainButton type="button" @click="onCreateNewEventButtonClick">
      Create new event
    </MainButton>
  </section>
</template>

<script setup lang='ts'>
const userStore = useUserStore();
const eventStore = useEventStore();
const { userEvents } = storeToRefs(userStore);


definePageMeta({
  middleware: ['check-auth']
})

const onCreateNewEventButtonClick = () => {
  navigateTo('/event/new');
}

const onEventViewButtonClick = (event) => {
  eventStore.setCurrentEvent(event);
  navigateTo('/dashboard');
}

// Accordion
const isShown = ref(false);

const toggleAccordion = () => {
  isShown.value = !isShown.value;
}

const beforeEnter = (el) => {
  el.style.height = '0';
}

const enter = (el) => {
  el.style.height = el.scrollHeight + 'px';
  el.style.paddingTop = '30px'
}

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px';
}

const leave = (el) => {
  el.style.height = '0';
  el.style.paddingTop = '0'
}
</script>

<style lang="scss">
.events {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.events-list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  flex-direction: column;
  gap: 45px;

  &__item {
    border-bottom: 1px solid #ffffff;
  }
}

.accordion__toggler {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  color: #ffffff;
  cursor: pointer;
  
  &::after {
    position: absolute;
    content: "";
    right: 34px;
    width: 85%;
    height: 1px;
    background-color: #ffffff;
  }

  &::before {
    position: absolute;
    content: "";
    right: 0;
    width: 24px;
    height: 24px;
    background: url('../../assets/svg/accordion-arrow.svg') no-repeat 50% 50%;
    transition: transform 0.3s ease-out;
  }
}

.accordion--open {
  .accordion__toggler::before {
    transform: rotate(180deg);
  }
}

.accordion_body {
  overflow: hidden;
  transition: 0.3s ease-out;
}
</style>
