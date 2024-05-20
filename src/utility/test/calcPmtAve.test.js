import calcPaymentAverage from "../calcPaymentAverage";
describe('calcPmtAve',()=>{
    test('calc to be',()=>{
        expect(calcPaymentAverage([
            {
              "total_amount": 600,
              "item": "午餐",
              "exchange_rate": 0,
              "ave": {
                "榮恩": 300,
                "哈利": 300
              },
              "img": "",
              "date": "20240520",
              "icon": "",
              "morePayers": {},
              "participants": [
                "榮恩",
                "哈利"
              ],
              "currency": "",
              "participants_customized": {},
              "note": "",
              "time": 1716175458396,
              "foreign_amount": 0,
              "creator": "",
              "singlePayerOnly": "妙麗"
            },
            {
              "total_amount": 900,
              "currency": "",
              "morePayers": {},
              "time": 1716175472441,
              "item": "晚餐",
              "note": "",
              "img": "",
              "date": "20240520",
              "participants_customized": {
                "榮恩": 225,
                "妙麗": 225,
                "哈利": 450
              },
              "foreign_amount": 0,
              "icon": "",
              "exchange_rate": 0,
              "creator": "",
              "ave": {
                "妙麗": 225,
                "哈利": 450,
                "榮恩": 225
              },
              "participants": [
                "妙麗",
                "榮恩",
                "哈利"
              ],
              "singlePayerOnly": "哈利"
            },
            {
              "morePayers": {},
              "ave": {
                "哈利": 333.33,
                "妙麗": 333.33,
                "榮恩": 333.33
              },
              "currency": "",
              "foreign_amount": 0,
              "singlePayerOnly": "哈利",
              "time": 1716175480910,
              "exchange_rate": 0,
              "participants_customized": {},
              "icon": "",
              "participants": [
                "妙麗",
                "榮恩",
                "哈利"
              ],
              "creator": "",
              "total_amount": 1000,
              "item": "車錢",
              "note": "",
              "img": "",
              "date": "20240520"
            },
            {
              "total_amount": 500,
              "participants": [
                "妙麗",
                "哈利",
                "榮恩"
              ],
              "singlePayerOnly": "多人付款",
              "img": "",
              "item": "文具",
              "date": "20240520",
              "participants_customized": {},
              "currency": "",
              "icon": "",
              "exchange_rate": 0,
              "note": "",
              "ave": {
                "榮恩": 166.67,
                "妙麗": 166.67,
                "哈利": 166.67
              },
              "morePayers": {
                "榮恩": 300,
                "妙麗": 200
              },
              "time": 1716175444586,
              "foreign_amount": 0,
              "creator": ""
            }
          ],[
            {
              "email": "i.am.a.in.groupx@gmail.com",
              "uid": "user_2gRPtCYbeSx0OVHbjGMGoxW7fFZ",
              "img": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ1JQdDZ1blMxalRGcURVaHV1NHBvU3loZmsifQ",
              "name": "妙麗"
            },
            {
              "name": "榮恩",
              "email": "yingweng.test@gmail.com",
              "img": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ1JRQXB5VFNuSlR3UjhjN1c3cUQ3ejZEWmoifQ",
              "uid": "user_2gRQAoMiSFCyFHuOL5xzXX56rR6"
            },
            {
              "email": "chingtetest@gmail.com",
              "img": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ1JRRUZEVUs4QTZTUjZmMTJJUGtEa2kyY3cifQ",
              "uid": "user_2gRQEJbMjRtskvg4egEVKSO5Z3o",
              "name": "哈利"
            }
          ])).toStrictEqual({payment:[
            {
                "妙麗": 600,
                "榮恩": 0,
                "哈利": 0
            },
            {
                "哈利": 900,
                "妙麗": 0,
                "榮恩": 0
            },
            {
                "哈利": 1000,
                "妙麗": 0,
                "榮恩": 0
            },
            {
                "妙麗": 200,
                "榮恩": 300,
                "哈利": 0
            }
        ],average:[
            {
                "榮恩": 300,
                "哈利": 300,
                "妙麗": 0
            },
            {
                "榮恩": 225,
                "妙麗": 225,
                "哈利": 450
            },
            {
                "妙麗": 333.33,
                "榮恩": 333.33,
                "哈利": 333.33
            },
            {
                "妙麗": 166.67,
                "哈利": 166.67,
                "榮恩": 166.67
            }
        ]})
    })
})