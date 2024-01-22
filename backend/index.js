const express = require("express");
const app = express();
const PORT = 3000
const rootRouter = require("./routes/index.js")

const cors = require('cors');



app.use(cors());
app.use(express.json());


app.use("/api/v1", rootRouter);


app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})


