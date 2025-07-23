function InputFloating({ label, name, type, messageError = "" }) {

    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" name={name} placeholder={label} />
            <label htmlFor={name}>{label}</label>
            <small className="text-danger">{messageError}</small>
        </div>
    );
}

export default InputFloating;