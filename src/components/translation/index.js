import {memo} from "react";

function Translation({current, onChangeLang}) {
  const handleOnchangeLang = (e) => {
    onChangeLang(e.target.value);
  }
  return (
    <form>
      <input
        type="radio"
        id="ruChoice"
        name="translation"
        value="ru"
        checked={current === 'ru'}
        onChange={handleOnchangeLang}
      />
      <label htmlFor="ruChoice">Ru</label>

      <input
        type="radio"
        id="enChoice"
        name="translation"
        value="en"
        checked={current === 'en'}
        onChange={handleOnchangeLang}
      />
      <label htmlFor="enChoice">En</label>
    </form>
  );
}

export default memo(Translation);
