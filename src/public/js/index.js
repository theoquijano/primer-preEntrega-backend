const socket = io()

socket.on('productos', productos => {
    const tbody = document.getElementById('productos-body')
    tbody.innerHTML = ''

    productos.forEach(producto => {
        const row = tbody.insertRow()

        row.innerHTML = `
        <td>${producto._id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.price}</td>
        <td>${producto.code}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td>${producto.status ? 'Activo' : 'Desactivado'}</td>
        <td>${Array.isArray(producto.thumbnails) && producto.thumbnails.length > 0 ? producto.thumbnails[0] : 'No hay imagen'}</td>
        `
    });
})

const formulario = document.getElementById('producto-form')

formulario.addEventListener('submit', function (event) {
    event.preventDefault()

    const titulo = document.getElementById('titulo').value
    const descripcion = document.getElementById('descripcion').value
    const precio = document.getElementById('precio').value
    const codigo = document.getElementById('codigo').value
    const stock = document.getElementById('stock').value
    const categoria = document.getElementById('categoria').value

    const producto = {
        title: titulo,
        description: descripcion,
        price: precio,
        code: codigo,
        stock: stock,
        category: categoria
    }

    socket.emit('agregarProducto', producto)

    formulario.reset()
})