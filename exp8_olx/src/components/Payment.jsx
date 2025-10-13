import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('productId');
  const [product, setProduct] = useState(null);
  const [res, setRes] = useState(null);

  useEffect(() => {
    if (!pid) return;
    axios.get(`http://localhost:5000/api/products/${pid}`).then(r => setProduct(r.data)).catch(() => setProduct(null));
  }, [pid]);

  const pay = async () => {
    if (!product) return alert('No product selected');
    const token = localStorage.getItem('token');
    // Generate a QR code client-side that includes a simple payment payload.
    // We will not call the backend API here per user request.
    const payload = {
      type: 'payment',
      productId: pid,
      amount: product.price || 0,
      seller: product.author?._id || product.author?.id || null,
      buyer: localStorage.getItem('me') ? JSON.parse(localStorage.getItem('me')).id : null,
    };
    const payloadStr = encodeURIComponent(JSON.stringify(payload));
    // Use a public QR generator service to create the image URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${payloadStr}`;
    setRes({ qrUrl, payload });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-4 bg-white rounded shadow py-16">
      <h3 className="text-xl font-bold mb-4">Purchase</h3>
      {product ? (
        <div>
          <div className="font-semibold">{product.pname}</div>
          <div className="text-sm text-gray-600 mb-4">Price: ${product.price || 0}</div>
          <button onClick={pay} className="px-4 py-2 bg-green-600 text-white rounded">Pay ${product.price || 0}</button>
        </div>
      ) : pid ? (
        <div>Loading product...</div>
      ) : (
        <div>Select a product to buy.</div>
      )}
      {res && res.qrUrl && (
        <div className="mt-4 text-center">
          <div className="mb-4 text-xl font-semibold">Scan this QR</div>
          <img src={res.qrUrl} alt="payment-qr" className="mx-auto" />
    
        </div>
      )}
    </div>
  );
}
