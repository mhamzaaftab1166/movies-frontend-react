import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  //item array h
  const startindex = (pageNumber - 1) * pageSize;
  return _(items).slice(startindex).take(pageSize).value();
  //-(item) yh array ko lodash item me chng kry ga slice array value display kry ga aur take page ko hndle kry ga page ka size
}
