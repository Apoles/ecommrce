import CartItem from '@/components/Basket/BasketCard';
import Summary from '@/components/Basket/Summary';
import { useState } from 'react';

const CartPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Kulaklık',
      description: 'dolar ipsum',
      image: '/bir.jpg',
      price: 100,
      quantity: 1,
    },
    {
      id: 1,
      title: 'Ürün 1',
      description: 'Bu bir ürün açıklamasıdır.',
      image: '/iki.jpg',
      price: 100,
      quantity: 1,
    },
    {
      id: 1,
      title: 'Ürün 1',
      description: 'Bu bir ürün açıklamasıdır.',
      image: '/favicon.ico',
      price: 100,
      quantity: 1,
    },
  ]);

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleIncrement = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const handleDecrement = (id) => {
    setItems(
      items.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    );
  };

  return (
    <div className='flex flex-col lg:flex-row gap-8 lg:p-32 max-lg:p-8 lg:mx-24  '>
      <div className='flex-1 space-y-6    '>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={() => handleRemove(item.id)}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        ))}
      </div>
      <div className='w-full lg:w-1/3'>
        <Summary items={items} />
      </div>
    </div>
  );
};

export default CartPage;
