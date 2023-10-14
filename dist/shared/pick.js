"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const resultObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            resultObj[key] = obj[key];
        }
    }
    return resultObj;
};
exports.default = pick;
