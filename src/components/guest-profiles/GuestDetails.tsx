import React from 'react';
import { Card } from '@/components/ui/card';
import DietaryTags from './shared/DietaryTags';
import { Guest, Review, Order, Email } from '@/types/types';

interface GuestDetailsProps {
  guest: Guest;
}

const GuestDetails: React.FC<GuestDetailsProps> = ({ guest }) => {
  const getFrenchLaudureReviews = (reviews: Review[]) => {
    return reviews.filter(review => review.restaurant_name === 'French Laudure');
  };

  return (
    <div className="flex-1 p-6 overflow-auto h-[calc(100vh-8rem)]">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{guest.name}</h2>
        </div>

        {/* Next Reservation */}
        {guest.reservations[0] && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Reservation</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Date:</span> {new Date(guest.reservations[0].date).toLocaleDateString()}</p>
              <p><span className="font-medium">Party Size:</span> {guest.reservations[0].number_of_people}</p>
              <div className="mt-4">
                <p className="font-medium">Orders:</p>
                <ul className="list-disc pl-5 mt-2">
                  {guest.reservations[0].orders.map((order: Order, idx: number) => (
                    <li key={idx} className="mb-2">
                      <div className="flex items-center justify-between">
                        <span>{order.item} - ${order.price}</span>
                        <DietaryTags tags={order.dietary_tags} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* French Laudure Reviews */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Past Reviews</h3>
          {(() => {
            const reviews = getFrenchLaudureReviews(guest.reviews);
            if (reviews.length === 0) {
              return <p className="text-gray-500">No reviews for French Laudure yet</p>;
            }
            return reviews.map((review: Review, idx: number) => (
              <div key={idx} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Rating: {review.rating}/5</span>
                  <span className="text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.content}</p>
              </div>
            ));
          })()}
        </Card>

        {/* Emails */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Communication History</h3>
          {guest.emails.map((email: Email, idx: number) => (
            <div key={idx} className="mb-4 last:mb-0 border-b last:border-0 pb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{email.subject}</span>
                <span className="text-gray-500">
                  {new Date(email.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{email.combined_thread}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default GuestDetails;