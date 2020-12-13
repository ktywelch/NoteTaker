const express = require('express');
const app = express();
const PORT = 8000;
const apiRoutes = require("./routes/api-routes")
const clientRoutes = require("./routes/client-routes")

//add change the extended to true so it can support varibale passing
app.use(express.urlencoded({extended: true}))
//tell us that the app object will use JSON messaging
app.use(express.json())

app.use("/api",apiRoutes)
app.use("/", clientRoutes)


app.listen(PORT, () => {console.log(`Server listening on: http://localhost:${PORT}`);});

