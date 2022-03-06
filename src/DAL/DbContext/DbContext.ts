// #region Imports

// #endregion
/**
 * Database context class
 * contains all the database entities
 */
class DbContext {
  // #region Ctor
  // #endregion
  // #region properties
  // Transactions: { [key: string]: IDbTransaction } = {};
  // #endregion
  // #region Meths
  /**
   * Complete function to save all changes to the database
   */
  public Complete(): Promise<void> {
    return this.db.complete();
  }
  // #endregion
}

export default DbContext;
