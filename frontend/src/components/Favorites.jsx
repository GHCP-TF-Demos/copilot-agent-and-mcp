import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFavorites, removeFavorite, updateComment } from '../store/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/BookList.module.css';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const status = useAppSelector(state => state.favorites.status);
  const token = useAppSelector(state => state.user.token);
  const navigate = useNavigate();
  const [editingComment, setEditingComment] = useState({});
  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    dispatch(fetchFavorites(token));
  }, [dispatch, token, navigate]);

  useEffect(() => {
    const initialComments = {};
    favorites.forEach(book => {
      initialComments[book.id] = book.comment || '';
    });
    setCommentTexts(initialComments);
  }, [favorites]);

  // generated-by-copilot: handler for removing a book from favorites
  const handleRemoveFavorite = async (bookId) => {
    if (!token) {
      navigate('/');
      return;
    }
    await dispatch(removeFavorite({ token, bookId }));
  };

  const handleCommentChange = (bookId, value) => {
    setCommentTexts(prev => ({ ...prev, [bookId]: value }));
  };

  const handleSaveComment = async (bookId) => {
    if (!token) return;
    await dispatch(updateComment({ token, bookId, comment: commentTexts[bookId] || '' }));
    setEditingComment(prev => ({ ...prev, [bookId]: false }));
  };

  const toggleEditComment = (bookId) => {
    setEditingComment(prev => ({ ...prev, [bookId]: !prev[bookId] }));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Failed to load favorites.</div>;

  return (
    <div>
      <h2>My Favorite Books</h2>
      {favorites.length === 0 ? (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: '2rem auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center',
          color: '#888',
        }}>
          <p>No favorite books yet.</p>
          <p>
            Go to the <a href="/books" onClick={e => { e.preventDefault(); navigate('/books'); }}>book list</a> to add some!
          </p>
        </div>
      ) : (
        <div className={styles.bookGrid}>
          {favorites.map(book => (
            <div className={styles.bookCard} key={book.id}>
              <div className={styles.bookTitle}>{book.title}</div>
              <div className={styles.bookAuthor}>by {book.author}</div>
              
              <div style={{ marginTop: '0.8rem', marginBottom: '0.8rem' }}>
                {editingComment[book.id] ? (
                  <div>
                    <textarea
                      value={commentTexts[book.id] || ''}
                      onChange={(e) => handleCommentChange(book.id, e.target.value)}
                      placeholder="Add your comment..."
                      style={{
                        width: '100%',
                        minHeight: '60px',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '0.9rem',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        className={styles.simpleBtn}
                        onClick={() => handleSaveComment(book.id)}
                        style={{ flex: 1, padding: '0.4rem' }}
                      >
                        Save
                      </button>
                      <button
                        className={styles.simpleBtn}
                        onClick={() => toggleEditComment(book.id)}
                        style={{ flex: 1, padding: '0.4rem', background: '#888' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {book.comment ? (
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#555',
                        fontStyle: 'italic',
                        padding: '0.5rem',
                        background: '#f9f9f9',
                        borderRadius: '4px',
                        marginBottom: '0.5rem'
                      }}>
                        "{book.comment}"
                      </div>
                    ) : (
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#999',
                        marginBottom: '0.5rem'
                      }}>
                        No comment yet
                      </div>
                    )}
                    <button
                      className={styles.simpleBtn}
                      onClick={() => toggleEditComment(book.id)}
                      style={{ width: '100%', padding: '0.4rem', marginBottom: '0.3rem' }}
                    >
                      {book.comment ? 'Edit Comment' : 'Add Comment'}
                    </button>
                  </div>
                )}
              </div>

              <button
                className={styles.simpleBtn}
                onClick={() => handleRemoveFavorite(book.id)}
                style={{ background: '#e25555' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
