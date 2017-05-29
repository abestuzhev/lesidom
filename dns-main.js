function deepClone(a) {
    var b = {};
    for (var c in a)a.hasOwnProperty(c) && (a[c] instanceof Array ? (b[c] = [], Array.prototype.push.apply(b[c], a[c])) : a[c] && a[c].valueOf().constructor === Object ? b[c] = deepClone(a[c]) : b[c] = a[c]);
    return b
}
function getDistanceFromLatLonInKm(a, b, c, d) {
    var e = deg2rad(c - a), f = deg2rad(d - b),
        g = Math.sin(e / 2) * Math.sin(e / 2) + Math.cos(deg2rad(a)) * Math.cos(deg2rad(c)) * Math.sin(f / 2) * Math.sin(f / 2);
    return 2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g)) * 6371
}
function deg2rad(a) {
    return a * (Math.PI / 180)
}
function getMiddlePointCoordinates(a, b, c, d, e, f) {
    void 0 === e && (e = 0), 0 !== f && (f = f > 0 ? 1 : -1);
    var g = (a + c) / 2, h = (b + d) / 2, i = e * Math.sqrt(.5);
    return {x: g + f * i, y: h - f * i}
}
function number_format(number, decimals, decPoint, thousandsSeparator) {
    if (isNaN(decimals = +decimals) && ((decimals = 0) || !0) || (decimals = Math.min(Math.max(0, decimals), 20)), !(decPoint instanceof String) && "string" != typeof decPoint && (decPoint = "."), !(thousandsSeparator instanceof String) && "string" != typeof thousandsSeparator && (thousandsSeparator = ","), isNaN(parseFloat(number)) || isNaN(number = +number) || !isFinite(number))return (0).toFixed(decimals).replace(".", decPoint);
    var isNegative = number < 0;
    number = Math.abs(number);
    var intPartStr = parseInt(Math.abs(number)).toString(),
        floatPartStr = number.toString().substr(intPartStr.length + 1);
    return floatPartStr.length <= decimals ? floatPartStr = (floatPartStr + (0).toFixed(decimals).substr(2)).substr(0, decimals) : (number = (+intPartStr + 1 * (("0" + floatPartStr).substr(0, decimals) + function (q) {
        var r = q.replace(/(\d)[1-4]+$/, "$1").replace(/(\d)[5-9]+$/, "$1+1");
        return q = (/^\d{2,}\+/.test(r) && "0" == r[0] ? r.match(/^0+/)[0] : "") + (r ? eval(r.replace(/^0+/, "") || 0).toString() : r), q.length > 1 ? arguments.callee(q) : q
    }(("0" + floatPartStr).substr(decimals))).replace(/^(\d)/, "$1.")).toString(), intPartStr = parseInt(number).toString(), floatPartStr = (number.substring(intPartStr.length + 1) + (0).toFixed(decimals)).substr(0, decimals)), "0" != intPartStr && (intPartStr = ((0).toFixed(3 - (intPartStr.length % 3 || 3)).substr(2) + intPartStr).replace(/(\d{3}(?!$))/g, "$1" + thousandsSeparator).replace(/^(-)?0+\s*/, "$1")), (isNegative ? "-" : "") + intPartStr + (floatPartStr ? decPoint + floatPartStr : "")
}
function initSelectCity() {
    function a(a) {
        var c = $.inArray(a.data("state"), f);
        if (-1 === c)return !1;
        c > 0 && b(f[c - 1], a)
    }

    function b(a, b) {
        if (-1 === $.inArray("region-select", f))return !1;
        c(b), b.addClass("state-" + a).data("state", a)
    }

    function c(a) {
        a.removeClass("state-group-select").removeClass("state-region-select").removeClass("state-city-select"), a.data("state", null)
    }

    var d = $("#selectCity .select-lists"), e = $("#selectCity").find(".modal-body"),
        f = ["group-select", "region-select", "city-select"];
    c(d), d.addClass("state-group-select"), $("#selectCity").on("shown.bs.modal", function () {
        var a = $("#search-city");
        a.focus(), a.siblings(".city-input-hint").addClass("show-hint")
    }), $(".regions-groups li > a", d).click(function () {
        var a = $(this).data("group-id");
        return e.removeClass("no-border"), $(".cities > li", d).hide(), b("region-select", d), $(this).closest("ul").find("li a").removeClass("active"), $(this).addClass("active"), $(".regions > li", d).hide().filter(function () {
            return $("a", $(this)).data("group-id") === a
        }).show(), $(".regions > li.block-title").show(), !1
    }), $(".regions li > a", d).click(function () {
        var a = $(this).data("region-id");
        return $(".cities > li", d).hide(), b("city-select", d), $(this).closest("ul").find("li a").removeClass("active"), $(this).addClass("active"), $(".cities > li", d).hide().filter(function () {
            return $("a", $(this)).data("region-id") === a
        }).show(), $(".cities > li.block-title").show(), !1
    }), $(".back-select", d).click(function () {
        return a(d), !1
    }), $("#search-city").keyup(function (a) {
        $(this).siblings(".city-input-hint").removeClass("show-hint");
        var b = $(this).val();
        b = b.toLowerCase();
        var c = b.trim();
        if (e.removeClass("no-border"), "" === c)return $(".regions, .regions-groups, .cities").show(), $(".selected", d).removeClass("selected"), $(".active", d).removeClass("active"), $(".regions > li", d).hide(), $(".cities > li", d).hide(), void $("#cityNoFound").hide();
        var f = $(".cities > li a").filter('[rel*="' + c + '"], [rel*="' + String.YoToETransition(c) + '"]');
        $(".regions, .regions-groups").hide(), $(".regions > li.selected").removeClass("selected"), $(".regions > li.group_all").addClass("selected"), 0 == f.length && (c = String.switchKeyboard("lat", c), f = $(".cities > li a").filter('[rel*="' + c + '"], [rel*="' + String.YoToETransition(c) + '"]')), $(".cities > li.city.selected").removeClass("selected"), f.length > 0 ? ($(".cities > li, .regions, .regions-groups").hide(), $("#cityNoFound").hide(), $(f).parent().show(), $(".cities-container").show(), $(".cities").show(), 1 == f.length && ($(this).siblings(".city-input-hint").html("Р§С‚РѕР±С‹ РІС‹Р±СЂР°С‚СЊ <b>" + f.text() + "</b>, РЅР°Р¶РјРёС‚Рµ Enter"), $(this).siblings(".city-input-hint").addClass("show-hint"))) : ($(".cities > li, .regions, .regions-groups").hide(), $("#cityNoFound").show(), e.addClass("no-border")), "13" == a.keyCode && 1 == f.length && $(f).click()
    }), 0 !== $(".regions-groups > li > a.active", d).length && $(".regions-groups > li > a.active", d).click(), 0 !== $(".regions > li > a.active", d).length && $(".regions > li > a.active", d).click()
}
function changeCity(a) {
    sendChangeCityRequest(a, function () {
        window.location.reload()
    })
}
function setCity(a) {
    sendChangeCityRequest(a, function () {
        $('[data-role="dropdown-city"]').remove()
    })
}
function sendChangeCityRequest(a, b) {
    $.ajax({
        url: "/ajax/change-city/", dataType: "json", cache: !1, data: {city_guid: a}, success: function (a) {
            1 === a.result && ($("[data-role=city-shops-page]").length && (document.cookie = "to_city_shops=1;path=/;expires=0"), b(a))
        }
    })
}
function setUrlParameter(a, b, c) {
    c = void 0 === c || c;
    var d = window.location.href;
    if (d.indexOf(a + "=") >= 0) {
        var e = d.substring(0, d.indexOf(a)), f = d.substring(d.indexOf(a));
        f = f.substring(f.indexOf("=") + 1), f = f.indexOf("&") >= 0 ? f.substring(f.indexOf("&")) : "", d = e + a + "=" + b + f
    } else d.indexOf("?") < 0 ? d += "?" + a + "=" + b : d += "&" + a + "=" + b;
    if (!c)return d;
    window.location.href = d
}
function removeUrlParameter(a, b) {
    var c = a.split("?");
    if (c.length >= 2) {
        for (var d = b + "=", e = c[1].split(/[&;]/g), f = e.length; f-- > 0;)-1 !== e[f].lastIndexOf(d, 0) && e.splice(f, 1);
        return a = c[0] + "?" + e.join("&")
    }
    return a
}
function updateUrlParameters(a, b) {
    for (var c in b)if (b.hasOwnProperty(c)) {
        var d = "";
        null !== b[c] && (d = encodeURI(c) + "=" + encodeURIComponent(b[c]));
        var e = new RegExp("(\\?|&)" + encodeURI(c) + "=([^&]*)(&|$)", "gi");
        a.match(e) instanceof Array ? a = a.replace(e, "$1" + d + "$3") : "" !== d && (a = a.replace(/(\?|$)/, "?" + d + "&").replace(/&$/, ""))
    }
    return a
}
function updateURLParameter(a, b, c) {
    var d = "", e = a.split("?"), f = e[0], g = e[1], h = "";
    if (g)for (e = g.split("&"), i = 0; i < e.length; i++)e[i].split("=")[0] != b && (d += h + e[i], h = "&");
    return f + "?" + d + h + b + "=" + c
}
function getURLParameter(a, b) {
    b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var c = new RegExp("[\\?&]" + b + "=([^&#]*)"), d = c.exec(a);
    return null === d ? "" : decodeURIComponent(d[1].replace(/\+/g, " "))
}
function initFancyBoxProductCard() {
    var a = $("a.lightbox_img");
    if (a.length) {
        a.click(function (a) {
            a.preventDefault()
        });
        var b = {
            helpers: {overlay: {locked: !1}, title: {type: "inside"}},
            wrapCSS: "fancybox-default",
            afterLoad: function (a) {
                if (this.title = '<a href="' + a.href + '" target="_blank">РЎРјРѕС‚СЂРµС‚СЊ РІ РїРѕР»РЅРѕРј СЂР°Р·РјРµСЂРµ</a>', "iframe" === this.type) {
                    var b = $(this.inner).find("iframe");
                    if (void 0 === ytPlayer) {
                        var c = document.createElement("script");
                        c.src = URL_YOUTUBE_PLAYER_API;
                        var d = document.getElementsByTagName("script")[0];
                        d.parentNode.insertBefore(c, d), b.attr("id", FANCYBOX_PRODUCT_VIDEO_DEFAULT_ID)
                    } else initPlayer(b.attr("id"), ytPlayer.getCurrentTime())
                }
            },
            afterShow: function () {
                var a = $(".fancybox-inner"), b = a.get(0).getBoundingClientRect().width,
                    c = $(".fancybox-nav.fancybox-prev span"), d = $(".fancybox-nav.fancybox-next span"), e = 70;
                window.checkScreenType(window.SCREEN_DESKTOP, window.SCREEN_WIDE) ? (c.css("right", $(window).width() / 2 - c.outerWidth()), d.css("left", $(window).width() / 2 - c.outerWidth())) : (c.css("right", $(window).width() / 2 - c.outerWidth()), d.css("left", $(window).width() / 2 - c.outerWidth()), window.checkScreenType(window.SCREEN_TABLET) && (e = 50), window.checkScreenType(window.SCREEN_MOBILE) && (e = 30), c.css("right", b / 2 - c.outerWidth() + e), d.css("left", b / 2 - d.outerWidth() + e))
            }
        };
        $(window).width() > "1900" && (b.wrapCSS = "fancybox-large-screen", b.padding = [20, 76, 20, 76]), a.fancybox(b)
    }
}
function onYouTubePlayerAPIReady() {
    initPlayer()
}
function initPlayer(a, b) {
    void 0 !== window.YT && (a = a || FANCYBOX_PRODUCT_VIDEO_DEFAULT_ID, b = b || 0, ytPlayer = new YT.Player(a, {
        events: {
            onReady: function () {
                0 !== b && ytPlayer.seekTo(b)
            }
        }
    }))
}
function strFormatHumanNumber(a, b) {
    return cases = [2, 0, 1, 1, 1, 2], index = a % 100 > 4 && a % 100 < 20 ? 2 : cases[Math.min(a % 10, 5)], b[index]
}
function getSelectedText() {
    return window.getSelection ? window.getSelection() : document.selection ? document.selection.createRange().text : ""
}
!function () {
    function a(a) {
        if (!/^[a-z_-][a-z0-9_-]*$/i.test(a))throw new Error("РќРµ РІРµСЂРЅРѕРµ РёРјСЏ РјРѕРґСѓР»СЏ");
        return a = a.replace(/([\s\/\\\-])+/g, "$1").split(/\s|\-/g).reduce(function (a, b) {
            return a + b[0].toUpperCase() + b.substr(1)
        }), a = a[0].toLowerCase() + a.substr(1)
    }

    function b(a) {
        for (var b = {
            name: null,
            alias: null,
            params: null
        }, c = a.match(/([$A-z_][$A-z0-9._-]*)|(,)/g) || [], d = [], e = 0, f = c.length; e < f; ++e) {
            var g = c[e];
            (0 == d.length || [",", "from"].indexOf(g) > -1) && ("," != g && "from" != g || "as" != d[d.length - 1][0] && (d[d.length - 1].splice(0, 0, "as"), d[d.length - 1].splice(2, 0, null)), d[d.length] = [], "," == g) || ("as" == g || "from" == g ? d[d.length - 1].splice(0, 0, g) : d[d.length - 1].push(g))
        }
        1 == d.length && d[0].splice(0, 0, "from");
        for (var e = 0; e < d.length; ++e)switch (d[e][0]) {
            case"from":
                var h = null, i = null;
                "as" == d[e][1] ? (i = d[e][2].split("."), h = d[e][3]) : i = d[e][1].split("."), b.name = i.splice(0, 1)[0], i.length ? d.splice(e + 1, 0, ["as", i, h]) : b.alias = h;
                break;
            case"as":
                b.params instanceof Array || (b.params = []), b.params.push({
                    name: d[e][1] instanceof Array ? d[e][1] : d[e][1].split("."),
                    alias: d[e][2]
                });
                break;
            default:
                console.error("РЎРёС‚Р°РєСЃРёС‡РµСЃРєР°СЏ РѕС€РёР±РєР°")
        }
        return b
    }

    function c(a) {
        var b = "";
        if (a.params instanceof Array && a.params.length) {
            for (var c = 0, d = a.params.length; c < d; ++c) {
                b.trim().length > 0 && c > 0 && (b += ", ");
                var e = a.params[c].name;
                b += e.join("."), a.params[c].alias && a.params[c].alias != e[e.length - 1] && (b += " as " + a.params[c].alias)
            }
            b += " from "
        }
        return b += a.name, a.alias && (b += " as " + a.alias), b
    }

    function d(a, b, c) {
        b instanceof Object || (b = {}), c instanceof Object || (c = {}), b.hasOwnProperty(a.alias || a.name) || (a.params instanceof Array ? b[a.name] = {} : a.alias ? c[a.alias] = a.name : b[a.name] = null);
        for (var d = 0, e = (a.params || []).length; d < e; ++d) {
            var f = a.params[d].name;
            b[a.name][a.params[d].alias || f[f.length - 1]] = f
        }
        return {from: b, aliases: c}
    }

    function e(a) {
        for (var b = a.split("."), c = window, d = 0, e = b.length; d < e; ++d) {
            if (!c.hasOwnProperty(b[d]) || !c[b[d]])return !1;
            c = c[b[d]]
        }
        return !0
    }

    function f(a, b) {
        var c = a.split(".");
        b || (b = window);
        for (var d = 0, e = c.length; d < e && b; ++d)b = b[c[d]];
        return b
    }

    function g() {
        for (var a in A)if (A.hasOwnProperty(a) && e(a)) {
            for (var b = A[a], c = 0; c < b.length; ++c) {
                var d = t[b[c]];
                if (d && (--d.globalDependsCount, --d.waitGlobalDependsCount, 0 == d.waitDependsCount))try {
                    l(d)
                } catch (a) {
                    throw z.push({
                        text: ["РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ РІРѕС‚С‡РµСЂР° РіР»РѕР±Р°Р»СЊРЅС‹С… РїРµСЂРµРјРµРЅРЅС‹С…:\n", d],
                        type: x
                    }), a
                }
            }
            j(a)
        }
        0 == B && (E = !1)
    }

    function h() {
        clearTimeout(D), D = setTimeout(function () {
            g(), E && h()
        }, 1)
    }

    function i(a, b) {
        A.hasOwnProperty(a) || (A[a] = []), -1 == A[a].indexOf(b) && (A[a].push(b), ++B), E || (E = !0, h())
    }

    function j(a) {
        if (A.hasOwnProperty(a)) {
            var b = A[a];
            b instanceof Array ? B -= b.length : b && --A, delete A[a]
        }
    }

    function k(a, b, c) {
        c || (c = {});
        var d = t[b], e = a[b];
        if (null == e) c[b] = d.exports; else for (var f in e)if (e.hasOwnProperty(f)) {
            for (var g = d.exports, h = 0, i = e[f].length; h < i && null != g; ++h)g = g[e[f][h]];
            c[f] = g
        }
        return c
    }

    function l(a) {
        if (u.hasOwnProperty(a.name) && u[a.name].length > 0 && 0 == a.waitDependsCount && 0 == a.waitGlobalDependsCount)for (var b, c, d = u[a.name], e = d.length - 1; e > -1; --e)b = d[e], c = t[b], --c.waitDependsCount, d.splice(e, 1), 0 == c.waitDependsCount && 0 == c.waitGlobalDependsCount && (n(c), (u[b] || []).length > 0 && l(c)); else 0 == a.waitDependsCount && 0 == a.waitGlobalDependsCount && n(a)
    }

    function m(c, e, f, h) {
        h instanceof Object || (h = {}), c = !0 === h.isAnonymously ? "singleModule::" + (new Date).getTime() + "-" + y++ : a(c);
        var j = {}, k = 0;
        if (e instanceof Function && (f = e, e = []), e || (e = []), !(f instanceof Function))throw new Error("Р¤СѓРЅРєС†РёСЏ РјРѕРґСѓР»СЏ <" + c + "> РЅРµ РѕРїРµСЂРµРґРµР»РµРЅР°");
        if (t[c])throw new Error("РњРѕРґСѓР»СЊ СЃ РёРјРµРЅРµРј " + c + " СѓР¶Рµ Р±С‹Р» РѕРїСЂРµРґРµР»С‘РЅ СЂР°РЅСЊС€Рµ");
        if (h.listOfInverseOfDepends instanceof Array)for (var m = h.listOfInverseOfDepends, n = 0, o = m.length; n < o; ++n)if (m[n] && !(m[n] instanceof Object))if (t.hasOwnProperty(m[n])) {
            var p = t[m[n]];
            null == p.exports && (p.depends.push(c), ++p.waitDependsCount)
        } else C.hasOwnProperty(m[n]) || (C[m[n]] = []), C[m[n]].push(c), i(m[n], m[n]);
        for (var q = [], r = {}, s = {}, n = 0; n < e.length; ++n) {
            var v = b(e[n]);
            if ("window" == v.name && v.params instanceof Array && v.params.length) {
                for (var x = 0, A = v.params.length; x < A; ++x) {
                    var B = v.params[x].name.join("."), D = v.params[x], E = D.alias || D.name;
                    E instanceof Array && (E = E[E.length - 1]), j[E] = B, ++k, i(B, c)
                }
                e.splice(n, 1), --n
            } else e.splice(n, 1, v), d(v, r, s)
        }
        for (var F in r)r.hasOwnProperty(F) && q.push(F);
        var G = {
            depends: q,
            importFrom: r,
            aliases: s,
            fn: f,
            waitDependsCount: 0,
            name: c,
            exports: null,
            globalDepends: j,
            globalDependsCount: k,
            waitGlobalDependsCount: k
        };
        if (t[c] = G, C.hasOwnProperty(c)) {
            G.depends instanceof Array || (G.depends = []);
            for (var n = 0, o = C[c].length; n < o; ++n) {
                var H = C[c][n];
                G.depends.push(H)
            }
            delete C[c]
        }
        for (var I, n = 0, o = G.depends.length; n < o; ++n)I = a(G.depends[n]), t.hasOwnProperty(I) && null != t[I].exports || (u[I] || (u[I] = []), u[I].push(c), ++G.waitDependsCount), G.depends[n] = I;
        var J = [], K = [];
        if (K.push("РњРѕРґСѓР»СЊ " + c + " РѕР±СЉСЏРІР»РµРЅ"), G.depends.length) {
            var L = G.depends.length > 1;
            K.push("\nРњРѕРґСѓР»СЊ Р·Р°РІРёСЃРёС‚ РѕС‚ РјРѕРґСѓР»" + ["СЏ", "РµР№"][+L] + ": " + G.depends.join(", "))
        }
        for (var M in G.globalDepends)G.globalDepends.hasOwnProperty(M) && J.push(M);
        if (J.length) {
            var L = J.length > 1;
            K.push("\nРњРѕРґСѓР»СЊ Р·Р°РІРёСЃРёС‚ РѕС‚ РіР»РѕР±Р°Р»СЊРЅ" + ["РѕР№", "С‹Р№"][+L] + " РїРµСЂРµРјРµРЅРЅ" + ["РѕР№", "С‹С…"][+L] + ": " + J.join(", "))
        }
        z.push({text: K, type: w}), g(), l(G)
    }

    function n(a) {
        if (!t[a.name].exports) {
            for (var b, c, d = {}, e = 0, g = a.depends.length; e < g; ++e)b = a.depends[e], c = t[b], c.exports || n(t[b]), k(a.importFrom, b, d);
            for (var h in a.aliases)if (a.aliases.hasOwnProperty(h)) {
                var c = t[a.aliases[h]];
                c.exports || n(a.aliases[h]), d[h] = c.exports
            }
            for (var i in a.globalDepends)a.globalDepends.hasOwnProperty(i) && (d[i] = f(a.globalDepends[i]));
            var j = a.exports || {}, l = [];
            (a.depends.length > 0 || a.globalDependsCount > 0) && l.push(d), l.push(j);
            try {
                var m = a.fn.apply(a.fn, l);
                t[a.name].exports = m instanceof Object ? m : j, z.push({
                    text: "РњРѕРґСѓР»СЊ " + a.name + " РёРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°РЅ",
                    type: v
                })
            } catch (a) {
                if (!(a instanceof p))throw console.error(a.message), a
            }
        }
    }

    function o(a) {
        for (var b = [], c = 0, d = a.length; c < d; ++c)a[c] instanceof Array ? Array.prototype.push.apply(b, o(a[c])) : b.push(a[c]);
        return b
    }

    function p(a, b) {
        this.expectantModuleName = a, this.comingModuleName = b
    }

    function q() {
        this.moduleName = null
    }

    function r(b, c) {
        if (!arguments.length)return this;
        if (this.moduleName = null, this.depends = null, this.globalDepends = null, this.isAnonymously = !1, this.notClosedIndex = ++G, F[this.notClosedIndex] = this, b instanceof Object && (c = b, b = null), c instanceof Object && c.hasOwnProperty("isAnonymously") && !0 === c.isAnonymously && (this.isAnonymously = !0), !this.isAnonymously && b && (this.moduleName = a(b)), c instanceof Object) {
            if (c.hasOwnProperty("moduleName") && (this.moduleName = c.moduleName, this.isAnonymously || (this.moduleName = a(c.moduleName))), c.hasOwnProperty("import") && this.import(c.import), c.hasOwnProperty("imports")) {
                var d = [];
                for (var e in c.imports)if (c.imports.hasOwnProperty(e))if (c.imports[e] instanceof Function) d.push(c.imports[e](e)); else {
                    var f = c.imports[e];
                    f != e && (f += " as " + e), d.push(f)
                }
                this.import(d)
            }
            if (c.hasOwnProperty("require") && this.require(c.require), c.hasOwnProperty("define"))return this.define(c.define), null
        }
        return this
    }

    function s() {
        this.argName = "", this.moduleName = ""
    }

    var t = {}, u = {}, v = "warn", w = "info", x = "error", y = 0, z = [], A = {}, B = 0, C = {}, D = null, E = !1,
        F = {}, G = -1;
    q.create = function (a, b, c, d, e) {
        var f = new q;
        f.moduleName = a, m(f.moduleName, b, function (a) {
            2 == arguments.length && (f.imports = a);
            try {
                return d.apply(f, arguments)
            } catch (a) {
                throw a instanceof p && i(a.comingModuleName, a.expectantModuleName), a
            }
        }, e)
    }, q.prototype.import = function (a) {
        var c = b(a);
        if (t.hasOwnProperty(c.name) || window[c.name]) {
            var e = d(c), f = null, g = !1;
            t.hasOwnProperty(c.name) ? f = k(e.from, c.name) : (f = window[c.name], g = !0);
            var h = null;
            if (!g && c.name && c.alias && (h = c.alias), c.params instanceof Array && c.params.length) {
                if (c.params.length > 1)throw new Error("Р’С‹ РЅРµ РјРѕР¶РµС‚Рµ РёРјРїРѕСЂС‚РёСЂРѕРІР°С‚СЊ Р±РѕР»РµРµ РѕРґРЅРѕРіРѕ СЌР»РµРјРµРЅС‚Р°");
                var i = c.params[0];
                h = i.alias && !g ? i.alias : i.name.pop(), g && i.alias && console.error("РРјРїРѕСЂС‚ РІРЅРµС€РЅРµР№ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РЅРµ РјРѕР¶РµС‚ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РєРѕРЅСЃС‚СЂСѓРєС†РёСЋ as!")
            }
            return null === h ? f : f[h]
        }
        throw new p(this.moduleName, c.name)
    };
    var H = r.prototype;
    H.anonymous = function () {
        return this.isAnonymously = !0, this
    }, H.import = function () {
        var a = o(arguments);
        return a.length && (null == this.depends && (this.depends = []), Array.prototype.push.apply(this.depends, a)), this
    }, H.require = function () {
        var a = o(arguments);
        return a.length && (null == this.globalDepends && (this.globalDepends = []), Array.prototype.push.apply(this.globalDepends, a)), this
    }, H.inverseDepends = function (a) {
        return a instanceof Array || (a = [], Array.prototype.push.apply(a, arguments)), this.listOfInverseOfDepends = a, this
    }, H.define = function (a) {
        delete F[this.notClosedIndex];
        var d = [];
        Array.prototype.push.apply(d, this.depends);
        for (var e = 0, f = (this.globalDepends || []).length; e < f; ++e) {
            for (var g = this.globalDepends[e].replace(/^(window\.)*/, "window."), h = b(g), i = 0, j = (h.params || []).length; i < j; ++i)h.params[i].alias = h.params[i].name.slice(-1)[0];
            d.push(c(h))
        }
        q.create(this.moduleName, d, this.globalDepends, a, this)
    };
    var I = s.prototype;
    I.import = function (a) {
        return this.argName = a, this
    }, I.from = function (a) {
        this.moduleName = a;
        var b = this;
        return function () {
            return b.build.apply(b, arguments)
        }
    }, I.build = function (a) {
        if ("*" == this.argName)return this.moduleName + (a && this.moduleName != a ? " as " + a : "");
        var b = this.argName || a, c = "";
        return this.argName && (c = a), b + (c ? " as " + c : "") + " from " + this.moduleName
    };
    var J = function (a) {
        var b = r.apply(new r, arguments);
        return null == a && b.anonymous(), b
    };
    J.import = function (a) {
        return (new s).import(a)
    }, J.from = function (a) {
        return (new s).from(a)
    }, J.importModule = function (a) {
        return (new s).import("*").from(a)
    }, window.define = function (a, b, c, d) {
        m(a, b, c, {listOfInverseOfDepends: d})
    }, window.unit = J, window.modulesTester_showModulesMessages = function (a) {
        var b = z.shift || 0;
        !0 === a && (b = 0);
        for (var c = z.slice(b), d = 0, e = c.length; d < e; ++d) {
            var f = c[d];
            console[f.type](f.text)
        }
    }
}(), Array.prototype.sortBy = function (a) {
    for (var b, c, d = [], e = 0, f = this.length; e < f; ++e) {
        for (var g = 0, h = d.length; g < h; ++g)if (a instanceof Function ? (b = a(this[e]), c = a(d[g])) : a ? (b = this[e][a], c = d[g][a]) : (b = this[e], c = d[g]), b < c) {
            d.splice(g, 0, this[e]);
            break
        }
        g == h && d.push(this[e])
    }
    return d
}, Array.prototype.groupBy = function (a) {
    for (var b, c = {}, d = 0, e = this.length; d < e; ++d)b = a instanceof Function ? a(this[d]) : a ? this[d][a] : a, c.hasOwnProperty(b) || (c[b] = []), c[b].push(this[d]);
    return c
}, $.arrayIntersect = function (a, b) {
    return $.grep(a, function (a) {
        return $.inArray(a, b) > -1
    })
}, function (a) {
    function b() {
        if (null !== c)return c;
        d = document.createElement("style"), d.appendChild(document.createTextNode("")), this._insertStyle = this._addToWaiter;
        var b = this;
        return a(function () {
            document.body.appendChild(d);
            var a = d.sheet instanceof Object, c = d.sheet.insertRule instanceof Function,
                f = d.sheet.addRule instanceof Function;
            b._insertStyle = a && (c || f) ? f ? b._insertStyleAddRule : b._insertStyleInsertRule : b._insertStyleNative;
            for (var g = 0, h = e.length; g < h; ++g)b._insertStyle(e[g])
        }), c = this
    }

    var c = null, d = null, e = [], f = b.prototype;
    f._insertStyleNative = function (a) {
        d.innerHTML += this.getFullCssContext(a)
    }, f._insertStyleAddRule = function (a) {
        for (var b in a)a.hasOwnProperty(b) && d.sheet.addRule(b, this.getCssContext(a[b]), 0)
    }, f._insertStyleInsertRule = function (a) {
        for (var b = this.getFullCssRulesList(a), c = 0, e = b.length; c < e; ++c)d.sheet.insertRule(b[c], d.sheet.cssRules.length)
    }, f._addToWaiter = function (a) {
        e.push(a)
    }, f._insertStyle = function (a) {
    }, f.getCssContext = function (a) {
        var b = "";
        for (var c in a)if (a.hasOwnProperty(c) && void 0 !== a[c]) {
            var d = a[c];
            (d instanceof Number || "number" == typeof d) && (d += "px"), null !== d && !1 !== d || (d = "none"), c = c.replace(/(?!^)([A-Z])/g, "-$1").toLowerCase(), b += c + ":" + d + ";"
        }
        return b
    }, f.getFullCssRulesList = function (a) {
        var b = [];
        for (var c in a)a.hasOwnProperty(c) && b.push(c + "{" + this.getCssContext(a[c]) + "}");
        return b
    }, f.getFullCssContext = function (a) {
        return this.getFullCssRulesList(a).join(" ")
    }, f.createStyle = function (a) {
        this._insertStyle(a)
    }, window.CSSHelper = b, window.cssHelper = new b
}(jQuery), function (a, b) {
    function c(a, b, c) {
        for (var d = a, e = c, f = 1e-4; f <= 1; f += 1e-4) {
            var g = (1 - f) * (1 - f) * a + 2 * (1 - f) * f * b + f * f * c;
            g < d && (d = g), g > e && (e = g)
        }
        return [Math.round(d), Math.round(e)]
    }

    a.fn.curvedArrow = function (b) {
        var d = a.extend({
            x0: void 0,
            y0: void 0,
            x1: void 0,
            y1: void 0,
            x2: void 0,
            y2: void 0,
            arrowSize: 7,
            lineWidth: 1,
            arrowColor: "#000",
            objectCssClass: "curved-arrow"
        }, b);
        if (void 0 !== d.x0 && void 0 !== d.y0 && void 0 !== d.x1 && void 0 !== d.y1 && void 0 !== d.x2 && void 0 !== d.y2) {
            var e = document.createElement("canvas");
            a(e).appendTo(this);
            var f = c(d.x0, d.x1, d.x2), g = c(d.y0, d.y1, d.y2), h = d.arrowSize - d.lineWidth, i = f[0] - h,
                j = f[1] + h, k = g[0] - h, l = g[1] + h, m = d.x0 - i, n = d.y0 - k, o = d.x1 - i, p = d.y1 - k,
                q = d.x2 - i, r = d.y2 - k;
            e.style.position = "absolute", e.style.top = k + "px", e.style.left = i + "px", e.width = j - i, e.height = l - k;
            var s = e.getContext("2d");
            s.strokeStyle = d.arrowColor, s.lineWidth = d.lineWidth, s.lineJoin = "round", s.lineCap = "round", s.beginPath(), s.moveTo(m, n), s.quadraticCurveTo(o, p, q, r), s.stroke();
            var t = Math.atan2(r - p, q - o);
            return s.translate(q, r), s.rotate(t + 1), s.beginPath(), s.moveTo(0, d.arrowSize), s.lineTo(0, 0), s.stroke(), s.rotate(-2), s.lineTo(0, -d.arrowSize), s.stroke(), s.rotate(1 - t), s.translate(-q, -r), a(e).addClass(d.objectCssClass)
        }
    }
}(jQuery), Date.DATE_STAMP_FORMAT = "%Y-%m-%d %H:%M:%S", Date.DATE_STAMP_FORMAT_MINI = "%Y-%m-%d", Date.FORMAT_DATE_TIME = "%d %B %Y Рі. %H:%M", Date.FORMAT_DATE = "%d %B %Y Рі.", Date.FORMAT_DAY_MONTH = "%d %B", Date.FORMAT_DATE_NORMAL = "%d-%m-%Y", Date.LANG_RU = "ru_RU", Date.TIME_SEC_OF_ONE_DAY = 86400, Date.TIME_MS_OF_ONE_DAY = 1e3 * Date.TIME_SEC_OF_ONE_DAY, Date.DIAPASON_DEFAULT = ["РџРѕР·Р°РІС‡РµСЂР°", "Р’С‡РµСЂР°", "РЎРµРіРѕРґРЅСЏ", "Р—Р°РІС‚СЂР°", "РџРѕСЃР»РµР·Р°РІС‚СЂР°"], Date.DIAPASON_SHIFT = -2, Date.FLAG_DIF_AT_SECONDS = 1, Date.FLAG_DIF_AT_MINUTES = 60, Date.FLAG_DIF_AT_HOURS = 3600, Date.FLAG_DIF_AT_DAYS = 86400, Date.FLAG_DATE_YEAR = 1, Date.FLAG_DATE_MONTH = 2, Date.FLAG_DATE_DAY = 4, Date.FLAG_DATE_HOUR = 8, Date.FLAG_DATE_MINUTES = 16, Date.FLAG_DATE_SECONDS = 32, Date.getDateStampNum = function (a) {
    if (!isNaN(parseFloat(a)))return parseInt(a);
    var b = a instanceof Date ? a.getTime() : (new Date).getTime();
    return parseInt(b / Date.TIME_MS_OF_ONE_DAY) * Date.TIME_MS_OF_ONE_DAY
}, Date.getDatesDif = function (a, b, c) {
    void 0 === c && (c = Date.FLAG_DIF_AT_DAYS);
    var d = Date.getDateStampNum(a) - Date.getDateStampNum(b);
    return parseInt(d / c)
}, Date.getDatesDifRelToday = function (a, b) {
    return void 0 === b && (b = Date.FLAG_DIF_AT_DAYS), Date.getDatesDif(a, Date.getDateStampNum(), b)
}, Date.prototype.getDatesDifRelToday = function (a) {
    return Date.getDatesDifRelToday(this, a)
}, Date.isCurrentDate = function (a, b) {
    void 0 === b && (b = Date.FLAG_DATE_YEAR);
    for (var c = "%Y%m%d%H%M%S", d = ""; b > 0;)b % 2 == 1 && (d += c.substr(0, 2)), b >>= 1;
    return d || (d = c), strftime(d, Date.getDateStampNum().toDate(), "rus") == strftime(d, Date.getDateStampNum(a).toDate(), "rus")
}, Date.getDateTitleRelToday = function (a, b, c, d) {
    b || (b = Date.DIAPASON_DEFAULT), d || (d = String.CASE_LOWER);
    var e = Date.getDatesDifRelToday(a);
    void 0 !== c && null !== c || (c = "%d %B", Date.isCurrentDate(a) || (c += " %Y Рі."));
    var f = b[e - Date.DIAPASON_SHIFT] || strftime(c, a, "rus");
    return null != d && (f = f.convertCharCase(d)), f
}, Date.prototype.getDateTitleRelToday = function (a, b, c) {
    return Date.getDateTitleRelToday(this, a, b, c)
}, Number.prototype.toDate = function () {
    return new Date(this)
}, function () {
    function a(a, b, c) {
        return b.strftime(a, c)
    }

    function b(a, b, g) {
        function h(b, c, d, e) {
            var f = 0;
            s = b;
            var g = a.substr(0, s);
            return e instanceof Function && void 0 !== (f = e(g)) && (g = f), new RegExp("\\d{" + s + "}").test(g) ? (g *= 1, d instanceof Function && void 0 !== (f = d(g)) && (g = f)) : c instanceof Function ? c() : c instanceof Object ? (console.error((c.text instanceof Function ? c.text(g) : c.text) + " [" + o + "]", u), g = c.val instanceof Function ? c.val(g) : c.val) : (console.error((c instanceof Function ? c(g) : c) + " [" + o + "]", u), g = 0), g
        }

        var i, j, k, l, m, n, o, p, q, r = !1, s = 0, t = 0, u = a;
        b || (b = f), "string" != typeof g && (g = e);
        var v = (getWDS(g), getWDF(g), getMNS(g)), w = getMNF(g);
        for (c = new RegExp("(" + v.join(")|(") + ")", "gi"), d = new RegExp("(" + w.join(")|(") + ")", "gi"), o = 0, p = b.length, q = b[0]; o < p; ++o, q = b[o])if (r || "%" != q)if (r) {
            switch (q) {
                case"b":
                case"h":
                    s = a.match(c)[0].length, j = -1, j = v.map(function (b, c) {
                        if (b == a.substr(0, s))return c
                    }), -1 == j && (console.error("РќРµРёР·РІРµСЃС‚РЅС‹Р№ РјРµСЃСЏС† [" + o + "]", u), j = 0);
                    break;
                case"B":
                    var x = a.match(d);
                    if (!x || x && !x.length) {
                        console.error("РќРµРёР·РІРµСЃС‚РЅС‹Р№ РјРµСЃСЏС† [" + o + "]", u);
                        continue
                    }
                    s = x[0].length, j = -1, w.map(function (b, c) {
                        b.toLowerCase() == a.substr(0, s).toLowerCase() && (j = c)
                    }), -1 == j && (console.error("РќРµРёР·РІРµСЃС‚РЅС‹Р№ РјРµСЃСЏС† [" + o + "]", u), j = 0);
                    break;
                case"d":
                case"e":
                    k = h(2, function (a) {
                        return "РћР¶РёРґР°Р»СЃСЏ РґРµРЅСЊ, Р° РґРѕР¶РґР°Р»РёСЃСЊ РІРѕС‚ СЌС‚Рѕ <" + a + ">"
                    }, function (a) {
                        a > 31 && console.error("РќСѓ С‚С‹ РІРѕРѕР±С‰Рµ С„РѕРєСѓСЃРЅРёРє, РѕС‚РєСѓРґР° СЃС‚РѕР»СЊРєРѕ?", u)
                    }, function (a) {
                        if (" " == a[0])return "0" + a[1]
                    });
                    break;
                case"g":
                case"y":
                    i = h(2, function (a) {
                        return {
                            text: "Р’ РєР°Рє РЎР С‚С‹ РіРѕРґ РІР±РёРІР°РµС€СЊ? РўСЂРµР±СѓРµРјС‹Р№ С„РѕСЂРјР°С‚ YY,\t\t\t\t\t\t\t\t\t\tРіРґРµ Y in [0,9]. Рђ СЌС‚Рѕ С‡С‚Рѕ: <" + a + ">?",
                            val: (new Date).getFullYear()
                        }
                    }, function (a) {
                        return a + 100 * Math.floor((new Date).getFullYear() / 100)
                    });
                    break;
                case"G":
                case"Y":
                    i = h(4, function (a) {
                        return "Р’ РєР°Рє РЎР С‚С‹ РіРѕРґ РІР±РёРІР°РµС€СЊ? РўСЂРµР±СѓРµРјС‹Р№ С„РѕСЂРјР°С‚ YYYY,\t\t\t\t\t\t\t\t\tРіРґРµ Y in [0,9]. Рђ СЌС‚Рѕ С‡С‚Рѕ: <" + a + ">?"
                    });
                    break;
                case"H":
                    l = h(2, function (a) {
                        return "Р§Р°СЃС‹ РґРѕР»Р¶РЅС‹ РїСЂРёРЅРёРјР°С‚СЊ Р·РЅР°С‡РµРЅРёРµ \t\t\t\t\t\t\t\t\tРѕС‚ 00 РґРѕ 23, Р° РЅРµ <" + a + ">"
                    }, function (a) {
                        if (a < 0 || a > 23)return console.error("Р§Р°СЃС‹ РґРѕР»Р¶РЅС‹ РїСЂРёРЅРёРјР°С‚СЊ Р·РЅР°С‡РµРЅРёРµ \t\t\t\t\t\t\t\t\tРѕС‚ 00 РґРѕ 23, Р° РЅРµ <" + a + ">"), 0
                    });
                    break;
                case"I":
                    l = h(2, function (a) {
                        return "Р§Р°СЃС‹ РґРѕР»Р¶РЅС‹ РїСЂРёРЅРёРјР°С‚СЊ Р·РЅР°С‡РµРЅРёРµ \t\t\t\t\t\t\t\t\tРѕС‚ 00 РґРѕ 12, Р° РЅРµ <" + a + ">"
                    }, function (a) {
                        return (a < 0 || a > 12) && console.error("Р§Р°СЃС‹ РґРѕР»Р¶РЅС‹ РїСЂРёРЅРёРјР°С‚СЊ Р·РЅР°С‡РµРЅРёРµ \t\t\t\t\t\t\t\t\tРѕС‚ 00 РґРѕ 12, Р° РЅРµ <" + a + ">"), 0
                    });
                    break;
                case"m":
                    j = h(2, function (a) {
                            return "РњРµСЃСЏС† - С‡РёСЃР»РѕРІРѕРµ Р·РЅР°С‡РµРЅРёРµ, Р° РїРѕР»СѓС‡РµРЅРѕ <" + a + ">"
                        }, function (a) {
                            if (a < 1 || a > 12)return console.error("Р“РґРµ С‚С‹ С‚Р°РєРёРµ РјРµСЃСЏС†Р° РІРёРґРµР»? Р”РѕРїСѓСЃС‚РёРјС‹Р№ \t\t\t\t\t\t\t\t\t\t\t\tРґРёР°РїР°Р·РѕРЅ 01-12 <" + a + "> [" + o + "]", u), 0
                        }) - 1;
                    break;
                case"M":
                    m = h(2, function (a) {
                        return "РўСЂРµР±СѓРµРјС‹Р№ РІРёРґ M РёР»Рё MM, РіРґРµ M in [0,9] <" + a + ">"
                    }, function (a) {
                        if (a < 0 || a > 59)return console.error("РњРёРЅСѓС‚С‹ - С‡РёСЃР»Р° РІ РёРЅС‚РµСЂРІР°Р»Рµ \t\t\t\t\t\t\t\t\t\t\t\tРѕС‚ 00 РґРѕ 59. <" + a + "> [" + o + "]"), 0
                    });
                    break;
                case"n":
                    "\n" != a[0] && console.error("РћР¶РёРґР°Р»СЃСЏ РїРµСЂРµС…РѕРґ РЅР° РЅРѕРІСѓСЋ СЃС‚СЂРѕРєСѓ, \t\t\t\t\t\t\t\t\t\tР° РІСЃС‚СЂРµС‡РµРЅ <" + a[0] + "> [" + o + "]", u);
                    break;
                case"p":
                    s = 2;
                    var n = a.substr(0, 2).toLowerCase();
                    "am" == n ? t = 1 : "pm" == n ? t = 2 : (t = 0, console.error("РћР¶РёРґР°Р»РѕСЃСЊ pm РёР»Рё am, РІСЃС‚РµС‡РµРЅРѕ <" + n + "> [" + o + "]", u));
                    break;
                case"S":
                    n = h(2, function (a) {
                        return "РЎРµРєСѓРЅРґС‹ - С‡РёСЃР»Р° РІ РґРёР°РїР°Р·Р°РЅРѕ РѕС‚ 00 РґРѕ 59 <" + a + ">"
                    }, function (a) {
                        return (a < 0 || a > 59) && console.error("Р—РЅР°С‡РµРЅРёРµ РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ РІ РёРЅС‚РµСЂРІР°Р»Рµ \t\t\t\t\t\t\t\t\t\t\tРѕС‚ 00 РґРѕ 50 <" + a + "> [" + o + "]", u), 0
                    });
                    break;
                case"t":
                    "\n" != a[0] && console.error("РћР¶РёРґР°Р»Р°СЃСЏ С‚Р°Р±СѓР»СЏС†РёСЏ, \t\t\t\t\t\t\t\t\t\tР° РІСЃС‚СЂРµС‡РµРЅР° <" + a[0] + "> [" + o + "]", u)
            }
            a = a.substr(s), r = !1
        } else r || (q != a[0] && console.error("Р’СЃС‚СЂРµС‡РµРЅ <" + a[0] + "> РІРјРµСЃС‚Рѕ РѕР¶РёРґР°РµРјРѕРіРѕ <" + q + ">", b), a = a.substr(1)); else r = !0;
        return new Date(i || (new Date).getFullYear(), j || 0, k || 1, (2 == t && l < 12 ? l + 12 : l) || 0, m || 0, n || 0)
    }

    Date.options instanceof Object || (Date.options = {}), Date.options.datetime = {LANG_RU: "rus", LANG_EN: "eng"};
    var c, d, e = Date.options.datetime.LANG_RU, f = "%H:%m %D.%M.%Y";
    (getWDS = function (a) {
        switch ("string" == typeof a ? a : e) {
            case"rus":
                return ["Р’СЃ", "РџРЅ", "Р’С‚", "РЎСЂ", "Р§С‚", "РџС‚", "РЎР±"];
            case"eng":
                return ["Sun", "Mon", "Tue", "Wed", "Th", "Fr", "Sa"];
            default:
                if (a != e)return getWDS(e)
        }
    })(), (getWDF = function (a) {
        switch ("string" == typeof a ? a : e) {
            case"rus":
                return ["Р’РѕСЃРєСЂРµСЃРµРЅСЊРµ", "РџРѕРЅРµРґРµР»СЊРЅРёРє", "Р’С‚РѕСЂРЅРёРє", "РЎСЂРµРґР°", "Р§РµС‚РІРµСЂРі", "РџСЏС‚РЅРёС†Р°", "РЎСѓР±Р±РѕС‚Р°"];
            case"eng":
                return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            default:
                if (a != e)return getWDF(e)
        }
    })(), (getMNS = function (a) {
        switch ("string" == typeof a ? a : e) {
            case"rus":
                return ["РЇРЅРІ", "Р¤РµРІ", "РњР°СЂС‚", "РђРїСЂ", "РњР°Р№", "РСЋРЅСЊ", "РСЋР»СЊ", "РђРІРі", "РЎРµРЅС‚", "РћРєС‚", "РќРѕСЏ", "Р”РµРє"];
            case"eng":
                return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            default:
                if (a != e)return getMNS(e)
        }
    })(), (getMNF = function (a) {
        switch ("string" == typeof a ? a : e) {
            case"rus":
                return ["РЇРЅРІР°СЂСЏ", "Р¤РµРІСЂР°Р»СЏ", "РњР°СЂС‚Р°", "РђРїСЂРµР»СЏ", "РњР°СЏ", "РСЋРЅСЏ", "РСЋР»СЏ", "РђРІРіСѓСЃС‚Р°", "РЎРµРЅС‚СЏР±СЂСЏ", "РћРєС‚СЏР±СЂСЏ", "РќРѕСЏР±СЂСЏ", "Р”РµРєР°Р±СЂСЏ"];
            case"eng":
                return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            default:
                if (a != e)return getMNF(e)
        }
    })();
    Date.prototype.strftime = function (a, b) {
        "string" != typeof a && (a = f), "string" != typeof b && (b = e);
        for (var c = getWDS(b), d = getWDF(b), g = getMNS(b), h = getMNF(b), i = !1, j = "", k = this.getFullYear(), l = this.getMonth(), m = this.getDate(), n = this.getHours(), o = this.getMinutes(), p = this.getSeconds(), q = this.getDay(), r = Math.floor((this - new Date(k, 0, 1)) / 864e5) + 1, s = 0, t = a.length, u = a[0]; s < t; ++s, u = a[s])if (i || "%" != u)if (i) {
            switch (u) {
                case"a":
                    j += c[q];
                    break;
                case"A":
                    j += d[q];
                    break;
                case"h":
                case"b":
                    j += g[l];
                    break;
                case"B":
                    j += h[l];
                    break;
                case"c":
                    j += c[q] + " " + g[l] + " " + m + " " + this.toTimeString().substr(10) + " " + k;
                    break;
                case"C":
                    j += Math.floor(k / 100);
                    break;
                case"d":
                case"e":
                    j += (m < 10 ? "d" == u ? "0" : " " : "") + m;
                    break;
                case"x":
                case"D":
                    j += (l < 9 ? "0" : "") + (l + 1) + "/" + (m < 10 ? "0" : "") + m + "/" + k.toString().substr(2, 2);
                    break;
                case"F":
                    j += k + "-" + (l < 9 ? "0" : "") + (l + 1) + "-" + (m < 10 ? "0" : "") + m;
                    break;
                case"y":
                case"g":
                    j += k.toString().substr(2, 2);
                    break;
                case"Y":
                case"G":
                    j += k;
                    break;
                case"H":
                    j += (n < 10 ? "0" : "") + n;
                    break;
                case"I":
                    j += (n % 12 < 10 ? "0" : "") + n % 12;
                    break;
                case"j":
                    j += r;
                    break;
                case"m":
                    j += (l < 9 ? "0" : "") + (l + 1);
                    break;
                case"M":
                    j += (o < 10 ? "0" : "") + o;
                    break;
                case"n":
                    j += "\n";
                    break;
                case"p":
                    j += Math.floor(n / 12) ? "PM" : "AM";
                    break;
                case"r":
                    j += (n % 12 < 10 ? "0" : "") + n % 12 + ":" + (o < 10 ? "0" : "") + o + ":" + (p < 10 ? "0" : "") + p + " " + (Math.floor(n / 12) ? "pm" : "am");
                    break;
                case"R":
                    j += (n < 10 ? "0" : "") + n + ":" + (o < 10 ? "0" : "") + o;
                    break;
                case"S":
                    j += (p < 10 ? "0" : "") + p;
                    break;
                case"t":
                    j += "\t";
                    break;
                case"X":
                case"T":
                    j += (n < 10 ? "0" : "") + n + ":" + (o < 10 ? "0" : "") + o + ":" + (p < 10 ? "0" : "") + p;
                    break;
                case"u":
                    j += q;
                    break;
                case"U":
                case"V":
                    break;
                case"w":
                    j += this.getDay();
                    break;
                case"W":
                    break;
                case"z":
                    j += this.toTimeString().match(/(\+|\-)\d+/)[0];
                    break;
                case"Z":
                    j += "GTM";
                    break;
                case"%":
                    j += "%";
                    break;
                default:
                    j += ""
            }
            i = !1
        } else i || (j += u); else i = !0;
        return j
    }, window.strftime = a, window.strptime = b
}(), function (a) {
    function b() {
        this._index = -1, this._summary = this.neutral()
    }

    var c = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173];
    b.create = function () {
        return new b
    }, b.push = function (a, b) {
        return b * a
    }, b.prototype.default = b.prototype.neutral = function () {
        return 1
    }, b.prototype.next = function () {
        if (++this._index >= c.length - 1)throw"РЎР»РёС€РєРѕРј РјРЅРѕРіРѕ Р·РЅР°С‡РµРЅРёР№ РґР»СЏ СЌРЅСѓРјРёСЂР°С‚РѕСЂР°: РЅРµ Р±РѕР»РµРµ 40";
        var a = c[this._index];
        return this._summary *= a, a
    }, b.prototype.sum = function () {
        return this._summary
    }, b.prototype.inSum = b.prototype.check = b.prototype.used = function (a, b) {
        var c = this._summary / a / b;
        return parseInt(c) - c != 0
    }, b.prototype.notInSum = b.prototype.unchecked = b.prototype.unused = function (a, b) {
        return !this.check(a, b)
    }, a.Enum = b
}(window), define("ecAddImpression", ["gaHook", "window.number_format"], function (a) {
    var b = {
        pluginName: "ec",
        methods: {
            addImpression: {
                urls: ["https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-impression", "https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=ru#impression-data"],
                morphemes: {
                    numeral: ["С‚РѕРІР°СЂ", "С‚РѕРІР°СЂР°", "С‚РѕРІР°СЂРѕРІ"],
                    many: "С‚РѕРІР°СЂС‹",
                    params: ["РїР°СЂР°РјРµС‚СЂ", "РїР°СЂР°РјРµС‚СЂР°", "РїР°СЂР°РјРµС‚СЂРѕРІ"]
                },
                init: function () {
                    this.log()
                },
                log: function () {
                    this.group("РџРѕРєР°Р·Р°РЅ С‚РѕРІР°СЂ", this.options.data.name + ":", String.countPostfix(this.options.length, this.morphemes.params, null, !1)), this.options.log(), this.endGroup()
                },
                optionsList: [{
                    name: "id",
                    alias: "РљРѕРґ С‚РѕРІР°СЂР°",
                    require: !0,
                    notRequireIf: ["name"]
                }, {name: "name", alias: "РќР°Р·РІР°РЅРёРµ", require: !0, notRequireIf: ["id"]}, {
                    name: "list",
                    alias: "РљРѕР»Р»РµРєС†РёСЏ"
                }, {name: "brand", alias: "Р‘СЂРµРЅРґ"}, {
                    name: "category",
                    alias: "РљР°С‚РµРіРѕСЂРёСЏ"
                }, {name: "variant", alias: "Р’Р°СЂРёР°РЅС‚/РњРѕРґРёС„РёРєР°С†РёСЏ"}, {
                    name: "position",
                    alias: "РџРѕР·РёС†РёСЏ С‚РѕРІР°СЂР° РІ РєРѕР»Р»РµРєС†РёРё"
                }, {name: "price", alias: "Р¦РµРЅР°"}],
                optionValueAliases: {
                    price: function (a) {
                        return number_format(a, 2, ".", "'") + " СЂ."
                    }
                }
            }
        }
    };
    a.gaHook.connectPlugin(b)
}, ["ga"]), define("ecAddProduct", ["gaHook", "window.number_format"], function (a) {
    var b = {
        pluginName: "ec", methods: {
            addProduct: {
                urls: ["https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-click", "https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-data"],
                morphemes: {
                    numeral: ["С‚РѕРІР°СЂ", "С‚РѕРІР°СЂР°", "С‚РѕРІР°СЂРѕРІ"],
                    many: "С‚РѕРІР°СЂС‹",
                    params: ["РїР°СЂР°РјРµС‚СЂ", "РїР°СЂР°РјРµС‚СЂР°", "РїР°СЂР°РјРµС‚СЂРѕРІ"]
                },
                init: function () {
                    this.log()
                },
                log: function () {
                    this.group("Р”РѕР±Р°РІР»РµРЅ С‚РѕРІР°СЂ", this.options.data.name + ":", String.countPostfix(this.options.length, this.morphemes.params, null, !1)), this.options.log(), this.endGroup()
                },
                optionsList: [{
                    name: "id",
                    alias: "РљРѕРґ С‚РѕРІР°СЂР°",
                    require: !0,
                    notRequireIf: ["name"]
                }, {name: "name", alias: "РќР°Р·РІР°РЅРёРµ", require: !0, notRequireIf: ["id"]}, {
                    name: "brand",
                    alias: "Р‘СЂРµРЅРґ"
                }, {name: "category", alias: "РљР°С‚РµРіРѕСЂРёСЏ"}, {
                    name: "variant",
                    alias: "Р’Р°СЂРёР°РЅС‚/РњРѕРґРёС„РёРєР°С†РёСЏ"
                }, {name: "price", alias: "Р¦РµРЅР°"}, {
                    name: "quantity",
                    alias: "РљРѕР»РёС‡РµСЃС‚РІРѕ"
                }, {
                    name: "coupon",
                    alias: "РџСЂРѕРјРѕРєРѕРґ (РљРѕРґ РєСѓРїРѕРЅР°, СЃРІСЏР·Р°РЅРЅРѕРіРѕ СЃ С‚РѕРІР°СЂРѕРј)"
                }, {name: "position", alias: "РџРѕР·РёС†РёСЏ С‚РѕРІР°СЂР° РІ РєРѕР»Р»РµРєС†РёРё"}],
                optionValueAliases: {
                    price: function (a) {
                        return number_format(a, 2, ".", "'") + " СЂ."
                    }
                }
            }
        }
    };
    a.gaHook.connectPlugin(b)
}, ["ga"]), define("ecSetAction", ["gaHook", "ecAddProduct"], function (a) {
    var b = {
        pluginName: "ec",
        methods: {
            setAction: {
                urls: ["https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-data"],
                morphemes: {
                    numeral: ["РґРµР№СЃС‚РІРёРµ", "РґРµР№СЃС‚РІРёСЏ", "РґРµР№СЃС‚РІРёР№"],
                    many: "РґРµР№СЃС‚РІРёСЏ",
                    params: ["РїР°СЂР°РјРµС‚СЂ", "РїР°СЂР°РјРµС‚СЂР°", "РїР°СЂР°РјРµС‚СЂРѕРІ"]
                },
                init: function () {
                    this.log()
                },
                log: function () {
                    var a = this.getHistory("ec:addProduct");
                    this.group("РћС‚РїСЂР°РІРєР° СЃРѕР±С‹С‚РёСЏ:", this.options.sourceData._hitType), this.group("РџР°СЂР°РјРµС‚СЂС‹ РґРµР№СЃС‚РІРёСЏ:", String.countPostfix(this.options.length, this.morphemes.params, null, !1)), this.options.log(), this.endGroup(), a.length && (this.group("РЎРѕРґРµСЂР¶РёС‚ СЃР»РµРґСѓСЋС‰РёРµ " + this.morphemes.many + ":", String.countPostfix(a.length, this.morphemes.numeral, null, !1)), a.log(), this.endGroup()), this.endGroup(), this.clearHistory("ec:addProduct")
                },
                optionsList: [{
                    name: "_hitType",
                    alias: "РўРёРї РґРµР№СЃС‚РІРёСЏ",
                    require: !0,
                    notIsOption: !0
                }, {
                    name: "id",
                    alias: "РРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ С‚СЂР°РЅР·Р°РєС†РёРё",
                    requireIf: [["_hitType", ["purchase", "refund"]]]
                }, {name: "affiliation", alias: "РњР°РіР°Р·РёРЅ/Р¤РёР»РёР°Р»"}, {
                    name: "revenue",
                    alias: "РЎСѓРјРјР°"
                }, {name: "tax", alias: "РЎСѓРјРјР° РІСЃРµС… РЅР°Р»РѕРіРѕРІ"}, {
                    name: "shipping",
                    alias: "РЎС‚РѕРёРјРѕСЃС‚СЊ РґРѕСЃС‚Р°РІРєРё"
                }, {name: "coupon", alias: "РСЃРїРѕР»СЊР·РѕРІР°РЅРЅС‹ РїСЂРѕРјРѕРєРѕРґ (РєСѓРїРѕРЅ)"}, {
                    name: "list",
                    alias: "РЎРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ"
                }, {name: "step", alias: "РЁР°Рі РїРѕРєСѓРїРєРё"}, {
                    name: "option",
                    alias: "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ"
                }],
                optionValueAliases: {
                    _hitType: function (a) {
                        return {detail: "Р”РµС‚Р°Р»РёР·Р°С†РёСЏ (detail)"}[a] || null
                    }, price: function (a) {
                        return number_format(a, 2, ".", "'") + " СЂ."
                    }, revenue: function (a) {
                        return number_format(a, 2, ".", "'") + " СЂ."
                    }, tax: function (a) {
                        return number_format(a, 2, ".", "'") + " СЂ."
                    }, shipping: function (a) {
                        return number_format(a, 2, ".", "'") + " СЂ."
                    }
                }
            }
        }
    };
    a.gaHook.connectPlugin(b)
}, ["ga"]), define("ecommerceAddItem", ["gaHook"], function (a) {
    var b = {
        pluginName: "ecommerce",
        methods: {
            addItem: {
                url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#item",
                morphemes: {
                    numeral: ["С‚РѕРІР°СЂ", "С‚РѕРІР°СЂР°", "С‚РѕРІР°СЂРѕРІ"],
                    many: "С‚РѕРІР°СЂС‹",
                    params: ["РїР°СЂР°РјРµС‚СЂ", "РїР°СЂР°РјРµС‚СЂР°", "РїР°СЂР°РјРµС‚СЂРѕРІ"]
                },
                init: function () {
                    this.insertBy(this.options.data.id)
                },
                log: function () {
                    this.group("РўРѕРІР°СЂ", this.options.data.name + ":", String.countPostfix(this.options.length, this.morphemes.params, null, !1)), this.options.log(), this.endGroup()
                },
                optionsList: [{
                    name: "id",
                    alias: "РРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ С‚СЂР°РЅР·Р°РєС†РёРё",
                    require: !0
                }, {name: "name", alias: "РќР°Р·РІР°РЅРёРµ", require: !0}, {
                    name: "sku",
                    alias: "РљРѕРґ С‚РѕРІР°СЂР°"
                }, {name: "category", alias: "РљР°С‚РµРіРѕСЂРёСЏ"}, {
                    name: "price",
                    alias: "Р¦РµРЅР°"
                }, {name: "quantity", alias: "РљРѕР»РёС‡РµСЃС‚РІРѕ"}]
            }
        }
    };
    a.gaHook.connectPlugin(b)
}, ["ga"]), define("ecommerceAddTransaction", ["gaHook"], function (a) {
    var b = {
        pluginName: "ecommerce",
        methods: {
            addTransaction: {
                url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#overview",
                morphemes: {
                    numeral: ["С‚СЂР°РЅР·Р°РєС†РёСЏ", "С‚СЂР°РЅР·Р°РєС†РёРё", "С‚СЂР°РЅР·Р°РєС†РёР№"],
                    many: "С‚СЂР°РЅР·Р°РєС†РёРё",
                    params: ["РїР°СЂР°РјРµС‚СЂ", "РїР°СЂР°РјРµС‚СЂР°", "РїР°СЂР°РјРµС‚СЂРѕРІ"]
                },
                init: function () {
                    this.createBufferBy(this.options.data.id), this.group("РЎРѕР·РґР°РЅР° С‚СЂР°РЅР·Р°РєС†РёСЏ СЃ id:", this.options.data.id), this.options.log(), this.endGroup()
                },
                log: function () {
                    this.group("РўСЂР°РЅР·Р°РєС†РёСЏ:", this.options.data.id), this.group("РџР°СЂР°РјРµС‚СЂС‹ С‚СЂР°РЅР·Р°РєС†РёРё:", String.countPostfix(this.options.length, this.morphemes.params, null, !1)), this.options.log(), this.endGroup();
                    for (var a in this.buffer.groups)if (this.buffer.groups.hasOwnProperty(a)) {
                        var b = this.buffer.groups[a];
                        this.group("РЎРѕРґРµСЂР¶РёС‚ СЃР»РµРґСѓСЋС‰РёРµ " + b.morphemes.many + ":", String.countPostfix(b.length, b.morphemes.numeral, null, !1)), b.log(), this.endGroup()
                    }
                    this.endGroup()
                },
                optionsList: [{name: "id", alias: "РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ", required: !0}, {
                    name: "affiliation",
                    alias: "РїР°СЂС‚РЅС‘СЂСЃС‚РІРѕ",
                    required: !1
                }, {name: "revenue", alias: "РґРѕС…РѕРґ", require: !1}, {
                    name: "shipping",
                    alias: "РґРѕСЃС‚Р°РІРєР°",
                    required: !1
                }, {name: "tax", alias: "РЅР°Р»РѕРі", require: !1}]
            }
        }
    };
    a.gaHook.connectPlugin(b)
}, ["ga"]), define("ecommerceSend", ["gaHook"], function (a) {
    var b = {
        pluginName: "ecommerce",
        methods: {
            send: {
                url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#sendingData",
                init: function () {
                    this.toConsole("РћС‚РїСЂР°РІРєР° РґР°РЅРЅС‹С… ecommerce (Р·Р°РєСЂС‹С‚РёРµ РІСЃРµС… С‚СЂР°РЅР·Р°РєС†РёР№):"), this.closeBuffers(), this.toConsole("РћС‚РїСЂР°РІРєР° РґР°РЅРЅС‹С… ecommerce...")
                }
            }
        }
    };
    a.gaHook.connectPlugin(b)
}, ["ga"]), define("gaBase", ["gaHook"], function (a) {
    var b = {
        pluginName: "",
        methods: {
            send: {
                url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/tracker-object-reference",
                morphemes: {numeral: ["СЃРѕР±С‹С‚РёРµ", "СЃРѕР±С‹С‚РёСЏ", "СЃРѕР±С‹С‚РёР№"], many: "СЃРѕР±С‹С‚РёСЏ"},
                log: function () {
                    this.group("РЎСЂР°Р±РѕС‚Р°Р» РјРµС‚РѕРґ", (this.pluginName ? this.pluginName + ":" : "") + this.methodName, "СЃРѕ СЃР»РµРґСѓСЋС‰РёРјРё РїР°СЂР°РјРµС‚СЂР°РјРё:", String.countPostfix(this.options.length, ["РїР°СЂР°РјРµС‚СЂ", "РїР°СЂР°РјРµС‚СЂР°", "РїР°СЂР°РјРµС‚СЂРѕРІ"], null, !1)), this.options.log(), this.endGroup()
                },
                optionsList: [{name: "hitType", alias: "С‚РёРї", require: !0}, {
                    name: "eventCategory",
                    alias: "РєР°С‚РµРіРѕСЂРёСЏ СЃРѕР±С‹С‚РёСЏ",
                    require: !0
                }, {
                    name: "eventAction",
                    alias: "С‚РёРї РІР·Р°РёРјРѕРґРµР№СЃС‚РІРёСЏ",
                    require: !0
                }, {name: "eventLabel", alias: "РєР°С‚РµРіРѕСЂРёСЏ СЃРѕР±С‹С‚РёСЏ"}, {
                    name: "eventValue",
                    alias: "С‡РёСЃР»РµРЅРЅРѕРµ Р·РЅР°С‡РµРЅРёРµ, СЃРІСЏР·Р°РЅРЅРѕРµ СЃ СЃРѕР±С‹С‚РёРµРј"
                }, {name: "nonInteraction", alias: "СЃРѕР±С‹С‚РёРµ Р±РµР· РІР·Р°РёРјРѕРґРµР№СЃС‚РІРёСЏ"}]
            },
            require: {
                morphemes: {numeral: ["РѕРїС†РёСЏ", "РѕРїС†РёРё", "РѕРїС†РёР№"], many: "РѕРїС†РёРё"},
                log: function () {
                    var a = 0;
                    for (var b in this.options.data.pluginOptions)this.options.data.pluginOptions.hasOwnProperty(b) && ++a;
                    console.groupCollapsed("РџРѕРґРєР»СЋС‡РµРЅРёРµ РїР»Р°РіРёРЅР°", this.options.data.pluginName), this.options.log(), console.groupEnd()
                },
                optionsList: [{
                    name: "pluginName",
                    alias: "РЅР°Р·РІР°РЅРёРµ РїР»Р°РіРёРЅР°",
                    require: !0
                }, {
                    name: "pluginOptions",
                    alias: "РѕР±СЉРµРєС‚ РёРЅРёС†РёР°Р»РёР·Р°С†РёРё РїР»Р°РіРёРЅР°",
                    require: !1
                }]
            },
            set: {
                url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/accessing-trackers#using_the_ga_command_queue",
                morphemes: {
                    numeral: ["Р·РЅР°С‡РµРЅРёРµ", "Р·РЅР°С‡РµРЅРёСЏ", "Р·РЅР°С‡РµРЅРёР№"],
                    many: "Р·РЅР°С‡РµРЅРёСЏ",
                    codes: {
                        numeral: ["РєРѕРґ С‚РѕРІР°СЂР°", "РєРѕРґР° С‚РѕРІР°СЂРѕРІ", "РєРѕРґРѕРІ С‚РѕРІР°СЂРѕРІ"],
                        many: "РєРѕРґС‹ С‚РѕРІР°СЂРѕРІ"
                    }
                },
                init: function () {
                    var a = this.morphemes.numeral;
                    "dimension3" == this.options.sourceData.name && (a = this.morphemes.codes.numeral);
                    var b = this.options.data.name;
                    b = b[0].toUpperCase() + b.substr(1) + ":";
                    var c = this.options.data.value;
                    if (this.group("РћР±РЅРѕРІР»РµРЅРёРµ РѕС‡РµСЂРµРґРё РєРѕРјР°РЅРґ:", "ga('set', '" + this.options.sourceData.name + "', '" + this.options.sourceData.value + "');"), c instanceof Array) {
                        this.group(b, String.countPostfix(c.length, a, null, !1));
                        for (var d = 0, e = c.length; d < e; ++d)this.toConsole(d + ":", c[d]);
                        this.endGroup()
                    } else this.toConsole(b, c);
                    this.endGroup()
                },
                optionsList: [{name: "name", alias: "РїРѕР»Рµ", required: !0}, {
                    name: "value",
                    alias: "Р·РЅР°С‡РµРЅРёРµ",
                    required: !0
                }],
                pageTypes: {
                    cart: "РљРѕСЂР·РёРЅР°",
                    product: "РљР°СЂС‚РѕС‡РєР° С‚РѕРІР°СЂР°",
                    order: "РџРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ Р·Р°РєР°Р·Р° (4. Р¤РёРЅР°Р»)"
                },
                optionValueAliases: {
                    name: {
                        dimension1: "РіРѕСЂРѕРґ", dimension3: function () {
                            return this.morphemes.codes.many
                        }, dimension4: "СЃС‚СЂР°РЅРёС†Р°", dimension5: "СЃС‚РѕРёРјРѕСЃС‚СЊ"
                    }, value: function (a) {
                        switch (this.options.sourceData.name) {
                            case"dimension3":
                                /,?\s/g.test(a) && (a = a.split(/,?\s+/g));
                                break;
                            case"dimension4":
                                a = this.pageTypes[a];
                                break;
                            case"dimension5":
                                a = number_format(a, 2, ".", "'") + " СЂ."
                        }
                        return a
                    }
                }
            }
        }
    };
    a.gaHook.connectPlugin(b)
}, ["ga"]), define("gaLoader", ["window.ga", "gaHook"], function (a) {
    function b() {
        if (!d) {
            var b = window.GoogleAnalyticsObject || "ga";
            !!$('meta[name="superuser"]').length && a.gaHook.init(b)
        }
    }

    function c() {
        b(), d = !0
    }

    var d = !1;
    window.GoogleAnalyticsObject ? window[window.GoogleAnalyticsObject](function () {
        unit("gaViewerInitializer").define(c)
    }) : c()
}, ["ga"]), unit("ga").require(window.GoogleAnalyticsObject || "ga").import("gaViewerInitializer").define(function () {
    return window.ga
}), define("gaPluginBase", ["window.deepClone"], function () {
    function a(a) {
        this.buffer = a, this.list = [], this.length = 0, this.morphemes = {
            numeral: ["СЌР»РµРјРµРЅС‚", "СЌР»РµРјРµРЅС‚Р°", "СЌР»РµРјРµРЅС‚РѕРІ"],
            many: "СЌР»РµРјРµРЅС‚С‹"
        }, this.__morphemesIsDefault = !0
    }

    function b(a) {
        this.list = [], this.groups = {}, this.length = 0, this._context = a
    }

    function c(a, b, d) {
        var e = c.parse(a, b, d);
        this.data = e.data, this.titles = e.titles, this.length = e.length
    }

    function d(d, g, h) {
        function l(b) {
            this.options = new c(b, m, this), this.args = b, i.insert(this);
            var d = this.pluginName + ":" + this.methodName;
            j.hasOwnProperty(d) || (j[d] = new a(null)), j[d].insert(this);
            var e = this.options.data, f = {};
            this.options.sourceData = this.options.data;
            for (var g in e)if (e.hasOwnProperty(g)) {
                var h = n[g], k = null;
                if (h instanceof Function) k = h.call(this, e[g]); else if (h && (h instanceof Array || h.constructor === Object))for (var l in h)if (h.hasOwnProperty(l) && l == e[g]) {
                    k = h[l] instanceof Function ? h[l].call(this, e[g]) : h[l];
                    break
                }
                null == k && (k = e[g]), f[g] = k
            }
            this.options.data = f, this.init()
        }

        var m = h.optionsList || [], n = h.optionValueAliases || {}, o = h.init || function () {
                this.log()
            };
        delete h.optionsList, delete h.optionValueAliases, l.parseOptions = function (a) {
            return c.parse(a, m)
        };
        var p = l.prototype;
        p.pluginName = d, p.methodName = g, p.init = function () {
            o.apply(this, arguments)
        }, p.log = function () {
            console.groupCollapsed((this.pluginName ? this.pluginName + ":" : "") + this.methodName, "СЃРѕ СЃР»РµРґСѓСЋС‰РёРјРё РїР°СЂР°РјРµС‚СЂР°РјРё:", String.countPostfix(this.options.length, ["РїР°СЂР°РјРµС‚СЂ", "РїР°СЂР°РјРµС‚СЂР°", "РїР°СЂР°РјРµС‚СЂРѕРІ"], null, !1)), this.options.log(), console.groupEnd()
        }, p.insert = function (a) {
            return !0
        };
        for (var q in h)h.hasOwnProperty(q) && (h[q] instanceof Function || !(h[q] instanceof Object) ? p[q] = h[q] : p[q] = deepClone(h[q]));
        return p.createBufferBy = function (a) {
            var c = this.pluginName + ":" + this.methodName;
            e.hasOwnProperty(c) || (e[c] = {}), e[c].hasOwnProperty(a) || (e[c][a] = new b(this)), this.buffer = e[c][a], f.hasOwnProperty(a) || (f[a] = {}), f[a].hasOwnProperty(c) || (f[a][c] = this)
        }, p.closeBuffers = function () {
            for (var a in e)if (e.hasOwnProperty(a))for (var b in e[a])e[a].hasOwnProperty(b) && (e[a][b]._context.log(), delete e[a][b])
        }, p.insertBy = function (a) {
            var b = f[a];
            for (var c in b)if (b.hasOwnProperty(c)) {
                var d = b[c];
                if (d.insert(this)) {
                    var g = e[c][a];
                    g.insert(this)
                }
            }
        }, p.getHistory = function (b) {
            return null == b ? i : j[b] instanceof a ? j[b] : k
        }, p.clearHistory = function (b) {
            if (null == b)return i = [];
            j[b] instanceof a && j[b].clear()
        }, p.group = function () {
            console.groupCollapsed.apply(console, arguments)
        }, p.endGroup = function () {
            console.groupEnd()
        }, p.toConsole = function () {
            console.log.apply(console, arguments)
        }, l
    }

    var e = {}, f = {}, g = a.prototype;
    g.valueOf = function () {
        return this.list
    }, g.insert = function (a) {
        if (this.list.push(a), ++this.length, this.__morphemesIsDefault) {
            for (var b in a.morphemes)a.morphemes.hasOwnProperty(b) && (this.morphemes[b] = a.morphemes[b]);
            this.__morphemesIsDefault = !1
        }
    }, g.clear = function () {
        this.list = [], this.length = 0
    }, g.log = function () {
        for (var a = 0, b = this.list.length; a < b; ++a)this.list[a].log()
    };
    var h = b.prototype;
    h.valueOf = function () {
        return this.list
    }, h.insert = function (b) {
        this.list.push(b), ++this.length;
        var c = b.pluginName + ":" + b.methodName;
        this.groups.hasOwnProperty(c) || (this.groups[c] = new a(this)), this.groups[c].insert(b)
    }, h.log = function () {
        for (var a = 0, b = this.list.length; a < b; ++a)this.list[a].log()
    }, c.parse = function (a, b, d) {
        for (var e = {data: {}}, f = 0, g = 0, h = 0, i = b.length; h < i; ++h)!0 === b[h].require ? (b[h].notRequireIf || (b[h].notRequireIf = []), b[h].notRequireIf instanceof Array || (b[h].notRequireIf = [b[h].notRequireIf]), delete b[h].requireIf) : (b[h].requireIf || (b[h].requireIf = []), b[h].requireIf instanceof Array || (b[h].requireIf = [b[h].requireIf]), delete b[h].notRequireIf, delete b[h].require), !0 === b[h].notIsOption && ++g;
        for (var h = 0; h < g; ++h) {
            if (a[h] instanceof Object) {
                c.parseObject(e.data, b, d);
                break
            }
            e.data[b[h].name] = a[h], ++f
        }
        return e = a.length > g && a[g].valueOf().constructor === Object ? c.parseObject(a[g], b, d, e.data) : c.parseArgs(a.slice(g), b, d, e.data), e.length += f, e
    }, c.getRequireErrorText = function (a, b) {
        var c = "", d = "РџР°СЂР°РјРµС‚СЂ " + b.name + " СЏРІР»СЏРµС‚СЃСЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Рј",
            e = "РќРµРёР·РІРµСЃС‚РЅР°СЏ РѕС€РёР±РєР°", f = [];
        if (!0 === b.require) {
            if (b.notRequireIf.length) {
                e = !1, c = " (РµСЃР»Рё РЅРµ " + (1 == b.notRequireIf.length ? "СѓРєР°Р·Р°РЅ РїР°СЂР°РјРµС‚СЂ" : "СѓРєР°Р·Р°РЅ С…РѕС‚СЏ Р±С‹ РѕРґРёРЅ РёР· РїР°СЂР°РјРµС‚СЂРѕРІ") + " ";
                for (var g = 0, h = b.notRequireIf.length; g < h; ++g)b.notRequireIf[g] instanceof Array ? f.push('"' + b.notRequireIf[g][0] + '" СЃ РѕРґРЅРёРј РёР· Р·РЅР°С‡РµРЅРёР№ ["' + b.notRequireIf[g][1].join('", "') + '"]') : f.push('"' + b.notRequireIf[g] + '"');
                c += f.join(", "), c += "), РЅРѕ РЅРё РѕРґРёРЅ РёР· РЅРёС… РЅРµ СѓРєР°Р·Р°РЅ"
            }
        } else if (b.requireIf.length) {
            e = !1, c = ", РµСЃР»Рё " + (1 == b.requireIf.length ? "СѓРєР°Р·Р°РЅ РїР°СЂР°РјРµС‚СЂ" : "СѓРєР°Р·Р°РЅ С…РѕС‚СЏ Р±С‹ РѕРґРёРЅ РёР· РїР°СЂР°РјРµС‚СЂРѕРІ");
            for (var g = 0, h = b.requireIf.length; g < h; ++g)b.requireIf[g] instanceof Array ? f.push('"' + b.requireIf[g][0] + '" СЃ РѕРґРЅРёРј РёР· Р·РЅР°С‡РµРЅРёР№ ["' + b.requireIf[g][1].join('", "') + '"]') : f.push('"' + b.requireIf[g] + '"');
            c += f.join(", ")
        }
        return e || d + c
    }, c.getErrorObject = function (a, b) {
        for (var d = {
            title: "Р’Рѕ РІСЂРµРјСЏ РІС‹Р·РѕРІР° " + a.pluginName + ":" + a.methodName + " РїСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°:",
            stack: []
        }, e = 0, f = b.length; e < f; ++e) {
            var g = c.getRequireErrorText(a, b[e]);
            d.stack.push(g)
        }
        return d
    }, c.parseObject = function (a, b, d, e) {
        e instanceof Object || (e = {});
        for (var f = {}, g = 0, h = [], i = {}, j = 0, k = b.length; j < k; ++j)for (var l = b[j].requireIf || [], m = 0, n = l.length; m < n; ++m) {
            var o = l[m], p = null;
            o instanceof Array && (p = o[1] || null, null == p || p instanceof Array || (p = [p]), o = o[0]), b[j].require = e.hasOwnProperty(o) && (null == p || p.indexOf(e[o]) > -1)
        }
        for (var j = 0, k = b.length; j < k; ++j)a.hasOwnProperty(b[j].name) && null != a[b[j].name] ? (e[b[j].name] = a[b[j].name], ++g) : b[j].require && !b[j].notIsOption && (i[b[j].name] = b[j].notRequireIf, h.push(b[j])), f[b[j].name] = b[j].alias || b[j].name;
        for (var j = 0; j < h.length; ++j)for (var q = h[j].name, r = i[q], m = 0, n = r.length; m < n; ++m) {
            var s = r[m], t = null;
            if (s instanceof Array && (t = s[1] || null, null == t || t instanceof Array || (t = [t]), s = s[0]), e.hasOwnProperty(s) && (null == t || t.indexOf(e[s]) > -1)) {
                delete i[q], h.splice(j, 1), --j;
                break
            }
        }
        if (h.length) {
            var u = c.getErrorObject(d, h), v = u.title + "\n" + u.stack.join("\n") + "\n";
            throw new Error(v)
        }
        return {data: e, titles: f, length: g}
    }, c.parseArgs = function (a, b, d, e) {
        e instanceof Object || (e = {});
        for (var f = {}, g = 0, h = [], i = 0, j = b.length; i < j; ++i)i < a.length && null != a[i] ? (e[b[i].name] = a[i], ++g) : b[i].required && h.push(b[i]), f[b[i].name] = b[i].alias || b[i].name;
        if (h.length) {
            var k = c.getErrorObject(d, h), l = k.title + k.stack.join("\n") + "\n";
            throw new Error(l)
        }
        return {data: e, titles: f, length: g}
    }, c.prototype.log = function () {
        for (var a in this.data)this.data.hasOwnProperty(a) && console.log(this.titles[a] + ":", this.data[a])
    };
    var i = new a(null), j = {}, k = new a(null);
    return {createGaPlugin: d}
}), unit("gaHook", {
    import: ["gaPluginBase"], require: ["ga", "String.countPostfix"], define: function (a) {
        function b() {
            if (this.available = window.localStorage instanceof Function, this.queue = {}, !this.available)for (var a in this)this.hasOwnProperty(a) && this[a] instanceof Function && (this[a] = function () {
            });
            this.name = i, this.livetime = n, this.stop = !1;
            var b = this;
            $(function () {
                document.body.onbeforeunload = function () {
                    b.stop = !0
                }
            })
        }

        function c(a, b) {
            return h.apply(a, b)
        }

        function d(a, b) {
            var c = a.match(/([^:.]+)/g);
            if (c instanceof Array && c.length) {
                var d = c.length > 2 ? c.splice(0, 1)[0] : "", e = c.length > 1 ? c.splice(0, 1)[0] : "", f = c[0];
                if (l.hasOwnProperty(e)) {
                    var g = l[e];
                    if (g.hasOwnProperty(f)) {
                        var h = g[f];
                        if (h instanceof Object && h.plugin instanceof Function) {
                            var i = (h.pluginName ? h.pluginName + ":" : "") + h.methodName;
                            m.hasOwnProperty(i) || (m[i] = []);
                            try {
                                m[i].push(new h.plugin(b))
                            } catch (a) {
                                console.error(a.message + '\nР’С‹Р·РІР°РЅРЅР°СЏ РєРѕРјР°РЅРґР°: ga("' + (d ? d + "." : "") + (e ? e + ":" : "") + f + '", ' + JSON.stringify(b).replace(/\[|\]/g, "").replace(/\,\s*/g, ", ") + ");")
                            }
                            return
                        }
                    }
                }
                if (j) {
                    var k = "РќРµ РѕРїРёСЃР°РЅ РїР»Р°РіРёРЅ " + e + ":";
                    null != f && (k = "РќРµ РѕРїРёСЃР°РЅ РјРµС‚РѕРґ " + ([null, ""].indexOf(e) > -1 ? "" : e + ":") + f + ":"), console.groupCollapsed(k), console.log("РўСЂРµРєРµСЂ:\t", d || null), console.log("РџР»Р°РіРёРЅ:\t", e || null), console.log("РњРµС‚РѕРґ:\t", f), console.groupCollapsed("РђСЂРіСѓРјРµРЅС‚С‹ (" + b.length + "):");
                    for (var n in b)b.hasOwnProperty(n) && console.log(n + ":", b[n]);
                    console.groupEnd(), console.groupEnd()
                }
            } else console.warn("РќРµРёР·РІРµСЃС‚РЅС‹Р№ С„РѕСЂРјР°С‚ СЃРѕР±С‹С‚РёР№ Google Analytics: " + arguments[0])
        }

        function e() {
            var a = [];
            if (Array.prototype.push.apply(a, arguments), a[0] instanceof Function)return j && (console.groupCollapsed("Р’ Google РђРЅР°Р»РёС‚РёРєСѓ РґРѕР±Р°РІР»РµРЅР° С„СѓРЅРєС†РёСЏ"), console.log(a[0].toString()), console.groupEnd()), c(this, a);
            var b = a[0].match(/([^:.]+)/g);
            b instanceof Array && b.length || console.warn("РќРµРёР·РІРµСЃС‚РЅС‹Р№ С„РѕСЂРјР°С‚ СЃРѕР±С‹С‚РёР№ Google Analytics: " + a[0]), r = (new Date).getTime(), d(a[0], a.slice(1)), p.push(a), c(this, a)
        }

        function f(a) {
            if (a && "string" == typeof a.valueOf() && (k = a), !(window[k] instanceof Function && !0 === window[k].__inited__)) {
                0 == q && (console.info("Р”Р»СЏ СѓРґРѕР±СЃС‚РІР° С‡С‚РµРЅРёСЏ РІ РєРѕРЅСЃРѕР»Рё РІРєР»СЋС‡РёС‚Рµ РѕС‚РѕР±СЂР°Р¶РµРЅРёРµ С‚РѕР»СЊРєРѕ Р»РѕРіРѕРІ (Logs)!\nРќРµ РѕРїРёСЃР°РЅРЅС‹Рµ СЃРѕР±С‹С‚РёСЏ РёР»Рё РїР»Р°РіРёРЅС‹ Google Analystics РјРѕРіСѓС‚ Р±С‹С‚СЊ РґРѕРїРёСЃР°РЅС‹\nР”Р»СЏ РґРѕР±Р°РІР»РµРЅРёСЏ/СѓРґР°Р»РµРЅРёСЏ/СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ С„РѕСЂРјР°С‚Р° РІС‹РІРѕРґР° Р»РѕРіРѕРІ, РѕС‚РїСЂР°РІР»СЏР№С‚Рµ\nСЃРІРѕРё РїРѕР¶РµР»Р°РЅРёСЏ РЅР° pabolkov.dn@dns-shop.ru (СЃ С‚РµРјРѕР№: Р¤РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёРµ Р»РѕРіРѕРІ GA)."), q = !0), h = window[k], e.__inited__ = !0, window[k] = e, p.load();
                var b = p.toList();
                unit().require("ga").define(function () {
                    if (b.length)try {
                        console.groupCollapsed("Р—Р°РїСЂРѕСЃС‹ Рє Google Р°РЅР°Р»РёС‚РёРєРµ, РІС‹РїРѕР»РЅРµРЅРЅС‹Рµ РЅРµ Р±РѕР»РµРµ С‡РµРј Р·Р°", n, "РјСЃ. РґРѕ РїРµСЂРµС…РѕРґР°/РѕР±РЅРѕРІР»РµРЅРёСЏ СЃС‚СЂР°РЅРёС†С‹:", String.countPostfix(b.length, ["РєРѕРјР°РЅРґР°", "РєРѕРјР°РЅРґС‹", "РєРѕРјР°РЅРґ"], null, !1));
                        for (var a = 0, c = b.length; a < c; ++a)try {
                            d(b[a][0], b[a].slice(1))
                        } catch (a) {
                            console.error(a)
                        }
                        console.groupEnd(), p.clear()
                    } catch (a) {
                        console.groupEnd()
                    }
                })
            }
        }

        function g(b) {
            if (!b.hasOwnProperty("pluginName") || !(b.pluginName instanceof String || "string" == typeof b.pluginName))return console.error("РќРµ СѓРєР°Р·Р°РЅРѕ РёРјСЏ РїР»Р°РіРёРЅР° (Plugin.pluginName): РїР»Р°РіРёРЅ РїСЂРѕРёРіРЅРѕСЂРёСЂРѕРІР°РЅ!");
            l.hasOwnProperty(b.pluginName) || (l[b.pluginName] = {});
            var c = l[b.pluginName];
            for (var d in b.methods)b.methods.hasOwnProperty(d) && (c.hasOwnProperty(d) && console.warn("<" + b.pluginName + ":" + d + " ~ " + d + "> Р±СѓРґРµС‚ РїРµСЂРµРѕРїСЂРµРґРµР»С‘РЅ"), c[d] = {
                pluginName: b.pluginName,
                methodName: d,
                plugin: new a.gaPluginBase.createGaPlugin(b.pluginName, d, b.methods[d])
            })
        }

        var h, i = "ga-console-viewer-last-queue", j = !0, k = "ga", l = {}, m = {}, n = 1e4, o = b.prototype;
        o.save = function () {
            window.localStorage.setItem(this.name, JSON.stringify(this.queue))
        }, o.push = function (a) {
            var b = (new Date).getTime();
            this.queue.hasOwnProperty(b) || (this.queue[b] = []), this.queue[b].push(a), this.save();
            var c = this, d = setTimeout(function () {
                clearTimeout(d), c.stop || c.remove(b)
            }, this.livetime)
        }, o.remove = function (a) {
            delete this.queue[a], this.save()
        }, o.load = function () {
            this.queue = JSON.parse(window.localStorage.getItem(this.name)) || {}
        }, o.toList = function () {
            var a = [];
            for (var b in this.queue)this.queue.hasOwnProperty(b) && Array.prototype.push.apply(a, this.queue[b]);
            return a
        }, o.clear = function () {
            this.queue = {}, this.save()
        };
        var p = new b, q = !1, r = null;
        return {init: f, connectPlugin: g}
    }
}), function (a) {
    function b(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0], d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }

    if (a.support.touch = "ontouchend" in document, a.support.touch) {
        var c, d = a.ui.mouse.prototype, e = d._mouseInit, f = d._mouseDestroy;
        d._touchStart = function (a) {
            var d = this;
            !c && d._mouseCapture(a.originalEvent.changedTouches[0]) && (c = !0, d._touchMoved = !1, b(a, "mouseover"), b(a, "mousemove"), b(a, "mousedown"))
        }, d._touchMove = function (a) {
            c && (this._touchMoved = !0, b(a, "mousemove"))
        }, d._touchEnd = function (a) {
            c && (b(a, "mouseup"), b(a, "mouseout"), this._touchMoved || b(a, "click"), c = !1)
        }, d._mouseInit = function () {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), e.call(b)
        }, d._mouseDestroy = function () {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), f.call(b)
        }
    }
}(jQuery), function (window) {
    String.prototype.countPostfix = function (a, b, c, d) {
        var e = 0;
        0 != c && (c = !0), d && "string" == typeof d.valueOf() || (d = "%c %w"), b instanceof Object || (b = b || 0 == b || "" == b ? {0: 0 == b || b ? b.valueOf() : 0} : {});
        var f = this instanceof Object ? this.valueOf() : String(this);
        if (f in b)return String(b[f]);
        (f = +String(this instanceof Object ? this.valueOf() : String(this)).replace(/[^\d]+/g, "")) || (f = 0);
        var g = f % 10, h = f % 100;
        g >= 2 && g <= 4 && (e = 1), (0 == g || g >= 5 && g <= 9 || h >= 11 && h <= 19) && (e = 2);
        var i = a[Math.min(e, a.length)] || "";
        return 0 == c ? d.replace(/([^%]|^)%c/gim, "$1" + f.toString()).replace(/([^%]|^)%w/gim, "$1" + i).replace(/%%/gim, "%") : i
    }, String.countPostfix = function (a, b, c, d, e) {
        return String.prototype.countPostfix.call(a, b, c, d, e)
    }, String.CASE_LOWER = 1, String.CASE_UPPER = 2, String.CASE_TITLE = 4, String.convertCharCase = function (a, b) {
        switch (b || (b = String.CASE_LOWER), b) {
            case String.CASE_LOWER:
                return a.toLowerCase();
            case String.CASE_UPPER:
                return a.toUpperCase();
            case String.CASE_TITLE:
                for (var c = a.match(/\w+/g), d = 0, e = c.length; d < e; ++d)a = a.replace(c[d], c[d][0].toUpperCase() + c[d].substr(1).toLowerCase());
                return a
        }
        return a
    }, String.prototype.convertCharCase = function (a) {
        return String.convertCharCase(this.valueOf(), a)
    }, String.pad = function (a, b, c) {
        var d = b;
        !1 === c && (d = Math.ceil(b / a.length));
        for (var e = "", f = 0; f < d; ++f)e += f == d - 1 && !1 === c ? a.substr(b % a - 1) : a;
        return e
    }, String.prototype.pad = function (a, b, c) {
        return String.pad(a, b, c) + this.valueOf()
    }, String.prototype.toPad = function (a, b) {
        return String.pad(this.valueOf(), a, b)
    }, String.eToYoTransition = function (a) {
        return a.replace(new RegExp("Рµ", "g"), "С‘").replace(new RegExp("Р•", "g"), "РЃ")
    }, String.YoToETransition = function (a) {
        return a.replace(new RegExp("С‘", "g"), "Рµ").replace(new RegExp("РЃ", "g"), "Р•")
    }, String.switchKeyboard = function (inputKeyboard, string) {
        function transF(p) {
            var ar1 = lat, ar2 = rus;
            "lat" == inputKeyboard && (ar2 = lat0, ar1 = rus);
            for (var i = 0; i < ar1.length; i++) {
                var trans = "/" + ar1[i] + "/gm";
                p = p.replace(eval(trans), ar2[i])
            }
            return p
        }

        inputKeyboard = "lat" == inputKeyboard ? "rus" : "lat";
        var lat0 = "qwertyuiopasdfghjkl;'zxcvbnm,QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>`~[].".split(""),
            lat = "qwertyuiopasdfghjkl;'zxcvbnm,QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>`~".split(""),
            rus = "Р№С†СѓРєРµРЅРіС€С‰Р·С„С‹РІР°РїСЂРѕР»РґР¶СЌСЏС‡СЃРјРёС‚СЊР±Р™Р¦РЈРљР•РќР“РЁР©Р—РҐРЄР¤Р«Р’РђРџР РћР›Р”Р–Р­РЇР§РЎРњРРўР¬Р‘Р®С‘РЃС…СЉСЋ".split("");
        return lat.push("\\["), lat.push("\\]"), lat.push("\\."), transF(string)
    }, String.escapeRegExp = function (a) {
        return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
    }, String.parseQueryString = function (a) {
        var b = {};
        0 === a.indexOf("?") && (a = a.substr(1));
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
            var e = c[d], f = e.split("="), g = f[0], h = f[1];
            g = decodeURIComponent(g), h = decodeURIComponent(h), h = h.replace(/\+/g, " "), b[g] = h
        }
        return b
    }, String.formatPrice = function (a) {
        var b = parseInt(a) + "", c = b.length > 3 ? b.length % 3 : 0, d = "";
        return d += 0 !== c ? b.substr(0, c) + " " : "", d += b.substr(c).replace(/(\d{3})(?=\d)/g, "$1 ")
    }
}(window), function (a, b, c) {
    function d() {
        if (c === window.ymaps)return void setTimeout(d);
        for (; e.length;) {
            var a = e.shift();
            ymaps.ready(a)
        }
    }

    var e = [], f = !1;
    window.loadYandexMaps = function (a) {
        !1 === b.isFunction(a) && (a = function () {
        }), e.push(a), !1 === f ? (b.getScript("//api-maps.yandex.ru/2.1.50/?lang=ru_RU", d), f = !0) : d()
    }
}(document, jQuery), define("consoleOptions", function (a) {
    var b = {
        isConsoleAvailable: !1,
        isLogAvailable: !1,
        isWarnAvailable: !1,
        isErrorAvailable: !1,
        isInfoAvailable: !1,
        isAssertAvailable: !1,
        isCountAvailable: !1,
        isDirAvailable: !1,
        isDirXMLAvailable: !1,
        isTableAvailable: !1,
        isProfileAvailable: !1,
        isProfileEndAvailable: !1,
        isTraceAvailable: !1,
        isTimesAvailable: !1,
        isTimeStampAvailable: !1,
        isGroupsAvailable: !1
    };
    b.isConsoleAvailable = window.console instanceof Object, b.isConsoleAvailable && (b.isLogAvailable = console.log instanceof Function, b.isWarnAvailable = console.warn instanceof Function, b.isErrorAvailable = console.error instanceof Function, b.isInfoAvailable = console.info instanceof Function, b.isAssertAvailable = console.assert instanceof Function, b.isCountAvailable = console.count instanceof Function, b.isGroupsAvailable = console.group instanceof Function && console.groupEnd instanceof Function, b.isTimesAvailable = console.time instanceof Function && console.timeEnd instanceof Function);
    var c, d, e;
    for (var f in b)b.hasOwnProperty(f) && (c = f[0].toUpperCase() + f.substr(1), d = "get" + c, e = "set" + c, a[d] = function (a) {
        return function () {
            return b[a]
        }
    }(f), a[e] = function (a) {
        return function (c) {
            return "boolean" == typeof c && (b[a] = c, !0)
        }
    }(f))
}), define("consolePatch", ["consoleOptions"], function (a) {
    a.consoleOptions.getIsConsoleAvailable() || (window.console = {}, a.consoleOptions.setIsConsoleAvailable(!0)), a.consoleOptions.getIsLogAvailable() || (console.log = function () {
    }), a.consoleOptions.getIsWarnAvailable() || (console.warn = function () {
        var a = ["[WARNING]"];
        Array.prototype.push(a, arguments), console.log.apply(console, a)
    }), a.consoleOptions.getIsInfoAvailable() || (console.info = function () {
        var a = ["[INFO]"];
        Array.prototype.push(a, arguments), console.log.apply(console, a)
    }), a.consoleOptions.getIsErrorAvailable() || (console.error = function () {
        var a = ["[ERROR]"];
        Array.prototype.push(a, arguments), console.error.apply(console, a)
    }), a.consoleOptions.getIsGroupsAvailable() || (console.warn("Р’Р°С€ Р±СЂР°СѓР·РµСЂ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ РіСЂСѓРїРїС‹ Console API, РїРѕСЌС‚РѕРјСѓ РѕС‚РѕР±СЂР°Р¶РµРЅРёРµ Р±СѓРґРµС‚ РјРµРЅРµРµ СѓРґРѕР±РЅС‹Рј.Р РµРєРѕРјРµРЅРґСѓРµРј СѓСЃС‚Р°РЅРѕРІРёС‚СЊ Р±РѕР»РµРµ СЃРѕРІСЂРµРјРµРЅС‹Р№ Р±СЂР°СѓР·РµСЂ (РёР»Рё РѕР±РЅРѕРІРёС‚СЊ С‚РµРєСѓС‰РёР№):\n\tGoogle Chrome: https://www.google.ru/chrome/browser/  (СЂРµРєРѕРјРµРЅРґСѓРµРј)\n\tFirefox: https://www.mozilla.org/ru/firefox/new/\nР’С‹ РјРѕР¶РµС‚Рµ СѓСЃС‚Р°РЅРѕРІРёС‚СЊ Р»СЋР±РѕР№ РґСЂСѓРіРѕР№ СЃРѕРІСЂРµРјРµРЅРЅС‹Р№ Р±СЂР°СѓР·РµСЂ РёР»Рё Internet Explorer (РЅРµ РЅРёР¶Рµ 11Р№ РІРµСЂСЃРёРё)"), console.__groupLevel = 0, console.__stdout = [], console.group = function () {
        var a = [];
        Array.prototype.push.apply(a, arguments), console.__stdout.push(a.join(" ").pad("   ", console.__groupLevel)), ++console.__groupLevel
    }, console.groupCollapsed = window.group, console.groupEnd = function () {
        --console.__groupLevel, console.__groupLevel < 0 && (console.__groupLevel = 0), 0 == console.__groupLevel && (console.log(console.__stdout.join("\n")), console.__stdout = [])
    }, console.__originLog = console.log, console.log = function () {
        var a = [];
        return Array.prototype.push.apply(a, arguments), console.__groupLevel > 0 ? console.__stdout.push(a.join(" ").pad("   ", console.__groupLevel)) : console.__originLog.apply(console, a)
    }, a.consoleOptions.setIsGroupsAvailable(!0))
}), function (a, b, c) {
    function d() {
        if (c === window.ymaps || c === ymaps.util)return void setTimeout(d, 100);
        ymaps.ready(e)
    }

    function e() {
        window.PieChartClusterer = function (a) {
            PieChartClusterer.superclass.constructor.apply(this, arguments)
        }, PieChartClusterer.COLORS = {
            blue: "0A6CC8",
            darkblue: "3D4AE9",
            darkgreen: "158B02",
            darkorange: "CD6D2D",
            green: "1AB500",
            grey: "94948E",
            lightblue: "4391E7",
            night: "143A6B",
            orange: "CCA42B",
            pink: "E666DD",
            red: "E03632",
            violet: "A41DE2",
            white: "FFFFFF",
            yellow: "D4C62C",
            brown: "946134",
            black: "000000"
        }, PieChartClusterer.SIZES = [[65, 65], [80, 80], [95, 95]], PieChartClusterer.NUMBERS = [10, 100], PieChartClusterer.OPACITY = .9, PieChartClusterer.URL_TEMPLATE = ["//chart.googleapis.com/chart?cht=pc", "chs=#{width}x#{height}", "chd=t:1|#{data}", "chco=FFFFFF,#{colors}", "chf=a,s,000000#{opacity}|bg,s,00000000"].join("&"), PieChartClusterer.dec2hex = function (a) {
            var b = Math.floor(255 * a).toString(16);
            return b.length < 2 && "0" + b || b
        }, PieChartClusterer.rgb2hex = function (a) {
            var b = a.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);
            return b && 4 === b.length ? ("0" + parseInt(b[1], 10).toString(16)).slice(-2) + ("0" + parseInt(b[2], 10).toString(16)).slice(-2) + ("0" + parseInt(b[3], 10).toString(16)).slice(-2) : a
        }, ymaps.util.augment(PieChartClusterer, ymaps.Clusterer, {
            createCluster: function (a, b) {
                var c = PieChartClusterer.superclass.createCluster.apply(this, arguments);
                return c.options.set({icons: this.getClusterIcons(b), numbers: this.getClusterNumbers()}), c
            }, getClusterNumbers: function () {
                return this.options.get("clusterNumbers", PieChartClusterer.NUMBERS)
            }, getClusterIconOpacity: function () {
                return this.options.get("clusterIconOpacity", PieChartClusterer.OPACITY)
            }, getClusterIconSizes: function () {
                var a = this.options.get("clusterIcons");
                if (a) {
                    for (var b, c = [], d = 0; b = a[d] && a[d].size;)c[d++] = b;
                    return c
                }
                return PieChartClusterer.SIZES
            }, getClusterIcons: function (a) {
                for (var b, c = this.getClusterIconSizes(), d = 0, e = []; b = c[d];)e[d++] = {
                    href: this.formatClusterIconHref(b, this.getClusterIconColors(a)),
                    size: b,
                    offset: [-Math.floor(b[0] / 2), -Math.floor(b[1] / 2)]
                };
                return e
            }, getClusterIconColors: function (a) {
                for (var b, c, d = a.length, e = {}; c = a[--d];)b = this.getColor(c), e[b] = e[b] + 1 || 1;
                return e
            }, formatClusterIconHref: function (a, b) {
                var c = [], d = [], e = 0;
                for (d[e]in b)c[e] = b[d[e++]];
                var f = {
                    width: a[0],
                    height: a[1],
                    data: c.join(","),
                    colors: (d.length < 2 ? [d[0], d[0]] : d).join("|"),
                    opacity: PieChartClusterer.dec2hex(this.getClusterIconOpacity())
                };
                return PieChartClusterer.URL_TEMPLATE.replace(/#{(\w+)}/g, function (a, b) {
                    return f[b]
                })
            }, getColor: function (a) {
                if (a.options.get("iconColor", !1)) {
                    var b = a.options.get("iconColor").replace("#", "");
                    return PieChartClusterer.rgb2hex(b)
                }
                return a.options.get("preset", "twirl#blueIcon").match(/#([a-z]+)[A-Z]/)[1]
            }
        })
    }

    b(function () {
        d()
    })
}(document, jQuery), function (a, b) {
    function c() {
        var b = getScreenType(), c = b !== a.screenType;
        a.screenType = b, c && d.trigger(EVENT_CHANGE_SCREEN_TYPE), d.trigger(":resize")
    }

    a.SCREEN_WIDE = 1, a.SCREEN_DESKTOP = 2, a.SCREEN_TABLET = 3, a.SCREEN_MOBILE = 4, a.SCREEN_NOT_SUPPORTED = 0, a.SCREEN_MOBILE_MIN_WIDTH = 320, a.SCREEN_MOBILE_MAX_WIDTH = 767, a.SCREEN_TABLET_MAX_WIDTH = 991, a.SCREEN_DESKTOP_MAX_WIDTH = 1199, a.EVENT_CHANGE_SCREEN_TYPE = "window.screen.type:changed", a.getScreenType = function () {
        var b = a.innerWidth;
        return b > SCREEN_DESKTOP_MAX_WIDTH ? SCREEN_WIDE : b > SCREEN_TABLET_MAX_WIDTH ? SCREEN_DESKTOP : b > SCREEN_MOBILE_MAX_WIDTH ? SCREEN_TABLET : b >= SCREEN_MOBILE_MIN_WIDTH ? SCREEN_MOBILE : SCREEN_NOT_SUPPORTED
    }, a.checkScreenType = function (b) {
        if (!(b instanceof Array) && 1 == arguments.length)return b === a.getScreenType();
        var c = !1, d = [];
        b instanceof Array ? d = b : arguments.length > 1 && Array.prototype.push.apply(d, arguments);
        for (var e = 0, f = d.length; e < f; ++e)c |= d[e] == a.getScreenType();
        return c
    };
    var d = b(a);
    !function () {
        var c = {};
        c[a.SCREEN_MOBILE] = "mobile", c[a.SCREEN_TABLET] = "tablet", c[a.SCREEN_DESKTOP] = "desktop", c[a.SCREEN_WIDE] = "wide", b.fn.setScrollingStateFor = function (a, d) {
            d instanceof Array || !d || (d = [d]), d || (d = []);
            var e = "";
            0 == d.length && (e = "not-scrolling");
            for (var f = 0, g = d.length; f < g; ++f) {
                var h = d[f], i = c[h];
                e += e ? " " : "", e += "not-scrolling" + (i ? "-" : "") + i
            }
            var j = b(this);
            return a ? j.addClass(e) : j.removeClass(e)
        }
    }(), d.resize(c).trigger("resize"), d.get(0).onresize = c
}(window, jQuery), function (a) {
    function b(b, c, d) {
        var e = "[data-" + c + "]", f = b.find(e), g = "of" == c || "content" == c || "toggle" == c;
        b.is(e) && f.push(b.get(0)), d[c] = {};
        for (var h, i, j = 0, k = f.length; j < k; ++j)if (h = a(f.get(j)), i = h.data(c), g) {
            var l = "!" === i[0];
            l && (i = i.substr(1)), h.data(q, l), d[c][i] instanceof Array || (d[c][i] = []), d[c][i].push(h.get(0))
        } else {
            i = i.split(/;|,|\s/g);
            for (var m, n = 0, o = i.length; n < o; ++n)m = i[n].split(":"), 1 == m.length && (m[1] = m[0]), d[c][m[1]] instanceof Array || (d[c][m[1]] = []), d[c][m[1]].push({
                $el: h,
                attr: m[0]
            })
        }
        if (g)for (var p in d[c])d[c].hasOwnProperty(p) && (d[c][p] = a(d[c][p]));
        return d
    }

    function c(a) {
        var c = {};
        return b(a, "of", c), b(a, "content", c), b(a, "toggle", c), b(a, "set", c), b(a, "update", c), b(a, "switch", c), c
    }

    function d(a, b, c) {
        a.attr(b, c), /^data-/i.test(b) && a.data(b.replace(/^data-/i, ""), c)
    }

    function e(a, b) {
        a.text(b)
    }

    function f(a, b) {
        a.html(b)
    }

    function g(a, b, c) {
        for (var e = 0, f = a[c].length; e < f; ++e)d(a[c][e].$el, a[c][e].attr, b[c])
    }

    function h(a, b, c) {
        for (var e, f, g = 0, h = a[c].length; g < h; ++g)e = a[c][g], f = (e.$el.attr(e.attr) + " " + b[c]).trim(), d(e.$el, e.attr, f)
    }

    function i(a, b, c, e) {
        for (var f, g, h = 0, i = a[e].length; h < i; ++h)f = a[e][h], g = f.$el.attr(f.attr), g || (g = ""), g = g.replace(c[e], ""), g += " " + b[e], g = g.replace(/\s+/g, " ").trim(), d(f.$el, f.attr, g)
    }

    function j(a, b) {
        b ? a.show() : a.hide()
    }

    function k(b, c, d) {
        for (var k in c)if (c.hasOwnProperty(k)) {
            if (b.of.hasOwnProperty(k) && b.of[k].length > 0 && e(b.of[k], c[k]), b.content.hasOwnProperty(k) && b.content[k].length > 0 && f(b.content[k], c[k]), b.toggle.hasOwnProperty(k) && b.toggle[k].length > 0)for (var l = b.toggle[k], m = 0, n = l.length; m < n; ++m) {
                var o = a(l.get(m)), p = o.data(q);
                j(o, !(!p ^ c[k]))
            }
            b.set.hasOwnProperty(k) && b.set[k].length > 0 && g(b.set, c, k), b.update.hasOwnProperty(k) && b.update[k].length > 0 && h(b.update, c, k),
            b.switch.hasOwnProperty(k) && b.switch[k].length > 0 && (d instanceof Object ? i(b.switch, c, d, k) : h(b.switch, c, k))
        }
    }

    function l(a) {
        return a.length > 0 && a.data("map")
    }

    function m(a, b, c) {
        if (a.length > 0 && !l(a)) {
            var d = null;
            c instanceof Object && b && "string" == typeof b.valueOf() && (d = {}, d[b] = c), a.initSets(d, b)
        }
        return l(a)
    }

    function n(a, b, c) {
        if (!(a instanceof Object))throw"РџР°СЂР°РјРµС‚СЂ sets РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РѕР±СЉРµРєС‚РѕРј";
        if (!(b instanceof Object))throw"РџР°СЂР°РјРµС‚СЂ map РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РѕР±СЉРµРєС‚РѕРј";
        if (!b.hasOwnProperty("switch"))return !1;
        for (var d in a)if (a.hasOwnProperty(d) && d != c)for (var e in a[d])if (a[d].hasOwnProperty(e) && b.switch.hasOwnProperty(e)) {
            var f = {};
            f[e] = "", i(b.switch, f, a[d], e)
        }
    }

    function o(a, b) {
        !1 !== b && (b = !0);
        var c = a.data("states"), d = c.indexOf(a.getState());
        d += b ? 1 : -1, (d < 0 || d >= c.length) && (d = b ? 0 : c.length - 1), a.setState(c[d])
    }

    function p(a, b, c) {
        b.apply(a, c)
    }

    var q = "as:not";
    a.fn.applySingleSets = function (a) {
        if (l(this)) this.applySets("default", a); else {
            var b = {};
            b.default = a, this.initSets(b, "default")
        }
        this.removeAttr("data-state")
    }, a.fn.applySets = function (a, b) {
        return this.updateSets(a, b).setState(a)
    }, a.fn.updateSets = function (b, c) {
        var d = this;
        if (!m(d, b, c))return this;
        var e = d.data("sets");
        return e.hasOwnProperty(b) ? a.extend(e[b], c) : e[b] = c, d.data("sets", e), this
    }, a.fn.setState = function (b) {
        if (this.length > 1) {
            var c = arguments.callee;
            this.each(function () {
                p(this, c, [b])
            })
        } else if (0 === this.length)return this;
        var d = a(this);
        if (!m(d))return this;
        var e = d.attr("data-state"), f = d.data("sets");
        if (!f.hasOwnProperty(b))throw"РќРµРІРµСЂРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ: " + b;
        var g = f[b], h = d.data("map");
        return e && "string" == typeof e.valueOf() || n(f, h), k(h, g, f[e]), d.attr("data-state", b).data("state", b), this
    }, a.fn.getState = function () {
        return this.data("state") || this.data("states")[0]
    }, a.fn.setNextState = function () {
        return o(this), this
    }, a.fn.setPrevState = function () {
        return o(this, !1), this
    }, a.fn.initSets = function (b, d) {
        if (this.length > 1) {
            var e = arguments.callee;
            this.each(function () {
                p(this, e, [b, d])
            })
        } else {
            if (0 === this.length)return this;
            1 === arguments.length && arguments[0] && "string" == typeof arguments[0].valueOf() && (d = b, b = null);
            var f = a(this);
            !1 === b && (b = null, d = !1), b instanceof Object ? f.data("sets", b) : (b = f.data("sets"), f.data("sets", b), f.removeAttr("data-sets")), 1 === arguments.length && (d = b), f.data("map", c(f));
            var g = [];
            for (var h in b)b.hasOwnProperty(h) && g.push(h);
            f.data("states", g), d && b.hasOwnProperty(d) ? f.setState(d) : !1 !== d && f.setState(f.getState())
        }
        return this
    }
}(jQuery), function () {
    function a() {
        if (!document.body)return void setTimeout(a, 200);
        j && j.observe(document.body, {childList: !0})
    }

    function b() {
        j && (j.disconnect(), j = null)
    }

    function c(a) {
        a.forEach(function (a) {
            var b = a.addedNodes;
            b && b.length && d(b)
        })
    }

    function d(a) {
        Array.prototype.slice.call(a).forEach(function (a) {
            g(a) && (h(a) || f(a)) && (e(a), b())
        })
    }

    function e(a) {
        var b = a.style;
        b.zIndex = "-9999", b.webkitTransform = b.MozTransform = b.msTransform = b.OTransform = b.transform = "translate(-9999px, -9999px)";
        var c = new MutationObserver(function () {
            var a = document.documentElement.style.marginTop;
            a && 0 !== parseInt(a, 10) && (document.documentElement.style.marginTop = "")
        });
        setTimeout(function () {
            c.disconnect(), c = null
        }, 5e3), c.observe(document.documentElement, {
            attributes: !0,
            attributeFilter: ["style"]
        }), document.documentElement.style.marginTop = ""
    }

    function f(a) {
        var b = i(a, "background-color");
        return ("rgb(250, 223, 118)" === b || "rgb(250, 223, 117)" === b) && "fixed" === i(a, "position") && "table" === i(a, "display")
    }

    function g(a) {
        return "DIV" === a.tagName
    }

    function h(a) {
        return !!a.querySelector('[href*="sovetnik.market.yandex.ru"]')
    }

    function i(a, b) {
        return window.getComputedStyle(a).getPropertyValue(b)
    }

    var j;
    try {
        !function () {
            try {
                j = new MutationObserver(function (a) {
                    c(a)
                })
            } catch (a) {
            }
            document.body && d(document.body.children)
        }(), a(), function () {
            window.addEventListener("message", function (a) {
                var b;
                if ("string" == typeof a.data)try {
                    b = JSON.parse(a.data)
                } catch (a) {
                    return
                } else b = a.data;
                b && "MBR_ENVIRONMENT" === b.type && (a.stopImmediatePropagation(), a.stopPropagation(), a.data = {})
            }, !0)
        }(), setTimeout(b, 15e3)
    } catch (a) {
    }
}(), function (a) {
    var b = !1, c = function (b, d) {
        this.$el = b, this.$box = null, this.$icon = null, this.$glyph = null, this.settings = a.extend({}, c.defaults, d), -1 === this.settings.wrapClassName.indexOf("bs-password_wrapper") && (this.settings.wrapClassName = ["bs-password_wrapper", this.settings.wrapClassName].join(" ")), -1 === this.settings.iconClassName.indexOf("bs-password_icon") && (this.settings.iconClassName = ["bs-password_icon", this.settings.iconClassName].join(" ")), this.initialType = this.$el.attr("type"), this.isPasswordVisible = !1;
        var e = this.settings.triggersShow, f = this.settings.triggersHide;
        e instanceof Array || (e = [e]), f instanceof Array || (f = [f]), e = a.unique(e), f = a.unique(f);
        for (var g = [], h = 0, i = e.length; h < i; ++h) {
            var j = f.indexOf(e[h]);
            if (-1 !== j) {
                var k = e.splice(h, 1)[0];
                f.splice(j, 1), g.push(k)
            }
        }
        this.triggerShow = e.join(" "), this.triggerHide = f.join(" "), this.triggerToggle = g.join(" "), this.initStyleSheets(), this.init()
    };
    c.defaults = {
        wrapClassName: "bs-password_wrapper",
        iconClassName: "bs-password_icon add-on input-group-addon",
        showPasswordClassName: "glyphicon glyphicon-eye-open",
        hidePasswordClassName: "glyphicon glyphicon-eye-close",
        triggersShow: ["mouseenter", "focus"],
        triggersHide: ["mouseleave", "blur"]
    };
    var d = c.prototype;
    d.init = function () {
        this.$box = a("<div/>", {class: this.settings.wrapClassName}), this.$glyph = a("<i/>", {class: this.settings.showPasswordClassName}), this.$icon = a("<button/>", {
            class: this.settings.iconClassName,
            type: "button"
        }), this.$icon.append(this.$glyph), this.$el.before(this.$box), this.$el.addClass("bs-password_input");
        var b = this;
        0 !== this.triggerToggle.length && this.$icon.on(this.triggerToggle, function () {
            b.toggle.apply(b, arguments)
        }), 0 !== this.triggerShow.length && this.$icon.on(this.triggerShow, function () {
            b.show.apply(b, arguments)
        }), 0 !== this.triggerHide.length && this.$icon.on(this.triggerHide, function () {
            b.hide.apply(b, arguments)
        }), this.$box.append(this.$el), this.$box.append(this.$icon)
    }, d.initStyleSheets = function () {
        if (!b) {
            var a = {}, c = this.settings.wrapClassName.replace(/(^)|((\s|\t)+)/g, "."),
                d = this.settings.iconClassName.replace(/(^)|((\s|\t)+)/g, ".");
            a[c] = {position: "relative"}, a[d] = {
                background: null,
                border: null,
                cursor: "pointer",
                outline: null,
                position: "absolute",
                right: 12,
                top: 1
            }, window.cssHelper.createStyle(a), b = !0
        }
    }, d.show = function () {
        this.$el.attr("type", "text"), this.isPasswordVisible = !0
    }, d.hide = function () {
        this.$el.attr("type", this.initialType), this.isPasswordVisible = !1
    }, d.toggle = function () {
        this.isPasswordVisible ? this.hide() : this.show()
    }, a.fn.password = function (b) {
        this.each(function () {
            var d = a(this), e = new c(d, b);
            d.data("password", e)
        })
    }, a(function () {
        a('input[type="password"][data-toggle="password"]').password({triggersShow: "click", triggersHide: "click"})
    })
}(window.jQuery), function (a) {
    a(function () {
        a("[data-role=switched]").initSets()
    })
}(jQuery), $(function () {
    $(".captcha-reload a").click(function () {
        return $(this).parents(".input-captcha").find(".captcha-img").trigger("click"), !1
    }), $("body").on("click", ".captcha-reload", function (a) {
        var b = $(this).closest(".input-captcha"), c = b.data("captcha-id");
        $("#" + c + "_preloader", b).css("display", "inline-block"), $("#" + c + "_image", b).hide();
        var d = "/captcha/" + Math.random() + "/", e = new Image;
        return e.src = d, e.onload = function () {
            $("#" + c + "_preloader", b).css("display", "none"), $("#" + c + "_image", b).attr("src", d).show()
        }, !1
    });
    $("body").on("click reload", window.SELECTOR_CAPTCHA_RELOAD, function () {
        var a = (new Date).getTime().toString(16), b = $(this), c = $("#" + b.data("reloader")),
            d = $("#" + b.data("captcha-id")), e = d.attr("src").split("?")[0] + "?v=" + a, f = new Image;
        c.css("display", "inline-block"), d.hide(), $.get(e + "&refresh=1").done(function () {
            f.src = e, $(f).on("load", function () {
                c.hide(), d.attr("src", e).show()
            })
        })
    })
}), function (a, b, c, d) {
    "use strict";
    c.EVENT_UPDATE_CART = "cart:update", c.SELECTOR_CART_WIDGET = "[data-id=cart-widget]", c.SELECTOR_CART_BUTTON = "[data-id=cart-button]";
    c.DATA_MARKER = "marker", c.SELECTOR_MARKERS = "[data-" + c.DATA_MARKER + "]", b(a.body).ready(function () {
        function d(a) {
            a.totalCount > 0 ? e.applySets("active", {
                totalCount: number_format(a.totalCount, 0, ".", " "),
                totalPrice: number_format(a.totalPrice, 0, ".", " ")
            }) : e.setState("default")
        }

        var e = b(c.SELECTOR_CART_WIDGET), f = b(c.SELECTOR_CART_BUTTON);
        b(a.body).on("click", c.SELECTOR_CART_BUTTON, function () {
            var a = b(this), e = {};
            if (a.attr("disabled", !0), "go_to_cart" === a.data("state"))return void(c.location.href = a.data("url"));
            b(c.SELECTOR_CART_BUTTON + "[data-state=go_to_cart]").each(function (a, c) {
                e[b(c).data("product-guid")] = "add"
            });
            var f = {guid: a.data("product-guid"), type: a.data("product-type")};
            void 0 !== a.attr("data-add-optional-product-guid") && (f.optionalProductGuid = a.attr("data-add-optional-product-guid")), a.is(c.SELECTOR_MARKERS) && (f.markers = a.data(c.DATA_MARKER).toString().match(/[A-z0-9_-]+/g)), a.data("shop-id") && (f.shopId = a.data("shop-id")), a.data("postamat-id") && (f.postamatId = a.data("postamat-id")), b.ajax({
                type: "POST",
                url: a.data("url"),
                dataType: "json",
                data: f,
                success: function (f) {
                    if (!0 === f.result) {
                        a.attr("disabled", !1), d(f.data);
                        for (var g in f.data.items)f.data.items.hasOwnProperty(g) && (e[f.data.items[g].guid] = "go_to_cart");
                        for (var h in e)e.hasOwnProperty(h) && b(c.SELECTOR_CART_BUTTON + "[data-product-guid=" + h + "]").setState(e[h]);
                        a.trigger(c.EVENT_UPDATE_CART, [f.data.items])
                    } else {
                        var i = f.message ? f.message : "РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·РґРЅРµРµ.";
                        alert(i)
                    }
                }
            })
        }), b(c).on(c.EVENT_PRODUCTS_LOADED, function () {
            var a = b(c.SELECTOR_CART_BUTTON), d = a.not(f);
            d.length && (d.initSets(), f = a)
        }), b(c).on(c.EVENT_OS_VARIANT_CHANGED, function (a, b) {
            var c = f.filter('[data-product-guid="' + b.baseProductGuid + '"]');
            if (0 !== c.length) {
                var d = b.isOsInCart ? "go_to_cart" : "add";
                c.attr("data-add-optional-product-guid", b.guid).setState(d)
            }
        })
    })
}(document, jQuery, window), function (a) {
    window.EVENT_DO_SHOW_CATALOG_MOBILE_MENU = "catalog-menu:mobile:show", window.EVENT_DO_HIDE_CATALOG_MOBILE_MENU = "catalog-menu:mobile:hide", window.EVENT_DO_TOGGLE_CATALOG_MOBILE_MENU = "catalog-menu:mobile:toggle", window.EVENT_SHOWN_CATALOG_MOBILE_MENU = "catalog-menu:mobile:shown", window.EVENT_HIDDEN_CATALOG_MOBILE_MENU = "catalog-menu:mobile:hidden", a(function () {
        function b() {
            f = !0, d.get(0).scrollTop = 0, d.addClass("shown"), a(window).trigger(window.EVENT_SHOWN_CATALOG_MOBILE_MENU)
        }

        function c() {
            f = !1, d.removeClass("shown"), a(window).trigger(window.EVENT_HIDDEN_CATALOG_MOBILE_MENU)
        }

        var d = a("#menu-catalog-aside"), e = a('[data-role="catalog-menu-tumbler"]'), f = !1;
        e.on(["click", window.EVENT_DO_TOGGLE_CATALOG_MOBILE_MENU].join(" "), function () {
            f ? c() : b()
        });
        var g = a();
        g.push(window), d.each(function () {
            g.push(this)
        }), g.on(window.EVENT_DO_SHOW_CATALOG_MOBILE_MENU, b).on(window.EVENT_DO_HIDE_CATALOG_MOBILE_MENU, c), d.on(window.EVENT_OPEN, b).on(window.EVENT_CLOSE, c), a(window).on(window.EVENT_CHANGE_SCREEN_TYPE, function () {
            window.checkScreenType(window.SCREEN_MOBILE, window.SCREEN_TABLET) || c()
        }), a(window).trigger(window.EVENT_CHANGE_SCREEN_TYPE)
    }), window.EVENT_OPEN = "global:open", window.EVENT_CLOSE = "global:close"
}(jQuery), function (a) {
    function b() {
        null !== f && f.data("lock", !0)
    }

    function c() {
        null !== f && f.data("lock", !1)
    }

    function d() {
        null === f && (f = a('<div class="modal-backdrop in catalog-menu-backdrop" />'), a("body").append(f), a("select").blur(), f.fadeOut(0, function () {
            f.fadeIn(200)
        }))
    }

    function e() {
        null !== f && !0 !== f.data("lock") && (f.fadeOut(200, function () {
            a(this).remove()
        }), f = null)
    }

    var f = null, g = 0, h = "catalog_menu", i = {
        init: function (b) {
            function d() {
                var c = f.data(h);
                c.hide_timer && clearTimeout(c.hide_timer), c.show_timer && clearTimeout(c.show_timer), c.show_timer = setTimeout(a.proxy(i.show_menu, f), b.show_timeout), f.data(h, c), j.addClass("hovered")
            }

            function e() {
                var c = f.data(h);
                c.hide_timer && clearTimeout(c.hide_timer), c.show_timer && clearTimeout(c.show_timer), c.show_timer = setTimeout(a.proxy(i.hide_menu, f), b.show_timeout), f.data(h, c), j.removeClass("hovered")
            }

            b = a.extend({show_timeout: 300, hide_timeout: 300, delay: 300, max_column: 3, innerPadding: 30}, b);
            var f = a(this), j = a('[data-role="catalog-menu-title"]'), k = a(this).outerHeight(), l = a();
            if (l.push(f.get(0)), l.push(j.get(0)), f.data("$subMenu", null), f.hasClass("collapsable")) {
                f.data(h, {}), l.hover(d, e), j.on("click", function () {
                    if (j.is(".hovered"))return e();
                    d()
                }), l.on("blur", e);
                var m = window.scrollY;
                f.data("lastScrollTop", m), a(window).scroll(function () {
                    var a = window.scrollY - f.data("lastScrollTop"), b = 0 == a ? 0 : -1;
                    a > 0 && (b = 1), i.scrollingOpenMenu(f, b, a), f.data("lastScrollTop", window.scrollY)
                }), a(window).on(window.EVENT_CHANGE_HEADER_FIXED_STATE, function (a, b) {
                    f.data("headerIsFixed", b), i.scrollingOpenMenu(f)
                })
            } else g = 1, f.hover(null, function () {
                c()
            });
            var n = f;
            return a("[data-hover-color]", n).mouseenter(function () {
                var b = a(this);
                b.css("background-color", b.data("hover-color") + " !important")
            }).mouseleave(function () {
                a(this).css("background-color", "")
            }), this.children().each(function () {
                var c = a(this), d = c.data(h);
                if (!d) {
                    d = {}, d.show_timer = 0, d.hide_timer = 0, d.delay = 0, d.options = b, d.$menu = n;
                    var e = a(".sub-wrap", c);
                    if (e.height() > k) {
                        var f = Math.ceil(e.outerHeight(!0) / (k - b.innerPadding));
                        d.options.max_column > 0 && f > d.options.max_column && (f = d.options.max_column), e.show();
                        var g = a(".catalog-subcatalog.level-1>li", e).first().outerWidth(!0);
                        e.width(g * f + (a(".catalog-subcatalog.level-1", e).outerWidth(!0) - a(".catalog-subcatalog.level-1", e).width())), a(".catalog-subcatalog.level-1", e).addClass("fluid").fluid_columns(), e.hide()
                    }
                    e.css("min-height", k + "px"), c.data(h, d), c.hover(function () {
                        c.catalog_menu("show_timer")
                    }, function () {
                        c.catalog_menu("hide_timer")
                    });
                    var i = !0;
                    try {
                        document.createEvent("TouchEvent")
                    } catch (a) {
                        i = !1
                    }
                    i && c.find("> a").on("click", function (a) {
                        return a.preventDefault(), c.trigger("click"), !1
                    })
                }
            })
        }, show_timer: function () {
            return this.each(function () {
                var b = a(this), c = b.data(h);
                c.hide_timer && clearTimeout(c.hide_timer), c.show_timer && clearTimeout(c.show_timer), b.catalog_menu("delay"), c.show_timer = setTimeout(a.proxy(i.show, b), c.options.show_timeout), b.data(h, c)
            })
        }, show: function (c) {
            return this.each(function () {
                var c = a(this), e = c.data(h), f = e.$menu, i = c.find(".sub-wrap"), j = !1;
                f.css("min-height", "auto"), e.show_timer && (clearTimeout(e.show_timer), e.show_timer = 0, j = !0), e.hide_timer && (clearTimeout(e.hide_timer), e.hide_timer = 0, j = !0), e.delay && (clearTimeout(e.delay), e.delay = 0, j = !0), j && c.data(h, e), i.data("defaultMarginTop") && i.css("margin-top", i.data("defaultMarginTop")), i.show(), 1 == g && (d(), b());
                var k = i.get(0).getBoundingClientRect().height;
                i.data("defaultMarginTop", i.css("margin-top")), f.data("minHeight", k), f.data("$subMenu", i)
            })
        }, delay: function () {
            return this.each(function () {
                var b = a(this), c = b.data(h);
                c.delay && clearTimeout(c.delay), c.hide_timer && clearTimeout(c.hide_timer), c.show_timer && clearTimeout(c.show_timer), c.delay = setTimeout(function () {
                    return !1
                }, c.options.delay), b.data(h, c)
            })
        }, hide_timer: function () {
            return this.each(function () {
                var b = a(this), c = b.data(h);
                c.hide_timer && clearTimeout(c.hide_timer), b.catalog_menu("delay"), c.hide_timer = setTimeout(a.proxy(i.hide, b), c.options.hide_timeout), b.data(h, c)
            })
        }, hide: function (b) {
            return this.each(function () {
                var b = a(this), c = b.data(h), d = c.$menu, f = a(".sub-wrap", b), i = !1;
                c.show_timer && (clearTimeout(c.show_timer), c.show_timer = 0, i = !0), c.hide_timer && (clearTimeout(c.hide_timer), c.hide_timer = 0, i = !0), i && b.data(h, c), f.hide(), d.css("min-height", "auto");
                var j = d.data("$subMenu");
                (null === j || f.is(j)) && 1 == g && e(), d.data("minHeight", 0), d.data("$subMenu", null), f.css("margin-top", f.data("defaultMarginTop"))
            })
        }, show_menu: function () {
            var a = this;
            this.removeClass("collapsed"), a.find(".head").css("border-radius", "4px 4px 0 0"), 0 == g && d(), i.scrollingOpenMenu(a)
        }, hide_menu: function () {
            var a = this;
            a.addClass("collapsed"), a.find(".head").css("border-radius", "4px"), e(), a.removeAttr("style"), a.data("fixedType", null)
        }, scrollingOpenMenu: function (b, c, d) {
            c || (c = 0), d || (d = 0);
            var e = a('[data-role="catalog-menu-title"]'), f = b.get(0).getBoundingClientRect(),
                g = e.get(0).getBoundingClientRect(), h = b.data("headerIsFixed"), i = h && b.data("fixedType"),
                j = f.height, k = b.data("minHeight"), l = b.data("$subMenu"),
                m = l ? l.get(0).getBoundingClientRect() : null;
            if (l && ("fixed-bottom" == i && j < k || "fixed" == i && f.top + m.height > window.innerHeight)) {
                var n = parseFloat(l.data("defaultMarginTop")), o = j - k - n;
                "fixed" == i && (o = window.innerHeight - (f.top + m.height) - n);
                var p = parseFloat(l.css("margin-top")), q = Math.min(Math.max(p - d, o), n);
                if (l.css("margin-top", q), q >= o && q < n)return
            }
            (1 == c && "fixed-top" == i || !i) && (b.css({
                position: "absolute",
                top: window.scrollY + g.bottom,
                marginTop: 0
            }), b.data("fixedType", i = "scrolling")), f = b.get(0).getBoundingClientRect(), f.top >= g.bottom && f.bottom <= window.innerHeight ? (b.css({
                position: "fixed",
                top: g.bottom,
                marginTop: 0
            }), b.data("fixedType", "fixed")) : (-1 == c && ("fixed-bottom" == i && (b.css({
                position: "absolute",
                top: window.scrollY + f.top,
                marginTop: 0
            }), b.data("fixedType", "scrolling")), f.top >= g.bottom && (b.css({
                position: "fixed",
                top: g.bottom,
                marginTop: 0
            }), b.data("fixedType", "fixed-top"))), 1 == c && f.bottom <= window.innerHeight && (b.css({
                position: "fixed",
                top: window.innerHeight - f.height,
                marginTop: 0
            }), b.data("fixedType", "fixed-bottom")))
        }
    };
    a.fn.catalog_menu = function (b) {
        return i[b] ? i[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " not exists in jQuery.catalog_menu!") : i.init.apply(this, arguments)
    }
}(jQuery), function (a) {
    a(function () {
        var b = a("<div/>", {class: "popover bottom", id: "cheaper-popover"}),
            c = a('<a href="javascript:;" id="cheaper-popover-link" target="_blank" rel="nofollow">РЈР·РЅР°С‚СЊ Р±РѕР»СЊС€Рµ</a>'),
            d = a("<div/>", {style: "position:fixed;left:0;top:0;right:0;bottom:0;z-index:9999;"});
        b.append(a("<div/>", {class: "arrow"})).append(a("<div/>", {class: "popover-content"}).append(a("<div/>", {id: "cheaper-popover-title-image"}), a('<p id="cheaper-popover-main-info">РљРѕРїРёС‚Рµ Р±РѕРЅСѓСЃС‹ Рё РѕРїР»Р°С‡РёРІР°Р№С‚Рµ РёРјРё РґРѕ 100% СЃС‚РѕРёРјРѕСЃС‚Рё РїРѕРєСѓРїРѕРє!</p>'), a('<p id="cheaper-popover-second-info">1 Р±РѕРЅСѓСЃ = 1 СЂСѓР±Р»СЊ СЃРєРёРґРєРё</p>'), a("<div/>", {class: "text-right"}).append(c))), a("body").on("click", ".buy-cheaper", function (e) {
            e.preventDefault();
            var f = a(this);
            d.appendTo("body"), b.appendTo("body"), c.attr("href", f.closest("a").attr("href") || "/prozapass"), b.show();
            var g = f.get(0).getBoundingClientRect(), h = b.get(0).getBoundingClientRect().width,
                i = g.left + (g.width / 2 - h / 2), j = g.bottom + a(window).scrollTop(),
                k = document.documentElement.clientWidth;
            return i + h > k && (i = k / 2 - h / 2), b.attr("style", "left:" + i + "px !important;top:" + j + "px;z-index:10000;display: block"), !1
        }), d.click(function () {
            var a = d.get(0);
            if (a.remove instanceof Function) a.remove(); else {
                var c = a.parentElement || a.parentNode;
                c instanceof Object && c.removeChild instanceof Function && a.removeChild(a)
            }
            b.remove()
        }), a(window).on("scroll resize", function () {
            d.trigger("click")
        })
    })
}(jQuery), $(function () {
    new Clipboard('[data-role="clipboard-button"]').on("success", function (a) {
        $(a.trigger).attr("title", "РЎРєРѕРїРёСЂРѕРІР°РЅРѕ").tooltip({container: "body", placement: "bottom"})
    })
}), function (a, b, c) {
    a(b).ready(function () {
        a("body").on("click", "[data-commerce-target]", function () {
            var b = a(this).data("commerce-target");
            "string" == typeof b && (b = [b]);
            for (var c in b)b.hasOwnProperty(c) && (void 0 !== window.ga && ga("send", "event", "button", "click", b[c]), void 0 !== window.yaCounter && yaCounter.reachGoal(b[c]))
        })
    })
}(jQuery, document), function (a, b, c) {
    function d() {
        e.removeClass(f), window.innerHeight > e.get(0).getBoundingClientRect().bottom + b(window).scrollTop() && e.addClass(f)
    }

    var e, f = "footer-fixed";
    b(function () {
        e = b("footer"), 0 != e.length && (b(window).resize(d), d())
    })
}(document, jQuery), unit("ecommerce").require("jQuery").import("ga").define(function () {
    function a(a) {
        var b = {title: "", parts: [], srcParts: []};
        return a.find("li").each(function () {
            var a = $(this).text().trim();
            b.srcParts.push(a), b.parts.push(a)
        }), b
    }

    function b(a) {
        for (var b = 0, c = a.parts.length; b < c; ++b)if (/РєР°С‚Р°Р»РѕРі/gi.test(a.parts[b])) {
            a.parts.splice(0, b + 1);
            break
        }
        return a
    }

    function c(a) {
        return a.parts.splice(2, a.parts.length - 5), a.title = a.parts.join("/"), a
    }

    function d(d) {
        var e = a(d);
        return b(e), c(e)
    }

    function e(a, b) {
        var c = a.find(b), d = c.data("value");
        return c.is(":not([data-value])") && (d = c.text().trim()), d
    }

    function f(a) {
        var b = q[a.closest(window.SELECTOR_PRODUCTS_CONTAINER).data(m)], c = $(), f = "";
        b && (f = b.group, c = b.$products);
        var g = a.find(window.SELECTOR_PRODUCT_EL_CATEGODY), h = p;
        g.length && (h = d(g).title), ga("ec:addImpression", {
            id: e(a, window.SELECTOR_PRODUCT_EL_CODE),
            name: e(a, window.SELECTOR_PRODUCT_EL_NAME),
            brand: e(a, window.SELECTOR_PRODUCT_EL_BRAND),
            category: h,
            list: f,
            position: c.index(a),
            price: e(a, window.SELECTOR_PRODUCT_EL_PRICE)
        }), ga("send", "event", "product", "show")
    }

    function g(a) {
        var b = a.find(window.SELECTOR_PRODUCT_EL_CATEGODY), c = p;
        b.length && (c = d(b).title), ga("ec:addProduct", {
            id: e(a, window.SELECTOR_PRODUCT_EL_CODE),
            name: e(a, window.SELECTOR_PRODUCT_EL_NAME),
            brand: e(a, window.SELECTOR_PRODUCT_EL_BRAND),
            category: c || null,
            price: e(a, window.SELECTOR_PRODUCT_EL_PRICE)
        })
    }

    function h(a) {
        var b = q[a.closest(window.SELECTOR_PRODUCTS_CONTAINER).data(m)], c = "";
        b && (c = b.group), g(a), ga("ec:setAction", "click", {list: c})
    }

    function i(a) {
        g(a), ga("ec:setAction", "detail"), ga("send", "event", "product", "detail")
    }

    function j(a) {
        g(a), ga("ec:setAction", "add"), ga("send", "event", "UX", "click", "add to cart")
    }

    function k(a, b, c) {
        b || (b = 1), c || (c = 1);
        for (var d = a.getBoundingClientRect(), e = d.height * b, f = d.width * c, g = d.top + e <= t && d.bottom - e >= s && d.left + f <= window.innerWidth && d.right - f >= 0, h = $(a); "hidden" === h.css("overflow") || h.is("body");)h = h.parent();
        var i = h.get(0).getBoundingClientRect(),
            j = d.left + f <= i.right && d.right - f >= i.left && d.top + e <= i.bottom && d.bottom - e >= i.top;
        return g && j
    }

    function l() {
        $(window.SELECTOR_PRODUCTS_CONTAINER).each(function () {
            var a = $(this), b = a.data(m);
            null == b && (b = r++, a.data(m, b));
            var c = a.find(window.SELECTOR_PRODUCT), d = c.filter(":not([data-ga-shown])"), e = a.data(n);
            !e && a.closest(window.SELECTOR_PAGE_CATEGORY).length && (e = o[0]), q[b] = {
                group: e,
                $products: c
            }, d.each(function () {
                var a = $(this).closest(window.SELECTOR_CATEGORY_PRODUCTS), b = 1;
                a.is(window.SELECTOR_CATEGORY_VIEW_LIST) ? b = .8 : a.is(window.SELECTOR_CATEGORY_VIEW_SIMPLE) ? b = .6 : a.is(window.SELECTOR_CATEGORY_VIEW_TILE) && (b = .5), window.checkScreenType(window.SCREEN_MOBILE, window.SCREEN_TABLET) && (b = .6), k(this, b) && (f($(this)), this.setAttribute("data-ga-shown", !0))
            })
        })
    }

    window.SELECTOR_BREADCRUMBS = ".breadcrumb", window.SELECTOR_PRODUCTS_CONTAINER = "[data-products-container]";
    var m = "products-container-index", n = "products-container-title", o = [], p = "", q = {}, r = 0, s = 0,
        t = window.innerHeight;
    $(function () {
        var a = $(window.SELECTOR_BREADCRUMBS + ":first"), b = d(a);
        p = b.title, o = b.parts, $(window).on([window.EVENT_CHANGE_HEADER_FIXED_STATE].join(" "), function (a, b) {
            s = 0, b && (s = $(window.SELECTOR_HEADER_SEARCH).height())
        }).on(["resize", window.EVENT_CHANGE_HEADER_FIXED_STATE].join(" "), function () {
            t = window.innerHeight
        }).trigger(EVENT_HARD_CHECK_HEADER_FIXED_STATE).on(["scroll", window.EVENT_CHANGE_SCREEN_TYPE, window.EVENT_CATALOG_LIST_IS_LOADED, window.EVENT_INFISCROLL_COMPLETE, window.EVENT_PRODUCTS_LOADED, window.EVENT_RELATED_PRODUCTS_CATEGORY_SHOWED, window.EVENT_SHOWN_BOUGHT_MODAL].join(" "), function () {
            l()
        }).trigger("scroll"), $(window).on([window.EVENT_OWL_CAROUSEL_MOVE_TO_PREV, window.EVENT_OWL_CAROUSEL_MOVE_TO_NEXT, window.EVENT_OWL_CAROUSEL_GO_TO, window.EVENT_OWL_CAROUSEL_JUMP_TO, window.EVENT_OWL_CAROUSEL_STOP].join(" "), function (a) {
            if (!a.target || a.target === window)return !1;
            var b = a.target;
            /owl-wrapper/g.test(a.target.className) || (b = b.querySelector(".owl-wrapper"));
            var c = document.createElement("style").style;
            if (c.hasOwnProperty("transition") || c.hasOwnProperty("-o-transition") || c.hasOwnProperty("-moz-transition") || c.hasOwnProperty("-webkit-transition"))var d = window.getComputedStyle(b),
                e = d.transitionDuration || d.oTransitionDuration || d.mozTransitionDuration || d.webkitTransitionDuration,
                f = e.match(/(\d+(\.\d+)?)|(s|ms)/g), g = parseFloat(f[0]), h = "s" == f[1] ? 1e3 : 1,
                i = setTimeout(function () {
                    clearTimeout(i), l()
                }, g * h + 50); else {
                var j = b.getBoundingClientRect().left;
                !function a() {
                    var c = setTimeout(function () {
                        clearTimeout(c);
                        var d = b.getBoundingClientRect().left;
                        d != j ? (j = d, a()) : l()
                    }, 4)
                }()
            }
        })
    }), $(function () {
        $(document.body).on("click", ".ec-price-item-link", function (a) {
            h($(a.target).closest(window.SELECTOR_PRODUCT))
        })
    }), $(function () {
        var d = $(window.SELECTOR_PAGE_PRODUCT);
        if (!d.length)return null;
        var e = $(window.SELECTOR_BREADCRUMBS + ":first"), f = a(e);
        f.parts.splice(-1), b(f), p = c(f).title, i(d)
    }), $(function () {
        $(document.body).on(window.EVENT_UPDATE_CART, window.SELECTOR_CART_BUTTON, function (a) {
            j($(a.target).closest(window.SELECTOR_PRODUCT))
        })
    }), $(function () {
        $(document.body).on("click", "[data-role=category-group-switch]", function (a) {
            var b = $(this);
            if (b.data("disabled"))return !1;
            var c, d = b.data("id");
            switch (d) {
                case"avails":
                    c = "GROUP_BY_AVAILS";
                    break;
                case"brand":
                    c = "GROUP_BY_BRAND";
                    break;
                case"none":
                    c = "GROUP_BY_NONE";
                    break;
                default:
                    c = "GROUP_BY_CHARACTERISTIC"
            }
            ga("send", "event", "Catalog", "Group_by", c)
        })
    })
}), unit("ecommerceOrder").require("jQuery").import("ga", "orderFinalEcommerce", "productsData as data, totalPrice from orderProducts").define(function () {
    function a(a) {
        return
    }

    function b(a) {
        return
    }

    this.imports.data, this.imports.totalPrice;
    window.SELECTOR_PAGE_ORDER = ".order-page", $(function () {
        var c = $(window.SELECTOR_PAGE_ORDER);
        if (c.length) {
            var d = c.data("step-number"), e = c.find("button[type=submit]"), f = function () {
            };
            switch (d) {
                case 1:
                    f = a;
                    break;
                case 4:
                    f = b;
                    break;
                case 5:
                    return void $("#final-message-product-list").orderEcommerce()
            }
            e.closest("form").submit(function () {
                f(c)
            })
        }
    })
}), function (a, b, c) {
    function d() {
        function d(a) {
            a.addClass("hidden"), a.after(A.clone())
        }

        function t(a) {
            var b = a.next(".loading-dots");
            b.length && b.detach(), a.removeClass("hidden")
        }

        function u() {
            d(w), b.ajax({
                url: w.data("request-url"), type: "GET", dataType: "JSON", success: function (a) {
                    if (!0 === a.result) {
                        var c = b(a.content);
                        w.replaceWith(c), w = c
                    }
                    t(w)
                }
            })
        }

        var v = b("#faq"), w = v.find("[data-role=faq-tab-content]"), x = b(".faq-controls"),
            y = b(".faq-best-assistants"), z = b("[data-role=question-form-container]");
        if (0 !== w.length) {
            var A = b("<div><span /><span /><span /><span /></div>").addClass("loading-dots");
            b(a).on("tabSelected", "#faq", function () {
                w.is(":empty") && u()
            }), v.on("click", "[data-role=toggle-topic]", function () {
                return b(this).closest("[data-role=topic]").toggleClass("expand"), !1
            }), v.on("click", "[data-role=toggle-question]", function () {
                return b(this).closest("[data-role=question]").find("[data-role=question-content]").toggleClass("hidden"), !1
            }), v.on("click", "[data-role=show-question-form]", function (a) {
                a.preventDefault();
                var c = b(this);
                0 === b(s).length ? (d(z), b.ajax({
                    url: c.data("get-form-url"),
                    type: "GET",
                    dataType: "JSON",
                    success: function (a) {
                        if (!0 === a.result) {
                            var c = b(a.content);
                            z.append(c), b(s).removeClass("hidden")
                        }
                        t(z)
                    }
                })) : b(s).removeClass("hidden"), y.addClass("hidden"), c.addClass("hidden"), x.addClass("hidden")
            }), v.on("click", "[data-role=hide-question-form]", function (a) {
                a.preventDefault(), b("[data-role=question-form]").addClass("hidden"), b("[data-role=show-question-form]").removeClass("hidden"), b(".faq-best-assistants").removeClass("hidden"), b(".faq-controls").removeClass("hidden")
            }), v.on("click", "[data-role=submit-question-form]", function (a) {
                a.preventDefault();
                var e = b(this);
                return d(z), b.ajax({
                    url: e.data("submit-form-url"),
                    type: "POST",
                    dataType: "JSON",
                    data: b(s).serializeArray(),
                    success: function (a) {
                        if (!0 === a.result && (z.html(a.content), c !== a.question))if (!0 === a.hasOwnProperty("updateTab") && !0 === a.updateTab) u(); else {
                            var d = b('[data-role="topic-container"]'), e = b('[data-topic-id="' + a.topicId + '"]'),
                                f = b(a.question), g = e.find('[data-role="count-questions"]'), h = parseInt(g.text());
                            f.addClass("new"), d.prepend(b(a.message)), e.removeClass("hidden").addClass("expand").find(".questions").prepend(f), g.text(h + 1), b("[data-role=show-question-form]").removeClass("hidden"), b(s).remove(), window.setTimeout(function () {
                                d.find(".alert-warning").fadeTo(500, 0).slideUp(500)
                            }, 4e3)
                        }
                    }
                }), t(z), !1
            }), v.on("click", "[data-role=show-answer-form]", function (a) {
                a.preventDefault();
                var c = b(this), e = b("[data-role=show-answer-form]"),
                    f = c.closest('[data-role="question"]').find("[data-role=answer-form-container]"),
                    g = f.find("[data-role=answer-form]");
                0 === g.length ? (d(f), b.ajax({
                    url: c.data("get-form-url"),
                    type: "GET",
                    dataType: "JSON",
                    success: function (a) {
                        if (!0 === a.result) {
                            var c = b(a.content);
                            f.append(c), g = c, g.removeClass("hidden")
                        }
                        t(f)
                    }
                })) : (g.appendTo(f), g.removeClass("hidden")), e.removeClass("hidden"), c.addClass("active")
            }), v.on("click", "[data-role=hide-answer-form]", function (a) {
                a.preventDefault(), b("[data-role=answer-form]").addClass("hidden"), b("[data-role=show-answer-form]").removeClass("active")
            }), v.on("click", "[data-role=submit-answer-form]", function (a) {
                a.preventDefault();
                var c = b(this), e = c.closest("[data-role=answer-form]"),
                    f = e.closest("[data-role=answer-form-container]");
                return d(f), b.ajax({
                    url: c.data("submit-form-url"),
                    type: "POST",
                    dataType: "JSON",
                    data: e.serializeArray(),
                    success: function (a) {
                        if (!0 === a.result)if (!0 === a.hasOwnProperty("updateTab") && !0 === a.updateTab) u(); else {
                            t(f);
                            var c = b(a.answer), d = b('[data-role="topic-container"]'),
                                e = b('[data-role="show-answer-form"]');
                            c.addClass("new"), e.removeClass("active"), f.next('[data-role="answers-container"]').prepend(c), d.prepend(b(a.message)), f.html(""), window.setTimeout(function () {
                                d.find(".alert-warning").fadeTo(500, 0).slideUp(500)
                            }, 4e3)
                        }
                    }
                }), !1
            }), v.on("click", k, function (a) {
                a.preventDefault();
                var c = b(this), d = c.closest(j), e = d.find(n), f = e.find(o), g = e.find(p), h = e.find(q);
                return !d.is("[data-voted]") && (d.attr("data-voted", !0), b.ajax({
                        url: d.data("url"),
                        type: "POST",
                        dataType: "JSON",
                        data: {vote: c.data("vote-type")},
                        success: function (a) {
                            if (!1 === a.result || a.hasOwnProperty("error"))return d.removeAttr("data-voted"), !1;
                            var b = parseInt(f.text()) || 0, i = parseInt(g.text()) || 0, j = parseInt(h.text()) || 0;
                            c.is(l) ? (b += 1, i += 1) : c.is(m) && (b -= 1, j -= 1), console.log(b + "-" + i + "-" + j), f.text(b), g.text(i), h.text(j), 0 > b ? e.removeClass("positive").addClass("negative") : 0 < b ? e.removeClass("negative").addClass("positive") : e.removeClass("negative").removeClass("positive"), c.addClass("voted")
                        },
                        error: function () {
                            d.removeAttr("data-voted")
                        }
                    }), !1)
            }), v.on("click", n, function () {
                b(this).find(e).show()
            }).on("mouseleave", n, function () {
                b(e + ":visible").length > 0 && b(this).find(e).hide()
            }), v.on("click", i, function () {
                b("input[type=checkbox]:checked", this).length > 0 ? (1 == b("input[type=checkbox]:checked", ".faq-controls .dropdown-menu").length && b(".topic", v).addClass("hidden"), b("[data-topic-id=" + b("input[type=checkbox]", this).val() + "]").removeClass("hidden")) : b("[data-topic-id=" + b("input[type=checkbox]", this).val() + "]").addClass("hidden"), 0 == b("input[type=checkbox]:checked", ".faq-controls .dropdown-menu").length && b(".topic", v).removeClass("hidden")
            }), v.on("click", g, function () {
                b(f).hasClass("open") ? (b(this).removeClass("open"), b(this).find("a").text("Р Р°Р·РІРµСЂРЅСѓС‚СЊ"), b(f).removeClass("open")) : (b(this).addClass("open"), b(this).find("a").text("РЎРІРµСЂРЅСѓС‚СЊ"), b(f).addClass("open"))
            }), v.on("click", h, function () {
                b(this).addClass("hidden").prev(".answers").find(".answer").removeClass("hidden")
            }), b(r).prop("checked") || b(r).prop("disabled", !1), v.on("click", r, function () {
                var a = "РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.", c = b(this);
                b.ajax({
                    url: c.data("url"), type: "GET", dataType: "JSON", success: function (b) {
                        !0 === b.result && (a = c.prop("checked") ? "Р’С‹ РїРѕРґРїРёСЃР°РЅС‹ РЅР° СѓРІРµРґРѕРјР»РµРЅРёСЏ Рѕ РЅРѕРІС‹С… РІРѕРїСЂРѕСЃР°С… Рє РґР°РЅРЅРѕРјСѓ С‚РѕРІР°СЂСѓ,СѓРІРµРґРѕРјР»РµРЅРёСЏ Р±СѓРґСѓС‚ РїСЂРёС…РѕРґРёС‚СЊ РЅР° СЌР»РµРєС‚СЂРѕРЅРЅСѓСЋ РїРѕС‡С‚Сѓ. РћС‚РїРёСЃР°С‚СЊСЃСЏ РѕС‚ СѓРІРµРґРѕРјР»РµРЅРёР№,Р’С‹ СЃРјРѕР¶РµС‚Рµ РІ РєР°СЂС‚РѕС‡РєРµ СЃРїСѓСЃС‚СЏ РЅРµРєРѕС‚РѕСЂРѕРµ РІСЂРµРјСЏ РёР»Рё РІ РїРёСЃСЊРјРµ СЃ СѓРІРµРґРѕРјР»РµРЅРёРµРј Рѕ РЅРѕРІРѕРј РІРѕРїСЂРѕСЃРµ." : "Р’С‹ РѕС‚РїРёСЃР°Р»РёСЃСЊ РѕС‚ СЂР°СЃСЃС‹Р»РєРё РїРѕ РІРѕРїСЂРѕСЃР°Рј")
                    }
                }).always(function () {
                    c.prop("disabled", !0), b(".subscribe-alert").css("display", "block"), b(".subscribe-alert > SPAN").text(a), setTimeout(function () {
                        b(".subscribe-alert").fadeOut("slow")
                    }, 1e4)
                })
            })
        }
    }

    var e = ".vote-counter-expand", f = ".disclaimer", g = ".disclaimer .expand-btn",
        h = ".question .show-remain-answers", i = ".faq-controls .dropdown-menu .checkbox",
        j = "[data-role=faq-vote-container]", k = "[data-role=vote]", l = "[data-vote-type=up]",
        m = "[data-vote-type=down]", n = "[data-role=counter-container]", o = "[data-role=counter-all]",
        p = "[data-role=counter-up]", q = "[data-role=counter-down]", r = "#subscribe-on-questions",
        s = "[data-role=question-form]";
    b(a).ready(function () {
        d(), b("#item-tabs-block").on(window.EVENT_PRODUCT_CARD_TAB_RENDER, "#faq", d)
    })
}(document, jQuery), $(document).ready(function () {
    var a = $("#feedback-answer-form"), b = $("[data-role=show-answer-create-form-btn]"),
        c = $("[data-role=hide-answer-create-form-btn]"), d = $("[data-role=ticket-theme-input]"),
        e = $("[data-role=ticket-theme-additional-information]"), f = $('[name*="[category]"]'),
        g = $("[data-role=theme-category-dropdown-container]"), h = $("[data-role=theme-category-dropdown]"),
        i = $("#email-confirm-modal"), j = $("#ticket-create-form"), k = $("#ticketcreateform-useremail"),
        l = $("#email-modal-submit");
    $("#feedback-my-tickets-tabs-block").responsiveTabs({
        active: 0,
        setHash: !0,
        collapsible: "accordion",
        classes: {
            stateDefault: "r-tabs-state-default",
            stateActive: "active",
            stateDisabled: "r-tabs-state-disabled",
            stateExcluded: "r-tabs-state-excluded",
            tab: "r-tabs-tab",
            anchor: "r-tabs-anchor",
            panel: "r-tabs-panel",
            accordionTitle: "r-tabs-accordion-title"
        }
    }), b.on("click", function () {
        b.addClass("hidden"), a.removeClass("hidden")
    }), c.on("click", function () {
        a.addClass("hidden"), b.removeClass("hidden")
    }), d.on("change", function () {
        var a = d.val();
        $.ajax({
            url: d.data("url"), type: "GET", dataType: "JSON", data: {themeGuid: a}, success: function (a) {
                if (!1 === a.result)return !1;
                a.addInfo ? (e.html(a.addInfo), e.removeClass("hidden")) : e.addClass("hidden"), f.html(a.subThemes), $("#select2-ticketcreateform-category-container").removeAttr("title").empty(), $("<span/>", {
                    class: "select2-selection__placeholder",
                    text: "Р’С‹Р±РµСЂРёС‚Рµ РєР°С‚РµРіРѕСЂРёСЋ"
                }).appendTo($("#select2-ticketcreateform-category-container")), a.categoryName ? (console.log("LAH"), g.removeClass("hidden"), h.find("LABEL").text(a.categoryName + "*")) : (console.log(g), g.addClass("hidden"))
            }, error: function () {
                e.addClass("hidden")
            }
        })
    }), j.on("submit", function () {
        if (!1 === k.hasClass("send-empty")) {
            var a = k.val();
            if ("" === $.trim(a))return i.modal("show"), !1
        }
    }), l.on("click", function () {
        k.addClass("send-empty"), j.submit()
    })
}), function (a) {
    a.fn.fiasCity = function (b) {
        return b = a.extend({update_field: ""}, b), this.addClass("fias-autocomplete"), this.autocomplete({
            minLength: 2,
            delay: 500,
            source: function (b, c) {
                a.ajax({
                    url: "/ajax.php?action=fias&faction=findCityByString",
                    type: "GET",
                    data: {q: b.term, addinfo: !0},
                    success: function (b) {
                        var d = [];
                        b = JSON.parse(b), a(b).each(function (a, b) {
                            var c = b.shortname + " " + b.offname;
                            null == b.grandparentname && null == b.parentname || (c += " (", null != b.grandparentname && (c += b.grandparentshort + " " + b.grandparentname), null != b.parentname && (null != b.grandparentname && (c += ", "), c += b.parentshort + " " + b.parentname), c += ")"), d.push({
                                id: b.aoguid,
                                label: c,
                                value: c
                            })
                        }), c(d)
                    }
                })
            },
            select: function (c, d) {
                a(c.target).data("cityguid", d.item.id), "" != b.update_field && a(b.update_field).val(d.item.id)
            }
        }), this
    }, a.fn.fiasStreet = function () {
        var b, c = this.data("cityguid"), d = this;
        return this.addClass("fias-autocomplete"), a.ajax({
            url: "/fias/get-all-streets-by-city/",
            type: "GET",
            delay: 0,
            data: {cityguid: c},
            success: function (c) {
                var e = [];
                c = JSON.parse(c), a(c).each(function (a, b) {
                    e.push({id: b.aoguid, label: b.shortname + " " + b.offname, value: b.shortname + " " + b.offname})
                }), b = e, d.autocomplete({
                    source: b, select: function (b, c) {
                        a(b.target).data("streetguid", c.item.id)
                    }
                })
            }
        }), this
    }, a.fn.fiasHouse = function (b) {
        var c = a(b);
        return this.addClass("fias-autocomplete"), this.autocomplete({
            minLength: 1,
            delay: 100,
            source: function (b, d) {
                var e = c.data("streetguid");
                a.ajax({
                    url: "/fias/find-house/", type: "GET", data: {q: b.term, aoguid: e}, success: function (b) {
                        var c = [];
                        b = JSON.parse(b), a(b).each(function (a, b) {
                            c.push({
                                id: b.houseguid,
                                label: b.housenum + b.buildnum + b.strucnum,
                                value: b.housenum + b.buildnum + b.strucnum
                            })
                        }), d(c)
                    }
                })
            },
            select: function (b, c) {
                a(b.target).data("houseguid", c.item.id)
            }
        }), this
    }, a.fn.fiasACStyle = function () {
        a("head").append("<style>  .ui-autocomplete {    max-height: 100px;    overflow-y: auto;    /* prevent horizontal scrollbar */    overflow-x: hidden; } .fias-autocomplete.ui-autocomplete-loading {  background: white url('data:image/gif;base64,R0lGODlhEAAQAPMPALu7u5mZmTMzM93d3REREQAAAHd3d1VVVWZmZqqqqoiIiO7u7kRERCIiIgARAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAPACwAAAAAEAAQAEAEcPDJtyg6dUrFetDTIopMoSyFcxxD1krD8AwCkASDIlPaUDQLR6G1Cy0SgqIkE1IQGMrFAKCcGWSBzwPAnAwarcKQ15MpTMJYd1ZyUDXSDGelBY0qIoBh/ZoYGgELCjoxCRRvIQcGD1kzgSAgAACQDxEAIfkEBQcADwAsAAAAAA8AEAAABF3wyfkMkotOJpscRKJJwtI4Q1MAoxQ0RFBw0xEvhGAVRZZJh4JgMAEQW7TWI4EwGFjKR+CAQECjn8DoN0kwDtvBT8FILAKJgfoo1iAGAPNVY9DGJXNMIHN/HJVqIxEAIfkEBQcADwAsAAAAABAADwAABFrwyfmColgiydpaQiY5x9Ith7hURdIl0wBIhpCAjKIIxaAUPQ0hFQsAC7MJALFSFi4SgC4wyHyuCYNWxH3AuhSEotkNGAALAPqqkigG8MWAjAnM4A8594vPUyIAIfkEBQcADwAsAAAAABAAEAAABF3wySkDvdKsddg+APYIWrcg2DIRQAcU6DJICjIsjBEETLEEBYLqYSDdJoCGiHgZwG4LQCCRECEIBAdoF5hdEIWwgBJqDs7DgcKyRHZl3uUwuhm2AbNNW+LV7yd+FxEAIfkEBQcACAAsAAAAABAADgAABEYQyYmMoVgeWQrP3NYhBCgZBdAFRUkdBIAUguVVo1ZsWFcEGB5GMBkEjiCBL2a5ZAi+m2SAURExwKqPiuCafBkvBSCcmiYRACH5BAUHAA4ALAAAAAAQABAAAARs0MnpAKDYrbSWMp0xZIvBKYrXjNmADOhAKBiQDF5gGcICNAyJTwFYTBaDQ0HAkgwSmAUj0OkMrkZM4HBgKK7YTKDRICAo2clAEIheKc9CISjEVTuEQrJASGcSBQcSUFEUDQUXJBgDBW0Zj34RACH5BAUHAA8ALAAAAAAQABAAAARf8Mn5xqBYgrVC4EEmBcOSfAEjSopJMglmcQlgBYjE5NJgZwjCAbO4YBAJjpIjSiAQh5ayyRAIDKvJIbnIagoFRFdkQDQKC0RBsCIUFAWsT7RwG410R8HiiK0WBwJjFBEAIfkEBQcADgAsAQABAA8ADwAABFrQybEWADXJLUHHAMJxIDAgnrOo2+AOibEMh1LN62gIxphzitRoCDAYNcNN6FBLShao4WzwHDQKvVGhoFAwGgtFgQHENhoB7nCwHRAIC0EyUcC8Zw1ha3NIRgAAIfkEBQcADwAsAAAAABAAEAAABGDwyfnWoljaNYYFV+Zx3hCEGEcuypBtMJBISpClAWLfWODymIFiCJwMDMiZBNAAYFqUAaNQ2E0YBIXGURAMCo1AAsFYBBoIScBJEwgSVcmP0li4FwcHz+FpCCQMPCFINxEAIfkEBQcADgAsAAABABAADwAABFzQyemWXYNqaSXY2vVtw3UNmROM4JQowKKlFOsgRI6ASQ8IhSADFAjAMIMAgSYJtByxyQIhcEoaBcSiwegpDgvAwSBJ0AIHBoCQqIAEi/TCIAABGhLG8MbcKBQgEQAh+QQFBwAPACwAAAEAEAAPAAAEXfDJSd+qeK5RB8fDRRWFspyotAAfQBbfNLCVUSSdKDV89gDAwcFBIBgywMRnkWBgcJUDKSZRIKAPQcGwYByAAYTEEJAAJIGbATEQ+B4ExmK9CDhBd8ThdHw/AmUYEQAh+QQFBwAPACwAAAEADwAPAAAEXvBJQIa8+ILSspdHkXxS9wxF4Q3L2aTBeC0sFjhAtuyLIjAMhYc2GBgaSKGuyNoBDp7czFAgeBIKwC6kWCAMxUSAFjtNCAAFGGF5tCQLAaJnWCTqHoREvQuQJAkyGBEAOw==') right center no-repeat !important; } </style>")
    }
}(jQuery), function (a, b, c) {
    function d(a) {
        var c = {};
        return c.data = [], c.filterListId = a.attr("id"), a.find(g).each(function () {
            var a = b(this).data("id"), d = a.indexOf(".");
            if (-1 < d && (a = a.substr(0, d) + "[" + a.substr(d + 1) + "]"), l === b(this).data(j)) {
                var e = b(this).find(':input[type="checkbox"]:checked').first();
                0 !== e.length && c.data.push({key: a, value: e.data("id")})
            }
            if (m === b(this).data(j)) {
                var f = "";
                b(this).find(':input[type="checkbox"]:checked').each(function () {
                    f += (f.length ? "-" : "") + b(this).data("id")
                }), "" !== f && c.data.push({key: a, value: f})
            }
            if (n === b(this).data(j)) {
                var g = b(this).find(':input[type="radio"]:checked').first();
                0 !== g.data("id") && c.data.push({key: a, value: g.data("id")})
            }
            if (k === b(this).data(j)) {
                var o = b(this).find(i).first(), p = b(this).find(h).first(), q = o.val() || o.data("default"),
                    r = p.val() || p.data("default");
                q = parseFloat(q), r = parseFloat(r), parseFloat(o.data("default")) === q && parseFloat(p.data("default")) === r || c.data.push({
                    key: a,
                    value: q + "-" + r
                })
            }
        }), c
    }

    function e(a) {
        a.find(g).each(function () {
            f(b(this))
        })
    }

    function f(a) {
        if (l !== a.data(j) && m !== a.data(j) || a.find('[type="checkbox"]').prop("checked", !1), n === a.data(j) && a.find('[type="radio"]:first').prop("checked", !0), k === a.data(j)) {
            var c = [i, h].join(",");
            a.find(c).each(function () {
                var a = b(this);
                a.val(a.data("default")).change()
            })
        }
    }

    c.EVENT_FILTER_LIST_AFTER_CHANGE = "filter-list:after-change";
    var g = '[data-role="filter-block"]', h = '[data-type="to"]', i = '[data-type="from"]', j = "filter-block-role",
        k = "interval", l = "checkbox", m = "checkbox-list", n = "radio-list", o = !0, p = function () {
            o = !1, b('[data-role="filters-container"]').removeClass("initial-state").toggleClass("active"), b("body").toggleClass("blocked")
        };
    b(function () {
        var h = b('[data-role="filters-container"]'), i = h.find('[data-role="filter-list-form"]');
        c.checkScreenType(c.SCREEN_MOBILE, c.SCREEN_TABLET) && (o = !1, i.find('[data-role="filter-list"]').each(function () {
            b(this).find(g).each(function () {
                var a = b(this), c = a.data(j);
                if (-1 !== [m, n].indexOf(c)) {
                    1 !== a.find('[type="checkbox"], [type="radio"]').length && a.find('[data-toggle="collapse"]').attr("aria-expanded", "false").addClass("collapsed").end().find(".filter-block-items").removeClass("in")
                }
            })
        })), i.change(function () {
            if (!1 !== o) {
                var a = d(b(this).find('[data-role="filter-list"]'));
                b('[data-role="filters-counter"]').text(a.data.length).toggleClass("hidden", 0 === a.data.length), b(this).trigger(c.EVENT_FILTER_LIST_AFTER_CHANGE, a)
            }
        }), h.on("click", '[data-role="submit-mobile-filters"]', function () {
            o = !0, i.change(), p()
        }), b(a).on("click", '[data-role="clear-filters"]', function () {
            var a = b(this), c = i.find(g + '[data-id="' + a.data("filter-id") + '"]');
            a.closest(".active-filter").remove(), 0 === b('[data-role="widget-picked-filters"]').find(".active-filter").not('[data-role="reset-filters-container"]').length && b('[data-role="widget-picked-filters"]').remove(), f(c), i.change()
        }), b(a).on("click", '[data-role="reset-filters"]', function () {
            b('[data-role="widget-picked-filters"]').remove(), e(i.find('[data-role="filter-list"]')), i.change()
        }), b(a).on("click", '[data-role="filters-toggle-button"]', p), b(a).ajaxSuccess(function (a, b) {
            var c = b.getResponseHeader("filters-changes");
            if (null !== c) {
                var d, e = JSON.parse(c);
                for (var f in e)if (!1 !== e.hasOwnProperty(f)) {
                    var h = i.find(g + '[data-id="' + f + '"]');
                    if (0 !== h.length)if (k !== h.data(j)) {
                        d = e[f];
                        for (var l in d)if (!1 !== d.hasOwnProperty(l)) {
                            var m = d[l],
                                n = h.find('[data-role="filter-block-item"]:has([data-id="' + m.queryId + '"])');
                            if (0 !== n.length) {
                                var o = 0 === parseInt(m.objectsCount);
                                n.toggleClass("empty", o).find(".filter-block-item-count").text("(" + m.objectsCount + ")")
                            }
                        }
                    } else {
                        var p = e[f], q = h.find('[data-role="interval-slider"]');
                        q.attr("data-filtered-min", p.filteredMin).attr("data-filtered-max", p.filteredMax)
                    }
                }
            }
        })
    })
}(document, jQuery, window), jQuery(function () {
    $('[data-action="filterList"]').on("input", function () {
        var a = $(this).val(), b = $(this).data("target");
        a = new RegExp(a.toLowerCase().replace(/[Рµ|С‘]/, "[Рµ|С‘]")), $(b).children().each(function () {
            var b = $(this).text().toLowerCase();
            a.test(b) ? $(this).css("display", "block") : $(this).css("display", "none")
        })
    })
}), function (a, b, c) {
    function d(a, b) {
        var c = Math.pow(h, parseInt(Math.log(b - a) / Math.log(h) - 1)) || 1;
        return (b - parseInt(b) > 0 || a - parseInt(a) > 0) && (c = Math.min(.5, c), b - a < h && (c = Math.min(.1, c))), c <= j && c >= i && (c = 0 == a % i && 0 == b % i ? i : 0 == a % j && 0 == b % j ? j : h), c
    }

    function e(a, b) {
        var c = a.data("type"), d = k === c ? 0 : 1;
        if ("" === a.val())return !1;
        var e = parseInt(a.val()), f = a.siblings("input[type=text]");
        if ("" === f.val())var h = !1; else h = parseInt(f.val());
        var i = a.closest(g).find(".ui-slider"), j = parseInt(i.slider("option", "min")),
            m = parseInt(i.slider("option", "max"));
        if (!(e >= j && e <= m)) {
            var n;
            return n = e > m ? k === c ? parseInt(i.slider("values", 1)) : m : l === c ? parseInt(i.slider("values", 0)) : j, i.slider("values", d, n), "change" === b && a.val(n), !1
        }
        h && (k === c && e <= h || l === c && e >= h) || !1 === h ? i.slider("values", d, e) : (i.slider("values", d, h), "change" === b && a.val(h))
    }

    function f(b) {
        a(b).each(function () {
            var b = a(this);
            c === b.data("initialized") && (b.find(".slider_opt").each(function (b, c) {
                var e = a(c), f = e.data("min"), h = e.data("max"), i = e.closest(g),
                    j = i.find("input[type=text][data-type=to]"), k = i.find("input[type=text][data-type=from]");
                e.slider({
                    range: !0,
                    step: d(f, h),
                    min: f,
                    max: h,
                    textFrom: k,
                    textTo: j,
                    values: [e.data("value_from"), e.data("value_to")],
                    slide: function (b, c) {
                        var d = "" !== k.val() ? k.val() : a(b.target).slider("option", "min"),
                            e = "" !== j.val() ? j.val() : a(b.target).slider("option", "max");
                        j.toggleClass("is-changed", c.values[1] !== parseInt(e)), k.toggleClass("is-changed", c.values[0] !== parseInt(d)), j.val(c.values[1] !== a(b.target).slider("option", "max") ? c.values[1] : ""), k.val(c.values[0] !== a(b.target).slider("option", "min") ? c.values[0] : "")
                    },
                    stop: function () {
                        var b = a(this).closest(g).find("input[type=text][data-type].is-changed");
                        0 !== b.length && b.removeClass("is-changed").change()
                    }
                }).draggable(), m(e), new (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)(function (b) {
                    b.forEach(function (b) {
                        "attributes" === b.type && m(a(b.target))
                    })
                }).observe(c, {attributes: !0})
            }), b.find(".slider_opt_no_range").each(function (b, c) {
                var d = a(c), e = d.data("true_value_title"), f = d.data("false_value_title");
                d.labeledslider({
                    min: 0,
                    max: 2,
                    tickArray: [0, 1, 2],
                    tickLabels: {0: "РќРµ РІР°Р¶РЅРѕ", 1: f, 2: e},
                    slide: function (b, c) {
                        var d = a(this).parent().siblings("input[type=hidden]");
                        d.val(c.value), d.change()
                    },
                    value: a(this).data("value")
                })
            }), b.find(".slider_opt_txtbox").change(function () {
                e(a(this), "change")
            }).keyup(function () {
                e(a(this), "keydown")
            }), b.attr("data-initialized", !0))
        })
    }

    var g = "[data-box=interval]", h = 10, i = 50, j = 100, k = "from", l = "to";
    a.widget("ui.slider", a.ui.slider, {
        refresh: function () {
            this.options.step = d(this.options.min, this.options.max);
            var a = this.options.textFrom.val(), b = parseInt(this.options.textFrom.val()),
                c = this.options.textTo.val(), e = parseInt(this.options.textTo.val());
            this.options.textFrom.prop("placeholder", this.options.min), this.options.textTo.prop("placeholder", this.options.max);
            var f = !1;
            "" !== a ? (b < this.options.min || b > this.options.max) && (this.options.textFrom.val(""), f = !0, this.values(0, this.options.min)) : this.values(0, this.options.min), "" !== c ? (e < this.options.min || e > this.options.max) && (this.options.textTo.val(""), f = !0, this.values(1, this.options.max)) : this.values(1, this.options.max), !0 === f && this.options.textFrom.change()
        },
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            textFrom: null,
            textTo: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        }
    }), a(function () {
        f(".catalog-filter"), f(".filter-list"), a(window).on(window.EVENT_CONFIGURATOR_CATALOG_IS_LOADED, function (a) {
            f(a.target)
        })
    });
    var m = function (b) {
        var d = parseInt(b.data("min")), e = parseInt(b.data("max")), f = e - d, g = ["min", "max"];
        for (var h in g)if (!1 !== g.hasOwnProperty(h)) {
            var i = g[h], j = b.attr("data-filtered-" + i);
            if (c !== j) {
                var k = b.find('[data-role="filtered-range-' + i + '"]');
                0 === k.length && (k = a("<div />").attr("data-role", "filtered-range-" + i).addClass("filtered-range"), b.append(k));
                var l = "min" === i ? (j - d) / f * 100 : (e - j) / f * 100;
                k.width(l + "%")
            }
        }
    };
    a(function (a) {
        a.datepicker.regional.ru = {
            closeText: "Р—Р°РєСЂС‹С‚СЊ",
            prevText: "&#x3c;РџСЂРµРґ",
            nextText: "РЎР»РµРґ&#x3e;",
            currentText: "РЎРµРіРѕРґРЅСЏ",
            monthNames: ["РЇРЅРІР°СЂСЊ", "Р¤РµРІСЂР°Р»СЊ", "РњР°СЂС‚", "РђРїСЂРµР»СЊ", "РњР°Р№", "РСЋРЅСЊ", "РСЋР»СЊ", "РђРІРіСѓСЃС‚", "РЎРµРЅС‚СЏР±СЂСЊ", "РћРєС‚СЏР±СЂСЊ", "РќРѕСЏР±СЂСЊ", "Р”РµРєР°Р±СЂСЊ"],
            monthNamesShort: ["РЇРЅРІ", "Р¤РµРІ", "РњР°СЂ", "РђРїСЂ", "РњР°Р№", "РСЋРЅ", "РСЋР»", "РђРІРі", "РЎРµРЅ", "РћРєС‚", "РќРѕСЏ", "Р”РµРє"],
            dayNames: ["РІРѕСЃРєСЂРµСЃРµРЅСЊРµ", "РїРѕРЅРµРґРµР»СЊРЅРёРє", "РІС‚РѕСЂРЅРёРє", "СЃСЂРµРґР°", "С‡РµС‚РІРµСЂРі", "РїСЏС‚РЅРёС†Р°", "СЃСѓР±Р±РѕС‚Р°"],
            dayNamesShort: ["РІСЃРє", "РїРЅРґ", "РІС‚СЂ", "СЃСЂРґ", "С‡С‚РІ", "РїС‚РЅ", "СЃР±С‚"],
            dayNamesMin: ["Р’СЃ", "РџРЅ", "Р’С‚", "РЎСЂ", "Р§С‚", "РџС‚", "РЎР±"],
            weekHeader: "РќРµРґ",
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, a.datepicker.setDefaults(a.datepicker.regional.ru)
    })
}(jQuery, document), function (a) {
    var b = {
        init: function (b) {
            return b = a.extend({width: "auto"}, b), this.each(function () {
                var c = a(this);
                if (!c.data("fluid_columns")) {
                    var d, e = {
                        elements: c.children("li"),
                        heights: {},
                        width: "auto" == b.width ? c.children("li").first().outerWidth(!0) : b.width,
                        resizeTimeout: 0
                    }, f = 0;
                    a.map(e.elements, function (b, c) {
                        d = a(b).outerHeight(!0), f += d, e.heights[c] = d
                    }), e.total = f, c.data("fluid_columns", e)
                }
                c.fluid_columns("draw")
            })
        }, draw: function (b) {
            return b ? this.each(function () {
                var b = a(this), c = b.data("fluid_columns");
                c.resizeTimeout && clearTimeout(c.resizeTimeout), c.resizeTimeout = setTimeout(function () {
                    b.fluid_columns("draw")
                }, 300), b.data("fluid_columns", c)
            }) : this.each(function () {
                for (var b = a(this), c = b.data("fluid_columns"), d = Math.floor(b.width() / c.width), e = Math.floor(c.total / d) + 1, f = 0, g = new Array, h = !1, i = parseInt(a(this).parent().css("padding-left")), j = 0; j < d; j++)g[j] = 0;
                a.map(c.elements, function (b, j) {
                    if (e >= c.heights[j] + g[f]) a(b).css({
                        left: f * c.width + i + "px",
                        top: g[f] + "px"
                    }), g[f] += c.heights[j]; else {
                        for (h = !1, ++f; f < d;) {
                            if (e >= c.heights[j] + g[f]) {
                                h = !0;
                                break
                            }
                            ++f
                        }
                        h || f != d || (f = 0), a(b).css({
                            left: f * c.width + i + "px",
                            top: g[f] + "px"
                        }), g[f] += c.heights[j], e < g[f] && (e = g[f])
                    }
                }), b.height(e)
            })
        }
    };
    a.fn.fluid_columns = function (c) {
        return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist") : b.init.apply(this, arguments)
    }
}(jQuery), $(function () {
    $(".input-file").each(function () {
        var a = $(this);
        a.find("input[type=file]").on("change", function () {
            var b = $(this).val(), c = 0;
            c = b.lastIndexOf("\\") ? b.lastIndexOf("\\") + 1 : b.lastIndexOf("/") + 1, a.find("label").text(b.slice(c))
        })
    })
}), $(function () {
    $(document).ready(function () {
        function a(a, b) {
            var c = [], d = [];
            if ($.each(b, function (b, e) {
                    var f = $("#" + b, a);
                    if (e.length && f.length) {
                        var g = parseInt(f.offset().top);
                        c[g] = f, d.push(g)
                    }
                }), c.length) {
                var e = Math.min.apply(null, d);
                c[e].focus(), $("html, body").animate({scrollTop: e - 200}, 0)
            }
            return !0
        }

        $("[data-focus-on-error]").on("afterValidate", function (b, c) {
            a($(this), c)
        })
    })
}), function (a, b) {
    function c() {
        function c() {
            var c = a("<div />"), d = a("<label />"), f = a("<select />");
            d.text("Р’С‹Р±РѕСЂ Р»РѕРіРёРєРё СЂР°Р±РѕС‚С‹ РјРµРЅСЋ");
            for (var g = 0, h = k.length; g < h; ++g) {
                var i = a('<option value="' + k[g] + '"/>');
                i.text(l[g] || "--- ??? ---"), f.append(i)
            }
            f.val(e), f.on("change", function () {
                e = parseInt(f.val())
            }), c.append(d).append(f), c.css({
                border: "1px solid #B3B3B3",
                boxShadow: "rgba(0, 0, 0, .4) 0px -2px 5px 0px",
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 1000001,
                background: "#D0D0D0",
                textAlign: "center",
                padding: 5
            }).appendTo("body"), a(b).on(b.EVENT_CHANGE_SCREEN_TYPE, function () {
                b.checkScreenType(b.SCREEN_MOBILE) ? c.show() : c.hide()
            }), a(b).trigger(b.EVENT_CHANGE_SCREEN_TYPE)
        }

        var e = 0, f = a("#menu-catalog-aside"), h = null, i = [],
            j = a('[id^="b-profiler"], [id^="yii-debug"]').length > 0, k = [0, 1, 2, 3],
            l = ["Р‘РµР· РёСЃС‚РѕСЂРёРё", "Р’СЃСЏ РёСЃС‚РѕСЂРёСЏ РїРµСЂРµС…РѕРґРѕРІ", "РСЃС‚РѕСЂРёСЏ Р±РµР· РїРѕРІС‚РѕСЂРµРЅРёР№", "РџРѕРјРЅРёС‚СЊ РЅРµ Р±РѕР»РµРµ РѕРґРЅРѕРіРѕ СЌР»РµРјРµРЅС‚Р°"];
        j && (b._dev_menusLogicHotChange = c), a(b).on([b.EVENT_OPENED_MOBILE_MENU, b.EVENT_SHOWN_CATALOG_MOBILE_MENU].join(" "), function () {
            if (h instanceof a) {
                if (2 == e) {
                    var b = i.lastIndexOf(h);
                    b > -1 && i.splice(b)
                }
                3 == e && i.pop(), e > 0 && i.push(h)
            }
            h = null
        }).on(b.EVENT_OPENED_MOBILE_MENU, function () {
            h || (a(b).trigger(b.EVENT_DO_HIDE_CATALOG_MOBILE_MENU), h = d)
        }).on(b.EVENT_SHOWN_CATALOG_MOBILE_MENU, function () {
            h || (a(b).trigger(b.EVENT_DO_CLOSE_MOBILE_MENU), h = f)
        }).on([b.EVENT_CLOSED_MOBILE_MENU, b.EVENT_HIDDEN_CATALOG_MOBILE_MENU].join(" "), function () {
            h && i.length && (h = !0, i.pop().trigger(b.EVENT_OPEN)), i.length || (h = null)
        }).on([b.EVENT_SHOWN_CATALOG_MOBILE_MENU, b.EVENT_OPENED_MOBILE_MENU, b.EVENT_OPENED_MOBILE_FILTERS_MENU, b.EVENT_OPEN_SEARCH].join(" "), function () {
            a("body").setScrollingStateFor(!0), g.data("prevState", g.attr("class")), g.removeClass("static").addClass("fixed on-top")
        }).on([b.EVENT_HIDDEN_CATALOG_MOBILE_MENU, b.EVENT_CLOSED_MOBILE_MENU, b.EVENT_CLOSED_MOBILE_FILTERS_MENU, b.EVENT_CLOSE_SEARCH].join(" "), function () {
            a("body").setScrollingStateFor(!1);
            var b = g.data("prevState");
            b && (g.attr("class", b), g.data("prevState", null))
        })
    }

    b.EVENT_CHANGE_HEADER_FIXED_STATE = "change:header[fixed]", b.EVENT_HARD_CHECK_HEADER_FIXED_STATE = "check:header[fixed]", b.SELECTOR_HEADER_SEARCH = "#header-search", b.EVENT_OPEN_SEARCH = "open:search", b.EVENT_CLOSE_SEARCH = "close:search";
    var d, e, f, g;
    b.EVENT_SCROLLING_MOBILE_MENU = "mobile:menu:scrolling", a(function () {
        if (d = a("#header-menu"), e = a(b.SELECTOR_HEADER_SEARCH), f = a("#scroll-top-button"), c(), e.length) {
            var h = e.get(0).getBoundingClientRect(), i = h.top + b.scrollY, j = !1;
            g = a(".mobile-top-header");
            var k = !1;
            e.addClass("slide"), a(b).scroll(function () {
                b.scrollY > 60 ? f.show() : f.hide()
            }).scroll(function () {
                if (!j && b.scrollY >= i) e.addClass("navbar-fixed-top"), b.checkScreenType(b.SCREEN_DESKTOP, b.SCREEN_WIDE) && a("header").css("padding-bottom", e.get(0).getBoundingClientRect().height), j = !0; else {
                    if (!(j && b.scrollY <= i))return;
                    e.removeClass("navbar-fixed-top"), b.checkScreenType(b.SCREEN_DESKTOP, b.SCREEN_WIDE) && a("header").css("padding-bottom", 0), j = !1
                }
                a(b).trigger(b.EVENT_CHANGE_HEADER_FIXED_STATE, j)
            }).scroll(function () {
                if (!b.checkScreenType(b.SCREEN_MOBILE, b.SCREEN_TABLET))return this;
                !k && b.scrollY > g.get(0).getBoundingClientRect().height ? (g.removeClass("static on-top").addClass("fixed"), k = !0) : k && b.scrollY <= g.get(0).getBoundingClientRect().height && (g.addClass("static on-top").removeClass("fixed"), k = !1)
            }).trigger("scroll"), a(b).on([b.EVENT_HARD_CHECK_HEADER_FIXED_STATE, "resize"].join(" "), function () {
                a(b).trigger(b.EVENT_CHANGE_HEADER_FIXED_STATE, j)
            }), f.on("click", function () {
                a("html, body").stop().animate({scrollTop: 0}, "500", "swing")
            });
            var l = a("#w-search-form-input");
            a("#toggle-search").on("change", function () {
                this.checked ? (a(b).trigger(b.EVENT_OPEN_SEARCH), l.focus()) : a(b).trigger(b.EVENT_CLOSE_SEARCH)
            }), function () {
                function c() {
                    var a = document.body.clientWidth / 2 + h.width() / 2;
                    f.css("left", a)
                }

                function d() {
                    a(b).on("resize", c).trigger("resize")
                }

                function e() {
                    a(b).off("resize", c), f.css("left", "auto")
                }

                function g() {
                    b.checkScreenType(b.SCREEN_WIDE) ? d() : e()
                }

                var h = a('body > div.container, [data-role="content-container"]');
                a(b).on(b.EVENT_CHANGE_SCREEN_TYPE, g), g()
            }()
        }
    })
}(jQuery, window), function (a) {
    window.EVENT_CATALOG_SCROLL = "catalog_scroll", a.fn.infiScroll = function (b) {
        var c = a.extend({}, a.fn.infiScroll.defaults, b), d = !1, e = c.page, f = c.page + 1, g = c.offset, h = !1,
            i = parseInt(getURLParameter(location.search, "p")), j = a("#page" + i), k = a(c.btn_show_more);
        if (k.click(function (b) {
                return a(this).hide(), a(document).trigger("scroll.infiScroll"), b.preventDefault(), !1
            }), !c.scrolling_last_child)return console.error("Error! No scrolling child!"), !1;
        window.addEventListener("popstate", function (b) {
            b.state || (b.state = {page: 1}), j = a("#page" + b.state.page), "" != b.state.page && j.length > 0 && (h = !0, e = b.state.page, a(c.scroll_html).animate({scrollTop: j.offset().top - 80}, 300, function () {
                h = !1
            }))
        }), "" != i && j.length > 0 && (h = !0, e = i, a(c.scroll_html).animate({scrollTop: j.offset().top - 80}, 300, function () {
            h = !1
        })), a(c.scrolling_element).on("scroll.infiScroll", function () {
            for (var b = void 0, i = a(c.scrolling_last_child, a(this)), j = a('[id^="page"]'), l = 0, m = a(), n = "", o = 1, p = -1e5, q = j.length; q--;)m = j.get(q), (l = a(m).offset().top - a(c.scroll_client).scrollTop()) < 100 && l > p && (o = parseInt(a(m).attr("id").substr(4)), p = l);
            if (e !== o && 0 == h && (h = !0, e = o, n = updateURLParameter(window.location.pathname + window.location.search, "p", e), window.history.replaceState({page: e}, document.title, n), h = !1), d || k.is(":visible"))return !0;
            if (!(i instanceof jQuery && i.length > 0))return !0;
            if (b = i.last(), a(c.scroll_client).scrollTop() + a(c.scroll_client).innerHeight() - b.offset().top > 0) {
                d = !0;
                var r = "";
                r = c.show_page_count ? "<div>РЎР»РµРґСѓСЋС‰Р°СЏ СЃС‚СЂР°РЅРёС†Р° (" + (e + 1) + "-СЏ)<br>Р’СЃРµРіРѕ " + c.total_pages + " " + strFormatHumanNumber(c.total_pages, ["СЃС‚СЂР°РЅРёС†Р°", "СЃС‚СЂР°РЅРёС†С‹", "СЃС‚СЂР°РЅРёС†"]) + "(" + c.total_items + " " + strFormatHumanNumber(c.total_items, ["РїСЂРµРґР»РѕР¶РµРЅРёРµ", "РїСЂРµРґР»РѕР¶РµРЅРёСЏ", "РїСЂРµРґР»РѕР¶РµРЅРёР№"]) + ")" + c.loadingHTML + "</div>" : c.loadingHTML;
                var s = a(r).appendTo(c.parent_block);
                a.ajax({
                    url: c.ajaxUrl,
                    type: "get",
                    dataType: "json",
                    data: {p: f, offset: g, last_item_cat: a("#last_item_cat").val()},
                    success: function (b) {
                        s.remove(), "function" == typeof c.callback ? c.callback(b, c) : console.error("callback is not function!"), 1 != b.isEnd && (f = b.page, g = b.offset, b.offset < b.totalCount ? (a(c.parent_block).append(k.parent()), a("#last_item_cat").val(b.last_item_cat)) : k.parent().remove(), d = !1), a(document).trigger(window.EVENT_INFISCROLL_COMPLETE), a(document).trigger(window.EVENT_PRODUCTS_LOADED)
                    },
                    error: function () {
                        s.remove(), d = !1
                    },
                    complete: function () {
                        k.show()
                    }
                })
            }
        })
    }, a.fn.infiScroll.defaults = {
        offset: 0,
        page: 1,
        ajaxUrl: "",
        callback: function (b, c) {
            a(b.content).appendTo(c.parent_block), a(document).trigger(window.EVENT_CATALOG_SCROLL)
        },
        scrolling_element: document,
        scroll_html: "html",
        scrolling_last_child: !1,
        scroll_client: window,
        parent_block: "body",
        loadingHTML: '<div class="loading-dots"><span></span><span></span><span></span><span></span></div>',
        show_page_count: !1,
        total_pages: 0,
        total_items: 0,
        btn_show_more: ".catalog-category-more a"
    }, a.fn.infiScroll.scrollToPage = function (a, b, c) {
    }, window.EVENT_INFISCROLL_COMPLETE = "infiscroll:complete"
}(jQuery), $(function () {
    $("html").removeClass("no-js");
    var a = $("[data-toggle=dropdown]"), b = $('[data-role="profile-dropdown"]');
    if (0 !== a.length && a.dropdown(), 0 !== b.length) {
        var c = $('[data-role="profile-dropdown-container"]'), d = c.children("a").width(), e = d / 2 - 15;
        $('<style>[data-role="profile-dropdown"]:before, [data-role="profile-dropdown"]:after{right: ' + e + "px}</style>").appendTo("head")
    }
    $("#menu-catalog").catalog_menu(), initFancyBoxProductCard(), $(window).on(window.EVENT_CONFIGURATOR_PRODUCT_IS_LOADED, initFancyBoxProductCard)
});
var FANCYBOX_PRODUCT_VIDEO_DEFAULT_ID = "fancybox-product-video",
    URL_YOUTUBE_PLAYER_API = "//www.youtube.com/player_api", ytPlayer;
!function () {
    var a = {
        SELECTOR_CAPTCHA_RELOAD: "[data-role=captcha-reload]",
        SELECTOR_COMPARE_BTN: "[data-compare-role]",
        SELECTOR_COMPARE_BTN_GLOBAL: "[data-role=compare-btn-global]",
        SELECTOR_COMPARE_PAGE: "[data-role=compare-page]",
        EVENT_UPDATE_COMPARE: ":update-compare"
    };
    for (var b in a)a.hasOwnProperty(b) && function (b) {
        if (!(Object.defineProperty instanceof Function))return window[b] = a[b];
        Object.defineProperty(window, b, {
            get: function () {
                return a[b]
            }, set: function () {
                console.error("РљРѕРЅСЃС‚Р°РЅС‚Р° " + b + " - РЅРµРёР·РјРµРЅСЏРµРјС‹Р№ РїР°СЂР°РјРµС‚СЂ!")
            }
        })
    }(b)
}(), window.EVENT_PRODUCTS_LOADED = "productsLoaded", $(function () {
    $("input[data-mask]").each(function () {
        $(this).mask($(this).data("mask"))
    });
    $("input[data-phone]").each(function () {
        $(this).maskedphone("+7 (xxx) xxx-xxxx")
    })
}), function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
    var b, c = navigator.userAgent, d = /iphone/i.test(c), e = /chrome/i.test(c), f = /android/i.test(c);
    a.maskedphone = {
        definitions: {x: "[0-9]"},
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, a.fn.extend({
        caret: function (a, b) {
            var c;
            if (0 !== this.length && !this.is(":hidden"))return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
                begin: a,
                end: b
            })
        }, unmaskedphone: function () {
            return this.trigger("unmask")
        }, maskedphone: function (c, g) {
            var h, i, j, k, l, m, n, o;
            if (!c && this.length > 0) {
                h = a(this[0]);
                var p = h.data(a.maskedphone.dataName);
                return p ? p() : void 0
            }
            return g = a.extend({
                autoclear: a.maskedphone.autoclear,
                placeholder: a.maskedphone.placeholder,
                completed: null
            }, g), i = a.maskedphone.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
                "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), a < k && (m = j.length - 1)) : j.push(null)
            }), this.trigger("unmask").each(function () {
                function h() {
                    if (g.completed) {
                        for (var a = l; a <= m; a++)if (j[a] && C[a] === p(a))return;
                        g.completed.call(B)
                    }
                }

                function p(a) {
                    return a < g.placeholder.length ? g.placeholder.charAt(a) : g.placeholder.charAt(0)
                }

                function q(a) {
                    for (; ++a < n && !j[a];);
                    return a
                }

                function r(a) {
                    for (; --a >= 0 && !j[a];);
                    return a
                }

                function s(a, b) {
                    var c, d;
                    if (!(a < 0)) {
                        for (c = a, d = q(b); c < n; c++)if (j[c]) {
                            if (!(d < n && j[c].test(C[d])))break;
                            C[c] = C[d], C[d] = p(d), d = q(d)
                        }
                        z(), B.caret(Math.max(l, a))
                    }
                }

                function t(a) {
                    var b, c, d, e;
                    for (b = a, c = p(a); b < n; b++)if (j[b]) {
                        if (d = q(b), e = C[b], C[b] = c, !(d < n && j[d].test(e)))break;
                        c = e
                    }
                }

                function u(a) {
                    var b = B.val(), c = B.caret();
                    if (o && o.length && o.length > b.length) {
                        for (A(!0); c.begin > 0 && !j[c.begin - 1];)c.begin--;
                        if (0 === c.begin)for (; c.begin < l && !j[c.begin];)c.begin++;
                        B.caret(c.begin, c.begin)
                    } else {
                        for (A(!0); c.begin < n && !j[c.begin];)c.begin++;
                        B.caret(c.begin, c.begin)
                    }
                    h()
                }

                function v(a) {
                    A(), B.val() != E && B.change()
                }

                function w(a) {
                    if (!B.prop("readonly")) {
                        var b, c, e, f = a.which || a.keyCode;
                        o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c == 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
                    }
                }

                function x(b) {
                    if (!B.prop("readonly")) {
                        var c, d, e, g = b.which || b.keyCode, i = B.caret();
                        if (!(b.ctrlKey || b.altKey || b.metaKey || g < 32) && g && 13 !== g) {
                            if (i.end - i.begin != 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), (c = q(i.begin - 1)) < n && (d = String.fromCharCode(g), j[c].test(d))) {
                                if (t(c), C[c] = d, z(), e = q(c), f) {
                                    var k = function () {
                                        a.proxy(a.fn.caret, B, e)()
                                    };
                                    setTimeout(k, 0)
                                } else B.caret(e);
                                i.begin <= m && h()
                            }
                            b.preventDefault()
                        }
                    }
                }

                function y(a, b) {
                    var c;
                    for (c = a; c < b && c < n; c++)j[c] && (C[c] = p(c))
                }

                function z() {
                    B.val(C.join(""))
                }

                function A(a) {
                    var b, c, d, e = B.val(), f = -1;
                    for (b = 0, d = 0; b < n; b++)if (j[b]) {
                        for (C[b] = p(b); d++ < e.length;)if (c = e.charAt(d - 1), j[b].test(c)) {
                            C[b] = c, f = b;
                            break
                        }
                        if (d > e.length) {
                            y(b + 1, n);
                            break
                        }
                    } else C[b] === e.charAt(d) && d++, b < k && (f = b);
                    return a ? z() : f + 1 < k ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
                }

                var B = a(this), C = a.map(c.split(""), function (a, b) {
                    if ("?" != a)return i[a] ? p(b) : a
                }), D = C.join(""), E = B.val();
                B.data(a.maskedphone.dataName, function () {
                    return a.map(C, function (a, b) {
                        return j[b] && a != p(b) ? a : null
                    }).join("")
                }), B.one("unmaskedphone", function () {
                    B.off(".maskedphone").removeData(a.maskedphone.dataName)
                }).on("focus.maskedphone", function () {
                    if (!B.prop("readonly")) {
                        clearTimeout(b);
                        var a;
                        E = B.val(), a = A(), b = setTimeout(function () {
                            B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a))
                        }, 10)
                    }
                }).on("blur.maskedphone", v).on("keydown.maskedphone", w).on("keypress.maskedphone", x).on("input.maskedphone paste.maskedphone", function () {
                    B.prop("readonly") || setTimeout(function () {
                        var a = A(!0);
                        B.caret(a), h()
                    }, 0)
                }), e && f && B.off("input.maskedphone").on("input.maskedphone", u), A()
            })
        }
    })
}), function (a, b) {
    b.EVENT_DO_OPEN_MOBILE_MENU = "menu:mobile:open", b.EVENT_DO_CLOSE_MOBILE_MENU = "menu:mobile:close", b.EVENT_OPENED_MOBILE_MENU = "menu:mobile:opened", b.EVENT_CLOSED_MOBILE_MENU = "menu:mobile:closed", a(function () {
        function c() {
            e.get(0).scrollTop = 0, e.addClass("open"), a(b).trigger(b.EVENT_OPENED_MOBILE_MENU)
        }

        function d() {
            e.removeClass("open"), a(b).trigger(b.EVENT_CLOSED_MOBILE_MENU)
        }

        var e = a("#header-menu");
        a("[data-role=open-mobile-menu]").on("click", c), a("[data-role=close-mobile-menu]").on("click", d), a(b).on(b.EVENT_DO_OPEN_MOBILE_MENU, c).on(b.EVENT_DO_CLOSE_MOBILE_MENU, d), e.on(b.EVENT_OPEN, c).on(b.EVENT_CLOSE, d)
    })
}(jQuery, window), function (a, b) {
    function c(a) {
        var b = a.closest(SELECTOR_PAGE_PRODUCT);
        return {
            imageUrl: b.find(".image-slider .img img").attr("src"),
            title: b.find(".price-item-title").text(),
            code: b.find(".price-item-code > span").text(),
            description: b.find(".price-item-description").text(),
            priceHtml: b.find(".price-block").clone(!0, !0),
            availsHtml: b.find(".order-avail-wrap").clone(!0, !0)
        }
    }

    function d(a) {
        var b = a.closest(m);
        return {
            imageUrl: b.find(".image .image-container img").attr("src"),
            title: b.find(".caption .item-name").text(),
            code: b.data("code"),
            description: b.find(".caption .item-desc").text(),
            priceHtml: b.find(".price:first").clone(!0, !0),
            availsHtml: b.find(".order-avail-wrap").clone(!0, !0)
        }
    }

    function e(a) {
        var b = a.closest(m);
        return {
            imageUrl: b.find(".image img").attr("src"),
            title: b.find(".caption .product-name").text(),
            code: b.find(".item-code:first > span").text(),
            description: b.find(".caption .product-description").text(),
            priceHtml: b.find(".product-controls .product-price").clone(!0, !0),
            availsHtml: b.find(".order-avail-wrap").clone(!0, !0)
        }
    }

    function f(a) {
        var b = a.closest(m);
        return {
            imageUrl: b.find(".image img").attr("src"),
            title: b.find(".caption .item-name").text(),
            code: b.data("code"),
            description: b.find(".caption .product-description").text(),
            priceHtml: b.find(".product-controls .item-price").clone(!0, !0),
            availsHtml: b.find(".order-avail-wrap").clone(!0, !0)
        }
    }

    function g(a) {
        if (a.closest(SELECTOR_PAGE_PRODUCT).length)return c(a);
        if (b(SELECTOR_PAGE_CATEGORY).length) {
            var g = b(SELECTOR_CATEGORY_PRODUCTS);
            if (g.is(SELECTOR_CATEGORY_VIEW_LIST))return d(a);
            if (g.is(SELECTOR_CATEGORY_VIEW_SIMPLE))return e(a);
            if (g.is(SELECTOR_CATEGORY_VIEW_TILE))return f(a)
        }
        return null
    }

    function h(a, b) {
        var c = g(a);
        b.applySingleSets(c)
    }

    function i() {
        var a = b(this);
        if ("add" === a.getState() && a.closest(window.SELECTOR_PRODUCT).is(q) && (p && p.remove(), p = n.clone(), p.find("[data-dismiss]").click(function () {
                p.modal("hide")
            }), h(a, p), a.on(window.EVENT_UPDATE_CART, function () {
                p.appendTo("body").modal("show"), p.on("shown.bs.modal", function () {
                    b(window).trigger(window.EVENT_SHOWN_BOUGHT_MODAL)
                }), a.off(window.EVENT_UPDATE_CART)
            }), 0 !== p.find(j).length)) {
            var c = p.find(j);
            c.hide(), p.find(l).remove(), b.get(o, {guid: a.data("product-guid")}).done(function (a) {
                0 !== a.trim().length && (c.hide(), c.find(k).html(a), c.show(), window.initPopovers(), b(window).trigger(window.EVENT_RELATED_PRODUCTS_IS_LOADED).trigger(window.EVENT_PRODUCTS_LOADED))
            }).fail(function () {
            })
        }
    }

    window.SELECTOR_PAGE_CATEGORY = ".page-products",
        window.SELECTOR_PAGE_PRODUCT = "#product-page";
    var j = ".bought-slider", k = ".slider-block-content", l = ".loading-dots", m = ".product";
    window.SELECTOR_CATEGORY = ".catalog-category", window.SELECTOR_CATEGORY_PRODUCTS = ".products", window.SELECTOR_CATEGORY_VIEW_LIST = ".products-list", window.SELECTOR_CATEGORY_VIEW_SIMPLE = ".products-simple", window.SELECTOR_CATEGORY_VIEW_TILE = ".products-tile", window.SELECTOR_PRODUCT_EL_CATEGODY = "[data-product-param=category]", window.SELECTOR_PRODUCT_EL_CODE = "[data-product-param=code]", window.SELECTOR_PRODUCT_EL_NAME = "[data-product-param=name]", window.SELECTOR_PRODUCT_EL_BRAND = "[data-product-param=brand]", window.SELECTOR_PRODUCT_EL_PRICE = "[data-product-param=price]", window.SELECTOR_PRODUCT = "[data-id=product]", window.EVENT_RELATED_PRODUCTS_IS_LOADED = "loaded:related-products", window.EVENT_SHOWN_BOUGHT_MODAL = "shown:bought-modal";
    var n, o, p, q = "[data-show-bought-modal]";
    b(function () {
        var c = b("[data-id=modal-for-bought]");
        if (0 === c.length)return !1;
        n = c.filter(":first").clone(), o = n.data("action"), c.remove(), b(a).on("click", window.SELECTOR_CART_BUTTON, i)
    })
}(document, jQuery), function (a, b) {
    function c(a, b) {
        var c = a.data(v);
        return void 0 === b && (b = r), void 0 === c ? c = b : q.unused(c, b) && (c = Enum.push(c, b)), a.data(v, c), c
    }

    function d(a, d) {
        return b.get(d).always(function () {
            c(a, s) == u && a.find(i).remove()
        }).then(function (c) {
            a.find(j).html(c), b(window).trigger(window.EVENT_PRODUCTS_LOADED)
        }).fail(function () {
        })
    }

    function e(d, e) {
        return b.get(e).always(function () {
            c(d, t) == u && d.find(i).remove()
        }).then(function (c) {
            d.find(m).html(c), b(a).trigger("slider-init"), d.find(l).show()
        }).fail(function () {
        })
    }

    function f() {
        var a = b(this), f = a.data(), h = f.target.substr(1);
        if (w.indexOf(h) > -1)return !0;
        var i = g.clone();
        i.find(n).text(f.actionTitle), f.actionImageUrl ? i.find(p).attr("src", f.actionImageUrl) : i.find(p).remove(), i.find(o).attr("href", f.actionUrl), i.attr("id", h), c(i, r), d(i, f.actionContentUrl), f.showProductsBlock ? e(i, f.actionParticipantUrl) : i.find(k).remove(), w.push(h), i.appendTo("body"), a.trigger("click")
    }

    var g, h, i = ".loading-dots", j = ".wobbler-modal-content", k = ".action-participant", l = ".participant-block",
        m = ".participant-content", n = ".modal-title", o = ".wobbler-modal-url", p = ".wobbler-modal-image img",
        q = Enum.create(), r = q.default(), s = q.next(), t = q.next(), u = q.sum(), v = "pendingStatus", w = [];
    b(function () {
        var c = b('[data-id="modal-for-wobbler"]');
        g = c.first().clone(), c.remove(), g.find(l).hide(), h = g.find(i), b(a).on("click", ".wobbler-action", f)
    })
}(document, jQuery), function (a, b, c) {
    function d(a, d, f) {
        c != a[0] && b.ajax({url: e, type: "POST", data: {log_guid: a, target_guid: d, target_type: f}})
    }

    var e = "/to-target-log/";
    window.AddToLogActivityTarget = d, window.LogActivityGuids = []
}(document, jQuery), $(document).ready(function () {
    $("[data-products-container] [data-id=product] a").on("click", function () {
        var a = $(this).closest("[data-id=product]"), b = a.find("[data-product-guid]").data("product-guid"),
            c = "product";
        "show-avails-modal" == $(this).data("role") && (c = "avails"), AddToLogActivityTarget(LogActivityGuids, b, c)
    }), $("[data-products-container] [data-action=cart-button]").on("click", function () {
        var a = $(this).data("product-guid");
        AddToLogActivityTarget(LogActivityGuids, a, "order")
    }), $("[data-products-container] [data-action=notify-button]").on("click", function () {
        var a = $(this).data("id");
        AddToLogActivityTarget(LogActivityGuids, a, "notify")
    }), $("[data-products-container] [data-compare-role]").on("click", function () {
        var a = $(this).data("product-guid");
        AddToLogActivityTarget(LogActivityGuids, a, "compare")
    }), $("#search-results #b-search-page-categories a").on("click", function () {
        var a = $(this).data("category-guid");
        AddToLogActivityTarget(LogActivityGuids, a, "category")
    })
}), function (a) {
    a.fn.Prozapass = function (b) {
        var c, d, e, f = {callback: null}, b = a.extend({}, f, b), g = {}, h = this, i = {
            init: function () {
                g[a('META[name="csrf-param"]').attr("content")] = a('META[name="csrf-token"]').attr("content"), c = a(h), d = a("#register-btn", c), e = a("#prozapass-ajax-anim", c), d.on("click", function () {
                    return i.register(), !1
                })
            }, register: function () {
                e.show(), a.ajax({
                    url: d.data("url"),
                    type: "post",
                    data: g,
                    cache: !1,
                    dataType: "json",
                    success: function (c) {
                        e.hide(), 1 == c.result ? a("#prozapass-register-status").html(c.message[0]) : "function" == typeof b.callback ? b.callback(c) : (a("#prozapass-register-status").html("РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°."), a.each(c.message, function (b, c) {
                            a("#prozapass-register-status").append("<p>" + c + "</p>")
                        }))
                    },
                    error: function (a) {
                        alert("РџСЂРѕРёР·РѕС€Р»Р° РЅРµРёР·РІРµСЃС‚РЅР°СЏ РѕС€РёР±РєР°. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ.")
                    }
                })
            }
        };
        i.init()
    }
}(jQuery), function (a, b) {
    b(function () {
        var a = b("#b-search-page-categories");
        0 !== a.length && b('[data-role="show-extra"]', a).click(function () {
            return a.toggleClass("view-extra"), !1
        })
    })
}(document, jQuery), function (a) {
    a.fn.WishfulProduct = function (b) {
        var c, d, e, f, g, h = {callback: null}, b = a.extend({}, h, b), i = this, j = {
            init: function () {
                c = a(i), f = a("#get-form-btn", c), f.on("click", function () {
                    return j.getForm(), !1
                })
            }, initform: function () {
                g = a("#wishful-ajax-anim", c), d = a("#wishfulproduct-form", c), e = a("#submit-form-btn", c), e.on("click", function () {
                    return j.submitForm(), !1
                })
            }, submitForm: function () {
                g.show(), e.attr("disabled", "disabled"), $form = a("form", d), a.ajax({
                    url: e.data("url"),
                    type: "post",
                    data: $form.serialize(),
                    cache: !1,
                    dataType: "json",
                    success: function (h) {
                        e.removeAttr("disabled"), g.hide(), !0 === h.result ? (d.remove(), f.removeAttr("disabled"), "function" == typeof b.callback && b.callback(h)) : (d.remove(), a(".node-block", c).append(h.data.form), j.initform())
                    },
                    error: function (a) {
                        alert("РџСЂРѕРёР·РѕС€Р»Р° РЅРµРёР·РІРµСЃС‚РЅР°СЏ РѕС€РёР±РєР°. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ.")
                    }
                })
            }, getForm: function () {
                f.attr("disabled", "disabled"), a.ajax({
                    url: f.data("action"),
                    type: "get",
                    cache: !1,
                    success: function (b) {
                        a(".node-block", c).append(b), j.initform()
                    },
                    error: function () {
                        alert("РџСЂРѕРёР·РѕС€Р»Р° РЅРµРёР·РІРµСЃС‚РЅР°СЏ РѕС€РёР±РєР°. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ.")
                    }
                })
            }
        };
        j.init()
    }
}(jQuery), function (a, b, c, d) {
    "use strict";
    function e() {
        var a = [];
        for (var c in G)if (G.hasOwnProperty(c)) {
            var d = G[c];
            if (d.prev === d.last)continue;
            a.push({
                productId: c,
                count: d ? d.last : 0,
                productGroupId: d.productGroupId,
                productTypeId: d.productTypeId
            })
        }
        return b.extend([], a, !0)
    }

    c.EVENT_REMOVE_FROM_CART = "cart:remove-item", c.EVENT_UPDATE_CART_ITEM = "cart:update-item", c.EVENT_ITEM_REMOVED_FROM_CART = "cart:item-removed";
    var f = "[data-role=cart-tab]", g = "[data-role=cart-tab-control]", h = "[data-role=cart-tab-control-mobile]",
        i = "[data-role=cart-tab-controls-mobile]", j = "[data-role=restore-last-removed-product]", k = ".btn-plus",
        l = "[data-role=product-remains-block]", m = "[data-id=checkout-group]", n = "[data-id=checkout-group-item]",
        o = ".price-total-amount", p = "[data-role=total-remains-block]", q = "[data-role=one-click-checkout]",
        r = "[name=count]",
        s = "<p><b>РњР°РєСЃРёРјР°Р»СЊРЅРѕ РґРѕСЃС‚СѓРїРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ С‚РѕРІР°СЂР°!</b><br>Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, РґР°РЅРЅС‹Р№ С‚РѕРІР°СЂ РґРѕСЃС‚СѓРїРµРЅ С‚РѕР»СЊРєРѕ РІ РєРѕР»РёС‡РµСЃС‚РІРµ %c %w.</p>",
        t = "<p><b>Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, РґР°РЅРЅС‹Р№ С‚РѕРІР°СЂ РЅРµРґРѕСЃС‚СѓРїРµРЅ!</b></p>", u = "product-type-id",
        v = "max", w = "checkout-group", x = "cart-product-id";
    c.SELECTOR_CART_PRODUCT = "[data-" + x + "]";
    var y, z = 3, A = "[data-of=rsu-product-count]", B = "[data-of=rsu-no-avails]", C = "add", D = "remove", E = 999,
        F = E.toString().length, G = {}, H = {};
    b(function () {
        function I(a) {
            a.totalCount > 0 ? ba.applySets("active", {
                totalCount: number_format(a.totalCount, 0, ".", " "),
                totalPrice: number_format(a.totalPrice, 0, ".", " ")
            }) : ba.setState("default")
        }

        function J(a) {
            var b = a.data(v), c = aa.find(n + "[data-" + x + "=" + a.data(x) + "]"), d = c.find(".warning-block");
            d.html(String.countPostfix(b, ["С€С‚СѓРєР°", "С€С‚СѓРєРё", "С€С‚СѓРє"], t, !1, s)), d.addClass("visible")
        }

        function K(a) {
            aa.find(n + "[data-" + x + "=" + a.data(x) + "]").find(".warning-block").removeClass("visible")
        }

        function L(a) {
            J(a)
        }

        function M(a) {
            K(a)
        }

        function N(a) {
            a ? (ha.prop("disabled", !a), ia.each(function () {
                !a === b(this).data("disabled") && b(this).prop("disabled", !a)
            }), fa.removeAttr("disabled")) : (ga.prop("disabled", !a), fa.attr("disabled", !a))
        }

        function O(a, e) {
            a.find(o).applySingleSets({
                "prev-price-total": 0,
                "price-total": number_format(e.groupPrice, 0, ".", " "),
                "total-bonus": " " + number_format(e.groupBonus, 0, ".", " "),
                "bonus-visible": e.groupBonus > 0
            }), b('[data-products-count-for="' + e.groupType + '"]').each(function () {
                var a = b(this);
                a.data("value", a.data("value") + e.groupProductsCount).text("(" + a.data("value") + ")").toggleClass("hidden", 0 === a.data("value"))
            });
            for (var f in e.products)if (0 === a.find(n + "[data-" + x + "=" + f + "]").length)return c.location.reload();
            a.find(n).each(function () {
                var a = b(this), c = a.data(x);
                if (d !== e.products[c]) {
                    var f = e.products[c];
                    0 === f.count && z !== f.type ? V(a, c, -1 !== b.inArray(c, e.restorableProducts)) : U(a, f)
                } else V(a, c, -1 !== b.inArray(c, e.restorableProducts))
            }), a.find(p).html(e.remainsWidget), P(a, e.oneClickCheckoutWidget), S()
        }

        function P(d, e) {
            d.find("[data-role=one-click-checkout-container]").html(e), Q(), b(a).trigger(c.EVENT_INIT_POPOVERS)
        }

        function Q() {
            b(q).on("click", function () {
                var a = b(this);
                if (!a.attr("disabled")) {
                    b("body").toggleClass("loading", !0);
                    var c = b("#" + a.data("error-modal-id"));
                    a.attr("disabled", "disabled"), b.ajax({
                        type: "POST",
                        url: a.data("url"),
                        dataType: "json",
                        success: function (a) {
                            !1 === a.result ? (b("body").toggleClass("loading", !1), c.modal("show")) : location.pathname = a.data
                        },
                        error: function () {
                            b("body").toggleClass("loading", !1), c.modal("show")
                        }
                    }), c.on("hidden.bs.modal", function () {
                        P(a.closest(m), "")
                    })
                }
            })
        }

        function R(a) {
            a.find(n).filter(":not(.hidden)").each(function () {
                V(b(this), b(this).data(x), !0)
            }), a.addClass("hidden"), P(a, ""), S()
        }

        function S() {
            b(f).each(function () {
                var a = b(this);
                a.find("[data-role=empty-tab-message]").toggleClass("hidden", !T(a))
            })
        }

        function T(a) {
            var b = a.find(m);
            return b.length === b.filter(".hidden").length
        }

        function U(a, d) {
            a.removeClass("hidden"), a.closest(m).removeClass("hidden"), a.attr("data-" + u, d.type), G[a.data(x)] ? (G[a.data(x)].productTypeId = d.type, G[a.data(x)].prev = d.count, G[a.data(x)].last = d.count) : G[a.data(x)] = {
                default: d.count,
                prev: d.count,
                last: d.count,
                productGroupId: a.closest(m).data("checkout-group"),
                productTypeId: d.type
            }, S(), b(c).trigger(c.EVENT_UPDATE_CART_ITEM, [a]), z === d.type && (0 < d.maxCount ? (a.find(B).addClass("hidden"), a.find(A).removeClass("hidden")) : (a.find(A).addClass("hidden"), a.find(B).removeClass("hidden")));
            var e = a.find(k);
            e.data(v, d.maxCount), e.data("disabled", d.maxCount <= d.count), a.applySingleSets({
                "prev-price-total": 0,
                "price-total": number_format(d.price, 0, ".", " "),
                "total-bonus": " " + number_format(d.bonus, 0, ".", " "),
                "bonus-visible": d.bonus > 0
            }), a.find(r).data("count", d.count).val(d.count), a.find(l).html(d.remainsWidget)
        }

        function V(a, d, e) {
            if (a.addClass("hidden"), G.hasOwnProperty(d)) {
                var g = a.closest(f).data("id");
                delete G[d], e && (H[g].push(d), a.closest(f).find(j).removeClass("hidden"))
            }
            b(c).trigger(c.EVENT_ITEM_REMOVED_FROM_CART, [a])
        }

        function W(a) {
            var d = e();
            if (d.length)return N(!1), b.ajax({
                type: "POST",
                url: ca,
                dataType: "json",
                data: {updates: d},
                success: function (b) {
                    X(a, b)
                },
                error: function () {
                    return c.location.reload()
                }
            })
        }

        function X(a, e) {
            var f = a.closest(n);
            if (!0 === e.result) {
                I(e.data), b("[data-products-count-for]").data("value", 0).addClass("hidden");
                for (var g in e.data.groups)if (0 === _.find(m + "[data-" + w + "=" + g + "]").length)return c.location.reload();
                if (b(m).each(function () {
                        var a = b(this), c = a.data(w);
                        d !== e.data.groups && e.data.groups.hasOwnProperty(c) && 0 !== e.data.groups[c].groupProductsCount ? O(a, e.data.groups[c]) : R(a)
                    }), N(!0), d !== e.data.isOverLimit) {
                    var h = f.find(k);
                    (parseInt(f.find(r).val()) || 0) >= h.data(v) && (L(h), setTimeout(function () {
                        M(h)
                    }, 3e3))
                }
            } else alert(e.message)
        }

        function Y(a, b) {
            var c = a.closest(n).data(x), d = +b || +a.val(), e = G[c];
            return e.last === d || (e.prev = e.last, e.last = d, e.last != e.default)
        }

        function Z(a, b) {
            var d = b > 0 ? C : D;
            a.closest(n).trigger(c.EVENT_UPDATE_CART, d)
        }

        function $(e) {
            var k = ja.find("[data-id=" + e + "]");
            b(h, ja).toggleClass("disabled", !1), k.closest(h).toggleClass("disabled", !0), b("[data-role=toggle-button] [data-role=title]", ja).html(k.html());
            var l = b(g + "[data-id=" + e + "]");
            l.siblings().removeClass("active"), l.addClass("active");
            var m = b(f);
            m.removeClass("active");
            var n = m.filter("[data-id=" + e + "]");
            n.addClass("active");
            for (var o in H)H.hasOwnProperty(o) && (H[o] = [], n.find(j).addClass("hidden"));
            m.each(function () {
                var a = b(this), c = a.data("id");
                T(a) && (_.find(g + "[data-id=" + c + "]").remove(), _.find(i + "[data-id=" + c + "]").remove(), a.remove())
            }), d !== c.history && c.history.pushState({}, a.title, "?activeTabId=" + e)
        }

        var _ = b("[data-role=cart-page]"), aa = b(m), ba = b(c.SELECTOR_CART_WIDGET), ca = _.data("url-update"),
            da = _.data("url-restore");
        if (0 !== _.length) {
            b(n, _).each(function () {
                var a = b(this), c = a.data(x), d = +a.find(r).val(), e = a.closest(m).data(w), g = a.data(u);
                G[c] = {
                    default: d,
                    prev: d,
                    last: d,
                    productGroupId: e,
                    productTypeId: g
                }, H[a.closest(f).data("id")] = []
            });
            var ea = [];
            aa.find(n).each(function (a, c) {
                ea.push(b(c).data(x))
            });
            var fa = aa.find("[data-id=remove-from-cart]"), ga = aa.find("[data-quantity]"), ha = aa.find(".btn-minus"),
                ia = aa.find(k);
            b(a).on(c.EVENT_UPDATE_CART, c.SELECTOR_CART_BUTTON, function () {
                "go_to_cart" === b(this).getState() && c.location.reload()
            }), b(k).parent().mouseover(function () {
                !0 === b(this).find(k).data("disabled") && L(b(this).find(k))
            }), b(k).parent().mouseout(function () {
                M(b(this).find(k))
            }), fa.on("click", function () {
                var a = b(this);
                a.attr("disabled") || (Y(a), a.trigger(c.EVENT_REMOVE_FROM_CART), W(a))
            }), ga.on("click", function () {
                var a = b(this), c = parseInt(a.closest(n).find(r).val()) || 0, d = parseInt(a.data("quantity")) || 0;
                Y(a, c + d), c + d <= 0 && Z(a, d);
                var e = W(a);
                e && e.done(Z(a, d))
            }), b(j, _).on("click", function () {
                if (!b(this).attr("disabled")) {
                    var a = b(this).closest(f), d = a.find(j);
                    d.attr("disabled", "disabled");
                    var e = a.data("id");
                    if (H[e].length) {
                        var g = H[e].pop();
                        N(!1);
                        var h = aa.find(n).filter("[data-" + x + '="' + g + '"]').find("[data-id=remove-from-cart]");
                        b.ajax({
                            type: "POST",
                            url: da,
                            dataType: "json",
                            data: {productId: g, tabId: e},
                            success: function (a) {
                                X(h, a)
                            },
                            error: function () {
                                return c.location.reload()
                            }
                        }).then(function () {
                            H[e].length || d.addClass("hidden"), d.removeAttr("disabled")
                        })
                    }
                }
            }), b("[data-role=remove-optional]", _).on("click", function () {
                var a = b(this);
                if (!a.attr("disabled")) {
                    a.attr("disabled", "disabled"), N(!1);
                    var d = a.closest(n).find("[data-id=remove-from-cart]");
                    b.ajax({
                        type: "POST", url: a.data("url"), dataType: "json", success: function (a) {
                            if (!0 !== a.result)return c.location.reload();
                            X(d, a)
                        }, error: function () {
                            return c.location.reload()
                        }
                    }).then(function () {
                        a.closest("[data-role=optional-product]").remove()
                    })
                }
            }), aa.find(r).on("keydown", function (a) {
                var c = b(this), d = a.keyCode, e = c.val(), f = +e, g = d >= 96 && d <= 105,
                    h = d >= 48 && d <= 57 || g, i = g ? d - 96 : d - 48, j = a.ctrlKey || a.shiftKey, k = null;
                if (h && (k = 10 * f + i, this.selectionStart != this.selectionEnd)) {
                    k = +(e.substr(0, Math.min(this.selectionStart, this.selectionEnd)) + i + e.substr(Math.max(this.selectionStart, this.selectionEnd)))
                }
                if (!(h && !isNaN(k) && k.toString().length <= F && k <= E || /\W/.test(String.fromCharCode(d)) || j))return a.preventDefault(), !1;
                c.data("prev-val", e)
            }).on("keyup blur", function (a) {
                var d = b(this), e = d.val(), g = d.data("prev-val"), h = e ? +e : null, i = null;
                if (isNaN(h) && (i = g), (h < 0 || h > E || e.length > F) && (h = h < 0 ? 1 : E), i && (d.val(i), e = i, h = +e), 0 == h || 13 == a.keyCode) {
                    clearTimeout(y), Y(d, h);
                    var j = W(d);
                    return void(j && j.done(function () {
                        b(c).trigger(EVENT_REMOVE_FROM_CART)
                    }))
                }
                var k = 0 == h && (46 == a.keyCode || 8 == a.keyCode);
                if (!(isNaN(h) || !e.length || k || e == g && null === i)) {
                    if (!1 === Y(d))return !1;
                    var l = [];
                    for (var m in G)G.hasOwnProperty(m) && G[m].default != G[m].last && l.push({
                        productId: m,
                        type: G[m].last > G[m].default ? C : D
                    });
                    clearTimeout(y), y = setTimeout(function () {
                        clearTimeout(y);
                        var a = W(d);
                        a && a.done(function () {
                            for (var a = 0, b = l.length; a < b; ++a) {
                                var d = l[a];
                                aa.find(n + "[data-" + x + '="' + d.productId + '"]').trigger(c.EVENT_UPDATE_CART, aa.closest(f).data("id"))
                            }
                        })
                    }, 1e3)
                }
            });
            var ja = b(i + " [data-role=dropdown-list]", _);
            b(g, _).on("click", function () {
                if (!b(this).is(".active"))return $(b(this).data("id")), !1
            }), b(h, ja).on("click", function () {
                if (!b(this).is(".disabled"))return b("[data-role=toggle-button]", ja).dropdown("toggle"), $(b(this).data("id")), !1
            }), Q()
        }
    })
}(document, jQuery, window), $(document).ready(function () {
    var a = $("#newsSlider"), b = {phone: 0, tablet: 0, desktop: 3, wideDesktop: 4},
        c = (screen.getCurrentScreen(), $(".slider", a).owlCarousel({
            items: b.wideDesktop,
            itemsMobile: [screen.getScreen("phone") - 1, b.phone],
            itemsTablet: [screen.getScreen("tablet") - 1, b.phone],
            itemsDesktopSmall: [screen.getScreen("desktop") - 1, b.tablet],
            itemsDesktop: [screen.getScreen("wide-desktop") - 1, b.desktop],
            pagination: !1
        })), d = c.data("owlCarousel");
    $(".button-right", a).click(function () {
        return d.next(), !1
    }), $(".button-left", a).click(function () {
        return d.prev(), !1
    })
}), function (a) {
    a.fn.actionProductsPage = function () {
        function b() {
            return V[0]
        }

        function c(b) {
            S = a.extend(S, b);
            var c = a(this);
            V.push(c), a("input, select", c).change(function () {
                var b = a(this).closest("form");
                (b.data(L) === M && U.hasClass("shown") || b.data(L) === N) && d(!1, function (a) {
                    !0 === a && h()
                })
            }), a(I).on("click", function () {
                var b = a(this);
                b.prop("disabled") || (b.siblings().prop("disabled", !1), b.prop("disabled", !0), T.mode = b.data("value"), d(!1, function (a) {
                    !0 === a && h()
                }))
            }), O = S.lastProductIndex
        }

        function d(c, d) {
            void 0 === c && (c = !1), !1 === c && (T.offset = 0);
            var g = b(), h = g.serializeArray();
            for (optionKey in T) {
                var i = T[optionKey];
                if (null !== i)switch (typeof i) {
                    case"object":
                        i.forEach(function (a, b) {
                            h.push({name: optionKey + "[" + b + "]", value: a})
                        });
                        break;
                    default:
                        h.push({name: optionKey, value: i})
                }
            }
            void 0 !== P && P.abort(), !1 === c && e(!0);
            var j = [], k = [];
            h.forEach(function (a) {
                "" !== a.value && (j[a.name] = a.value, k.push(a.name + "=" + a.value))
            }), a(z).html(K), window.history.replaceState(j, window.document.title, window.location.pathname + "?" + k.join("&")), P = a.ajax({
                url: S.updateUrl,
                data: h,
                type: "get",
                contentType: "application/json",
                success: function (b) {
                    if (!1 === b.result)return alert("РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РґР°РЅРЅС‹С…. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ."), void(void 0 !== d && d(!1));
                    !0 === c ? a(p).append(b.html) : a(p).html(b.html), a(y).text(String.countPostfix(b.filteredProductsCount, ["С‚РѕРІР°СЂ", "С‚РѕРІР°СЂР°", "С‚РѕРІР°СЂРѕРІ"], "РЅРµС‚ С‚РѕРІР°СЂРѕРІ", !1)), a(z).text("РџРѕРєР°Р·Р°С‚СЊ (" + b.filteredProductsCount + ")"), a(document).trigger(window.EVENT_PRODUCTS_LOADED), a.each(V, function (a, c) {
                        f(c, b.filtersOptions)
                    }), Q.toggleClass("hidden", !1 === b.isNextLoadAvailable), !0 === b.isNextLoadAvailable ? !0 === b.isNextLoadFinal ? a(v, Q).text("РџРѕРєР°Р·Р°С‚СЊ РІСЃРµ") : a(v, Q).text("РџРѕРєР°Р·Р°С‚СЊ РµС‰С‘") : Q.toggleClass("hidden", !0), void 0 !== d && d(!0), O = b.lastProductIndex
                },
                error: function (b) {
                    void 0 !== d && d(!1), 0 !== b.status && alert("РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РґР°РЅРЅС‹С…. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ."), a(z).text("РџРѕРєР°Р·Р°С‚СЊ")
                },
                complete: function () {
                    P = void 0, e(!1)
                }
            })
        }

        function e(b) {
            !0 === b ? (a(p).find(s).length > 0 && a(p).find(s).remove(), a(p).toggleClass(r, !0).prepend(J)) : a(p).toggleClass(r, !1).find("." + s).remove()
        }

        function f(b, c) {
            c.forEach(function (c) {
                switch (c.controlType) {
                    case m:
                        var d = a("input[data-id=" + c.valueId + "]", b);
                        if (0 === d.length)return;
                        d.toggleClass("disabled", !1 === c.isAvailable);
                        break;
                    case n:
                        var e = a("[data-filter-id=" + c.filterId + "]");
                        c.minValue > e.slider("option", "min") && e.slider("values", 0, e.slider("option", "min")), c.maxValue < e.slider("option", "max") && e.slider("values", 1, e.slider("option", "max")), e.slider("option", "min", c.minValue), e.slider("option", "max", c.maxValue), e.slider("refresh")
                }
            }), a.each(a(w + "[data-" + x + "=1]"), function (b, c) {
                var d = a(c), e = a("li", d);
                e.sort(function (b, c) {
                    var d = a(b), e = a(c), f = a(b).find("input[type=checkbox]"),
                        g = a(c).find("input[type=checkbox]"), h = d.find("label").text(), i = e.find("label").text();
                    return (g.prop("checked") ? 10 : 0) - (f.prop("checked") ? 10 : 0) + (g.hasClass("disabled") ? 0 : 10) - (f.hasClass("disabled") ? 0 : 10) + (h > i ? 1 : -1)
                }), e.detach().appendTo(d), d.scrollTo(0)
            })
        }

        function g() {
            a.each(a(q + " [data-role=dropdown-list]"), function (b, c) {
                var e = a(c), f = e.data("option-name"), g = a("[data-role=toggle-button]", e);
                1 === e.data("is-multiselect") ? (a("label", e).click(function () {
                    var b = a("#" + a(this).prop("for"));
                    return b.prop("checked") ? b.prop("checked", !1) : b.prop("checked", "checked"), b.change(), !1
                }), a("input[type=checkbox]", e).change(function () {
                    var b = a("[data-role=title]", g), c = a("input[type=checkbox]:checked", e);
                    if (0 === c.length) b.text("Р’СЃРµ"); else if (1 === c.length) {
                        var h = a("label[for=" + c.eq(0).prop("id") + "]").text();
                        b.text(h)
                    } else b.text("Р’С‹Р±СЂР°РЅРѕ: " + c.length);
                    return T[f] = [], a.each(c, function (b, c) {
                        T[f].push(a(c).data("id"))
                    }), d(), !1
                })) : a("[data-role=list-button]", e).click(function () {
                    return g.dropdown("toggle"), a("[data-role=list-item]", e).toggleClass("disabled", !1), a(this).closest("[data-role=list-item]").toggleClass("disabled", !0), a("[data-role=title]", g).text(a(this).text()), T[f] = a(this).data("value"), d(), !1
                })
            })
        }

        function h() {
            a.each(a(A, b()), function (b, c) {
                var d = a(c), e = d.data("id"), f = a(D, d).text().trim();
                switch (d.data(B)) {
                    case m:
                        var g = [];
                        a.each(a("input[type=checkbox]:checked", d), function (b, c) {
                            g.push(a(c).siblings("label").text())
                        }), i(e, f, g);
                        break;
                    case n:
                        var h = a("input[data-name=min]", d).val(), j = a("input[data-name=max]", d).val(),
                            k = d.data(C);
                        if ("" === h && "" === j) {
                            i(e, f, void 0, null, null);
                            break
                        }
                        "" === h && (h = a(o, d).data("min")), "" === j && (j = a(o, d).data("max")), i(e, f, void 0, h + " " + k, j + " " + k)
                }
            })
        }

        function i(b, c, d, e, f) {
            var g = R.siblings(F + "[data-" + G + "=1]");
            if (void 0 !== e && void 0 !== f || d.length > 0) {
                var h = null;
                if (void 0 !== d ? h = 1 === d.length ? d[0] : d.length + " С„РёР»СЊС‚." : null !== e && null !== f && (h = "РѕС‚ " + e + " РґРѕ " + f), a(F + "[data-" + H + "=" + b + "]", R).remove(), a(".active-filter[data-" + H + "=" + b + "]", R).remove(), null !== h) {
                    var i = g.clone().toggleClass("hidden", !1).attr("data-" + G, 0).attr("data-" + H, b);
                    a("[data-role=title]", i).text(c + ": " + h), R.append(i).find("[data-" + H + "=" + b + "]").click(j)
                }
            } else a("[data-" + H + "=" + b + "]", R).remove();
            if (a(".active-filter", R).length > 0 && 0 === a(".active-filter[data-is-total=1]", R).length) {
                var k = g.clone().toggleClass("hidden", !1).attr("data-" + G, 0).attr("data-is-total", 1);
                a("[data-role=title]", k).html("<strong>РћС‡РёСЃС‚РёС‚СЊ РІСЃРµ С„РёР»СЊС‚СЂС‹</strong>"), R.prepend(k).find("[data-is-total=1]").click(j)
            } else 0 === a(".active-filter[data-is-total=0]", R).length && a(".active-filter[data-is-total=1]", R).length > 0 && a(".active-filter[data-is-total=1]", R).remove();
            R.toggleClass("catalog-filter-list", 0 !== a(".active-filter", R).length)
        }

        function j() {
            var b = a(this), c = 1 === b.data("is-total"), e = b.data(H);
            return !0 === c ? k() : l(e), d(), h(), !1
        }

        function k() {
            a.each(a(A, b()), function (b, c) {
                l(a(c).data("id"))
            })
        }

        function l(b) {
            a.each(a(A + "[data-id=" + b + "]"), function (b, c) {
                var d = a(c);
                switch (d.data(B)) {
                    case m:
                        a("input[type=checkbox]:checked", d).prop("checked", !1).trigger("change");
                        break;
                    case n:
                        var e = a(o, d), f = e.slider("option", "min"), g = e.slider("option", "max");
                        a(o, d).slider("option", "values", [f, g]), a("input[data-name=min]", d).val(""), a("input[data-name=max]", d).val("").trigger("change")
                }
            })
        }

        var m = 3, n = 4, o = "[data-role=slider]", p = "[data-role=products-container]",
            q = "[data-role=view-options-panel]", r = "loading-overlay", s = "loading-dots",
            t = "[data-role=next-load-block]", u = "[data-role=next-load-block-button]", v = "[data-role=button-title]",
            w = "[data-role=checkbox-list]", x = "is-sortable", y = "[data-role=filtered-products-count]",
            z = "[data-role=btn-mobile-close-filters]", A = "[data-role=filter-block]", B = "control-type",
            C = "unit-name", D = "[data-role=filter-title]", E = "[data-role=selected-filters-panel]",
            F = "[data-role=active-filter-item]", G = "is-template", H = "selected-filter-id",
            I = "[data-role=view-mode-switch] button",
            J = '<div class="loading-dots"><span /><span /><span /><span /></div>',
            K = '<div class="loading-dots"><span /><span /><span /></div>', L = "type", M = "mobile", N = "desktop";
        window.EVENT_CLOSE_MOBILE_FILTERS_MENU = "filters-menu:mobile:close";
        var O, P, Q, R, S = {updateUrl: null, lastProductIndex: void 0},
            T = {sort: null, groupBy: null, stock: null, shops: [], offset: 0, mode: null},
            U = a("#menu-filters-aside"), V = (a("#desktop-characteristic-filters"), []), W = arguments;
        a.each(a(this), function (a, b) {
            c.apply(b, W)
        }), function () {
            g(), Q = a(t), R = a(E), a(u, Q).click(function () {
                return T.offset = O, Q.toggleClass("hidden", !0).siblings(".loading-dots").remove(), Q.after(J), d(!0, function (a) {
                    !1 !== a && Q.siblings(".loading-dots").remove()
                }), !1
            }), a(z).click(function () {
                a(window).trigger(EVENT_CLOSE_MOBILE_FILTERS_MENU)
            }), h()
        }()
    }
}(jQuery), function (a) {
    a(document).ready(function () {
        a("#action-marketing-code-filter").on("keyup", function () {
            var b = a(this).val().toUpperCase().trim(), c = a(".actions-list .action");
            c.removeClass("hidden"), c.filter(function () {
                return -1 == a(this).data("code").toUpperCase().indexOf(b)
            }).addClass("hidden")
        })
    })
}(jQuery), function (a, b) {
    b(function () {
        function a() {
            var a = c.find(".actions-list"), f = a.find(".action");
            f.removeClass("hidden"), a.find(".alert").remove();
            var g = d.val(), h = e.find("[type=checkbox]:checked"), i = [];
            0 === h.filter("[data-value=0]").length && h.each(function () {
                i.push(b(this).data("value"))
            }), f.each(function () {
                var a = b(this);
                if (0 != g && g != a.data("type"))return void a.addClass("hidden");
                0 == i.length || b.arrayIntersect(a.data("categories"), i).length || a.addClass("hidden")
            }), 0 === f.filter(":not(.hidden)").length && a.append('<div class="alert alert-info">Р’ РІС‹Р±СЂР°РЅРЅРѕРј С‚РёРїРµ Р°РєС†РёР№ РЅРµС‚ РїРѕРґС…РѕРґСЏС‰РёС… С‚РѕРІР°СЂРѕРІ. Р’С‹Р±РµСЂРёС‚Рµ РґСЂСѓРіСѓСЋ РєР°С‚РµРіРѕСЂРёСЋ.</div>')
        }

        var c = b("#actions-page");
        if (0 !== c.length) {
            var d = c.find("#action-type"), e = c.find(".action-filter");
            c.on("click", ".show-categories-filter", function () {
                e.addClass("shown")
            }), c.on("click", ".hide-categories-filter", function () {
                e.removeClass("shown")
            }), c.find(".actions-types span").on("click", function () {
                var e = b(this);
                e.siblings().removeClass("active"), e.toggleClass("active"), e.hasClass("active") ? d.val(e.data("id")) : (c.find(".actions-types span[data-id=0]").addClass("active"), d.val(0)), a()
            }), d.on("change", function () {
                c.find(".actions-types span[data-id=" + b(this).val() + "]").addClass("active").siblings().removeClass("active"), a()
            }), e.on("change", "[type=checkbox]", function () {
                var c = b(this), d = e.find("[type=checkbox][data-value=0]"),
                    f = e.find("[type=checkbox]:not([data-value=0])");
                c.data("value") == d.data("value") ? f.prop("checked", !c.prop("checked")) : f.length === f.filter(":checked").length || 0 === f.filter(":checked").length ? (d.prop("checked", !0), f.prop("checked", !1)) : d.prop("checked", !1), a()
            }), e.find(".clear-filter").on("click", function () {
                e.find("[type=checkbox][data-value=0]").prop("checked", !0).trigger("change")
            }), e.find(".apply-filter").on("click", function () {
                e.removeClass("shown")
            }), e.find(".show-more").on("click", function () {
                b(this).closest(".group").toggleClass("expanded")
            })
        }
    })
}(document, jQuery), function (a) {
    a(document).ready(function () {
        function b() {
            var a = c.outerHeight(),
                b = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                e = b / 2 - a / 2 + window.screenTop;
            e < 0 && (e = 0), d.css("padding-top", e + "px")
        }

        var c = a("#actions-slider"), d = a(".actions-on-tv");
        c.owlCarousel({
            autoPlay: 1e4,
            navigation: !1,
            pagination: !1,
            slideSpeed: 1e3,
            singleItem: !0
        }), a("img", c).on("load", function () {
            b()
        }), a(window).resize(b)
    })
}(jQuery), function (a, b) {
    b(function () {
        var c = a.getElementById("category-description");
        if (c) {
            var d = c.children[1],
                e = {"#category-description > input[type=checkbox]:checked + div": {maxHeight: d.scrollHeight}};
            window.cssHelper.createStyle(e)
        }
        b("[data-role=category-group-switch]").on("click", function () {
            var a = b(this);
            if (a.data("disabled"))return !1;
            setUrlParameter("groupBy", a.data("id"))
        })
    })
}(document, jQuery), function (a, b) {
    b(function () {
        var a = b("#f-check-invoice-payment");
        0 !== a.length && a.on("submit", function () {
            return a.find('INPUT[type="text"]').val().trim().length < 10 ? (alert("РќРѕРјРµСЂ СЃС‡С‘С‚Р° РІРІРµРґС‘РЅ РЅРµРїСЂР°РІРёР»СЊРЅРѕ."), !1) : "ajax" === a.data("method") ? (b.post(a.attr("action"), a.serialize(), function (a) {
                b("#b-check-invoice-payment-result").html(a)
            }), !1) : void 0
        })
    })
}(document, jQuery), function (a, b, c) {
    function d(a) {
        f.filter("[data-state=remove]").each(function () {
            var c = b(this), d = c.data("product-group-guid"), e = a[d].indexOf(c.data("product-guid"));
            -1 == e ? c.setState("add") : a[d].splice(e, 1)
        });
        for (var c in a)if (a.hasOwnProperty(c) && a[c].length > 0)for (var d = 0, e = a[c].length; d < e; ++d)f.filter("[data-product-guid=" + a[c][d] + "]").setState("remove")
    }

    function e(a, c) {
        var e = {};
        e[b('META[name="csrf-param"]').attr("content")] = b('META[name="csrf-token"]').attr("content"), b.ajax({
            url: a,
            type: "POST",
            data: e,
            dataType: "JSON",
            success: function (a) {
                !0 === a.result && (c instanceof Function && c(a.data), g.applySets(a.data.count > 0 ? "active" : "default", {totalCount: a.data.count}), d(a.data.groups), b(window).trigger(window.EVENT_UPDATE_COMPARE))
            },
            error: function (a) {
                alert(a.responseText)
            }
        })
    }

    window.EVENT_OWL_CAROUSEL_MOVE_TO_PREV = "owl.prev", window.EVENT_OWL_CAROUSEL_MOVE_TO_NEXT = "owl.next", window.EVENT_OWL_CAROUSEL_GO_TO = "owl.goTo", window.EVENT_OWL_CAROUSEL_JUMP_TO = "owl.jumpTo", window.EVENT_OWL_CAROUSEL_STOP = "owl.stop";
    var f, g;
    b(a.body).ready(function () {
        f = b(window.SELECTOR_COMPARE_BTN), g = b(window.SELECTOR_COMPARE_BTN_GLOBAL), 0 != g.length && (g.initSets(!1), b(a.body).on("click", window.SELECTOR_COMPARE_BTN, function () {
            var a = b(this);
            return e(a.data("compare-url"), function (b) {
                a.setNextState(), a.trigger(window.EVENT_UPDATE_COMPARE, b)
            }), !1
        }), b(window).on(window.EVENT_PRODUCTS_LOADED, function () {
            var a = b(window.SELECTOR_COMPARE_BTN), c = a.not(f);
            c.length && (c.initSets(), f = a)
        }))
    }), b(function () {
        function c(a, c) {
            c || (c = a.currentItem), b(".compare-table .table-row .table-value.current").removeClass("current"), a.$owlItems.filter(".current").removeClass("current"), b(a.$owlItems.get(c)).addClass("current"), b(".compare-table .table-row").find(".table-value:not(.title-col):nth(" + c + ")").addClass("current")
        }

        function d(a) {
            a.owlItems.length > a.visibleItems.length ? i.removeClass("hide-arrow-buttons") : i.addClass("hide-arrow-buttons");
            var b = l.data("owlCarousel");
            b.reinit(), b.jumpTo(a.currentItem)
        }

        function f() {
            h.find(".compare-table .table-title").on("click", function () {
                return b(this).closest(".compare-table").toggleClass("expanded"), !1
            })
        }

        function g() {
            var a = h.find(".products-tile .product").length, b = h.find(".add-more-message-template"),
                c = h.find(".products-tile"), d = c.find(".add-more-message");
            if (a > 1)return void(0 !== d.length && d.remove());
            0 === d.length && (d = b.clone().addClass("add-more-message"), c.append(d)), d.fadeIn()
        }

        var h = b(window.SELECTOR_COMPARE_PAGE);
        if (h.length) {
            h.find('[data-role="remove"]').on("click", function () {
                var a = b(this);
                return e(a.attr("data-url"), function (b) {
                    a.trigger(window.EVENT_UPDATE_COMPARE, b)
                }), !1
            }).on(window.EVENT_UPDATE_COMPARE, function (a, c) {
                if (c.hasOwnProperty("redirect"))return void location.replace(c.redirect);
                if (0 == c.countProducts.length) location.reload(); else {
                    var d = b(this);
                    b(".compare-tables").html(c.characteristics), l.data("owlCarousel").removeItem(d.parents(".owl-item").index()), l.data("owlCarousel").reload(), h.applySingleSets({count: "(" + c.countProducts + ")"}), f(), g()
                }
            });
            var i = h.find(".products-tile"), j = h.find(".products-tile > div"), k = function () {
                var a = this.owl;
                b.each(h.find(".compare-tables .table-row"), function (c, d) {
                    b(".table-value:not(:first)", b(this)).addClass("hidden").slice(a.visibleItems[0], a.visibleItems[a.visibleItems.length - 1] + 1).removeClass("hidden");
                    var e = a.visibleItems.length < a.owlItems.length ? a.visibleItems.length : a.owlItems.length;
                    h.find(".showing-status").text("РџРѕРєР°Р·Р°РЅРѕ " + e + " " + strFormatHumanNumber(e, ["С‚РѕРІР°СЂ", "С‚РѕРІР°СЂР°", "С‚РѕРІР°СЂРѕРІ"]) + " РёР· " + a.owlItems.length)
                }), c(this, 0)
            }, l = j.owlCarousel({
                items: 4,
                itemsDesktop: [window.SCREEN_DESKTOP_MAX_WIDTH, 3],
                itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, 3],
                itemsMobile: [window.SCREEN_MOBILE_MAX_WIDTH, 2],
                pagination: !1,
                rewindNav: !0,
                autoHeight: !0,
                beforeInit: function () {
                    this.disabledEvents = function () {
                    }
                },
                afterAction: k,
                afterMove: function () {
                    c(this)
                },
                afterUpdate: function () {
                    c(this), d(this.owl)
                }
            });
            l.data("owlCarousel").reload(), b(".button-left .arrow", i).click(function () {
                return j.trigger(window.EVENT_OWL_CAROUSEL_MOVE_TO_PREV), b(window).trigger(window.EVENT_OWL_CAROUSEL_MOVE_TO_PREV), !1
            }), b(".button-right .arrow", i).click(function () {
                return j.trigger(window.EVENT_OWL_CAROUSEL_MOVE_TO_NEXT), b(window).trigger(window.EVENT_OWL_CAROUSEL_MOVE_TO_NEXT), !1
            }), f(), g();
            var m = !1, n = i.closest(".compare-block-floating"), o = b("#header-search");
            b(window).scroll(function () {
                m && b("section").offset().top - (b(this).scrollTop() + o.height() + n.height()) > 0 ? (n.removeClass("fixed").removeClass("slide-down"), o.removeClass("header-compare"), l.data("owlCarousel").reload(), m = !1, b("section").css("margin-top", 0), b(".product", n).each(function () {
                    b(this).removeClass("show-popover").popover("destroy")
                })) : !m && b(this).scrollTop() + o.height() > i.offset().top + n.height() - 50 && (o.addClass("header-compare"), n.addClass("fixed"), l.data("owlCarousel").reload(), m = !0, b("section").css("margin-top", n.height()), b(".pop-abs", n).remove(), b(".product", n).each(function () {
                        var a = b(this), c = "pop-abs-" + b('[data-id="cart-button"]', a).attr("id");
                        n.append('<div id="' + c + '" class="pop-abs"></div>'), a.addClass("show-popover"),
                            a.attr("data-html", !0), a.attr("data-toggle", "popover"), a.attr("data-placement", "bottom"), a.attr("data-trigger", "hover"), a.attr("data-content", b(".image", a).html()), a.attr("data-container", "#" + c)
                    }), n.addClass("slide-down"), b(a).trigger(window.EVENT_INIT_POPOVERS))
            }).trigger("scroll");
            var p = h.find(".compare-characteristic-type-toggle [data-show-all]");
            p.on("click", function (a) {
                var c = b(this);
                p.removeClass("active"), c.addClass("active");
                var d = h.find(".compare-table");
                c.data("show-all") ? d.each(function () {
                    var a = b(this);
                    a.removeClass("hidden"), a.find(".table-row").removeClass("hidden")
                }) : d.each(function () {
                    var a = b(this), c = a.find(".table-row:not(.different)");
                    0 !== c.length && (c.addClass("hidden"), c.length === a.find(".table-row").length && a.addClass("hidden"))
                })
            }), h.find(".block-heading .dropdown-menu a").on("click", function (a) {
                var c = b(this), d = c.parents(".dropdown").eq(0).find("button"), e = d.find(".arrow");
                d.html(c.html()).prepend(e)
            });
            var q = h.data("remove-from-compare-urls");
            q && h.find("[data-id=product][data-code]").each(function () {
                var a = b(this), c = a.data("code");
                q.hasOwnProperty(c) && a.find(".product-controls").append(b("<a />", {
                    "data-url": q[c],
                    class: "btn btn-default btn-compare-delete"
                }).html("<span />РЈРґР°Р»РёС‚СЊ"))
            })
        }
    })
}(document, jQuery), function (a, b, c) {
    var d = "#b-feedback-upload-images";
    b(function () {
        d = b(d), 0 !== d.length && d.find('[data-action="remove"]').click(function () {
            var a = b(this).closest("[data-image-index]");
            a.find(".image-preview IMG").removeAttr("src"), a.find("INPUT[data-ajax-image-id]").val("")
        })
    })
}(document, jQuery), function (a) {
    a.fn.markdownCatalogPage = function () {
        function b() {
            return U[0]
        }

        function c(b) {
            R = a.extend(R, b);
            var c = a(this);
            U.push(c), a("input, select", c).change(function () {
                var b = a(this).closest("form");
                (b.data(K) === L && T.hasClass("shown") || b.data(K) === M) && d(!1, function (a) {
                    !0 === a && h()
                })
            }), N = R.lastProductIndex
        }

        function d(c, d) {
            void 0 === c && (c = !1), !1 === c && (S.offset = 0);
            var g = b(), h = g.serializeArray();
            for (optionKey in S) {
                var i = S[optionKey];
                if (null !== i)switch (typeof i) {
                    case"object":
                        i.forEach(function (a, b) {
                            h.push({name: optionKey + "[" + b + "]", value: a})
                        });
                        break;
                    default:
                        h.push({name: optionKey, value: i})
                }
            }
            void 0 !== O && O.abort(), !1 === c && e(!0);
            var j = [], k = [];
            h.forEach(function (a) {
                "" !== a.value && (j[a.name] = a.value, k.push(a.name + "=" + a.value))
            }), a(z).html(J), window.history.replaceState(j, window.document.title, window.location.pathname + "?" + k.join("&")), O = a.ajax({
                url: R.updateUrl,
                data: h,
                type: "get",
                contentType: "application/json",
                success: function (b) {
                    if (!1 === b.result)return alert("РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РґР°РЅРЅС‹С…. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ."), void(void 0 !== d && d(!1));
                    !0 === c ? a(p).append(b.html) : a(p).html(b.html), a(y).text(String.countPostfix(b.filteredProductsCount, ["С‚РѕРІР°СЂ", "С‚РѕРІР°СЂР°", "С‚РѕРІР°СЂРѕРІ"], "РЅРµС‚ С‚РѕРІР°СЂРѕРІ", !1)), a(z).text("РџРѕРєР°Р·Р°С‚СЊ (" + b.filteredProductsCount + ")"), a(document).trigger(window.EVENT_PRODUCTS_LOADED), a.each(U, function (a, c) {
                        f(c, b.filtersOptions)
                    }), P.toggleClass("hidden", !1 === b.isNextLoadAvailable), !0 === b.isNextLoadAvailable ? !0 === b.isNextLoadFinal ? a(v, P).text("РџРѕРєР°Р·Р°С‚СЊ РІСЃРµ") : a(v, P).text("РџРѕРєР°Р·Р°С‚СЊ РµС‰С‘") : P.toggleClass("hidden", !0), void 0 !== d && d(!0), N = b.lastProductIndex
                },
                error: function (b) {
                    void 0 !== d && d(!1), 0 !== b.status && alert("РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РґР°РЅРЅС‹С…. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ."), a(z).text("РџРѕРєР°Р·Р°С‚СЊ")
                },
                complete: function () {
                    O = void 0, e(!1)
                }
            })
        }

        function e(b) {
            !0 === b ? (a(p).find(s).length > 0 && a(p).find(s).remove(), a(p).toggleClass(r, !0).append(I)) : a(p).toggleClass(r, !1).find("." + s).remove()
        }

        function f(b, c) {
            c.forEach(function (c) {
                switch (c.controlType) {
                    case m:
                        var d = a("input[data-id=" + c.valueId + "]", b);
                        if (0 === d.length)return;
                        d.toggleClass("disabled", !1 === c.isAvailable);
                        break;
                    case n:
                        var e = a("[data-filter-id=" + c.filterId + "]");
                        c.minValue > e.slider("option", "min") && e.slider("values", 0, e.slider("option", "min")), c.maxValue < e.slider("option", "max") && e.slider("values", 1, e.slider("option", "max")), e.slider("option", "min", c.minValue), e.slider("option", "max", c.maxValue), e.slider("refresh")
                }
            }), a.each(a(w + "[data-" + x + "=1]"), function (b, c) {
                var d = a(c), e = a("li", d);
                e.sort(function (b, c) {
                    var d = a(b), e = a(c), f = a(b).find("input[type=checkbox]"),
                        g = a(c).find("input[type=checkbox]"), h = d.find("label").text(), i = e.find("label").text();
                    return (g.prop("checked") ? 10 : 0) - (f.prop("checked") ? 10 : 0) + (g.hasClass("disabled") ? 0 : 10) - (f.hasClass("disabled") ? 0 : 10) + (h > i ? 1 : -1)
                }), e.detach().appendTo(d), d.scrollTo(0)
            })
        }

        function g() {
            a.each(a(q + " [data-role=dropdown-list]"), function (b, c) {
                var e = a(c), f = e.data("option-name"), g = a("[data-role=toggle-button]", e);
                1 === e.data("is-multiselect") ? (a("label", e).click(function () {
                    var b = a("#" + a(this).prop("for"));
                    return b.prop("checked") ? b.prop("checked", !1) : b.prop("checked", "checked"), b.change(), !1
                }), a("input[type=checkbox]", e).change(function () {
                    var b = a("[data-role=title]", g), c = a("input[type=checkbox]:checked", e);
                    if (0 === c.length) b.text("Р’СЃРµ"); else if (1 === c.length) {
                        var h = a("label[for=" + c.eq(0).prop("id") + "]").text();
                        b.text(h)
                    } else b.text("Р’С‹Р±СЂР°РЅРѕ: " + c.length);
                    return S[f] = [], a.each(c, function (b, c) {
                        S[f].push(a(c).data("id"))
                    }), d(), !1
                })) : a("[data-role=list-button]", e).click(function () {
                    return g.dropdown("toggle"), a("[data-role=list-item]", e).toggleClass("disabled", !1), a(this).closest("[data-role=list-item]").toggleClass("disabled", !0), a("[data-role=title]", g).text(a(this).text()), S[f] = a(this).data("value"), d(), !1
                })
            })
        }

        function h() {
            a.each(a(A, b()), function (b, c) {
                var d = a(c), e = d.data("id"), f = a(D, d).text().trim();
                switch (d.data(B)) {
                    case m:
                        var g = [];
                        a.each(a("input[type=checkbox]:checked", d), function (b, c) {
                            g.push(a(c).siblings("label").text())
                        }), i(e, f, g);
                        break;
                    case n:
                        var h = a("input[data-name=min]", d).val(), j = a("input[data-name=max]", d).val(),
                            k = d.data(C);
                        if ("" === h && "" === j) {
                            i(e, f, void 0, null, null);
                            break
                        }
                        "" === h && (h = a(o, d).data("min")), "" === j && (j = a(o, d).data("max")), i(e, f, void 0, h + " " + k, j + " " + k)
                }
            })
        }

        function i(b, c, d, e, f) {
            var g = Q.siblings(F + "[data-" + G + "=1]");
            if (void 0 !== e && void 0 !== f || d.length > 0) {
                var h = null;
                if (void 0 !== d ? h = 1 === d.length ? d[0] : d.length + " С„РёР»СЊС‚." : null !== e && null !== f && (h = "РѕС‚ " + e + " РґРѕ " + f), a(F + "[data-" + H + "=" + b + "]", Q).remove(), a(".active-filter[data-" + H + "=" + b + "]", Q).remove(), null !== h) {
                    var i = g.clone().toggleClass("hidden", !1).attr("data-" + G, 0).attr("data-" + H, b);
                    a("[data-role=title]", i).text(c + ": " + h), Q.append(i).find("[data-" + H + "=" + b + "]").click(j)
                }
            } else a("[data-" + H + "=" + b + "]", Q).remove();
            if (a(".active-filter", Q).length > 0 && 0 === a(".active-filter[data-is-total=1]", Q).length) {
                var k = g.clone().toggleClass("hidden", !1).attr("data-" + G, 0).attr("data-is-total", 1);
                a("[data-role=title]", k).html("<strong>РћС‡РёСЃС‚РёС‚СЊ РІСЃРµ С„РёР»СЊС‚СЂС‹</strong>"), Q.prepend(k).find("[data-is-total=1]").click(j)
            } else 0 === a(".active-filter[data-is-total=0]", Q).length && a(".active-filter[data-is-total=1]", Q).length > 0 && a(".active-filter[data-is-total=1]", Q).remove();
            Q.toggleClass("catalog-filter-list", 0 !== a(".active-filter", Q).length)
        }

        function j() {
            var b = a(this), c = 1 === b.data("is-total"), e = b.data(H);
            return !0 === c ? k() : l(e), d(), h(), !1
        }

        function k() {
            a.each(a(A, b()), function (b, c) {
                l(a(c).data("id"))
            })
        }

        function l(b) {
            a.each(a(A + "[data-id=" + b + "]"), function (b, c) {
                var d = a(c);
                switch (d.data(B)) {
                    case m:
                        a("input[type=checkbox]:checked", d).prop("checked", !1).trigger("change");
                        break;
                    case n:
                        var e = a(o, d), f = e.slider("option", "min"), g = e.slider("option", "max");
                        a(o, d).slider("option", "values", [f, g]), a("input[data-name=min]", d).val(""), a("input[data-name=max]", d).val("").trigger("change")
                }
            })
        }

        var m = 3, n = 4, o = "[data-role=slider]", p = "[data-role=markdown-products-container]",
            q = "[data-role=markdown-view-options-panel]", r = "loading-overlay", s = "loading-dots",
            t = "[data-role=next-load-block]", u = "[data-role=next-load-block-button]", v = "[data-role=button-title]",
            w = "[data-role=checkbox-list]", x = "is-sortable", y = "[data-role=markdown-filtered-products-count]",
            z = "[data-role=btn-markdown-mobile-close-filters]", A = "[data-role=markdown-filter-block]",
            B = "control-type", C = "unit-name", D = "[data-role=filter-title]",
            E = "[data-role=selected-filters-panel]", F = "[data-role=active-filter-item]", G = "is-template",
            H = "selected-filter-id", I = '<div class="loading-dots"><span /><span /><span /><span /></div>',
            J = '<div class="loading-dots"><span /><span /><span /></div>', K = "type", L = "mobile", M = "desktop";
        window.EVENT_CLOSE_MOBILE_FILTERS_MENU = "filters-menu:mobile:close";
        var N, O, P, Q, R = {updateUrl: null, lastProductIndex: void 0},
            S = {sort: null, group: null, shops: [], offset: 0}, T = a("#menu-filters-aside"), U = [], V = arguments;
        a.each(a(this), function (a, b) {
            c.apply(b, V)
        }), function () {
            g(), P = a(t), Q = a(E), a(u, P).click(function () {
                return S.offset = N, P.toggleClass("hidden", !0).siblings(".loading-dots").remove(), P.after(I), d(!0, function (a) {
                    !1 !== a && P.siblings(".loading-dots").remove()
                }), !1
            }), a(z).click(function () {
                a(window).trigger(EVENT_CLOSE_MOBILE_FILTERS_MENU)
            }), h()
        }()
    }
}(jQuery), function (a) {
    var b = "#item-tabs-block";
    a.fn.markdownProductPage = function () {
        function c() {
            d(), a(window).on(EVENT_CHANGE_SCREEN_TYPE, d)
        }

        function d() {
            !0 === window.checkScreenType(window.SCREEN_MOBILE) ? a(b).responsiveTabs("activate", 0) : a(b).responsiveTabs("activate", 1)
        }

        c.apply(this, arguments)
    }
}(jQuery), function (a, b) {
    function c() {
        g.show()
    }

    function d() {
        g.hide()
    }

    function e() {
        var a = {};
        a.page = i, a.limit = j, c(), b.ajax({
            url: f.data("request-url"),
            type: "GET",
            data: a,
            dataType: "JSON",
            success: function (a) {
                if (!0 === a.result) {
                    d();
                    var c = b(a.content);
                    f.find(l).last().after(c), i++, window.history.pushState(null, "", c.find("ul.pagination li.active a").attr("href"))
                }
            }
        })
    }

    var f, g, h, i, j, k, l = ".news-item";
    b(function () {
        f = b("#news-container"), 0 !== f.length && (g = f.find("[data-role=news-loader]"), h = f.find(".news-container"), k = parseInt(f.data("count")), j = parseInt(f.data("limit")), i = parseInt(h.find('[data-role="pagination"]').data("current-page")) + 1, f.on("pjax:start", function () {
            c()
        }).on("pjax:end", function () {
            d();
            var a = b(".page-title");
            0 !== a.length && b(window).scrollTop(a.offset().top), i = parseInt(h.find('[data-role="pagination"]').data("current-page")) + 1
        }), f.on("click", "[data-role=show-more]", function () {
            return f.find(".pagination-container").remove(), e(), !1
        }))
    })
}(document, jQuery), function (a, b) {
    function c(a) {
        function c() {
            var a = !0;
            return 0 !== h.length && h.prop("checked") && (f.find('[name="birth-day"]').val() && f.find('[name="birth-month"]').val() && f.find('[name="birth-year"]').val() ? f.find('[name="sex_id"]').val() || (OrderCheckout.showErrors(["РќРµРѕР±С…РѕРґРёРјРѕ Р·Р°РїРѕР»РЅРёС‚СЊ В«РџРѕР»В»."], e), a = !1) : (OrderCheckout.showErrors(["Р”Р°С‚Р° СЂРѕР¶РґРµРЅРёСЏ СѓРєР°Р·Р°РЅР° РЅРµРІРµСЂРЅРѕ."], e), a = !1)), a
        }

        e = b(a), f = e.closest("FORM");
        var h = e.find("#is-prozapass-agree");
        h.change(function () {
            d(h.prop("checked"));
            var a = e.find('[data-role="prozapass-registration"]');
            a.toggleClass("block-inactive", !1 === h.prop("checked")), a.find("INPUT, SELECT").prop("disabled", !1 === h.prop("checked"))
        }), CheckoutContractor.onSelectContractorType(CheckoutContractor.getContractorTypeId(e), function () {
            g = !1, CheckoutContractor.enableButtonNext(), 0 === h.length ? d(!0) : (h.prop("checked", !0), h.change())
        }), f.submit(function () {
            return CheckoutContractor.getCurrentContractorTypeId() !== CheckoutContractor.getContractorTypeId(e) || (!1 === c() ? (OrderCheckout.stopLoading(), !1) : !0 === g || (b.ajax({
                        type: "POST",
                        url: "/order/ajax/?step=" + OrderCheckout.getStepNumber(),
                        dataType: "json",
                        data: f.serializeArray(),
                        success: function (a) {
                            if (0 !== a.errors.length)return OrderCheckout.showErrors(a.errors, e), void OrderCheckout.stopLoading();
                            if (!0 === a.data)return g = !0, void f.submit();
                            OrderCheckout.stopLoading();
                            var c = b("#contractor-phone-confirm-modal");
                            0 !== c.length && c.remove(), b("BODY").append(a.html), c = b("#contractor-phone-confirm-modal"), c.modal(), c.SmsConfirm({
                                callback: function (a) {
                                    c.modal("hide"), !0 === a && (g = !0, OrderCheckout.startLoading(), f.submit())
                                }
                            })
                        },
                        error: function () {
                            OrderCheckout.stopLoading(), OrderCheckout.showErrors(["РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ."], e)
                        }
                    }), !1))
        })
    }

    function d(a) {
        !0 === a ? b(".total-info-widget").trigger("order.total_info_widget.showBonus") : b(".total-info-widget").trigger("order.total_info_widget.hideBonus")
    }

    var e, f, g = !1;
    b(function () {
        CheckoutContractor.initIndividualEntity = c
    })
}(document, jQuery), function (a, b) {
    function c(a) {
        d = b(a), e = d.closest("FORM"), CheckoutContractor.onSelectContractorType(CheckoutContractor.getContractorTypeId(d), function () {
            i = !1, 0 === b(f).length && CheckoutContractor.disableButtonNext()
        }), d.on("change", f, function () {
            var a = b(f + ":checked");
            e.find('[name="contractor_appeal"]').val(a.data("legal-appeal")), e.find('[name="contractor_phone"]').val(a.data("legal-phone")), e.find('[name="contractor_email"]').val(a.data("legal-email")), b(g).show()
        }), e.submit(function () {
            return CheckoutContractor.getCurrentContractorTypeId() !== CheckoutContractor.getContractorTypeId(d) || (!0 === i || (b.ajax({
                    type: "POST",
                    url: "/order/ajax/?step=" + OrderCheckout.getStepNumber(),
                    dataType: "json",
                    data: e.serializeArray(),
                    success: function (a) {
                        if (0 !== a.errors.length)return OrderCheckout.showErrors(a.errors, d), void OrderCheckout.stopLoading();
                        !0 === a.data && (i = !0, e.submit()), OrderCheckout.stopLoading();
                        var c = b(h);
                        0 !== c.length && c.remove(), b("BODY").append(a.html), c = b(h), c.modal(), c.SmsConfirm({
                            callback: function (a) {
                                c.modal("hide"), !0 === a && (i = !0, OrderCheckout.startLoading(), e.submit())
                            }
                        })
                    },
                    error: function () {
                        OrderCheckout.stopLoading(), OrderCheckout.showErrors(["РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ."], d)
                    }
                }), !1))
        })
    }

    var d, e, f = '[data-role="change-legal-contractor"]', g = ".legal-contactor-contact",
        h = "#contractor-phone-confirm-modal", i = !1;
    b(function () {
        CheckoutContractor.initLegalEntity = c
    })
}(document, jQuery), function (a, b, c) {
    function d(a) {
        j = b(a), k = j.closest("FORM"), m = b(n), j.change(function () {
            var a = b(this);
            l = a.val(), k.find('[data-contractor-section-id]:not([data-contractor-section-id="' + l + '"])').hide(), k.find('[data-contractor-section-id="' + l + '"]').show(), b(".total-info-widget").trigger("order.total_info_widget.hideBonus"), OrderCheckout.clearErrors(), c !== o[l] && o[l]()
        }), setTimeout(function () {
            j.filter(":checked").change()
        }, 500), k.find("[data-contractor-section-id]").hide()
    }

    function e(a) {
        return a.closest("[data-contractor-section-id]").data("contractor-section-id")
    }

    function f(a, b) {
        o[a] = b
    }

    function g() {
        return l
    }

    function h() {
        m.prop("disabled", !1)
    }

    function i() {
        m.prop("disabled", !0)
    }

    var j, k, l, m, n = '[data-role="button-next"]', o = {};
    window.CheckoutContractor = {
        init: d,
        onSelectContractorType: f,
        getContractorTypeId: e,
        getCurrentContractorTypeId: g,
        enableButtonNext: h,
        disableButtonNext: i
    }
}(document, jQuery), function (a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = "[data-id=city_guid]",
        u = "[data-id=region_city_fias_guid]", v = "[data-id=order_city_select]", w = ".extended-field-city",
        x = "[data-id=street]", y = "[data-id=order_house_number]", z = "[data-id=order_flat]",
        A = "[data-id=order_is_rise_on_floor]", B = "[data-id=order_floor]", C = "[data-id=order_is_have_lift]",
        D = "[data-id=street_fias_guid]", E = '[data-role="calculate"]', F = "[data-role=elaboration-box]",
        G = "[data-role=elaboration-streets-list]", H = "[data-role=under-street-message]", I = "empty",
        J = "load-dates-url", K = !1, L = [], M = 0;
    a.fn.OrderCheckoutDeliveryCourier = function () {
        function N() {
            b = a(this), c = b.closest("form"), d = a(t, b), e = a(u, b), f = a(v, b), g = a(w, b), h = a(x, b), j = a(D, b), p = a(E, b), k = a(y, b), l = a(z, b), m = a(A, b), n = a(B, b), o = a(C, b), q = a(F, b), s = b.data(J), h.keyup(function () {
                j.val(""), window.CheckoutDelivery.Dateline.clear()
            }), i = h.autocomplete({
                source: function (a, b) {
                    O(a.term, function (a) {
                        K = 0 === a.length;
                        var c = [];
                        a.forEach(function (a) {
                            var b = {id: a.guid, label: Z(a), parent_guid: a.parent_guid};
                            c.push(b)
                        }), !1 === r && c.push({id: I, label: h.val(), parent_guid: ""}), b(c)
                    })
                }, select: function (a, b) {
                    if (I === b.item.id)return h.val(""), j.val(""), window.CheckoutDelivery.Dateline.clear(), P(!0), !1;
                    var c = b.item;
                    e.val(c.parent_guid), j.val(c.id)
                }
            }), i.autocomplete("widget").addClass("order-delivery-street-autocomplete"), i.on("blur", function () {
                if ("" === h.val())return void R();
                "" === j.val() ? (window.CheckoutDelivery.Dateline.clear(), O(a(this).val(), function (b) {
                    var c = null;
                    if (b.length > 0)if (1 === b.length) {
                        var d = b[0];
                        e.val(d.parent_guid), j.val(d.guid), h.val(Z(d)), R(), X(), S()
                    } else W(b); else if (X(), !1 === r)if (window.OrderCheckout.isTerminal()) c = a('<div/>"', {class: "alert alert-danger"}).text("Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, СЃ С‚Р°РєРёРј РЅР°Р·РІР°РЅРёРµРј СѓР»РёС† РЅРµ РЅР°Р№РґРµРЅРѕ. РџСЂРѕРІРµСЂСЊС‚Рµ РїСЂР°РІРёР»СЊРЅРѕСЃС‚СЊ РЅР°РїРёСЃР°РЅРёСЏ СѓР»РёС†С‹. Р•СЃР»Рё СѓР»РёС†Р° РІРІРµРґРµРЅР° РІРµСЂРЅРѕ, С‚Рѕ РѕР±СЂР°С‚РёС‚РµСЃСЊ Рє РєРѕРЅСЃСѓР»СЊС‚Р°РЅС‚Сѓ РёР»Рё СѓРїСЂР°РІР»СЏСЋС‰РµРјСѓ."), Q(c); else {
                        var f = a("<a/>", {
                            href: "javascript:;",
                            text: "Р·Р°РїРѕР»РЅРёС‚Рµ СЂР°СЃС€РёСЂРµРЅРЅСѓСЋ С„РѕСЂРјСѓ"
                        });
                        f.click(function () {
                            return h.val(""), P(!0), R(), X(), !1
                        }), c = a('<div/>"', {class: "alert alert-danger"}).text("Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, СЃ С‚Р°РєРёРј РЅР°Р·РІР°РЅРёРµРј СѓР»РёС† РЅРµ РЅР°Р№РґРµРЅРѕ. РџСЂРѕРІРµСЂСЊС‚Рµ РїСЂР°РІРёР»СЊРЅРѕСЃС‚СЊ РЅР°РїРёСЃР°РЅРёСЏ СѓР»РёС†С‹. Р•СЃР»Рё СѓР»РёС†Р° РІРІРµРґРµРЅР° РІРµСЂРЅРѕ, С‚Рѕ ").append(f), Q(c)
                    } else V(window.OrderCheckout.isTerminal() ? ["Р”Р»СЏ СѓС‚РѕС‡РЅРµРЅРёСЏ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё Рё СЃС‚РѕРёРјРѕСЃС‚Рё РґРѕСЃС‚Р°РІРєРё, РїРѕР¶Р°Р»СѓР№СЃС‚Р°, РѕР±СЂР°С‚РёС‚РµСЃСЊ Рє РєРѕРЅСЃСѓР»СЊС‚Р°РЅС‚Сѓ РёР»Рё СѓРїСЂР°РІР»СЏСЋС‰РµРјСѓ"] : ["Р”Р»СЏ СѓС‚РѕС‡РЅРµРЅРёСЏ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё Рё СЃС‚РѕРёРјРѕСЃС‚Рё РґРѕСЃС‚Р°РІРєРё СЃ РІР°РјРё СЃРІСЏР¶РµС‚СЃСЏ РѕРїРµСЂР°С‚РѕСЂ"])
                })) : (R(), X(), S())
            }).on("focus", function () {
                "" === j.val() && a(this).autocomplete("search", a(this).val())
            });
            var G = a('<small><a href="javascript:;" class="text-info bg-warning">РќРµС‚ РІР°С€РµР№ СѓР»РёС†С‹ - Р·Р°РїРѕР»РЅРёС‚Рµ СЂР°СЃС€РёСЂРµРЅРЅСѓСЋ С„РѕСЂРјСѓ</a></small>');
            i.data("ui-autocomplete")._renderItem = function (b, c) {
                return I !== c.id ? a("<li></li>").data("item.autocomplete", c).append("<a>" + c.label + "</a>").appendTo(b) : a("<li></li>").data("item.autocomplete", c).append(G).appendTo(b)
            }, k.on("change", S), l.on("change", S), m.on("change", S), n.on("change", S), o.on("change", S), p.click(function () {
                var a = Y();
                0 === a.length ? T() : U(a)
            }), window.CheckoutDelivery.onSelectMethod(window.CheckoutDelivery.getMethodId(b), function () {
                window.CheckoutDelivery.Dateline.setTitle("Р–РµР»Р°РµРјР°СЏ РґР°С‚Р° РґРѕСЃС‚Р°РІРєРё:"), window.CheckoutDelivery.Dateline.setItems([]), 0 === Y().length && S()
            }), f.change(function () {
                j.val(""), h.val(""), e.val(a(this).val())
            }), c.submit(function () {
                if (CheckoutDelivery.isMethodSelected(b)) {
                    var a = Y();
                    if (0 !== a.length)return OrderCheckout.stopLoading(), OrderCheckout.showErrors(a, b), !1
                }
                return !0
            });
            var H = function () {
                a(this).prop("checked") ? (n.prop("disabled", !1), o.prop("disabled", !1)) : (n.prop("disabled", !0), n.val(""), o.prop("disabled", !0), o.prop("checked", !1))
            };
            m.change(H), H.apply(m), P("" !== h.val() && "" === j.val() ? !0 : !1)
        }

        function O(b, c) {
            if (void 0 !== L[b])return void c(L[b]);
            var f = {query: b, cityGuid: d.val()};
            !0 === r && (f.filterCityFiasGuid = e.val()), OrderCheckout.startLoading(), a.ajax({
                url: h.data("url"),
                method: "get",
                data: f,
                dataType: "json",
                success: function (a) {
                    if (!1 === a.result) a.errors.length > 0 && (OrderCheckout.addErrors(a.errors), OrderCheckout.scrollTop()); else {
                        var d = a.data.streets;
                        L[b] = d, c(d)
                    }
                },
                error: function () {
                    alert("РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РґР°РЅРЅС‹С…. РџРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ.")
                },
                complete: function () {
                    OrderCheckout.stopLoading()
                }
            })
        }

        function P(a) {
            r !== a && (!0 === a ? (g.show(), R(), X()) : g.hide(), r = a, L = [])
        }

        function Q(c, d) {
            void 0 === d && (d = !0), !0 === d && R(), a(H, b).removeClass("hidden").append(c)
        }

        function R() {
            a(H, b).addClass("hidden").empty()
        }

        function S() {
            0 === Y().length && T()
        }

        function T() {
            window.OrderCheckout.clearMessages(), window.CheckoutDelivery.Dateline.clear(), a(".loading-dots", b).remove(), b.append('<div class="loading-dots"><span></span><span></span><span></span><span></span></div>');
            var d = c.serializeArray();
            window.CheckoutDelivery.setSelectorLockStatus(!0);
            var e = ++M;
            a.post(s + "?step=" + OrderCheckout.getStepNumber(), d).done(function (a) {
                if (!(a instanceof Object))return void(e === M && (U(["РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ."]), window.CheckoutDelivery.Dateline.setItems([])));
                if (e == M) {
                    window.OrderCheckout.clearErrors(), window.OrderCheckout.clearMessages();
                    var b = [];
                    if (0 !== a.errors.length) U(a.errors); else if (0 !== a.message.length) V(a.message), OrderCheckout.setNextButtonLockStatus(!a.canMoveToNextStep); else for (var c = 0; c < a.data.length; c++) {
                        var d = a.data[c], f = window.CheckoutDelivery.Dateline.initItem();
                        f.showZeroPrice = !0, f.stamp = d.stamp, f.price = d.price, f.includeAmountToOrder = d.includeAmountToOrder, b.push(f)
                    }
                    window.CheckoutDelivery.Dateline.setItems(b)
                }
            }).fail(function () {
                e == M && (U(["РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ."]), window.CheckoutDelivery.Dateline.setItems([]))
            }).always(function () {
                e == M && a(".loading-dots", b).remove(), e === M && window.CheckoutDelivery.setSelectorLockStatus(!1)
            })
        }

        function U(a) {
            OrderCheckout.showErrors(a, b), CheckoutDelivery.Dateline.setItems([])
        }

        function V(a) {
            OrderCheckout.showMessages(a, b), CheckoutDelivery.Dateline.setItems([])
        }

        function W(b) {
            q.removeClass("hidden"), R();
            var c = a(G, q);
            if (c.empty(), 0 !== b.count) {
                var d = b.slice(0, 7);
                if (d.length < b.length) {
                    var f = a('<div/>"', {class: "alert alert-info"}).text("РќРµРєРѕС‚РѕСЂС‹Рµ РІР°СЂРёР°РЅС‚С‹ РЅРµ РѕС‚РѕР±СЂР°Р¶РµРЅС‹: РІРІРµРґРёС‚Рµ Р±РѕР»РµРµ С‚РѕС‡РЅС‹Р№ Р°РґСЂРµСЃ");
                    Q(f)
                }
                if (d.forEach(function (b) {
                        var d = "elaboration-item-" + b.guid, f = a("<div/>", {class: "radio"}), g = a("<input/>", {
                            id: d,
                            type: "radio",
                            value: b.guid,
                            name: "elaboration-street",
                            "data-city-guid": b.parent_guid
                        }), i = a("<label/>", {for: d, text: Z(b)});
                        g.change(function () {
                            e.val(a(this).data("city-guid")), j.val(a(this).val()), h.val(a(this).siblings("label").text()), R(), X(), S()
                        }), f.append(g).append(i), c.append(f)
                    }), !1 === r) {
                    var g = a("<a/>", {
                        href: "javascript:;",
                        text: "Р·Р°РїРѕР»РЅРёС‚Рµ СЂР°СЃС€РёСЂРµРЅРЅСѓСЋ С„РѕСЂРјСѓ"
                    });
                    g.click(function () {
                        return h.val(""), P(!0), R(), X(), !1
                    });
                    var f = a('<div/>"', {class: "alert alert-warning"}).text("РќРµС‚ РІР°С€РµР№ СѓР»РёС†С‹ - ").append(g);
                    Q(f, !1)
                }
            }
        }

        function X() {
            q.addClass("hidden")
        }

        function Y() {
            window.OrderCheckout.clearErrors();
            var a = [];
            return !1 === r && "" === j.val() && a.push("РќРµРѕР±С…РѕРґРёРјРѕ Р·Р°РїРѕР»РЅРёС‚СЊ РїРѕР»Рµ В«РЈР»РёС†Р°В»."), "" === h.val().trim() && a.push("РќРµРѕР±С…РѕРґРёРјРѕ Р·Р°РїРѕР»РЅРёС‚СЊ РїРѕР»Рµ В«РЈР»РёС†Р°В»."), "" === k.val().trim() && a.push("РќРµРѕР±С…РѕРґРёРјРѕ Р·Р°РїРѕР»РЅРёС‚СЊ РїРѕР»Рµ В«Р”РѕРјВ»."), !0 === m.prop("checked") && "" === n.val().trim() && a.push("РќРµРѕР±С…РѕРґРёРјРѕ Р·Р°РїРѕР»РЅРёС‚СЊ РїРѕР»Рµ В«Р­С‚Р°Р¶В»."), a
        }

        function Z(a) {
            return g.is(":visible") ? a.type_name_short + ". " + a.name_official : a.type_name_short + ". " + a.name_official + " (" + a.owner_type_name_short + ". " + a.owner_name + ")"
        }

        N.apply(this)
    }
}(jQuery), function (a, b, c) {
    function d(a, c) {
        k = b(a), m = k.closest('[data-role="widget-container"]'), n = c, l = k.val(), m.on("click", '[data-role="' + p + '"]', function () {
            f(b(this))
        })
    }

    function e(a) {
        b('[data-role="dateline-label"]', m).html(a)
    }

    function f(a) {
        o.removeClass("active"), k.val("");
        var b = 0;
        0 !== a.length && (l = a.attr("data-stamp"), a.addClass("active"), k.val(l), b = parseFloat(a.data("price"))), CheckoutTotalInfo.setTotalDeliveryPriceParams(b, !0, 1)
    }

    function g(a) {
        o.remove(), 0 === a.length ? m.hide() : (a.forEach(function (a) {
            var b = a.stamp + 60 * n * 60 + 60 * (new Date).getTimezoneOffset(), d = new Date(1e3 * b), e = 0;
            c !== a.price && (e = parseFloat(a.price));
            var f = !0;
            !1 === a.includeAmountToOrder && (f = !1), m.append(['<div data-role="' + p + '" class="date-block" data-stamp="' + a.stamp + '" data-price="' + e + '" data-include-amount-to-order="' + f + '">', '<div class="date">', d.strftime("%a", "rus"), "<br />", d.strftime("%d.%m"), "</div>", '<div class="price">', e || a.showZeroPrice ? e + " &#8381;" : "", "</div>"].join(""))
        }), o = m.find('[data-role="' + p + '"]'), m.show()), k.val(""), f(o.filter('[data-stamp="' + l + '"]'))
    }

    function h() {
        return {}
    }

    function i() {
        return "" !== k.val().trim()
    }

    function j() {
        g([]), k.val("")
    }

    var k, l, m, n, o = b(), p = "dateline-block";
    b(function () {
        CheckoutDelivery.Dateline = {init: d, setTitle: e, setItems: g, isSelected: i, initItem: h, clear: j}
    })
}(document, jQuery), function (a) {
    a.fn.checkoutDeliveryMap = function (b) {
        var c, d, e, f, g, h, i, j = "[data-role=select-item]", k = ".radio", l = {
            init: function () {
                function b(a, b) {
                    void 0 !== b && null !== b || (b = !0);
                    var c = a.closest(k),
                        d = Math.round(g.scrollTop() + c.position().top - g.outerHeight() / 2 + c.outerHeight());
                    !0 === b ? g.scrollTo(d) : g.scrollTop(d)
                }

                d = a(this), e = a(j, d), f = e.closest('[data-role="widget-container"]'), g = f.find("[data-role=items-list]"), h = f.find("[data-role=sort-by-distance]"), c = e.closest("form");
                var l = d.data("map-container-id");
                a("[title]", g).tooltip({container: "body"});
                var m = [], n = "islands#darkOrangeIcon";
                loadYandexMaps(function () {
                    function c() {
                        a(j, d).each(function () {
                            var c = a(this);
                            if (m.hasOwnProperty(c.val())) {
                                var d = m[c.val()];
                                d.events.add("click", function () {
                                    b(c, !0), f(), d.options.set("preset", n), c.prop("checked", !0)
                                }), c.on("change", function () {
                                    c.is(":checked") && (f(), d.options.set("preset", n), d.options.set("zIndex", 2), i.setZoom(14), i.panTo([c.data("location-latitude"), c.data("location-longitude")], {flying: !0}))
                                })
                            }
                        })
                    }

                    function f() {
                        i.geoObjects.each(function (a) {
                            a.options.set("zIndex", 1), a.options.set("preset", a.options.get("defaultPreset"))
                        })
                    }

                    i = new ymaps.Map(l, {
                        zoom: 12,
                        controls: ["zoomControl", "fullscreenControl", "trafficControl"],
                        behaviors: ["default", "scrollZoom"],
                        center: [55.2627, 87.363281]
                    }), e.each(function () {
                        var b = a(this), c = b.data("location-longitude");
                        if (void 0 !== c && 0 !== c) {
                            var d = b.data("location-latitude");
                            if (void 0 !== d && 0 !== d) {
                                var e = "islands#blueIcon", f = "islands#blueIcon";
                                b.is(":checked") && (e = "islands#darkOrangeIcon"), b.is(":disabled") && (e = "islands#grayIcon", f = "islands#grayIcon");
                                var g = new ymaps.Placemark([d, c], {balloonContent: b.data("balloon")}, {
                                    preset: e,
                                    defaultPreset: f
                                });
                                !1 === b.is(":disabled") && (m[b.val()] = g), i.geoObjects.add(g)
                            }
                        }
                    }), c();
                    var o;
                    h.prop("disabled", !1), h.on("change", function () {
                        function b(b, d) {
                            function e(a) {
                                return a < 500 ? "РґРѕ 500 РјРµС‚СЂРѕРІ" : a < 1e3 ? "500 - 1000 РјРµС‚СЂРѕРІ" : a < 2e3 ? "1000 - 2000 РјРµС‚СЂРѕРІ" : a < 3e3 ? "2000 - 3000 РјРµС‚СЂРѕРІ" : "Р±РѕР»РµРµ 3000 РјРµС‚СЂРѕРІ"
                            }

                            l.each(function () {
                                var c = a(this),
                                    e = getDistanceFromLatLonInKm(c.find(j).data("location-latitude"), c.find(j).data("location-longitude"), b, d);
                                c.data("distance", 1e3 * e)
                            }), l.sort(function (b, c) {
                                return a(b).data("distance") - a(c).data("distance")
                            });
                            var f, h = a("<div />");
                            l.each(function () {
                                var b = a(this), c = e(b.data("distance"));
                                c !== f && h.append('<div class="group-name">Р”РёСЃС‚Р°РЅС†РёСЏ: ' + c + "</div>"), h.append(b), f = c
                            }), g.html(h.html()), c()
                        }

                        function d() {
                            l.sort(function (b, c) {
                                return parseInt(a(b).data("sort-order")) - parseInt(a(c).data("sort-order"))
                            }), g.html(l), c()
                        }

                        function e() {
                            return h.prop("checked", !1), d(), !1
                        }

                        function f(a) {
                            var c = a.coords.latitude, d = a.coords.longitude;
                            o = new ymaps.Placemark([c, d], {balloonContent: "Р’С‹ РЅР°С…РѕРґРёС‚РµСЃСЊ Р·РґРµСЃСЊ."}, {
                                balloonAutoPan: !1,
                                preset: "islands#orangeDotIcon",
                                defaultPreset: "islands#orangeDotIcon"
                            }), i.geoObjects.add(o), o.balloon.open(), b(c, d)
                        }

                        if (!1 == "geolocation" in navigator)return e();
                        var h = a(this), l = g.find(k);
                        i.geoObjects.remove(o), h.prop("checked") ? navigator.geolocation.getCurrentPosition(f, e) : d()
                    })
                }), CheckoutDelivery.onSelectMethod(CheckoutDelivery.getMethodId(f), function () {
                    CheckoutDelivery.Dateline.setTitle("Р–РµР»Р°РµРјР°СЏ РґР°С‚Р° РїРѕР»СѓС‡РµРЅРёСЏ:"), CheckoutDelivery.Dateline.setItems([]), loadYandexMaps(function () {
                        var a = e.filter(":checked");
                        0 === a.length ? i.setBounds(i.geoObjects.getBounds(), {checkZoomRange: !0}) : (b(a, !1), a.change())
                    })
                }), c.submit(function () {
                    return !CheckoutDelivery.isMethodSelected(f) || 0 !== e.filter(":checked").length || (OrderCheckout.stopLoading(), OrderCheckout.showErrors(["Р’С‹Р±РµСЂРёС‚Рµ С‚РѕС‡РєСѓ РїРѕР»СѓС‡РµРЅРёСЏ."]), !1)
                })
            }
        };
        return l[b] ? l[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void 0 : l.init.apply(this, arguments)
    }
}(jQuery), function (a) {
    a.fn.OrderCheckoutDeliveryPostamat = function () {
        function b() {
            window.OrderCheckout.clearErrors();
            var a = [];
            return 0 === g.filter(":checked").length && a.push("РЈРєР°Р¶РёС‚Рµ РїРѕСЃС‚Р°РјР°С‚, РЅР° РєРѕС‚РѕСЂРѕРј Р¶РµР»Р°РµС‚Рµ РїРѕР»СѓС‡РёС‚СЊ РІР°С€ Р·Р°РєР°Р·."), a
        }

        var c, d, e, f, g, h = "load-url", i = "step-number", j = "price", k = "include-price", l = 2,
            m = "[data-role=select-item]", n = this;
        !function () {
            c = a(n), d = c.closest("form"), e = c.data(h), f = d.data(i), g = a(m, c), g.change(function () {
                CheckoutTotalInfo.setTotalDeliveryPriceParams(a(this).data(j), a(this).data(k), l)
            }), d.submit(function () {
                if (CheckoutDelivery.isMethodSelected(c)) {
                    var a = b();
                    if (0 !== a.length)return OrderCheckout.stopLoading(), OrderCheckout.showErrors(a, c), !1
                }
                return !0
            }), window.CheckoutDelivery.onSelectMethod(window.CheckoutDelivery.getMethodId(c), function () {
                var a = g.filter(":checked");
                0 !== a.length && (CheckoutTotalInfo.isRemoveDeliveryBlock = !1, CheckoutTotalInfo.setTotalDeliveryPriceParams(a.data(j), a.data(k), l))
            })
        }()
    }
}(jQuery), function (a, b, c) {
    function d(a) {
        function d() {
            var a = b(this), c = a.attr("name"), d = k.find('[name="' + c + '"]');
            d.length > 1 && d.val(a.val())
        }

        j = b(a), k = j.closest("FORM"), k.find("[" + m + "]").keyup(d), k.find("[" + m + "]").change(d), j.change(function () {
            var a = b(this), d = a.data("method-id");
            k.find('[data-method-section-id]:not([data-method-section-id="' + d + '"])').hide(), k.find('[data-method-section-id="' + d + '"]').show();
            var e = k.find('[data-role="consult-block"].static:visible');
            if (0 !== e.length) {
                var f = e.clone(), g = e.closest(".row");
                g.prev("hr").hide(), g.hide(), e.remove(), f.removeClass("static").css({"padding-left": "20px"}).attr("data-method-section-id", d), k.find('[data-role="order-buttons"]').after(f)
            }
            OrderCheckout.clearErrors(), c !== n[d] && n[d].forEach(function (a) {
                a(d)
            }), o.forEach(function (a) {
                a(d)
            })
        }), k.submit(function () {
            return !(j.length > 1 && 0 === j.filter(":checked").length) || (OrderCheckout.stopLoading(), OrderCheckout.showErrors(["Р’С‹Р±РµСЂРёС‚Рµ СЃРїРѕСЃРѕР± РїРѕР»СѓС‡РµРЅРёСЏ."]), !1)
        }), setTimeout(function () {
            j.filter(":checked").change()
        }, 500), k.find("[data-method-section-id]").hide(), k.find("[" + m + '="master"]').change()
    }

    function e(a, b) {
        c === n[a] && (n[a] = []), n[a].push(b)
    }

    function f(a) {
        o.push(a)
    }

    function g(a) {
        return a.closest("[data-method-section-id]").data("method-section-id")
    }

    function h(a) {
        return g(a) === j.filter(":checked").data("method-id")
    }

    function i(a) {
        !0 === a ? b(l).show() : b(l).hide()
    }

    var j, k, l = ".radio-form .radio-cover", m = "data-field-sync-role", n = {}, o = [];
    window.CheckoutDelivery = {
        init: d,
        onSelectMethod: e,
        onSelectAnyMethod: f,
        getMethodId: g,
        isMethodSelected: h,
        setSelectorLockStatus: i
    }
}(document, jQuery), $(document).ready(function () {
    function a() {
        $(c).hide(), $.ajax({
            url: d.attr("action"),
            type: d.attr("method"),
            dataType: "JSON",
            data: d.serialize(),
            success: function (a) {
                a.result ? $(b).show() : $(c).show()
            },
            error: function () {
                $(c).show()
            }
        })
    }

    var b = ".need-callback-div > .alert-warning", c = ".need-callback-div > .alert-danger",
        d = $(".need-callback-div").find("form"), e = $(".need-callback-div").find(".repeat-need-callback");
    d.on("keyup", "textarea", function () {
        $(this).attr("data-min-length") <= $(this).val().length ? d.find("button").removeClass("lock") : d.find("button").addClass("lock")
    }), d.on("submit", function () {
        return !0 === d.yiiActiveForm("data").validated && (a(), d.hide()), !1
    }), e.click(a)
}), function (a, b, c) {
    function d() {
        p.find(".order-buttons .btn").trigger("order.stopLoading")
    }

    function e() {
        p.find('.order-buttons .btn[type="submit"]').trigger("order.startLoading")
    }

    function f() {
        return parseInt(p.attr("data-step-number"))
    }

    function g(a, c) {
        if (i(c), 0 !== a.length) {
            var d = [];
            b.each(a, function (a, b) {
                d.push("<li>" + b + "</li>")
            }), d = d.join("");
            var e = k(c);
            e.find("UL").html(d), e.show()
        }
    }

    function h(a, c) {
        if (j(c), 0 !== a.length) {
            var d = [];
            b.each(a, function (a, b) {
                d.push("<li>" + b + "</li>")
            }), d = d.join("");
            var e = l(c);
            e.find("UL").html(d), e.show()
        }
    }

    function i(a) {
        k(a).hide()
    }

    function j(a) {
        l(a).hide()
    }

    function k(a) {
        return c !== a ? a.find('[data-role="errors-list"]') : p.find('[data-role="errors-list"]')
    }

    function l(a) {
        return c !== a ? a.find('[data-role="message-list"]') : p.find('[data-role="message-list"]')
    }

    function m() {
        q.on("keypress", function (a) {
            if (13 === (a.keyCode || a.which))return a.preventDefault(), !1
        }), q.find("input[type=checkbox], input[type=radio]").on("focus", function () {
            b(this).closest("." + b(this).attr("type")).addClass("focus")
        }), q.find("input[type=checkbox], input[type=radio]").on("blur", function () {
            b(this).closest("." + b(this).attr("type")).removeClass("focus")
        }), q.find("[tabindex]").on("keyup", function (a) {
            var d = b(this);
            if (13 === (a.keyCode || a.which)) {
                if ("submit" == d.attr("type"))return q.submit(), !0;
                a.preventDefault();
                var e = [];
                return b(this).parents("form").eq(0).find("[tabindex]:visible:enabled").each(function () {
                    e[b(this).attr("tabindex")] = this
                }), b.each(e, function (a, b) {
                    if (c !== b && d.attr("tabindex") < a)return b.focus(), !1
                }), !0
            }
        })
    }

    function n(a) {
        c !== r && r.prop("disabled", a)
    }

    function o() {
        return p.data("is-terminal")
    }

    var p, q, r;
    b(function () {
        if (p = b(".order-page"), 0 === p.length)return void(p = c);
        i(), j(), q = p.find("FORM"), 0 !== q.length && (r = b("[data-role=button-next]", q), m())
    }), window.OrderCheckout = {
        stopLoading: d,
        startLoading: e,
        getStepNumber: f,
        showErrors: g,
        clearErrors: i,
        showMessages: h,
        clearMessages: j,
        setNextButtonLockStatus: n,
        isTerminal: o
    }
}(document, jQuery), unit("orderFinalEcommerce").require("jQuery").import("ga").define(function () {
    $.fn.orderEcommerce = function () {
        var a = $(this), b = a.data("order-guid"), c = a.data("site-name"),
            d = (a.data("total-amount"), a.data("delivery-cost"), []);
        $(".product", a).each(function () {
            d.push({
                id: $(this).data("product-code"),
                name: $(this).data("name"),
                price: $(this).data("price"),
                category: $(this).data("category"),
                quantity: $(this).data("quantity")
            })
        }),
            window.yaEcommerceData = [], window.yaEcommerceData.push({
            ecommerce: {
                purchase: {
                    actionField: {
                        id: b,
                        affiliation: c
                    }, products: d
                }
            }
        })
    }
}), function (a) {
    a.fn.downloadOrderDoc = function (b) {
        var c = this;
        a.ajax({
            url: b, success: function (a) {
                !0 === a.result ? window.location.href = a.data : c.empty().append('<div class="alert alert-danger">' + a.message + "</div>")
            }
        })
    }
}(jQuery), $(document).ready(function () {
    var a = $("#branches-with-avails");
    if (0 == a.length)return !1;
    a.on("click", function (b) {
        var c = "modal-branches-with-avails", d = $("#" + c);
        if (0 === d.length) {
            d = $("<div/>", {id: c, class: "modal fade"});
            var e = $("<div/>", {class: "modal-dialog"}), f = $("<div/>", {class: "modal-content"}),
                g = $("<div/>", {class: "modal-body"});
            g.html("РРґРµС‚ Р·Р°РіСЂСѓР·РєР°..."), f.append(g), e.append(f), d.append(e), $("body").append(d), d = $("#" + c), d.modal({keyboard: !1}), d.on("show.bs.modal", function () {
                var b = a.prop("href"), c = $(".modal-body", d);
                c.load(b, function (a, b) {
                    if ("error" === b)return alert("РР·РІРёРЅРёС‚Рµ, СЃРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ."), void d.modal("hide");
                    var e = $('input[type="radio"]', c);
                    e.length > 0 && e.on("click", function () {
                        var a = $("div", c).data("action-url");
                        $.ajax({
                            url: a + "&branch_guid=" + $(this).val(),
                            type: "get",
                            cache: !1,
                            dataType: "json",
                            success: function (a) {
                                !0 === a.result && (location.href = location.href), c.html($("<h4>").html(a.message))
                            },
                            error: function (a) {
                                c.html($("<h4>").html("РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РѕС‚РІРµС‚Р° РѕС‚ СЃРµСЂРІРµСЂР°."))
                            }
                        })
                    })
                })
            }), d.on("hidden.bs.modal", function () {
                g.html("")
            })
        }
        return d.modal("show"), !1
    })
}), function (a) {
    a.fn.onlineCreditForm = function () {
        var b = a(this);
        a(".cancel-button", b).on("click", function () {
            b.on("beforeValidate", function () {
                a(this).data().attributes.attr("willValidate", !1)
            })
        })
    }
}(jQuery), function (a) {
    var b, c = {
        isRemoveDeliveryBlock: !0, init: function (d) {
            return a(this).on("order.total_info_widget.resetValue", function () {
                c.resetValue(a(this))
            }), 1 == a(this).find(".pzpBonusShow").val() && (a(this).on("order.total_info_widget.hideBonus", function () {
                c.hideBonus(a(this))
            }), a(this).on("order.total_info_widget.showBonus", function () {
                c.showBonus(a(this))
            })), b = a(this), a(this).on("order.total_info_widget.decreaseValue", function (b, d) {
                c.decreaseValue(a(this), d)
            }), a(this).on("order.total_info_widget.setDeliveryPrice", function (a, b, d) {
                c.setDeliveryPrice(b, d)
            }), CheckoutDelivery.onSelectAnyMethod(function () {
                !0 === CheckoutTotalInfo.isRemoveDeliveryBlock && c.setDeliveryPrice(0), CheckoutTotalInfo.isRemoveDeliveryBlock = !0
            }), b
        }, resetValue: function (a) {
            var b = a.find(".total-price-value"), c = b.find("span:first-child"), d = parseInt(c.attr("data-value"));
            c.html(new Intl.NumberFormat("ru-RU").format(d)), b.find(".bonus-part").remove(), c.removeClass("line-through")
        }, decreaseValue: function (a, b) {
            a.trigger("order.total_info_widget.resetValue");
            var c = a.find(".total-price-value"), d = c.find("span:first-child"),
                e = parseInt(d.attr("data-value")) - b;
            d.addClass("line-through"), c.append('<div class="bonus-part">' + new Intl.NumberFormat("ru-RU").format(e) + ' <span class="rub-icon">p</span></div>')
        }, showBonus: function (b) {
            var c = b.find(".total-bonus-value");
            if (0 !== c.length) {
                c.show();
                var d = a(document).find(".pzp-block");
                void 0 !== d && (d.find(".bonus-info-msg").remove(), d.append('<div class="bonus-info-msg"><b>' + c.text() + "</b>Р±СѓРґРµС‚ РЅР°С‡РёСЃР»РµРЅРѕ РЅР° Р‘РѕРЅСѓСЃРЅСѓСЋ РєР°СЂС‚Сѓ РїРѕСЃР»Рµ РѕРїР»Р°С‚С‹ РґР°РЅРЅРѕРіРѕ Р·Р°РєР°Р·Р°</div>"))
            }
        }, hideBonus: function (b) {
            var c = b.find(".total-bonus-value");
            if (0 !== c.length) {
                c.hide();
                var d = a(document).find(".pzp-block");
                void 0 !== d && d.find(".bonus-info-msg").remove()
            }
        }, setDeliveryPrice: function (d, e, f) {
            void 0 === e && (e = !0);
            var g = a(".delivery", b);
            if (0 === d) 0 < g.length && g.remove(); else {
                if (0 === g.length) {
                    switch (f) {
                        case 1:
                            a(".products-price-amount", b).after('<div class="delivery">Р”РѕСЃС‚Р°РІРєР°: <span class="price-value"></span> <span class="rub-icon">&#8381;</span></div>').find(".delivery");
                            break;
                        case 2:
                            a(".products-price-amount", b).after('<div class="delivery">РџРѕСЃС‚Р°РјР°С‚: <span class="price-value"></span> <span class="rub-icon">&#8381;</span><br><span class="hint">(РґРѕСЃС‚Р°РІРєР° Рё С…СЂР°РЅРµРЅРёРµ)</span></div>').find(".delivery")
                    }
                    g = a(".delivery", b)
                }
                a(".price-value", g).text(new Intl.NumberFormat("ru-RU").format(d)).data("value", d)
            }
            c.recalcTotalPrice(e)
        }, recalcTotalPrice: function () {
            var c = parseFloat(a(".delivery .price-value", b).data("value")),
                d = parseFloat(a(".products-price-amount .price-value", b).data("value")),
                e = a(".total-price-value .price-value", b), f = d;
            c > 0 && (f += c), e.html(new Intl.NumberFormat("ru-RU").format(f)), e.data("value", f)
        }
    };
    a.fn.totalInfoWidget = function (a) {
        return c[a] ? c[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void 0 : c.init.apply(this, arguments)
    }, window.CheckoutTotalInfo = {
        setTotalDeliveryPriceParams: c.setDeliveryPrice,
        isRemoveDeliveryBlock: c.isRemoveDeliveryBlock
    }
}(jQuery), $(function () {
    function a() {
        $(b).focus()
    }

    var b = "input[type=tel]";
    $('.order-group .order-group-control [type="radio"]:checked').trigger("change"), "#phoneFocus" == window.location.hash && setTimeout(a, 2e3)
}), $(document).ready(function () {
    $(".order-page .order-buttons .btn").on("click", function (a) {
        var b = $(this);
        b.attr("data-loading") ? a.preventDefault() : "submit" !== b.attr("type") && b.trigger("order.startLoading")
    }), $(".order-page .order-buttons .btn").on("order.stopLoading", function () {
        var a = $(this);
        a.find("SPAN.glyphicon-refresh-animate").remove(), a.removeAttr("data-loading")
    }), $(".order-page .order-buttons .btn").on("order.startLoading", function () {
        var a = $(this);
        1 != a.attr("data-loading") && (a.prepend('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>'), a.attr("data-loading", 1))
    }), $("FORM#order-form").submit(function () {
        $(this).find('[type="submit"]').trigger("order.startLoading")
    })
}), function (a) {
    var b, c = {
        init: function () {
            b = a(this), a.each(a("[data-role=order-payment-button]", b), function (b, d) {
                c.initButton(a(d))
            })
        }, initButton: function (b) {
            b.click(function () {
                var d = a(".modal[data-role=order-list-modal]");
                a("[data-role=heading]", d).text("РћРЅР»Р°Р№РЅ-РѕРїР»Р°С‚Р°");
                var e = a("[data-role=body]", d);
                return e.html('<div class="loading-dots"><span></span><span></span><span></span><span></span></div>'), d.modal("show"), a.ajax({
                    url: b.data("load-url"),
                    method: "GET",
                    dataType: "json",
                    data: {order_guid: b.data("order-guid")},
                    success: function (b) {
                        e.html(b.html);
                        var d = a("form", e);
                        c.initForm(d)
                    },
                    error: function () {
                        e.html('<div class="alert alert-error">РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ РґР°РЅРЅС‹С…. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div>')
                    }
                }), !1
            })
        }, initForm: function (b) {
            b.submit(function () {
                var b = !0, c = [];
                if (a("[data-role=submit-button-group] .alert", a(this)).remove(), 0 === a("input[data-role=payment-method]:checked", a(this)).length && (c.push(["Р’С‹Р±РµСЂРёС‚Рµ СЃРїРѕСЃРѕР± РѕРїР»Р°С‚С‹"]), b = !1), !1 === b) {
                    var d = a("[data-role=submit-button-group]", a(this)).prepend('<div class="alert alert-danger"></div>').find(".alert");
                    a.each(c, function (a, b) {
                        d.append("<p>" + b + "</p>")
                    })
                }
                return b
            })
        }
    };
    a.fn.postOrderPaymentWidget = function (a) {
        return c[a] ? c[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void 0 : c.init.apply(this, arguments)
    }
}(jQuery), function (a, b, c) {
    function d() {
        var d = f.val(), e = b.PREORDER_PAYMENT_METHODS_GROUPED_BY_BRANCH_GUID[d];
        if (c !== e) {
            a(h).hide();
            for (var g in e)if (!1 !== e.hasOwnProperty(g)) {
                var i = e[g];
                a(h + '[data-payment-guid="' + i + '"]').show()
            }
        }
    }

    var e, f, g, h = '[data-role="payment-method"]';
    a(function () {
        if (e = a('[data-role="preorder-container"]'), f = e.find('[data-role="branch-list"]'), g = e.find('[data-form-name="preorder-form"]'), 0 !== e.length && 0 !== f.length) {
            d(), f.on("change", d);
            var h = !1, i = g.find('[type="submit"]');
            i.on("click", function () {
                return i.prop("disabled", !0), !0 === h || (a.post(g.attr("action"), g.serialize(), function (d) {
                    if (!0 === d.result)return h = !0, void g.submit();
                    var f = "", i = e.find(".alert-danger");
                    a.each(d.errors, function (a, b) {
                        f = f + b + "<br>"
                    }), 0 !== f.length ? (c !== b.grecaptcha && b.grecaptcha.reset(), i.html("").append(f).show()) : i.hide();
                    var j = a("#contractor-phone-confirm-modal");
                    0 !== j.length && j.remove(), a("body").append(d.html), j = a("#contractor-phone-confirm-modal"), j.modal(), j.SmsConfirm({
                        callback: function (a) {
                            j.modal("hide"), !0 === a && (h = !0, g.submit())
                        }
                    })
                }).always(function () {
                    i.prop("disabled", !1)
                }), !1)
            }), a("body").on("click", '[data-role="preorder-select-branch"]', function (b) {
                b.preventDefault();
                var c = a(this), d = c.closest('[data-id="modal-for-avails"]'), e = d.find(".avails-item.selected");
                0 !== e.length && (f.val(e.data("id")), d.modal("hide"))
            })
        }
    })
}(jQuery, window, void 0), function (a, b, c, d) {
    function e(a, c) {
        var d = b(".image-slider", a).owlCarousel(c), e = d.data("owlCarousel");
        return b(".button-right", a).click(function () {
            return e.next(), !1
        }).show(), b(".button-left", a).click(function () {
            return e.prev(), !1
        }).show(), e
    }

    var f, g, h, i, j, k, l;
    b(function () {
        function m() {
            d !== c.YT && (t = new YT.Player("product-video"))
        }

        if (f = b("#product-page"), 0 !== f.length) {
            g = f.data("id");
            var n = e(b("#thumbsSliderWrap"), {
                items: 4,
                itemsMobile: [479, 4],
                itemsTablet: [c.SCREEN_TABLET_MAX_WIDTH, 4],
                itemsDesktopSmall: [c.SCREEN_DESKTOP_MAX_WIDTH, 4],
                itemsDesktop: [c.SCREEN_DESKTOP_MAX_WIDTH, 4],
                dots: !1,
                afterAction: !1
            });
            b("body");
            if (b("#mainImageSliderWrap .img").length) {
                if (b(c).width() >= "992") {
                    if (b(c).width() >= "1900") {
                        b("#mainImageSliderWrap .img img").each(function (a, c) {
                            var d = b(this).data("original");
                            b(this).parent().attr("href", d);
                            var e = b(".thumb-slider-wrap .owl-item").eq(a).find("a");
                            "iframe" !== e.data("fancybox-type") && e.attr("href", d)
                        })
                    }
                    var o = b(".main-image-slider-wrap .img img");
                    if (o.length) {
                        o.zoomer({
                            drawIn: b('[data-role="zoom-preview"]'),
                            viewContainer: b('[data-role="zoom-preview-wrap"]'),
                            srcImgContainerWidth: b(".main-image-slider-wrap .img:first").width()
                        })
                    }
                }
                var p = e(b("#mainImageSliderWrap"), {
                    items: 1,
                    itemsMobile: [479, 1],
                    itemsTablet: [c.SCREEN_TABLET_MAX_WIDTH, 1],
                    itemsDesktopSmall: [c.SCREEN_DESKTOP_MAX_WIDTH, 1],
                    itemsDesktop: [c.SCREEN_DESKTOP_MAX_WIDTH, 1],
                    dots: !1,
                    afterAction: function () {
                        "object" == typeof n && (b("#thumbsSliderWrap .owl-item .thumb").removeClass("active").eq(this.owl.currentItem).addClass("active"), n.visibleItems[n.visibleItems.length - 1] < this.owl.currentItem ? n.goTo(this.owl.currentItem) : n.visibleItems[0] > this.owl.currentItem && n.goTo(this.owl.currentItem))
                    },
                    afterInit: function () {
                        b("#mainImageSliderWrap .img").removeClass("transparent")
                    }
                })
            }
            b("#thumbsSliderWrap .owl-item .thumb").hover(function () {
                p.goTo(b(this).parent().index())
            }), h = b('[data-role="item-order-price"]'), l = b('[data-role="credit-info"]'), b(c).on(c.EVENT_OS_VARIANT_CHANGED, function (a, b) {
                if (0 !== h.length) {
                    if (i = h.find('[data-role="current-price-value"]'), j = h.find('[data-role="previous-price-value"]'), k = h.find('[data-role="bonus-price-value"]'), 0 !== i.length) {
                        var c = parseFloat(i.data("price-value")) + b.currentPrice;
                        i.text(String.formatPrice(c))
                    }
                    if (0 !== j.length) {
                        var d = parseFloat(j.data("price-value")) + b.previousPrice;
                        j.text(String.formatPrice(d))
                    }
                    if (0 !== k.length) {
                        var e = parseFloat(k.data("price-value")) + b.bonus;
                        k.text(String.formatPrice(e));
                        var g = 0 === e;
                        k.closest(".buy-cheaper").toggleClass("hidden", g)
                    }
                    0 !== l.length && l.find('[data-role="credit-payment-value"]').text(b.creditPayment);
                    var m = f.find('[data-role="remains-overlimit-message"]');
                    0 !== m.length && (m.toggleClass("hidden", "" === b.overlimitMessage), m.html(b.overlimitMessage))
                }
            }), f.on("click", "[data-replace-with]", function () {
                b(this).replaceWith(b(this).data("replace-with"))
            });
            var q = b("[data-id=show-video-popover]"), r = q.data("target"), s = b(r);
            if (s.length || q.length) {
                q.on("click", function (a) {
                    return a.preventDefault(), s.modal({backdrop: !0}), !1
                });
                var t;
                s.on("hidden.bs.modal", function () {
                    var a = s.find("iframe");
                    a.length > 0 && (d !== t ? t.pauseVideo() : a.attr("src", a.attr("src")))
                }), s.on("show.bs.modal", function () {
                    var a = s.find(".modal-body"), c = s.find("iframe");
                    if (a.length && !c.length) {
                        var d = a.find("[data-id=video-url]"), e = d.data("url");
                        e || (e = d.val(), d.data("url", e)), b("<iframe />", {
                            id: "product-video",
                            src: e,
                            name: "",
                            class: "video_item_iframe",
                            frameborder: 0,
                            allowfullscreen: ""
                        }).appendTo(a), m()
                    }
                });
                var u = a.createElement("script");
                u.src = "//www.youtube.com/player_api";
                var v = a.getElementsByTagName("script")[0];
                v.parentNode.insertBefore(u, v)
            }
        }
    })
}(document, jQuery, window), define("productsList", ["window.jQuery", "window.getScreenType"], function () {
    function a() {
        var a = $(this), d = window.getScreenType(), e = b + c[d], f = a.attr(e);
        if (f && f !== a.attr("src")) {
            var g = a.clone();
            g.attr("src", f).bind("onreadystatechange load", function () {
                this.complete && a.fadeOut(500, function () {
                    a.replaceWith(g), g.fadeOut(0, function () {
                        g.fadeIn(500)
                    })
                })
            })
        }
    }

    var b = "data-image-", c = {};
    c[window.SCREEN_WIDE] = c[window.SCREEN_DESKTOP] = "desktop", c[window.SCREEN_TABLET] = "tablet", c[window.SCREEN_MOBILE] = "mobile", $(function () {
        function b() {
            return $(".product img[data-role=lazyload]")
        }

        b().each(a), $(window).on([window.EVENT_CHANGE_SCREEN_TYPE, window.EVENT_CATALOG_LIST_IS_LOADED, window.EVENT_CONFIGURATOR_CATALOG_IS_LOADED, window.EVENT_AVAILS_MODAL_CONTENT_LOADED, window.EVENT_RELATED_FOR_PRODUCT_CARD_LOADED, window.EVENT_PRODUCTS_LOADED].join(" "), function () {
            b().each(a)
        })
    })
}), function (a, b, c) {
    b(function () {
        function a() {
            d.val().length ? e.parent().show() : e.parent().hide()
        }

        var c = b("#b-service-center-search");
        if (0 !== c.length) {
            var d = c.find('[name*="[manufacturerId]"]'), e = c.find('[name*="[specId]"]'), f = c.find("form");
            d.on("change", function () {
                var c = b(this);
                a(), b.ajax({
                    url: f.data("url"),
                    type: "GET",
                    dataType: "json",
                    data: {manufacturerId: c.val()},
                    success: function (a) {
                        e.html(a.content).show(), b("#select2-servicecentersearchform-specid-container").removeAttr("title").empty(), b("<span/>", {
                            class: "select2-selection__placeholder",
                            text: "Р’СЃРµ РёР·РґРµР»РёСЏ"
                        }).appendTo("#select2-servicecentersearchform-specid-container")
                    }
                })
            }), a()
        }
    })
}(document, jQuery), function (a, b, c) {
    function d(a) {
        var c = k.find(v), d = c.find(w);
        b(x).removeClass("hidden"), c.find(".alert").remove(), d.not("." + a).find(x).addClass("hidden"), u === a && b(x).removeClass("hidden"), j(), h()
    }

    function e() {
        if (c === window.ymaps || c === window.PieChartClusterer)return void loadYandexMaps(function () {
            setTimeout(e)
        });
        var a = n.data("center");
        a === c && (a = "0,0"), q = new ymaps.Map(n.attr("id"), {
            center: a.split(","),
            zoom: 17
        }), s = new PieChartClusterer, n.find(".map-item").each(function () {
            var a = b(this), c = a.find("[data-role=shop-title]").text(), d = a.data("coordinates"),
                e = {preset: "islands#dotIcon", iconColor: a.data("sales-channel-color")};
            a.data("selected") && (e = {
                preset: "islands#redDotIcon",
                zIndex: 1e3
            }), 0 !== d.length && (d = d.split(","), s.add(new ymaps.Placemark(d, {
                balloonContent: a.html(),
                clusterCaption: c
            }, e))), a.remove()
        }), q.geoObjects.add(s), "0,0" === a && q.setBounds(s.getBounds()), q.events.add("sizechange", function () {
            q.setBounds(s.getBounds(), {checkZoomRange: !0})
        }), 0 !== b(w).length && h(), f()
    }

    function f() {
        b.get(b("[data-other-cities-shops-url]").data("other-cities-shops-url")).done(function (a) {
            !1 !== a.result && (t = new PieChartClusterer, b.each(a.data.sites, function (d, e) {
                b.each(a.data.siteCitiesShops[d], function (a, d) {
                    b.each(d, function (a, b) {
                        var d = b.latitude;
                        if (c !== d && 0 !== d) {
                            var f = b.longitude;
                            if (c !== f && 0 !== f) {
                                var g = {preset: "islands#dotIcon", iconColor: e.color},
                                    h = '<div class="map-balloon-content"><a href="' + e.url + '" class="balloon-logo logo-' + e.alias + '" target="_"></a>' + b.name + '<div class="worktime"><p>' + b.worktime + "</p></div></div>",
                                    i = new ymaps.Placemark([d, f], {balloonContent: h, clusterCaption: b.name}, g);
                                t.add(i)
                            }
                        }
                    })
                })
            }), q.geoObjects.add(t))
        })
    }

    function g(a) {
        if (b(z).addClass("hidden"), b(w + ", " + x).removeClass("hidden"), b("mark").each(function () {
                b(this).parent().text(b(this).parent().text())
            }), 0 === a.length)return void b(x).removeClass("hidden");
        var c = [String.escapeRegExp(a), String.escapeRegExp(String.eToYoTransition(a)), String.escapeRegExp(String.switchKeyboard("lat", a)), String.escapeRegExp(String.switchKeyboard("rus", a))],
            d = [];
        for (var e in c)c.hasOwnProperty(e) && d.push("[" + y + '*="' + c[e] + '"]');
        var f = b("[" + y + "]").filter(d.join(", "));
        if (0 === f.length)return b(w + ", " + x).addClass("hidden"), b(z).find(A).text(a).end().removeClass("hidden"), !1;
        b(x).addClass("hidden"), f.each(function () {
            var a = b(this), d = a.closest(x),
                e = a.text().replace(new RegExp("(" + c.join("|") + ")", "gi"), "<mark>$1</mark>");
            a.html(e), d.removeClass("hidden")
        }), j()
    }

    function h() {
        var a = b(x).not(".hidden");
        q.geoObjects.removeAll(), 0 !== a.length && (s.removeAll(), a.each(function () {
            var a = b(this), c = a.closest(w).find(".shop-list-header > .sale-channel").css("color"),
                d = {preset: "islands#dotIcon", iconColor: c},
                e = new ymaps.Placemark([a.data("latitude"), a.data("longitude")], {
                    balloonContent: a.find(B).html(),
                    clusterCaption: a.find(".shop-title").text()
                }, d);
            s.add(e)
        }), q.geoObjects.add(s), q.setBounds(s.getBounds(), {checkZoomRange: !0}), t && q.geoObjects.add(t))
    }

    function i() {
        b(x).not("[data-is-opened=1]").addClass("hidden"), j()
    }

    function j() {
        b(w).each(function () {
            var a = b(this);
            0 === a.find(x).not(".hidden").length ? a.addClass("hidden") : a.removeClass("hidden")
        })
    }

    var k, l, m, n, o, p, q, r, s, t, u = "all", v = ".shop-groups", w = ".shop-list", x = ".shop-list-item",
        y = "data-search-data", z = '[data-role="empty-result"]', A = ".search-string", B = ".map-balloon-container";
    b(function () {
        n = b("#b-shop-map"), 0 !== n.length && (m = b('[data-role="map-block"]'), o = m.find('[data-role="map-toggle"]'), e(), o.click(function () {
            return !0 === m.hasClass("active") ? (m.removeClass("active"), o.html('РџРѕРєР°Р·Р°С‚СЊ РєР°СЂС‚Сѓ <i class="chevron"></i>')) : (m.addClass("active"), o.html('РЎРєСЂС‹С‚СЊ РєР°СЂС‚Сѓ <i class="chevron"></i>')), q.container.fitToViewport(), q.setBounds(s.getBounds(), {checkZoomRange: !0}), !1
        }), p = b('[data-role="shop-search-field"]'), r = b(z), p.on(["keyup", "change", "keydown"].join(" "), function (a) {
            var c = b(this);
            27 === a.keyCode && c.val("");
            var d = c.val();
            d = d.toLowerCase().trim(), g(d), h()
        }), b('[data-role="city-shops-page"]').shopFilters({
            applyFilters: function () {
                j(), h()
            }, changeStatus: function () {
                j(), h()
            }, showOpenedShops: function () {
                i()
            }
        }), b('[data-role="mobile-tabs"]').on("click", "a", function () {
            var a = b(this).attr("aria-controls");
            b("[data-tab-content]").removeClass("hidden-sm hidden-xs").not('[data-tab-content="' + a + '"]').addClass("hidden-sm hidden-xs")
        }), k = b("#city-shop"), l = k.find(".shop-type-select"), k.find(".shop-types-btns .type").on("click", function () {
            var a = b(this), c = a.data("type");
            a.siblings().removeClass("active"), a.toggleClass("active"), a.hasClass("active") ? l.val(c) : (k.find(".shop-types-btns .type[data-type=" + u + "]").addClass("active"), l.val(u), c = u), d(c)
        }), l.on("change", function () {
            k.find(".shop-types-btns .type[data-type=" + b(this).val() + "]").addClass("active").siblings().removeClass("active"), l.not(this).val(b(this).val()), d(b(this).val())
        }))
    })
}(document, jQuery), function (a, b, c) {
    b(a).ready(function () {
        var a = b("[data-role=city-shops-page]");
        0 !== a.length && b("[data-role=to-feedback-block]", a).on("click", function () {
            var c = b(".feedback-block", a);
            0 !== c.length && b("html, body").animate({scrollTop: c.offset().top - 60}, 300)
        })
    })
}(document, jQuery), function (a, b) {
    b(function () {
        var a = b("[data-role=shop-cities-page]");
        0 !== a.length && a.on("click", ".letter", {container: a}, c)
    });
    var c = function (a) {
        var c = b(this);
        if (!c.parent().hasClass("active")) {
            var d = a.data.container, e = d.find(".cities"), f = d.find(".city-list li"), g = c.data("letter"),
                h = d.find(".cities-letters li");
            e.filter(".hide").removeClass("hide"), h.filter(".active").removeClass("active"), c.parent().addClass("active"), f.removeClass("hide"), 0 !== g.length && (f.not('[data-city-letter="' + g + '"]').addClass("hide"), e.each(function () {
                var a = b(this);
                0 === a.find(".city-list li:not(.hide)").length && a.addClass("hide")
            }))
        }
    }
}(document, jQuery), $(document).ready(function () {
    $('[data-check-input="check-latin-symbols-entry"]').keyup(function (a) {
        var b = $(this);
        b.siblings(".check-latin-symbols-entry-message").remove(), b.val().match(/[a-zA-Z]/) && b.after("<p class='help-block check-latin-symbols-entry-message help-block-warning'>РњС‹ СЂР°Р±РѕС‚Р°РµРј С‚РѕР»СЊРєРѕ СЃ СЂРµР·РёРґРµРЅС‚Р°РјРё Р Р¤</p>")
    })
}), function (a) {
    a(document).ready(function () {
        a('[data-role="contractor-info-container"]').length && a('[data-role="contractor-info-container"]').on("show.bs.collapse", function () {
            var b = a(this);
            if (!b.data("loading")) {
                b.data("loading", !0);
                var c = b.find(".info-wrap"), d = b.find(".loading-dots");
                d.show(), c.html("");
                var e = '<div class="alert alert-info">РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё РІС‹РїРѕР»РЅРµРЅРёРё Р·Р°РїСЂРѕСЃР°. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div>';
                a.get(b.data("url")).done(function (a) {
                    if (!1 === a.result)return void c.html(e);
                    c.html(a.html)
                }).fail(function () {
                    c.html(e)
                }).always(function () {
                    b.data("loading", !1), d.hide()
                })
            }
        })
    })
}(jQuery), function (a) {
    a.fn.profileTicketsLoad = function () {
        a(document).on("click", ".load-more-tickets", function (b) {
            b.preventDefault();
            var c = a(this), d = c.data("url"), e = a(".load-more-tickets-btn-wrap");
            return c.siblings(".alert").remove(), c.hide(), e.prepend('<div class="loading-dots"><span></span><span></span><span></span><span></span></div>'), a.ajax({
                url: d,
                cache: !1,
                dataType: "JSON",
                success: function (a) {
                    e.replaceWith(a.html)
                },
                error: function () {
                    e.prepend('<div class="alert alert-danger">РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ СЃРѕРѕР±С‰РµРЅРёСЏ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div>'), a(".loading-dots", e).remove(), c.show()
                }
            }), !1
        })
    }
}(jQuery), function (a) {
    a.fn.profileOrdersBlock = function () {
        function b() {
            var b = a("<div />").addClass("deleted-order alert alert-warning col-xs-12 row"),
                c = a("<div />").addClass("col-sm-7 order-number").html('Р—Р°РєР°Р· <span data-role="order-number"></span> СѓРґР°Р»С‘РЅ'),
                d = a("<a />").attr("data-role", "restore-button").html("<i></i><span>Р’РµСЂРЅСѓС‚СЊ СѓРґР°Р»С‘РЅРЅС‹Р№ Р·Р°РєР°Р·</span>"),
                e = a("<div />").addClass("col-sm-5 restore-wrapper").append(d);
            return b.append(c, e), b
        }

        a(".order-item").each(function () {
            var b = a(this).find(".order-info").outerHeight();
            a(this).find(".indent").css("min-height", b)
        }), a(document).on("click touchstart", ".order-type-link", function (b) {
            b.preventDefault();
            var c = a(".status-filter", ".user-orders-filter-form");
            return a(".order-type-link").removeClass("active"), a(this).addClass("active"), c.val(a(this).data("status")), a(".user-orders-filter-form").trigger("submit"), !1
        }), a(document).on("click touchstart", ".order-search-input-button", function () {
            a(".user-orders-filter-form").trigger("submit")
        }), a(document).on("click touchstart", ".order-date-input-button", function () {
            a("input[name=" + a(this).data("input-name") + "]").trigger("focus")
        }), a(document).on("change submit", ".user-orders-filter-form", function (b) {
            b.preventDefault();
            var c = a(".user-orders-filter-form").data("url"), d = a(this).serialize(),
                e = a(".overflow-orders", "[data-role=order-list]"), f = a("[data-role=order-list]");
            return e.removeClass("hide"), a.ajax({
                url: c + "?" + d, cache: !1, dataType: "JSON", success: function (b) {
                    var c = a(b.html);
                    c.find('[data-toggle="tooltip"]').tooltip({
                        container: "body",
                        placement: "bottom"
                    }), c.postOrderPaymentWidget(), f.empty().append(c), a(".order-item").each(function () {
                        var b = a(this).find(".order-info").outerHeight();
                        a(this).find(".indent").css("min-height", b)
                    }), a(document).trigger(window.EVENT_INIT_POPOVERS)
                }, error: function () {
                    f.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ Р·Р°РєР°Р·С‹. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div></div>')
                }, complete: function () {
                    e.addClass("hide")
                }
            }), !1
        }), a(document).on("click", ".load-more-orders", function (b) {
            b.preventDefault();
            var c = a(this).data("url"), d = a(this), e = a(".load-more-orders-btn-wrap");
            return d.siblings(".alert").remove(), d.hide(), e.prepend('<div class="loading-dots"><span></span><span></span><span></span><span></span></div>'), a.ajax({
                url: c,
                cache: !1,
                dataType: "JSON",
                success: function (b) {
                    var c = a(b.html);
                    c.find('[data-toggle="tooltip"]').tooltip({
                        container: "body",
                        placement: "bottom"
                    }), c.postOrderPaymentWidget(), e.replaceWith(c), a(document).trigger(window.EVENT_INIT_POPOVERS)
                },
                error: function () {
                    e.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ Р·Р°РєР°Р·С‹. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div></div>'), a(".loading-dots", e).remove(), d.show()
                }
            }), !1
        }), a(document).on("click", ".cancel-button-confirm", function () {
            var b = a(".overflow-orders", "[data-role=order-list]"), c = a("[data-role=order-list]"),
                d = a(this).attr("href"), e = a(".user-orders-filter-form");
            return b.removeClass("hide"), a.ajax({
                url: d + "&" + e.serialize(),
                cache: !1,
                dataType: "JSON",
                success: function (b) {
                    if (!0 === b.result) {
                        var d = a(b.html);
                        d.find('[data-toggle="tooltip"]').tooltip({
                            container: "body",
                            placement: "bottom"
                        }), d.postOrderPaymentWidget(), c.empty().append(d), a(document).trigger(window.EVENT_INIT_POPOVERS)
                    } else c.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">' + (b.message ? b.message : "РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РјРµРЅРёС‚СЊ Р·Р°РєР°Р·. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.") + "</div></div>")
                },
                error: function () {
                    c.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РјРµРЅРёС‚СЊ Р·Р°РєР°Р·. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div></div>')
                },
                complete: function () {
                    b.addClass("hide")
                }
            }), !1
        }), a(document).on("click", '[data-role="delete-button-confirm"]', function () {
            var c = a("[data-role=order-list]"), d = a(this).attr("href"), e = a(this).closest(".order-item");
            return e.addClass("removing"), a.ajax({
                url: d,
                method: "post",
                cache: !1,
                dataType: "JSON",
                success: function (d) {
                    if (!0 === d.result) {
                        var f = a(document).find("#deleted-order-" + d.data.id);
                        0 === f.length && (f = b(), f.attr("id", "deleted-order-" + d.data.id).find('[data-role="restore-button"]').attr("href", e.data("restore-url")).end().find('[data-role="order-number"]').html(d.data.number).end().find('[data-role="restore-button"]').data("id", d.data.id).data("type_id", d.data.type_id), e.after(f)), f.removeClass("hidden"), e.addClass("hidden"), a(document).trigger(window.EVENT_INIT_POPOVERS)
                    } else c.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">' + (d.message ? d.message : "РќРµ СѓРґР°Р»РѕСЃСЊ СѓРґР°Р»РёС‚СЊ Р·Р°РєР°Р·. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.") + "</div></div>")
                },
                error: function () {
                    c.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">РќРµ СѓРґР°Р»РѕСЃСЊ СѓРґР°Р»РёС‚СЊ Р·Р°РєР°Р·. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div></div>')
                },
                complete: function () {
                    e.removeClass("removing")
                }
            }), !1
        }), a(document).on("click", '[data-role="restore-button"]', function () {
            var b = a(".overflow-orders", "[data-role=order-list]"), c = a("[data-role=order-list]"),
                d = a(this).attr("href");
            return b.removeClass("hide"), a.ajax({
                url: d,
                data: {order_guid: a(this).data("id"), type_id: a(this).data("type_id")},
                cache: !1,
                method: "post",
                dataType: "JSON",
                success: function (b) {
                    !0 === b.result ? (1 === a(document).find("#order-" + b.data.id).length && (a(document).find("#order-" + b.data.id).removeClass("hidden"), a(document).find("#deleted-order-" + b.data.id).addClass("hidden")), a(document).trigger(window.EVENT_INIT_POPOVERS)) : c.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">' + (b.message ? b.message : "РќРµ СѓРґР°Р»РѕСЃСЊ РІРѕСЃСЃС‚Р°РЅРѕРІРёС‚СЊ Р·Р°РєР°Р·. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.") + "</div></div>")
                },
                error: function () {
                    c.prepend('<div class="col-xs-12 row"><div class="alert alert-danger">РќРµ СѓРґР°Р»РѕСЃСЊ РІРѕСЃСЃС‚Р°РЅРѕРІРёС‚СЊ Р·Р°РєР°Р·. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.</div></div>')
                },
                complete: function () {
                    b.addClass("hide")
                }
            }), !1
        }), a("[data-role=order-list]").postOrderPaymentWidget(), a(document).on("click", "[data-role=show-postamat-modal]", function () {
            var b = a("#postamat-info-modal"), c = a(this), d = "postamat-map-" + a.now();
            b.find(".map").remove(), b.find(".modal-title").html(c.data("postamat-name"));
            var e = b.find(".modal-body > .info"), f = {
                place: c.data("postamat-placement"),
                metro: c.data("postamat-metro"),
                payment: c.data("postamat-payment"),
                address: c.data("postamat-address"),
                landmark: c.data("postamat-landmark"),
                worktime: c.data("postamat-worktime") + " (" + (1 === c.data("postamat-opened") ? "РѕС‚РєСЂС‹С‚Рѕ" : "Р·Р°РєСЂС‹С‚Рѕ") + " / " + c.data("postamat-waiting") + ")"
            }, g = a('<div class="row"></div>');
            "" !== f.metro && g.append('<div class="col-md-5"><p><b>Р‘Р»РёР¶Р°Р№С€РµРµ РјРµС‚СЂРѕ:</b> ' + f.metro + "</p></div>"), "" !== f.address && g.append('<div class="col-md-7"><p><b>РђРґСЂРµСЃ:</b> ' + f.address + "</p></div>"), "" !== f.payment && g.append('<div class="col-md-5"><p><b>РЎРїРѕСЃРѕР± РѕРїР»Р°С‚С‹:</b> ' + f.payment + "</p></div>"), "" !== f.worktime && g.append('<div class="col-md-7"><p><b>Р’СЂРµРјСЏ СЂР°Р±РѕС‚С‹:</b> ' + f.worktime + "</p></div>"), "" !== f.place && g.append('<div class="col-md-12"><p><b>Р Р°СЃРїРѕР»РѕР¶РµРЅРёРµ:</b> ' + f.place + "</p></div>"), "" !== f.landmark && g.append('<div class="col-md-12"><p><b>РљР°Рє РґРѕР±СЂР°С‚СЊСЃСЏ:</b> ' + f.landmark + "</p></div>"), e.html(g), e.after('<div id="' + d + '" class="map"></div>'), b.on("shown.bs.modal", function () {
                b.find(".modal-dialog").addClass("shown")
            }), b.find("[data-role=hide-modal]").on("click", function () {
                b.find(".modal-dialog").removeClass("shown"), setTimeout(function () {
                    b.modal("hide")
                }, 200)
            }), b.modal("show"), loadYandexMaps(function () {
                var a = c.data("postamat-latitude"), e = c.data("postamat-longitude"), f = new ymaps.Map(d, {
                        zoom: 17,
                        controls: ["zoomControl", "fullscreenControl", "trafficControl"],
                        behaviors: ["default", "scrollZoom"],
                        center: [a, e]
                    }), g = b.find('[class*="site-color-"]').css("color"),
                    h = new ymaps.Placemark([a, e], {}, {preset: "islands#icon", iconColor: g});
                f.geoObjects.add(h)
            })
        }), a("[data-role=order-list]").on("blur", 'a[data-toggle="tooltip"]', function () {
            a('a[data-toggle="tooltip"]').tooltip("hide")
        })
    }
}(jQuery), function (a) {
    a(document).ready(function () {
        a(".profile-prozapass-widget .register-btn").on("click", function () {
            var b = a(this), c = b.data("ajax-register-url"), d = b.data("register-form-url");
            return a.ajax({
                url: c, cache: !1, success: function (a) {
                    !0 === a.result ? b.replaceWith('<div class="alert alert-success">' + a.message + "</div>") : window.location.href = d
                }, error: function () {
                    b.replaceWith('<div class="alert alert-danger">РџСЂРѕРёР·РѕС€Р»Р° РЅРµРёР·РІРµСЃС‚РЅР°СЏ РѕС€РёР±РєР°. РќРµРІРѕР·РјРѕР¶РЅРѕ Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ РІ ProZaPass.</div>')
                }
            }), !1
        })
    })
}(jQuery), function (a) {
    a.fn.profileUpdateForm = function () {
        function b(a, b) {
            return '<div class="result-message ' + (!0 === a ? "success" : "error") + '">' + b + "</div>"
        }

        function c(c) {
            a.ajax({
                type: "POST", url: m, cache: !1, dataType: "json", data: {phone: c}, success: function (a) {
                    !0 === a.result && (i.data(e, c), i.data(f, 1), j.addClass(d), k.addClass(g), k.after(b(!0, "РќРѕРјРµСЂ С‚РµР»РµС„РѕРЅР° СѓСЃРїРµС€РЅРѕ РѕР±РЅРѕРІР»РµРЅ.")))
                }, error: function () {
                    k.after(b(!1, "РќРµ СѓРґР°Р»РѕСЃСЊ РѕР±РЅРѕРІРёС‚СЊ РёРЅС„РѕСЂРјР°С†РёСЋ Рѕ РІР°С€РµРј С‚РµР»РµС„РѕРЅРµ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ."))
                }, always: function () {
                }
            })
        }

        var d = "hidden", e = "initial-value", f = "approved", g = "approved", h = a(this),
            i = a("#about-me-form-phonenumber", h), j = a(".phone-confirm-btn", h), k = i.siblings(".status-icon"),
            l = j.data("url"), m = j.data("update-phone-url"), n = a("#about-me-form-email", h),
            o = a(".email-confirm-btn", h), p = n.siblings(".status-icon"), q = o.data("url");
        h.on("submit", function () {
            var a = n.val().trim().toLowerCase(), b = n.data(e), c = n.data(f);
            return "" === a || a === b || !c || confirm("РР·РјРµРЅРµРЅРёРµ e-mail Р°РґСЂРµСЃР° РІСЃС‚СѓРїРёС‚ РІ СЃРёР»Сѓ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ РµРіРѕ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ.")
        }), i.on("keyup", function () {
            return a(this).siblings(".result-message").remove(), 11 != a(this).val().replace(/[^\d]/g, "").length ? (j.addClass(d), k.removeClass(g), !1) : a(this).val().replace(/[^\d]/g, "") != a(this).data(e) ? (j.removeClass(d), k.removeClass(g), !1) : a(this).data(f) ? (j.addClass(d), k.addClass(g), !1) : void 0
        }), n.on("keyup", function () {
            a(this).siblings(".result-message").remove();
            var b = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return "" != a(this).val() && b.test(a(this).val()) ? a(this).val() != a(this).data(e) ? (o.removeClass(d), p.removeClass(g), !1) : a(this).data(f) ? (o.addClass(d), p.addClass(g), !1) : void 0 : (o.addClass(d), p.removeClass(g), !1)
        }), o.on("click", function (c) {
            c.preventDefault();
            var d = n.val().trim().toLowerCase();
            return n.siblings(".result-message").remove(), (d != n.data(e) || !n.data(f)) && (!n.prop("readOnly") && (n.prop("readOnly", !0), a.ajax({
                type: "POST",
                url: q,
                cache: !1,
                dataType: "json",
                data: {email: d},
                success: function (a) {
                    !0 === a.result ? p.after(b(!0, a.message)) : "" !== a.message && p.after(b(!1, a.message))
                },
                error: function () {
                    p.after(b(!1, "РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ."))
                },
                always: function () {
                    n.prop("readOnly", !1)
                }
            }), !1))
        }), j.on("click", function (d) {
            d.preventDefault();
            var g = i.val().replace(/[^\d]/g, "");
            return i.siblings(".result-message").remove(), (g != i.data(e) || !i.data(f)) && (a.ajax({
                type: "POST",
                url: l,
                cache: !1,
                dataType: "json",
                data: {phone: g},
                success: function (d) {
                    if (!0 === d.result)if (d.data.phone_already_confirmed) k.after(b(!0, "РўРµР»РµС„РѕРЅ СѓР¶Рµ РїРѕРґС‚РІРµСЂР¶РґРµРЅ.")); else {
                        var e = a(d.html).modal();
                        e.modal().SmsConfirm({
                            callback: function (a) {
                                e.modal("hide"), a && c(g)
                            }
                        })
                    } else"" !== d.message && k.after(b(!1, d.message))
                },
                error: function () {
                    k.after(b(!1, "РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ С‚РµС…РЅРёС‡РµСЃРєСѓСЋ РїРѕРґРґРµСЂР¶РєСѓ."))
                }
            }), !1)
        })
    }, a(function () {
        var b = {placement: "right"};
        window.checkScreenType(window.SCREEN_MOBILE) && (b.placement = "top"), a("#about-me-form").find('[data-toggle="tooltip"]').tooltip(b)
    })
}(jQuery), function (a, b, c) {
    var d = "#profile-subscriptions";
    b(function () {
        d = b(d), 0 !== d.length && d.find('[data-role="profile-subscription-toggle"]').on("click", function () {
            var a = b(this);
            return b.ajax({
                url: a.attr("href"), type: "POST",
                dataType: "JSON", success: function (b) {
                    !0 === b.active ? a.text("РІС‹РєР»") : a.text("РІРєР»СЋС‡РёС‚СЊ")
                }, error: function (a) {
                    alert(a.responseText)
                }
            }), !1
        })
    })
}(document, jQuery), $(document).ready(function () {
    $(".menu-profile li.active").parents("li").addClass("active").find(".list-group-item:first").click();
    var a = {};
    a[$('META[name="csrf-param"]').attr("content")] = $('META[name="csrf-token"]').attr("content"), $(".btn-subscription").click(function () {
        var b = $(this);
        return $.ajax({
            type: "POST", cache: !1, data: a, url: b.data("subscription-url"), success: function (a) {
                b.closest("[data-role=switched]").setNextState()
            }
        }), !1
    })
}), $(document).ready(function () {
    $(".vacancy-direct-link").click(function () {
        return window.prompt("", $(this).data("link")), !1
    })
}), function (a) {
    function b(b, d) {
        this.$img = b instanceof a ? b : a(b), this.data = this.validate(d);
        var e = this;
        this.$img.parent().on("mouseleave", function () {
            e._isVisible = !1, e.$lensWrap && e.hide()
        }), this.$img.on("hover mouseenter", this._onHover.bind(this)), this.hide(), c.push(this)
    }

    var c = [];
    Function.prototype.bind || (Function.prototype.bind = function () {
        var a = arguments[0], b = [];
        b.push(arguments), b.splice(0, 1);
        var c = this;
        return function () {
            return Array.prototype.push.apply(b, arguments), c.apply(a, b)
        }
    });
    var d = b.prototype;
    d.validate = function (b) {
        return b || (b = {}), b.drawIn || (b.drawIn = a(document.body)), b.drawIn instanceof a || (b.drawIn = a(b.drawIn)), b.viewContainer || (b.viewContainer = a(document.body)), b.viewContainer instanceof a || (b.viewContainer = a(b.viewContainer)), b.zoom || (b.zoom = 1), b.zoomStep || (b.zoomStep = .1), b.defaultZoom = b.zoom, b.minZoom || (b.minZoom = .5), b.maxZoom || (b.maxZoom = 3), b.containerWidth || (b.containerWidth = void 0), b.srcImgContainerWidth = parseInt(b.srcImgContainerWidth), b
    }, d.render = function () {
        return this.$lensWrap = a('<div class="zoomer-lens-wrap" />').css({position: "absolute"}), this.$lens = a('<div class="zoomer-lens"></div>'), this.$lensImg = a('<img src="' + this.$img.attr("src") + '">'), this.$lensImg.css({position: "absolute"}), this.$lens.append(this.$lensImg), this.$lens.css({
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "hidden"
        }), this.$lensWrap.append(this.$lens), this.$el = a('<img src="' + this.$img.data("full") + '" />')
    }, d.remove = function () {
        this.$lens && this.$lens.remove(), this.$lensImg && this.$lensImg.remove(), this.$lensWrap && this.$lensWrap.remove(), this.$el && this.$el.remove()
    }, d.show = function () {
        this.data.viewContainer.show(), this.data.drawIn.append(this.$el), this.$img.after(this.$lensWrap)
    }, d.hide = function () {
        this.data.viewContainer.hide(), this.$el && this.$el.remove(), this.$el = null, this.$lensWrap && this.$lensWrap.remove()
    }, d._calcPre = function () {
        this.pos = {x: 0, y: 0}, this.sizeFactor = {
            width: this.$el.width() / this.$img.width(),
            height: this.$el.height() / this.$img.height()
        }, this.imgData = {
            width: this.$img.width(),
            height: this.$img.height(),
            left: this.$img.offset().left,
            top: this.$img.offset().top
        }, this.$lensWrap.css({
            left: this.data.srcImgContainerWidth ? (this.data.srcImgContainerWidth - this.$img.width()) / 2 : this.$img.position().left,
            top: this.$img.position().top,
            width: this.$img.width(),
            height: this.$img.width()
        }), this.$lensImg.css({width: this.$img.width(), height: this.$img.height()})
    }, d.recalc = function () {
        if (!(this.$el instanceof a) || 0 == this.$el.length)return !1;
        if (!(this.$lens instanceof a) || 0 == this.$lens.length)return !1;
        if (!(this.$lensImg instanceof a) || 0 == this.$lens.length)return !1;
        if (!(this.imgData instanceof Object))return !1;
        if (isNaN(parseInt(this.imgData.width)))return !1;
        if (isNaN(parseInt(this.imgData.height)))return !1;
        if (isNaN(parseInt(this.imgData.left)))return !1;
        if (isNaN(parseInt(this.imgData.top)))return !1;
        var b = this.lensFactor = {
            width: this.data.drawIn.width() / this.$el.width(),
            height: this.data.drawIn.height() / this.$el.height()
        };
        this.$el.width() < this.data.drawIn.width() && this.$el.width(this.data.drawIn.width());
        var c, d;
        this.$lens.width(c = b.width * this.imgData.width), this.$lens.height(d = b.height * this.imgData.height);
        var e = {
            left: Math.max(Math.min(this.pos.x - c / 2, this.imgData.width - c), 0),
            top: Math.max(Math.min(this.pos.y - d / 2, this.imgData.height - d), 0)
        };
        this.$lens.css(e), this.$el.css({
            marginLeft: -e.left * this.sizeFactor.width,
            marginTop: -e.top * this.sizeFactor.height
        }), this.$lensImg.css({
            left: -e.left - parseFloat(this.$lens.css("border-left-width")),
            top: -e.top - parseFloat(this.$lens.css("border-top-width"))
        })
    }, d.delegateEvents = function () {
        this.$lensWrap.on("mouseleave", this._onLeave.bind(this)), this.$lensWrap.on("mousemove", this._onMove.bind(this)), a(window).scroll(this._scrollingFn = this.recalc.bind(this))
    }, d.undelegateEvents = function () {
        this.$lensWrap.off("mousemove"), this.$lensWrap.off("mouseleave"), a(window).off("scroll", this._scrollingFn)
    }, d._onHover = function () {
        if (void 0 === this.$el || null == this.$el) {
            this.closeAll(), this.data.zoom = this.data.defaultZoom, this.render(), this.delegateEvents();
            var a = this;
            this._isVisible = !0, this.$el.load(function () {
                if (!0 === a._isVisible)return a.show(), a._calcPre(), a.recalc(), a.lensFactor.width >= 1 && a.lensFactor.height >= 1 ? a._onLeave() : void 0
            })
        }
    }, d._onLeave = function () {
        this._isVisible = !1, this.hide(), this.undelegateEvents(), this.remove()
    }, d._onMove = function (b) {
        var c = b.clientX - this.$lensWrap.offset().left + a(window).scrollLeft(),
            d = b.clientY - this.$lensWrap.offset().top + a(window).scrollTop();
        this.pos.x = Math.max(Math.min(c, this.$img.width()), 0), this.pos.y = Math.max(Math.min(d, this.$img.height()), 0), this.recalc()
    }, d._onScroll = function (a, b) {
        b = b || a.detail || a.wheelDelta || a.originalEvent.detail || a.originalEvent.wheelDelta;
        var c = b / Math.abs(b);
        this.data.zoom += this.data.zoomStep * c, this.data.zoom < this.data.minZoom && (this.data.zoom = this.data.minZoom), this.data.zoom > this.data.maxZoom && (this.data.zoom = this.data.maxZoom), this.recalc(), a.preventDefault()
    }, d.closeAll = function () {
        for (var a = 0, b = c.length; a < b; ++a)c[a] != this && c[a].hide.call(c[a])
    }, a.fn.zoomer = function (a) {
        this.each(function () {
            new b(this, a)
        })
    }
}(jQuery), window.SELECTOR_POPOVER = '[data-toggle="popover"]', window.EVENT_INIT_POPOVERS = "popovers:init";
var initPopovers = function () {
    $(window.SELECTOR_POPOVER).popover({
        html: !0, content: function () {
            var a = $(this).data("content-target");
            try {
                a = $(a).html()
            } catch (a) {
            }
            return a || $(this).data("content")
        }
    }), $("body").on("blur", window.SELECTOR_POPOVER, function () {
        $(this).popover("hide")
    })
};
$(document).ready(initPopovers), $(window).on(window.EVENT_CATALOG_SCROLL, initPopovers).on(window.EVENT_INIT_POPOVERS, initPopovers).on(window.EVENT_PRODUCTS_LOADED, initPopovers).on(window.EVENT_CATALOG_LIST_IS_LOADED, initPopovers), function (a) {
    a.fn.priceItemAlert = function () {
        var b = {priceItemId: null, modal: null}, c = this, d = {
            init: function () {
                a(c).on("click", ".btn-price-item-alert", function () {
                    var b = a(this).data("id");
                    return b && d.showPopup(b), !1
                }), a("body").on("click", ".price-item-alert .change-city", function () {
                    return a(".price-item-alert .select-city").toggle(), a(".price-item-alert .current-city").toggle(), !1
                }).on("click", ".price-item-alert .return-city", function () {
                    return a(".price-item-alert .select-city").hide(), a(".price-item-alert .current-city").show(), !1
                }).on("click", ".price-item-alert .actions .select_all", function () {
                    return a(".price-item-alert .shops input[type=checkbox]").prop("checked", "checked"), !1
                }).on("click", ".price-item-alert .actions .unselect_all", function () {
                    return a(".price-item-alert .shops input[type=checkbox]").prop("checked", !1), !1
                }).on("change", "#price_item_alert_region_group_id", function () {
                    var b = a("#price_item_alert_region_id"), c = a("#price_item_alert_city_id");
                    b.empty().prop("disabled", !0), c.empty().prop("disabled", !0), a.ajax({
                        type: "POST",
                        url: "/ajax/get-regions/",
                        data: {id: a(this).val()},
                        success: function (c) {
                            if (1 === c.result) {
                                b.append(a("<option/>"));
                                for (var d in c.data)b.append(a("<option/>", {
                                    value: c.data[d].id,
                                    text: c.data[d].title
                                }));
                                b.prop("disabled", !1)
                            }
                        },
                        dataType: "json"
                    })
                }).on("change", "#price_item_alert_region_id", function () {
                    var b = a("#price_item_alert_city_id");
                    b.empty().prop("disabled", !0), a.ajax({
                        type: "POST",
                        url: "/ajax/get-cities/",
                        data: {id: a(this).val()},
                        success: function (c) {
                            if (1 === c.result) {
                                b.append(a("<option/>"));
                                for (var d in c.data)b.append(a("<option/>", {
                                    value: c.data[d].id,
                                    text: c.data[d].title
                                }));
                                b.prop("disabled", !1)
                            }
                        },
                        dataType: "json"
                    })
                }).on("change", "#price_item_alert_city_id", function () {
                    a(".price-item-alert [type='submit']").prop("disabled", !0);
                    var b = a("#price_item_alert_shop_id");
                    b.empty(), a(".price-item-alert .change-city").text(a(":selected", this).text()), a.ajax({
                        type: "POST",
                        url: "/ajax/get-shops/",
                        data: {id: a(this).val()},
                        success: function (c) {
                            if (1 === c.result) {
                                a(".price-item-alert [type='submit']").prop("disabled", !1);
                                for (var d in c.data)b.append(a("<li/>").append(a('<div class="checkbox">').append(a("<input/>", {
                                    type: "checkbox",
                                    name: "shop_id[]",
                                    value: c.data[d].id,
                                    id: "alert-shop-id-" + c.data[d].id
                                }).prop("checked", !0)).append(a("<label/>", {for: "alert-shop-id-" + c.data[d].id}).append(c.data[d].title))));
                                a(".price-item-alert .select-city").hide(), a(".price-item-alert .current-city").show()
                            }
                        },
                        dataType: "json"
                    })
                }).on("submit", "form#price-item-alert", function () {
                    return d.postForm(a(this)), !1
                })
            }, showPopup: function (c) {
                var e = d.showModal('<div class="loading-dots"><span></span><span></span><span></span><span></span></div>');
                b.priceItemId = c, b.modal = e, d.loadPopup(c, function (b, c) {
                    b ? a(".modal-body", e).empty().append(c) : e.modal("hide")
                })
            }, showModal: function (b) {
                var c = a("#myPopup");
                return c.is(".modal") && c.remove(), b = '<div class="modal" id="myPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><button type="button" class="btn btn-default modal-close-btn" data-dismiss="modal" aria-hidden="true"><span class="remove" aria-hidden="true"></span></button><div class="modal-header"><h4>РЈРІРµРґРѕРјР»РµРЅРёСЏ Рѕ РїРѕСЃС‚СѓРїР»РµРЅРёРё С‚РѕРІР°СЂР°</h4></div><div class="modal-body">' + b + '</div><div class="modal-footer"></div></div></div></div>', a(b).modal()
            }, loadPopup: function (b, c) {
                a.ajax({
                    url: "/productNotify/ajax/create-form/",
                    type: "GET",
                    dataType: "JSON",
                    data: {productGuid: b},
                    success: function (a) {
                        a.result ? "function" == typeof c && c(!0, a.html) : (alert("РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ, РїРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ."), c(!1))
                    },
                    error: function () {
                        alert("РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ, РїРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ."), c(!1)
                    }
                })
            }, postForm: function (c) {
                var d = a(".buttons button", c),
                    e = a('<div class="loading-dots"><span></span><span></span><span></span><span></span></div>').insertAfter(a(".buttons", c));
                if (d.hide(), !c.data("notification-exists") && 0 === a("[name*=notify_via]", c).filter(":checked").length)return alert("РЈРєР°Р¶РёС‚Рµ РјРµС‚РѕРґ СѓРІРµРґРѕРјР»РµРЅРёСЏ."), e.remove(), d.show(), !1;
                var f = [];
                a("input[name^=shop_id]:checked", c).each(function () {
                    f.push(a(this).val())
                });
                var g = [];
                a("input[name^=subscribe]:checked", c).each(function () {
                    g.push(a(this).val())
                }), a.ajax({
                    type: "POST",
                    url: c.prop("action"),
                    dataType: "json",
                    data: c.serialize(),
                    success: function (a) {
                        e.remove(), 1 == a.result ? (alert(a.message), b.modal && b.modal.modal("hide")) : (d.show(), alert(a.error))
                    },
                    error: function () {
                        alert("РЎРµСЂРІРёСЃ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ, РїРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ.")
                    }
                }), b.priceItemId = null
            }
        };
        d.init()
    }, a(function () {
        a("body").priceItemAlert()
    })
}(jQuery), function (a, b, c) {
    var d;
    b(function () {
        if (d = b("#print-order-notify-content"), 0 !== d.length) {
            var a = d.find("#scheme"), c = a.data("bg-color"), e = a.data("min-x"), f = a.data("min-y"),
                g = a.data("max-x"), h = a.data("max-y");
            a.css({
                width: g - e,
                height: h - f,
                "background-color": c,
                margin: "auto",
                position: "relative"
            }), a.find(".clone").each(function () {
                var a = parseInt(b(this).css("left")), c = parseInt(b(this).css("top"));
                b(this).css({left: a - e, top: c - f})
            })
        }
    })
}(document, jQuery), function (a, b, c) {
    function d() {
        var d = i.data(m);
        if (c !== d) {
            var e, f;
            window.ProductCardTabsData = {}, b.getJSON(d, function (c) {
                for (var d in c)!1 !== c.hasOwnProperty(d) && (e = c[d], window.ProductCardTabsData[d] = {
                    metaTitle: e.metaTitle,
                    metaDescription: e.metaDescription,
                    seoText: e.seoText,
                    header: e.header,
                    breadcrumbs: e.breadcrumbs
                }, d !== i.data("active-tab") && (f = b("#" + d), 0 !== f.length && f.html(e.content).trigger(EVENT_PRODUCT_CARD_TAB_RENDER)));
                b(a).trigger(window.EVENT_INIT_POPOVERS)
            })
        }
    }

    function e(a) {
        b("tbody > tr", a).removeClass("highlight"), b("tbody > tr:not(.hidden):odd", a).addClass("highlight")
    }

    function f() {
        var d = b('[data-role="flix-setup"]');
        if (0 !== d.length && c === d.data("is-initiated")) {
            var e = a.createElement("script");
            e.type = "text/javascript", e.src = d.data("flix-src"), e.dataset.flixDistributor = d.data("flix-distributor"), e.dataset.flixLanguage = d.data("flix-language"), e.dataset.flixBrand = d.data("flix-brand"), e.dataset.flixMpn = d.data("flix-mpn"), e.dataset.flixEan = d.data("flix-ean"), e.dataset.flixSku = d.data("flix-sku"), e.dataset.flixButton = d.data("flix-button"), e.dataset.flixInpage = d.attr("id"), e.dataset.flixButtonImage = d.data("flix-button-image"), e.dataset.flixPrice = d.data("flix-price"), a.getElementsByTagName("head")[0].appendChild(e), d.data("is-initiated", !0)
        }
    }

    function g(d) {
        var e = i.find('[data-tab-name="' + d + '"]'), f = e.find('[data-role="real-tab-link"]').attr("href");
        if (window.history.pushState(null, "", f), void 0 !== window.ProductCardTabsData) {
            var g = void 0 !== window.ProductCardTabsData[d] ? window.ProductCardTabsData[d] : window.ProductCardTabsData.default;
            b(k).text(g.header), a.title = g.metaTitle, b('meta[name="description"]').attr("content", g.metaDescription);
            var j = b(l);
            c !== g.seoText && (0 !== g.seoText.length ? (j.removeClass("hidden"), j.find('[data-role="seo-text"]').text(g.seoText)) : j.addClass("hidden")), h(g.breadcrumbs)
        }
    }

    function h(a) {
        var c, d = b(".breadcrumb");
        d.each(function () {
            var d = b(this);
            d.find("li:last-child").remove();
            for (c in a)if (!1 !== a.hasOwnProperty(c)) {
                var e, f, g = a[c], h = b("<span></span>"), i = "object" == typeof g;
                f = i ? g.label : g, h.text(f), !0 === i && h.wrap(b("<a></a>").attr("href", g.url)), d.find("li span:contains(" + f + ")").closest("li").remove(), e = i ? h.parent() : h, d.append(b("<li></li>").append(e))
            }
        })
    }

    window.EVENT_PRODUCT_CARD_TAB_RENDER = "product-card-tabs:render";
    var i, j, k = 'h1[data-product-param="name"]', l = '[data-role="seo-text-container"]', m = "get-tabs-url", n = 0;
    b(function () {
        i = b("#item-tabs-block");
        var h = i.is("[data-product-tabs]"), k = !1, l = i.data("active-tab"),
            m = i.find('[aria-controls="' + l + '"]');
        0 !== m.length && (n = i.find("li").index(m.parent())), i.responsiveTabs({
            active: n,
            setHash: !1 === h,
            collapsible: "accordion",
            classes: {
                stateDefault: "r-tabs-state-default",
                stateActive: "active",
                stateDisabled: "r-tabs-state-disabled",
                stateExcluded: "r-tabs-state-excluded",
                tab: "r-tabs-tab",
                anchor: "r-tabs-anchor",
                panel: "r-tabs-panel",
                accordionTitle: "r-tabs-accordion-title"
            },
            activate: function (a, d) {
                var e = b(d.selector), f = e.attr("id");
                if (!0 === k && !0 === h && g(f), c === e.data("is-default")) {
                    var l, m = 0, n = 0;
                    window.checkScreenType(window.SCREEN_MOBILE, window.SCREEN_TABLET) ? (l = b(".mobile-top-header"), m = b(d.accordionTab).offset().top - l.height()) : (l = b("#header-search"), !1 === l.hasClass("navbar-fixed-top") && (l.addClass("navbar-fixed-top"), n = l.height()), m = i.offset().top), b("body").scrollTo(m + n)
                } else j = b(".all-characteristics-btn", i), b(window).scroll(function () {
                    if (c !== window.FlixjQ) {
                        b("#description .table-params").position().top + b("#description .table-params").height() < b(this).scrollTop() && b("#vendor-price-item-description").show()
                    }
                }), j.on("click", function () {
                    b("a[aria-controls=characteristics]").trigger("click")
                });
                b(d.selector).trigger("tabSelected")
            },
            load: function () {
                d(), k = !0
            }
        }), e(b("#description .table-params")), f(), i.on(EVENT_PRODUCT_CARD_TAB_RENDER, "#description", function () {
            e(b("#description .table-params")), f(), b(a).on("tabSelected", "#description", function () {
                b("#vendor-price-item-description").show()
            })
        }), i.on("click", "#description .options-primary-switch", function () {
            var a = parseInt(b(this).data("state"));
            return b(".price-item #description .table-params > tbody >tr").removeClass("hidden").filter(function () {
                return parseInt(b(this).data("state")) > a
            }).addClass("hidden"), e(b(".price-item #description .table-params")), a = 3 - a, b(this).data("state", a), 1 === a ? b(this).text("РљСЂР°С‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ") : b(this).text("РџРѕРґСЂРѕР±РЅРѕРµ РѕРїРёСЃР°РЅРёРµ"), !1
        }), i.on("click", "#description .options-group .info-tabs-control a", function () {
            b(this).siblings().each(function () {
                b(this).removeClass("active"), b("#" + b(this).data("target")).addClass("hidden")
            }), b(this).addClass("active"), b("#" + b(this).data("target")).removeClass("hidden")
        }), i.on("click", "#review .show-all-reviews", function () {
            return b(this).closest(".block-group").find(".objects").removeClass("cutted"), b(this).hide(), !1
        });
        var o = i.find("li.active a");
        0 === o.length && (o = i.find("div.active a"))
    })
}(document, jQuery), $(document).ready(function () {
    $(".marks-filter-chechbox .mark-item").click(function () {
        $(this).parents(".marks-filter-chechbox").find('a[data-toggle="dropdown"]').empty().append($(this).clone()).append('<span class="caret"></span>')
    }), $(".add-review-btn").click(function () {
        return $(".add-review-form").toggle(), !1
    }), $(".add-review-form .mark-selector .star-item").click(function () {
        $items = $(this).closest(".mark-line").find(".star-item"), $items.removeClass("active");
        var a = $(this).data("val");
        for (i = 0; i <= a - 1; i++)$items.eq(i).addClass("active");
        $(this).siblings().find("input[type=hidden].rating-val").val(a)
    })
}), function (a) {
    var b, c, d, e;
    a(function () {
        b = a("#configuration-card"), 0 !== b.length && (c = b.find('[data-role="configuration-save"]'), e = c.find('[data-role="configuration-save-btn"]'), d = c.find('[data-role="configuration-save-alert"]'), e.on("click", function () {
            var b = a(this);
            b.prop("disabled") || (b.prop("disabled", !0), a.ajax({
                url: b.data("url"),
                type: "GET",
                dataType: "JSON",
                success: function (a) {
                    if (!1 === a.result)return void alert("РќРµ СѓРґР°Р»РѕСЃСЊ РїСЂРёРјРµРЅРёС‚СЊ РёР·РјРµРЅРµРЅРёСЏ");
                    d.fadeOut(300, function () {
                        d.html("<b>" + a.title + "</b> СЃРѕС…СЂР°РЅРµРЅР°<br>РІ Р’Р°С€РµРј Р»РёС‡РЅРѕРј РєР°Р±РёРЅРµС‚Рµ").fadeIn(300)
                    })
                }
            }))
        }))
    })
}(jQuery), function (a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o;
    a(function () {
        if (b = a("#configuration-preview-page"), 0 !== b.length) {
            c = b.find('[data-role="save-configuration"]'), e = c.find('[data-role="save-configuration-btn"]'), d = c.find('[data-role="save-alert"]'), f = d.find('[data-role="apply-configuration"]'), g = d.find('[name="configuration-title"]'), h = d.find('[name="show-in-profile"]');
            var i = g.val(), j = h.is(":checked");
            e.on("click", function (b) {
                b.preventDefault(), a.getJSON(c.data("save-url"), function (a) {
                    !1 !== a.result && (f.data("guid", a.rsuStatusData.configurationGuid), e.addClass("hidden"), d.removeClass("hidden"))
                })
            }), d.on("change keyup", "input", function () {
                var a = !1;
                i != g.val() && (a = !0), j != h.is(":checked") && (a = !0), a ? (f.prop("disabled", !1), f.text("РџСЂРёРјРµРЅРёС‚СЊ")) : f.prop("disabled", !0)
            }), f.on("click", function () {
                var c = a(this);
                if (!c.prop("disabled")) {
                    c.prop("disabled", !0);
                    var d = g.val(), e = h.is(":checked") ? 1 : 0;
                    a.ajax({
                        url: c.data("url"),
                        type: "POST",
                        data: {guid: c.data("guid"), title: d, showInProfile: e},
                        dataType: "JSON",
                        success: function (f) {
                            if (!1 === f.result)return void alert("РќРµ СѓРґР°Р»РѕСЃСЊ РїСЂРёРјРµРЅРёС‚СЊ РёР·РјРµРЅРµРЅРёСЏ");
                            c.text("РџСЂРёРјРµРЅРµРЅРѕ"), i = d, j = !!e, b.find("h2").fadeOut(300, function () {
                                a(this).text(d).fadeIn(300)
                            }), g.trigger("change")
                        }
                    }).then(function () {
                        g.trigger("change")
                    })
                }
            })
        }
    }), a(function () {
        i = a("#rsu-vendor-controls"), 0 !== i.length && (k = i.find('[data-role="apply-vendor"]'), j = i.find("#vendor-controls-checkbox"), j.on("change", function () {
            j.is(":checked") ? i.find(".controls-element").addClass("active") : i.find(".controls-element").removeClass("active")
        }), k.on("click", function () {
            var b = {
                name: i.find('[name="configuration-name"]').val(),
                pageGuid: i.find('[name="vendor-page"]').val(),
                isVendor: j.is(":checked") ? 1 : 0,
                configurationGuid: k.data("guid")
            }, c = i.find("input, button");
            c.prop("disabled", !0), a.post(k.data("save-url"), b, function (a) {
                !1 !== a.result && c.prop("disabled", !1)
            }, "json")
        }))
    }), a(function () {
        l = a("#rsu-author-controls"), 0 !== l.length && (n = l.find('[data-role="apply-author"]'), m = l.find("#author-controls-checkbox"), m.on("change", function () {
            m.is(":checked") ? l.find(".controls-element").addClass("active") : l.find(".controls-element").removeClass("active")
        }), o = l.find("#configuration-author-nickname"), n.on("click", function () {
            var b = {nickname: o.val(), isAuthor: m.is(":checked") ? 1 : 0, configurationGuid: n.data("guid")},
                c = l.find("input, button"), d = l.find(".error-text");
            c.prop("disabled", !0), o.parent().removeClass("has-success").removeClass("has-error"), d.removeClass("active"), a.post(n.data("save-url"), b, function (a) {
                if (!1 === a.result)return o.parent().addClass("has-error"), d.html(a.error).addClass("active"), void c.prop("disabled", !1);
                l.html("Р’Р°С€Рё РґР°РЅРЅС‹Рµ СЃРѕС…СЂР°РЅРµРЅС‹. Р§С‚РѕР±С‹ СЃС‚Р°С‚СЊ Р°РІС‚РѕСЂРѕРј, Р’С‹ РґРѕР»Р¶РЅС‹ РІС‹РєСѓРїРёС‚СЊ РєРѕРЅС„РёРіСѓСЂР°С†РёСЋ.")
            }, "json")
        }))
    })
}(jQuery), function (a) {
    var b;
    a(function () {
        function c() {
            return parseInt(b.attr("data-current-step"))
        }

        function d(a) {
            b.attr("data-current-step", a), g.filter(":not(.always-shown)").addClass("hidden"), f.addClass("hidden"), e.addClass("hidden"), h.addClass("hidden"), h.find("span").html(a), 0 === a ? f.removeClass("hidden") : i === a ? (g.removeClass("hidden"), e.removeClass("hidden"), h.removeClass("hidden")) : (e.removeClass("hidden"), f.removeClass("hidden"), h.removeClass("hidden"))
        }

        if (b = a("#configurator-tutorial"), 0 !== b.length) {
            var e = b.find("[data-role=go-prev-step]"), f = b.find("[data-role=go-next-step]"),
                g = b.find("[data-role=finish-tutorial]"), h = b.find("[data-role=step-info]"),
                i = parseInt(b.attr("data-steps-count"));
            f.on("click", function () {
                d(c() + 1)
            }), e.on("click", function () {
                d(c() - 1)
            }), g.on("click", function () {
                a.ajax(b.data("finish-url")), b.addClass("hidden")
            }), b.find(".close-link").on("click", function () {
                b.addClass("hidden")
            }), a(document).find("[data-role=show-tutorial]").on("click", function () {
                d(0), b.removeClass("hidden")
            })
        }
    })
}(jQuery), function (a) {
    var b, c, d, e;
    a(function (a) {
        b = a("#top-vendors-configurations-slider"), 0 !== b.length && (c = a("ul", b).owlCarousel({
            items: 1,
            itemsMobile: [479, 1],
            itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, 1],
            itemsDesktopSmall: [window.SCREEN_DESKTOP_MAX_WIDTH, 1],
            itemsDesktop: [window.SCREEN_DESKTOP_MAX_WIDTH, 1],
            pagination: !0,
            rewindNav: !0,
            stopOnHover: !0,
            slideSpeed: 500,
            paginationSpeed: 500,
            rewindSpeed: 500
        }), a(".next", b).click(function () {
            c.trigger("owl.next")
        }), a(".prev", b).click(function () {
            c.trigger("owl.prev")
        }))
    }), a(function (a) {
        d = a("#top-users-configurations-slider"), 0 !== d.length && (e = a("ul", d).owlCarousel({
            items: 1,
            itemsMobile: [479, 1],
            itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, 1],
            itemsDesktopSmall: [window.SCREEN_DESKTOP_MAX_WIDTH, 1],
            itemsDesktop: [window.SCREEN_DESKTOP_MAX_WIDTH, 1],
            pagination: !0,
            rewindNav: !0,
            stopOnHover: !0,
            slideSpeed: 500,
            paginationSpeed: 500,
            rewindSpeed: 500
        }), a(".next", d).click(function () {
            e.trigger("owl.next")
        }), a(".prev", d).click(function () {
            e.trigger("owl.prev")
        }))
    })
}(jQuery), function (a) {
    function b() {
        a(F).addClass(v), a(G).addClass(u), a(H).val("")
    }

    function c() {
        a(F).removeClass(v)
    }

    function d(b, c) {
        var d = b.data(n), e = b.data(l);
        void 0 === j[e] && (j[e] = {});
        var f = j[e], g = k[e];
        void 0 !== g && g.abort(), k[e] = a.getJSON(d, f, function (a) {
            c(a), b.find(C).text(a.totalCount).end().find(D).text(a.compatibleCount).end().trigger(window.EVENT_CONFIGURATOR_CATALOG_IS_LOADED).trigger(window.EVENT_PRODUCTS_LOADED), delete k[e]
        })
    }

    function e() {
        return a("<div><span /><span /><span /><span /></div>").addClass(x)
    }

    function f() {
        a(".tooltip").remove(), a("[" + t + "]").each(function () {
            var b = a(this), c = e().css({"margin-top": "40px"});
            if (b.find("." + y).html(c), !1 === b.hasClass(w))return void b.attr(r, !0);
            d(b, function (a) {
                b.find("." + y).html(a.html)
            })
        }), a([J, E].join(",")).not(K).remove()
    }

    function g() {
        a("[" + p + "]").each(function (b, c) {
            var d = a(c), e = d.data(m), f = a(A + "[" + q + '="' + e + '"]');
            if (f.length < 2)return void f.find(L).remove();
            f.each(function (b, c) {
                var d = a(c), e = d.find(L);
                0 === e.length && (e = a('<span data-role="category-index"></span>'), d.find(M).after(e)), e.text(b + 1), 0 !== b && d.find(N).remove().end().attr(o, "")
            })
        })
    }

    function h(b, c) {
        var d = a(".image-slider", b).owlCarousel(c), e = d.data("owlCarousel");
        return a(".button-right", b).click(function () {
            return e.next(), !1
        }).show(), a(".button-left", b).click(function () {
            return e.prev(), !1
        }).show(), e
    }

    window.EVENT_BEFORE_CONFIGURATION_UPDATE = "rsu-configuration:before-update", window.EVENT_CONFIGURATION_UPDATE = "rsu-configuration:update", window.EVENT_CONFIGURATOR_CATALOG_IS_LOADED = "configurator-catalog:is-loaded", window.EVENT_CONFIGURATOR_PRODUCT_IS_LOADED = "configurator-product:is-loaded";
    var i, j = {}, k = {}, l = "catalog-category-guid", m = "rsu-category-guid", n = "category-products-url",
        o = "data-duplicated-category", p = "data-available-duplication", q = "data-" + m, r = "data-catalog-update",
        s = "data-" + l, t = "data-catalog-loaded", u = "hidden", v = "disabled", w = "expanded", x = "loading-dots",
        y = "category-groups", z = '[data-role="change-product-count"]', A = '[data-role="category-block"]',
        B = '[data-role="configurator-catalog"]', C = '[data-role="catalog-total-count"]',
        D = '[data-role="catalog-compatible-count"]', E = '[data-role="rsu-product-card"]',
        F = '[data-role="share-btn"]', G = '[data-role="shared-link"]', H = '[data-role="configuration-link"]',
        I = "[data-role=selected-filters-count]", J = '[data-id="modal-for-avails"]', K = "#modal-for-avails-template",
        L = '[data-role="category-index"]', M = '[data-role="category-name"]', N = '[data-role="required-marker"]';
    a(function () {
        a(".opinions-transition-link").click(function () {
            a("html, body").animate({scrollTop: a("[data-tab-name=opinion] a").offset().top}, 500), a("[data-tab-name=opinion] a").click()
        }), i = a("#rsu-configurator"), 0 !== i.length && (g(), i.on("click", '[data-role="expand-subcategories"]', function (b) {
            b.preventDefault();
            var c = a(this), d = c.closest(A).find('[data-role="subcategory-block"]');
            c.closest(A).toggleClass(w), d.toggleClass(w), !0 === d.hasClass(w) ? (c.addClass(w), c.hasClass("btn-change") ? c.html("<span>РћС‚РјРµРЅРёС‚СЊ</span>") : c.find("span").text("РЎРІРµСЂРЅСѓС‚СЊ")) : (c.removeClass(w), c.hasClass("btn-change") ? c.html("<i>") : c.find("span").text("Р Р°Р·РІРµСЂРЅСѓС‚СЊ"))
        }), i.on("click", '[data-role="show-catalog"]', function (b) {
            b.preventDefault();
            var c = a(this), f = c.closest(".category-controls").parent(), g = f.next(B),
                h = g.data("catalog-category-url"), i = g.data(l), k = e();
            if (f.parent().toggleClass(w), g.toggleClass(w), !0 === g.hasClass(w) ? (c.addClass(w), c.hasClass("btn-change") ? c.html("<span>РћС‚РјРµРЅРёС‚СЊ</span>") : c.find("span").text("РЎРІРµСЂРЅСѓС‚СЊ")) : (c.removeClass(w), c.hasClass("btn-change") ? c.html("<i>") : c.find("span").text("Р”РѕР±Р°РІРёС‚СЊ")), void 0 !== g.attr(r) && (g.removeAttr(r), d(g, function (a) {
                    g.find("." + y).html(a.html)
                })), a("html, body").animate({scrollTop: f.offset().top}, 500), void 0 !== g.data("catalog-loaded"))return !1;
            j[i] = {f: {rsuCompatibility: "compatible"}}, g.attr(t, !0).append(k), a.getJSON(h, j[i], function (a) {
                function b(a, b, c) {
                    var d = 0;
                    if (c.hasOwnProperty("brand") && void 0 !== c.brand && d++, c.hasOwnProperty(b))for (var e in c[b])c[b].hasOwnProperty(e) && void 0 !== c[b][e] && d++;
                    a.find(I).html(0 === d ? "" : "(" + d + ")")
                }

                k.remove(), g.append(a.html).trigger(window.EVENT_CONFIGURATOR_CATALOG_IS_LOADED).trigger(window.EVENT_PRODUCTS_LOADED);
                var c = g.find(".catalog-filters"), f = c.data("url-param-name");
                b(g, f, j[i]), c.catalogCharacteristicFilters({
                    urlParamName: f,
                    desktopFilterSelector: "[" + s + '="' + i + '"] [data-role="desktop-characteristic-filters"]',
                    mobileFilterSelector: "[" + s + '="' + i + '"] [data-role="menu-filters-aside"]',
                    applyFilters: function (a) {
                        var c = a.closest(B), g = e().css({"margin-top": "40px"}), h = c.find("." + y);
                        h.html(g), d(c, function (a) {
                            b(c, f, j[i]), h.html(a.html)
                        })
                    },
                    changeFilter: function (a, b) {
                        var c = g.data(l);
                        void 0 === j[c] && (j[c] = {});
                        var d = j[c];
                        void 0 === d[f] && (d[f] = {}), d[f][a] = b
                    }
                });
                var h = g.find('[data-role="menu-filters-aside"]');
                0 !== h.length && h.on("click", '[data-role="submit-mobile-filters"]', function () {
                    h.removeClass("shown")
                });
                var m = g.find('[data-role="brand-filter-widget"]');
                m.catalogBrandFilter({
                    urlParamName: m.data("url-param-name"), changeFilter: function (a, b) {
                        var c = g.data(l);
                        void 0 === j[c] && (j[c] = {}), j[c][a] = b
                    }, chooseOneBrand: function (a) {
                        var b = g.data(l);
                        void 0 === j[b] && (j[b] = {}), j[b][m.data("url-param-name")] = a;
                        var c = e().css({"margin-top": "40px"});
                        g.find("." + y).html(c), d(g, function (a) {
                            g.find("." + y).html(a.html)
                        })
                    }
                })
            })
        }), i.on("click", ".configurator-category-data[data-empty-condition]", function (b) {
            var c = ['[data-role="expand-subcategories"]', '[data-role="show-catalog"]', '[data-role="remove"]'].join(",");
            !1 === a(c).is(b.target) && 0 === a(b.target).closest(c).length && a(this).find(c).click()
        }), i.on("click", '[data-role="add-item"]', function (b) {
            b.preventDefault();
            var c = a(this);
            if (void 0 === c.data("in-configuration")) {
                var d = c.closest(B), e = d.closest(A), f = {
                    rsuCategoryGuid: e.data(m),
                    categoryCeGuid: d.data(l),
                    productGuid: c.data("product-guid"),
                    sortIndex: e.data("sort-index")
                };
                a.ajax({
                    url: d.data("add-url"), type: "POST", data: f, dataType: "JSON", beforeSend: function () {
                        e.trigger(window.EVENT_BEFORE_CONFIGURATION_UPDATE)
                    }, success: function (b) {
                        if (!1 !== b.result) {
                            var e = c.closest('[data-role="catalog-product"]'), f = d.closest(A);
                            f.find("[data-in-configuration]").removeAttr("data-in-configuration").text("Р’ РєРѕРјРїР»РµРєС‚"), c.attr("data-in-configuration", !0).text("Р”РѕР±Р°РІР»РµРЅРѕ"), f.find('[data-role="configurator-product-image"]').find("a").remove().end().find("i").addClass(u);
                            var g = e.find(".image").html();
                            f.find('[data-role="configurator-product-image"]').html(g);
                            var h = e.find(".remains").clone(), i = e.find(".product-name").clone();
                            i.find(".compatible-icon").remove();
                            var j = a("<div>").append(i).append(e.find(".product-price").clone().append(h)).html();
                            f.children(".configurator-category-data").removeAttr("data-empty-condition"), f.find('[data-role="configurator-product-data"]').html(j);
                            var k = f.find('[data-role="configurator-controls"]');
                            if (void 0 === k.attr("data-has-product")) {
                                var m = a("<button>").attr("data-role", "remove").addClass("btn btn-link btn-remove").html("<i></i> <span>СѓР±СЂР°С‚СЊ</span>");
                                k.append(m), k.attr("data-has-product", !0)
                            }
                            var n = ['[data-role="show-catalog"]', '[data-role="expand-subcategories"]'].join(", ");
                            if (k.find(n).removeClass("btn-add expanded").addClass("btn-change").html("<i>"), void 0 !== f.data("available-duplication")) {
                                k.find('[data-role="duplicate-category"]').remove();
                                var o = a("<button><i></i></button>").addClass("btn btn-default btn-plus").attr({
                                    "data-role": "duplicate-category",
                                    "data-toggle": "tooltip",
                                    title: "Р”РѕР±Р°РІРёС‚СЊ РµС‰С‘ РѕРґРёРЅ С‚РѕРІР°СЂ"
                                });
                                k.prepend(o)
                            }
                            void 0 !== f.data("available-multiply") && (k.find('[data-role="change-count-buttons"]').remove(), k.prepend(a(b.changeCountHtml))), f.attr(s, d.data(l)).attr("data-product-guid", c.data("product-guid")), d.removeClass(w), f.removeClass(w).find("." + w).removeClass(w).end().find(".configurator-subcategories").removeClass(w).end().find('[data-role="show-catalog"] > span').text("Р”РѕР±Р°РІРёС‚СЊ").end().find(".alert").addClass(u), f.trigger(window.EVENT_CONFIGURATION_UPDATE)
                        }
                    }
                }), a("html, body").animate({scrollTop: e.offset().top}, 200)
            }
        }), i.on("click", '[data-role="remove"]', function (b) {
            b.preventDefault();
            var c = a(this), d = c.closest(A), e = {
                rsuCategoryGuid: d.data(m),
                categoryCeGuid: d.data(l),
                productGuid: d.data("product-guid"),
                sortIndex: d.data("sort-index")
            };
            a.ajax({
                url: d.data("remove-url"), type: "POST", data: e, dataType: "JSON", beforeSend: function () {
                    d.trigger(window.EVENT_BEFORE_CONFIGURATION_UPDATE)
                }, success: function (b) {
                    if (!1 !== b.result) {
                        d.children(".configurator-category-data").attr("data-empty-condition", !0), d.find('[data-role="configurator-product-image"]').html("<i>");
                        var c = d.find('[data-role="configurator-product-data"]'),
                            e = a("<div /><div /><div /><div />").addClass("empty-line");
                        c.html(e), d.removeAttr("data-product-guid").find("[data-in-configuration]").removeAttr("data-in-configuration").text("Р’ РєРѕРјРїР»РµРєС‚").end().find('[data-role="remove"], [data-role="duplicate-category"], [data-role="change-count-buttons"]').remove().end().find(".btn-change").removeClass("btn-change").addClass("btn-add").html("<span>Р”РѕР±Р°РІРёС‚СЊ</span>").end().find('[data-role="configurator-controls"]').removeAttr("data-has-product").end().find(".compatibility-status").removeAttr("data-compatibility-status").end().find(".compatibility-message-mobile").text("").end().find(".category-name").removeClass("error").find(".compatibility-message").text("").end().find(".configuration-message").empty(), d.find(".alert").addClass(u), d.trigger(window.EVENT_CONFIGURATION_UPDATE), a('[data-role="undo-last"]').parent().removeClass(u)
                    }
                }
            })
        }), i.on("click", '[data-role="remove-duplicate-category"]', function () {
            a(this).closest(A).remove(), g()
        }), i.on("click", z, function (b) {
            b.preventDefault();
            var c = a(this), d = c.closest('[data-role="change-count-buttons"]'), e = c.closest(A),
                f = d.data("product-hash"), g = parseInt(d.find('[data-role="product-count"]').data("count")),
                h = parseInt(d.data("max-count")), j = c.data("quantity");
            if (g += j, 1 < g && void 0 !== d.find(z + ".product-count-plus").data("limited-one") && (g = 1), g > h) {
                if (!(0 > j))return void d.find(z + ".product-count-minus").prop("disabled", !1).attr("data-limited", !0);
                g = h
            }
            if (0 >= g)return void c.closest('[data-role="configurator-controls"]').find('[data-role="remove"]').click();
            i.find(z).prop("disabled", !0), a.ajax({
                url: d.data("change-count-url"),
                type: "POST",
                data: {productHash: f, count: g},
                dataType: "JSON",
                beforeSend: function () {
                    e.trigger(window.EVENT_BEFORE_CONFIGURATION_UPDATE)
                },
                success: function (a) {
                    if (!1 === a.result)return void i.find(z).not("[data-limited]").prop("disabled", !1);
                    d.find('[data-role="product-count"]').data("count", g).val(g), d.closest(A).find('[data-role="alert-limits-share"]').remove(), g === h ? d.find(z + ".product-count-plus").prop("disabled", !0).attr("data-limited", !0).end().closest(A).find('[data-role="alert-limits"]').removeClass(u) : d.find(z + ".product-count-plus").prop("disabled", !0).removeAttr("data-limited").end().closest(A).find('[data-role="alert-limits"]').addClass(u), i.find(z).not("[data-limited]").prop("disabled", !1), d.data("product-hash", a.hash).trigger(window.EVENT_CONFIGURATION_UPDATE)
                },
                error: function () {
                    i.find(z).not("[data-limited]").prop("disabled", !1)
                }
            })
        }), i.on("click", '[data-role="duplicate-category"]', function () {
            var b = a(this), c = b.closest(A), d = c.data(m), e = A + "[" + q + '="' + d + '"]', f = i.find(e), h = 0;
            f.each(function () {
                h = Math.max(h, a(this).data("sort-index"))
            });
            var j = c.clone(), k = a("<div /><div /><div /><div />").addClass("empty-line"),
                l = j.find(".btn-change").clone(),
                n = a("<button />").addClass("btn btn-link btn-remove").attr("data-role", "remove-duplicate-category").attr("data-toggle", "tooltip").attr("title", "РЈРґР°Р»РёС‚СЊ РєР°С‚РµРіРѕСЂРёСЋ").html("<i></i>&nbsp;<span>СѓР±СЂР°С‚СЊ</span>"),
                o = "expand-subcategories" === l.data("role") ? "Р Р°Р·РІРµСЂРЅСѓС‚СЊ" : "Р”РѕР±Р°РІРёС‚СЊ";
            l.removeClass("btn-change").addClass("btn-add").removeAttr("id").html("<span>" + o + "</span>"), j.attr("data-sort-index", h + 1).attr(s, "").attr("data-product-guid", "").find(".category-name").removeClass("error").end().find('[data-role="compatibility-status-icon"]').attr("data-compatibility-status", "").end().find(".compatibility-message").html("").end().find(".compatibility-message-mobile").html("").end().find('[data-role="configurator-product-image"]').html("<i>").end().find('[data-role="configurator-product-data"]').html(k).end().find('[data-role="configurator-controls"]').removeAttr("data-has-product").html("").append(l, n).end().find(B).removeAttr(t).html("").end().find(".alert").addClass(u).end().find(".configuration-message").empty().end().children(".configurator-category-data").attr("data-empty-condition", !0), f.last().after(j), g(), a("html, body").animate({scrollTop: j.offset().top}, 500)
        }), i.on("click", '[role="menu"] a', function (b) {
            b.preventDefault();
            var c = a(this), f = c.closest('[data-role="ordering-dropdown"]'), g = c.closest(B), h = g.data(l),
                i = f.attr("id");
            void 0 === j[h] && (j[h] = {});
            var k = j[h];
            k[i] = c.attr("tabindex"), k.offset = 0, f.find('[data-toggle="dropdown"]').filter(":not(.mobile)").text(c.text());
            var m = e().css({"margin-top": "40px"}), n = g.find("." + y);
            n.html(m), d(g, function (a) {
                n.html(a.html)
            })
        }), i.on("click", '[data-role="show-more-products"]', function (b) {
            b.preventDefault();
            var c = a(this), f = c.closest(B), g = e(), h = f.find("." + y), i = f.data(l);
            void 0 === j[i] && (j[i] = {}), j[i].offset = c.data("offset"), c.parent().remove(), h.append(g), d(f, function (a) {
                g.remove(), h.append(a.html)
            })
        }), i.on("submit", '[data-role="filters-container"] form', function (b) {
            b.preventDefault();
            var c = a(this), f = c.closest(B), g = e().css({"margin-top": "40px"}), h = f.find("." + y);
            h.html(g), d(f, function (a) {
                h.html(a.html)
            })
        }), i.on("click", '[data-role="show-product-card"]', function (b) {
            b.preventDefault();
            var c = a(this), d = c.closest(A), e = d.data(l), f = c.closest(B);
            0 === f.length && (f = d.find(B + "[" + s + '="' + e + '"]'));
            var g = c.data("product-guid"), j = c.data("product-card-url"),
                k = f.find(E + '[data-product-guid="' + g + '"]');
            if (!1 === f.hasClass(w) && (f.prev(".configurator-category-data").find('[data-role="show-catalog"]').click(), d.find('[data-role="expand-subcategories"]').click()), f.find(E).addClass("closed"), 0 !== k.length)return f.addClass("fixed"), void k.css({top: f.scrollTop() + "px"}).removeClass("closed");
            a.getJSON(j, function (b) {
                if (!1 !== b.result) {
                    k = a(b.html), f.addClass("fixed").append(k), k.css({top: f.scrollTop() + "px"}).on("click", '[data-role="add-item"]', function (b) {
                        b.stopImmediatePropagation();
                        var c = a(this), d = c.closest(E), e = c.data("product-guid"),
                            g = i.find('[data-role="catalog-product"] [data-role="add-item"][data-product-guid="' + e + '"]');
                        d.addClass("closed").remove(), f.removeClass("fixed"), g.click()
                    }).on("click", '[data-role="hide-product-card"]', function (a) {
                        a.preventDefault(), f.removeClass("fixed"), k.addClass("closed")
                    }).on("click", "[data-show-all]", function (b) {
                        b.preventDefault();
                        var c = a(this), d = k.find(".extended-characteristic");
                        k.find("[data-show-all]").removeClass("active"), c.addClass("active"), 1 === c.data("show-all") ? d.removeClass(u) : d.addClass(u)
                    }), k.find("a[title]").tooltip({container: "body", placement: "bottom"});
                    var c = k.find('[data-role="thumbs-slider-wrap"]'), d = {
                        items: 4,
                        itemsMobile: [479, 4],
                        itemsTablet: [991, 4],
                        itemsDesktopSmall: [1199, 4],
                        itemsDesktop: [1199, 4],
                        dots: !1,
                        afterAction: !1
                    }, e = h(c, d), g = k.find('[data-role="main-image-slider-wrap"]');
                    if (g.find(".img").length) {
                        if (window.checkScreenType(window.SCREEN_DESKTOP)) {
                            if (a(window).width() >= "1900") {
                                g.find(".img img").each(function (b) {
                                    var c = a(this).data("original");
                                    a(this).parent().attr("href", c), k.find(".thumb-slider-wrap .owl-item").eq(b).find("a").attr("href", c)
                                })
                            }
                            var j = g.find(".img img");
                            j.length && j.zoomer({
                                drawIn: k.find('[data-role="zoom-preview"]'),
                                viewContainer: k.find('[data-role="zoom-preview-wrap"]'),
                                srcImgContainerWidth: g.find(".img:first").width()
                            })
                        }
                        var l = {
                            items: 1,
                            itemsMobile: [479, 1],
                            itemsTablet: [991, 1],
                            itemsDesktopSmall: [1199, 1],
                            itemsDesktop: [1199, 1],
                            dots: !1,
                            afterAction: function () {
                                "object" == typeof e && (c.find(".owl-item .thumb").removeClass("active").eq(this.owl.currentItem).addClass("active"), e.visibleItems[e.visibleItems.length - 1] < this.owl.currentItem ? e.goTo(this.owl.currentItem) : e.visibleItems[0] > this.owl.currentItem && e.goTo(this.owl.currentItem))
                            },
                            afterInit: function () {
                                g.find(".img").removeClass("transparent")
                            }
                        }, m = h(g, l)
                    }
                    a(".owl-item .thumb").hover(function () {
                        m.goTo(a(this).parent().index())
                    }), k.trigger(window.EVENT_CONFIGURATOR_PRODUCT_IS_LOADED)
                }
            })
        }), i.on("click", "[data-role=toggle-optional-categories]", function () {
            var b = a(this).closest(".group-categories"), c = b.find(".optional-categories"),
                d = b.find("[data-role=toggle-optional-categories]");
            return 1 === parseInt(a(this).attr("data-showed")) ? (d.attr("data-showed", 0), c.slideUp()) : (d.attr("data-showed", 1), c.slideDown()), !1
        }), i.on("click", ".filter-remove", function (b) {
            b.preventDefault();
            var c = a(this), f = c.closest(B), g = e().css({"margin-top": "40px"}), h = f.data(l),
                i = c.attr("href").split("?"), k = "";
            2 === i.length && (k = i.pop());
            var m = String.parseQueryString(k);
            j[h] = {};
            for (var n in m)if (!1 !== m.hasOwnProperty(n))if (-1 !== n.indexOf("[")) {
                var o = n.split("["), p = o.shift();
                void 0 === j[h][p] && (j[h][p] = {});
                var q = o.pop().replace("/]/g", "");
                j[h][p][q] = m[n]
            } else j[h][n] = m[n];
            var r = f.data("catalog-category-url") + "?" + k;
            f.html(g), a.getJSON(r, function (a) {
                g.remove(), f.attr(t, !0).append(a.html).trigger(window.EVENT_CONFIGURATOR_CATALOG_IS_LOADED).trigger(window.EVENT_PRODUCTS_LOADED);
                var b = f.find(".catalog-filters"), c = b.data("url-param-name");
                b.catalogCharacteristicFilters({
                    urlParamName: c,
                    desktopFilterSelector: "[" + s + '="' + h + '"] [data-role="desktop-characteristic-filters"]',
                    mobileFilterSelector: "[" + s + '="' + h + '"] [data-role="menu-filters-aside"]',
                    applyFilters: function (a) {
                        var b = a.closest(B), c = e().css({"margin-top": "40px"}), f = b.find("." + y);
                        f.html(c), d(b, function (a) {
                            f.html(a.html)
                        })
                    },
                    changeFilter: function (a, b) {
                        var d = f.data(l);
                        void 0 === j[d] && (j[d] = {});
                        var e = j[d];
                        void 0 === e[c] && (e[c] = {}), e[c][a] = b
                    }
                });
                var i = f.find('[data-role="brand-filter-widget"]');
                i.catalogBrandFilter({
                    urlParamName: i.data("url-param-name"), changeFilter: function (a, b) {
                        var c = f.data(l);
                        void 0 === j[c] && (j[c] = {}), j[c][a] = b
                    }, chooseOneBrand: function (a) {
                        var b = f.data(l);
                        void 0 === j[b] && (j[b] = {}), j[b][i.data("url-param-name")] = a;
                        var c = e().css({"margin-top": "40px"});
                        f.find("." + y).html(c), d(f, function (a) {
                            f.find("." + y).html(a.html)
                        })
                    }
                })
            })
        }), a(document).ajaxSuccess(function (a, b) {
            if (void 0 !== b.responseJSON && void 0 !== b.responseJSON.rsuStatusData) {
                var c = b.responseJSON.rsuStatusData;
                window.RSU_STATUS_WIDGET.updateData(c)
            }
        }), a(document).on("click", J + ' [data-role="add-item"]', function (b) {
            b.preventDefault();
            var c = a(this), d = c.closest(J);
            i.find(B + ' [data-role="add-item"][data-product-guid="' + c.data("product-guid") + '"]').click(), d.modal("hide").remove()
        }), a(window).on(window.EVENT_BEFORE_CONFIGURATION_UPDATE, function () {
            b()
        }), a(window).on(window.EVENT_CONFIGURATION_UPDATE, function () {
            f(), c()
        }))
    })
}(jQuery), function (a, b, c) {
    b.EVENT_RSU_CATALOG_AJAX_REQUEST_PARAMS_CHANGE = "rsu-user-catalog:ajax-params-change";
    var d, e, f, g, h, i, j = {groupBy: 0, sortBy: 0, mode: 0, page: 1}, k = [], l = {
        onSuccess: function (c) {
            var d = parseInt(c.data.totalCount);
            if (1 === parseInt(j.page) && (g.toggleClass("hidden", 0 === d).text("(" + d + " С€С‚)"), h.html(c.data.pickedFilters)), 0 === d)return void e.html("<h4>РљРѕРЅС„РёРіСѓСЂР°С†РёРё РЅРµ РЅР°Р№РґРµРЅС‹</h4>");
            var f = a(c.html);
            f.find('[data-role="configurations-group"]').each(function () {
                var b = a(this), c = b.data("group-key"),
                    d = e.find('[data-role="configurations-group"][data-group-key=' + c + "]");
                if (0 !== d.length) {
                    var g = b.find('[data-role="group-configuration"]');
                    d.append(g)
                } else e.append(b);
                var h = f.find('[data-role="category-more"]');
                0 !== h.length && e.append(h)
            }), e.trigger(b.EVENT_INIT_POPOVERS)
        }, onFail: function () {
            var b = a("<div />").addClass("alert-danger alert fade in").html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">Г—</button> РџСЂРё РїРѕР»СѓС‡РµРЅРёРё РєРѕРЅС„РёРіСѓСЂР°С†РёР№ РїСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°. РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕР±РЅРѕРІРёС‚СЊ СЃС‚СЂР°РЅРёС†Сѓ.');
            e.html("").append(b)
        }
    }, m = function () {
        c !== i && i.abort(), 1 === j.page && e.html("");
        var f = [];
        for (var g in j)if (!1 !== j.hasOwnProperty(g)) {
            var h = j[g];
            0 !== h && f.push(g + "=" + h)
        }
        k.forEach(function (a) {
            f.push(a.key + "=" + a.value)
        });
        var m = a("<div><span /><span /><span /><span /></div>").addClass("loading-dots");
        e.find('[data-role="show-more"]').remove().end().append(m);
        var n = function () {
            m.remove(), i = c
        };
        i = a.get(d.data("get-catalog-configurations-url") + "?" + f.join("&"), n), i.then(l.onSuccess, l.onFail), c !== b.history && b.history.pushState({}, document.title, "?" + f.join("&"))
    }, n = function (b) {
        b.preventDefault();
        var c = a(this), d = c.closest('[data-role="ordering-dropdown"]'), e = parseInt(c.data("order-value")),
            f = c.text(), g = d.data("ordering-key");
        e !== j[g] && (d.find('[data-role="order-type-selected"]').text(f), j.page = 1, j[g] = e, m())
    }, o = function (a, b) {
        a.preventDefault(), j.page = 1, k = b.data, m()
    }, p = function (b) {
        b.preventDefault();
        var c = a(this);
        j.page = 1, j.mode = c.val(), m()
    }, q = function () {
        var b = a(this);
        j.page = parseInt(b.data("page")), m()
    };
    a(function () {
        if (d = a('[data-role="rsu-user-catalog-container"]'), 0 !== d.length) {
            h = d.find('[data-role="rsu-picked-filters"]'), e = d.find('[data-role="catalog-configurations"]'), g = d.find('[data-role="configurations-counter"]'), f = a(document).find('[name="filter-list-user-catalog"]');
            var c = document.location.href.split("?");
            if (2 === c.length) {
                var i = c.pop(), k = String.parseQueryString(i);
                for (var l in k)!1 !== k.hasOwnProperty(l) && !0 === j.hasOwnProperty(l) && (j[l] = parseInt(k[l]))
            }
            d.on("click", ['[data-role="select-group-by"]', '[data-role="select-sort-by"]'].join(","), n), d.on("click", '[data-role="show-more"]', q), d.on("change", '[data-role="mode-switcher"]', p), f.on(b.EVENT_FILTER_LIST_AFTER_CHANGE, o)
        }
    })
}(jQuery, window, void 0);
var screenSite = {phone: 480, tablet: 768, desktop: 960, "wide-desktop": 1200};
screen.getScreen = function (a) {
    return void 0 !== screenSite[a] ? screenSite[a] : null
}, screen.getCurrentWidth = function () {
    return $(document).width()
}, screen.getCurrentScreen = function () {
    var a = screen.getCurrentWidth(), b = null;
    for (var c in screenSite) {
        if (screenSite[c] >= a)return void 0 !== b ? b : c;
        b = c
    }
    return b
}, $.fn.scrollTo = function (a, b, c) {
    "function" == typeof b && 2 == arguments.length && (c = b, b = a);
    var d = $.extend({scrollTarget: a, offsetTop: 50, duration: 500, easing: "swing"}, b);
    return this.each(function () {
        var a = $(this), b = "number" == typeof d.scrollTarget ? d.scrollTarget : $(d.scrollTarget),
            e = "number" == typeof b ? b : b.offset().top + a.scrollTop() - parseInt(d.offsetTop);
        $("#header-search").length && "fixed" === $("#header-search").css("position") && (e -= $("#header-search").height() + parseInt($("#header-search").css("padding-top"))), a.animate({scrollTop: e}, parseInt(d.duration), d.easing, function () {
            "function" == typeof c && c.call(this)
        })
    })
}, $(document).ready(function () {
    var a = $("#mainSlider"), b = function () {
        $(".slider-tabs > li", a).removeClass("active").filter(function () {
            return $(this).data("slide-num") === d.currentItem
        }).addClass("active")
    }, c = $("#owlSlider", a).owlCarousel({
        items: 1,
        itemsMobile: [479, 1],
        itemsTablet: [991, 1],
        itemsDesktopSmall: [1199, 1],
        itemsDesktop: [1199, 1],
        pagination: !0,
        rewindNav: !0,
        autoPlay: !0,
        stopOnHover: !0,
        afterMove: b,
        slideSpeed: 0,
        paginationSpeed: 0,
        rewindSpeed: 0
    }), d = c.data("owlCarousel");
    d && d.goTo(a.data("active-slide")), $(".button-right", a).click(function () {
        var a = c.data("owlCarousel");
        return a.visibleItems[a.visibleItems.length - 1] === a.$owlItems.length - 1 ? a.jumpTo(0) : c.trigger("owl.next"), !1
    }), $(".button-left", a).click(function () {
        var a = c.data("owlCarousel");
        return 0 === a.visibleItems[0] ? a.jumpTo(a.$owlItems.length - 1) : c.trigger("owl.prev"), !1
    }), $(".slider-tabs > li", a).click(function () {
        d.goTo($(this).data("slide-num")), b()
    })
}), $(function () {
    function a(a, b) {
        var c = [], d = a.get(0);
        return b.find(a).length || (d = b.find("li.disabled a:first").get(0)), d && c.push(d.href.replace(/^[^?]*\?/, "")), c
    }

    function b(b) {
        return a(b, f.find(g))
    }

    function c(a) {
        var b = [];
        return f.find(h + " input:checked").each(function () {
            var a = $(this);
            b.push(encodeURI(a.attr("name")) + "[]=" + encodeURIComponent(a.val()))
        }), b
    }

    function d(b) {
        return a(b, f.find(i))
    }

    function e(a) {
        a.preventDefault();
        var e = $(a.target), f = [];
        Array.prototype.push.apply(f, b(e)), Array.prototype.push.apply(f, c(e)), Array.prototype.push.apply(f, d(e)), window.location.search = "?" + f.join("&")
    }

    var f, g = "[data-filter=order]", h = "[data-filter=groups]", i = "[data-filter=shops]";
    $(function () {
        0 !== $("#page-markdown-products").length && (f = $("[data-role=sort-filter]"), f.find(".dropdown-menu").on("click", function (a) {
            a.stopPropagation()
        }), f.find("a, [data-id=apply-filters]").on("click", e))
    })
}), window.SELECTOR_TOOLTIP = '[data-toggle="tooltip"]', window.EVENT_INIT_TOOLTIPS = "tooltips:init";
var initTooltips = function () {
    $(window.SELECTOR_TOOLTIP).tooltip({container: "body", placement: "bottom"})
};
$(document).ready(initTooltips), $(window).on(window.EVENT_CATALOG_SCROLL, initTooltips).on(window.EVENT_INIT_TOOLTIPS, initTooltips).on(window.EVENT_PRODUCTS_LOADED, initTooltips).on(window.EVENT_CATALOG_LIST_IS_LOADED, initTooltips), $(function () {
    "ontouchstart" in document.documentElement || ($("a[title]").tooltip({
        container: "body",
        placement: "bottom"
    }), $("button[title]").tooltip({
        container: "body",
        placement: "bottom"
    }), $("img[title]").tooltip({container: "body", placement: "bottom"}), $("span[title]").tooltip({
        container: "body",
        placement: "bottom"
    }))
}), $(document).ready(function () {
    var a = $(".job-next-button"), b = $(".job-block"), c = $(".job-block.sm"), d = $(".job-block-additional");
    !0 === $(".vacancy-widget").hasClass("resume-send-success") && $("#resume-send-success-modal").modal("show"), a.click(function () {
        $(".nav-tabs > .active").next("li").find("a").trigger("click")
    }), b.click(function () {
        b.removeClass("active"), c.removeClass("active"), d.hide();
        var a = $(this), e = a.data("job-guid");
        a.addClass("active"), $('*[data-job-guid="' + e + '"]').show()
    }), b.first().trigger("click"), c.first().addClass("active")
}), function (a, b, c) {
    b(a).on("click", "[data-role=agree-label]", function () {
        var a = b(this).closest("[data-role=agree-checker-container]"), c = a.data("target"), d = b(c);
        "" === c && (d = b(this).closest("form").find("button:first"));
        var e = a.find("input");
        e.is(":checked") ? (e.prop("checked", !1), d.attr("disabled", !0)) : (e.prop("checked", !0), d.attr("disabled", !1))
    }), b(a).on("click", "[data-role=agree-label] a", function (a) {
        a.stopPropagation()
    })
}(document, jQuery), $(document).ready(function () {
    $(document).on("change", '[name="AjaxFileUploadForm[uploadedFile]"]', function () {
        function a() {
            if (!1 === b() || !1 === c())return !1;
            j.append(l), n.removeClass("hidden");
            var a = new XMLHttpRequest;
            a.upload.onprogress = function (a) {
                var b = Math.floor(a.loaded / a.total * 100);
                n.find(".progress-bar").css({width: b + "%"})
            }, a.onload = a.onerror = function () {
                if (200 !== this.status)return alert("РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё С„Р°Р№Р»Р°"), e(), f(), !1;
                try {
                    var a = $.parseJSON(this.responseText)
                } catch (a) {
                    return alert("РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё С„Р°Р№Р»Р°"), e(), f(), !1
                }
                return !1 === a.result ? (i.yiiActiveForm("updateAttribute", "ajaxfileuploadform-uploadedfile", [a.error]), e(), f(), !1) : d(a.fileGuid) ? (i.yiiActiveForm("updateAttribute", "ajaxfileuploadform-uploadedfile", ["Р¤Р°Р№Р» СѓР¶Рµ Р·Р°РіСЂСѓР¶РµРЅ"]), e(), f(), !1) : (n.addClass("hidden"), m.removeClass("file-icons-unknown").addClass("file-icons-" + a.fileExtension), o.text(a.fileName), p.attr("data-file-guid", a.fileGuid), l.attr("data-file-guid", a.fileGuid), f(), !0)
            }, a.onabort = function () {
                return alert("Р—Р°РіСЂСѓР·РєР° РїСЂРµСЂРІР°РЅР°."), f(), !1
            }, a.open("POST", h.data("upload-url")), a.send(q), l.data("request", a)
        }

        function b() {
            return void 0 !== g[0].files && 0 < g[0].files.length && 0 === h.find(".has-error").length
        }

        function c() {
            return j.find(".uploaded-file").length < r || (i.yiiActiveForm("updateAttribute", "ajaxfileuploadform-uploadedfile", ["РњР°РєСЃРёРјР°Р»СЊРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ Р·Р°РіСЂСѓР¶Р°РµРјС‹С… С„Р°Р№Р»РѕРІ: " + r]), !1)
        }

        function d(a) {
            return 0 < j.find('[data-role="uploaded-file"] [data-file-guid="' + a + '"]').length
        }

        function e() {
            l.remove()
        }

        function f() {
            g.val("")
        }

        var g = $(this), h = g.closest('[data-role="ajax-file-upload-widget-container"]'), i = g.closest("FORM"),
            j = h.find('[data-role="uploaded-files-container"]'), k = h.find('[data-role="uploaded-file-sample"]'),
            l = k.clone().removeClass("hidden").attr("data-role", "uploaded-file"),
            m = l.find('[data-role="file-icon"]'), n = l.find('[data-role="progress-bar"]'),
            o = l.find('[data-role="file-name"]'), p = l.find('[data-role="remove-file-btn"]'), q = new FormData(i[0]),
            r = (g[0].files[0], h.data("filesLimit"));
        i.yiiActiveForm("validateAttribute", "ajaxfileuploadform-uploadedfile"), setTimeout(function () {
            a()
        }, 300)
    }), $('[data-role="ajax-file-upload-widget-container"]').on({
        mouseenter: function () {
            $(this).find(".remove-file-btn").removeClass("hidden")
        }, mouseleave: function () {
            $(this).find(".remove-file-btn").addClass("hidden")
        }
    }, ".uploaded-file"), $('[data-role="ajax-file-upload-widget-container"]').on("click", '[data-role="remove-file-btn"]', function () {
        var a = $(this), b = a.closest('[data-role="ajax-file-upload-widget-container"]'),
            c = a.closest('[data-role="uploaded-file"]'), d = b.data("widget-hash");
        c.data("file-guid") ? $.ajax({
            url: b.data("remove-file-url") + "?hash=" + d + "&fileGuid=" + c.data("file-guid"),
            type: "POST",
            success: function (a) {
                if (!1 === a.result)return alert("РћС€РёР±РєР° СѓРґР°Р»РµРЅРёСЏ."), !1;
                c.remove()
            }
        }) : (c.data("request").abort(), c.remove())
    })
}), function (document, $, undefined) {
    function parseUploadResponse(iframe) {
        if ("about:blank" === iframe.src)return {
            result: !1,
            data: "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ (E0)."
        };
        if (undefined === iframe.contentDocument && (iframe.contentDocument = frames[iframe.id].document), "complete" !== iframe.contentDocument.readyState)return {
            result: !1,
            data: "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ (E1)."
        };
        if (undefined === iframe.contentDocument.body)return {
            result: !1,
            data: "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ (E2)."
        };
        if ("" === iframe.contentDocument.body.innerHTML)return {
            result: !1,
            data: "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ (E3)."
        };
        if ("false" === iframe.contentDocument.body.innerHTML)return {
            result: !1,
            data: "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ (E4)."
        };
        try {
            var response = iframe.contentDocument.body.getElementsByTagName("pre")[0].innerHTML;
            return eval("(" + response + ")")
        } catch (a) {
        }
        return {result: !1, data: "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёРµ (E5)."}
    }

    var IMAGETYPE_GIF = 1, IMAGETYPE_JPEG = 2, IMAGETYPE_PNG = 3, IMAGETYPE_BMP = 6;
    $.fn.ajaxImageUpload = function (a) {
        return this.each(function () {
            function b() {
                e.find('INPUT[type="file"]').remove(), e.append('<input type="file" />'), f = e.find('INPUT[type="file"]')
            }

            function c() {
                e.addClass("disabled"), undefined === g && (g = $("<iframe></iframe>"), g.addClass("ajax-image-upload-iframe"), g.attr("id", "ajax-image-upload-iframe-" + l), g.attr("src", ""), g.attr("name", l), j.append(g), g = $("#ajax-image-upload-iframe-" + l), g.on("load", d)), undefined !== h && h.remove(), h = $('<form enctype="multipart/form-data"></form>'), h.addClass("ajax-image-upload-form"), h.attr("method", "POST"), h.attr("id", "ajax-image-upload-form-" + l), h.attr("action", a.uploadUrl), h.attr("target", g.attr("name")), j.append(h), h = $("#ajax-image-upload-form-" + l), h.get(0).appendChild(f.get(0)), h.find('INPUT[type="file"]').attr("name", "AjaxImage");
                var c = $('META[name="csrf-token"]');
                0 !== c.length && h.append('<input type="hidden" value="' + c.attr("content") + '" name="_csrf">');
                for (var i in a)if (!1 !== a.hasOwnProperty(i))if ("object" == typeof a[i])for (var k in a[i])!1 !== a[i].hasOwnProperty(k) && h.append('<input type="hidden" name="options[' + i + "][" + k + ']" value="' + String(a[i][k]).replace(/["\\']/gim, "") + '" />'); else h.append('<input type="hidden" name="options[' + i + ']" value="' + String(a[i]).replace(/["\\']/gim, "") + '" />');
                h.submit(), b()
            }

            function d() {
                e.removeClass("disabled");
                var a = parseUploadResponse(this);
                !0 !== a.result ? (undefined !== n && (n.text(a.data), n.show()), k.val("")) : (n.hide(), undefined !== i && i.text(a.url), undefined !== m && m.attr("src", a.preview), k.val(a.value))
            }

            var e, f, g, h, i, j = $("BODY"), k = $(this), l = k.data("ajax-image-id");
            undefined !== a.imageUrlContainer && (i = $(a.imageUrlContainer), 0 === i.length && (i = undefined));
            var m;
            undefined !== a.previewContainer && (m = $(a.previewContainer), 0 === m.length && (m = undefined));
            var n;
            undefined !== a.errorContainer && (n = $(a.errorContainer), 0 === n.length && (n = undefined)), undefined !== n && n.hide(), function () {
                var d = [];
                d.push("btn"), d.push("btn-warning"), d.push("ajax-image-upload-btn"), 1 === a.block && d.push("btn-block"), d = d.join(" "), k.wrap('<div class="' + d + '">Р—Р°РіСЂСѓР·РёС‚СЊ</div>'), e = k.parent(), b(), e.on("change", 'INPUT[type="file"]', c)
            }()
        })
    }
}(document, jQuery), function (a, b) {
    window.SELECTOR_BEST_RELATED_FOR_PRODUCTS_SET_WIDGET = "[data-role=best-related-for-products-set]", b.fn.bestRelatedForProductsSetWidget = function () {
        function a() {
            function a(a) {
                b(c, i).removeClass("disabled"), -1 !== a.visibleItems.indexOf(0) && b(d, i).addClass("disabled"), -1 !== a.visibleItems.indexOf(a.owlItems.length - 1) && b(e, i).addClass("disabled")
            }

            var j = b(this);
            "object" != typeof j.data("owlCarousel") ? j.owlCarousel({
                items: f,
                itemsMobile: [window.SCREEN_MOBILE_MAX_WIDTH, h],
                itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, g],
                itemsDesktopSmall: [window.SCREEN_DESKTOP_MAX_WIDTH, f],
                navigation: !1,
                pagination: !1,
                rewindNav: !0,
                autoPlay: !1,
                scrollPerPage: !0,
                afterInit: function () {
                    b(".product", i).removeClass("transparent"), a(this.owl)
                },
                afterAction: function () {
                    a(this.owl)
                }
            }) : a(j.data("owlCarousel").owl), b(c, i).off("click"), b(e, i).click(function () {
                b(this).is(".disabled") || j.trigger("owl.next")
            }), b(d, i).click(function () {
                b(this).is(".disabled") || j.trigger("owl.prev")
            })
        }

        var c = ".nav-btn", d = ".btn-prev", e = ".btn-next", f = 5, g = 3, h = 1, i = b(this);
        b("[data-role=related-products-slider]", i).each(a)
    }, b(function () {
        b(window.SELECTOR_BEST_RELATED_FOR_PRODUCTS_SET_WIDGET).each(function () {
            b(this).bestRelatedForProductsSetWidget()
        })
    })
}(document, jQuery), function (a, b) {
    window.SELECTOR_CART_CATALOG_PRODUCT_RELATED_WIDGET = "[data-role=cart-catalog-product-related-widget]", b.fn.cartCatalogProductRelatedWidget = function () {
        function a(a) {
            b(d, c).removeClass("active").filter("[data-id=" + a + "]").addClass("active");
            var g = b(e, c), h = g.filter("[data-id=" + a + "]");
            g.removeClass("active"), h.addClass("active");
            var i = f.find("[data-id=" + a + "]");
            (b("[data-role=list-item]", f).toggleClass("disabled", !1), i.closest("[data-role=list-item]").toggleClass("disabled", !0), b("[data-role=toggle-button] [data-role=title]", f).html(i.html()), !1 === h.is("[data-content-url]") || "1" === h.attr("data-is-loaded") || h.data("loading")) || (h.data("loading", !0), b.get(h.data("content-url")).done(function (a) {
                if (!1 === a.result)return void h.html('<div class="alert alert-info">РќРµ СѓРґР°Р»РѕСЃСЊ РїРѕР»СѓС‡РёС‚СЊ СЃРїРёСЃРѕРє Р°РєСЃРµСЃСЃСѓР°СЂРѕРІ.</div>');
                h.html(a.html), h.relatedProductsByCategoriesWidget(), b(window).trigger(EVENT_PRODUCTS_LOADED)
            }).fail(function () {
                h.html('<div class="alert alert-info">РќРµ СѓРґР°Р»РѕСЃСЊ РїРѕР»СѓС‡РёС‚СЊ СЃРїРёСЃРѕРє Р°РєСЃРµСЃСЃСѓР°СЂРѕРІ.</div>')
            }).always(function () {
                h.attr("data-is-loaded", 1), h.data("loading", !1)
            }))
        }

        var c = b(this), d = "[data-role=cart-related-tab-control]", e = "[data-role=cart-related-tab]",
            f = c.find(".mobile-controls [data-role=dropdown-list]");
        b("[data-role=list-item]", f).on("click", function () {
            return b("[data-role=toggle-button]", f).dropdown("toggle"), a(b(this).data("id")), !1
        }), b(d, c).on("click", function () {
            return a(b(this).data("id")), !1
        }), b(d, c).each(function () {
            var a = b(this).data("id");
            b("[data-show-related-for=" + a + "]").removeClass("hidden")
        }), b("[data-show-related-for]").on("click", function () {
            var a = b(this).data("show-related-for");
            b(d + "[data-id=" + a + "]", c).click();
            var e = 30;
            window.checkScreenType(window.SCREEN_DESKTOP, window.SCREEN_WIDE) && (e = 65), b("body").scrollTo(c.offset().top - e)
        }), b(window).on(window.EVENT_ITEM_REMOVED_FROM_CART, function (a, e) {
            var f = e.find("[data-show-related-for]");
            if (0 !== f.length) {
                var g = f.data("show-related-for"), h = b(d, c).filter("[data-id=" + g + "]");
                if (h) {
                    var i = e.parent().find('[data-show-related-for="' + g + '"]'), j = !1;
                    i.each(function () {
                        !1 === b(this).closest(window.SELECTOR_CART_PRODUCT).is(".hidden") && (j = !0)
                    }), j || (h.is(".active") && h.siblings().first().click(), h.addClass("hidden"), 1 == c.find(d).length - c.find(d).filter(".hidden").length && c.addClass("hidden"))
                }
            }
        }), b(window).on(window.EVENT_UPDATE_CART_ITEM, function (a, e) {
            var f = e.find("[data-show-related-for]");
            if (0 !== f.length) {
                var g = f.data("show-related-for"), h = b(d, c).filter("[data-id=" + g + "]");
                h.length && (c.removeClass("hidden"), h.removeClass("hidden"))
            }
        })
    }, b(function () {
        b(window.SELECTOR_CART_CATALOG_PRODUCT_RELATED_WIDGET).each(function () {
            b(this).cartCatalogProductRelatedWidget()
        })
    })
}(document, jQuery), function (a, b) {
    function c(c) {
        function l() {
            f(d(n), n)
        }

        var m = b(g);
        b(a).on("click", function (a) {
            b(a.target).hasClass(i) || b(j).fadeOut()
        });
        var n = c.find("FORM"), o = m.find("FORM");
        n.on("submit", l);
        var p = b();
        p.push.apply(p, n), p.push.apply(p, o), p.aggregateForm(function (a) {
            a.each(function () {
                e(b(this))
            })
        }), p.change(l), p.on("change", function (a) {
            var c = b(a.target).parents("[data-control-type]:first");
            if (c.length) {
                var e = d(n);
                "" !== e ? c.find("label").addClass("selected") : c.find("label").removeClass("selected"), k.changeFilter(k.urlParamName, e)
            }
        }), n.find(h).on("click", function () {
            var a = b(this), c = a.data("action-value");
            a.closest('form[data-id="action-filter"]').find("input:checkbox").prop("checked", !1), k.chooseOneAction(c)
        })
    }

    function d(a) {
        var b = [];
        return a.find("input[type=checkbox]:checked").each(function () {
            b.push(this.value)
        }), b.join("-")
    }

    function e(a) {
        a.find('input[type=hidden][name^="' + k.urlParamName + '"]').remove()
    }

    function f(a, b) {
        "" !== a && (e(b), b.append('<input type="hidden" name="' + k.urlParamName + '" value="' + a + '" />'))
    }

    var g = "#w-catalog-action-filter-mobile-widget", h = "span.one-action-submit", i = "apply-filters-btn",
        j = "." + i, k = {}, l = {
            urlParamName: "action", changeFilter: function (a, b) {
            }, chooseOneAction: function (a) {
            }
        };
    b.fn.catalogActionFilter = function (a) {
        k = b.extend({}, l, a), c(b(this))
    }, b(function () {
        var a = b('[data-role="action-filter-widget"]');
        if (0 !== a.length) {
            var c = null;
            a.catalogActionFilter({
                urlParamName: a.data("url-param-name"), chooseOneAction: function (a) {
                    null === c && (clearTimeout(c), c = setTimeout(function () {
                        clearTimeout(c), setUrlParameter("action", a)
                    }, 250))
                }
            })
        }
    })
}(document, jQuery), function (a, b) {
    function c(a) {
        function d() {
            h(f(p), p)
        }

        var n = b(i), o = b(".brand-item");
        o.find("img").each(e), o.on("click", function () {
            var c = null, d = b(this);
            a.find(l).hide(0, function () {
                b(this).remove()
            });
            var e = b('<div class="' + k + '">РџРѕРєР°Р·Р°С‚СЊ</div>');
            d.after(e);
            var f = d.get(0).getBoundingClientRect().left - a.get(0).getBoundingClientRect().left;
            a.outerWidth() < f + d.outerWidth() + 10 + e.outerWidth() ? (f -= e.outerWidth() + 10, e.addClass("pos-left")) : f += d.outerWidth() + 10;
            var g = d.get(0).getBoundingClientRect().top - a.get(0).getBoundingClientRect().top;
            g += d.outerHeight() / 2 - e.outerHeight() / 2, e.css("cssText", "top: " + g + "px !important; left: " + f + "px !important;"), e.on("click", function () {
                e.parents("form:first").submit()
            }), clearTimeout(c), c = setTimeout(function () {
                clearTimeout(c), e.fadeIn(300)
            }, 250)
        }), b("html, body").on("click", function (a) {
            b(a.target).hasClass(k) || b("." + k).fadeOut()
        });
        var p = a.find("FORM"), q = n.find("FORM");
        p.on("submit", d);
        var r = b();
        r.push.apply(r, p), r.push.apply(r, q), r.aggregateForm(function (a) {
            a.each(function () {
                g(b(this))
            })
        }), r.change(d), r.on("change", function (a) {
            var c = b(a.target).parents("[data-control-type]:first");
            if (c.length) {
                var d = f(p);
                "" !== d ? c.find("label").addClass("selected") : c.find("label").removeClass("selected"), m.changeFilter(m.urlParamName, d)
            }
        }), b(".show-more-brands", a).on("click", function () {
            var a = b("#brand-list");
            return b(this).is("[data-shown]") ? (a.hide(), b(this).removeAttr("data-shown")) : (a.show(), b(this).attr("data-shown", !0), c()), !1
        }), p.find(j).on("click", function () {
            var a = b(this), c = a.data("brand-value");
            a.closest('form[data-id="brand-filter"]').find("input:checkbox").prop("checked", !1), m.chooseOneBrand(c)
        })
    }

    function d(a) {
        var c = a.getBoundingClientRect();
        (c.width > 40 || c.height > 40) && b(a).parent().addClass("has-img")
    }

    function e() {
        var c = a.createElement("img"), e = this;
        c.src = e.src, b(c).css({position: "absolute", left: -100, top: -100}).on("load", function () {
            d(e), c.remove()
        }), d(e)
    }

    function f(a) {
        var b = "";
        return a.find("input[type=checkbox]:checked").each(function () {
            b += (b ? "-" : "") + this.value
        }), b
    }

    function g(a) {
        a.find('input[type=hidden][name^="' + m.urlParamName + '"]').remove()
    }

    function h(a, b) {
        "" !== a && (g(b), b.append('<input type="hidden" name="' + m.urlParamName + '" value="' + a + '" />'))
    }

    var i = "#w-catalog-brand-filter-mobile-widget", j = "span.one-brand-submit", k = "apply-filters-btn", l = "." + k,
        m = {}, n = {
            urlParamName: "brand", changeFilter: function (a, b) {
            }, chooseOneBrand: function (a) {
            }
        };
    b.fn.catalogBrandFilter = function (a) {
        m = b.extend({}, n, a), c(b(this))
    }, b(function () {
        var a = b('[data-role="brand-filter-widget"]');
        if (0 !== a.length) {
            var c = null;
            a.catalogBrandFilter({
                urlParamName: a.data("url-param-name"), chooseOneBrand: function (a) {
                    null === c && (clearTimeout(c), c = setTimeout(function () {
                        clearTimeout(c), setUrlParameter("brand", a)
                    }, 250))
                }
            })
        }
    })
}(document, jQuery), function (a) {
    function b(b, p) {
        function q() {
            y = !0, t.addClass("shown"), t.get(0).scrollTop = 0, a(window).trigger(window.EVENT_OPENED_MOBILE_FILTERS_MENU)
        }

        function r() {
            y = !1, t.removeClass("shown"), a(window).trigger(window.EVENT_CLOSED_MOBILE_FILTERS_MENU)
        }

        var s = b.find(j), t = a(p.mobileFilterSelector), u = a(p.desktopFilterSelector), v = a(g);
        s.on("submit", function () {
            var b = [];
            a(this).find("[data-control-type]").each(function () {
                var f, g = a(this);
                switch (parseInt(g.data("control-type"))) {
                    case l:
                        f = c(g);
                        break;
                    case m:
                    case n:
                        f = d(g);
                        break;
                    case o:
                        f = e(g)
                }
                if (void 0 !== f) {
                    var h = g.data("id");
                    b.push('<input type=hidden name="' + p.urlParamName + "[" + h + ']" value="' + f + '" />')
                }
            }), a(this).append(b.join(""))
        });
        var w = null;
        if (u.on("change", function (b) {
                var c = a(this), d = a(b.target), e = 0, f = d.parents("[data-control-type]:first");
                if (c.find(i).hide(0, function () {
                        a(this).remove()
                    }), !0 == (1 === a(this).data(k) || void 0 === a(this).data(k)) && f.length) {
                    var g = a('<div class="' + h + '">РџРѕРєР°Р·Р°С‚СЊ</div>');
                    switch (f.append(g), f.data("control-type")) {
                        case m:
                        case n:
                            var j = d.parents(".checkbox:first");
                            e += j.get(0).getBoundingClientRect().top + j.outerHeight() / 2;
                            break;
                        default:
                            e += d.get(0).getBoundingClientRect().top + d.outerHeight() / 2
                    }
                    e -= f.get(0).getBoundingClientRect().top, e -= g.outerHeight() / 2, g.css({top: e}), g.on("click", function () {
                        p.applyFilters(g)
                    }), clearTimeout(w), w = setTimeout(function () {
                        clearTimeout(w), g.fadeIn(300)
                    }, 250)
                }
            }), s.on("change", function (b) {
                var f = a(b.target).parents("[data-control-type]:first");
                if (f.length) {
                    var g;
                    switch (parseInt(f.data("control-type"))) {
                        case l:
                            g = c(f);
                            break;
                        case m:
                        case n:
                            g = d(f);
                            break;
                        case o:
                            g = e(f)
                    }
                    void 0 !== g ? f.find("label").addClass("selected") : f.find("label").removeClass("selected"), p.changeFilter(f.data("id"), g)
                }
            }), a("html, body").on("click", function (b) {
                a(b.target).hasClass(h) || a("." + h).fadeOut()
            }), t.length) {
            var x = a(f), y = x.is(".shown");
            a(window).on(window.EVENT_OPEN_MOBILE_FILTERS_MENU, q), a(window).on(window.EVENT_CLOSE_MOBILE_FILTERS_MENU, r), x.on("click", function () {
                a(window).trigger(y ? window.EVENT_CLOSE_MOBILE_FILTERS_MENU : window.EVENT_OPEN_MOBILE_FILTERS_MENU)
            }), t.aggregateForm(function (b) {
                b.each(function () {
                    a(this).find('input[type=hidden][name^="' + p.urlParamName + '"]').remove()
                })
            }), a("[data-role=submit-mobile-filters]").on("click", function () {
                p.applyFilters(t.find("[type=submit]:first"))
            });
            var z = a(".filters-content");
            if (!z.length)return;
            a(document).on("click", ".hide-filter", function () {
                var b = a(this).closest(".filter"), c = b.get(0).getBoundingClientRect(),
                    d = c.top - filtersContainerBBox.top;
                d > 0 || (z.get(0).scrollTop = z.get(0).scrollTop + d)
            })
        }
        p.afterInit(s, u);
        var A = {};
        s.filter("[name]").each(function () {
            var b = this.name;
            A.hasOwnProperty(b) || (A[b] = a()), A[b].push(this)
        });
        for (var B in A)A.hasOwnProperty(B) && A[B].change(function (a) {
            var b = "value";
            /^input$/i.test(a.target.tagName) && /^(radio)|(checkbox)$/i.test(a.target.type) && (b = "checked"), A[B].not(this).find('[data-id="' + a.target.dataset.id + '"]').each(function () {
                this[b] = a.target[b]
            })
        });
        if (v.length) {
            var C = u.find(".apply-filters-box:not(.sticky)");
            a(window).on("scroll resize", function () {
                if (C.get(0).getBoundingClientRect().top + C.outerHeight() / 2 < a(window).height())return void u.find(".apply-filters-box.sticky").fadeOut(300, function () {
                    a(this).remove()
                });
                var b = u.find(".apply-filters-box.sticky");
                b.length || (b = C.clone(), b.addClass("sticky"), u.find("form").append(b));
                var c = a(window).height() - b.outerHeight(), d = v.get(0).getBoundingClientRect().left,
                    e = v.outerWidth();
                b.css("cssText", "top: " + c + "px !important; left: " + d + "px !important; width: " + e + "px !important;"), b.show()
            })
        }
    }

    function c(a) {
        var b = a.find("SELECT");
        if ("" !== b.val())return b.val()
    }

    function d(b) {
        var c = [];
        if (b.find('INPUT[type="checkbox"]').each(function () {
                var b = a(this);
                b.is(":checked") && c.push(b.data("id"))
            }), 0 !== c.length)return c.join("-")
    }

    function e(a) {
        var b = a.find('[data-name="min"]'), c = a.find('[data-name="max"]'), d = b.val().trim(), e = c.val().trim();
        if ("" === d && (d = b.attr("placeholder")), "" === e && (e = c.attr("placeholder")), d !== b.attr("placeholder") || e !== c.attr("placeholder"))return d + "-" + e
    }

    window.EVENT_OPEN_MOBILE_FILTERS_MENU = "filters-menu:mobile:open", window.EVENT_CLOSE_MOBILE_FILTERS_MENU = "filters-menu:mobile:close", window.EVENT_OPENED_MOBILE_FILTERS_MENU = "filters-menu:mobile:opened", window.EVENT_CLOSED_MOBILE_FILTERS_MENU = "filters-menu:mobile:closed";
    var f = "[data-toggle-mobile-filters]", g = ".extended-filters-wrap", h = "apply-filters-btn", i = "." + h,
        j = "form[name=characteristics]", k = "need-display-btn-apply", l = 1, m = 2, n = 3, o = 4, p = {
            urlParamName: "f",
            desktopFilterSelector: '#desktop-characteristic-filters, [data-role="desktop-characteristic-filters"]',
            mobileFilterSelector: '#menu-filters-aside, [data-role="menu-filters-aside"]',
            afterInit: function () {
            },
            applyFilters: function (a) {
            },
            changeFilter: function (a, b) {
            }
        };
    a(function () {
        var b = a(".catalog-filters");
        0 !== b.length && b.catalogCharacteristicFilters({
            urlParamName: b.data("url-param-name"),
            afterInit: function (b, c) {
                b.each(function () {
                    a(this).aggregateForm(function (b) {
                        b.each(function () {
                            a(this).find('input[type=hidden][name^="' + q.urlParamName + '"]').remove()
                        })
                    })
                }), c.aggregateForm(function (b) {
                    b.each(function () {
                        a(this).find('input[type=hidden][name^="' + q.urlParamName + '"]').remove()
                    })
                })
            },
            applyFilters: function (a) {
                a.parents("form:first").submit()
            }
        })
    });
    var q;
    a.fn.catalogCharacteristicFilters = function (c) {
        var d = a(this);
        q = a.extend({}, p, c), b(d, q)
    }
}(jQuery), function () {
    $(function () {
        var a = $(".catalog-compatibility-filters");
        if (0 !== a.length) {
            var b = $('[data-role="mobile-compatibility-filter"]'),
                c = $('[data-role="desktop-characteristic-filters"]'),
                d = a.find("FORM[name=compatibility-characteristics]"), e = a.data("url-param-name");
            d.on("submit", function () {
                var a = [];
                $(this).find("[data-id]").each(function () {
                    var b = $(this);
                    if (!b.prop("disabled")) {
                        var c = b.val();
                        if ("" !== c) {
                            var d = b.data("id");
                            a.push('<input type=hidden name="' + e + "[" + d + ']" value="' + c + '" />')
                        }
                    }
                }), $(this).append(a.join(""))
            }), d.each(function () {
                $(this).aggregateForm(function (a) {
                    a.each(function () {
                        $(this).find('input[type=hidden][name^="' + e + '"]').remove()
                    })
                })
            }), c.aggregateForm(function (a) {
                a.each(function () {
                    $(this).find('input[type=hidden][name^="' + e + '"]').remove()
                })
            }), d.each(function () {
                var c = $(this), d = c.find("[data-role=compatibility-brand]"),
                    e = c.find("[data-role=compatibility-model]"), f = c.find("button[type=submit]");
                d.change(function () {
                    e.find("option").filter(function () {
                        return "" != $(this).val()
                    }).remove(), e.prop("disabled", !0), e.val("").trigger("change"), f.prop("disabled", !0);
                    var c = $(this), g = c.val();
                    if ("" === d.val())return a.removeClass("selected"), void b.find(".spoiler").removeClass("selected");
                    b.find(".spoiler").addClass("selected"), a.addClass("selected");
                    var h = c.data("models");
                    h.hasOwnProperty(g) && $.each(h[g], function (a, b) {
                        e.append($("<option/>", {value: a}).prop("selected", d.data("selected-model") === a).text(b))
                    }), e.prop("disabled", !1), f.prop("disabled", !1)
                }), c.find(".empty-filters").on("click", function () {
                    d.val("").trigger("change")
                })
            }), d.find("[data-id]").on("select2:open", function () {
                window.checkScreenType(window.SCREEN_MOBILE, window.SCREEN_TABLET) && $(".select2-container.select2-container--krajee.select2-container--open").css({zIndex: 1300})
            }), d.on("click", "[data-role=submit-form]", function () {
                $(this).submit()
            });
            var f = {};
            d.filter("[name]").each(function () {
                var a = this.name;
                f.hasOwnProperty(a) || (f[a] = $()), f[a].push(this)
            });
            for (var g in f)f.hasOwnProperty(g) && f[g].change(function (a) {
                var b = "value";
                /^input$/i.test(a.target.tagName) && /^(radio)|(checkbox)$/i.test(a.target.type) && (b = "checked"), f[g].not(this).find('[data-id="' + a.target.dataset.id + '"]').each(function () {
                    this[b] = a.target[b]
                })
            })
        }
    })
}(), function (a) {
    function b(b, f) {
        f.hasOwnProperty("offset") && 0 !== f.offset || d.css({
            transition: "opacity 200ms ease 0s",
            "-webkit-transition": "opacity 200ms ease 0s",
            opacity: .5
        }).find("input, button").prop("disabled", !0), window.History instanceof Function && window.history instanceof window.History && window.history.pushState({}, document.title, b), e.hide(), 0 === h ? (l.css({
            position: "absolute",
            left: 0,
            right: 0
        }), l.parent().css({position: "relative"}), l.prependTo(d)) : l.appendTo(d), a.get(b, f).always(function () {
            l.remove()
        }).done(function (b) {
            0 === h && d.find("> :not(" + g + ")").remove(), d.append(b.content), e.appendTo(d), h = b.page, i = b.offset, j = b.isEnd, k = b.isNextPartLast, j || e.show(), c(), a(document).trigger(window.EVENT_PRODUCTS_LOADED)
        }).fail(function () {
            alert("РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°, РїСЂРѕРІРµСЂСЊС‚Рµ Р’Р°С€Рµ РёРЅС‚РµСЂРЅРµС‚-СЃРѕРµРґРёРЅРµРЅРёРµ.")
        }).always(function () {
            d.css("opacity", 1)
        })
    }

    function c() {
        f.html(k ? "РІСЃРµ" : "РµС‰Рµ")
    }

    window.EVENT_CATALOG_LIST_IS_LOADED = "catalog:is-loaded";
    var d, e, f, g = ".catalog-category-more", h = 0, i = 0, j = !1, k = !1,
        l = a('<div class="loading-dots"><span></span><span></span><span></span><span></span></div>');
    a(function () {
        var c = a(".catalog-mode"), e = c.find("form");
        d = a(".catalog-category"), e.on("change", function () {
            h = 0, i = 0, j = !1, k = !1;
            for (var a = {
                p: h,
                offset: null
            }, c = e.serializeArray(), d = 0, f = c.length; d < f; ++d)a[c[d].name] = c[d].value;
            b(updateUrlParameters(window.location.href, a), {offset: i})
        }).aggregateForm(function (b) {
            b.each(function () {
                a(this).find('input[type=hidden][name^="mode"]').remove()
            })
        })
    }), a(window).on(window.EVENT_CATALOG_LIST_IS_LOADED, function (b, d) {
        j = d.isEnd, k = d.isNextPartLast, i = d.offset, h = d.page, e = a(g), f = a(".catalog-category-more span"), j ? e.hide() : e.show(), c(), ++h
    }), a(document).on("click", g, function (a) {
        return b(updateUrlParameters(window.location.href, {p: h, offset: null}), {offset: i}), !1
    })
}(jQuery), function (a) {
    a(function () {
        a(".w-choose-city-widget").on("click", function () {
            var b = a(this);
            a("#selectCity").remove(), a.ajax({
                url: b.data("url"), dataType: "html", cache: !1, success: function (b) {
                    a("BODY").append(b), initSelectCity(), a("#selectCity").modal("show")
                }
            })
        })
    })
}(jQuery), function (a, b) {
    function c() {
        n.prop("disabled", !1).show(), o.hide()
    }

    function d(a, c) {
        if (c = void 0 !== c ? c : "00000000-0000-0000-0000-000000000000", !(a instanceof Function))throw"РќРµ СѓРєР°Р·Р°РЅ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Р№ РїР°СЂР°РјРµС‚СЂ cb";
        var d = b(B + '[data-parent-id="' + c + '"]');
        return 0 != d.length ? a(d) : b.ajax({
            url: n.data("form-url"),
            type: "GET",
            data: {parentId: c},
            dataType: "JSON",
            success: function (d) {
                !0 === d.result && (a(b(d.content)), b(B + '[data-parent-id="' + c + '"]').find(I).select2().next().css("display", "block"))
            }
        })
    }

    function e() {
        return m.find("[" + J + "]")
    }

    function f(a) {
        var c = a ? b(this).closest(B) : e();
        if (0 !== c.length) {
            var d;
            c.is(B) ? d = c.prev() : (d = c, c = d.next()), c.is(B) && c.hide(), d.removeAttr(J);
            d.find(z).removeClass("active")
        }
    }

    function g() {
        var e = b(this), g = e.closest(A), h = g.find(z);
        return h.addClass("active"), o.html().trim().length && c(), f(), K = b(window).scrollTop(), d(function (c) {
            g.after(c);
            var d = c.find(E), e = (b(a).width() - b("main").width()) / 2, i = h.offset().left - e - d.width() - 12;
            d.css({left: i}).show(), c.show(), c.find(window.SELECTOR_CAPTCHA_RELOAD).trigger("reload"), g.attr(J, ""), c.find(x).click(f)
        }, g.data("id")), !1
    }

    function h(a) {
        a.find(z).click(g), a.find(".vote-widget-container[data-has-many-negative]").each(function () {
            b(this).closest(A).addClass("has-many-negative")
        })
    }

    function i() {
        p.show()
    }

    function j() {
        p.hide()
    }

    function k() {
        m = b(u), 0 !== m.length && (n = m.find(w), o = m.find(y), p = m.find(C), q = m.find(D), t = parseInt(m.data("count")), s = parseInt(m.data("limit")), r = parseInt(q.find(G).data("current-page")) + 1, h(q.find(A)), m.on("click", H, function () {
            return r = parseInt(b(this).data("page")) + 1, m.find(".comments").html(""), l(), !1
        }), m.on("click", v, function () {
            return m.find(F).remove(), l(), !1
        }), m.on("click", x, c), n.click(function () {
            n.prop("disabled", !0), d(function (a) {
                f(), o.html(a).show()
            })
        }), m.on("submit", "FORM", function () {
            var a = b(this);
            return b.ajax({
                url: a.attr("action"),
                type: "POST",
                dataType: "JSON",
                data: a.serializeArray(),
                success: function (c) {
                    if (!0 === c.result) {
                        var d = a.closest(B), e = q.find(A + '[data-id="' + d.data("parent-id") + '"]');
                        if (d.remove(), o.html(c.content).show(), n.prop("disabled", !1).show(), c.comment && "string" == typeof c.comment.valueOf()) {
                            var f = b(c.comment);
                            0 !== e.length ? (f.attr("data-child", e.data("child") + 1), e.after(f)) : q.prepend(f), f.addClass("new"), f.on("click", z, g)
                        }
                        window.setTimeout(function () {
                            o.find(".alert-success").fadeTo(500, 0).slideUp(500, function () {
                                b(this).parent().remove()
                            })
                        }, 4e3)
                    }
                },
                error: function () {
                    n.prop("disabled", !1).show()
                }
            }), !1
        }))
    }

    function l() {
        var a = {};
        a.page = r, a.limit = s, i(), b.ajax({
            url: m.data("request-url"),
            type: "GET",
            data: a,
            dataType: "JSON",
            success: function (a) {
                if (!0 === a.result) {
                    j();
                    var c = b(a.content);
                    h(c), m.find(".comments").append(c), r++
                }
            }
        })
    }

    var m, n, o, p, q, r, s, t, u = "#w-comments-widget", v = '[data-role="show-more"]', w = '[data-role="add-form"]',
        x = '[data-role="cancel"]', y = ".add-form-container", z = ".sub-add-comment", A = ".comment",
        B = ".comment.reply", C = '[data-role="comments-loader"]', D = ".comments-container", E = ".border-triangle",
        F = ".pagination-container", G = '[data-role="pagination"]', H = "a[data-page]",
        I = '[data-role="city-selector"]', J = "data-opened", K = null;
    b(function () {
        k(), b("#item-tabs-block").on(window.EVENT_PRODUCT_CARD_TAB_RENDER, "#comment", k)
    })
}(document, jQuery), function (a) {
    a(function () {
        a("body").on("click", '[data-role="configuration-buy-widget"] .tab-controls a', function (b) {
            b.preventDefault();
            var c = a(this);
            if (c.is(".disabled"))return !1;
            c.siblings().each(function () {
                a(this).removeClass("active"), a("#" + a(this).data("target")).addClass("hidden")
            }), c.addClass("active"), a("#" + c.data("target")).removeClass("hidden")
        })
    })
}(jQuery), function (a) {
    function b(b) {
        !0 === b ? e.attr("data-is-default-state", "1") : (e.attr("data-is-default-state", "0"), e.data("hide-default-initial-message", 1), e.find(".default-state-block .initial-message").addClass("hidden"), a(".default-state-message").remove()), a(window).trigger(window.EVENT_RSU_CONFIGURATOR_DEFAULT_STATE_CHANGED)
    }

    function c() {
        function b() {
            if (a(".add-item-to-configurator-arrow").remove(), "1" === e.attr("data-is-default-state") && !e.data("hide-default-initial-message") && !window.checkScreenType(window.SCREEN_MOBILE)) {
                var b = h.offset(), c = i.offset(), j = b.left + h.outerWidth() + 10, k = b.top + h.outerHeight() / 2,
                    l = c.left + i.outerWidth() / 2, m = c.top - 10, n = getMiddlePointCoordinates(j, k, l, m, 100, 1);
                a(document.body).curvedArrow({
                    x0: j,
                    y0: k,
                    x1: n.x,
                    y1: n.y,
                    x2: l,
                    y2: m,
                    arrowSize: f,
                    lineWidth: g,
                    arrowColor: d,
                    objectCssClass: "add-item-to-configurator-arrow"
                })
            }
        }

        function c() {
            if (a(".required-category-info-arrow").remove(), a(".required-category-info-text").remove(), "1" === e.attr("data-is-default-state") && !e.data("hide-default-initial-message") && !window.checkScreenType(window.SCREEN_MOBILE)) {
                var b = a(".configurator-groups .configurator-category:first-of-type .required-marker"), c = b.offset(),
                    h = c.left + b.outerWidth() + 100, i = c.top - 30 - 36, j = c.left + b.outerWidth() + 5,
                    k = c.top + 10,
                    l = a("<div />").addClass("required-category-info-text").html("РћР±СЏР·Р°С‚РµР»СЊРЅС‹Рµ РєРѕРјРїР»РµРєС‚СѓСЋС‰РёРµ<br />РѕС‚РјРµС‡РµРЅС‹ Р·РІРµР·РґРѕС‡РєРѕР№").css({
                        position: "absolute",
                        height: "36px",
                        top: i + "px",
                        left: h + "px"
                    });
                a(document.body).append(l), i += 41;
                var m = getMiddlePointCoordinates(h, i, j, k, 25, -1);
                a(document.body).curvedArrow({
                    x0: h,
                    y0: i,
                    x1: m.x,
                    y1: m.y,
                    x2: j,
                    y2: k,
                    arrowSize: f,
                    lineWidth: g,
                    arrowColor: d,
                    objectCssClass: "required-category-info-arrow"
                })
            }
        }

        var d = "#888", f = 7, g = 1, h = e.find("#default-state-category-link"),
            i = a('.configurator-groups .group-categories:first > .configurator-category:first-of-type [data-role="show-catalog"]');
        h.on("click", function (a) {
            a.preventDefault(), i.click()
        }), b(), c(), a('[data-role="hide-city-no-assembly-message"]').on("click", function (d) {
            d.preventDefault(), a(this).closest(".default-state-message").remove(), c(), b()
        }), a(".alert").on("closed.bs.alert", function () {
            c(), b()
        }), a(window).on(["resize", window.EVENT_RSU_CONFIGURATOR_DEFAULT_STATE_CHANGED].join(" "), function () {
            c(), b()
        })
    }

    function d(c) {
        f.css({width: c.requiredSelectedPercent + "%"}), e.find(s).text(c.requiredSelected), e.find(n).text(c.productsCount), e.find(o).text(c.assemblyMessage), e.find(q).text(c.orderPrice), e.find(r).text(c.availableDate);
        var d = e.find(o).parent(), J = e.find(p);
        d.removeClass("trouble"), J.removeClass("active"), !1 === c.isAvailableAssembly ? (d.show(), a(t).addClass("inactive")) : (e.find(u).text(c.assemblyPrice), e.find(v).text(c.assemblyDate), a(t).removeClass("inactive"), d.hide()), 0 !== c.productsCount ? (j.parent().removeClass("inactive"), b(!1)) : (j.parent().addClass("inactive"), b(!0)), !1 === c.isAvailableOrder ? (e.find(".order-info").addClass("inactive"), i.attr("disabled", "disabled")) : (e.find(".order-info").removeClass("inactive"), i.removeAttr("disabled")), a(x).parent().removeAttr("data-troubled"), g.removeClass("error").html("");
        for (var K in c.incompatibleProducts)!1 !== c.incompatibleProducts.hasOwnProperty(K) && a(w + '[data-product-guid="' + K + '"]').each(function () {
            var b = a(this), d = b.find('[data-role="compatibility-status-icon"]'), e = b.find(".category-name"),
                f = e.find(".configuration-message"), g = b.find(".compatibility-message-mobile"),
                h = c.incompatibleProducts[K], i = c.incompatibleCounters[K], j = 0;
            if (b.find(z).addClass("hidden"), 0 === i.length && "" === h.countMessage) j = 1, f.text("РЎРѕРІРјРµСЃС‚РёРјРѕ"), g.text("РЎРѕРІРјРµСЃС‚РёРјРѕ"), e.removeClass("error"); else {
                if (f.text(""), g.text(""), e.addClass("error"), "" !== h.countMessage) {
                    j = 0;
                    var k = a("<a>").addClass("pseudo-link").attr("data-content", h.comment).attr("data-toggle", "popover").attr("data-trigger", "hover").attr("data-html", !0).text("c " + h.countMessage),
                        l = k.clone();
                    l.attr("data-role", "show-counter-tab").attr("data-counter-tab", "compatibility");
                    var m = k.clone();
                    m.attr("data-placement", "top"), f.text("РќРµСЃРѕРІРјРµСЃС‚РёРјРѕ ").append(l), g.text("РќРµСЃРѕРІРјРµСЃС‚РёРјРѕ ").append(m)
                }
                if (0 !== i.length) {
                    var n, o;
                    for (var p in i)!1 !== i.hasOwnProperty(p) && (n = a("<a>").addClass("pseudo-link").attr("data-role", "show-counter-tab").attr("data-counter-tab", p).text("РџРѕРґСЂРѕР±РЅРµРµ"), o = a("<span />").addClass("counter-troubles").html(i[p] + " ").append(n), f.append(o), g.append(o.clone()), b.find(z).removeClass("hidden").find(y).attr("data-counter-tab", p))
                }
            }
            d.attr("data-compatibility-status", j), e.append(f)
        });
        c.duplicateCategories.forEach(function (b) {
            var c = a(w + '[data-rsu-category-guid="' + b + '"]'), d = 0;
            a.each(c, function () {
                a(this).data("product-guid") && ++d
            }), c.length === d && c.find("[data-role=duplicate-category]").first().click()
        }), a(G + F + '[data-limited-one][data-limited-one!=""]').each(function () {
            -1 === c.limitedOneCategories.indexOf(a(this).data("limited-one")) && a(this).removeData("limited-one").removeProp("disabled")
        }), c.limitedOneCategories.forEach(function (b) {
            a("[" + E + '="' + b + '"]').find(G + F).prop("disabled", !0).data("limited-one", b)
        }), a(w).find('[data-role="required-marker"]').remove();
        c.requiredCategories.forEach(function (b) {
            a(w + '[data-rsu-category-guid="' + b + '"]').eq(0).find('[data-role="category-name"]').parent().append('<span class="required-marker" data-role="required-marker">*</span>')
        }), !1 === c.isAvailableAssembly ? h.attr("disabled", "disabled") : h.removeAttr("disabled"), a(document).trigger(window.EVENT_INIT_POPOVERS).trigger(window.EVENT_INIT_TOOLTIPS);
        var L = a('[data-role="logistic-troubles"]');
        if (0 !== c.logisticTroubles.length) {
            L.html("");
            for (var M in c.logisticTroubles)if (!1 !== c.logisticTroubles.hasOwnProperty(M)) {
                var N = a("<p>").html(c.logisticTroubles[M]);
                L.append(N)
            }
            L.removeClass("hidden")
        } else L.addClass("hidden");
        a(A).addClass("hidden");
        for (var O in c.optionalCategoriesData)if (!1 !== c.optionalCategoriesData.hasOwnProperty(O)) {
            var P = c.optionalCategoriesData[O], Q = a(A + '[data-component-group="' + O + '"]'),
                R = P.count + " " + String.countPostfix(P.count, ["РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Р№ С‚РѕРІР°СЂ", "РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹С… С‚РѕРІР°СЂР°", "РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹С… С‚РѕРІР°СЂРѕРІ"]),
                S = P.price + " " + String.countPostfix(P.price, ["СЂСѓР±Р»СЊ", "СЂСѓР±Р»СЏ", "СЂСѓР±Р»РµР№"]),
                T = Q.find('[data-role="optional-add-text"]');
            1 === P.count ? T.addClass("hidden") : T.removeClass("hidden"), Q.removeClass("hidden").find(B).text(R).end().find(C).text(S)
        }
        for (var U in c.eventNotifications)if (!1 !== c.eventNotifications.hasOwnProperty(U)) {
            var V = l.find(D + ".event-notification-template").clone();
            V.removeClass("event-notification-template").addClass("event-notification").find("p").text(c.eventNotifications[U]), l.append(V).removeClass("hidden")
        }
        if (i.attr("href", c.buyWithoutAssemblyLink), h.attr("href", c.buyWithAssemblyLink), null !== c.sameConfigurationLink && (m.html(a(H).html()), m.find('[data-role="same-configuration-link"]').attr("href", c.sameConfigurationLink)), !0 === c.canSaveConfiguration && m.html(a(I).html()), null !== c.tabCompatibilities) {
            g.text(a(x).eq(0).data("compatible-message")), k.html("");
            for (var W in c.tabCompatibilities)if (!1 !== c.tabCompatibilities.hasOwnProperty(W)) {
                var X = c.tabMessages[W];
                k.append(a(X));
                var Y = a('[data-trouble-icon="' + W + '"]');
                if (Y.parent().attr("data-troubled", !c.tabCompatibilities[W]), !0 !== c.tabCompatibilities[W]) {
                    var Z = Y.data("trouble-message"),
                        $ = a("<a>").addClass("rsu-switcher-btn").attr("data-role", "show-trouble-tab").attr("data-tab-name", W).text(Z);
                    g.addClass("error").html($).append(a("<i>")), d.addClass("trouble"), J.addClass("active")
                }
            }
        }
    }

    window.EVENT_RSU_CONFIGURATOR_DEFAULT_STATE_CHANGED = "rsu-configurator:default_state_changed", window.RSU_STATUS_WIDGET = {updateData: d};
    var e, f, g, h, i, j, k, l, m, n = '[data-role="configurator-items-counter"]', o = '[data-role="assembly-message"]',
        p = '[data-role="error-icon"]', q = '[data-role="order-price"]', r = '[data-role="available-date"]',
        s = '[data-role="required-selected"]', t = ".assembly-data", u = '[data-role="assembly-price"]',
        v = '[data-role="assembly-date"]', w = '[data-role="category-block"]', x = "[data-trouble-icon]",
        y = '[data-role="show-counter-tab"]', z = '[data-role="alert-counters"]',
        A = '[data-role="optional-category-hint"]', B = '[data-role="optional-count"]',
        C = '[data-role="optional-price"]', D = '[data-role="event-notification"]', E = "data-rsu-category-guid",
        F = ".product-count-plus", G = '[data-role="change-product-count"]',
        H = '[data-role="modal-template-has-same-configuration"]',
        I = '[data-role="modal-template-can-save-configuration"]';
    a(function () {
        if (e = a('[data-role="configurator-status-widget"]'), 0 !== e.length) {
            var b = a("body");
            i = a('[data-role="buy-simple"]'), h = a('[data-role="buy-assembly"]'), g = a('[data-role="compatibility-troubles-message"]'), k = a('[data-role="compatibility-tabs"]'), l = a('[data-role="event-notifications"]'), f = a('[data-role="required-progress-bar"]'), j = a('[data-role="show-save-configuration-modal"]'), m = a('[data-role="modal-for-save-configuration-content"]'), d(window.RSU_INITIAL_DATA), b.on("click", function (b) {
                var c = ['[data-role="compatibility-tab"]', '[data-role="show-trouble-tab"]', y, x, p],
                    d = a(c.join(","));
                !1 === d.is(b.target) && 0 === d.has(b.target).length && d.removeClass("open opened").parent().removeClass("mobile-show")
            }), e.on("click", '[data-role="clear-configuration"]', function () {
                var b = a(this);
                if (void 0 !== b.attr("data-in-process"))return !1;
                b.attr("data-in-process", !0)
            }), e.on("click", '[data-role="pair-product-change"], [data-role="pair-product-remove"]', function (b) {
                b.preventDefault();
                var c = a(this), d = c.closest('[data-role="pair-product"]'), e = d.data("product-guid"),
                    f = a(w + '[data-product-guid="' + e + '"]');
                if (0 !== f.length) {
                    var g;
                    c.closest('[data-role="compatibility-tab"]').removeClass("open"), a('[data-role="show-trouble-tab"]').removeClass("opened"), a('[data-role="compatibility-tabs"]').removeClass("mobile-show"), "pair-product-change" === c.attr("data-role") ? (g = f.find('[data-role="configurator-controls"] .btn-change'), a(window).scrollTop(f.offset().top)) : "pair-product-remove" === c.attr("data-role") && (g = f.find('[data-role="configurator-controls"] .btn-remove')), g.click()
                }
            }), e.on("click", '[data-role="change-power-item"]', function (b) {
                b.preventDefault();
                var c = a(this), d = c.data("product-guid"), e = a(w + '[data-product-guid="' + d + '"]');
                0 !== e.length && (c.closest('[data-role="compatibility-tab"]').removeClass("open"), a('[data-role="show-trouble-tab"]').removeClass("opened"), a('[data-role="compatibility-tabs"]').removeClass("mobile-show"), a(window).scrollTop(e.offset().top), e.find('[data-role="configurator-controls"] .btn-change').click())
            }), e.on("click", ".rsu-switcher-btn", function (b) {
                b.preventDefault(), a(this).toggleClass("opened")
            }), e.on("click", '[data-role="show-trouble-tab"]', function () {
                var b = a(this), c = b.data("tab-name");
                b.hasClass("opened") ? k.find('[data-tab-category="' + c + '"]').addClass("open") : k.find('[data-tab-category="' + c + '"]').removeClass("open")
            }), e.on("click", '[data-role="close-tab"]', function (b) {
                b.preventDefault(), a(this).closest('[data-role="compatibility-tab"]').removeClass("open").parent().removeClass("mobile-show"), g.find(".rsu-switcher-btn").removeClass("opened")
            }), e.on("click", '[data-role="show-consumers"]', function () {
                var b = a(this), c = e.find('[data-role="consumer-list"]');
                b.hasClass("opened") ? c.addClass("opened") : c.removeClass("opened")
            }), e.on("click", '[data-role="show-slot-groups"]', function () {
                var b = a(this), c = b.closest('[data-role="compatibility-tab"]').find(".counter-groups");
                b.hasClass("opened") ? c.addClass("opened") : c.removeClass("opened")
            }), e.on("click", x, function () {
                a('[data-role="compatibility-tab"]').removeClass("open");
                var b = a(this), c = b.parent().attr("data-troubled");
                if (void 0 !== c) {
                    var d = g.find('[data-role="show-trouble-tab"]');
                    if (0 !== d.length && d.data("tab-name") === b.data("trouble-icon"))return d.click(), !1;
                    c = "true" === c;
                    var f = c ? b.data("trouble-message") : b.data("compatible-message");
                    if (c ? (g.addClass("error"), e.find(o).text("РџСЂРѕР±Р»РµРјР°! " + f + ". РЎР±РѕСЂРєР° РЅРµРІРѕР·РјРѕР¶РЅР°.")) : g.removeClass("error"), "compatibility" === b.data("trouble-icon") && !1 === c) g.removeClass("error").text(f); else {
                        var h = a("<a>").addClass("rsu-switcher-btn").attr("data-role", "show-trouble-tab").attr("data-tab-name", b.data("trouble-icon")).text(f);
                        g.html(h).append(a("<i>")), h.click()
                    }
                }
            }), e.on("click", '[data-role="deficit-item"]', function (b) {
                b.preventDefault();
                var c = a(this), d = c.data("product-guid"), e = a(w + '[data-product-guid="' + d + '"]');
                c.closest('[data-role="compatibility-tab"]').removeClass("open"), a('[data-role="show-trouble-tab"]').removeClass("opened"), a('[data-role="compatibility-tabs"]').removeClass("mobile-show"), e.find('[data-role="show-product-card"]').eq(0).click(), a(window).scrollTop(e.offset().top)
            }), e.on("click", p, function () {
                !1 !== a(this).hasClass("active") && k.toggleClass("mobile-show")
            }), e.on("click", '[data-role="share-btn"]', function () {
                if ("" === a('[data-role="configuration-link"]').val()) {
                    var b = a(this), c = b.data("url");
                    b.toggleClass("disabled"), a.getJSON(c, function (c) {
                        !1 !== c.result && (a('[data-role="configuration-link"]').val(c.shareUrl), a('[data-role="shared-link"]').toggleClass("hidden"), b.toggleClass("disabled"))
                    })
                } else a('[data-role="shared-link"]').toggleClass("hidden")
            }), e.on("click", '[data-role="save-configuration"]', function (b) {
                b.preventDefault();
                var c = a(this), d = c.data("save-url");
                c.prop("disabled", !0), a.getJSON(d, function (a) {
                    !1 !== a.result && (window.location.href = a.previewUrl)
                })
            }), e.on("click", '[data-role="close-event-notification"]', function (b) {
                b.preventDefault(), a(this).closest(D).remove(), 0 === l.find(".event-notification").length && l.addClass("hidden")
            }), b.on("click", y, function (b) {
                b.preventDefault();
                var c = a(this), d = c.data("counter-tab");
                a('[data-trouble-icon="' + d + '"]').click(), a(window).scrollTop(a('[data-role="configurator-status-widget"]').offset().top)
            }), c()
        }
    })
}(jQuery), function (a, b, c) {
    function d() {
        function a() {
            g = h.find(n), g.click(function () {
                f.prop("disabled", !1).show(), h.empty().hide()
            })
        }

        e = b(l), 0 !== e.length && (f = e.find(m), h = e.find(o), i = e.find(p), j = e.find(s), k = b(t).find(u), f.click(function () {
            f.prop("disabled", !0), b.ajax({
                url: f.data("form-url"),
                type: "GET",
                dataType: "JSON",
                success: function (b) {
                    h.html(b.content).show(), f.hide(), a()
                },
                error: function (a) {
                    alert(a.responseText)
                }
            })
        }), h.on("submit", "FORM", function () {
            var c = b(this);
            return b.ajax({
                url: c.attr("action"),
                type: "POST",
                dataType: "JSON",
                data: c.serializeArray(),
                success: function (c) {
                    if (h.html(c.content), a(), !0 === c.result) {
                        f.prop("disabled", !1).show();
                        var d = parseInt(k.text());
                        d = isNaN(d) ? 1 : d + 1, k.text(d), 0 !== j.length && b(q).remove()
                    }
                },
                error: function (a) {
                    alert(a.responseText)
                }
            }), !1
        }), i.on("click", function () {
            var a = b(this).data("part-id");
            return !!a && (b(this).closest(q).find(r).filter(function () {
                    return b(this).data("part-id") === a
                }).toggleClass("expanded"), !1)
        }), j.click(function () {
            return b(this).siblings(".description").toggle(), !1
        }))
    }

    var e, f, g, h, i, j, k, l = "#driver", m = "[data-role=add]", n = "[data-role=cancel]",
        o = "[data-role=driver-form]", p = ".driver-part > .item-title", q = ".table-drivers", r = ".driver-item",
        s = ".col-driver > a.item-title", t = "#item-tabs-block", u = "[aria-controls=driver] > .count";
    b(function () {
        d(), b(t).on(window.EVENT_PRODUCT_CARD_TAB_RENDER, l, d)
    })
}(document, jQuery), function (a, b, c) {
    function d() {
        var d = "";
        if (window.getSelection ? d = window.getSelection().toString() : a.selection && "Control" !== a.selection.type && (d = a.selection.createRange().text), d = d.trim(), d = d.replace(/[ ]{2,}/gim, " "), d = d.replace(/\r/gim, ""), d = d.replace(/\n{2,}/gim, "\n"), "" !== (d = d.replace(/^[ ]+([^ ])/gim, "$1")))return c === e && (e = b("#b-feedback-fast-dialog"), f = e.find('[data-role="create-ticket-form-text-input"]'), e.find('[data-action="confirm"]').click(function () {
            b(this).prop("disabled", !0), b("#b-feedback-fast-form").submit()
        })), f.val(d + "\n- - -\n\n"), e.modal("show"), f.focus(), f.get(0).selectionStart = f.val().length, !1
    }

    var e, f;
    b(function () {
        b("#feedback-fast-dialog-show").on("click", d), b(a).keydown(function (a) {
            13 === a.keyCode && !0 === a.ctrlKey && !0 === b('[data-tab-name="description"]').hasClass("active") && d()
        })
    })
}(document, jQuery), function (a, b) {
    function c(a) {
        a.$forms.each(function (c, d) {
            b.map(b(d).find("input[name]:not([disabled])").serializeArray(), function (b) {
                a.data[b.name] = b.value
            })
        })
    }

    function d(a) {
        c(a), b.map(a.data, function (c, d) {
            a.$form.append(b('<input type="hidden" name="' + d + '" value="' + c + '" />'))
        })
    }

    function e(a) {
        1 != a.lockHook && (a.lockHook = !0, a.$forms.each(function () {
            if (a.hookFn instanceof Function)return a.hookFn.call(this, a.$forms);
            b(this).submit()
        }), a.lockHook = !1, a.$form.submit())
    }

    function f() {
        var a = h[b(this).data("action")];
        return 0 == a.lockHook && (a.$forms.each(function () {
            for (var c = a.propaganda[b(this).data("id")], d = 0, e = c.length; d < e; ++d)c[d].call(this, a.$forms)
        }), e.call(this, a)), !1
    }

    function g(a) {
        var c = a.target, d = b(c), e = a.delegateTarget, f = b(e), g = f.data("action"), i = f.data("name"),
            j = h[g].syncs[i], k = f.data("prefix") || "", l = f.data("attr") || "name",
            m = (d.attr(l) || "").replace(k, "");
        j.not(e).each(function () {
            if (f.is(this))return !0;
            var a = b(this), e = a.data("prefix") || "", g = a.data("attr") || "name",
                h = "[" + g + '="' + e + m + '"]';
            a.find(h).each(function () {
                var a = b(this), e = d.is("input[type=checkbox]") || d.is("input[type=radio]"),
                    f = b(a.is("input[type=checkbox]") || a.is("input[type=radio]"));
                e && f ? this.checked = c.checked : a.val(d.val()), a.on("change", function (a) {
                    return b(a.delegateTarget).off("change", arguments.callee), a.preventDefault(), !1
                }), a.change()
            })
        })
    }

    var h = {}, i = function () {
        return arguments.callee
    };
    i.attach = function (a) {
        var c = b(a);
        if (!c.is("form"))return null;
        var e = c.attr("action"), i = c.attr("name"), j = h[e];
        if (!h.hasOwnProperty(e)) {
            var k = b('<form action="' + e + '" method="' + c.attr("method") + '" />');
            k.hide().appendTo("BODY"), j = h[e] = {
                $form: k,
                $forms: b(),
                lockHook: !1,
                hookFn: null,
                data: {},
                propaganda: {},
                syncs: {}
            }, k.on("submit", function () {
                d(j)
            })
        }
        return j.$forms.index(c.get(0)) > -1 ? e : (c.data("id", "g" + j.$forms.length), c.data("action", e), c.data("name", i), j.syncs.hasOwnProperty(i) || (j.syncs[i] = b()), j.syncs[i].push(c), j.$forms.push(c.get(0)), c.on("change", g).on("submit", f), e)
    }, i.detach = function (a) {
        var c = b(a);
        if (c.is("form")) {
            var d = c.data("action"), e = h[d], g = e.$forms.index(c);
            g > -1 && e.$forms.splice(g, 1), delete e.propaganda[c.data("id")], c.off("submit", f)
        }
    }, i.send = function (a) {
        e.call(null, h[a])
    }, i.setGroupHook = function (a, b) {
        h.hasOwnProperty(a) && b instanceof Function && (h[a].hookFn = b)
    }, i.addFormHook = function (a, c) {
        var d = b(a);
        if (d.is("form") && c instanceof Function) {
            var e = h[this.attach(d)], f = d.data("id");
            e.propaganda.hasOwnProperty(f) || (e.propaganda[f] = []), e.propaganda[f].push(c)
        }
    }, i.killFormHook = function (a, c) {
        var d = b(a);
        if (d.is("form") && c instanceof Function) {
            var e = h[d.data("action")];
            if (!e)return;
            var f = e.propaganda[d.data("id")];
            0 == arguments.length && f.splice(0, f.length);
            var g = f.indexOf(c);
            f.splice(g, 1)
        }
    }, i.submit = function (a, b) {
        h.hasOwnProperty(a) && (b instanceof Function ? h[a].$form.submit(b) : this.send(a))
    }, i.off = function (a, b) {
        h.hasOwnProperty(a) && b instanceof Function && h[a].$form.off("submit", b)
    }, window.FormAggregator = i, b.fn.aggregateForm = function (a) {
        b(this).each(function () {
            i.attach(this), i.addFormHook(this, a)
        })
    }, b.fn.detachForm = function () {
        i.detach(this)
    }, b.fn.addHook = function (a) {
        i.addFormHook(this, a)
    }, b.fn.killHook = function (a) {
        i.killFormHook(a)
    }, b.fn.getGroupName = function () {
        return b(this).data("action")
    }
}(document, jQuery), function (a) {
    a(document).ready(function () {
        var b = a("#homepage-review-slider-wrap"), c = a(".reviews-slider", b).owlCarousel({
            items: 4,
            itemsMobile: [479, b.data("mobile-row-items")],
            itemsTabletSmall: [768, b.data("tablet-ver-row-items")],
            itemsTablet: [991, b.data("tablet-hor-row-items")],
            itemsDesktopSmall: [1199, b.data("tablet-hor-row-items")],
            itemsDesktop: [1200, b.data("desktop-row-items")],
            navigation: !1,
            pagination: !1,
            rewindNav: !0,
            autoPlay: !1
        });
        a(".button-right", b).click(function () {
            return c.trigger("owl.next"), !1
        }), a(".button-left", b).click(function () {
            return c.trigger("owl.prev"), !1
        })
    })
}(jQuery), function (a) {
    function b() {
        var b = a(this), f = b.find(c);
        f.owlCarousel({
            items: f.data("wide-desktop-items") ? f.data("wide-desktop-items") : window.SLIDER_WIDE_DESKTOP_VISIBLE_ITEMS_COUNT,
            itemsDesktop: [window.SCREEN_DESKTOP_MAX_WIDTH, f.data("desktop-items") ? f.data("desktop-items") : window.SLIDER_DESKTOP_VISIBLE_ITEMS_COUNT],
            itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, f.data("tablet-items") ? f.data("tablet-items") : window.SLIDER_TABLET_VISIBLE_ITEMS_COUNT],
            itemsMobile: [window.SCREEN_MOBILE_MAX_WIDTH, f.data("mobile-items") ? f.data("mobile-items") : window.SLIDER_MOBILE_VISIBLE_ITEMS_COUNT],
            pagination: !1,
            responsive: !0
        }), b.find(d).click(function () {
            f.trigger("owl.prev")
        }), b.find(e).click(function () {
            f.trigger("owl.next")
        })
    }

    var c = ".slider-content", d = ".slider-control-left", e = ".slider-control-right";
    window.SLIDER_WIDE_DESKTOP_VISIBLE_ITEMS_COUNT = 4, window.SLIDER_DESKTOP_VISIBLE_ITEMS_COUNT = 4, window.SLIDER_TABLET_VISIBLE_ITEMS_COUNT = 2, window.SLIDER_MOBILE_VISIBLE_ITEMS_COUNT = 1;
    var f;
    window.getSliderItemsCount = function () {
        switch (window.getScreenType()) {
            case window.SCREEN_WIDE:
                return window.SLIDER_WIDE_DESKTOP_VISIBLE_ITEMS_COUNT;
            case window.SCREEN_DESKTOP:
                return SLIDER_DESKTOP_VISIBLE_ITEMS_COUNT;
            case window.SCREEN_TABLET:
                return SLIDER_TABLET_VISIBLE_ITEMS_COUNT;
            case window.SCREEN_MOBILE:
                return SLIDER_MOBILE_VISIBLE_ITEMS_COUNT;
            default:
                return 0
        }
    }, a(function () {
        f = a(".slider"), f.each(b)
    }), a(document).on("slider-init", function () {
        var c = a(".slider"), d = c.not(f);
        f = c, d.each(b)
    })
}(jQuery),
    function (a, b) {
        var c, d, e;
        b(function () {
            c = b(".category-items-phone").find(".menu-rsu"), 0 !== c.length && (d = b(".menu-content", c), e = b('[data-role="rsu-menu-switcher"]', c), e.on("click", function () {
                return d.toggleClass("shown"), d.hasClass("shown") && (d.get(0).scrollTop = 0), !1
            }))
        })
    }(document, jQuery), function (a) {
    function b() {
        g.find(s).click(function () {
            return g.toggleClass("mobile-collapsed"), !1
        });
        var b = g.find(r);
        b.length > t && b.slice(t).addClass("mobile-hidden"), 0 === b.filter(".mobile-hidden").length ? m.addClass("mobile-hidden") : m.click(function () {
            return b.filter(".mobile-hidden").slice(0, t).removeClass("mobile-hidden"), 0 === b.filter(".mobile-hidden").length && a(this).addClass("mobile-hidden"), !1
        })
    }

    function c() {
        l.click(function () {
            return h = x, z += u, n - z < u && (h = y, z = n), f(), !1
        }), k.click(function () {
            return z = n, h = y, f(), !1
        }), i.click(function () {
            return h = w, z = v, f(), !1
        });
        var b = function () {
            return z = v, h = w, f(), !1
        };
        i.click(b), j.click(b), h = w, g.removeClass("desktop-collapsed"), window.checkScreenType(window.SCREEN_TABLET, window.SCREEN_DESKTOP, window.SCREEN_WIDE) && (d(), f()), a(window).on(window.EVENT_CHANGE_SCREEN_TYPE, function () {
            d(), window.checkScreenType(window.SCREEN_TABLET, window.SCREEN_DESKTOP, window.SCREEN_WIDE) ? f() : e()
        })
    }

    function d() {
        p = g.find(q).height(), o = g.find(r + ":first").outerHeight(!0), h !== y && (n = Math.ceil(p / o), z > n && (z = n))
    }

    function e() {
        g.css("height", "auto")
    }

    function f() {
        z >= n ? g.css("height", "auto") : g.height(o * z);
        var b = g.find(r);
        switch (h) {
            case w:
                g.height() < p && (i.addClass("hidden"), k.addClass("hidden"), l.removeClass("hidden").insertBefore(b.first()), j.addClass("hidden"));
                break;
            case x:
                var c = null, d = g.offset().top;
                b.each(function (e, f) {
                    var g = a(f), h = g.offset().top - d;
                    if (Math.ceil(h / o) + 1 > z)return c = b.eq(e - 1), !1
                }), null !== c ? l.outerWidth(!0) + k.outerWidth(!0) > c.outerWidth(!0) ? l.insertBefore(c) : l.insertBefore(c.prev()) : l.insertAfter(b.last()), k.removeClass("hidden").insertBefore(l), i.removeClass("hidden");
                break;
            case y:
                k.addClass("hidden"), l.addClass("hidden"), j.removeClass("hidden").insertAfter(b.last())
        }
    }

    var g, h, i, j, k, l, m, n, o, p, q = "[data-role=inner-block]", r = "[data-role=offer-item]",
        s = "[data-role=mobile-offers-expand]", t = 10, u = 3, v = 1, w = 1, x = 2, y = 3, z = 1;
    a(function () {
        g = a("[data-role=offer-representation-in-category]"), i = g.find("[data-role=desktop-hide-all-top]"), j = g.find("[data-role=desktop-hide-all-bottom]"), k = g.find("[data-role=desktop-show-all]"), l = g.find("[data-role=desktop-show-more]"), m = g.find("[data-role=mobile-show-more]"), b(), c()
    })
}(jQuery), function (a, b, c) {
    function d() {
        function a() {
            if (o !== p) {
                q = 1;
                var a = h.find(".opinions-list").find(D);
                f(function () {
                    e(s), a.remove(), b(E + ":first").remove()
                })
            } else e(s)
        }

        h = b(w), 0 !== h.length && (j = h.find(z), l = h.find(x), i = h.find(B), k = h.find(C), n = h.find(F), m = h.find(A), u = h.find(N), v = h.find(O), p = parseInt(h.data("count")), o = parseInt(h.data("limit")), q = parseInt(m.find(G).data("current-page")) + 1, r = parseInt(h.find(I).val()), s = parseInt(h.find(J).val()), t = parseInt(h.find(K).val()), P = b(window).scrollTop(), h.find(J).select2({
            theme: "krajee",
            templateResult: function (a) {
                return b("<div>", {text: a.text}).attr("class", "option-with-star")
            },
            templateSelection: function (a) {
                return b("<div>", {text: a.text}).attr("class", "option-with-star")
            },
            minimumResultsForSearch: -1
        }).next().css("display", "block"), h.find(I).select2({
            theme: "krajee", templateResult: function (a) {
                var d = b(a.element);
                if (c !== d.data())return b("<div>", {text: a.text}).attr("class", "option-with-arrow " + d.data("class"))
            }, templateSelection: function (a) {
                var d = b(a.element);
                if (c !== d.data())return b("<div>", {text: a.text}).attr("class", "option-with-arrow " + d.data("class"))
            }, minimumResultsForSearch: -1
        }).next().css("display", "block"), h.on("click", L, function () {
            q = parseInt(b(this).data("page")) + 1;
            var a = h.find(".opinions-list").find(D);
            return f(function () {
                e(s), a.remove(), b(E + ":first").remove()
            }), !1
        }), h.on("click", y, function () {
            return h.find(E).remove(), f(), !1
        }), h.on("change", I, function () {
            q = 1, r = parseInt(b(this).val());
            var a = h.find(".opinions-list").find(D);
            f(function () {
                e(s), a.remove(), b(E + ":first").remove()
            })
        }), h.on("change", J, function () {
            s = parseInt(b(this).val()), a()
        }), b(M).click(function () {
            b("body").animate({scrollTop: u.offset().top - 50}, 500)
        }), h.on("change", K, function () {
            q = 1, t = parseInt(b(this).val());
            var a = h.find(".opinions-list").find(D);
            f(function () {
                e(s), a.remove(), h.find(E).remove()
            })
        }), h.find("[data-grade-filter]").click(function () {
            return s = b(this).data("grade-filter"), b(J).val(s).change(), !1
        }), j.click(function () {
            0 < v.length && v.css({display: "none"}), P = b(window).scrollTop(), i.attr("data-form-open", !0);
            var a = k.find('[data-role="form-container"]');
            if (0 !== a.find(".add-opinion-form").length)return void a.show();
            b.ajax({
                url: j.data("form-url"), type: "GET", dataType: "JSON", success: function (c) {
                    if (!0 !== c.result)return void i.attr("data-form-open", !1);
                    var d = b(c.content);
                    a.append(d), a.find('[data-toggle="tooltip"]').tooltip({
                        container: a,
                        placement: "right"
                    }), a.find(H).select2().next().css("display", "block")
                }, error: function (a) {
                }
            })
        }), k.on("submit", "FORM", function () {
            var a = b(this);
            return b.ajax({
                url: j.data("form-url"),
                type: "POST",
                dataType: "JSON",
                data: a.serializeArray(),
                success: function (a) {
                    if (!0 === a.result) {
                        var c = b(a.content);
                        if (k.find('[data-role="form-container"]').html(c), a.opinion && "string" == typeof a.opinion.valueOf()) {
                            var d = b(a.opinion);
                            d.addClass("new"), h.find(".opinions-list").prepend(d)
                        }
                        b(window).scrollTop(P), j.prop("disabled", !1), i.attr("data-form-open", !1), setTimeout(function () {
                            k.find('[data-role="form-container"] .alert-warning').fadeOut(700)
                        }, 2e3)
                    }
                },
                error: function (a) {
                }
            }), !1
        }), k.on("click", 'FORM [data-role="close-add-opinion-form"]', function () {
            j.prop("disabled", !1), i.attr("data-form-open", !1), k.find('[data-role="form-container"] ').hide(), b(window).scrollTop(P)
        }), k.on("click", ".mark-selector  .star-item", function () {
            var a = b(this).closest(".mark-line").find(".star-item");
            a.removeClass("active");
            for (var c = b(this).data("val"), d = 0; d < c; ++d)a.eq(d).addClass("active");
            b(this).siblings().find("input[type=hidden].rating-val").val(c)
        }), g())
    }

    function e(a) {
        0 === a ? h.find(".opinions-list [data-grade]").show() : (h.find(".opinions-list [data-grade]").hide(), h.find('.opinions-list [data-grade="' + a + '"]').show())
    }

    function f(a) {
        var d = {};
        d.page = q, d.limit = o, d.sort = r, d.source = t, s && (d.grade = s), n.show(), b.ajax({
            url: h.data("request-url"),
            type: "GET",
            data: d,
            dataType: "JSON",
            success: function (d) {
                if (n.hide(), !0 === d.result) {
                    var e = b(d.content);
                    m.find(".opinions").append(e), q++, window.history.pushState(null, "", e.find("ul.pagination li.active a").attr("href")), g(), c !== a && a()
                }
            },
            error: function (a) {
            }
        })
    }

    function g() {
        b(".vote-widget-container[data-has-many-negative]").each(function () {
            b(this).closest(D).addClass("has-many-negative")
        })
    }

    var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w = "#w-opinions-widget", x = '[data-role="marks-filter"]',
        y = '[data-role="show-more"]', z = '[data-role="add"]', A = ".opinion_container", B = ".opinions-header",
        C = '[data-role="add-form-container"]', D = ".opinion-item", E = ".pagination-container",
        F = '[data-role="opinions-loader"]', G = '[data-role="pagination"]', H = '[data-role="city-selector"]',
        I = '[data-role="opinions-sort-type"]', J = '[data-role="opinions-grades-filter"]',
        K = '[data-role="opinions-sources-filter"]', L = "a[data-page]", M = ".opinion-ajax-grade",
        N = ".filters-container", O = ".stub-container", P = null;
    b(function () {
        d(), b("#item-tabs-block").on(window.EVENT_PRODUCT_CARD_TAB_RENDER, "#opinion", d)
    })
}(document, jQuery), $(function (a, b) {
    var c;
    b(function () {
        if (c = b('[data-role="order-payment-methods"]'), 0 === c.length)return !1;
        c.find('a[data-toggle="tab"]').on("shown.bs.tab", function (a) {
            var d = b(a.target), e = b(a.relatedTarget), f = b("#" + e.attr("aria-controls")),
                g = f.find('[name="payment_method_selector"]:checked').val();
            void 0 !== g && e.data("default-payment-method", g), c.find('[name="payment_method_selector"]').removeAttr("checked").end().find('[value="' + d.data("default-payment-method") + '"]').click()
        })
    })
}(window, jQuery)), function (a, b) {
    b.EVENT_OS_VARIANT_CHANGED = "os-variant:changed";
    var c, d = function (c) {
        var d = c.data("variant"), e = "00000000-0000-0000-0000-000000000000" === d.guid;
        a('[data-role="os-change-notify"]').toggleClass("hidden", e), c.trigger(b.EVENT_OS_VARIANT_CHANGED, [d])
    };
    a(function () {
        c = a('[data-role="os-selection-widget"]'), 0 !== c.length && (c.on("change", '[data-role="change-optional-os"]', function () {
            var b = a(this);
            d(b)
        }), a(b).on(b.EVENT_UPDATE_CART, function (b, d) {
            var e = c.find('[data-role="change-optional-os"]');
            if (0 !== e.length) {
                for (var f in d)if (!1 !== d.hasOwnProperty(f)) {
                    var g = d[f];
                    e.each(function () {
                        var b = a(this), c = b.data("variant");
                        c.baseProductGuid === g.guid && (c.overlimitMessage = "", (-1 !== a.inArray(b.val(), g.optionalProducts) || 0 === g.optionalProducts.length && "00000000-0000-0000-0000-000000000000" === b.val()) && (c.isOsInCart = !0, b.data("variant", c)))
                    })
                }
                e.each(function () {
                    var b = a(this), c = b.data("variant");
                    if (!c.isOsInCart)for (var e in d)if (!1 !== d.hasOwnProperty(e)) {
                        var f = d[e];
                        c.baseProductGuid === f.guid && (c.overlimitMessage = f.overlimitMessage, c.isOsInCart = "" !== c.overlimitMessage, b.data("variant", c))
                    }
                })
            }
        }))
    }), a(b).load(function () {
        if (c = a('[data-role="os-selection-widget"]'), 0 !== c.length) {
            var b = c.find('[data-role="change-optional-os"]:checked');
            d(b)
        }
    })
}(jQuery, window), function (a, b, c) {
    function d() {
        clearTimeout(h), h = setTimeout(function () {
            clearTimeout(h), window.location = g
        }, 1e3 * f)
    }

    function e(a, c) {
        f = a, g = c, d(), b(window).on("mousemove", d)
    }

    var f, g, h = null;
    window.redirectWidget = e
}(document, jQuery), function (a, b) {
    b.fn.relatedProductsByCategoriesWidget = function () {
        function a() {
            function a(a) {
                b(f, m).removeClass("disabled"), -1 !== a.visibleItems.indexOf(0) && b(g, m).addClass("disabled"), -1 !== a.visibleItems.indexOf(a.owlItems.length - 1) && b(h, m).addClass("disabled")
            }

            var c = b(this);
            "object" != typeof c.data("owlCarousel") ? c.owlCarousel({
                items: j,
                itemsMobile: [window.SCREEN_MOBILE_MAX_WIDTH, l],
                itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, k],
                itemsDesktopSmall: [window.SCREEN_DESKTOP_MAX_WIDTH, j],
                navigation: !1,
                pagination: !1,
                rewindNav: !0,
                autoPlay: !1,
                scrollPerPage: !0,
                afterInit: function () {
                    b(d + " .product", m).removeClass("transparent"), a(this.owl)
                },
                afterAction: function () {
                    a(this.owl)
                }
            }) : a(c.data("owlCarousel").owl), b(f, m).off("click"), b(h, m).click(function () {
                b(this).is(".disabled") || c.trigger("owl.next")
            }), b(g, m).click(function () {
                b(this).is(".disabled") || c.trigger("owl.prev")
            })
        }

        function c(c) {
            var d = n.find("[data-id=" + c + "]");
            b("[data-role=list-item]", n).toggleClass("disabled", !1), d.closest("[data-role=list-item]").toggleClass("disabled", !0), b("[data-role=toggle-button] [data-role=title]", n).html(d.html()), b(i, m).attr("data-is-active", 0).filter("[data-id=" + c + "]").attr("data-is-active", 1), b(e, m).attr("data-is-active", 0).filter("[data-id=" + c + "]").attr("data-is-active", 1).each(a), b(window).trigger(EVENT_RELATED_PRODUCTS_CATEGORY_SHOWED)
        }

        window.EVENT_RELATED_PRODUCTS_CATEGORY_SHOWED = "related-for-product-card:category-showed";
        var d = "[data-role=related-products-slider-wrap]", e = "[data-role=related-products-slider]", f = ".nav-btn",
            g = ".btn-prev", h = ".btn-next", i = "[data-role=related-category-link]", j = 5, k = 3, l = 1, m = b(this),
            n = m.find(".mobile-controls [data-role=dropdown-list]");
        b(i, m).on("click", function () {
            return c(b(this).data("id")), !1
        }), b("[data-role=list-item]", n).on("click", function () {
            return b("[data-role=toggle-button]", n).dropdown("toggle"), c(b(this).data("id")), !1
        }), b(window).on(window.EVENT_UPDATE_CART, function (a) {
            var c = b(this);
            this == window && (c = b(a.target));
            var d = c.closest(e);
            if (0 !== d.length) {
                var f = b(i, m).filter("[data-id=" + d.data("id") + "]"), g = 1;
                f.data("buyedProductsCount") && (g += f.data("buyedProductsCount")), f.find("span").remove(), f.data("buyedProductsCount", g), f.append(" <span>(" + g + ")</span>")
            }
        }), b(e, m).filter("[data-is-active=1]").each(a)
    }
}(document, jQuery), function (a, b) {
    window.EVENT_RELATED_FOR_PRODUCT_CARD_LOADED = "related-for-product-card:content-loaded", window.EVENT_RELATED_PRODUCTS_CATEGORY_SHOWED = "related-for-product-card:category-showed";
    var c = "[data-role=related-products-card-widget-wrap]", d = "[data-role=toggle-related-products-widget]", e = !1;
    b(function () {
        function a() {
            if (!e && !window.checkScreenType(window.SCREEN_MOBILE)) {
                b.get(g.data("url")).done(function (a) {
                    if (!1 === a.result)return g.html('<div class="alert alert-info">РќРµ СѓРґР°Р»РѕСЃСЊ РїРѕР»СѓС‡РёС‚СЊ СЃРїРёСЃРѕРє Р°РєСЃРµСЃСЃСѓР°СЂРѕРІ.</div>'), b(this);
                    g.html(a.html), g.relatedProductsByCategoriesWidget(), b(window).trigger(EVENT_RELATED_FOR_PRODUCT_CARD_LOADED)
                }).fail(function () {
                    g.html('<div class="alert alert-info">РќРµ СѓРґР°Р»РѕСЃСЊ РїРѕР»СѓС‡РёС‚СЊ СЃРїРёСЃРѕРє Р°РєСЃРµСЃСЃСѓР°СЂРѕРІ.</div>')
                }).always(function () {
                    e = !0
                })
            }
        }

        function f(a) {
            !0 === a ? (b(d).attr("data-showed", 1), b(c).addClass("bordered"), g.show()) : (b(d).attr("data-showed", 0), b(c).removeClass("bordered"), g.hide())
        }

        var g = b("[data-role=related-products-card-widget]");
        0 !== g.length && (b(window).on(window.EVENT_CHANGE_SCREEN_TYPE, a), a(), b(d).on("click", function () {
            return f(!parseInt(b(this).attr("data-showed"))), !1
        }), b(window).on(window.EVENT_UPDATE_CART, function (a) {
            var c = b(this);
            this == window && (c = b(a.target)), c.data("product-guid") === g.data("main-product-guid") && (f(!0), window.checkScreenType(window.SCREEN_TABLET) && b("html, body").animate({scrollTop: c.offset().top - 40}, 300))
        }))
    })
}(document, jQuery), function (a, b, c) {
    function d(d) {
        c(b).trigger("slider-init"), c(a).on(a.EVENT_CHANGE_SCREEN_TYPE, function () {
            var b = d.find(".slider-control-left, .slider-control-right");
            d.find(".slider-item").length <= a.getSliderItemsCount() ? b.addClass(e) : b.removeClass(e)
        }).trigger(a.EVENT_CHANGE_SCREEN_TYPE), d.find(a.SELECTOR_CART_BUTTON).initSets()
    }

    a.EVENT_RELATED_PRODUCTS_SLIDER_INIT = "related-products:init", a.SELECTOR_RELATED_PRODUCTS_SLIDER = ".related-product-slider";
    var e = "mute";
    c(a).on(a.EVENT_RELATED_PRODUCTS_SLIDER_INIT, function (b, e) {
        var f = c(e);
        if (e || (f = c(a.SELECTOR_RELATED_PRODUCTS_SLIDER)), 0 === f.length)return !0;
        f.each(function () {
            d(c(this))
        }), c(a).on(a.EVENT_UPDATE_CART, function (b, d) {
            var e = c(this);
            this == a && (e = c(b.target));
            var f = e.closest("[data-product-guid]"), g = f.data("product-guid"),
                h = f.is(a.SELECTOR_CART_BUTTON) ? f : f.find(a.SELECTOR_CART_BUTTON);
            if (h.length) {
                if (void 0 !== d)return;
                d = h.getState()
            }
            c(a.SELECTOR_RELATED_PRODUCTS_SLIDER).find(a.SELECTOR_CART_BUTTON + '[data-product-guid="' + g + '"]').setState(d)
        })
    }), c(function () {
        c(a.SELECTOR_RELATED_PRODUCTS_SLIDER).trigger(a.EVENT_RELATED_PRODUCTS_SLIDER_INIT)
    })
}(window, document, jQuery), function (a, b, c) {
    function d() {
        return null !== i ? i : i = a("#remains-list tbody")
    }

    function e() {
        return d().find("tr:not(tr.table-row-loading)").remove()
    }

    function f() {
        if (!h && !g) {
            var b = a(this);
            (b.is(j) || (b = b.find(j), 0 != b.length)) && (e(), h = !0, a.get(b.data("url")).done(function (b) {
                if (g = !0, 0 == b.length)return i.append('\t\t\t\t\t\t<tr><td colspan="2" class="text-center">РўРѕРІР°СЂР° РЅРµС‚ РІ РѕСЃС‚Р°С‚РєР°С…</td></tr>\t\t\t\t\t'), this;
                for (var c = 0, d = b.length; c < d; ++c)a("<tr><td>" + b[c].shop_title + "</td><td>" + b[c].avails_count + "</td></tr>").appendTo(i)
            }).fail(function () {
                d().append('\t\t\t\t\t<tr><td colspan="2">\t\t\t\t\t\tРќРµ СѓРґР°Р»РѕСЃСЊ РїРѕР»СѓС‡РёС‚СЊ РёРЅС„РѕСЂРјР°С†РёР± РѕР± РѕСЃС‚Р°С‚РєР°С…. Р’РѕР·РјРѕР¶РЅС‹ РїСЂРѕР±Р»РµРјС‹ СЃ РїРѕРґРєРѕР»СЋС‡РµРЅРёРµРј Рє РёРЅС‚РµСЂРЅРµС‚Сѓ, Р·Р°РіСЂСѓР¶РµРЅРЅРѕСЃС‚СЊ СЃРµС‚Рё РёР»Рё РЅРµРїРѕР»Р°РґРєРё СЃ СЃРµСЂРІРµСЂРѕРј\t\t\t\t\t\t<br>\t\t\t\t\t\tРџРѕРїСЂРѕР±СѓР№С‚Рµ РѕР±РЅРѕРІРёС‚СЊ РїРѕР·РґРЅРµРµ.\t\t\t\t\t\t<hr>\t\t\t\t\t\t<div class="text-center">\t\t\t\t\t\t\t<button class="btn btn-primary remains-reload"><i class="glyphicon glyphicon-refresh"></i>&nbsp;РћР±РЅРѕРІРёС‚СЊ</button>\t\t\t\t\t\t</div>\t\t\t\t\t</td></tr>\t\t\t\t')
            }).always(function () {
                h = !1
            }))
        }
    }

    var g = !1, h = !1, i = null, j = "[data-js=remains-tab]";
    a(b).on("tabSelected", "#remains", f).on("click", ".remains-reload", f)
}(jQuery, document), function (a, b, c) {
    function d(a, c, d) {
        var e = a.find(r), f = a.closest(s);
        return f.find(n).remove(), f.find(q).show(), b.get(c).done(function (c) {
            if (a.data("loaded", !0), a.find(q).remove(), f.find(q).remove(), !1 === c.result)return e.append(E), b(this);
            e.html(c.html), F[d] = a.html()
        }).fail(function () {
            a.find(q).hide(), e.append(E), f.find(q).hide()
        }).always(function () {
            b(window).trigger(EVENT_AVAILS_MODAL_CONTENT_LOADED)
        })
    }

    function e(a, b) {
        null !== H && clearTimeout(H), H = setTimeout(function () {
            f(a)
        }, b || 1e3)
    }

    function f(a) {
        var d = a.find(u).filter(":not(.hidden)"), e = a.find(t), f = a.find(A), g = e.attr("id");
        if (e.hasClass("shown")) {
            var h = null;
            f.hide(), G.hasOwnProperty(g) && (h = G[g]), "" === e.html() && (h = null), loadYandexMaps(function () {
                if (null === h && (h = new ymaps.Map(g, {
                        zoom: 12,
                        controls: ["zoomControl", "fullscreenControl", "trafficControl"],
                        behaviors: ["default", "scrollZoom"],
                        center: [55.2627, 87.363281]
                    }), G[g] = h), h.geoObjects.removeAll(), !d.length)return void f.show();
                var e = new ymaps.GeoObjectCollection, i = a.data("product-id");
                if (i) {
                    var j, k = l(i);
                    k.length && (j = k.first().clone(), b.each(j.data(), function (a) {
                        j.removeAttr("data-" + a)
                    }), j.attr("data-commerce-target", "AVAILS_BUY"))
                }
                var m;
                d.each(function () {
                    var a = b(this), d = a.data("longitude");
                    if (c !== d && 0 !== d) {
                        var f = a.data("latitude");
                        if (c !== f && 0 !== f) {
                            var g = a.find('[class*="site-color-"]').css("color"), h = a.find(w);
                            if (i && j) {
                                switch (j.removeAttr("data-shop-id").removeAttr("data-postamat-id"), a.data("type")) {
                                    case B:
                                    case C:
                                        j.attr("data-shop-id", a.data("id"));
                                        break;
                                    case D:
                                        j.attr("data-postamat-id", a.data("id"))
                                }
                                h.find(y).html(j)
                            }
                            var k = new ymaps.Placemark([f, d], {balloonContent: h.html()}, {
                                preset: "islands#icon",
                                iconColor: g,
                                balloonCloseButton: !1
                            });
                            a.hasClass("selected") && (m = k), e.add(k)
                        }
                    }
                }), h.geoObjects.add(e), h.events.add("click", function () {
                    h.balloon.isOpen() && h.balloon.close()
                }), m ? (h.setCenter(m.geometry.getCoordinates()), h.setZoom(14).then(function () {
                    m.events.fire("click")
                })) : (h.setBounds(e.getBounds()), 1 === d.length && h.setZoom(14))
            })
        }
    }

    function g(a, c, f) {
        var g = b("#" + p + a);
        if (0 === g.length && (g = b(o).clone(!0, !0).attr("id", p + a), f && g.data("product-id", a), delete F[a]), g.on("shown.bs.modal", function () {
                b(window).trigger(EVENT_AVAILS_MODAL_SHOWN), g.find(".modal-dialog").addClass("shown"), e(g, 1), g.on("click", function () {
                    g.find(".current-shop-hint").addClass("hide")
                })
            }), g.on("hidden.bs.modal", function () {
                g.find(".current-shop-hint").removeClass("hide")
            }), g.find("[data-role=hide-modal]").on("click", function () {
                g.find(".modal-dialog").removeClass("shown"), setTimeout(function () {
                    g.modal("hide")
                }, 200)
            }), g.modal("show"), F.hasOwnProperty(a))return !0;
        d(g, c, a).then(function () {
            g.data("product-id") && g.on("click", ".avails-map .btn-cart", function () {
                l(g.data("product-id")).first().data("shop-id", b(this).data("shop-id")).data("postamat-id", b(this).data("postamat-id")).removeAttr("data-commerce-target").click()
            }), g.on("click", ".btn-cart", function () {
                g.modal("hide")
            }), g.find(".btn-cart").attr("data-commerce-target", "AVAILS_BUY"), g.on("click", u, function (a) {
                var c = b(this);
                if ("avails-map" === b(a.target).data("tab-show"))return void i(g, c);
                h(g, c)
            });
            var a = g.find(m);
            if (a.length) {
                i(g, a);
                var c = a.closest(x),
                    d = Math.round(c.scrollTop() + a.position().top - c.outerHeight() / 2 + a.outerHeight() / 2);
                c.scrollTo(d)
            }
            g.on("click", "[data-tab-show]", function () {
                var a = b(this).data("tab-show");
                g.find(A).hide(), g.find("[data-tab-show]").removeClass("active"), g.find('[data-tab-show="' + a + '"]').addClass("active"), b("[data-tab-role]").removeClass("shown"), b('[data-tab-role="' + a + '"]').addClass("shown"), "avails-map" === a && e(g, 1)
            }), g.shopFilters({
                applyFilters: function (a) {
                    e(a)
                }, clear: function () {
                    if (g.data("product-id")) {
                        l(g.data("product-id")).removeAttr("data-shop-id").removeAttr("data-postamat-id")
                    }
                }, changeStatus: function (a) {
                    e(a)
                }, showOpenedShops: function (a) {
                    k(a)
                }
            })
        })
    }

    function h(a, b) {
        b.hasClass("selected") ? j(a) : i(a, b)
    }

    function i(a, b) {
        if (j(a), b.addClass("selected"), window.getScreenType() !== window.SCREEN_MOBILE && a.data("product-id")) {
            var c = l(a.data("product-id"));
            switch (b.data("type")) {
                case B:
                case C:
                    c.data("shop-id", b.data("id"));
                    break;
                case D:
                    c.data("postamat-id", b.data("id"))
            }
        }
    }

    function j(a) {
        if (a.find(u).removeClass("selected"), a.data("product-id")) {
            l(a.data("product-id")).removeAttr("data-shop-id").removeAttr("data-postamat-id")
        }
    }

    function k(a) {
        var c = a.find(x), d = c.find(u), e = a.find(z), f = a.find(".avails-list .list-head");
        f.removeClass("shops-closed");
        var g = 0, h = 0, i = 0;
        if (d.each(function () {
                var a = b(this);
                a.data("is-opened") && g++, a.data("is-avail") && h++, !a.data("is-opened") && a.data("is-avail") && i++
            }), 0 === g) {
            d.sort(function (a, c) {
                return -1 === b(a).data("waiting-time") ? -1 : b(a).data("waiting-time") - b(c).data("waiting-time")
            }), c.html(d);
            var j = "РЎРµР№С‡Р°СЃ РІСЃРµ РјР°РіР°Р·РёРЅС‹ Р·Р°РєСЂС‹С‚С‹.", k = d.first();
            return k.data("open-time") && (j += " РџРµСЂРІС‹Р№ РјР°РіР°Р·РёРЅ РѕС‚РєСЂРѕРµС‚СЃСЏ РІ <b>" + k.data("open-time") + "</b>"), e.html("<div>" + j + "</div>"), void f.addClass("shops-closed")
        }
        a.find(u).filter(":not(" + v + ")").addClass("hidden"), h && h === i && (e.html("<div>РЎРµР№С‡Р°СЃ РѕС‚РєСЂС‹С‚С‹ РјР°РіР°Р·РёРЅС‹ С‚РѕР»СЊРєРѕ СЃ С‚РѕРІР°СЂРѕРј РїРѕРґ Р·Р°РєР°Р·</div>"), f.addClass("shops-closed"))
    }

    function l(a) {
        return b(window.SELECTOR_CART_BUTTON + '[data-product-guid="' + a + '"]')
    }

    window.EVENT_AVAILS_MODAL_SHOWN = "avails-modal:shown", window.EVENT_AVAILS_MODAL_CONTENT_LOADED = "avails-modal:content-loaded";
    var m = ".current-shop", n = ".connect-error", o = "#modal-for-avails-template", p = "avails-modal-",
        q = ".loading-dots", r = '[data-id="avails-modal-content"]', s = ".order-avail-wrap", t = ".avails-map",
        u = ".avails-item", v = "[data-is-opened=1]", w = ".balloon-content-wrap", x = ".avails-items",
        y = ".cart-btn-wrap", z = "[data-role=shops-closed-message]", A = "[data-role=map-is-empty-message]", B = 1,
        C = 2, D = 3,
        E = '<div class="text-center connect-error">РќРµ СѓРґР°Р»РѕСЃСЊ РїРѕР»СѓС‡РёС‚СЊ СЃРїРёСЃРѕРє РјР°РіР°Р·РёРЅРѕРІ.</div>',
        F = {}, G = {}, H = null;
    b(function () {
        b(a).on("click", '[data-role="show-avails-modal"]', function (a) {
            a.preventDefault();
            var c = b(this);
            g(c.data("modal-id"), c.data("url"), c.data("product-id"))
        }), "#modal_remains" === window.location.hash && b('#product-page .order-avail-wrap:first [data-role="show-avails-modal"]').click(), b(window).on(window.EVENT_OS_VARIANT_CHANGED, function (a, c) {
            var d = b('[data-role="show-avails-modal"][data-product-id="' + c.baseProductGuid + '"]'),
                e = d.closest(s).parent(), f = null !== c.availsContent;
            if (e.find(".dynamic-widget").remove(), d.closest(s).toggleClass("hidden", f), f) {
                var g = b(c.availsContent);
                g.addClass("dynamic-widget"), e.append(g)
            }
        })
    })
}(document, jQuery), function (a, b, c) {
    function d() {
        function a() {
            h = i.find(p), h.click(function () {
                g.prop("disabled", !1).show(), i.empty().hide()
            })
        }

        f = b(n), 0 !== f.length && (g = f.find(o), i = f.find(q), j = f.find(r), l = parseInt(f.data("limit")), k = f.data("count"), k = "" === k ? null : parseInt(k), g.click(function () {
            g.prop("disabled", !0), b.ajax({
                url: g.data("form-url"),
                type: "GET",
                dataType: "JSON",
                success: function (b) {
                    !0 === b.result && (i.html(b.content).show(), g.hide(), a())
                },
                error: function (a) {
                    alert(a.responseText)
                }
            })
        }), i.on("submit", "FORM", function () {
            var d = b(this);
            return b.ajax({
                url: d.attr("action"),
                type: "POST",
                dataType: "JSON",
                data: d.serializeArray(),
                success: function (d) {
                    if (i.find("form").html(d.content), a(), !0 === d.result && c !== d.review) {
                        var e = b(d.review);
                        g.prop("disabled", !1).show(), e.addClass("new"), j.prepend(e), b(r).find(t).detach();
                        var h = f.find(s), k = b(r).children().length, l = k - m;
                        if (0 !== h.length) h.text(String.countPostfix(l, ["РѕР±Р·РѕСЂ", "РѕР±Р·РѕСЂР°", "РѕР±Р·РѕСЂРѕРІ"], "РЅРµС‚ РѕР±Р·РѕСЂРѕРІ", !1, "РћСЃС‚Р°Р»СЊРЅС‹Рµ %c %w")); else if (0 < l) {
                            var n = b("<div/>", {class: "expand-reviews"});
                            n.append(b("<a/>", {
                                class: "blue-dashed-link show-all-reviews",
                                href: "#",
                                text: String.countPostfix(l, ["РѕР±Р·РѕСЂ", "РѕР±Р·РѕСЂР°", "РѕР±Р·РѕСЂРѕРІ"], "РЅРµС‚ РѕР±Р·РѕСЂРѕРІ", !1, "РћСЃС‚Р°Р»СЊРЅС‹Рµ %c %w")
                            })), j.parent().append(n)
                        }
                    }
                },
                error: function (a) {
                    alert(a.responseText)
                }
            }), !1
        }), 0 !== k && e())
    }

    function e() {
        var a = {};
        a.limit = l, b.ajax({
            url: f.data("request-url"), type: "GET", data: a, dataType: "JSON", success: function (a) {
                !0 === a.result && f.find("[data-role=clubexp-reviews]").prepend(a.content)
            }, error: function (a) {
                alert(a.responseText)
            }
        })
    }

    var f, g, h, i, j, k, l, m = 4, n = "#w-review-widget", o = "[data-role=add]", p = "[data-role=cancel]",
        q = "[data-role=review-form]", r = ".objects", s = ".show-all-reviews", t = ".reviews-absent";
    b(function () {
        d(), b("#item-tabs-block").on(window.EVENT_PRODUCT_CARD_TAB_RENDER, "#review", d)
    })
}(document, jQuery), function (a) {
    var b, c, d;
    a(function () {
        function e(b, c) {
            var d = a(".image-slider", b).owlCarousel(c), e = d.data("owlCarousel");
            return a(".button.right", b).click(function () {
                return e.next(), !1
            }).show(), a(".button.left", b).click(function () {
                return e.prev(), !1
            }).show(), e
        }

        if (b = a("#configuration-image-slider"), 0 !== b.length && (c = b.find(".image-slider-wrap"), d = b.find(".thumbs-slider-wrap"), c.find(".img").length)) {
            var f = e(d, {
                items: 4,
                itemsMobile: [479, 4],
                itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, 5],
                itemsDesktopSmall: [window.SCREEN_DESKTOP_MAX_WIDTH, 5],
                itemsDesktop: [window.SCREEN_DESKTOP_MAX_WIDTH, 4],
                dots: !1,
                afterAction: !1
            }), g = e(c, {
                items: 1,
                itemsMobile: [479, 1],
                itemsTablet: [window.SCREEN_TABLET_MAX_WIDTH, 1],
                itemsDesktopSmall: [window.SCREEN_DESKTOP_MAX_WIDTH, 1],
                itemsDesktop: [window.SCREEN_DESKTOP_MAX_WIDTH, 1],
                dots: !1,
                afterAction: function () {
                    "object" == typeof f && (d.find(".owl-item .thumb").removeClass("active").eq(this.owl.currentItem).addClass("active"), f.visibleItems[f.visibleItems.length - 1] < this.owl.currentItem ? f.goTo(this.owl.currentItem) : f.visibleItems[0] > this.owl.currentItem && f.goTo(this.owl.currentItem))
                },
                afterInit: function () {
                    c.find(".img").removeClass("transparent")
                }
            });
            d.find(".owl-item .thumb").hover(function () {
                g.goTo(a(this).parent().index())
            })
        }
    })
}(jQuery), function (a) {
    window.EVENT_CONFIGURATOR_CATALOG_IS_LOADED = "configurator-catalog:is-loaded";
    a(function () {
        var b = ['[data-role="add-item-to-configuration"]', '[data-role="add-item-to-configuration-link"]'].join(",");
        0 !== a(b).length && a(document).on("click", b, function (b) {
            b.preventDefault();
            var c = a(this);
            c.data("in-configuration") || (c.prop("disabled", !0), a.post(c.data("url"), {productGuid: c.data("product-guid")}, function (a) {
                if (a.result) {
                    if ("add-item-to-configuration" === c.data("role"))return window.location.href = c.data("redirect-url");
                    if ("add-item-to-configuration-link" === c.data("role"))return window.open(c.attr("href"), "_blank")
                }
            }, "JSON").then(function () {
                c.prop("disabled", !1)
            }))
        })
    })
}(jQuery), function (a, b) {
    function c() {
        var b = d.find([h, i].join(","));
        0 === a(j + ":checked").length ? b.attr("disabled", !0) : b.removeAttr("disabled")
    }

    var d, e, f, g, h = '[data-role="cancel"]', i = '[data-role="remove-selected"]',
        j = '[name="profile-configuration-action"]';
    a(function () {
        if (d = a('[data-role="rsu-user-configurations-control"]'), 0 !== d.length) {
            e = d.find('[data-role="select-all"]'), f = d.find(h), g = d.find(i), e.on("click", function () {
                a(j).prop("checked", !0), c()
            }), f.on("click", function () {
                a(j).prop("checked", !1), c()
            });
            var b;
            g.on("click", function () {
                var c = a(j + ":checked");
                if (0 !== c.length) {
                    var e = [];
                    a(".rsu-user-configuration").removeAttr("data-mark-deleted"), c.each(function () {
                        a(this).closest(".rsu-user-configuration").attr("data-mark-deleted", !0), e.push(a(this).data("configuration-guid"))
                    }), void 0 !== b && b.abort(), b = a.post(d.data("remove-url"), {rsuGuids: e}, function (b) {
                        !1 === b.result && a(".rsu-user-configuration").removeAttr("data-mark-deleted"), a(".rsu-user-configuration[data-mark-deleted]").remove()
                    }, "json")
                }
            }), a(".dropdown-link-mobile").on("click", function (b) {
                b.preventDefault(), a(this).toggleClass("expanded")
            }), a(j).on("change", c)
        }
    })
}(jQuery, window), function (a) {
    a(function () {
        function b(b) {
            !0 !== b.data("ac-initialized") && b.length && (b.searchAutoComplete({
                source: b.data("url"),
                minLength: 3,
                search: function () {
                    f = b.val()
                },
                select: function (a, c) {
                    void 0 !== window.ga && ga("send", "pageview", b.data("ga-url") + encodeURIComponent(f)), void 0 !== c.item.logGuid && AddToLogActivityTarget([c.item.logGuid], c.item.id, c.item.targetType), window.location.href = c.item.url
                },
                open: function () {
                    a("body").setScrollingStateFor(!0, [window.SCREEN_MOBILE, window.SCREEN_TABLET])
                },
                close: function () {
                    a("body").setScrollingStateFor(!1, [window.SCREEN_MOBILE, window.SCREEN_TABLET])
                }
            }), b.data("ac-initialized", !0))
        }

        function c() {
            return g = e.filter(":visible")
        }

        function d() {
            c(), b(g)
        }

        var e = a("[data-role=search-input]"), f = "", g = null;
        c(), a(window).on([window.EVENT_CHANGE_SCREEN_TYPE, window.EVENT_OPEN_SEARCH].join(" "), d), e.each(function () {
            var c = a(this);
            c.is(":visible") && b(c)
        }), a(window).on(window.EVENT_CHANGE_HEADER_FIXED_STATE, function (a, b) {
            if (!window.checkScreenType(window.SCREEN_MOBILE, window.SCREEN_TABLET)) {
                var d = c();
                if (d.length) {
                    var e = d.data("custom-searchAutoComplete");
                    if (void 0 !== e) {
                        var f = e.menu.element;
                        b ? f.addClass("fixed") : f.removeClass("fixed");
                        var g = d.get(0).getBoundingClientRect();
                        f.css({top: g.bottom, left: g.left, minWidth: g.width})
                    }
                }
            }
        }), a(window).trigger(window.EVENT_HARD_CHECK_HEADER_FIXED_STATE)
    })
}(jQuery), $.widget("custom.searchAutoComplete", $.ui.autocomplete, {
    _renderMenu: function (a, b) {
        var c = this, d = "";
        a.addClass("b-search-autocomplete");
        var e = this.term;
        c.searchVariants = [];
        var f = e.split(" ");
        for (var g in f)if (f.hasOwnProperty(g)) {
            var h = f[g];
            if (h.length < 2 && !0 === isNaN(parseInt(h)))continue;
            c.searchVariants.push(String.escapeRegExp(h)), c.searchVariants.push(String.escapeRegExp(String.eToYoTransition(h))), c.searchVariants.push(String.escapeRegExp(String.YoToETransition(h))), c.searchVariants.push(String.escapeRegExp(String.switchKeyboard("lat", h))), c.searchVariants.push(String.escapeRegExp(String.escapeRegExp(String.switchKeyboard("rus", h))))
        }
        $.each(b, function (b, e) {
            var f;
            e.category !== d && (a.append('<li class="ui-autocomplete-category">' + e.category + "</li>"), d = e.category), f = c._renderItemData(a, e), e.category && f.attr("aria-label", e.category + " : " + e.label)
        })
    }, _renderItem: function (a, b) {
        var c = $("<li>"), d = $("<a/>"), e = new RegExp("(" + this.searchVariants.join("|") + ")", "gi"),
            f = b.label.replace(e, "<mark>$1</mark>");
        return c.attr("data-value", b.value), d.html(f), c.append(d).appendTo(a), c
    }
}), function (a) {
    a(function () {
        a("#w-share-widget a").on("click", function (b) {
            var c = void 0 != window.screenLeft ? window.screenLeft : screen.left,
                d = void 0 != window.screenTop ? window.screenTop : screen.top,
                e = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                f = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                g = e / 2 - 240 + c, h = f / 2 - 240 + d,
                i = window.open(a(this).attr("href"), "", "scrollbars=yes, location= false, width=480, height=480, top=" + h + ", left=" + g);
            return window.focus && i.focus(), !1
        })
    })
}(jQuery), $(function (a, b) {
    function c(c) {
        var l = c.find(n);
        c.on("click", o, function () {
            l.fadeIn(200)
        }), c.on("click", function (a) {
            var c = b(a.target);
            c.closest(n).length || c.is(n) || c.is(o) || c.is(p) || l.hide()
        }), l.on("click", ".close-btn", function () {
            l.hide()
        }), c.on("click", p, function () {
            h(c)
        }), b(a).on("resize", function () {
            0 == b(m).data("enable-mobile") && a.checkScreenType(a.SCREEN_MOBILE) && (h(c), i(c));
            var d = c.find(".modal-dialog");
            a.checkScreenType(a.SCREEN_MOBILE, a.SCREEN_TABLET) ? d.css({
                width: a.innerWidth,
                minWidth: a.innerWidth,
                height: a.innerHeight,
                minHeight: a.innerHeight
            }) : d.css({width: "", minWidth: "", height: "", minHeight: ""})
        }), c.on("click", q + " [data-value]", function () {
            var a = b(this);
            switch (a.siblings().removeClass("selected"), a.addClass("selected"), c.find(s).addClass("disabled"), c.find(k).removeClass("hidden"), c.find(".avails-list .list-head").removeClass("shops-closed"), e(c), a.data("value")) {
                case"opened":
                    j.showOpenedShops(c);
                    break;
                case"at-time":
                    g(c)
            }
            f(c), j.changeStatus(c, a)
        }), d(c)
    }

    function d(a) {
        function c(a) {
            p.find("[data-value]").removeClass("selected"), a.addClass("selected"), d(h(a))
        }

        function d(a) {
            x.animate({left: a}, 200, g)
        }

        function e(a) {
            a || (a = 0);
            var c = null, d = null;
            return p.find("span").each(function () {
                var e = b(this), f = Math.abs(a - h(e));
                null === d && (d = f), d >= f && (d = f, c = e)
            }), c
        }

        function g() {
            if (a.find(r).removeClass("hidden"), a.find(s).hasClass("disabled"))return void a.find(k).removeClass("hidden");
            var c = a.find(t + " [data-value].selected").data("value"), d = e(i()).data("value");
            c !== a.find(t + " [data-default-state]").data("value") && a.find(r).addClass("hidden"), a.find(k).each(function () {
                var a = b(this), e = a.data("worktime");
                a.addClass("hidden"), e.hasOwnProperty(c) && (0 === d || d >= e[c].open && d < e[c].close) && a.removeClass("hidden")
            }), f(a), j.applyFilters(a)
        }

        function h(a) {
            var b = p.get(0).getBoundingClientRect().left;
            return parseInt(a.get(0).getBoundingClientRect().left - b - 5)
        }

        function i() {
            return parseInt(x.css("left"))
        }

        var l, m, n = a.find(k), o = a.find(t + " [data-value].selected").data("value");
        if (n.each(function () {
                var a = b(this);
                if (a.data("worktime").hasOwnProperty(o)) {
                    var c = a.data("worktime")[o].open, d = a.data("worktime")[o].close;
                    l || (l = c), m || (m = d), l = Math.min(l, c), m = Math.max(m, d)
                }
            }), l || m) {
            l = Math.ceil(l / 3600), m = Math.ceil(m / 3600);
            var p = a.find(u), q = p.find(v), x = p.find(w);
            q.html("");
            for (var y = m - l, z = l; z < m; z++) {
                var A = b("<span/>").attr("data-value", 3600 * z).html(z + "<i></i>");
                y % 3 == 2 && z == l && A.addClass("first"), q.append(A)
            }
            c(p.find("[data-default-state=1]")), b(w).draggable({
                axis: "x",
                containment: "parent",
                stop: function (a, b) {
                    c(e(b.position.left))
                }
            }), d(0),
                p.find("[data-value] i").on("click", function () {
                    c(b(this).closest("[data-value]"))
                })
        }
    }

    function e(a) {
        var c = a.find(l), d = c.find(k);
        d.sort(function (a, c) {
            return parseInt(b(a).data("default-sort")) - parseInt(b(c).data("default-sort"))
        }), c.html(d)
    }

    function f(a) {
        var b = 0, c = a.find(p), d = a.find(o), e = d.find("span");
        c.hide(), d.removeClass("selected"), e.html(""), a.find(q + " [data-value].selected").data("default-state") || (b++, c.css("display", "inline-block"), d.addClass("selected"), e.html("(" + b + ")"))
    }

    function g(a) {
        d(a), a.find(s).removeClass("disabled"), a.find(t + " [data-value]").on("click", function () {
            b(this).siblings().removeClass("selected"), b(this).addClass("selected"), d(a)
        })
    }

    function h(a) {
        a.find("[data-default-state]").click()
    }

    function i(a) {
        a.find(k).removeClass("selected"), j.clearFilters()
    }

    var j, k = ".avails-item", l = ".avails-items", m = '[data-role="filter-container"]', n = ".filters-wrap",
        o = "[data-role=show-avails-filter]", p = "[data-role=clear-avails-filter]",
        q = "[data-role=work-status-filter]", r = "[data-role=work-status]", s = "[data-role=worktime-filter]",
        t = "[data-role=day-filter]", u = "[data-role=time-filter]", v = "[data-role=hours-wrap]",
        w = "[data-role=range-control] i", x = {
            applyFilters: function (a) {
            }, clearFilters: function (a) {
            }, showOpenedShops: function (a) {
            }, changeStatus: function (a, b) {
            }
        };
    b.fn.shopFilters = function (a) {
        return j = b.extend({}, x, a), c(b(this)), this
    }
}(window, jQuery)), function (a) {
    a.fn.SmsConfirm = function (b) {
        var c, d, e, f, g, h = {callback: null, cancelCallback: null}, b = a.extend({}, h, b), i = this, j = 0, k = {
            init: function () {
                var b = a(i);
                c = a("#sms-confirm-send-btn", b), d = a("#sms-confirm-send-repeat-btn", b), e = a("a#sms-not-delivered", b), f = a("#sms-confirm-code", b), g = a("#confirm-ajax-anim", b), c.on("click", function () {
                    return k.check(), !1
                }), f.on("keypress", function (a) {
                    13 === a.which && k.check()
                }), d.click(function () {
                    return k.resend(), !1
                }), e.click(function () {
                    return c.hide(), d.show(), a(this).hide(), !1
                })
            }, check: function () {
                c.attr("disabled", "disabled"), g.show(), a.ajax({
                    url: "/sms-confirm/check/",
                    type: "GET",
                    dataType: "json",
                    data: {session_guid: c.data("sms-confirm-session"), code: f.val()},
                    success: function (d) {
                        c.removeAttr("disabled"), g.hide(), d.data.isConfirmed ? (alert("Р’Р°С€ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР° РїРѕРґС‚РІРµСЂР¶РґРµРЅ."), "function" == typeof b.callback && b.callback(d.data.isConfirmed), a("#sms-confirm-block").hide()) : (j++, alert("РљРѕРґ РІРІРµРґРµРЅ РЅРµРІРµСЂРЅРѕ.")), j >= 2 && k.initCancel()
                    }
                })
            }, resend: function () {
                g.show(), d.hide(), e.remove(), a.ajax({
                    url: "/sms-confirm/resend/",
                    type: "GET",
                    dataType: "json",
                    data: {session_guid: c.data("sms-confirm-session")},
                    success: function (a) {
                        g.hide(), c.show(), 0 === a.data.limitLeft && k.initCancel(), "success" === a.result ? alert("РџРѕРІС‚РѕСЂРЅС‹Р№ РєРѕРґ СѓСЃРїРµС€РЅРѕ РѕС‚РїСЂР°РІР»РµРЅ.") : "" !== a.message ? alert(a.message) : alert("РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё РѕС‚РїСЂР°РІРєРµ РєРѕРґР°. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·РґРЅРµРµ.")
                    }
                })
            }, initCancel: function () {
                "function" == typeof b.cancelCallback && a("#buttons-block .cancel-confirm", a(i)).show().find("a").click(function () {
                    return b.cancelCallback(), !1
                })
            }
        };
        k.init()
    }
}(jQuery), function (a, b) {
    b(function () {
        b(".tiny-mce-spoiler > .spoiler-head").each(function () {
            b('<span class="spoiler-arrow"></span>').appendTo(b(this))
        })
    }), b(function () {
        b(".tiny-mce-spoiler > .spoiler-head").attr("title", "Р Р°Р·РІРµСЂРЅСѓС‚СЊ СЃРїРѕР№Р»РµСЂ").click(function () {
            var a = b(this).next(".tiny-mce-spoiler > .spoiler-body");
            a.toggle(), a.is(":hidden") ? (b(this).attr("title", "Р Р°Р·РІРµСЂРЅСѓС‚СЊ СЃРїРѕР№Р»РµСЂ"), b(this).removeClass("opened")) : (b(this).attr("title", "РЎРІРµСЂРЅСѓС‚СЊ СЃРїРѕР№Р»РµСЂ"), b(this).addClass("opened"))
        })
    })
}(document, jQuery), function (a, b) {
    function c(a) {
        var c = {};
        c.objectId = d.data("object-guid"), c.objectType = d.data("object-type-guid"), c.voteType = a.data("vote-type"), b.ajax({
            url: d.data("request-url"),
            type: "GET",
            data: c,
            dataType: "JSON",
            success: function (b) {
                if (!0 === b.success) {
                    var g = a.next(e), h = d.find(f), i = parseInt(g.text()) || 0;
                    if (g.text(i + 1), void 0 !== h) {
                        var j = parseInt(h.text()) || 0;
                        j += parseInt(c.voteType), h.text(j), h.removeClass("positive").removeClass("negative"), j > 0 ? h.addClass("positive") : h.addClass("negative")
                    }
                    a.addClass("voted"), d.attr("data-voted", "1")
                }
            }
        })
    }

    var d, e = '[data-role="counter"]', f = '[data-role="sum-counter"]';
    b(function () {
        b("body").on("click", '[data-role="vote-btn"]', function () {
            if (d = b(this).closest(".vote-widget-container"), d.is("[data-voted]"))return !1;
            c(b(this))
        })
    })
}(document, jQuery);