
import { useReservations } from '../../hooks/useReservations';
import StatCard from './StatCard';
import InfoCard from './InfoCard';
import { DatePicker } from './DatePicker';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDashboardDate } from '@/context/DashboardDateContext';
import { 
  Users, 
  Calendar, 
  Award, 
  UtensilsCrossed,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

const DailyOverview: React.FC = () => {
  const {selectedDate, setSelectedDate} = useDashboardDate();
  const { dailyStats, emailInfos, loading, error } = useReservations(format(selectedDate, 'yyyy-MM-dd'));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dailyStats) return <div>No data available</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Daily Overview</h2>
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

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Special Occasions Card */}
        <InfoCard title="Special Occasions" icon={Calendar}>
          <div className="space-y-3">
            {dailyStats.specialOccasions.map((occasion) => (
              <div key={occasion.type} 
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="capitalize">{occasion.type}</span>
                <Badge variant="secondary">{occasion.count}</Badge>
              </div>
            ))}
            {dailyStats.specialOccasions.length === 0 && (
              <div className="text-muted-foreground">No special occasions today</div>
            )}
          </div>
        </InfoCard>

        {/* Dietary Restrictions Card */}
        <InfoCard title="Dietary Restrictions" icon={AlertTriangle}>
          <div className="space-y-3">
            {dailyStats.dietaryRestrictions.map((restriction) => (
              <div key={restriction.type} 
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="capitalize">{restriction.type.replace('-', ' ')}</span>
                <Badge variant="secondary">{restriction.count}</Badge>
              </div>
            ))}
            {dailyStats.dietaryRestrictions.length === 0 && (
              <div className="text-muted-foreground">No dietary restrictions today</div>
            )}
          </div>
        </InfoCard>

        {/* Staff Notes Card - Full Width */}
        <div className="lg:col-span-2">
          <InfoCard title="Staff Notes & Action Items" icon={Clock}>
            <div className="space-y-6">
              {emailInfos.map((email, idx) => (
                <Alert key={idx} 
                  className={`border-l-4 transition-all duration-300 hover:shadow-md ${
                    email.priority === 'high' 
                      ? 'border-l-red-500' 
                      : email.priority === 'medium'
                      ? 'border-l-yellow-500'
                      : 'border-l-green-500'
                  }`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <p className="font-medium">{email.guestName}</p>
                      <AlertDescription className="text-sm text-muted-foreground">
                        {email.content}
                      </AlertDescription>
                      <div className="flex flex-wrap gap-2">
                        {email.categories?.map((category, cidx) => (
                          <Badge key={cidx} variant="outline" className="capitalize">
                            {category.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge className={`whitespace-nowrap px-2 py-0.5 ${
                      email.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : email.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {email.priority.charAt(0).toUpperCase() + email.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </Alert>
              ))}
              {emailInfos.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  No special notes or requests for this date
                </div>
              )}
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default DailyOverview;