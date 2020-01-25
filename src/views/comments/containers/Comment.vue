<template>
  <CommentLayout :comment="comment" :loading="loading" @remove="localRemoveComment"/>
</template>
<script>

  import {createNamespacedHelpers} from 'vuex';

  import CommentLayout from "../components/CommentLayout";

  const {mapActions} = createNamespacedHelpers('comments');

  export default {
    name: "Comment",
    components: {CommentLayout},
    data () {
      return {
        loading: false,
      }
    },
    props: {
      comment: {
        type: Object,
        required: true,
      }
    },
    methods: {
      ...mapActions(['removeComment']),
      localRemoveComment() {
        if (this.loading) return;
        this.loading = true;
        this.removeComment(this.comment.id)
          .catch(() => {
            alert('Ошибка при удалении комментария: ' + this.comment.text)
          })
          .then(() => {
            this.loading = false;
          })
      }
    }
  }
</script>