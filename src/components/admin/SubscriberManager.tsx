import React, { useState, useEffect } from 'react';
import { Users, Mail, Filter, Search, UserCheck, UserX } from 'lucide-react';
import { Subscriber } from '../../types';

const SubscriberManager: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    // Load subscribers from localStorage
    const savedSubscribers = localStorage.getItem('footballvoice-subscribers');
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers));
    }
  }, []);

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && subscriber.active) ||
                         (statusFilter === 'inactive' && !subscriber.active);
    
    return matchesSearch && matchesStatus;
  });

  const toggleSubscriberStatus = (id: string) => {
    const updatedSubscribers = subscribers.map(sub =>
      sub.id === id ? { ...sub, active: !sub.active } : sub
    );
    setSubscribers(updatedSubscribers);
    localStorage.setItem('footballvoice-subscribers', JSON.stringify(updatedSubscribers));
  };

  const deleteSubscriber = (id: string) => {
    const updatedSubscribers = subscribers.filter(sub => sub.id !== id);
    setSubscribers(updatedSubscribers);
    localStorage.setItem('footballvoice-subscribers', JSON.stringify(updatedSubscribers));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestionare Abonați</h1>
          <p className="text-gray-600 mt-1">
            {subscribers.length} abonați înregistrați
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Abonați</p>
              <p className="text-2xl font-bold text-gray-800">{subscribers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activi</p>
              <p className="text-2xl font-bold text-gray-800">
                {subscribers.filter(s => s.active).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactivi</p>
              <p className="text-2xl font-bold text-gray-800">
                {subscribers.filter(s => !s.active).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Caută abonați..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toți</option>
              <option value="active">Activi</option>
              <option value="inactive">Inactivi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nu există abonați</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Nu s-au găsit abonați care să corespundă căutării.' : 'Încă nu aveți abonați.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abonat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Abonării
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frecvența
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscribers.map(subscriber => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {subscriber.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subscriber.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscriber.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.active ? 'Activ' : 'Inactiv'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.subscribedAt).toLocaleDateString('ro-RO')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscriber.preferences.frequency === 'daily' ? 'Zilnic' :
                       subscriber.preferences.frequency === 'weekly' ? 'Săptămânal' : 'Lunar'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => toggleSubscriberStatus(subscriber.id)}
                        className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium ${
                          subscriber.active
                            ? 'text-red-700 bg-red-100 hover:bg-red-200'
                            : 'text-green-700 bg-green-100 hover:bg-green-200'
                        }`}
                      >
                        {subscriber.active ? 'Dezactivează' : 'Activează'}
                      </button>
                      <button
                        onClick={() => deleteSubscriber(subscriber.id)}
                        className="inline-flex items-center px-3 py-1 rounded text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        Șterge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriberManager;
