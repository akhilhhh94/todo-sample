<!-- Please remove this file from your project -->
<template>
  <div>
    <input
      @input="onChange($event)"
      type="text"
      v-model="text"
      name=""
      maxlength="22"
      :disabled="disabled"
      placeholder="Type here to add to the list"
    /><button @click="AddData()" :disabled="disabledBtn" class="add_btn">
      Add
    </button>
  </div>
</template>
<script>
export default {
  props: ["todo"],
  data() {
    return {
      text: "",
      disabled: false,
      disabledBtn: true,
    };
  },
  methods: {
    onChange(event) {
      var vl = event.target.value;
      if (!vl || !vl.trim()) {
        this.disabledBtn = true;
        return false;
      }
      this.disabledBtn = false;
    },
    AddData() {
      this.$axios
        .$post(`todo-data`, {
          id: this.todo._id,
          data: this.text.trim(),
          order: 1,
        })
        .then((response) => {
          this.$store.commit("updateTodoDatawithKey", {
            key: this.todo._id,
            val: response.data,
          });
          this.$toast.success(`Item added to list '${this.todo.name}'`, {
            duration: "1000",
          });
          this.$emit('scrollTo', this.todo._id)
          this.text = '';
          setTimeout(() => {
            this.disabledBtn = true;
          }, 100);
        })
        .catch((err) => {
          this.$toast.error("unable to remove todo");
        });
    },
  },
};
</script>
<style lang="css" scoped>
button[disabled] {
  color: black !important;
  background: #e4e2e2 !important;
}
</style>
