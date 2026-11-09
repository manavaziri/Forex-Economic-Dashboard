import "./Header.css";

function Header({ mainText, subText, symbol }) {
  return (
    <header className="header">

      <div className="header-text">
        <h1 className="header-mainText">
          {mainText}
        </h1>

        <h4 className="header-subText">
          {subText}
        </h4>
      </div>

      <div className="header-symbol">
        {symbol}
      </div>

    </header>
  );
}

export default Header;