import currency from 'currency-codes/data';

export default (await import('vue')).defineComponent({
data() {
return {
cc: currency,
currencyCode: {
from: {
name: '',
code: 0
},
to: {
name: '',
code: 0
}
},

apiResponse: [],
costBuy: 0,
amount: {}
};
},
mounted: function () {
// axios.get('https://api.monobank.ua/bank/currency').then((res) => {
//   this.apiResponse = res.data
// })
this.amount = () => {
if (this.currencyCode.from.code == 980) {
this.costBuy = this.amount * 0.0001;

}
},
        ;
},
});
