import SearchInputInterface from "../../interfaces/SearchInputInterface";
import './SearchInput.scss';

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
            <div className="SearchInput_label">
                <label>
                    {description}
                    <input
                        type="radio"
                        name={name}
                        value={value}
                        onClick={() => {onClick()}}
                    />
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