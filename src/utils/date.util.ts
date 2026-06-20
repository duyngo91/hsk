/**
 * Date utility containing common helper functions for test date manipulations.
 */
export class DateUtil {
  /**
   * Formats a date into a string pattern (e.g. YYYY-MM-DD).
   */
  public static formatDate(date: Date, pattern: 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'YYYY/MM/DD' = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    switch (pattern) {
      case 'DD-MM-YYYY':
        return `${day}-${month}-${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      case 'YYYY-MM-DD':
      default:
        return `${year}-${month}-${day}`;
    }
  }

  /**
   * Adds or subtracts days from a given date.
   */
  public static addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  /**
   * Returns current timestamp in seconds.
   */
  public static getUnixTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * Returns current formatted date-time string.
   */
  public static getCurrentDateTime(): string {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  }
}
