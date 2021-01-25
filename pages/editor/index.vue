<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(messages, field) of errors">
              <li v-for="message in messages" :key="field+message">{{field}} {{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="submitHandler">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  minlength="1"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  minlength="1"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  minlength="1"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagsStr"
                  @input="tagInput"
                />
                <div class="tag-list">
                  <span class="tag-pill tag-default" v-for="tag in article.tagList">{{ tag }}</span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle } from '@/api/article'

export default {
  middleware: ['authenticated'],
  name: 'EditorIndex',
  props: {
    articleData: {
      type: Object,
      default: () => new Object()
    }
  },
  data () {
    return {
      errors: {},
      tagsStr: '',
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  methods: {
    tagInput () {
      this.article.tagList = this.tagsStr.split(';').filter(v => v)
    },
    submitHandler () {
      if (this.articleData.slug) {
        updateArticle(this.articleData.slug, { article: this.article }).catch(error => {
          this.errors = error.response.data.errors
        })
      } else {
        createArticle({ article: this.article }).catch(error => {
          this.errors = error.response.data.errors
        })
      }
    }
  },
  created () {
    if (this.articleData.slug) {
      const {
        title,
        description,
        body,
        tagList
      } = this.articleData

      this.article = {
        title,
        description,
        body,
        tagList
      }
    }
  }
}
</script>

<style>
</style>