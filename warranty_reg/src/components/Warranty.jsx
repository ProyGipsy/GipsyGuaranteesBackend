import React, { useState } from 'react';
import '../styles/loginStyle.css';

function Warranty() {
  const [form, setForm] = useState({
    barCode: '',
    purchaseDate: '',
    storeName: '',
    storeAddress: '',
    invoiceNumber: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'invoiceNumber') {
      setForm({ ...form, invoiceNumber: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    try {
      const response = await fetch('http://localhost:5000/submitWarranty', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('¡Garantía guardada exitosamente!');
        // Optionally reset form or redirect
      } else {
        alert('Error al guardar la garantía');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Registro de Garantía</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="barCode">Código de Barras:</label>
        <input
          type="text"
          id="barCode"
          name="barCode"
          required
          value={form.barCode}
          onChange={handleChange}
        />
        <br /><br />
        <label htmlFor="purchaseDate">Fecha de compra:</label>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          required
          value={form.purchaseDate}
          onChange={handleChange}
        />
        <br /><br />
        <label htmlFor="storeName">Tienda donde compró el producto:</label>
        <select
          id="storeName"
          name="storeName"
          required
          value={form.storeName}
          onChange={handleChange}
        >
          <option value="">Escoge una tienda</option>
          <option value="StoreA">Opción 1</option>
          <option value="StoreB">Opción 2</option>
          <option value="StoreC">Opción 3</option>
        </select>
        <br /><br />
        <label htmlFor="storeAddress">Dirección de la sucursal:</label>
        <select
          id="storeAddress"
          name="storeAddress"
          required
          value={form.storeAddress}
          onChange={handleChange}
        >
          <option value="">Escoge una dirección</option>
          <option value="StoreA">Dirección 1</option>
          <option value="StoreB">Dirección 2</option>
          <option value="StoreC">Dirección 3</option>
        </select>
        <br /><br />
        <label htmlFor="invoiceNumber">Factura del producto:</label>
        <input
          type="file"
          id="invoiceNumber"
          name="invoiceNumber"
          accept="image/*"
          required
          onChange={handleChange}
        />
        <br /><br />
        <button type="submit">Guardar Garantía</button>
      </form>
    </div>
  );
}

export default Warranty;