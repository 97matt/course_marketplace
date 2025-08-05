const app = require("./app.js")

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`)
})
