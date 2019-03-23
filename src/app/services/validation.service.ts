import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
returnObj ={
  msg: "",
  status:true
}
  constructor() { 

  }

//main function 
mainValidate(inputArr:any){
  
  for(let a=0;a<=inputArr.length();a++){
 if (this.validate(inputArr[a].name,inputArr[a].value1,inputArr[a].value2)){ 
   continue
}else{
 
  break;
}
  }
  return this.returnObj;
 }


validate(name:any,value1:any,value2:any){

  if(name=="name"){
    return (this.validateName(value1))?true:this.returnObj.msg ="Name Field is Not Valid",this.returnObj.status=false;
  }
  if(name=="email"){
    return (this.emailAddress(value1))?true:this.returnObj.msg ="Email Field is Not Valid",this.returnObj.status=false;
  }
  if(name=="dateCompare"){
    return (this.validateFromToDate(value1,value2))?true:this.returnObj.msg ="Date Format is Not Valid",this.returnObj.status=false;
  }
  if(name=="phone"){
    return (this.validatePhoneNumber(value1))?true:this.returnObj.msg ="Number Format is Not Valid",this.returnObj.status=false;
  }

}
 
private  validateName(value:any) {
  return (value.match(/^[A-Za-z]+$/)) ? true:false
  }
  private emailAddress(value:any){
return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? true :false
  }
private maxLength(){}

private validateFromToDate(fromdate:any,todate:any){
  let dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
 if ((fromdate.match(dateformat))&& (todate.match(dateformat))){
  var frdate = new Date(fromdate);
  var tdate =  new Date(todate);
  return (frdate<=tdate)?true:false;
 }
 else{
   return false;
 }
}
private validatePhoneNumber(num:any){
 let numformat= /^[0-9]+$/
if((num.toString().length !=10) ||(num.match(numformat)==false) ){
return false;
}else{ return true}
}   

}


