import React, { useState, useEffect } from 'react';
import logo from './assets/logo.jpeg';
import banner from './assets/banner.jpeg';
import ad1 from './assets/ad1.jpeg';

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');
  const [adIndex, setAdIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // ✨ NEW
  const [activeCard, setActiveCard] = useState(null);
  const [pageAnim, setPageAnim] = useState(true);

  const ads = [banner, ad1];

  // 🔁 Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setAdIndex((prev) => (prev + 1) % ads.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 💾 localStorage cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if (!user) {
      setMsg('❌ لازم تسجل دخول أولاً');
      setTimeout(() => setMsg(''), 1500);
      return;
    }

    setCart([...cart, item]);
    setMsg('✔️ Added to cart');
    setTimeout(() => setMsg(''), 1200);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setMsg('🧹 Cart cleared');
    setTimeout(() => setMsg(''), 1200);
  };

  const login = () => setUser({ name: 'User' });
  const logout = () => setUser(null);

  const products = [
    {
      name: 'Berry Blast',
      price: 4,
      img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625',
      desc: 'Mixed berries smoothie',
    },
    {
      name: 'Mango Chill',
      price: 3,
      img: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4',
      desc: 'Fresh mango drink',
    },
    {
      name: 'Mojito',
      price: 4,
      img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a',
      desc: 'Refreshing lemon drink',
    },
    {
      name: 'Iced Latte',
      price: 4,
      img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096',
      desc: 'Cold coffee drink',
    },
  ];

  const categories = [
    {
      title: 'Juices',
      img: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    },
    {
      title: 'Smoothies',
      img: 'https://images.pexels.com/photos/2103949/pexels-photo-2103949.jpeg',
    },
    {
      title: 'Coffee',
      img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    },
    {
      title: 'Fresh Drinks',
      img: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    },
  ];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ✨ UPDATED CARD STYLE
  const cardStyle = (i) => ({
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(14px)',
    borderRadius: '20px',
    padding: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    transform: activeCard === i ? 'scale(0.95)' : 'scale(1)',
    opacity: activeCard === i ? 0.7 : 1,
  });

  const btn = {
    background: '#fff',
    color: '#000',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '10px',
    margin: '5px',
    cursor: 'pointer',
  };

  // ✨ PAGE WRAPPER
  const pageStyle = {
    opacity: pageAnim ? 1 : 0,
    transform: pageAnim ? 'translateY(0)' : 'translateY(15px)',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {msg && (
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '10px',
            borderRadius: '12px',
            marginBottom: '10px',
          }}
        >
          {msg}
        </div>
      )}

      <img src={logo} style={{ width: 70, borderRadius: '50%' }} />
      <h2>❄️ Frosty Drink</h2>

      {user ? (
        <div>
          👤 {user.name}
          <button style={btn} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <button style={btn} onClick={login}>
          Login
        </button>
      )}

      {/* NAV */}
      <div style={{ margin: 15 }}>
        {['home', 'categories', 'products', 'services', 'cart'].map((p) => (
          <button
            key={p}
            onClick={() => {
              setPageAnim(false);
              setTimeout(() => {
                setPage(p);
                setPageAnim(true);
              }, 150);
            }}
            style={{
              margin: 5,
              padding: '10px 14px',
              borderRadius: 12,
              border: 'none',
              background: page === p ? '#000' : '#fff',
              color: page === p ? '#fff' : '#000',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* HOME */}
      {page === 'home' && (
        <div style={pageStyle}>
          {/* العنوان */}
          <h1 style={{ fontSize: '28px', marginBottom: '5px' }}>
            Welcome to Frosty ❄️
          </h1>

          <p style={{ opacity: 0.7, marginBottom: '20px' }}>
            Best cold drinks in town 🍹
          </p>

          {/* كرت الإعلان */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
              marginBottom: '20px',
            }}
          >
            <img
              src={ads[adIndex]}
              style={{
                width: '100%',
                maxWidth: 320,
                borderRadius: 20,
                opacity: fade ? 1 : 0,
                transform: fade ? 'scale(1)' : 'scale(1.05)',
                transition: 'all 0.6s ease',
              }}
            />

            {/* overlay نص */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                color: 'white',
                background: 'rgba(0,0,0,0.4)',
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '14px',
              }}
            >
              Special Offer 🔥
            </div>
          </div>

          {/* زر تصفح المنتجات */}
          <button
            onClick={() => {
              setPageAnim(false);
              setTimeout(() => {
                setPage('products');
                setPageAnim(true);
              }, 150);
            }}
            style={{
              background: '#fff',
              color: '#000',
              padding: '12px 20px',
              borderRadius: '15px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = 'scale(0.95)')
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Browse Drinks 🍹
          </button>
        </div>
      )}

      {/* CATEGORIES */}
      {page === 'categories' && (
        <div style={pageStyle}>
          <h2>Categories</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: 15,
            }}
          >
            {categories.map((c, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveCard(i);
                  setTimeout(() => setActiveCard(null), 150);
                }}
                style={cardStyle(i)}
              >
                <img src={c.img} style={{ width: '100%', borderRadius: 15 }} />
                <h4>{c.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {page === 'products' && (
        <div style={pageStyle}>
          <h2>Products</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: 15,
            }}
          >
            {products.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveCard(i);
                  setTimeout(() => setActiveCard(null), 150);
                }}
                style={cardStyle(i)}
              >
                <img
                  src={item.img}
                  onClick={() => addToCart(item)}
                  style={{
                    width: '100%',
                    borderRadius: 15,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = 'scale(0.95)')
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                />
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <b>{item.price} OMR</b>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES */}
      {page === 'services' && (
        <div style={pageStyle}>
          <h2>Services 🛠️</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: 15,
            }}
          >
            {['Delivery', 'Payment', 'Cold Storage', 'Quality'].map((s, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveCard(i);
                  setTimeout(() => setActiveCard(null), 150);
                }}
                style={cardStyle(i)}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CART */}
      {page === 'cart' && (
        <div style={pageStyle}>
          <h2>Cart 🛒</h2>
          <h3>Total: {total} OMR</h3>

          <button style={btn} onClick={clearCart}>
            Clear Cart
          </button>

          {cart.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveCard(i);
                setTimeout(() => setActiveCard(null), 150);
              }}
              style={cardStyle(i)}
            >
              {item.name} - {item.price} OMR
              <button style={btn} onClick={() => removeFromCart(i)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
