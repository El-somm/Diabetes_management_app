

module.exports = (req, res, next) => {
    console.log('Checking authentication...');
    console.log('req.isAuthenticated exists:', !!req.isAuthenticated); // Ensure the function exists
    console.log('Is user authenticated:', req.isAuthenticated ? req.isAuthenticated() : false);
    console.log('req.user:', req.user); // Log the user object

    // Check if the user is authenticated
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/handler
    }

    // If not authenticated, return an error
    res.status(401).json({ error: 'Unauthorized access. Please log in.' });
};