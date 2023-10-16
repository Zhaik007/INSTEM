window.addEventListener('scroll', function() {
    let num = (window.scrollY/window.innerHeight)*10;
    document.getElementById('backimage').style.webkitFilter = 'blur(' + num + 'px)'
})