<template>
    <div class="m-auto lg:w-1/3 h-screen ">

        <form class="bg-purple-500 w-full max-w-lg border border-purple-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <h1 class="text-white text-center text-lg font-bold py-5">{{ msg }}</h1>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="amount">
                    Amount
                    </label>
                    <input class="input-primary" id="amount" type="text" placeholder="1" v-model="amount" v-model.trim="$v.amount.$model">
                    <div v-if="$v.amount.$dirty"> 
                        <div class="validation-error" v-if="!$v.amount.required">Please type the amount</div>
                        <div class="validation-error" v-if="!$v.amount.decimal">Please type a decimal</div>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="from">
                    from
                    </label>
                    <div class="flex">
                        <img :src="currencyFromFlagImg" height="30" width="30" class="mr-1 rounded-full" alt="flag">
                        <div class="w-full relative">
                            <select v-model="selectedFrom" class="currency-select-style" id="from">
                                <option  
                                v-for="currency in currencyFromList"
                                v-bind:key="currency.id" 
                                :value="currency.currency" > 
                                    {{  currency.currency  }}  -   {{  currency.country  }}
                                </option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full  px-3 mb-6 md:mb-0">
                  <div class="flex item-center justify-center pt-2">
                  <button @click="changeCurrencyOPtion" >

                    <img src="/img/swap.svg" alt="swap" class="" width="30" height="30">
                  </button>
                  </div>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="to">to</label>
                    <div class="flex">
                        <img :src="currencyToFlagImg" height="30" width="30" class="mr-1 rounded-full" alt="flag">
                        <div class="w-full relative ">
                            
                            <select v-model="selectedTo" class="currency-select-style " id="to">
                                <option  
                                v-for="currency in currencyToList"
                                v-bind:key="currency.id" 
                                :value="currency.currency"
                                >
                                {{  currency.currency  }} - {{  currency.country  }}
                                </option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-2 mt-6">
                <div class="w-full  px-3 mb-6 md:mb-0">
                    <button type="button"  class="btn-primary"  
                    v-bind:class="{ 'opacity-50':getLoading, 'cursor-not-allowed':getLoading }"  :disabled="getLoading"  @click="convertCurrency" >  
                    convert
                    </button>
                </div>
            </div>

            <div v-if='submittedForm' class="flex flex-wrap -mx-3 mb-2 mt-6">
                <p class="typo__p validation-error" v-if="submitStatus === 'ERROR'">Opss look like you have errors on the form, please recheck thanks </p>
                
                <div v-if="getError">
                    <p class="validation-error" > Hey Server busy please try again later </p>
                </div>

                <div class="w-full  px-3 mb-6 md:mb-0" v-else>
                    <div class="flex item-center justify-center pt-1">
                        <p v-if="getLoading" class="uppercase text-white py-1 ">loading...</p>
                    <p v-else class="uppercase  text-purple-500 py-3 px-2 w-full bg-gray-200 font-bold text-center"> {{ getFinalResult }} </p>
                    </div>
                </div>
            </div>
        </form>

        <h1 class="pl-2 text-purple-500 ">Data source provided by <span class="italic font-bold">exchangeratesapi.io</span> </h1>
        <ul>
          <li class="text-xs pl-2 text-red-500">There is no guratee for data source working 100%, since its a free service</li>
          <li class="text-xs pl-2 text-red-500">Some of the currency is missing such as vnd because api does not support</li>
          <li class="text-xs pl-2 text-red-500">All rate is according to European Central Bank</li>
        </ul>
        
        <h3 class="pl-2 text-purple-500 ">App built by vuejs and tailwind css</h3>
    </div>
</template>

<script>
import { required ,  decimal} from 'vuelidate/lib/validators'
export default {
  name: 'Currency',
  data:function(){
      return {

        amount : '',
        submitStatus : '',
        submittedForm : false,
        flagfolder : '/img/flag/',
        flagExtension : '.svg',
        selectedFrom : 'USD',
        selectedTo : 'AUD',

    }
  },
  validations: {
    amount: {
      required,decimal
    },


  },
  computed : {
    currencyToFlagImg:function(){
        return this.flagfolder + this.selectedTo.toLowerCase() + this.flagExtension 
    },
    currencyFromFlagImg:function(){
        return this.flagfolder + this.selectedFrom.toLowerCase() + this.flagExtension 
    },
    currencyToList:function(){

      function compare(a, b) {
        if (a.currency < b.currency)
          return -1;
        if (a.currency > b.currency)
          return 1;
        return 0;
      }
      return this.$store.state.currencyList.slice().sort(compare);
    },
    currencyFromList:function(){
      return this.$store.state.currencyList;
    },
    getFinalResult:function(){
      return 'result is ' + this.$store.state.convertedAmount;
    },
    getLoading:function(){
      return this.$store.state.loading;
    },
    getError:function(){
      return  this.$store.state.apiError;
    },
    

  },

  methods:{


      convertCurrency:function(e){
          e.preventDefault()
          
        this.$v.$touch()
        if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
        } else {
        
            this.$store.dispatch('CallConvertCurrencyApi',{
                amount : Math.abs(this.amount) ,
                from : this.selectedFrom ,
                to : this.selectedTo,
            })

            this.submittedForm = true ;
            this.submitStatus = ''
        }
      },
      changeCurrencyOPtion : function(e){
        e.preventDefault();
        console.log('change action')
        let to = this.selectedTo
        let from = this.selectedFrom
        this.selectedFrom  = to
        this.selectedTo    = from

      }


  },
  

  props: {
    msg: String
  }
}
</script>
