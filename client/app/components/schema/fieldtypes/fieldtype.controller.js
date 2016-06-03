class FieldTypeController {
 constructor($log, SchemaLoader) {
    this.fieldType = {};
    this.test = 'test!';
    this.addParam = (param) => {
        $log.debug(param);

        this.fieldType['param.name'] = param.value;

    };

 }
}
  export {FieldTypeController};

