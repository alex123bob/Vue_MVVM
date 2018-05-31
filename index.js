function observe (obj) {
    if (!obj || typeof obj !== 'object') {
        return
    }
    Object.keys(obj).forEach(key => {
        monitor(obj[key], key, obj)
    })
}

function monitor (val, key, self) {
    let dep = new Dep()
    observe(val)
    Object.defineProperty(self, key, {
        configurable: false,
        enumerable: true,
        get() {
            console.log('getter')
            return val
        },
        set(newVal) {
            if (newVal === val) return
            console.log('setter')
            val = newVal
            dep.notify()
        }
    })
}

function Dep () {
    this.subs = []
}

Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub)
    },
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

var data = {name: 'default value for data'}

observe(data)

data.name = 'new name'

console.log(data.name)