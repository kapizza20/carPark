import React from "react";
import {Field, reduxForm} from "redux-form";

class NewCinoviForm extends React.Component{

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
            <input placeholder="" {...input}/>
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
            <Field label="Унесите назив чина" name="NazivCina" component={this.renderInput}/>
            <button className="ui button primary">Унеси</button>
         </form>
      )
   }

}

const validate=(formValues)=>{
   
   const errors={};
   if(!formValues.NazivCina){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.NazivCina="Морате унети назив чина";
   }
   if(formValues.NazivCina){
   if(formValues.NazivCina.length>30){
      //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
      errors.NazivCina="Назив чина мора бити мањи од 30 карактера";
   }
   // if(formValues.NazivMarke.replace("<", '')){
   //    //errors pa njegovi atributi moraju da se slazu sa imenima onog sto validitiraju
   //    errors.NazivMarke="";
   // }
   }
   return errors;
}

export default reduxForm(
   {
      form:'NewCinoviForm',
      //validate:validate ->
      validate
   }
)(NewCinoviForm);
