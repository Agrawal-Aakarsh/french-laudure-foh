// src/lib/emailProcessor.ts
import { Email, EmailInfo } from '../types/types';

interface EmailCategory {
  patterns: RegExp[];
  priority: "high" | "medium" | "low";
  actionRequired?: boolean;
}

const EMAIL_CATEGORIES: Record<string, EmailCategory> = {
  dietary: {
    patterns: [
      /allerg(y|ic|ies)/i,
      /gluten[- ]?free/i,
      /dairy[- ]?free/i,
      /vegan/i,
      /vegetarian/i,
      /shellfish/i,
      /nut[- ]?free/i,
      /lactose/i,
      /cilantro/i
    ],
    priority: "high",
    actionRequired: true
  },
  accessibility: {
    patterns: [
      /wheelchair/i,
      /mobil(e|ity)/i,
      /access(ible|ibility)/i,
      /cane/i,
      /step[- ]?free/i
    ],
    priority: "high",
    actionRequired: true
  },
  celebration: {
    patterns: [
      /birthday/i,
      /anniversary/i,
      /graduation/i,
      /promotion/i,
      /proposal/i,
      /surprise/i,
      /special occasion/i,
      /reuniting/i,
      /honeymoon/i,
      /reunion/i,
      /child/i,
      /engagement/i,
    ],
    priority: "medium",
    actionRequired: true
  },
  timing: {
    patterns: [
      /early/i,
      /arrive/i,
      /rush/i,
      /theater/i,
      /show/i,
      /timing/i,
      /schedule/i
    ],
    priority: "medium",
    actionRequired: false
  },
  seating: {
    patterns: [
      /table/i,
      /seat(ing)?/i,
      /corner/i,
      /quiet/i,
      /private/i,
      /window/i,
      /booth/i
    ],
    priority: "medium",
    actionRequired: false
  },
  special_service: {
    patterns: [
      /photography/i,
      /photo/i,
      /camera/i,
      /picture/i,
      /celebration/i,
      /candle/i,
      /toast/i,
      /wine pairing/i,
      /sommelier/i,
      /rose/i,
      /child/i,
      /gift/i,
    ],
    priority: "low",
    actionRequired: false
  }
};

export function processEmail(email: Email, guestName: string): EmailInfo {
    let matchedCategories = new Set<string>();
    let highestPriority: "high" | "medium" | "low" = "low";
    let needsAction = false;
    
    // Check both subject and combined thread for each category
    for (const [category, config] of Object.entries(EMAIL_CATEGORIES)) {
      for (const pattern of config.patterns) {
        if (pattern.test(email.subject) || pattern.test(email.combined_thread)) {
          matchedCategories.add(category);
          if (config.actionRequired) {
            needsAction = true;
          }
          if (config.priority === "high" || (config.priority === "medium" && highestPriority === "low")) {
            highestPriority = config.priority;
          }
          break;
        }
      }
    }
  
    // For dietary restrictions specifically, check both fields
    const fullEmailText = `${email.subject} ${email.combined_thread}`;
    const dietaryKeywords = {
      'shellfish': 'shellfish-free',
      'gluten': 'gluten-free',
      'dairy': 'dairy-free',
      'lactose': 'dairy-free',
      'nut': 'nut-free',
      'allerg': 'allergy',
      'vegan': 'vegan',
      'vegetarian': 'vegetarian'
    };
  
    for (const [keyword, restriction] of Object.entries(dietaryKeywords)) {
      if (new RegExp(keyword, 'i').test(fullEmailText)) {
        matchedCategories.add('dietary');
        matchedCategories.add(restriction);
        highestPriority = "high";
        needsAction = true;
      }
    }
  
    // Determine the primary type based on matched categories
    let primaryType: "special_occasion" | "request" | "dietary" | "general" = "general";
    if (matchedCategories.has("dietary")) {
      primaryType = "dietary";
    } else if (matchedCategories.has("celebration")) {
      primaryType = "special_occasion";
    } else if (needsAction) {
      primaryType = "request";
    }
  
    return {
      guestName,
      subject: email.subject,
      content: email.combined_thread,
      type: primaryType,
      priority: highestPriority,
      needsAction,
      categories: Array.from(matchedCategories)
    };
  }

// Helper function to get action items from processed emails
export function getActionItems(emailInfos: EmailInfo[]): string[] {
  return emailInfos
    .filter(info => info.needsAction)
    .map(info => {
      switch (info.type) {
        case "dietary":
          return `Dietary Alert: ${info.guestName} - Check restrictions and inform kitchen`;
        case "special_occasion":
          return `Special Occasion: ${info.guestName} - Prepare celebration items`;
        case "request":
          return `Special Request: ${info.guestName} - Review email for specific needs`;
        default:
          return `Review Request: ${info.guestName} - ${info.subject}`;
      }
    });
}

// Helper function to categorize emails by priority
export function categorizeEmailsByPriority(emailInfos: EmailInfo[]): Record<string, EmailInfo[]> {
  return {
    high: emailInfos.filter(info => info.priority === "high"),
    medium: emailInfos.filter(info => info.priority === "medium"),
    low: emailInfos.filter(info => info.priority === "low")
  };
}