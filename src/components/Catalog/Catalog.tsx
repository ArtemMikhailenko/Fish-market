'use client';
import React, { useState, useEffect } from 'react';
import { products, Product } from './productsData';
import styles from './Catalog.module.css';

const Catalog: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  // List of unique product types for filtering
  const types = Array.from(new Set(products.map(p => p.type)));

  // Filter products with animation effect
  const filterProducts = (type: string) => {
    setAnimationTrigger(false);
    setTimeout(() => {
      setSelectedType(type);
      const filtered = type 
        ? products.filter(p => p.type === type)
        : products;
      setFilteredProducts(filtered);
      setAnimationTrigger(true);
    }, 100);
  };

  // Calculate discount percentage
  const calculateDiscount = (product: Product) => {
    if (product.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  return (
    <section className={styles.catalogSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Икорный Бутик</h2>
        <p className={styles.subtitle}>
          Королевский деликатес напрямую от лучших рыбаков
        </p>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterButton} ${selectedType === '' ? styles.active : ''}`}
          onClick={() => filterProducts('')}
        >
          Все виды
        </button>
        {types.map((type) => (
          <button
            key={type}
            className={`${styles.filterButton} ${selectedType === type ? styles.active : ''}`}
            onClick={() => filterProducts(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div 
        className={`
          ${styles.grid} 
          ${animationTrigger ? styles.gridAnimation : ''}
          ${filteredProducts.length === 1 ? styles.singleProductGrid : ''}
        `}
      >
        {filteredProducts.map((product: Product) => (
          <div 
            key={product.id} 
            className={`
              ${styles.card} 
              ${styles.productCard} 
              ${filteredProducts.length === 1 ? styles.singleProduct : ''}
            `}
          >
            {/* Decorative Element */}
            <div className={styles.cardDecoration}></div>

            {/* Sale Badge */}
            {product.isOnSale && (
              <div className={styles.saleBadge}>
                <span>-{calculateDiscount(product)}%</span>
                <div className={styles.badgeRibbon}></div>
              </div>
            )}

            {/* Product Image */}
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.cardImage}
              />
              <div className={styles.imageOverlay}></div>
            </div>

            {/* Product Details */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.productDescription}>
                {product.description.length > 50 
                  ? `${product.description.slice(0, 50)}...` 
                  : product.description}
              </p>
              <div className={styles.productMeta}>
                <span className={styles.productType}>
                  <i>✦</i> {product.type}
                </span>
                <span className={styles.weight}>
                  <i>⚖</i> {product.weight}
                </span>
              </div>

              {/* Price Block */}
              <div className={styles.priceBlock}>
                {product.oldPrice && (
                  <span className={styles.oldPrice}>
                    {product.oldPrice} грн
                  </span>
                )}
                <span className={styles.newPrice}>{product.price} грн</span>
              </div>

              {/* Action Buttons */}
              <div className={styles.cardActions}>
                <button className={styles.detailsButton}>
                  Детали
                </button>
                <button className={styles.cartButton}>
                  Купить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          <p>Извините, товаров этой категории пока нет</p>
          <div className={styles.emptyStateDecoration}></div>
        </div>
      )}
    </section>
  );
};

export default Catalog;