import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import Translation from "../translation";

function Head({translation, currentLang, onChangeLang}) {
  const handleOnChangeLang = useCallback((lang) => {
    onChangeLang(lang);
  }, []);
  return (
    <div className='Head'>
      <h1>{translation}</h1>
      <Translation currentLang={currentLang} onChangeLang={handleOnChangeLang}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
