import './BoroughSearchButton.scss';
import { useState, useEffect } from 'react';

const BoroughSearchButton = (props: any) => {

    const [ displayText, setDisplayText ] = useState<string[]>([]);

    const {
        text,
        clickHandler,
        searchValue,
    } = props;

    useEffect(() => {
        const parsedText = [ text.slice(0, 3), text.slice(3)];
        setDisplayText(parsedText);
    }, []);

    return(
        <button className="BoroughSearchButton"
            onClick={() => clickHandler(searchValue) }
        >
            <span className='BoroughSearchButton_text'>
                {displayText[0]}
            </span>
            <span className='BoroughSearchButton_text'>
                {displayText[1]}
            </span>
        </button>
    );
};

export default BoroughSearchButton;