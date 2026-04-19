/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

type Constructor = new (...args: any[]) => object;

const generators = new WeakMap<Constructor, IdGenerator>();

/* Get stable incremental id for object, scoped per class
 * Same object always returns same id within same class scope
 **/
export function getId (cls: Constructor, obj: object): number {
  let gen = generators.get(cls);
  if (!gen) {
    gen = new IdGenerator();
    generators.set(cls, gen);
  }
  return gen.get(obj);
}

class IdGenerator {
  private ids = new WeakMap<object, number>();
  private counter = 0;

  get (obj: object): number {
    let id = this.ids.get(obj);
    if (id === undefined) {
      id = this.counter++;
      this.ids.set(obj, id);
    }
    return id;
  }
}
