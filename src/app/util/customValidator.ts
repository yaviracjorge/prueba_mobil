import {AbstractControl, ValidatorFn} from "@angular/forms";

export function EqualPasswordValidator(firstControl:string,secondControl:string){
  return (control:AbstractControl)=>{
    const firstValue = control.get(firstControl)?.value;
    const secondValue = control.get(secondControl)?.value;

    if (firstValue !== secondValue){
      return {notEqual:true};
    }
    return null;
  }
}


export function SearchValidator(control:AbstractControl) {
  const value = control.value;
  if(value == null){
    return null;
  }
  const specialChart = /[@./*+!?¿_]/;
  const hasSpecialChart = specialChart.test(value);
  if(hasSpecialChart){
    return null;
  }
  return {notSpecialChart:true};
}

export  function emailUserValidator(control:AbstractControl) {
  const value = control.value;
  if((value == null)|| value.indexOf("@") === -1){
    return null;
  }
  const part = value.split("@");
  const username = part[0];
  const chart = /^[a-z]+[a-z0-9_]*$/
  const hasChart = chart.test(username);
  if(hasChart){
    return null;
  }
  return {notUser:true};
}

export function emailDomainValidator(control:AbstractControl) {
  const value = control.value;
  if((value == null)|| value.indexOf("@") === -1){
    return null;
  }
  const part = value.split("@");
  const email = part[1];
  const chart = /^(gmail|hotmail)\.(com|es)$/
  const hasDomain = chart.test(email);
  if(hasDomain){
    return null;
  }
  return {notDomain:true};
}

export function spaceValidator():ValidatorFn{
  return(control:AbstractControl)=>{
    let spaceRegex = /\s/;
    const value = control.value;
    if(!value) return null;
    if(spaceRegex.test(value)){
      return {hasSpace:true};
    }
    return null;
  }
}

//valida que exista un numero
export function numberValidator():ValidatorFn{
  return (control:AbstractControl)=>{
    let numberRegex = /[0-9]+/;
    const value = control.value;
    if(!value) return null;
    if(!numberRegex.test(value)){
      return {notNumber:true};
    }
    return null;
  }
}

export function hasNumberValidator():ValidatorFn{
  return (control:AbstractControl)=>{
    let numberRegex = /[0-9]+/;
    const value = control.value;
    if(!value) return null;
    if(numberRegex.test(value)){
      return {notNumber:true};
    }
    return null;
  }
}
