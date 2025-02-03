import React from 'react';
import { Search } from 'lucide-react';
import { Guest } from '@/types/types';

interface GuestListProps {
  guests: Guest[];
  selectedGuest: Guest | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectGuest: (guest: Guest) => void;
}

const GuestList: React.FC<GuestListProps> = ({
  guests,
  selectedGuest,
  searchQuery,
  onSearchChange,
  onSelectGuest,
}) => {
  const sortedGuests = [...guests].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-80 border-r h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search guests..."
            className="pl-8 pr-4 py-2 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-auto h-[calc(100vh-10rem)]">
        {sortedGuests.map((guest) => (
          <div
            key={guest.name}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              selectedGuest?.name === guest.name ? 'bg-gray-100' : ''
            }`}
            onClick={() => onSelectGuest(guest)}
          >
            <h3 className="font-medium">{guest.name}</h3>
            {guest.reservations[0] && (
              <p className="text-sm text-gray-500">
                Next visit: {new Date(guest.reservations[0].date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestList;