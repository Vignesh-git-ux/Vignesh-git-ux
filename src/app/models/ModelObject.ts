export abstract class ModelObject {
    
    public nestedassign(target:any, source:any) {
        Object.keys(source).forEach(sourcekey => {
          if (typeof source[sourcekey] === "object" && !(target[sourcekey] instanceof Array)) {
            target[sourcekey]=this.nestedassign(target[sourcekey],source[sourcekey]);
          } else {
            target[sourcekey]=source[sourcekey];
          }
        });
        return target;
    }
    public abstract convertJsonToModel() : void;
}

