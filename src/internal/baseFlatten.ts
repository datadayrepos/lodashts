import isFlattenable from './isFlattenable'

/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(
  array: Array<any>,
  depth: number,
  predicate?: (value: any) => boolean, // predicate should be a function type
  isStrict: boolean = false, // Provide default boolean value
  result: Array<any> = [], // Default parameter assignment
): Array<any> {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null)
    return result

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      }
      else {
        result.push(...value)
      }
    }
    else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}

export default baseFlatten
