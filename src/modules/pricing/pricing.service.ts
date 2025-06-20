import { Injectable } from '@nestjs/common';
import {
  eachDayOfInterval,
  isWithinInterval,
  parseISO,
  subDays,
} from 'date-fns';
import { Pricing } from '../cars/entities/price.entity';

type Season = 'peak' | 'mid' | 'off';

type SeasonRange = {
  season: Season;
  start: string; // ISO date string, e.g., '2025-06-01'
  end: string; // ISO date string, e.g., '2025-09-14'
};

@Injectable()
export class PricingService {
  getPricingSeason(date: Date): Season {
    const year = date.getUTCFullYear();
    const ranges: SeasonRange[] = [
      { season: 'peak', start: `${year}-06-01`, end: `${year}-09-14` }, // Peak: Jun 1 - Sep 14
      { season: 'mid', start: `${year}-03-01`, end: `${year}-05-31` }, // Mid: Mar 1 - May 31
      { season: 'mid', start: `${year}-09-15`, end: `${year}-10-31` }, // Mid: Sep 15 - Oct 31
      { season: 'off', start: `${year}-11-01`, end: `${year + 1}-02-29` }, // Off: Nov 1 - Feb 29
    ];

    for (const { season, start, end } of ranges) {
      if (
        isWithinInterval(date, { start: parseISO(start), end: parseISO(end) })
      ) {
        return season;
      }
    }

    return 'off';
  }
  calculateTotalPrice(start: Date, end: Date, prices: Pricing[]): number {
    const dates =
      start.getTime() === end.getTime()
        ? [start]
        : eachDayOfInterval({ start, end });

    let total = 0;
    for (const date of dates) {
      const season = this.getPricingSeason(date);
      const matched = prices.find((price) => price.pricingName === season);

      if (matched) {
        total += Number(matched.value.toString());
      }
    }

    return Number(total.toFixed(2));
  }

  calculateAveragePricePerDay(
    start: Date,
    end: Date,
    prices: Pricing[],
  ): number {
    const dates =
      start.getTime() === end.getTime()
        ? [start]
        : eachDayOfInterval({ start, end: subDays(end, 1) });

    const dayCount = dates.length;
    if (dayCount === 0) {
      return 0;
    }

    const total = this.calculateTotalPrice(start, end, prices);
    return Number((total / dayCount).toFixed(2));
  }
}
