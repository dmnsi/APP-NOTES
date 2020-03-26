const indexController = {};

indexController.renderIndex = (req, res) => {
    res.render('index')
};

indexController.renderAbout = (req, res) => {
    res.render('about')
};

indexController.renderContact = (req, res) => {
    res.render('contact')
};


module.exports = indexController;