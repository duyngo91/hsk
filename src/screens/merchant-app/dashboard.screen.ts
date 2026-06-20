import { BaseScreen } from '@core/base/base.screen.js';

/**
 * Screen Object representing the Merchant Mobile App Dashboard Screen.
 * Contains actions for handling incoming orders, cooking status, and merchant settings.
 */
export class MerchantDashboardScreen extends BaseScreen {
  readonly pendingOrdersHeader: any;
  readonly acceptOrderButton: any;
  readonly prepareOrderButton: any;
  readonly completeOrderButton: any;

  constructor(screen: any) {
    super(screen);
    this.pendingOrdersHeader = this.screen.getByText('Pending Orders');
    this.acceptOrderButton = this.screen.getByRole('button', { name: 'Accept Order' });
    this.prepareOrderButton = this.screen.getByRole('button', { name: 'Mark Preparing' });
    this.completeOrderButton = this.screen.getByRole('button', { name: 'Mark Ready' });
  }

  /**
   * Accepts the first pending order on the merchant dashboard.
   */
  async acceptIncomingOrder(): Promise<void> {
    await this.tapElement(this.acceptOrderButton, 'Accept Order Button');
  }

  /**
   * Updates the accepted order status to 'PREPARING'.
   */
  async startPreparingOrder(): Promise<void> {
    await this.tapElement(this.prepareOrderButton, 'Mark Preparing Button');
  }

  /**
   * Completes the order preparation, marking it ready for driver pickup.
   */
  async readyForPickup(): Promise<void> {
    await this.tapElement(this.completeOrderButton, 'Mark Ready Button');
  }
}
