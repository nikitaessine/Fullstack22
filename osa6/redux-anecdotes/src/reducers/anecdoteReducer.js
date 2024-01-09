import { createSlice } from '@reduxjs/toolkit'
import { setNotificationWithTimeout } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const anecdote = state.find(anecdote => anecdote.id === action.payload)
      if (anecdote) {
        anecdote.votes++
      }
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdoteWithNotification = (id) => {
  return async (dispatch, getState) => {
    dispatch(voteAnecdote(id))
    const votedAnecdote = getState().anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotificationWithTimeout(`You voted for '${votedAnecdote.content}'`, 5))
  }
}

export default anecdoteSlice.reducer