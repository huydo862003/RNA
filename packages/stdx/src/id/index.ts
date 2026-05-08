/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

type Constructor = new (...arguments_: any[]) => Record<string, unknown>;

const generators = new WeakMap<Constructor, IdGenerator>();

/* Get stable incremental id for object, scoped per class
 * Same object always returns same id within same class scope
 **/
export function getId (cls: Constructor, object: Record<string, unknown>): number {
  let generate = generators.get(cls);

  if (!generate) {
    generate = new IdGenerator();
    generators.set(cls, generate);
  }

  return generate.get(object);
}

class IdGenerator {
  private ids = new WeakMap<Record<string, unknown>, number>();
  private counter = 0;

  get (object: Record<string, unknown>): number {
    let id = this.ids.get(object);

    if (id === undefined) {
      id = this.counter++;
      this.ids.set(object, id);
    }

    return id;
  }
}
