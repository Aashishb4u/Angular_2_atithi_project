"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterValidator = /** @class */ (function () {
    function CharacterValidator() {
    }
    CharacterValidator.validate = function (c) {
        // let Character_REGEXP = /^[a-zA-Z]*$/;
        var Character_REGEXP = /^[a-zA-z ]*$/;
        return Character_REGEXP.test(c.value) ? null : {
            validateCharacter: {
                valid: false
            }
        };
    };
    return CharacterValidator;
}());
exports.CharacterValidator = CharacterValidator;
//# sourceMappingURL=character.validator.js.map