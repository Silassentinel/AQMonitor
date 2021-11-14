/**
 * BitWise Sieve - prime number generator
 */
export default class BitwiseSieve {
  // #region Props
  private _max: number;
  private _primes: number[];
  private _sieve: number[];
  // #endregion
  // #region Ctor
  constructor(max: number) {
    this._max = max;
    this._primes = [];
    this._sieve = [];
    this.generatePrimes();
  }
  // #endregion
  // #region Meths
  /**
   * Get the next prime numbers
   * @returns {number[]}
   */
  public getPrimes(): number[] {
    return this._primes;
  }
  /**
   * Gets the sieve
   * @returns {number[]}
   */
  public getSieve(): number[] {
    return this._sieve;
  }
  /**
   * Generate the primes which are divisible by 1 and themselves
   */
  private generatePrimes(): void {
    this._sieve = new Array(this._max + 1);
    this._sieve.fill(1);
    this._sieve[0] = 0;
    this._sieve[1] = 0;
    for (let i = 2; i <= this._max; i++) {
        if(i / 1 === 0 || i / i === 1) {
            this._primes.push(i);
        }
    }
  }

  // #endregion
}
