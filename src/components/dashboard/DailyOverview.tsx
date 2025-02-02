// src/components/dashboard/DailyOverview.tsx

import React, { useState } from 'react';
import { useReservations } from '../../hooks/useReservations';
import StatCard from './StatCard';
import { DatePicker } from './DatePicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Users, 
  Calendar, 
  Award, 
  UtensilsCrossed, 
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

const DailyOverview: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024-05-20'));
  const { dailyStats, loading, error } = useReservations(format(selectedDate, 'yyyy-MM-dd'));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dailyStats) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Overview</h2>
        <DatePicker 
          date={selectedDate} 
          onDateChange={setSelectedDate}
        />
      </div>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Covers"
          value={dailyStats.totalCovers}
          icon={Users}
          description="Total guests expected today"
        />
        <StatCard
          title="Service Distribution"
          value={`${dailyStats.dinnerCount} dinner`}
          icon={UtensilsCrossed}
          description={dailyStats.lunchCount ? `${dailyStats.lunchCount} lunch` : 'Dinner service only'}
        />
        <StatCard
          title="VIP Guests"
          value={dailyStats.vipCount}
          icon={Award}
          description={`${dailyStats.returningGuestCount} returning guests`}
        />
        <StatCard
          title="Special Occasions"
          value={dailyStats.specialOccasions.reduce((acc, curr) => acc + curr.count, 0)}
          icon={Calendar}
          description="Celebrations today"
        />
      </div>

      {/* Special Occasions and Dietary Restrictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Special Occasions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyStats.specialOccasions.map((occasion) => (
                <div key={occasion.type} className="flex justify-between items-center">
                  <span className="capitalize">{occasion.type}</span>
                  <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
                    {occasion.count}
                  </span>
                </div>
              ))}
              {dailyStats.specialOccasions.length === 0 && (
                <div className="text-muted-foreground">No special occasions today</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Dietary Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyStats.dietaryRestrictions.map((restriction) => (
                <div key={restriction.type} className="flex justify-between items-center">
                  <span className="capitalize">{restriction.type.replace('-', ' ')}</span>
                  <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
                    {restriction.count}
                  </span>
                </div>
              ))}
              {dailyStats.dietaryRestrictions.length === 0 && (
                <div className="text-muted-foreground">No dietary restrictions today</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Staff Notes & Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyStats.vipCount > 0 && (
              <Alert>
                <AlertTitle>VIP Service Protocol</AlertTitle>
                <AlertDescription>
                  We have {dailyStats.vipCount} VIP guests today. Please ensure enhanced service standards
                  and personal attention.
                </AlertDescription>
              </Alert>
            )}
            
            {dailyStats.specialOccasions.length > 0 && (
              <Alert>
                <AlertTitle>Celebration Preparations</AlertTitle>
                <AlertDescription>
                  Multiple special occasions today. Coordinate with the kitchen for celebration preparations
                  and timing.
                </AlertDescription>
              </Alert>
            )}

            {dailyStats.dietaryRestrictions.length > 0 && (
              <Alert>
                <AlertTitle>Dietary Alerts</AlertTitle>
                <AlertDescription>
                  Several dietary restrictions noted. Please double-check all orders against restrictions
                  before serving.
                </AlertDescription>
              </Alert>
            )}

            {dailyStats.vipCount === 0 && 
             dailyStats.specialOccasions.length === 0 && 
             dailyStats.dietaryRestrictions.length === 0 && (
              <div className="text-muted-foreground">No special notes for today</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyOverview;