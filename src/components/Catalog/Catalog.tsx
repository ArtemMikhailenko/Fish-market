'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Catalog.module.css';

/** Интерфейс, соответствующий данным, приходящим с бэкенда */
interface Product {
  _id?: string;
  id?: number;
  title: string;
  type?: string;
  saleBadge?: string;
  netWeight?: string;
  price: number;
  oldPrice?: number;
  composition?: string;
  packaging?: string;
  color?: string;
  dimension?: string;
  consistency?: string;
  shelfLife?: string;
  description?: string;
  isOnSale?: boolean;
  image?: string;
  weight?: string;
}

// Extracts fish type from title (e.g., "Икра горбуши" → "горбуши")
const extractFishType = (title: string): string => {
  const parts = title.split(' ');
  if (parts.length > 1 && parts[0] === 'Икра') {
    return parts[1];
  }
  return '';
};

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [fishTypes, setFishTypes] = useState<string[]>([]);
  const [selectedFishType, setSelectedFishType] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({ min: 0, max: 5000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 5000]);
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSaleOnly, setShowSaleOnly] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [currentProductView, setCurrentProductView] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const rangeInputRef = useRef<HTMLInputElement>(null);
  
  /** Загружаем товары с бэкенда при монтировании */
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('https://api.ikraluxe.ru/products');
        const data = await res.json();
        
        // Process data to add type field based on title
        const processedData = data.map((product: Product) => ({
          ...product,
          type: product.type || extractFishType(product.title)
        }));
        
        setProducts(processedData);
        setFilteredProducts(processedData);
        
        // Extract unique fish types
        const types = Array.from(new Set(processedData.map((p: Product) => p.type))).filter(Boolean);
        setFishTypes(types as any);
        
        // Set price range based on products
        const prices = processedData.map((p: Product) => p.price);
        setPriceRange({
          min: Math.min(...prices),
          max: Math.max(...prices)
        });
        setSelectedPriceRange([Math.min(...prices), Math.max(...prices)]);
        
        // Trigger animation
        setTimeout(() => {
          setAnimationTrigger(true);
        }, 100);
        
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        
        // Fallback to static data if fetch fails
        const staticData: string | any[] | ((prevState: Product[]) => Product[]) = [
          // Add your fallback data here if needed
        ];
        
        if (staticData.length) {
          setProducts(staticData);
          setFilteredProducts(staticData);
        }
      }
    }
    
    loadProducts();
  }, []);

  // Apply all filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedFishType, selectedPriceRange, showSaleOnly, sortOrder, searchQuery, products]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
        setCurrentProductView(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Properly handle body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Apply all filters to products
  const applyFilters = () => {
    setAnimationTrigger(false);
    
    let result = [...products];
    
    // Apply fish type filter
    if (selectedFishType) {
      result = result.filter(p => p.type === selectedFishType);
    }
    
    // Apply price range filter
    result = result.filter(p => 
      p.price >= selectedPriceRange[0] && 
      p.price <= selectedPriceRange[1]
    );
    
    // Apply sale only filter
    if (showSaleOnly) {
      result = result.filter(p => p.oldPrice || p.isOnSale || p.saleBadge);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.type && p.type.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sortOrder === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'discountDesc') {
      result.sort((a, b) => {
        const discountA = a.oldPrice ? a.oldPrice - a.price : 0;
        const discountB = b.oldPrice ? b.oldPrice - b.price : 0;
        return discountB - discountA;
      });
    }
    
    setFilteredProducts(result);
    
    // Re-trigger animation
    setTimeout(() => {
      setAnimationTrigger(true);
    }, 100);
  };

  // Handler for fish type filter
  const handleFishTypeChange = (type: string) => {
    setSelectedFishType(type === selectedFishType ? '' : type);
  };

  // Handler for price range filter
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const index = parseInt(e.target.dataset.index || '0');
    
    const newRange = [...selectedPriceRange];
    newRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setSelectedPriceRange(newRange);
  };

  // Handler for view product details
  const handleViewDetails = (productId: string) => {
    setCurrentProductView(productId);
    setIsModalOpen(true);
  };

  // Calculate discount percentage
  const calculateDiscount = (product: Product) => {
    if (product.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  // Get current product for modal view
  const getCurrentProduct = () => {
    //@ts-ignore
    return products.find(p => p._id === currentProductView || p.id === currentProductView);
  };

  return (
    <section className={styles.catalogSection} id='assortment'>
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorCircle3}></div>
      
      <div className={styles.catalogContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Икорный Бутик</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Королевский деликатес напрямую от лучших рыбаков
          </p>
        </div>

        <div className={styles.catalogContent}>
          {/* Filters sidebar */}
          <aside className={`${styles.filterSidebar} ${isFiltersOpen ? styles.filterSidebarOpen : ''}`}>
            <div className={styles.filterSidebarHeader}>
              <h3>Фильтры</h3>
              <button 
                className={styles.closeFiltersButton}
                onClick={() => setIsFiltersOpen(false)}
                aria-label="Закрыть фильтры"
              >
                ×
              </button>
            </div>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Поиск</h4>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск икры..."
                  className={styles.searchInput}
                />
                <span className={styles.searchIcon}>🔍</span>
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Сортировка</h4>
              <div className={styles.sortOptions}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sort"
                    value="default"
                    checked={sortOrder === 'default'}
                    onChange={() => setSortOrder('default')}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioButton}></span>
                  По умолчанию
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sort"
                    value="priceAsc"
                    checked={sortOrder === 'priceAsc'}
                    onChange={() => setSortOrder('priceAsc')}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioButton}></span>
                  Сначала дешевле
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sort"
                    value="priceDesc"
                    checked={sortOrder === 'priceDesc'}
                    onChange={() => setSortOrder('priceDesc')}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioButton}></span>
                  Сначала дороже
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sort"
                    value="discountDesc"
                    checked={sortOrder === 'discountDesc'}
                    onChange={() => setSortOrder('discountDesc')}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioButton}></span>
                  По размеру скидки
                </label>
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Тип икры</h4>
              <div className={styles.fishTypeOptions}>
                {fishTypes.map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedFishType === type}
                      onChange={() => handleFishTypeChange(type)}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.customCheckbox}></span>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Цена</h4>
              <div className={styles.priceRangeWrapper}>
                <div className={styles.rangeInputs}>
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={selectedPriceRange[0]}
                    onChange={handlePriceRangeChange}
                    data-index="0"
                    className={styles.rangeInput}
                    ref={rangeInputRef}
                  />
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={selectedPriceRange[1]}
                    onChange={handlePriceRangeChange}
                    data-index="1"
                    className={styles.rangeInput}
                  />
                </div>
                <div className={styles.priceRangeValues}>
                  <span>{selectedPriceRange[0]} ₽</span>
                  <span>{selectedPriceRange[1]} ₽</span>
                </div>
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <label className={styles.saleOnlyLabel}>
                <input
                  type="checkbox"
                  checked={showSaleOnly}
                  onChange={() => setShowSaleOnly(!showSaleOnly)}
                  className={styles.checkboxInput}
                />
                <span className={styles.customCheckbox}></span>
                Только со скидкой
              </label>
            </div>
            
            <button className={styles.resetFiltersButton} onClick={() => {
              setSelectedFishType('');
              setSelectedPriceRange([priceRange.min, priceRange.max]);
              setShowSaleOnly(false);
              setSortOrder('default');
              setSearchQuery('');
            }}>
              Сбросить фильтры
            </button>
          </aside>

          {/* Main content area */}
          <div className={styles.productsArea}>
            <div className={styles.productControlBar}>
              <div className={styles.resultsInfo}>
                Найдено: <span>{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'товар' : 
                  filteredProducts.length > 1 && filteredProducts.length < 5 ? 'товара' : 'товаров'}
              </div>
              
              <div className={styles.mobileControls}>
                <button 
                  className={styles.filtersToggleButton}
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  <span className={styles.filterIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                    </svg>
                  </span>
                  Фильтры
                </button>
              </div>
            </div>

            {/* Grid of products */}
            <div
              className={`
                ${styles.productGrid} 
                ${animationTrigger ? styles.gridAnimation : ''}
                ${filteredProducts.length === 1 ? styles.singleProductGrid : ''}
              `}
            >
              {filteredProducts.map((product) => {
                // Определим ключ (если у бэкенда _id, используем _id)
                const productKey = product._id || product.id || product.title;
                
                return (
                  <div
                    key={productKey}
                    className={`
                      ${styles.productCard} 
                      ${filteredProducts.length === 1 ? styles.singleProduct : ''}
                    `}
                  >
                    {/* Card decoration */}
                    <div className={styles.cardDecoration}></div>
                    
                    {/* Sale badge */}
                    {(product.oldPrice || product.isOnSale || product.saleBadge) && (
                      <div className={styles.saleBadge}>
                        {product.saleBadge || `−${calculateDiscount(product)}%`}
                      </div>
                    )}
                    
                    {/* Image */}
                    <div className={styles.imageContainer}>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className={styles.productImage}
                          loading="lazy"
                        />
                      ) : (
                        <div className={styles.noImage}>Нет фото</div>
                      )}
                      <div className={styles.imageOverlay}></div>
                    </div>
                    
                    {/* Content */}
                    <div className={styles.productContent}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      
                      <div className={styles.productMeta}>
                        {product.type && (
                          <span className={styles.productType}>
                            <span className={styles.metaIcon}>✦</span> {product.type}
                          </span>
                        )}
                        {(product.weight || product.netWeight) && (
                          <span className={styles.productWeight}>
                            <span className={styles.metaIcon}>⚖</span> {product.weight || product.netWeight}
                          </span>
                        )}
                      </div>
                      
                      {/* Price block */}
                      <div className={styles.priceBlock}>
                        {product.oldPrice && (
                          <span className={styles.oldPrice}>
                            {product.oldPrice} ₽
                          </span>
                        )}
                        <span className={styles.currentPrice}>{product.price} ₽</span>
                      </div>
                      
                      {/* Buttons */}
                      <div className={styles.productActions}>
                        <button 
                          className={styles.detailsButton}
                          onClick={() => handleViewDetails(product._id || product.id?.toString() || '')}
                        >
                          Детали
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
                <h3 className={styles.emptyStateTitle}>Ничего не найдено</h3>
                <p className={styles.emptyStateText}>
                  К сожалению, товары по вашему запросу не найдены. Попробуйте изменить параметры фильтрации.
                </p>
                <button 
                  className={styles.resetFiltersButton} 
                  onClick={() => {
                    setSelectedFishType('');
                    setSelectedPriceRange([priceRange.min, priceRange.max]);
                    setShowSaleOnly(false);
                    setSortOrder('default');
                    setSearchQuery('');
                  }}
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {isModalOpen && getCurrentProduct() && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} ref={modalRef}>
            <button 
              className={styles.modalCloseButton}
              onClick={() => {
                setIsModalOpen(false);
                setCurrentProductView(null);
              }}
            >
              ×
            </button>
            
            <div className={styles.modalProductView}>
              <div className={styles.modalProductImage}>
                <img 
                  src={getCurrentProduct()?.image} 
                  alt={getCurrentProduct()?.title} 
                />
                {(getCurrentProduct()?.oldPrice || getCurrentProduct()?.isOnSale || getCurrentProduct()?.saleBadge) && (
                  <div className={styles.modalSaleBadge}>
                    {getCurrentProduct()?.saleBadge || `−${calculateDiscount(getCurrentProduct() as Product)}%`}
                  </div>
                )}
              </div>
              
              <div className={styles.modalProductInfo}>
                <h2 className={styles.modalProductTitle}>{getCurrentProduct()?.title}</h2>
                
                <div className={styles.modalProductMeta}>
                  {getCurrentProduct()?.type && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Тип:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.type}</span>
                    </div>
                  )}
                  
                  {(getCurrentProduct()?.weight || getCurrentProduct()?.netWeight) && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Вес:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.weight || getCurrentProduct()?.netWeight}</span>
                    </div>
                  )}
                  
                  {getCurrentProduct()?.composition && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Состав:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.composition?.replace('Состав: ', '')}</span>
                    </div>
                  )}
                  
                  {getCurrentProduct()?.packaging && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Упаковка:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.packaging?.replace('Тара: ', '')}</span>
                    </div>
                  )}
                  
                  {getCurrentProduct()?.color && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Цвет:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.color?.replace('Цвет: ', '')}</span>
                    </div>
                  )}
                  
                  {getCurrentProduct()?.dimension && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Размер:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.dimension?.replace('Размер икринок: ', '')}</span>
                    </div>
                  )}
                  
                  {getCurrentProduct()?.consistency && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Консистенция:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.consistency?.replace('Консистенция: ', '')}</span>
                    </div>
                  )}
                  
                  {getCurrentProduct()?.shelfLife && (
                    <div className={styles.modalMetaItem}>
                      <span className={styles.modalMetaLabel}>Срок годности:</span>
                      <span className={styles.modalMetaValue}>{getCurrentProduct()?.shelfLife?.replace('Срок годности: ', '')}</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.modalPriceBlock}>
                  {getCurrentProduct()?.oldPrice && (
                    <span className={styles.modalOldPrice}>
                      {getCurrentProduct()?.oldPrice} ₽
                    </span>
                  )}
                  <span className={styles.modalCurrentPrice}>{getCurrentProduct()?.price} ₽</span>
                </div>
                
                <div className={styles.modalActions}>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalog;