<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ username }}</h4>
            <p>{{ profile.bio }}</p>
            <nuxt-link
              v-if="username === $store.state.user.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollow"
              :disabled="followDisabled"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? 'Unfollow' : 'Follow' }}
              {{ username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'author'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: username
                    },
                    query: {
                      tab: 'author'
                    }
                  }"
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: username
                    },
                    query: {
                      tab: 'favorited'
                    }
                  }"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
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
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }"
                >{{ article.author.username }}</nuxt-link>
                <span class="date">{{ article.updatedAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i>
                {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
                  :key="tag"
                >{{ tag }}</li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, followUser, unfollowUser } from '@/api/user'
import { getArticles } from '@/api/article'

export default {
  middleware: ['authenticated'],
  name: 'ProfileIndex',
  data () {
    return {
      followDisabled: false,
      tab: 'author',
      username: '',
      profile: {},
      articles: []
    }
  },
  methods: {
    async onFollow () {
      this.followDisabled = true
      if (this.profile.following) {
        await unfollowUser(this.username)
      } else {
        await followUser(this.username)
      }
      this.profile.following = !this.profile.following
      this.followDisabled = false
    },

    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await delFavorite(article.slug)
        article.favoritesCount--
      } else {
        await addFavorite(article.slug)
        article.favoritesCount++
      }
      article.favorited = !article.favorited
      article.favoriteDisabled = false
    },

    loadArticles (filed) {
      this.tab = filed
      getArticles({
        [filed]: this.username
      }).then(res => {
        this.articles = res.data.articles.map(item => {
          item.favoriteDisabled = false
          return item
        })
      })
    }
  },
  watch: {
    '$route': {
      handler: function (route) {
        this.loadArticles(route.query.tab || this.tab || 'author')
      }
    }
  },
  created () {
    this.username = this.$route.params.username
    getProfile(this.username).then(res => {
      this.profile = res.data.profile
    })
    this.loadArticles(this.$route.query.tab || 'author')
  }
}
</script>

<style>
</style>