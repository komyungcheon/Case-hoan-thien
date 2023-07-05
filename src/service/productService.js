import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll(searchValue) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product WHERE name like '%${searchValue}%' order by id`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`insert into product values (${product.id}, '${product.name}', ${product.price}, ${product.quantity});`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM product WHERE id = ${idDelete}`, (err, delProduct) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delProduct);
                }
            });


        });
    }
    // searchProduct(searchValue) {
    //     return new Promise((resolve, reject) => {
    //         connection.getConnection().query(`SELECT * FROM product WHERE name like '%${searchValue}%' order by name`, (err, products) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(products);
    //             }
    //         });
    //     });
    // }


    update(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(
                `update product 
                        set 
                        name = '${product.name}', 
                        price= ${product.price}, 
                        quantity = ${product.quantity}
                       
                where id = ${product.id}`, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
        })

    }
}

export default new ProductService();