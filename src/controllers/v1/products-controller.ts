import {Request, Response} from 'express';
import {products, Product} from '../../data/products';

export const getProducts = (req:Request, res:Response):void => {
    const itemsPerPage = 3;
    const page = parseInt(req.query.page as string);
    const start = (page - 1) * itemsPerPage;
    const total = products.length;
    const end = page * itemsPerPage;

    // console.log("start", start);
    // console.log("total", total);
    // console.log("end", end > total ? total : end);


    res.send({
        "page": page,
        "per_page": itemsPerPage,
        "total": total,
        "total_pages": Math.ceil(total / itemsPerPage),
        "data": products.slice(start, end),
    })
}


export const getProductById = (req:Request, res:Response):void => {
    const { productId } = req.params
    const index = products.findIndex((item) => item.id === parseInt(productId));
    if (index !== -1) {
        res.send({ data: products[index] })
    } else {
        res.status(404).send({})
    }

}

export const createProduct = (req:Request, res:Response):void => {
    const { name, year, color, pantone_value } = req.body;
    const newProduct:Product = {
        id: products.length + 1,
        name,// name: name
        year,
        color,
        pantone_value
    };

    products.push(newProduct)
    res.send(newProduct)
}


export const updateProduct = (req:Request, res:Response):void => {
    const id = parseInt(req.params.productId);
    const { name, year, color, pantone_value } = req.body;
    const index = products.findIndex((item) => item.id == id);
    if (index !== -1) {

        products[index] = {
            id,
            name,
            year,
            color,
            pantone_value,
        }
        res.send({ data: products[index] })
    } else {
        res.status(404).send({})
    }
}


export const partialUpdateProduct = (req:Request, res:Response):void => {
    const productId = parseInt(req.params.productId);
    const { id, name, year, color, pantone_value } = req.body;
    const index = products.findIndex((item) => item.id == productId);
    if (index !== -1) {

        const product = products[index];

        products[index] = {
            id: id || product.id,
            name: name || product.name,
            year: year || product.year,
            color: color || product.color,
            pantone_value: pantone_value || product.pantone_value,
        }

        res.send({ data: products[index] })
    } else {
        res.status(404).send({})
    }
}


export const updateProductAndNotify = (req:Request, res:Response):void => {
    const productId = parseInt(req.params.productId);
    const { client, data } = req.body
    const { id, name, year, color, pantone_value } = data;
    const index = products.findIndex((item) => item.id == productId);
    if (index !== -1) {

        const product = products[index];

        products[index] = {
            id: id || product.id,
            name: name || product.name,
            year: year || product.year,
            color: color || product.color,
            pantone_value: pantone_value || product.pantone_value,
        }



        res.send({ data: products[index], message: `Email sent to ${client}` })
    } else {
        res.status(404).send({})
    }
}


export const deleteProductById = (req:Request, res:Response):void => {
    const productId = parseInt(req.params.productId);
    const index = products.findIndex((item) => item.id == productId);
    if (index !== -1) {
        products.splice(index, 1);
        res.send({})
    } else {
        res.status(404).send({})
    }


}