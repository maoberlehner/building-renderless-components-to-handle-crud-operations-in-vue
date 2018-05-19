import axios from 'axios';

export default {
  props: {
    basUrl: {
      type: String,
      default: `https://jsonplaceholder.typicode.com`,
    },
    endpoint: {
      type: String,
      required: true,
    },
    fetch: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: Object,
    },
  },
  data() {
    return {
      api: axios.create({ baseURL: this.basUrl }),
      data: null,
      error: null,
      loading: false,
    };
  },
  created() {
    if (this.fetch) this.findAll(this.filter);
  },
  methods: {
    async query(type, ...params) {
      if (this.loading) return;

      this.loading = true;
      try {
        const response = await this.api[type](...params);
        this.data = response.data;
        this.error = null;
        this.$emit(`success`, response);
      } catch (error) {
        this.data = null;
        this.error = error.response;
        this.$emit(`error`, error);
      }
      this.loading = false;
    },
    findAll(params) {
      return this.query(`get`, this.endpoint, { params });
    },
  },
  render() {
    return this.$scopedSlots.default({
      data: this.data,
      error: this.error,
      findAll: this.findAll,
      loading: this.loading,
    });
  },
};
