import isArguments from '../isArguments'

/** Built-in value reference. */
const spreadableSymbol = Symbol.isConcatSpreadable

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value: any): boolean {
  return (
    Array.isArray(value)
    || isArguments(value)
    || !!(value && value[spreadableSymbol])
  )
}

export default isFlattenable
