const { expect } = require('chai');

it("add two numbers", function() {
    const num1 = 2;
    const num2 = 3;

    const sum = num1 + num2;

    expect(sum).to.equal(5);
});