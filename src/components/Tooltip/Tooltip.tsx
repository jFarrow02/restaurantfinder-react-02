import { useEffect, useState } from 'react';
import './Tooltip.scss';
import TooltipInterface from '../../interfaces/TooltipInterface';
import BoundingClientRectInterface from '../../interfaces/BoundingClientRectInterface';

const Tooltip = (props: TooltipInterface) => {

    const [parentPosition, setParentPosition] = useState<BoundingClientRectInterface>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    });

    const { position, text, show } = props;

    const getIconPosition = ():any => {
        return document.querySelector(props.selector)?.getBoundingClientRect();
      };
  
      // const iconSelector = 'span.Sidebar-icon';

    useEffect(() => {
        setParentPosition(getIconPosition());
    }, []);

    const setStyles = (position: BoundingClientRectInterface) => {
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