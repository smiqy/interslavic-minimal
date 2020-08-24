const convert = (s, alphabet) => {
  s = s
    .toLowerCase()
    .replace(/ji/g, "i")

    .replace(/v/g, "w")
    .replace(/h/g, "х")

    .replace(/dž/g, "ġ")
    .replace(/č/g, "ċ")
    .replace(/š/g, "ẋ")
    .replace(/ž/g, "ḥ")

    .replace(/ť|t́/g, "tj")
    .replace(/ď|d́/g, "dj")
    .replace(/ś/g, "sj")
    .replace(/ź/g, "zj")
    .replace(/ň|ń/g, "nj")
    .replace(/ř/g, "rj")
    .replace(/ľ/g, "lj")

    .replace(/ć/g, "ṫ")
    .replace(/đ/g, "ḋ")

    .replace(/ç/g, "ꞓ")
    .replace(/ʒ/g, "ǥ")

    .replace(/c/g, "ç")
    .replace(/k/g, "c")

    .replace(/ṱ/g, "t\u0306")
    .replace(/ḓ/g, "d\u0306")

    .replace(/ṙ/g, "r")
    .replace(/ŕ/g, "rj")
    .replace(/ŀ/g, "l")
    .replace(/ĺ/g, "lj")

    .replace(/ě/g, "æ")

    .replace(/ų/g, "ǫ")
    //.replace(/ę/g, "ę")

    .replace(/ò/g, "ŏ")
    .replace(/è/g, "ĕ")

    .replace(/ı/g, "ĭ")

    .replace(/å/g, "ȯ")
    //.replace(/ė/g, "ė")

    .replace(/ý/g, "y") //-
    .replace(/í/g, "i")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/ì/g, "i")

    .replace(/ù/g, "v")

    // --
    .replace(/j/g, "ȷ")
    .replace(/ĵ/g, "j")

    .replace(/(?<=[ċġẋḥṫḋ])i/g, "y")
    .replace(/i/g, "ȷy")

    .replace(/y/g, "ı")

    // --
    .replace(/(?<!\p{sc=Latin}|\u0306)ȷı/ug, "ı")
  //.replace(/(?<=\p{sc=Latin}|\u0306)ȷ(?=[ıeaouǫęŏĕȯėæĭ])/ug, "\u0313")

  if (["cyr", "cyr-iot"].includes(alphabet))
    s = s
      .replace(/ç/g, "ц")

      .replace(/p/g, "п")
      .replace(/b/g, "б")
      .replace(/f/g, "ф")
      .replace(/w/g, "в")
      .replace(/m/g, "м")
      .replace(/v/g, "ў")

      .replace(/t/g, "т")
      .replace(/d/g, "д")
      .replace(/s/g, "с")
      .replace(/z/g, "з")
      .replace(/n/g, "н")
      .replace(/l/g, "л")
      .replace(/r/g, "р")

      .replace(/ṫ/g, "щ")
      .replace(/ḋ/g, "җ")

      .replace(/c/g, "к")
      .replace(/g/g, "г")
      .replace(/x/g, "х")
      .replace(/ȷ/g, "й")
      .replace(/j/g, "и\u0311")

      .replace(/ꞓ/g, "қ")
      .replace(/ǥ/g, "ӷ")

      .replace(/ċ/g, "ч")
      .replace(/ġ/g, "џ")
      .replace(/ẋ/g, "ш")
      .replace(/ḥ/g, "ж")

      // --
      .replace(/ꜵ/g, "a\u0307")
      .replace(/œ/g, "ө")
      .replace(/æ/g, "ѣ")
      .replace(/ŏ/g, "ъ")
      .replace(/ĕ/g, "ь")
      .replace(/ǫ/g, "ѫ")
      .replace(/ę/g, "ѧ")
      .replace(/ĭ/g, "ь\u0301")

      // --

      .replace(/ı/g, "и")
      .replace(/e/g, "є")
      .replace(/a/g, "а")
      .replace(/o/g, "о")
      .replace(/u/g, "у")

  if (alphabet == "cyr-iot")
    s = s
      .replace(/йи/g, "і")
      .replace(/йє/g, "ѥ")
      .replace(/йѣ/g, "ꙓ")
      .replace(/йа/g, "ꙗ")
      .replace(/йо/g, "ю")
      .replace(/йу/g, "ѵ")
      .replace(/йѧ/g, "ѩ")
      .replace(/йѫ/g, "ѭ")

  return s.normalize("NFC")
}

document.addEventListener("DOMContentLoaded", () => {
  const alphabet = document.getElementById("alphabet")
  const taIn = document.getElementById("in")

  const ruby = () => {
    for (const e of document.getElementsByClassName("isv"))
      e.innerHTML = `<ruby class="isv-ruby">${convert(e.innerHTML, alphabet.value)}<rt>${e.innerHTML}</rt></ruby>`
  }

  const unruby = () => {
    for (const e of document.querySelectorAll("ruby.isv-ruby"))
      e.replaceWith(e.querySelector("rt").innerHTML)
  }

  const update = () =>
    document.getElementById("out").value = convert(taIn.value, alphabet.value)

  for (const e of [taIn, alphabet])
    e.addEventListener("input", update)

  alphabet.addEventListener("input", () => {
    unruby()
    ruby()
  })

  update()
  ruby()
})