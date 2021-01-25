<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
        class="author"
      >{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.updatedAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="article.author.username === $store.state.user.username">
      <nuxt-link
        :to="{
          name: 'editor',
          params: {
            slug: article.slug
          }
        }"
        class="btn btn-sm btn-outline-secondary"
        :class="{
        active: article.author.following
      }"
      >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-danger"
        :class="{
        active: article.favorited
      }"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
         Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
        active: article.author.following
      }"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow Eric Simons
        <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
        active: article.favorited
      }"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>