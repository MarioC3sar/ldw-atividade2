import { createSlice, nanoid } from '@reduxjs/toolkit'

const DEFAULT_CATEGORIES = ['saúde', 'estudo', 'lazer']

const initialState = {
  habits: [
    { id: nanoid(), name: 'Beber água', category: 'saúde', completed: false },
    { id: nanoid(), name: 'Estudar React', category: 'estudo', completed: false },
  ],
  filterCategory: 'todas',
  defaultCategories: DEFAULT_CATEGORIES,
}

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: {
      reducer(state, action) {
        state.habits.push(action.payload)
      },
      prepare({ name, category }) {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            category: category.trim().toLowerCase(),
            completed: false,
          },
        }
      },
    },
    updateHabit(state, action) {
      const { id, name, category } = action.payload
      const habit = state.habits.find((item) => item.id === id)

      if (habit) {
        habit.name = name.trim()
        habit.category = category.trim().toLowerCase()
      }
    },
    toggleHabit(state, action) {
      const habit = state.habits.find((item) => item.id === action.payload)
      if (habit) {
        habit.completed = !habit.completed
      }
    },
    deleteHabit(state, action) {
      state.habits = state.habits.filter((item) => item.id !== action.payload)
    },
    setFilterCategory(state, action) {
      state.filterCategory = action.payload
    },
    clearCompleted(state) {
      state.habits = state.habits.filter((item) => !item.completed)
    },
  },
})

export const {
  addHabit,
  updateHabit,
  toggleHabit,
  deleteHabit,
  setFilterCategory,
  clearCompleted,
} = habitsSlice.actions

export default habitsSlice.reducer
