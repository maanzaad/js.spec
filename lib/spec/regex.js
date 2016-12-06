import Spec from './spec'
import Predicate from './predicate'
import { dt, getName } from '../util'
import * as p from '../predicates'
import { invalid } from '../symbols'

export class Regex extends Spec {
    conform(value) {
        const conformed = dt(val => this.options.re.test(val), value);
        return conformed === invalid ? invalid : conformed;
    }

    explain(path, via, value) {
        if (!this.options.re.test(value)) {
            return [{
                path,
                via: [...via, getName(this)],
                value,
                regex: this.options.re
            }]
        }
        return [null]
    }

    toString() {
        return this.name || `Regex(${getName(this.re)})`
    }
}

export default function regex(re) {
    if (!re || !p.regex(re)) {
        throw new Error(`Cannot use Regex spec without regular expression to wrap.`)
    }

    return new Regex({
        re: re,
        name: getName(re)
    });
}