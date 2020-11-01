const role = require("../constants/role");

function canView(user, item) {
    return (
        user.role === role.Admin ||
        user.role === role.Agent ||
        item.user_id == user.id
    );
}

function scopedItems(user, items) {
    if (user.role == role.Admin) return items;
    return items.filter((item) => item.user_id == user.id);
}

function canDeleteItem(user, item) {
    return user.role === role.Admin || item.user_id == user.id;
}
module.exports = {
    canView,
    scopedItems,
    canDeleteItem,
};
