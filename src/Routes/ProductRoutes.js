import { Router } from "express";
import { ProductSchema } from "../Utils/ProductSchema.js";
import {JsonData, getProducts, newProduct,addAllProducts,deleteProduct, updateProduct, patchProduct} from '../Utils/AddJsonData.js'
import {checkSchema, matchedData, validationResult} from 'express-validator'

const ProductRouter = Router()

ProductRouter.get("/api/products", async(req,res) =>{
    res.send(await getProducts())
    res.end()
})

ProductRouter.post("/api/products", checkSchema(ProductSchema),(req,res) =>{
    console.log('req.body: ', req.body)
    const errors =validationResult(req)
    console.log(errors)
    if(errors.isEmpty() === false){
        return(res.send(errors).end())
    }
    const product = matchedData(req)
    newProduct(product)

    res.end()
})

ProductRouter.post("/api/products/bulk" ,(req,res) =>{
    console.log('req.body: ', req.body)
    const product = req.body
    addAllProducts(product)
    res.send({message: "PRODUCTS ADDED"})
    res.end()
})
ProductRouter.delete("/api/products/delete", (req,res) =>{
    console.log('req.body: ', req.body)
    const id = req.body.id
    deleteProduct(id)

    res.end()
})
ProductRouter.put("/api/products/put", (req,res) =>{
    console.log('req.body: ', req.body)
    const product = req.body
    updateProduct(product)
    res.end()
})

ProductRouter.patch("/api/products/patch", (req,res) =>{
    console.log('req.body: ', req.body)
    const product = req.body
    patchProduct(product)
    res.end()
})

export default ProductRouter