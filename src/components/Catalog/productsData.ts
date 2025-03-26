// productsData.ts

export interface Product {
    id: number;
    title: string;
    type: string;       // Например, "горбуша", "лосось", "кета" и т.д.
    weight: string;     // вес нетто
    price: number;      // текущая цена
    oldPrice?: number;  // старая цена, если есть акция
    image: string;      // ссылка на картинку
    description: string; 
    isOnSale?: boolean; // признак акции
  }
  
  export const products: Product[] = [
    {
      id: 1,
      title: 'Икра горбуши',
      type: 'горбуша',
      weight: '0.45 кг',
      price: 800,
      oldPrice: 899,
      image: '/image/catalog/ct1.webp',
      description: 'Состав: икра горбуши, соль, олия. Классический нежный вкус.',
      isOnSale: true,
    },
    {
      id: 2,
      title: 'Икра лосося',
      type: 'лосось',
      weight: '0.45 кг',
      price: 900,
      oldPrice: 1025,
      image: '/image/catalog/ct2.webp',
      description: 'Состав: икра лосося, соль, олия. Умеренно солёная, очень свежая.',
      isOnSale: true,
    },
    {
      id: 3,
      title: 'Икра кеты',
      type: 'кета',
      weight: '0.45 кг',
      price: 749,
      image: '/image/catalog/ct3.webp',
      description: 'Состав: икра кеты, соль, олия. Ярко-оранжевые зерна, отличный вкус.',
      isOnSale: false,
    },
    {
      id: 4,
      title: 'Икра форели',
      type: 'форель',
      weight: '0.45 кг',
      price: 1100,
      oldPrice: 1199,
      image: '/image/catalog/ct4.webp',
      description: 'Состав: икра форели, соль, олия. Насыщенный вкус, мелкие зёрна.',
      isOnSale: true,
    },
  ];
  