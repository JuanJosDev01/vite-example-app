import { Fragment, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { LuFilter, LuGalleryHorizontal } from "react-icons/lu";
import { ModalComponent } from "../components/Modal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { hongosAPI } from './admin/api';
import { useLanguage } from '../context/LanguageContext';


export const Lista = () => {
  const { currentLanguage, toggleLanguage, t } = useLanguage();
  const [hongos, setHongos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  
  const fetchHongos = async () => {
    try {
      const response = await hongosAPI.getAll();
      setHongos(response || []);
    } catch (error) {
      console.error("Error fetching hongos:", error);
    }
  };

  useEffect(() => {
    fetchHongos();
  }, []);

  return (
    <Fragment>
      <header className="bg-green-600 w-full h-20 flex items-center justify-between px-6">
        <h1 className="text-3xl font-bold text-white" id="prueba">
          {t('catalog')}
        </h1>
        <button 
          onClick={toggleLanguage}
          className="bg-white hover:bg-gray-100 text-green-600 px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          {currentLanguage === 'es' ? t('changeToNahuatl') : t('changeToSpanish')}
        </button>
      </header>

      <main className="bg-gray-100 w-full min-h-screen">
        {/* Barra de filtros */}
        <form className="flex gap-2 justify-center items-center pt-4">
          <input
            type="text"
            placeholder={t('search')}
            className="rounded-lg p-2 border border-gray-300 bg-white"
          />
          <select className="rounded-lg p-2 border border-gray-300 bg-white">
            <option value="">{t('allTypes')}</option>
            <option value="comestible">{t('edible')}</option>
            <option value="incomestible">{t('inedible')}</option>
          </select>
          <select className="rounded-lg p-2 border border-gray-300 bg-white">
            <option value="">{t('all')}</option>
            <option value="vivo">{t('living')}</option>
            <option value="muerto">{t('dead')}</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-green-600 text-white p-2 cursor-pointer flex items-center gap-1"
          >
            <LuFilter />
            {t('filter')}
          </button>
        </form>

        {/* Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 place-items-center justify-items-center max-w-5xl mx-auto">
          {hongos.map((hongo) => (
            <Card
              key={hongo.id_hongo}
              hongo={hongo}
              id_hongo={hongo.id_hongo}
            />
          ))}
        </section>
      </main>
      <ModalComponent isOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          ...
        </Swiper>
      </ModalComponent>
    </Fragment>
  );
};
