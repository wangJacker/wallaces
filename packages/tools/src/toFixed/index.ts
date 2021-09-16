/*
 * @Author: wangYe 
 * @Date: 2021-05-14 11:58:47 
 * @Last Modified by: wangYe
 * @Last Modified time: 2021-05-14 12:13:20
 */

export const toFixed = (value: string | number, s: number) => {
    var that = Number(value),
        changenum, index;
    if (value < 0) {
        that = -that;
    }
    changenum = (parseInt((that * Math.pow(10, s) + 0.5).toString()) / Math.pow(10, s)).toString();
    index = changenum.indexOf(".");
    if (index < 0 && s > 0) {
        changenum = changenum + ".";
        for (var i = 0; i < s; i++) {
            changenum = changenum + "0";
        }
    } else {
        index = changenum.length - index;
        for (var i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + "0";
        }

    }
    if (value < 0) {
        return -changenum;
    } else {
        return changenum;
    }
}