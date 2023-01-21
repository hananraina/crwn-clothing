import './form-input.styles.scss'

function FormField({label,...otherProps}){
    return(<div className="group">
        <input className="form-input" 
            {...otherProps}/>  
            {label && (
                <label className={`${otherProps.value.length ? 'shrink':''} form-input-label`}>{label}</label>
            )}
            
        </div>
    );
};
export default FormField;