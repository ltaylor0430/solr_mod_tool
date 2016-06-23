export class  MaterialSelectController {
  constructor() {

    this.onSelectItemChange = (item) => {
      this.selectedItem = item;
      this.expanded = false;
    };
  }
}
