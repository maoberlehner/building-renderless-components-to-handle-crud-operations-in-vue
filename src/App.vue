<template>
  <div class="container mx-auto max-w-md p-4">
    <h1 class="text-center">Vue.js Renderless Components CRUD Components</h1>
    <data-provider
      :filter="{ userId: postListUserId }"
      endpoint="posts"
    >
      <div
        slot-scope="{ data: posts, error, findAll, loading }"
        class="mt-8">
        <h2>Post list</h2>
        <form
          class="mt-4"
          @submit.prevent="findAll({ userId: postListUserId })">
          <label>
            <span class="block text-grey-darker text-sm">User ID</span>
            <input
              v-model="postListUserId"
              class="shadow appearance-none border rounded mt-1 py-2 px-3 text-grey-darker"
            >
          </label>
          <button
            :disabled="loading"
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
            <template v-if="loading">Loading...</template>
            <template v-else>Filter</template>
          </button>
        </form>

        <div class="mt-4">
          <span v-if="loading">Loading...</span>
          <div v-else-if="error">Error while fetching data!</div>
          <post-list
            v-else
            :posts="posts"
            @updated="findAll({ userId: postListUserId })"/>
        </div>
      </div>
    </data-provider>

    <data-model
      :id="1"
      endpoint="posts">
      <div
        slot-scope="{ data: post, loading }"
        class="mt-8">
        <h2>Single post</h2>
        <div
          v-if="post"
          class="rounded shadow-md p-4 mt-4">
          <span v-if="loading">Loading...</span>
          <h3 class="font-bold text-xl mb-2">{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </data-model>

    <data-model endpoint="posts">
      <div
        slot-scope="{ data: post, loading, create }"
        class="mt-8">
        <h2>Create new post</h2>
        <div class="rounded shadow-md p-4 mt-4">
          <span v-if="loading">Loading...</span>

          <template v-if="post">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </template>

          <form @submit.prevent="create(newPost);">
            <label class="block mt-4">
              <span class="block text-grey-darker text-sm">Title</span>
              <input
                v-model="newPost.title"
                class="shadow appearance-none border rounded mt-1 py-2 px-3 text-grey-darker"
              >
            </label>
            <label class="block mt-4">
              <span class="block text-grey-darker text-sm">Body</span>
              <textarea
                v-model="newPost.body"
                class="shadow appearance-none border rounded mt-1 py-2 px-3 text-grey-darker"
              />
            </label>
            <button
              :disabled="loading"
              class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded mt-4">
              <template v-if="loading">Loading...</template>
              <template v-else>Create</template>
            </button>
          </form>
        </div>
      </div>
    </data-model>

    <data-model
      :id="1"
      endpoint="posts">
      <div
        slot-scope="{ data: post, loading, update }"
        class="mt-8">
        <h2>Edit existing post</h2>
        <div
          v-if="post"
          class="rounded shadow-md p-4 mt-4">
          <span v-if="loading">Loading...</span>

          <h3 class="font-bold text-xl mb-2">{{ post.title }}</h3>
          <p>{{ post.body }}</p>

          <form @submit.prevent="update(post);">
            <label class="block mt-4">
              <span class="block text-grey-darker text-sm">Title</span>
              <input
                v-model="post.title"
                class="shadow appearance-none border rounded mt-1 py-2 px-3 text-grey-darker"
              >
            </label>
            <label class="block mt-4">
              <span class="block text-grey-darker text-sm">Body</span>
              <textarea
                v-model="post.body"
                class="shadow appearance-none border rounded mt-1 py-2 px-3 text-grey-darker"
              />
            </label>
            <button
              :disabled="loading"
              class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded mt-4">
              <template v-if="loading">Loading...</template>
              <template v-else>Update</template>
            </button>
          </form>
        </div>
      </div>
    </data-model>
  </div>
</template>

<script>
import DataModel from './components/DataModel';
import DataProvider from './components/DataProvider';

import PostList from './components/PostList.vue';

export default {
  name: `App`,
  components: {
    DataModel,
    DataProvider,
    PostList,
  },
  data() {
    return {
      newPost: {
        title: ``,
        body: ``,
      },
      postListUserId: 1,
    };
  },
};
</script>
