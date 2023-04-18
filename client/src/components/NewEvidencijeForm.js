import React from "react";
import {Field, reduxForm} from "redux-form";
import Select from 'react-select';

class NewEvidencijeForm extends React.Component{
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


   renderInputDate=({input,label,meta})=>{
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
            <input type="date" {...input}/>
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
            placeholder={labelForInit}  //nastavi posle ono find ce vrati ceo taj E kao objekat onaj jos samo da mu izvucem po OptionLabu sta treba
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
            <Field label="Унесите број налога" name="BrojNaloga" component={this.renderInput}/>
            <Field label="Унесите датум изласка" name="DatumIzlaska" component={this.renderInputDate}/>
            <Field label="Унесите датум повратка" name="DatumPovratka" component={this.renderInputDate}/>
            <Field OptionLab="ImeVozaca" OptionVal="IDVozaca" options={this.props.vozaci} label="Изабери возача" name="IDVozaca" component={this.renderSelect}/>
            <Field OptionLab="OznakaTablica" OptionVal="IDVozila" options={this.props.vozila} label="Изабери возило" name="IDVozila" component={this.renderSelect}/>
            <button className="ui button primary">Унеси</button>
         </form>
      )
   }

}

const validate=(formValues)=>{
   
   const errors={};
   if(!formValues.BrojNaloga){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.BrojNaloga="Морате унети";
   }
   if(!formValues.DatumIzlaska){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.DatumIzlaska="Морате унети";
   }
   if(!formValues.IDVozaca){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.IDVozaca="Морате изабрати";
   }
   if(!formValues.IDVozila){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.IDVozila="Морате изабрати";
   }
   if(formValues.BrojNaloga){
   if(formValues.BrojNaloga.length>20){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.BrojNaloga="Мора бити мањи од 20 карактера";
   }
   if(formValues.DatumIzlaska && formValues.DatumPovratka){
   if(formValues.DatumIzlaska > formValues.DatumPovratka){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.DatumIzlaska="След догађаја изласка и повратка није могућ";
   }
   }
   if(formValues.DatumPovratka){
   if(formValues.DatumPovratka < formValues.DatumIzlaska){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.DatumPovratka="След догађаја изласка и повратка није могућ";
   }
   }
   
   }
   return errors;

}


export default reduxForm(
   {
      form:'NewEvidencijeForm',
      //validate:validate ->
      validate,
      enableReinitialize: true
   }
)(NewEvidencijeForm);
