import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({


    state: {
        convertedAmount: '' ,
        loading: false ,
        apiError : false ,
        convertResult : null,
        currencyList : [
            { id: 31, country: 'US dollar', currency: 'USD' },
            { id: 6, country: 'China', currency: 'CNY' },
            { id: 33, country: 'Euro', currency: 'EUR' },
            { id: 1, country: 'Australian dollar', currency: 'AUD' },
            { id: 2, country: 'Brazilian real', currency: 'BRL' },
            { id: 3, country: 'Bulgarian lev', currency: 'BGN' },
            { id: 4, country: 'Canadian dollar', currency: 'CAD' },
            { id: 5, country: 'Swiss franc', currency: 'CHF' },
            { id: 7, country: 'Czech koruna', currency: 'CZK' },
            { id: 8, country: 'Danish krone', currency: 'DKK' },
            { id: 9, country: 'Danish krone', currency: 'DKK' },
            { id: 10, country: 'Pound sterling', currency: 'GBP' },
            { id: 11, country: 'Hong Kong dollar', currency: 'HKD' },
            { id: 12, country: 'Croatian kuna', currency: 'HRK' },
            { id: 13, country: 'Hungarian forint', currency: 'HUF' },
            { id: 14, country: 'Indonesian rupiah', currency: 'IDR' },
            { id: 15, country: 'Israeli shekel', currency: 'ILS' },
            { id: 16, country: 'Indian rupee', currency: 'INR' },
            { id: 17, country: 'Icelandic krona', currency: 'ISK' },
            { id: 18, country: 'Japanese yen', currency: 'JPY' },
            { id: 19, country: 'South Korean won', currency: 'KRW' },
            { id: 20, country: 'Mexican peso', currency: 'MXN' },
            { id: 21, country: 'Malaysian ringgit', currency: 'MYR' },
            { id: 22, country: 'Norwegian krone', currency: 'NOK' },
            { id: 23, country: 'Philippine peso', currency: 'PHP' },
            { id: 24, country: 'Polish zloty', currency: 'PLN' },
            { id: 25, country: 'Romanian leu', currency: 'RON' },
            { id: 26, country: 'Russian rouble', currency: 'RUB' },
            { id: 27, country: 'Swedish krona', currency: 'SEK' },
            { id: 28, country: 'Singapore dollar', currency: 'SGD' },
            { id: 29, country: 'Thai baht', currency: 'THB' },
            { id: 30, country: 'Turkish lira', currency: 'TRY' },
            { id: 32, country: 'South African rand', currency: 'ZAR' },
        ],



    },

    actions:{

        CallConvertCurrencyApi(context,payload){

          context.commit('setLoadingToTrue' )
          axios.get(`https://api.exchangeratesapi.io/latest?base=${payload.from}&symbols=${payload.to}`, )
          .then(data => {
            let returnData = data.data.rates 

   
                Object.entries(returnData).map(entry => { 
                    let convertedRate = entry[1]; 
                    // console.log("conversion rate is : " + convertedRate);
                    // console.log("conversion amount is  : " + payload.amount);
                    // console.log("result is   : " + payload.amount * convertedRate );
                    
                    const finalResult = (payload.amount * convertedRate).toFixed(2) 
                    context.commit('mutateConvertedData' , finalResult)
                    console.log("FINAL result is   : " + context.state.convertedAmount );

                    context.commit('setLoadingToFalse' )
                  }); 
                  
                  
                  
                })
                .catch(error => {
                  console.log(error )
                  context.commit('setApiError' )
                  context.commit('setLoadingToFalse' )
                  
           })
           .finally(
            //context.commit('setLoadingToFalse' )

           )


            
        },


    },

    getters:{

    },

    mutations: {
        mutateConvertedData (state , returnData) {
          state.convertedAmount = returnData ;
        },
        setLoadingToTrue (state ) {
            state.loading = true ;
        },
        setLoadingToFalse (state ) {
            state.loading = false ;
        },
        setApiError(state ) {
            state.apiError = true  ;
        },
    },


})