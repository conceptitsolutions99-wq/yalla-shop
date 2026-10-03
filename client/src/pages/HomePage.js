import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProducts, getStores, getCategories } from '../api';
import ProductCard from '../components/ProductCard';
import StoreCard from '../components/StoreCard';
import CategoryCard from '../components/CategoryCard';

const heroBanners = [
  'https://via.placeholder.com/750x200?text=Fresh+Deals+This+Week',
  'https://via.placeholder.com/750x200?text=Free+Delivery+on+Orders+Over+$30',
  'https://via.placeholder.com/750x200?text=New+Store+Opening',
];

const HomePage = () => {
  const { addItem } = useCart();
  const [bannerIdx, setBannerIdx] = useState(0);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, storeRes, prodRes] = await Promise.all([
          getCategories(),
          getStores({ featured: 'true' }),
          getProducts({ featured: 'true' }),
        ]);
        const allCats = (catRes.categories || []);
        const parents = [...new Set(allCats.map(c => c.parentCategory))];
        setCategories(parents.map(p => ({ key: p, label: p })));
        setStores(storeRes.stores || []);
        setFeaturedProducts(prodRes.products || []);
      } catch (e) {
        console.error('Home load error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
    const t = setInterval(() => setBannerIdx(i => (i + 1) % heroBanners.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (loading) {
    return <div className="page"><div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF' }}>Loading...</div></div>;
  }

  return (
    <div className="page">
      {/* Hero banner */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        {heroBanners.map((src, i) => (
          <img key={i} src={src} alt="banner" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', opacity: i === bannerIdx ? 1 : 0, transition: 'opacity 0.5s' }} />
        ))}
      </div>

      {/* Main Categories */}
      <section style={{ padding: '16px' }}>
        <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Main Categories</h3>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
          {categories.map(c => <CategoryCard key={c.key} category={c} />)}
        </div>
      </section>

      {/* Featured Stores */}
      <section style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ fontWeight: 700 }}>Featured Stores</h3>
          <Link to="/menu" style={{ color: 'var(--primary)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            See All <ChevronRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 12, paddingBottom: 8 }}>
          {stores.map(s => <StoreCard key={s._id} store={s} />)}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '0 16px', marginBottom: 80 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Special Offer</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {featuredProducts.map(p => (
            <div key={p._id} onClick={() => addItem(p)} style={{ cursor: 'pointer' }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
