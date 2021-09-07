<template>
  <section class="list">
    <div class="container">
      <button @click="newLIst()">New List</button>
      <button @click="$auth.logout()" style="float: right">logout</button>
      <div class="row mt-3">
        <div
          v-for="todo in todos"
          :key="todo._id"
          class="col-sm-12 col-md-6 col-lg-4 mb-5"
        >
          <div class="col_inner_wrapper">
            <div class="col_header_wrapper">
              <h4 @click="editTodo(todo)" style="cursor: pointer">
                {{ todo.name }}
              </h4>
              <div @click="removetodo(todo._id)" class="close">X</div>
            </div>
            <div class="col_content_wrapper">
              <ul>
                <li v-for="todoData in todosData[todo._id]" :key="todoData._id">
                  <tododataitem :todo="todo" :todoitem="todoData" />
                </li>
              </ul>
              <div class="col_bottom_wrapper">
                <addtododata :todo="todo" />
              </div>
            </div>
            <!-- col_content_wrapper -->
          </div>
          <!-- col_inner_wrapper -->
        </div>
        <!-- col -->
      </div>
      <!-- row -->
    </div>
    <!-- container -->
    <b-modal v-model="showModal" title="Change Name">
      <b-container fluid>
        <form class="onpopup" @submit.prevent>
          <input
            type="text"
            id="login"
            class=""
            required
            name="login"
            placeholder="login"
            v-model="editModal.name"
          />
          <div style="color: red" v-if="todoError">{{ todoError }}</div>
        </form>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="updatename()"
          >
            Update
          </b-button>
          <b-button
            style="margin: 0 25px"
            variant="secondary"
            size="sm"
            class="float-right"
            @click="showModal = false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </section>
</template>

<script>
import addtododata from "~/components/AddTodoData.vue";
import tododataitem from "~/components/todoDataItem.vue";
export default {
  components: {
    addtododata,
    tododataitem,
  },
  data() {
    return {
      showModal: false,
      editModal: {
        _id: "",
        name: "",
      },
      todoError: "",
      paginationLock: false,
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    todosData() {
      return this.$store.state.todoData;
    },
  },
  created() {
    this.$store.commit("updateTodos", this.$store.state.auth.user.Todoss);
    this.$store.commit(
      "updateTodoData",
      this.$store.state.auth.user?.collection
    );
  },
  mounted() {
    this.scroll();
  },
  methods: {
    newLIst() {
      this.$axios
        .$post("todo", {})
        .then((response) => {
          var updated = [...this.$store.state.todos];
          updated.unshift(response.data);
          this.$store.commit("updateTodos", updated);
          this.$toast.success("New Todo Added :)", {
            duration: "1000",
          });
        })
        .catch((err) => {
          this.$toast.error("Add todo Failed!");
        });
    },
    removetodo(id) {
      this.$bvModal
        .msgBoxConfirm("Are you sure?")
        .then((value) => {
          if (Boolean(value)) {
            this.$axios
              .$delete(`todo/${id}`, {})
              .then((response) => {
                if (response.status === 1) {
                  var updated = [...this.$store.state.todos];
                  for (var i = 0; i < updated.length; i++) {
                    if (updated[i]["_id"] === id) {
                      updated.splice(i, 1);
                    }
                  }
                  this.$store.commit("updateTodos", updated);
                  this.$toast.success("Todo removed!", {
                    duration: "1000",
                  });
                } else {
                  this.$toast.error("unable to remove todo");
                }
              })
              .catch((err) => {
                this.$toast.error("unable to remove todo");
              });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    editTodo(dt) {
      this.todoError = "";
      this.editModal = { ...dt };
      this.showModal = true;
    },
    updatename() {
      let data = this.editModal.name.trim();
      if (!data.length) {
        this.todoError = "Todo name cannot be empty";
        return;
      }
      if (data.length > 20) {
        this.todoError = "length exceeded(max: 20)";
        return;
      }
      this.todoError = "";
      if (this.editModal._id) {
        var id = this.editModal._id;
        this.$axios
          .$put(`todo/${id}`, {
            title: this.editModal.name,
          })
          .then((response) => {
            console.log(response);
            this.showModal = false;
            if (response.status === 1) {
              var dataToUpdate = {};
              let updated = JSON.parse(JSON.stringify(this.$store.state.todos));
              for (var i = 0; i < updated.length; i++) {
                if (updated[i]["_id"] === id) {
                  dataToUpdate = updated[i];
                  updated.splice(i, 1);
                }
              }
              dataToUpdate.name = response.data.name;
              console.log(dataToUpdate);
              updated.unshift(dataToUpdate);
              this.$store.commit("updateTodos", updated);
              setTimeout(() => {
                this.$toast.success(response.message, {
                  duration: "2000",
                });
              }, 100);
            } else {
              this.$toast.error("unable to update todo");
            }
          })
          .catch((err) => {
            console.log(err);
            this.showModal = false;
            this.$toast.error("unable to update todo");
          });
      }
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (!this.paginationLock) {
            this.paginationLock = true;
            this.loadNextData();
          }
        }
      };
    },
    loadNextData() {
      this.$axios
        .$get(`todo?limit=${this.$store.state.todos.length + 20}`, {})
        .then((response) => {
          if (response.data.Todoss) {
            var updated = response.data.Todoss;
            this.$store.commit("updateTodos", updated);
            this.$store.commit("updateTodoData", response.data.collection);
          }
          this.paginationLock = false;
        })
        .catch((err) => {
          this.paginationLock = false;
          this.$toast.error("unable to load todos");
        });
    },
  },
};
</script>