// src/hooks/useReservations.ts

import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Diner, DailyStats, SpecialRequest } from '../types/types';
import dinersData from '../data/fine-dining-dataset.json';

interface DinerResponse {
  diners: Diner[];
}

interface RestrictionCount {
  type: string;
  count: number;
}

export const useReservations = (date: string) => {
  const [diners, setDiners] = useState<Diner[]>([]);
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

  const processData = (diners: Diner[], targetDate: string) => {
    const todaysDiners = diners.filter(diner => 
      diner.reservations.some(res => res.date === targetDate)
    );

    const specialOccasions = detectSpecialOccasions(todaysDiners, targetDate);
    const dietaryRestrictions = getDietaryRestrictions(todaysDiners, targetDate);
    const totalCovers = _.sumBy(todaysDiners, diner => 
      diner.reservations.find(res => res.date === targetDate)?.number_of_people || 0
    );
    const vipCount = countVIPGuests(todaysDiners);
    const returningGuestCount = countReturningGuests(todaysDiners);
    const timeDistribution = getTimeDistribution(todaysDiners, targetDate);
    const specialRequests = getSpecialRequests(todaysDiners, targetDate);

    setDailyStats({
      totalCovers,
      lunchCount: timeDistribution.lunch,
      dinnerCount: timeDistribution.dinner,
      specialOccasions,
      dietaryRestrictions,
      vipCount,
      returningGuestCount,
      specialRequests
    });
  };

  const detectSpecialOccasions = (diners: Diner[], targetDate: string) => {
    const occasions: { type: string; count: number }[] = [];
    const keywords = {
      birthday: /birthday/i,
      anniversary: /anniversary/i,
      proposal: /proposal|propose/i,
      celebration: /celebration|celebrating/i,
      graduation: /graduation|graduate/i
    };

    for (const diner of diners) {
      const relevantEmail = diner.emails.find(email => 
        new Date(email.date) <= new Date(targetDate) && 
        new Date(email.date) >= new Date(targetDate)
      );

      if (relevantEmail) {
        for (const [type, regex] of Object.entries(keywords)) {
          if (regex.test(relevantEmail.subject) || regex.test(relevantEmail.combined_thread)) {
            occasions.push({ type, count: 1 });
          }
        }
      }
    }

    return _.chain(occasions)
      .groupBy('type')
      .map((group, type) => ({ type, count: group.length }))
      .value();
  };

  const getDietaryRestrictions = (diners: Diner[], targetDate: string): RestrictionCount[] => {
    const restrictions = diners.flatMap(diner => 
      diner.reservations
        .filter(res => res.date === targetDate)
        .flatMap(res => res.orders.flatMap(order => order.dietary_tags))
    );

    return _.chain(restrictions)
      .filter(Boolean) // Filter out empty/null/undefined values
      .groupBy(tag => tag)
      .map((group, type) => ({
        type,
        count: group.length
      }))
      .value();
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

  const getTimeDistribution = (diners: Diner[], targetDate: string) => {
    return {
      lunch: 0,
      dinner: diners.length
    };
  };

  const getSpecialRequests = (diners: Diner[], targetDate: string): SpecialRequest[] => {
    return diners.flatMap(diner => {
      const relevantEmail = diner.emails.find(email => 
        new Date(email.date) <= new Date(targetDate) && 
        new Date(email.date) >= new Date(targetDate)
      );

      if (!relevantEmail) return [];

      const specialRequests: SpecialRequest[] = [];
      
      if (/wheelchair|accessibility/i.test(relevantEmail.combined_thread)) {
        specialRequests.push({
          type: 'Accessibility',
          details: 'Wheelchair access needed',
          guestName: diner.name
        });
      }

      if (/allergy|allergic|dietary/i.test(relevantEmail.combined_thread)) {
        specialRequests.push({
          type: 'Dietary',
          details: 'Allergy accommodation needed',
          guestName: diner.name
        });
      }

      if (/celebration|surprise|special/i.test(relevantEmail.combined_thread)) {
        specialRequests.push({
          type: 'Special Occasion',
          details: 'Special celebration',
          guestName: diner.name
        });
      }

      return specialRequests;
    });
  };

  return {
    diners,
    dailyStats,
    loading,
    error
  };
};