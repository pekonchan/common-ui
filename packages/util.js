export default {
    // 将[Number, String]类型的props转化成string
    transPropString (value) {
        return typeof value === 'number' ? `${value}px` : value;
    },
    transPropArray (value) {
        return value instanceof Array ? value : value ? [value] : [];
    }
};