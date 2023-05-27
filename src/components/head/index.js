import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import Translation from "../translation";

function Head({translation, current, onChangeLang}) {
  const handleOnChangeLang = useCallback((lang) => {
    onChangeLang(lang);
  }, []);
  return (
    <div className='Head'>
      <h1>{translation.title}</h1>
      <Translation current={current} onChangeLang={handleOnChangeLang}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
