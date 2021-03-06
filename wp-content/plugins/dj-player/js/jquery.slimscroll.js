(function(e) {
    e.fn.extend({
        slimScroll: function(n) {
            var r = {
                width: "auto",
                height: "240px",
                size: "5px",
                color: "#000",
                position: "right",
                distance: "10px",
                start: "top",
                opacity: 1,
                alwaysVisible: true,
                disableFadeOut: false,
                railVisible: true,
                railColor: "#333",
                railOpacity: 1,
                railDraggable: true,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: false,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "0px",
                animate: true,
                railBorderRadius: "0px",
                duration: 200,
            };
            var i = e.extend(r, n);
            this.each(function() {
                function x(t) {
                    if (!r) {
                        return
                    }
                    var t = t || window.event;
                    var n = 0;
                    if (t.wheelDelta) {
                        n = -t.wheelDelta / 120
                    }
                    if (t.detail) {
                        n = t.detail / 3
                    }
                    var s = t.target || t.srcTarget || t.srcElement;
                    if (e(s).closest("." + i.wrapperClass).is(m.parent())) {
                        T(n, true)
                    }
                    if (t.preventDefault && !v) {
                        t.preventDefault()
                    }
                    if (!v) {
                        t.returnValue = false
                    }
                }

                function T(e, t, n) {
                    v = false;
                    var r = e;
                    var s = m.outerHeight() - E.outerHeight();
                    if (t) {
                        r = parseInt(E.css("top")) + e * parseInt(i.wheelStep) / 100 * E.outerHeight();
                        r = Math.min(Math.max(r, 0), s);
                        r = e > 0 ? Math.ceil(r) : Math.floor(r);
                        E.css({
                            top: r + "px"
                        })
                    }
                    c = parseInt(E.css("top")) / (m.outerHeight() - E.outerHeight());
                    r = c * (m[0].scrollHeight - m.outerHeight());
                    if (n) {
                        r = e;
                        var u = r / m[0].scrollHeight * m.outerHeight();
                        u = Math.min(Math.max(u, 0), s);
                        E.css({
                            top: u + "px"
                        })
                    }
                    if (i.animate) {
                        m.stop(true, true).animate({
                            scrollTop: r
                        }, i.duration, "easeInQuart")
                    } else {
                        m.scrollTop(r)
                    }
                    m.trigger("slimscrolling", ~~r);
                    k();
                    L()
                }

                function N() {
                    if (window.addEventListener) {
                        this.addEventListener("DOMMouseScroll", x, false);
                        this.addEventListener("mousewheel", x, false)
                    } else {
                        document.attachEvent("onmousewheel", x)
                    }
                }

                function C() {
                    l = Math.max(m.outerHeight() / m[0].scrollHeight * m.outerHeight(), d);
                    E.css({
                        height: l + "px"
                    });
                    var e = l == m.outerHeight() ? "none" : "block";
                    E.css({
                        display: e
                    })
                }

                function k() {
                    C();
                    clearTimeout(a);
                    if (c == ~~c) {
                        v = i.allowPageScroll;
                        if (h != c) {
                            var e = ~~c == 0 ? "top" : "bottom";
                            m.trigger("slimscroll", e)
                        }
                    } else {
                        v = false
                    }
                    h = c;
                    if (l >= m.outerHeight()) {
                        v = true;
                        return
                    }
                    E.stop(true, true).fadeIn("fast");
                    if (i.railVisible) {
                        w.stop(true, true).fadeIn("fast")
                    }
                }

                function L() {
                    if (!i.alwaysVisible) {
                        a = setTimeout(function() {
                            if (!(i.disableFadeOut && r) && !s && !u) {
                                E.fadeOut("slow");
                                w.fadeOut("slow")
                            }
                        }, 1e3)
                    }
                }
                var r, s, u, a, f, l, c, h, p = "<div></div>",
                    d = 30,
                    v = false;
                var m = e(this);
                if (m.parent().hasClass(i.wrapperClass)) {
                    var g = m.scrollTop();
                    E = m.parent().find("." + i.barClass);
                    w = m.parent().find("." + i.railClass);
                    C();
                    if (e.isPlainObject(n)) {
                        if ("height" in n && n.height == "auto") {
                            m.parent().css("height", "auto");
                            m.css("height", "auto");
                            var y = m.parent().parent().height();
                            m.parent().css("height", y);
                            m.css("height", y)
                        }
                        if ("scrollTo" in n) {
                            g = parseInt(i.scrollTo)
                        } else if ("scrollBy" in n) {
                            g += parseInt(i.scrollBy)
                        } else if ("destroy" in n) {
                            E.remove();
                            w.remove();
                            m.unwrap();
                            return
                        }
                        T(g, false, true)
                    }
                    return
                } else if (e.isPlainObject(n)) {
                    if ("destroy" in n) {
                        return
                    }
                }
                i.height = i.height == "auto" ? m.parent().height() : i.height;
                var b = e(p).addClass(i.wrapperClass).css({
                    position: "relative",
                    overflow: "hidden",
                    width: i.width,
                    height: i.height,
                    display: 'block'
                });
                m.css({
                    overflow: "hidden",
                    width: i.width,
                    height: i.height
                });
                var w = e(p).addClass(i.railClass).css({
                    width: i.size,
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    display: i.alwaysVisible && i.railVisible ? "block" : "none",
                    "border-radius": i.railBorderRadius,
                    background: i.railColor,
                    opacity: i.railOpacity,
                    zIndex: 90
                });
                var E = e(p).addClass(i.barClass).css({
                    background: i.color,
                    width: i.size,
                    position: "absolute",
                    top: 0,
                    opacity: i.opacity,
                    display: i.alwaysVisible ? "block" : "none",
                    "border-radius": i.borderRadius,
                    BorderRadius: i.borderRadius,
                    MozBorderRadius: i.borderRadius,
                    WebkitBorderRadius: i.borderRadius,
                    zIndex: 99
                });
                var S = i.position == "right" ? {
                    right: i.distance
                } : {
                    left: i.distance
                };
                w.css(S);
                E.css(S);
                m.wrap(b);
                m.parent().append(E);
                m.parent().append(w);
                if (i.railDraggable) {
                    E.bind("mousedown", function(n) {
                        var r = e(document);
                        u = true;
                        t = parseFloat(E.css("top"));
                        pageY = n.pageY;
                        r.bind("mousemove.slimscroll", function(e) {
                            currTop = t + e.pageY - pageY;
                            E.css("top", currTop);
                            T(0, E.position().top, false)
                        });
                        r.bind("mouseup.slimscroll", function(e) {
                            u = false;
                            L();
                            r.unbind(".slimscroll")
                        });
                        return false
                    }).bind("selectstart.slimscroll", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false
                    })
                }
                w.hover(function() {
                    k()
                }, function() {
                    L()
                });
                E.hover(function() {
                    s = true
                }, function() {
                    s = false
                });
                m.hover(function() {
                    r = true;
                    k();
                    L()
                }, function() {
                    r = false;
                    L()
                });
                m.bind("touchstart", function(e, t) {
                    if (e.originalEvent.touches.length) {
                        f = e.originalEvent.touches[0].pageY
                    }
                });
                m.bind("touchmove", function(e) {
                    if (!v) {
                        e.originalEvent.preventDefault()
                    }
                    if (e.originalEvent.touches.length) {
                        var t = (f - e.originalEvent.touches[0].pageY) / i.touchScrollStep;
                        T(t, true);
                        f = e.originalEvent.touches[0].pageY
                    }
                });
                C();
                if (i.start === "bottom") {
                    E.css({
                        top: m.outerHeight() - E.outerHeight()
                    });
                    T(0, true)
                } else if (i.start !== "top") {
                    T(e(i.start).position().top, null, true);
                    if (!i.alwaysVisible) {
                        E.hide()
                    }
                }
                N()
            });
            return this
        }
    });
    e.fn.extend({
        slimscroll: e.fn.slimScroll
    })
})(jQuery)