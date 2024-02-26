import  express  from "express";
import { JsonData } from "./src/Utils/AddJsonData.js";
import ProductRouter from "./src/Routes/ProductRoutes.js";
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(ProductRouter)

// app.get("/api/products", async(req,res) =>{
//     res.send(await getProducts())
//     res.end()
// })

// app.post("/api/products" ,(req,res) =>{
//     console.log('req.body: ', req.body)
//     const product = req.body
//     newProduct(product)

//     res.end()
// })

// app.post("/api/products/bulk" ,(req,res) =>{
//     console.log('req.body: ', req.body)
//     const product = req.body
//     addAllProducts(product)
//     res.send({message: "PRODUCTS ADDED"})
//     res.end()
// })
// app.delete("/api/products/delete", (req,res) =>{
//     console.log('req.body: ', req.body)
//     const id = req.body.id
//     deleteProduct(id)

//     res.end()
// })
// app.put("/api/products/put", (req,res) =>{
//     console.log('req.body: ', req.body)
//     const product = req.body
//     updateProduct(product)
//     res.end()
// })

// app.patch("/api/products/patch", (req,res) =>{
//     console.log('req.body: ', req.body)
//     const product = req.body
//     patchProduct(product)
//     res.end()
// })
//  then() used to execute the provided callback function once the promise(JsonData()) is resolved
JsonData().then(() =>{
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})


