import ProductCard from '@/components/Card/ProductCard'; // Ürün kartı bileşeni import edildi
import CategoryMenu from '@/components/CategoryMenu'; // Kategori menüsü bileşeni import edildi
import LoadingSpinner from '@/components/LoadingUi/LoadingSpinner'; // Yükleme spinner bileşeni import edildi
import Search from '@/components/Search'; // Arama bileşeni import edildi
import axios from 'axios'; // Axios kütüphanesi import edildi
import { useEffect, useState } from 'react'; // React'tan useState hook'u import edildi
import useSWR from 'swr'; // SWR kütüphanesi import edildi

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(); // Seçili kategori state'i
  const [search, setSearch] = useState(); // Seçili search state'i
  const [data, setData] = useState(null); // Veri state'i
  const [error, setError] = useState(null); // Hata state'i
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu state'i

  // Kategori seçimini dinleyen fonksiyon
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Search değişimini dinleyen fonksiyon
  const handleSearchChange = (search) => {
    setSearch(search);
  };

  // Veriyi getiren fetcher fonksiyonu
  const fetchData = async () => {
    try {
      setIsLoading(true); // Yükleme başlatılır

      let url = 'https://dummyjson.com/products';
      if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}`;
      }
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}`;
        console.log(url, 'url');
      }

      const response = await axios.get(url); // Axios ile URL üzerinden veri getirilir

      console.log(response.data, 'asdasd');
      setData(response.data); // Veri state'ine atanır
      setError(null); // Hata state'i temizlenir
    } catch (error) {
      console.error('Error fetching data:>>>>>>>>>>>>>>>>>>>', error);
      setError(error); // Hata state'ine hata atanır
    } finally {
      setIsLoading(false); // Yükleme durumu kapatılır
    }
  };

  // Component yüklendiğinde ve selectedCategory değiştiğinde veri yeniden getirilir
  useEffect(() => {
    fetchData();
  }, [selectedCategory, search]);

  return (
    <div className={'flex   mx-auto p-4  flex-col items-center justify-center'}>
      <Search onSearchSelect={handleSearchChange}></Search> {/* Arama bileşeni, kategori seçimini dinler */}
      <div className='flex flex-row  space-x-5  '>
        <div className='max-lg:hidden   '>
          {/* Kategori menüsü, kategori seçimini dinler */}
          <CategoryMenu lenght={data?.total} onCategorySelect={handleCategoryChange}></CategoryMenu>
        </div>

        {/* Yükleme durumuna göre içerik gösterilir */}
        {isLoading ? (
          <div className=' max-w-3xl   mx-auto flex justify-center md:px-96 md:pt-12  '>
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : (
          <div className=' grid grid-cols-3 gap-8 max-w-7xl max-md:w-screen   max-md:flex max-md:flex-col   place-items-start'>
            {/* Veriler map edilerek ürün kartları oluşturulur */}
            {data.products.length == 0 ? <div className='w-56'></div> : null}
            {data?.products?.map((data, key) => {
              return <ProductCard key={key} data={data}></ProductCard>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
