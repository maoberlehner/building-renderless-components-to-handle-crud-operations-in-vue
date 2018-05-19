<template>
  <div>
    <p v-if="!posts.length">No posts!</p>
    <ul class="list-reset">
      <li
        v-for="post in posts"
        :key="post.id"
        class="rounded shadow-md p-4 mt-4"
      >
        <data-model
          :entity="post"
          :id="post.id"
          endpoint="posts"
          @success="$emit('updated', post)"
        >
          <div slot-scope="{ destroy, loading }">
            <h3 class="font-bold text-xl mb-2">{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <button
              :disabled="loading"
              @click="destroy">
              Delete
              <span v-if="loading">SPINNER TODO</span>
            </button>
          </div>
        </data-model>
      </li>
    </ul>
  </div>
</template>

<script>
import DataModel from './DataModel';

export default {
  name: `PostList`,
  components: {
    DataModel,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
