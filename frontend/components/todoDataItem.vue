<!-- Please remove this file from your project -->
<template>
  <div>
    <label class="checkbox_wrapper " :class="{ 'linbr grey-color' : Ischecked}"
      >{{ todoitem.data }}
      <input v-model="Ischecked" @change="updateTodoData()" type="checkbox" />
      <span class="checkmark"></span>
    </label>
    <div @click="remove()" class="close_list">X</div>
  </div>
</template>
<script>
export default {
  props: ["todo", "todoitem"],
  data() {
    return {
      Ischecked: this.todoitem.checked
    };
  },
  methods: {
    remove() {
      this.disabledBtn = true;
      this.$axios
        .$delete(`todo-data/${this.todoitem._id}/${this.todo._id}`, {
          
        })
        .then((response) => {
          this.$store.commit("updateTodoDatawithKey", {
            key: this.todo._id,
            val: response.data,
          });
          this.$toast.success(`Item added to list '${this.todo.name}'`, {
            duration: "1000",
          });
          this.disabledBtn = true;
        })
        .catch((err) => {
          this.$toast.error("unable to remove todo");
        });
    },
    updateTodoData() {
      this.$axios
        .$put(`todo-data/${this.todoitem._id}`, {
          id: this.todo._id,
          checked: this.Ischecked
        })
        .then((response) => {
          this.$store.commit("updateTodoDatawithKey", {
            key: this.todo._id,
            val: response.data,
          });
        })
        .catch((err) => {
          this.$toast.error("Failed to update the data");
        });
    }
  },
};
</script>
<style lang="css" scoped>
button[disabled] {
  color: black !important;
  background: #e4e2e2 !important;
}
</style>