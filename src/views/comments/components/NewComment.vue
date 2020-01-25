<template>
  <form class="new-comment" @submit.stop.prevent="createComment">
    <textarea v-model="text"></textarea>
    <button @click.stop.prevent="createComment">{{ loading ? 'Отправляем...' : 'Отправить' }}</button>
  </form>
</template>
<script>
  export default {
    name: "NewComment",
    data () {
      return {
        text: '',
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      createComment(){
        if (!this.text.length) return;
        this.$emit('create', this.text);
        this.text = '';
      }
    }
  }
</script>
<style scoped lang="scss">
.new-comment {
  display: flex;
  align-items: flex-start;
  textarea {
    flex-grow: 1;
    min-height: 100px;
    max-height: 300px;
  }
  button {
    margin-left: 10px;
  }
}
</style>