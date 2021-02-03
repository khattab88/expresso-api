const { expect } = require('chai');

const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const auth = require('../controllers/auth-controller');

describe("auth controller", function () {
    it("protect function should return a error if token is not valid", function() {
        const req = {
            headers: {
                authorization: null,
            },
            cookies: {
                jwt: null
            }
        };
    
        const next = () => {};
    
        expect(auth.protect.bind(this, req, {}, next)).to.throw();
    });
});

