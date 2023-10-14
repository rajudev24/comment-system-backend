"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastErroor = (error) => {
    const errors = [
        {
            path: error.path,
            message: "Invalid Id",
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Cast error",
        errorMeesages: errors,
    };
};
exports.default = handleCastErroor;
