require('./serenity/utils/core-ext');

Serenity = {
    Object      : require('./serenity/object'),
    Model       : require('./serenity/model'),
    Controller  : require('./serenity/controller'),
    ArrayProxy  : require('./serenity/array-proxy'),
    View        : require('./serenity/view'),
    Enumerable  : require('./serenity/enumerable')
};

module.exports = Serenity;