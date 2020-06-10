const proto = {question: 42}

const object = {}

// object.__proto__ = proto
Object.setPrototypeOf(object, proto)

object.question

class Animal{
  constructor(legs) {
    this.legs=legs
  }
  showLegs() {
    return console.log(this.legs || 4)
  }
}

const dirka = new Animal
dirka.showLegs()
