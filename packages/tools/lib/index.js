"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFixed = exports.accDiv = exports.accMul = exports.accSub = exports.accAdd = exports.calculate = void 0; // 计算

var calculate_1 = require("./calculate");

Object.defineProperty(exports, "calculate", {
  enumerable: true,
  get: function get() {
    return __importDefault(calculate_1).default;
  }
});
Object.defineProperty(exports, "accAdd", {
  enumerable: true,
  get: function get() {
    return calculate_1.accAdd;
  }
});
Object.defineProperty(exports, "accSub", {
  enumerable: true,
  get: function get() {
    return calculate_1.accSub;
  }
});
Object.defineProperty(exports, "accMul", {
  enumerable: true,
  get: function get() {
    return calculate_1.accMul;
  }
});
Object.defineProperty(exports, "accDiv", {
  enumerable: true,
  get: function get() {
    return calculate_1.accDiv;
  }
}); // 固定小数位数 四舍五入

var toFixed_1 = require("./toFixed");

Object.defineProperty(exports, "toFixed", {
  enumerable: true,
  get: function get() {
    return toFixed_1.toFixed;
  }
});