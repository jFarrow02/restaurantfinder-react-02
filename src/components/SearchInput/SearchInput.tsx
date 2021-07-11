import SearchInputInterface from "./SearchInputInterface";

const SearchInput = (props: SearchInputInterface) => {

    const {
        name,
        children,
        inputClasses,
        value,
        onClick,
        labelText,
        description,
    } = props;

    return(
        <div className="SearchInput">
            <label>
                {description}
                <input
                    type="radio"
                    name={name}
                    value={value}
                    onClick={() => {onClick()}}
                />
            </label>
            <div className={inputClasses}>
                <label>
                    {labelText}
                    {children}
                </label>
            </div>
        </div>
    )
}

export default SearchInput;