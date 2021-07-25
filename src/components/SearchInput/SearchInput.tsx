import SearchInputInterface from "../../interfaces/SearchInputInterface";
import './SearchInput.scss';

const SearchInput = (props: SearchInputInterface) => {

    const {
        children,
        description,
        inputClasses,
        labelText,
        name,
        onClick,
        value,
    } = props;

    return(
        <div className="SearchInput">
            <div className="SearchInput_label">
                <label>
                    <input
                        type="radio"
                        name={name}
                        value={value}
                        onClick={() => {onClick()}}
                    />
                    {description}
                </label>
            </div>
            <div className="SearchInput_input">
                <div className={inputClasses + ' input_wrapper'}>
                    <span>
                        {labelText}:
                    </span>
                    <div className="SearchInput_input-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchInput;