function readURL (input) {
  var image = document.getElementById('image')
  var viewFinder
  var mousedown = false
  image.onload = function (e) {
    var rect = image.getBoundingClientRect()
    var startX
    var startY
    var areaTop
    var areaLeft
    var areaBottom
    var areaRight
    image.onmousedown = function (e) {
      e.preventDefault()
      mousedown = true
      viewFinder = document.createElement('div')
      document.body.appendChild(viewFinder)
      viewFinder.style.position = 'absolute'
      viewFinder.style.pointerEvents = 'none'
      viewFinder.style.border = '1px solid red'
      areaLeft = e.pageX - rect.left
      areaTop = e.pageY - rect.top
      startX = e.pageX
      startY = e.pageY
      viewFinder.style.left = startX + 'px'
      viewFinder.style.top = startY + 'px'
    }
    image.onmousemove = function (e) {
      if (mousedown) {
        viewFinder.style.width = e.pageX - startX + 'px'
        viewFinder.style.height = e.pageY - startY + 'px'
      }
    }
    image.onmouseup = function (e) {
      e.preventDefault()
      mousedown = false
      areaRight = e.pageX - rect.left
      areaBottom = e.pageY - rect.top
      var href = window.prompt('href')
      var area = document.createElement('area')
      area.coords = [areaLeft, areaTop, areaRight, areaBottom].join(', ')
      area.href = href
      window.prompt('area', area.outerHTML)
    }
  }

  if (input.files && input.files[0]) {
    var reader = new FileReader()
    reader.onload = function (e) {
      image.setAttribute('src', e.target.result)
    }
    reader.readAsDataURL(input.files[0])
  }
}
