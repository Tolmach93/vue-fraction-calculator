<template>
  <div class="comment">
    <span>{{ comment.text }}</span>
    <button @click="$emit('remove')">{{ loading ? 'Удаление...' : 'Удалить' }}</button>
  </div>
</template>
<script>
  export default {
    name: "CommentLayout",
    props: {
      comment: {
        type: Object,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
<style scoped lang="scss">
  .comment {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5px;
    border-bottom: 1px solid black;
    text-align: left;
    button {
      margin-left: 10px;
    }
  }
</style>