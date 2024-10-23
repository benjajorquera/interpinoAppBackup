const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        "message": "Welcome to my application"
    });
});

module.exports = router;