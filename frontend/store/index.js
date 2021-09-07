export const state = () => ({
    todos: [],
    todoData: {}
})

export const mutations = {
    updateTodos(state, payload) {
        state.todos = payload;
    },
    updateTodoData(state, payload) {
        state.todoData = {
            ...payload
        }
    },
    updateTodoDatawithKey(state, payload) {
        state.todoData = {
            ...state.todoData,
            [payload.key]: payload.val
        };
    },
}