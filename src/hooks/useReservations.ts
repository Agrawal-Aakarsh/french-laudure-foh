// src/hooks/useReservations.ts

import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Diner, DailyStats, EmailInfo, RestrictionCount } from '../types/types';
import { processEmail } from '../lib/emailProcessor';
import dinersData from '../data/fine-dining-dataset.json';

interface DinerResponse {
  diners: Diner[];
}

interface UseReservationsReturn {
  diners: Diner[];
  dailyStats: DailyStats | null;
  emailInfos: EmailInfo[];
  loading: boolean;
  error: string | null;
}

export const useReservations = (date: string): UseReservationsReturn => {
  const [diners, setDiners] = useState<Diner[]>([]);
  const [emailInfos, setEmailInfos] = useState<EmailInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);

  useEffect(() => {
    try {
      const data = dinersData as DinerResponse;
      setDiners(data.diners);
      processData(data.diners, date);
    } catch (err) {
      setError('Failed to load reservation data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [date]);

  const getDietaryRestrictions = (diners: Diner[], targetDate: string): RestrictionCount[] => {
    // Get restrictions from order tags
    const orderRestrictions = diners.flatMap(diner => 
      diner.reservations
        .filter(res => res.date === targetDate)
        .flatMap(res => res.orders.flatMap(order => order.dietary_tags))
    );
  
    // Get restrictions from emails
    const emailRestrictions = diners.flatMap(diner => {
      const email = diner.emails[0]; // Using our simplified approach for MVP
      if (!email) return [];
  
      const restrictions: string[] = [];
      
      // Check for common allergies and dietary restrictions in email content
      if (/shellfish/i.test(email.subject) || /shellfish/i.test(email.combined_thread)) {
        restrictions.push('shellfish-free');
      }
      if (/gluten/i.test(email.subject) || /gluten/i.test(email.combined_thread)) {
        restrictions.push('gluten-free');
      }
      if (/dairy|lactose/i.test(email.subject) || /dairy|lactose/i.test(email.combined_thread)) {
        restrictions.push('dairy-free');
      }
      if (/nut/i.test(email.subject) || /nut/i.test(email.combined_thread)) {
        restrictions.push('nut-free');
      }
  
      return restrictions;
    });
  
    // Combine both sources of restrictions
    const allRestrictions = [...orderRestrictions, ...emailRestrictions];
  
    return _.chain(allRestrictions)
      .filter(Boolean)
      .groupBy(tag => tag)
      .map((group, type) => ({
        type,
        count: group.length
      }))
      .value();
  };

  const processData = (diners: Diner[], targetDate: string) => {
    // Filter diners for the target date
    const todaysDiners = diners.filter(diner => 
      diner.reservations.some(res => res.date === targetDate)
    );
    
    console.log('Todays diners:', todaysDiners);
  
    // Process emails - just take the first email for each diner
    const processedEmails = todaysDiners.flatMap(diner => {
      if (diner.emails[0]) {
        const processed = processEmail(diner.emails[0], diner.name);
        console.log('Processed email for', diner.name, ':', processed);
        return [processed];
      }
      return [];
    });
  
    console.log('All processed emails:', processedEmails);
    setEmailInfos(processedEmails);

    // Calculate other stats
    const specialOccasions = processedEmails
      .filter(email => email.type === 'special_occasion')
      .reduce((acc, email) => {
        const type = email.categories?.find(cat => 
          ['birthday', 'anniversary', 'graduation', 'promotion', 'celebration', 'reunion'].includes(cat)
        ) || 'other';
        acc.push({ type, count: 1 });
        return acc;
      }, [] as { type: string; count: number }[]);

      const dietaryRestrictions = getDietaryRestrictions(todaysDiners, targetDate);

    const totalCovers = _.sumBy(todaysDiners, diner => 
      diner.reservations.find(res => res.date === targetDate)?.number_of_people || 0
    );

    const vipCount = countVIPGuests(todaysDiners);
    const returningGuestCount = countReturningGuests(todaysDiners);

    const specialRequests = processedEmails
      .filter(email => email.needsAction)
      .map(email => ({
        type: email.type,
        details: email.content,
        guestName: email.guestName
      }));

    setDailyStats({
      totalCovers,
      lunchCount: 0, // Assuming dinner service only
      dinnerCount: todaysDiners.length,
      specialOccasions,
      dietaryRestrictions,
      vipCount,
      returningGuestCount,
      specialRequests
    });
  };

  const countVIPGuests = (diners: Diner[]): number => {
    return diners.filter(diner => {
      const averageRating = _.meanBy(diner.reviews, 'rating');
      const hasHighRatings = averageRating >= 4.5;
      const hasMultipleVisits = diner.reviews.length >= 2;
      return hasHighRatings || hasMultipleVisits;
    }).length;
  };

  const countReturningGuests = (diners: Diner[]): number => {
    return diners.filter(diner => 
      diner.reviews.some(review => review.restaurant_name === 'French Laudure')
    ).length;
  };

  return {
    diners,
    dailyStats,
    emailInfos,
    loading,
    error
  };
};