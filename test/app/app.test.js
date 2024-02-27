test('floating point number - use toBeCloseTo instead', function() {
    // const num1 = 0.3;
    // const num2 = 0.2;
    const result = 9.31 + 9.2;

    expect(result).toBeCloseTo(18.51);
})