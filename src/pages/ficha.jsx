import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Map } from "../components/Map";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { hongosAPI, imagenesAPI } from './admin/api';
import { useLanguage } from '../context/LanguageContext';

export const Ficha = () => {
    const { id } = useParams();
    const { currentLanguage, toggleLanguage, getFieldByLanguage, t } = useLanguage();
    const [activeTab, setActiveTab] = useState("descripcion");
    const [hongo, setHongo] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getHongo = async () => {
            try {
                setLoading(true);
                // Obtener datos del hongo usando la API
                const response = await hongosAPI.getById(id);
                console.log(response);
                setHongo(response);
                
                // Obtener imágenes del hongo usando la API
                try {
                    const imagenesResponse = await imagenesAPI.getByHongoId(id);
                    setImagenes(imagenesResponse?.map(imagen => imagen.url_imagen) || []);
                } catch (imageError) {
                    console.error('Error al cargar imágenes:', imageError);
                    setImagenes([]);
                }
                
                setError(null);
            } catch (err) {
                console.error('Error al obtener el hongo:', err);
                setError('Error al cargar la información del hongo');
            } finally {
                setLoading(false);
            }
        }
        getHongo()
    }, [id]);

    // Estados de carga y error
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-xl text-gray-600 mt-4">{t('loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-red-600 mb-4">{t('error')}</p>
                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                    >
                        {t('backToCatalog')}
                    </Link>
                </div>
            </div>
        );
    }

    if (!hongo) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">{t('notFound')}</p>
                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                    >
                        {t('backToCatalog')}
                    </Link>
                </div>
            </div>
        );
    }

    // Función helper para mostrar contenido o mensaje por defecto
    const renderContent = (content, defaultMessage = null) => {
        return content && content.trim() ? content : (defaultMessage || t('noInfo'));
    };

    const tabs = [
        { key: 'descripcion', label: t('tabs.descripcion') },
        { key: 'usos', label: t('tabs.usos') },
        { key: 'tecnicas', label: t('tabs.tecnicas') },
        { key: 'cultivo', label: t('tabs.cultivo') },
        { key: 'conservacion', label: t('tabs.conservacion') },
        { key: 'ritualidad', label: t('tabs.ritualidad') },
        { key: 'significado', label: t('tabs.significado') }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Verde */}
            <header className="bg-green-600 text-white p-4">
                <h1 className="text-2xl font-bold text-center">
                    {getFieldByLanguage(hongo, 'nombre')} - {t('professionalCard')}
                </h1>

                {/* Botones de navegación */}
                <div className="flex gap-2 mt-4 justify-start">
                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                        {t('backToCatalog')}
                    </Link>
                    <button 
                        onClick={toggleLanguage}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                        {currentLanguage === 'es' ? t('changeToNahuatl') : t('changeToSpanish')}
                    </button>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="max-w-4xl mx-auto p-4">
                {/* Imágenes del Hongo */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    {imagenes.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            className="mySwiper"
                        >
                            {imagenes.map((imagen, index) => (
                                <SwiperSlide key={imagen || index}>
                                    <img
                                        src={imagen}
                                        alt={`${hongo.nombre_es} - Imagen ${index + 1}`}
                                        className="w-full max-w-2xl mx-auto h-80 object-cover rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-gray-400 text-6xl mb-4">🍄</div>
                            <p className="text-gray-500">{t('noImages')}</p>
                        </div>
                    )}
                </div>

                {/* Nombre y Etiqueta */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {getFieldByLanguage(hongo, 'nombre')}
                            </h2>
                            {currentLanguage === 'es' && hongo.nombre_nah && (
                                <p className="text-lg text-gray-600 italic mt-1">
                                    ({hongo.nombre_nah})
                                </p>
                            )}
                            {currentLanguage === 'nah' && hongo.nombre_es && (
                                <p className="text-lg text-gray-600 italic mt-1">
                                    ({hongo.nombre_es})
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {hongo.comestible === 1 ? (
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {t('edible')}
                                </span>
                            ) : (
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {t('notEdible')}
                                </span>
                            )}
                            {hongo.tipo === "1" && (
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {t('cultivated')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pestañas */}
                <div className="bg-white rounded-lg shadow-md">
                    {/* Navegación de pestañas */}
                    <div className="border-b border-gray-200">
                        <nav className="flex flex-wrap">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                                        ? 'border-green-600 text-green-600 bg-green-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Contenido de la pestaña activa */}
                    <div className="p-6">
                        <div className="text-gray-700 leading-relaxed">
                            {activeTab === 'descripcion' && (
                                <p>{renderContent(getFieldByLanguage(hongo, 'descripcion'))}</p>
                            )}
                            {activeTab === 'usos' && (
                                <p>{renderContent(getFieldByLanguage(hongo, 'usos'))}</p>
                            )}
                            {activeTab === 'tecnicas' && (
                                <p>{renderContent(getFieldByLanguage(hongo, 'tecnicas_recoleccion'))}</p>
                            )}
                            {activeTab === 'cultivo' && (
                                <p>{renderContent(getFieldByLanguage(hongo, 'cultivo'))}</p>
                            )}
                            {activeTab === 'conservacion' && (
                                <p>{renderContent(getFieldByLanguage(hongo, 'conservacion'))}</p>
                            )}
                            {activeTab === 'ritualidad' && (
                                <p>{renderContent(getFieldByLanguage(hongo, 'ritualidad'))}</p>
                            )}
                            {activeTab === 'significado' && (
                                <p>{renderContent(getFieldByLanguage(hongo, 'significado_local'))}</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="flex items-center justify-center my-4">
                    <div>
                        <h3 className="font-bold text-2xl mb-2" >{t('mushroomLocation')}</h3>
                        <Map position={[
                            hongo.lat_coord || 19.4326,
                            hongo.long_coord || -99.1332
                        ]} />
                    </div>
                </div>
            </main>
        </div>
    );
};