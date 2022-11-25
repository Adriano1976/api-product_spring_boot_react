import {useEffect, useState} from 'react';
import "./ProductApp.css";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

function ProductApp() {

    // Objeto produto.
    const product = {
        code: 0,
        name: '',
        brand: ''
    }

    // UseState
    const [btnRegister, setBtnRegister] = useState(true);
    const [products, setProducts] = useState([]);
    const [objProduct, setObjProduct] = useState(product);

    // UseEffect
    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then(return_product => return_product.json())
            .then(converted_product_return => setProducts(converted_product_return));
    }, [])

    // Obtendo os dados do formulário.
    const typed_field = (object) => {
        setObjProduct({...objProduct, [object.target.name]: object.target.value});
    }

    // Cadastrar produto.
    const register_product = () => {
        fetch('http://localhost:8080/register', {
            method: 'post',
            body: JSON.stringify(objProduct),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(return_product => return_product.json())
            .then(converted_product_return => {

                if (converted_product_return.createAnswer !== undefined) {
                    alert(converted_product_return.createAnswer)
                } else {
                    setProducts([...products, converted_product_return]);
                    alert('Product registered successfully!');
                    clear_form();
                }
            })
    }
    // Alterar produto
    const update_product = () => {
        fetch('http://localhost:8080/update', {
            method: 'put',
            body: JSON.stringify(objProduct),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(return_product => return_product.json())
            .then(converted_product_return => {

                if (converted_product_return.createAnswer !== undefined) {
                    alert(converted_product_return.createAnswer);
                } else {
                    alert('Product updated successfully!')
                    // Cópia do vetor des produtos.
                    let vectorTime = [...products];
                    // Índice dos produtos.
                    let index = vectorTime.findIndex((product) => {
                        return product.code === objProduct.code;
                    });

                    // Alterar produto do vectorTime.
                    vectorTime[index] = objProduct;

                    // Atualizar o vetor dos produtos.
                    setProducts(vectorTime);

                    // limpar o formulário.
                    clear_form();
                }
            })
    }

    // Remover produto.
    const delete_product = () => {
        fetch('http://localhost:8080/delete/' + objProduct.code, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(return_product => return_product.json())
            .then(converted_return_product => {
                alert(converted_return_product.createAnswer);
                let vectorTime = [...products];
                let index = vectorTime.findIndex((product) => {
                    return product.code === objProduct.code;
                });

                // Remover produto do vectorTime
                vectorTime.splice(index, 1);

                // Atualizar o vetor dos produtos.
                setProducts(vectorTime);

                // Limpar formulário
                clear_form();
            })
    }

    // Limpar formulário
    const clear_form = () => {
        setObjProduct(product);
        setBtnRegister(true);
    }

    // Selecionar produto
    const select_product = (index) => {
        setObjProduct(products[index]);
        setBtnRegister(false);
    }

    // Retorno dos dados.
    return (
        <div>
            <ProductForm
                btn={btnRegister}
                keyboardEvent={typed_field}
                registerProduct={register_product}
                product={objProduct}
                deleteProduct={delete_product}
                updateProduct={update_product}/>
            <ProductTable
                vector={products}
                select={select_product}/>
        </div>
    );
}

export default ProductApp;
