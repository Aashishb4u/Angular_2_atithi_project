"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberValidator = /** @class */ (function () {
    function NumberValidator() {
    }
    NumberValidator.validate = function (c) {
        var NUMBER_REGEXP = /^-?\d+\.?\d*$/;
        return NUMBER_REGEXP.test(c.value) ? null : {
            validateNumber: {
                valid: false
            }
        };
    };
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=number.validator.js.map