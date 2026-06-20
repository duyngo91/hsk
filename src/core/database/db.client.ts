import { config } from '@config/env.config.js';

/**
 * Reusable Database helper class.
 * In a real application, you would import a client like 'pg', 'mysql2', or 'mssql'
 * and use the environment configuration to establish connection pools.
 */
export class DbClient {
  private isConnected = false;
  private config = config.database;

  constructor() {
    // Connection config loaded automatically per environment
  }

  /**
   * Connect to the database.
   */
  async connect(): Promise<void> {
    console.log(`[DB Client] Connecting to database: ${this.config.database} at ${this.config.host}:${this.config.port}`);
    this.isConnected = true;
  }

  /**
   * Run a SQL query on the database.
   */
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.isConnected) {
      await this.connect();
    }
    console.log(`[DB Query] executing: "${sql}" with params: [${params.join(', ')}]`);
    
    // Simulate database query execution
    return [] as T[];
  }

  /**
   * Specialized reusable query: Get user status.
   */
  async getUser(username: string): Promise<{ username: string; email: string; status: string } | null> {
    const queryStr = 'SELECT username, email, status FROM users WHERE username = $1 LIMIT 1';
    console.log(`[DB Client] Retrieving user: ${username}`);
    
    // Return mock data for test stability during skeleton validation
    return {
      username,
      email: `${username}@example.com`,
      status: 'ACTIVE'
    };
  }

  /**
   * Disconnect from the database.
   */
  async disconnect(): Promise<void> {
    if (this.isConnected) {
      console.log(`[DB Client] Disconnected from ${this.config.database}`);
      this.isConnected = false;
    }
  }
}
