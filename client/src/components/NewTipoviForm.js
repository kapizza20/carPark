import React from "react";
import {Field, reduxForm} from "redux-form";

class NewTipoviForm extends React.Component{

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
            <input placeholder="(Putnicko)" {...input}/>
            {this.renderError(meta)}
        </div>
        
      )
   }

   onSubmit=(formValues)=>{
      //formValues sadrzi sve podatke forme sa njihovim name propertijem
      //console.log(formValues);
      this.props.onSubmit(formValues);
   }

   render(){
      //console.log(props) - ovde se vidi da sad ima i form props
      //forma mora da ima klasu error zbog semantic UI da bi se ispisao error
      //handeSubmit je build in u redux form i ona radi ono osnovno e.preventDefault i to
      return (
         <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
            <Field label="Унеси назив типа" name="NazivTipa" component={this.renderInput}/>
            <button className="ui button primary">Unesi</button>
         </form>
      )
   }

}

const validate=(formValues)=>{
   
   const errors={};
   if(!formValues.NazivTipa){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.NazivTipa="Morate uneti naziv marke";
   }
   if(formValues.NazivTipa){
   if(formValues.NazivTipa.length>20){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.NazivTipa="Naziv marke mora biti manji od 20 karaktera";
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
      form:'NewTipoviForm',
      //validate:validate ->
      validate
   }
)(NewTipoviForm);
