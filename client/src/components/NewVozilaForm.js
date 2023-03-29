import React from "react";
import {Field, reduxForm} from "redux-form";
import Select from 'react-select';

class NewVozilaForm extends React.Component{
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
         labelForInit=options.find(e=>(e[input.name]==input.value))[OptionLab];
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
            <Field label="Унесите регистарски број" name="OznakaTablica" component={this.renderInput}/>
            <Field label="Унесите ВИН број" name="VINBroj" component={this.renderInput}/>
            <Field OptionLab="NazivMarke" OptionVal="IDMarkeVozila" options={this.props.marke} label="Изабери марку" name="IDMarkeVozila" component={this.renderSelect}/>
            <Field OptionLab="NazivTipa" OptionVal="IDTipa" options={this.props.tipovi} label="Изабери тип" name="IDTipa" component={this.renderSelect}/>
            <Field OptionLab="NazivStatusa" OptionVal="IDStatusa" options={this.props.statusi} label="Изабери статус" name="IDStatusa" component={this.renderSelect}/>
            <button className="ui button primary">Унеси</button>
         </form>
      )
   }

}

const validate=(formValues)=>{
   
   const errors={};
   if(!formValues.OznakaTablica){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.OznakaTablica="Морате унети ознаку таблица";
   }
   if(!formValues.VINBroj){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.VINBroj="Морате унети VIN";
   }
   if(!formValues.IDMarkeVozila){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.IDMarkeVozila="Морате изабрати марку";
   }
   if(!formValues.IDTipa){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.IDTipa="Морате изабрати тип";
   }
   if(!formValues.IDStatusa){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.IDStatusa="Морате изабрати статус";
   }
   if(formValues.OznakaTablica){
   if(formValues.OznakaTablica.length>10){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.OznakaTablica="Ознака таблица мора бити мањи од 10 карактера";
   }
   if(formValues.VINBroj){
   if(formValues.VINBroj.length>17){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.VINBroj="VIN-Број мора бити мањи од 17 карактера";
   }
   // if(formValues.NazivTipa.replace("<", '')){
   //    //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
   //    errors.NazivTipa="";
   // }
   }
   }
   return errors;

}


export default reduxForm(
   {
      form:'NewVozilaForm',
      //validate:validate ->
      validate,
      enableReinitialize: true
   }
)(NewVozilaForm);
