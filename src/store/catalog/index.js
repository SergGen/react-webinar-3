import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import {Api} from "../../api";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load(currentPage, perPage = 10) {
    const skip = perPage * (currentPage - 1);
    const json = await Api.getCatalog(skip, perPage);
    const pageAmount = Math.ceil(json.result.count / perPage);
      this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      perPage,
      pageAmount
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
