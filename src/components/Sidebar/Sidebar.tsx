import './Sidebar.scss';

const Sidebar = (props: any) => {

    const origin = {
        x: 0,
        y: 0,
    };

    return (
        <div className='Sidebar'>
            <span className='Sidebar-nav'>
              <button type='button'
                onClick={() => {props.scrollToLocation(origin)}}
              >
                SEARCH
                </button>
            </span>
          </div>
    )
};

export default Sidebar;