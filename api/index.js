const server = require("./src/app.js");
const {
    conn
} = require("./src/db.js");



conn.sync({ force: true }).then(() => {
    server.listen(3700, () => {
        console.log("%s listening at 3700"); // eslint-disable-line no-console
    });
});