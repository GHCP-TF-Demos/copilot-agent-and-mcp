const express = require('express');
const RateLimit = require('express-rate-limit');

function createFavoritesRouter({ usersFile, booksFile, readJSON, writeJSON, authenticateToken }) {
  const router = express.Router();

  const favoritesLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs for favorites routes
    standardHeaders: true,
    legacyHeaders: false,
  });

  router.use(favoritesLimiter);

  router.get('/', authenticateToken, (req, res) => {
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const books = readJSON(booksFile);
    const favorites = user.favorites.map(fav => {
      const bookId = typeof fav === 'string' ? fav : fav.bookId;
      const comment = typeof fav === 'object' ? fav.comment || '' : '';
      const book = books.find(b => b.id === bookId);
      return book ? { ...book, comment } : null;
    }).filter(b => b !== null);
    res.json(favorites);
  });

  router.post('/', authenticateToken, (req, res) => {
    const { bookId, comment = '' } = req.body;
    if (!bookId) return res.status(400).json({ message: 'Book ID required' });
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const existingIndex = user.favorites.findIndex(fav => 
      (typeof fav === 'string' ? fav : fav.bookId) === bookId
    );
    if (existingIndex === -1) {
      user.favorites.push({ bookId, comment });
      writeJSON(usersFile, users);
    }
    res.status(200).json({ message: 'Book added to favorites' });
  });

  // generated-by-copilot: DELETE endpoint to remove a book from favorites
  router.delete('/:bookId', authenticateToken, (req, res) => {
    const { bookId } = req.params;
    if (!bookId) return res.status(400).json({ message: 'Book ID required' });
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const index = user.favorites.findIndex(fav => 
      (typeof fav === 'string' ? fav : fav.bookId) === bookId
    );
    if (index !== -1) {
      user.favorites.splice(index, 1);
      writeJSON(usersFile, users);
    }
    res.status(200).json({ message: 'Book removed from favorites' });
  });

  // PATCH endpoint to update comment for a favorite
  router.patch('/:bookId/comment', authenticateToken, (req, res) => {
    const { bookId } = req.params;
    const { comment } = req.body;
    if (!bookId) return res.status(400).json({ message: 'Book ID required' });
    if (comment === undefined) return res.status(400).json({ message: 'Comment is required' });
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const favIndex = user.favorites.findIndex(fav => 
      (typeof fav === 'string' ? fav : fav.bookId) === bookId
    );
    if (favIndex === -1) return res.status(404).json({ message: 'Book not in favorites' });
    const existingFav = user.favorites[favIndex];
    user.favorites[favIndex] = { 
      bookId: typeof existingFav === 'string' ? existingFav : existingFav.bookId, 
      comment 
    };
    writeJSON(usersFile, users);
    res.status(200).json({ message: 'Comment updated', comment });
  });

  return router;
}

module.exports = createFavoritesRouter;
