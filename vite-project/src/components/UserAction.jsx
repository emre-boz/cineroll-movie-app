import { useState } from 'react';

function UserAction({ deviceType, icon, activeIcon, actionDescription, id, onClick }) {
  const [isActive, setIsActive] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
  
      className='user-action'
      onMouseEnter={() => deviceType === "Desktop" && setTooltipVisible(true)}
      onMouseLeave={() => deviceType === "Desktop" && setTooltipVisible(false)}
      onClick={toggleMenu}
    >
      <img
     
        src={isActive ? activeIcon : icon}
        alt={`${id}-icon`}
        className={`user-action-image ${isActive ? "is-active" : ""}`}
      />

      {isTooltipVisible && <div className="tooltip">{actionDescription}</div>}
    </div>
  );
}

export default UserAction;