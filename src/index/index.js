'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './search.less'
import logo from './images/ico.png'

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text : 'hellowAhahahahhahahilis',
            setArr : [1,2,3]
        }
    }
    render () {
        const text=this.state.text;

        return <div className="search-text">
               {text}
                <img src={ logo }/>
            </div>
    }
    componentWillMount(){
        // Array.prototype.MyMap = function(fn , context) {
        //     let arr = Array.prototype.slice.call(this);
        //     let mappedArr =[];
        //     for(let i=0 ; i<arr.length ; i++){
        //         mappedArr.push( fn.call(context,arr[i],i,this))
        //     }
        //     return mappedArr
        // }


        // var obj = {0:'hello',1:'world',length:2};
        // console.log(Array.prototype.slice.call(obj));//["hello", "world"]
        // Array.prototype.myReduce = function(fn, initialValue) {
        //     var arr = Array.prototype.slice.call(this);
        //     var res, startIndex;
        //     res = initialValue ? initialValue : arr[0];
        //     startIndex = initialValue ? 0 : 1;
        //     for(var i = startIndex; i < arr.length; i++) {
        //       res = fn.call(null, res, arr[i], i, this);
        //     }
        //     return res;
        // }
          
        //实现apply只要把下一行中的...args换成args即可 
        // Function.prototype.myCall = function(context = window, ...args) {
        //     let func = this;
        //     let fn = Symbol("fn");
        //     context[fn] = func;
        
        //     let res = context[fn](...args);//重点代码，利用this指向，相当于context.caller(...args)
        
        //     delete context[fn];
        //     return res;
        // }

    }
    

}

ReactDom.render(
    <Search/>,
    document.getElementById('root')
)