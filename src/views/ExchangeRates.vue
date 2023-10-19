<!-- eslint-disable no-undef -->
<template>
  <div class="ExchangeRates">
    <div class="Form">
      <h1>Currency Converter</h1>
      <div class="Enter_Amount">
        <h3>Enter Amount</h3>
        <input v-model="amount" type="number" name="Amount_num" id="Amount_num">
      </div>
      <div class="convert">

        <h3> Convert From: </h3>

        <select v-model="currencyCode.from">
          <option v-for="nc in filterCurrencyAPIDate" :key="nc.code" :value="{name: nc.code , code: parseInt(nc.number, 10)}"> {{nc.code}} </option>
        </select>

        <h3> Convert To: </h3>

        <select v-model="currencyCode.to">
          <option v-for="nc in filterCurrencyAPIDate" :key="nc.code" :value="{name: nc.code , code: parseInt(nc.number, 10)}"> {{nc.code}} </option>
        </select>

        <div>
          <h1 v-if="amount && costBuy">{{ amount }} {{ currencyCode.from.name }} equals {{ costBuy }} {{ currencyCode.to.name }}</h1>
        </div>
        <div>
        <h1>Develop info</h1>
          <div>
            <h1>{{ currencyCode.from }}</h1>
            <h1>{{ currencyCode.to }}</h1>
            <h1>{{ apiResponse }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import currency from 'currency-codes/data'

export default {
  data () {
    return {
      currencyAPIDate: currency,
      filterCurrencyAPIDate: [],
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
      targetNumbers: ['840', '978', '980'],
      apiResponse: [],
      amount: 0

    }
  },
  mounted: function () {
    axios.get('https://api.monobank.ua/bank/currency').then((res) => {
      this.apiResponse = res.data.slice(0, 3)
    })
    this.filterCurrencyAPIDate = this.currencyAPIDate.filter(item => this.targetNumbers.includes(item.number))
  },
  computed: {
    costBuy () {
      return this.calculateCurrencyExchangeAmount(this.amount, this.currencyCode.from.code, this.currencyCode.to.code)
    }
  },
  methods: {
    // calculateExchangeAmount (amount, fromCode, toCode) {
    //   if (fromCode === toCode) {
    //     const cost = amount
    //     return cost
    //   }
    //   const rateBuy = this.findRateByCurrencyCode(toCode)
    //   if (!rateBuy) return null
    //   if (fromCode === 980) {
    //     const cost = amount / rateBuy
    //     return cost.toFixed(2)
    //   }
    calculateCurrencyExchangeAmount (amount, fromCurrency, toCurrency) {
      if (fromCurrency && toCurrency && fromCurrency === toCurrency) {
        const cost = amount
        return cost
      }
      const exchangeRate = this.apiResponse.find(rate => (
        (rate.currencyCodeA === fromCurrency && rate.currencyCodeB === toCurrency) ||
        (rate.currencyCodeA === toCurrency && rate.currencyCodeB === fromCurrency)))

      if (exchangeRate) {
        if (exchangeRate.currencyCodeA === fromCurrency) {
          const cost = amount * exchangeRate.rateBuy
          return cost.toFixed(2)
        } else {
          const cost = amount / exchangeRate.rateBuy
          return cost.toFixed(2)
        }
      } else {
        return null
      }
    }
  },
  findRateByCurrencyCode (currencyCode) {
    const foundItem = this.apiResponse.find(item => item.currencyCodeA === currencyCode)
    if (foundItem) {
      return foundItem.rateBuy
    }
    return null
  }
}

</script>
