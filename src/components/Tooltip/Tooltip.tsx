import { useEffect, useState } from 'react';
import './Tooltip.scss';
import TooltipInterface
 from '../../interfaces/TooltipInterface';

const Tooltip = (props: TooltipInterface) => {

    const [parentPosition, setParentPosition] = useState({});

    const { position, text, show } = props;

    const getIconPosition = (selector: string):any => {
        return document.querySelector(selector)?.getBoundingClientRect();
      };
  
      const iconSelector = 'span.Sidebar-icon';

    useEffect(() => {
        setParentPosition(getIconPosition(iconSelector));
    }, []);

    const setStyles = (position: any) => {
        const { 
            top,
            height,
            width,
            left,
            bottom,
            right,
            x,
            y,
        } = position;
        return {
            top: 0 + 'px',
            right: (width + 15) + 'px',
            width: '150px',
        };
    }

    const setClassNames = ():string => {
        let classes = 'Tooltip ';
        switch(position) {
            case 'right':
                classes+= 'right ';
                break;
            case 'bottom':
                classes+= 'bottom ';
                break;
            case 'left':
                classes+= 'left ';
                break;
            case 'top':
            default:
                classes+= 'top '; 
        }
        classes = show ? classes+= 'visible ' : classes+= 'hidden ';

        return classes;
    }

    const classNames = setClassNames();
    const styles = setStyles(parentPosition);
    
    return (
        <div style={{...styles}} className={classNames}>
            {text}
        </div>
    );
};

export default Tooltip;