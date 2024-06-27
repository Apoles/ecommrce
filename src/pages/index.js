import ProductCard from '@/components/Card/ProductCard'; // Ürün kartı bileşeni import edildi
import CategoryMenu from '@/components/CategoryMenu'; // Kategori menüsü bileşeni import edildi
import LoadingSpinner from '@/components/LoadingUi/LoadingSpinner'; // Yükleme spinner bileşeni import edildi
import Search from '@/components/Search'; // Arama bileşeni import edildi
import axios from 'axios'; // Axios kütüphanesi import edildi
import { useState } from 'react'; // React'tan useState hook'u import edildi
import useSWR from 'swr'; // SWR kütüphanesi import edildi

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(); // Seçili kategori state'i

  // Kategori seçimini dinleyen fonksiyon
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Veriyi getiren fetcher fonksiyonu
  const fetcher = async (url) => {
    const response = await axios.get(url); // Axios ile URL üzerinden veri getirilir
    return response.data; // Veri döndürülür
  };

  // SWR hook'u kullanılarak veri, hata ve yükleme durumu izlenir
  const { data, error, isLoading } = useSWR(
    selectedCategory == undefined
      ? [`https://dummyjson.com/products`] // Eğer kategori seçili değilse tüm ürünler getirilir
      : [`https://dummyjson.com/products/category/${selectedCategory}`], // Seçili kategoriye göre ürünler getirilir
    fetcher, // Fetcher fonksiyonu
    {
      refreshInterval: 360000, // 360000 ms (6 dakika) aralıklarla yenileme yapılır
    }
  );

  return (
    <div className={'flex   mx-auto p-4  flex-col items-center justify-center'}>
      <Search onCategorySelect={handleCategoryChange}></Search> {/* Arama bileşeni, kategori seçimini dinler */}
      <div className='flex flex-row  space-x-5  '>
        <div className='max-lg:hidden  '>
          {/* Kategori menüsü, kategori seçimini dinler */}
          <CategoryMenu lenght={data?.total} onCategorySelect={handleCategoryChange}></CategoryMenu>
        </div>

        {/* Yükleme durumuna göre içerik gösterilir */}
        {isLoading ? (
          <div className=' max-w-3xl   mx-auto flex justify-center px-96 pt-12  '>
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : (
          <div className=' grid grid-cols-3 gap-8 max-w-7xl  max-md:w-screen   max-md:flex max-md:flex-col   place-items-center'>
            {/* Veriler map edilerek ürün kartları oluşturulur */}
            {data?.products?.map((data, key) => {
              return <ProductCard key={key} data={data}></ProductCard>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
