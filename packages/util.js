export default {
    // 将[Number, String]类型的props转化成string
    transPropsValue (value) {
        return typeof value === 'number' ? `${value}px` : value;
    }
};