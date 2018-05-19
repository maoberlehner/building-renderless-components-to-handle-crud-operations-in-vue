import DataProvider from './DataProvider';

export default {
  extends: DataProvider,
  props: {
    entity: {
      type: Object,
    },
    fetch: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      data: this.entity || null,
    };
  },
  created() {
    if (this.id && !this.data) this.find();
  },
  methods: {
    create(data) {
      return this.query(`post`, this.endpoint, data);
    },
    destroy() {
      return this.query(`delete`, `${this.endpoint}/${this.id}`);
    },
    find() {
      return this.query(`get`, `${this.endpoint}/${this.id}`);
    },
    update(data) {
      return this.query(`patch`, `${this.endpoint}/${this.id}`, data);
    },
  },
  render() {
    return this.$scopedSlots.default({
      create: this.create,
      data: this.data,
      destroy: this.destroy,
      find: this.find,
      loading: this.loading,
      update: this.update,
    });
  },
};
