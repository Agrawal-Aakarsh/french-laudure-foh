import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import GuestDetails from './GuestDetails';
import guestData from '@/data/fine-dining-dataset.json';
import { Guest } from '@/types/types';

const GuestProfiles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const filteredGuests = useMemo(() => {
    return guestData.diners.filter(guest =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-8rem)]">
      <div className="flex h-full">
        {/* Guest List - Left Side */}
        <div className="w-80 border-r border-gray-200 h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search guests..."
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-auto flex-1">
            {filteredGuests.map((guest) => (
              <div
                key={guest.name}
                className={`p-4 border-b border-gray-200 cursor-pointer transition-colors duration-150
                  ${selectedGuest?.name === guest.name 
                    ? 'bg-purple-50 border-l-4 border-l-purple-500' 
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                onClick={() => setSelectedGuest(guest)}
              >
                <h3 className="font-medium text-gray-900">{guest.name}</h3>
                {guest.reservations[0] && (
                  <p className="text-sm text-gray-500 mt-1">
                    Next visit: {new Date(guest.reservations[0].date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guest Details - Right Side */}
        <div className="flex-1 h-full overflow-auto p-6">
          {selectedGuest ? (
            <GuestDetails guest={selectedGuest} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Select a guest to view their details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestProfiles;