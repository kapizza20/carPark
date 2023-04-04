import React from "react";
import {Field, reduxForm} from "redux-form";
import Select from 'react-select';

class NewVozaciForm extends React.Component{
   renderError=({error , touched})=>{
      if(touched && error){
         return(
         <div className="ui error message">
         <div className="header">{error}</div>
         </div>
         )
      }
   }

   renderInput=({input,label,meta})=>{
      //console.log(meta);
      //u meta nam stoji error mes
      //input potice iz formProps, kao i label samo sto su ovde izvuceni
      //console.log(formProps); 
      const className= `field ${meta.error && meta.touched ? 'error':''}`
      return(
         /*
         <input onChange={formProps.input.onChange} 
            value={formProps.input.value}
         />
         */
        <div className={className}>
            <label>{label}</label>
            <input {...input}/>
            {this.renderError(meta)}
        </div>
        
      )
   }



   renderSelect=({options,label,meta,OptionLab,OptionVal,input,name,id})=>{
      let labelForInit="";
      //console.log('in',input.name); //Daje naziv kolone gde je ID
      options.forEach(element => {
         //console.log(element);
         //console.log(element[input.name]) //Uzeo sam ID od elementa
         if(input.value){
         labelForInit=options.find(e=>(e[input.name]===input.value))[OptionLab];
         }
         //console.log(a);
         // console.log(element[OptionLab]);
         // console.log(options.find(e => e[input.name]==input.value));
      })
      const className= `field ${meta.error && meta.touched ? 'error':''}`;
      return(
         <div className={className}>
            <label>{label}</label>
            <Select
            {... input}
            id={id} 
            name={name} 
            options={options}
            isSearchable
            noOptionsMessage={()=>"Нема унетих опција..."}
            getOptionLabel ={(option)=> option[OptionLab]}  //RECI MU DA JE TO ONAJ GORE OPTION LAB....
            getOptionValue ={(option)=> option[OptionVal]}
            value={input.value[OptionVal]}
            placeholder={labelForInit}  //nastavi posle ono find ce vrati ceo taj E kao objekat onaj jos samo da mu izbucem po OptionLabu sta treba
            onChange={(value) => input.onChange(value[OptionVal])}
            onBlur={()=> input.onBlur()}
            //defaultValue={input.value[OptionVal] ?  {lable:OptionLab,value:OptionVal}:null}
            />
            {this.renderError(meta)}
        </div>
      )
   }

   onSubmit=(formValues)=>{
      //formValues sadrzi sve podatke forme sa njihovim name propertijem
      //console.log(formValues);
      console.log(formValues);
      this.props.onSubmit(formValues);
   }

   render(){
      //console.log(props) - ovde se vidi da sad ima i form props
      //forma mora da ima klasu error zbog semantic UI da bi se ispisao error
      //handeSubmit je build in u redux form i ona radi ono osnovno e.preventDefault i to
      return (
         <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
            <Field label="Унесите ЈМБГ" name="JMBG" component={this.renderInput}/>
            <Field label="Унесите име" name="ImeVozaca" component={this.renderInput}/>
            <Field label="Унесите презиме" name="PrezimeVozaca" component={this.renderInput}/>
            <Field label="Унесите број телефона" name="BrojTel" component={this.renderInput}/>
            <Field OptionLab="NazivCina" OptionVal="IDCina" options={this.props.cinovi} label="Изабери чин" name="IDCina" component={this.renderSelect}/>
            <button className="ui button primary">Унеси</button>
         </form>
      )
   }

}

const validate=(formValues)=>{
   
   const errors={};
   if(!formValues.JMBG){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.JMBG="Морате унети ЈМБГ";
   }
   if(!formValues.ImeVozaca){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.ImeVozaca="Морате унети име";
   }
   if(!formValues.PrezimeVozaca){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.PrezimeVozaca="Морате унети презиме";
   }
   if(!formValues.BrojTel){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.BrojTel="Морате унети број телефона";
   }
   if(!formValues.IDCina){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.IDCina="Морате изабрати чин";
   }
   if(formValues.JMBG){
   if(formValues.JMBG.length==13){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.OznakaTablica="ЈМБГ мора бити 13 карактера";
   }
   if(formValues.ImeVozaca){
   if(formValues.ImeVozaca.length>20){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.VINBroj="Име мора бити мањи од 20 карактера";
   }
   }

   if(formValues.PrezimeVozaca){
   if(formValues.PrezimeVozaca.length>20){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.PrezimeVozaca="Презиме мора бити мањи од 20 карактера";
   }
   }

   if(formValues.BrojTel){
   if(formValues.BrojTel.length>12){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.BrojTel="Број телефона мора бити мањи од 12 карактера";
   }
   }
   // if(formValues.NazivTipa.replace("<", '')){
   //    //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
   //    errors.NazivTipa="";
   // }
   
   }
   return errors;

}


export default reduxForm(
   {
      form:'NewVozaciForm',
      //validate:validate ->
      validate,
      enableReinitialize: true
   }
)(NewVozaciForm);
