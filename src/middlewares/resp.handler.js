export const OK = (message, data) => {
    return {
        message: message || 'OK',
        data: data,
        success: true,
        fail: false,
    };
};
export const FAIL = (message, data) => {
    return {
        message: message || 'FAIL',
        data: data,
        success: false,
        fail: true,
    };
};