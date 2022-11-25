function ProductForm({btn, keyboardEvent, registerProduct, product, cancelProduct, deleteProduct, updateProduct}) {
    return (
        <form>
            <input type={'text'} value={product.name} onChange={keyboardEvent} name={'name'}
                   placeholder={'Product´s name'}
                   className={'form-control'}/>
            <input type={'text'} value={product.brand} onChange={keyboardEvent} name={'brand'}
                   placeholder={'Product brand'}
                   className={'form-control'}/>

            {
                btn
                    ?
                    <input type={'button'} value={'Register'} onClick={registerProduct} className={'btn btn-primary'}/>
                    :
                    <div>
                        <input type={'button'} value={'Update'} onClick={updateProduct} className={'btn btn-warning'}/>
                        <input type={'button'} value={'Delete'} onClick={deleteProduct} className={'btn btn-danger'}/>
                        <input type={'button'} value={'Cancel'} onClick={cancelProduct} className={'btn btn-secondary'}/>
                    </div>
            }
        </form>
    )
}

export default ProductForm;
