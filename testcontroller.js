const testPostController = (req, res) => {
    const { name } = req.body;
    if (name) {
        res.status(200).send('Your Name is ' + name);
    } else {
        res.status(400).send('Name is required');
    }
};

export default testPostController;
