import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (token) => {
  const res = await fetch('http://localhost:4000/api/favorites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async ({ token, bookId }) => {
  await fetch('http://localhost:4000/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
  return bookId;
});

// generated-by-copilot: removeFavorite async thunk to remove a book from favorites
export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async ({ token, bookId }) => {
  const res = await fetch(`http://localhost:4000/api/favorites/${bookId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to remove favorite');
  }
  return bookId;
});

export const updateComment = createAsyncThunk('favorites/updateComment', async ({ token, bookId, comment }) => {
  const res = await fetch(`http://localhost:4000/api/favorites/${bookId}/comment`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });
  if (!res.ok) {
    throw new Error('Failed to update comment');
  }
  return { bookId, comment };
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => { state.status = 'loading'; })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, state => { state.status = 'failed'; })
      .addCase(addFavorite.fulfilled, (state, action) => {
        // After adding, fetch the updated favorites list to ensure UI is in sync
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        // Remove the book from the state directly
        state.items = state.items.filter(book => book.id !== action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        // Update the comment in the state
        const book = state.items.find(b => b.id === action.payload.bookId);
        if (book) {
          book.comment = action.payload.comment;
        }
      });
  },
});

export default favoritesSlice.reducer;
