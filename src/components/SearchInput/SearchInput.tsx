import SearchInputInterface from "./SearchInputInterface";

const SearchInput = (props: SearchInputInterface) => {

    const {
        name,
        children,
        inputClasses,
        value,
        onClick,
    } = props;

    return(
        <div className="SearchInput">
            <label>
                Find Restaurants by Borough:
                <input
                    type="radio"
                    name={name}
                    value={value}
                    onClick={() => {onClick(value)}}
                />
            </label>
            <div className={inputClasses}>
                <label>
                    Select Borough:
                    {children}
                </label>
            </div>
        </div>
    )
}

export default SearchInput;