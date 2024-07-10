<template>
  <div class="dashboard-list-with-filters">
    <FiltersList @statusChanged="onStatusChange"/>
    <InvitationList dashboard :statusFilter="statusFilter"/>
  </div>
</template>

<script setup lang='ts'>
import './dashboard-list-with-filters.scss';

const statusFilter = ref('');

const onStatusChange = (value) => {
  statusFilter.value = value;
}
</script>
