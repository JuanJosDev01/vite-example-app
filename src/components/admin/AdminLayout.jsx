import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';

const AdminLayout = () => {
  const { currentLanguage, toggleLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-teal-600 text-white py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {t('adminCatalog')}
            </h1>
            <button 
              onClick={toggleLanguage}
              className="bg-white hover:bg-gray-100 text-teal-600 px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              {currentLanguage === 'es' ? t('changeToNahuatl') : t('changeToSpanish')}
            </button>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
};

export default AdminLayout;
