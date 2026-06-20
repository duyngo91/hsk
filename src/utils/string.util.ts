/**
 * String utility providing random generation helpers for test payloads.
 */
export class StringUtil {
  /**
   * Generates a random alphanumeric string.
   */
  public static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a randomized email address.
   */
  public static generateRandomEmail(domain: string = 'testcompany.com'): string {
    const randomPart = this.generateRandomString(10).toLowerCase();
    return `auto_${randomPart}@${domain}`;
  }

  /**
   * Generates a randomized phone number with standard length.
   */
  public static generateRandomPhoneNumber(prefix: string = '09'): string {
    let result = prefix;
    for (let i = 0; i < 8; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  }
}
