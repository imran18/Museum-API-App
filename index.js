function loading(flag) {
    if (flag) {
        $("body").css({
            "pointer-events": "none",
            "opacity": "0.4"
        })
    } else {
        $("body").css({
            "pointer-events": "auto",
            "opacity": "1"
        })
    }
}