/*
 * @Author: wangYe 
 * @Date: 2021-05-14 10:47:38 
 * @Last Modified by: wangYe
 * @Last Modified time: 2021-05-14 11:56:15
 */

type Styles = "add" | "sub" | "div" | "mul";


// 计算小数点位数
function countDecimals(num: string | number) {
    let len = 0;
    try {
        num = Number(num);
        let str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            let isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch (e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
}

// 将小数转为整数
function convertToInt(num: string | number) {
    num = Number(num);
    let newNum = num;
    let times = countDecimals(num);
    let temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
}

// 确认计算结果
function getCorrectResult(styles: Styles, num1: number, num2: number, result: number) {
    let temp_result = 0;
    switch (styles) {
        case "add":
            temp_result = num1 + num2;
            break;
        case "sub":
            temp_result = num1 - num2;
            break;
        case "div":
            temp_result = num1 / num2;
            break;
        case "mul":
            temp_result = num1 * num2;
            break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
}

// 两个浮点数相加
export function accAdd(num1: string | number, num2: string | number) {
    num1 = Number(num1);
    num2 = Number(num2);
    let dec1, dec2, times;
    try {
        dec1 = countDecimals(num1) + 1;
    } catch (e) {
        dec1 = 0;
    }
    try {
        dec2 = countDecimals(num2) + 1;
    } catch (e) {
        dec2 = 0;
    }
    times = Math.pow(10, Math.max(dec1, dec2));
    let result = (accMul(num1, times) + accMul(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
}

// 两个浮点数相乘
export function accMul(num1: string | number, num2: string | number) {
    num1 = Number(num1);
    num2 = Number(num2);
    let times = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    try {
        times += countDecimals(s1);
    } catch (e) { }
    try {
        times += countDecimals(s2);
    } catch (e) { }
    let result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
}

// 两个浮点数相减
export function accSub(num1: string | number, num2: string | number) {
    num1 = Number(num1);
    num2 = Number(num2);
    let dec1, dec2, times;
    try {
        dec1 = countDecimals(num1) + 1;
    } catch (e) {
        dec1 = 0;
    }
    try {
        dec2 = countDecimals(num2) + 1;
    } catch (e) {
        dec2 = 0;
    }
    times = Math.pow(10, Math.max(dec1, dec2));
    let result = Number((accMul(num1, times) - accMul(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
}

// 两个浮点数相除
export function accDiv(num1: string | number, num2: string | number) {
    num1 = Number(num1);
    num2 = Number(num2);
    let t1 = 0,
        t2 = 0,
        dec1, dec2;
    try {
        t1 = countDecimals(num1);
    } catch (e) { }
    try {
        t2 = countDecimals(num2);
    } catch (e) { }
    dec1 = convertToInt(num1);
    dec2 = convertToInt(num2);
    let result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
    return getCorrectResult("div", num1, num2, result);
}

export default { accAdd, accDiv, accSub, accMul }
