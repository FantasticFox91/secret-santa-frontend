<template>
    <ul class="filters-list">
      <li class="filters-list__item" :class="{'filters-list__item--transparent': statusFilter !== 'declined' && statusFilter !== ''}">
        <FormFieldDashboard v-model="statusFilter" :id="'declined'" :number="declinedUsers" @onChange="onFilterChange" @resetFilter="onResetStatusFilter">
          declined
        </FormFieldDashboard>
      </li>
      <li class="filters-list__item form-field-dashboard--pending" :class="{'filters-list__item--transparent': statusFilter !== 'pending' && statusFilter !== ''}">
        <FormFieldDashboard v-model="statusFilter" :id="'pending'" :number="pendingUsers" @onChange="onFilterChange" @resetFilter="onResetStatusFilter">
          pending
        </FormFieldDashboard>
      </li>
      <li class="filters-list__item" :class="{'filters-list__item--transparent': statusFilter !== 'accepted' && statusFilter !== ''}">
        <FormFieldDashboard v-model="statusFilter" :id="'accepted'" :number="acceptedUsers" @onChange="onFilterChange" @resetFilter="onResetStatusFilter">
          accepted
        </FormFieldDashboard>
      </li>
    </ul>
</template>

<script setup lang='ts'>
import './filters-list.scss';

const emits = defineEmits(['statusChanged'])
const statusFilter = ref('');
const eventStore = useEventStore();

const users = computed(() => {
  return eventStore?.currentEvent?.userStatus || [];
});

const userStatusCounts = computed(() => {
  return users.value.reduce(
    (counts: {declined: number, accepted: number, pending: number}, user: {status: 'DECLINED' | 'ACCEPTED' | 'PENDING'}) => {
      if (user.status === 'DECLINED') {
        counts.declined++;
      } else if (user.status === 'ACCEPTED') {
        counts.accepted++;
      } else if (user.status === 'PENDING') {
        counts.pending++;
      }
      return counts;
    },
    { declined: 0, accepted: 0, pending: 0 }
  );
});

const declinedUsers = computed(() => userStatusCounts.value.declined);
const acceptedUsers = computed(() => userStatusCounts.value.accepted);
const pendingUsers = computed(() => userStatusCounts.value.pending);

const onFilterChange = (value) => {
  statusFilter.value = value;
  emits('statusChanged', value);
}

const onResetStatusFilter = () => {
  statusFilter.value = '';
  emits('statusChanged', '');
}
</script>
