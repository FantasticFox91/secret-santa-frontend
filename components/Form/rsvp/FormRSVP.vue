<script setup>
import './form-rsvp.scss';
import MyForm from '../default/MyForm';

const formData = ref({
  password: '',
})

const router = useRouter();

const onAccept = () => {
  router.push('/rsvp/accepted')
}

const onDecline = () => {
  router.push('/rsvp/declined')
}
</script>

<template>
  <MyForm class="form-rsvp">
    <h2 class="form-rsvp__title">SMITH CHRISTMAS</h2>
    <p class="form-rsvp__subtitle">december 23, 2023</p>
    <div class="form-rsvp__buttons">
      <button class="form-rsvp__button form-rsvp__button--decline" type="button" @click="onDecline">
        Regretfully <br />Decline
      </button>
      <button class="form-rsvp__button form-rsvp__button--accept" type="button" @click="onAccept">
        I’ll Be There!
      </button>
    </div>
  </MyForm>
</template>
