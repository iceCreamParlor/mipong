"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.KakaoPayService = void 0;
var axios_1 = require("axios");
var string_1 = require("../misc/string");
var KakaoPayService = /** @class */ (function () {
    function KakaoPayService(adminKey, cid) {
        this.adminKey = adminKey;
        this.cid = cid;
        /**
         * 카카오페이 Admin Key 를 환경 변수에서 뽑아온다.
         * @returns
         */
        this.getAdminKey = function () {
            var adminKey = process.env.KAKAOPAY_ADMIN_KEY;
            if (adminKey === undefined || string_1.isEmpty(adminKey)) {
                throw new Error("Kakao Admin Key is Empty");
            }
            return adminKey;
        };
        /**
         * 카카오페이 CID 를 환경 변수에서 뽑아온다.
         * @returns
         */
        this.getCid = function () {
            var cid = process.env.KAKAOPAY_CID;
            if (cid === undefined || string_1.isEmpty(cid)) {
                throw new Error("KakaoPay CID Key is Empty");
            }
            return cid;
        };
        if (adminKey === undefined || string_1.isEmpty(adminKey)) {
            adminKey = this.getAdminKey();
        }
        if (cid === undefined || string_1.isEmpty(cid)) {
            cid = this.getCid();
        }
        this._kakaoPayAxios = axios_1["default"].create({
            baseURL: "https://kapi.kakao.com",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: "KakaoAK " + adminKey
            }
        });
        if (!adminKey || !cid || !this._kakaoPayAxios) {
            throw new Error("카카오페이 생성자 실행 에러 발생");
        }
    }
    KakaoPayService.prototype.readySinglePayment = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var axiosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._kakaoPayAxios.post("/v1/payment/ready")];
                    case 1:
                        axiosResponse = _a.sent();
                        console.log("Ready Single Payment Response : " + JSON.stringify(axiosResponse));
                        return [2 /*return*/, axiosResponse];
                }
            });
        });
    };
    Object.defineProperty(KakaoPayService.prototype, "kakaoPayAxios", {
        get: function () {
            return this._kakaoPayAxios;
        },
        enumerable: false,
        configurable: true
    });
    return KakaoPayService;
}());
exports.KakaoPayService = KakaoPayService;
exports["default"] = KakaoPayService;
