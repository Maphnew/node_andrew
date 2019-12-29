const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('Should calculate total and tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test("Should convert 32 F to 0 C", () => {
    const cel = fahrenheitToCelsius(50)
    expect(cel).toBe(10)
})
test("Should convert 0 C to 32 F", () => {
    const fah = celsiusToFahrenheit(10)
    expect(fah).toBe(50)
})
//
// Why test?

// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind