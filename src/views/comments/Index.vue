<template>
  <CommentsLayout>
    <NewComment :loading="loading" @create="localCreateComment"/>
    <Comment
      v-for="comment in getComments"
      :key="comment.id"
      :comment="comment"/>
  </CommentsLayout>
</template>
<script>

  import {createNamespacedHelpers} from 'vuex';

  import CommentsLayout from "./components/Layout";
  import Comment from "@/views/comments/containers/Comment";
  import NewComment from "@/views/comments/components/NewComment";

  const {mapGetters, mapActions} = createNamespacedHelpers('comments');

  export default {
    name: "comments",
    components: {NewComment, Comment, CommentsLayout},
    data (){
      return {
        loading: false,
      }
    },
    computed: {
      ...mapGetters(['getComments'])
    },
    methods: {
      ...mapActions(['createComment']),
      localCreateComment (text) {
        if (this.loading) return;
        this.loading = true;
        this.createComment(text)
          .catch(() => {
            alert('Ошибка при добавлении комментария: ' + text)
          })
          .then(() => {
            this.loading = false;
          })
      },
    }
  }
</script>