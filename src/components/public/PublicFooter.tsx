import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Football<span className="text-green-400">Voice</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Unde pasiunea pentru fotbal devine cuvânt. Analize aprofundate, 
              interviuri exclusive și cele mai recente știri din lumea fotbalului.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-lg hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Link-uri Rapide</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Acasă
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Analize Meciuri
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Portrete Jucători
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Știri & Transferuri
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Predicții
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">contact@footballvoice.ro</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+40 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">București, România</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Newsletter</h5>
              <p className="text-sm text-gray-400 mb-3">
                Abonează-te pentru cele mai noi articole
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email-ul tău"
                  className="flex-1 px-3 py-2 text-gray-900 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  Abonează-te
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 FootballVoice. Toate drepturile rezervate.
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termeni și Condiții
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politica de Confidențialitate
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie-uri
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
