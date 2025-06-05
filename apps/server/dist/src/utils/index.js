"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changedPasswordAfter = changedPasswordAfter;
function changedPasswordAfter(user, JWTTimestamp) {
    if (user.passwordChangedAt) {
        const changedTimestamp = Math.floor(user.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}
