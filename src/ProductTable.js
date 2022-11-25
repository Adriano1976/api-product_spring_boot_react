function ProductTable({vector, select}) {
    return (
        <table className={'table'}>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Select</th>
            </tr>
            </thead>
            <tbody>
            {
                vector.map((product, code) => (
                    <tr key={code}>
                        <td>{code + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button onClick={() => {
                                select(code)
                            }} className={"btn btn-success"}>Select
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default ProductTable;