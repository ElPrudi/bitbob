import { IndexOutOfBoundsError, StorageOverflowError, ValueOutOfBoundsError } from 'src/errors'
import { clearField, length, setField } from 'src/utils'
import BitHandler from './BitHandler'

/**
 *  A data structure that stores multiple smaller numbers in one big number to save space and computation power.
 *
 *  Numbers are added from right to left, meaning the more numbers you store, the bigger the state. Each number is assigned to a static
 *  field, separated by the pointer start indices. There is the possibility to address move space than currently used.
 */
export default class ComposedNumber extends BitHandler {
  #pointers: number[] = [0]

  constructor(initialState = 0, reserve = length(initialState)) {
    super(initialState)
    this._state = initialState
    if (initialState !== 0) this.#pointers.push(reserve)
  }

  /**
   *  Copies the current `ComposedNumber` into a new one.
   *
   *  @returns the newly created `ComposedNumber`
   */
  copy(): ComposedNumber {
    const cn = new ComposedNumber()
    cn.overwrite(this._state, [...this.#pointers])
    return cn
  }

  /**
   *  Stores a number into the 32 bit number.
   *
   *  @param value - number to store
   *  @param reserve - bit length to reserve
   */
  override set(value: number, reserve = length(value)): void {
    if (reserve > this.availableSpace) throw new StorageOverflowError(value)
    const pointers = this.#pointers
    // First number to add
    if (pointers.length === 1) {
      this._state |= value
      pointers.push(reserve)
    } else {
      const lastPointer = pointers[pointers.length - 1]
      // Since the left is always cleared out, we can shift forth without mask.
      this._state |= value << lastPointer
      pointers.push(lastPointer + reserve)
    }
  }

  /**
   *  Returns the nth number stored inside the composed number.
   *
   *  @param id - the nth number.
   *  @returns
   */
  override get(id: number): number {
    const pointers = this.#pointers
    if (id < 0 || id >= pointers.length) throw new IndexOutOfBoundsError(id)
    const start = pointers[id]
    return (this._state & 0xffffffff & (((1 << (pointers[id + 1] - start)) - 1) << start)) >>> start
  }

  /**
   *  Entirely overwrites the entire state with the given state and pointers.
   *
   * @param state - new state.
   * @param pointers - new pointers.
   */
  overwrite(state: number, pointers: number[]): void {
    this._state = state
    this.#pointers = pointers
  }

  /**
   *  Removes the number from the store. This will create a gap that can only be filled via updating the store.
   *
   *  @param id - nth number to remove.
   */
  remove(id: number): void {
    const pointers = this.#pointers
    if (id < 0 || id >= pointers.length) throw new IndexOutOfBoundsError(id)
    const ptr = pointers[id]
    this._state = clearField(this._state, pointers[id + 1] - ptr, ptr)
  }

  /**
   *  Updates a specific number of the storage.
   *
   *  If the bit sequence is longer than the previously determined bounds, it will throw a `ValueOutOfBoundsError`.
   *
   *  @param id - target number position.
   *  @param value the newly updated value.
   */
  update(id: number, value: number): void {
    const pointers = this.#pointers
    if (id < 0 || id >= pointers.length) throw new IndexOutOfBoundsError(id)
    const ptr = pointers[id]
    const size = pointers[id + 1] - ptr
    if (size < length(value)) throw new ValueOutOfBoundsError(id)
    this._state = setField(this._state, value, size, ptr)
  }

  /**
   *  Strictly searches for a stored number.
   *
   *  Info: The basic search, `(store & value) === value`, would find smaller numbers inside other numbers.
   *
   *  @param value - target value
   *  @returns `true`, if the store has this value stored, otherwise false.
   */
  override has(value: number): boolean {
    const state = this._state
    const pointers = this.#pointers
    const xLen = length(value)
    const mask = (1 << xLen) - 1
    let pointer: number
    for (let i = pointers.length - 1; i >= 0; i--) {
      pointer = pointers[i]
      if (pointers[i + 1] - pointer === xLen && ((state >> pointers[i]) & mask) === value) return true
    }
    return false
  }

  indexOf(value: number): number {
    const state = this._state
    const pointers = this.#pointers
    const len = pointers.length
    const xLen = length(value)
    const mask = (1 << xLen) - 1
    let pointer: number
    for (let i = 0; i < len; i++) {
      pointer = pointers[i]
      if (pointers[i + 1] - pointer === xLen && ((state >> pointers[i]) & mask) === value) return i
    }
    return -1
  }

  /**
   *    Clears the whole storage.
   */
  override clear(): void {
    this._state = 0
    this.#pointers = [0]
  }

  /**
   *    Returns the bit sequence pointers array to iterate through the state raw.
   */
  get pointers(): number[] {
    return this.#pointers
  }

  /**
   *    Returns the number of stored numbers inside the number.
   */
  get storedNumbers(): number {
    return this.#pointers.length - 1
  }

  /**
   *    Returns the currently available space left in the number in bits.
   */
  get availableSpace(): number {
    return this._state === 0 ? 31 : 31 - length(this._state)
  }

  /**
   *  Returns the used space in the number in bits.
   */
  get usedSpace(): number {
    return this._state === 1 << 31 ? 31 : length(this._state)
  }

  /**
   *  Converts the bit handler to a json-viable string.
   *
   *  @returns a json-viables string in form of hte current inner state.
   */
  toJSON(): string {
    return `{ state: ${this._state}, pointers: ${this.#pointers} }`
  }
}
