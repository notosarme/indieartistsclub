// DOWNLOADED FROM https://github.com/lokesh/color-thief
var t = function (t, r) {
    return t < r ? -1 : t > r ? 1 : 0;
  },
  r = function (t) {
    return t.reduce(function (t, r) {
      return t + r;
    }, 0);
  },
  n = /*#__PURE__*/ (function () {
    function t(t) {
      this.colors = t;
    }
    var r = t.prototype;
    return (
      (r.palette = function () {
        return this.colors;
      }),
      (r.map = function (t) {
        return t;
      }),
      t
    );
  })(),
  o = (function () {
    function o(t, r, n) {
      return (t << 10) + (r << 5) + n;
    }
    function e(t) {
      var r = [],
        n = !1;
      function o() {
        r.sort(t), (n = !0);
      }
      return {
        push: function (t) {
          r.push(t), (n = !1);
        },
        peek: function (t) {
          return n || o(), void 0 === t && (t = r.length - 1), r[t];
        },
        pop: function () {
          return n || o(), r.pop();
        },
        size: function () {
          return r.length;
        },
        map: function (t) {
          return r.map(t);
        },
        debug: function () {
          return n || o(), r;
        },
      };
    }
    function i(t, r, n, o, e, i, u) {
      var a = this;
      (a.r1 = t),
        (a.r2 = r),
        (a.g1 = n),
        (a.g2 = o),
        (a.b1 = e),
        (a.b2 = i),
        (a.histo = u);
    }
    function u() {
      this.vboxes = new e(function (r, n) {
        return t(
          r.vbox.count() * r.vbox.volume(),
          n.vbox.count() * n.vbox.volume()
        );
      });
    }
    function a(t, r) {
      if (r.count()) {
        var n = r.r2 - r.r1 + 1,
          e = r.g2 - r.g1 + 1,
          i = Math.max.apply(null, [n, e, r.b2 - r.b1 + 1]);
        if (1 == r.count()) return [r.copy()];
        var u,
          a,
          c,
          f,
          s = 0,
          h = [],
          v = [];
        if (i == n)
          for (u = r.r1; u <= r.r2; u++) {
            for (f = 0, a = r.g1; a <= r.g2; a++)
              for (c = r.b1; c <= r.b2; c++) f += t[o(u, a, c)] || 0;
            h[u] = s += f;
          }
        else if (i == e)
          for (u = r.g1; u <= r.g2; u++) {
            for (f = 0, a = r.r1; a <= r.r2; a++)
              for (c = r.b1; c <= r.b2; c++) f += t[o(a, u, c)] || 0;
            h[u] = s += f;
          }
        else
          for (u = r.b1; u <= r.b2; u++) {
            for (f = 0, a = r.r1; a <= r.r2; a++)
              for (c = r.g1; c <= r.g2; c++) f += t[o(a, c, u)] || 0;
            h[u] = s += f;
          }
        return (
          h.forEach(function (t, r) {
            v[r] = s - t;
          }),
          (function (t) {
            var n,
              o,
              e,
              i,
              a,
              c = t + "1",
              f = t + "2",
              l = 0;
            for (u = r[c]; u <= r[f]; u++)
              if (h[u] > s / 2) {
                for (
                  e = r.copy(),
                    i = r.copy(),
                    a =
                      (n = u - r[c]) <= (o = r[f] - u)
                        ? Math.min(r[f] - 1, ~~(u + o / 2))
                        : Math.max(r[c], ~~(u - 1 - n / 2));
                  !h[a];

                )
                  a++;
                for (l = v[a]; !l && h[a - 1]; ) l = v[--a];
                return (e[f] = a), (i[c] = e[f] + 1), [e, i];
              }
          })(i == n ? "r" : i == e ? "g" : "b")
        );
      }
    }
    return (
      (i.prototype = {
        volume: function (t) {
          var r = this;
          return (
            (r._volume && !t) ||
              (r._volume =
                (r.r2 - r.r1 + 1) * (r.g2 - r.g1 + 1) * (r.b2 - r.b1 + 1)),
            r._volume
          );
        },
        count: function (t) {
          var r = this,
            n = r.histo;
          if (!r._count_set || t) {
            var e,
              i,
              u,
              a = 0;
            for (e = r.r1; e <= r.r2; e++)
              for (i = r.g1; i <= r.g2; i++)
                for (u = r.b1; u <= r.b2; u++) a += n[o(e, i, u)] || 0;
            (r._count = a), (r._count_set = !0);
          }
          return r._count;
        },
        copy: function () {
          var t = this;
          return new i(t.r1, t.r2, t.g1, t.g2, t.b1, t.b2, t.histo);
        },
        avg: function (t) {
          var r = this,
            n = r.histo;
          if (!r._avg || t) {
            var e,
              i,
              u,
              a,
              c = 0,
              f = 0,
              s = 0,
              h = 0;
            if (r.r1 === r.r2 && r.g1 === r.g2 && r.b1 === r.b2)
              r._avg = [r.r1 << 3, r.g1 << 3, r.b1 << 3];
            else {
              for (i = r.r1; i <= r.r2; i++)
                for (u = r.g1; u <= r.g2; u++)
                  for (a = r.b1; a <= r.b2; a++)
                    (c += e = n[o(i, u, a)] || 0),
                      (f += e * (i + 0.5) * 8),
                      (s += e * (u + 0.5) * 8),
                      (h += e * (a + 0.5) * 8);
              r._avg = c
                ? [~~(f / c), ~~(s / c), ~~(h / c)]
                : [
                    ~~((8 * (r.r1 + r.r2 + 1)) / 2),
                    ~~((8 * (r.g1 + r.g2 + 1)) / 2),
                    ~~((8 * (r.b1 + r.b2 + 1)) / 2),
                  ];
            }
          }
          return r._avg;
        },
        contains: function (t) {
          var r = this,
            n = t[0] >> 3;
          return (
            (gval = t[1] >> 3),
            (bval = t[2] >> 3),
            n >= r.r1 &&
              n <= r.r2 &&
              gval >= r.g1 &&
              gval <= r.g2 &&
              bval >= r.b1 &&
              bval <= r.b2
          );
        },
      }),
      (u.prototype = {
        push: function (t) {
          this.vboxes.push({ vbox: t, color: t.avg() });
        },
        palette: function () {
          return this.vboxes.map(function (t) {
            return t.color;
          });
        },
        size: function () {
          return this.vboxes.size();
        },
        map: function (t) {
          for (var r = this.vboxes, n = 0; n < r.size(); n++)
            if (r.peek(n).vbox.contains(t)) return r.peek(n).color;
          return this.nearest(t);
        },
        nearest: function (t) {
          for (var r, n, o, e = this.vboxes, i = 0; i < e.size(); i++)
            ((n = Math.sqrt(
              Math.pow(t[0] - e.peek(i).color[0], 2) +
                Math.pow(t[1] - e.peek(i).color[1], 2) +
                Math.pow(t[2] - e.peek(i).color[2], 2)
            )) < r ||
              void 0 === r) &&
              ((r = n), (o = e.peek(i).color));
          return o;
        },
        forcebw: function () {
          var n = this.vboxes;
          n.sort(function (n, o) {
            return t(r(n.color), r(o.color));
          });
          var o = n[0].color;
          o[0] < 5 && o[1] < 5 && o[2] < 5 && (n[0].color = [0, 0, 0]);
          var e = n.length - 1,
            i = n[e].color;
          i[0] > 251 &&
            i[1] > 251 &&
            i[2] > 251 &&
            (n[e].color = [255, 255, 255]);
        },
      }),
      {
        quantize: function (r, c) {
          if (!Number.isInteger(c) || c < 1 || c > 256)
            throw new Error(
              "Invalid maximum color count. It must be an integer between 1 and 256."
            );
          if (!r.length || c < 2 || c > 256) return !1;
          if (!r.length || c < 2 || c > 256) return !1;
          for (var f = [], s = new Set(), h = 0; h < r.length; h++) {
            var v = r[h],
              l = v.join(",");
            s.has(l) || (s.add(l), f.push(v));
          }
          if (f.length <= c) return new n(f);
          var g = (function (t) {
            var r,
              n = new Array(32768);
            return (
              t.forEach(function (t) {
                (r = o(t[0] >> 3, t[1] >> 3, t[2] >> 3)),
                  (n[r] = (n[r] || 0) + 1);
              }),
              n
            );
          })(r);
          g.forEach(function () {});
          var p = (function (t, r) {
              var n,
                o,
                e,
                u = 1e6,
                a = 0,
                c = 1e6,
                f = 0,
                s = 1e6,
                h = 0;
              return (
                t.forEach(function (t) {
                  (n = t[0] >> 3) < u ? (u = n) : n > a && (a = n),
                    (o = t[1] >> 3) < c ? (c = o) : o > f && (f = o),
                    (e = t[2] >> 3) < s ? (s = e) : e > h && (h = e);
                }),
                new i(u, a, c, f, s, h, r)
              );
            })(r, g),
            b = new e(function (r, n) {
              return t(r.count(), n.count());
            });
          function m(t, r) {
            for (var n, o = t.size(), e = 0; e < 1e3; ) {
              if (o >= r) return;
              if (e++ > 1e3) return;
              if ((n = t.pop()).count()) {
                var i = a(g, n),
                  u = i[0],
                  c = i[1];
                if (!u) return;
                t.push(u), c && (t.push(c), o++);
              } else t.push(n), e++;
            }
          }
          b.push(p), m(b, 0.75 * c);
          for (
            var d = new e(function (r, n) {
              return t(r.count() * r.volume(), n.count() * n.volume());
            });
            b.size();

          )
            d.push(b.pop());
          m(d, c);
          for (var w = new u(); d.size(); ) w.push(d.pop());
          return w;
        },
      }
    );
  })().quantize,
  e = function (t) {
    (this.canvas = document.createElement("canvas")),
      (this.context = this.canvas.getContext("2d")),
      (this.width = this.canvas.width = t.naturalWidth),
      (this.height = this.canvas.height = t.naturalHeight),
      this.context.drawImage(t, 0, 0, this.width, this.height);
  };
e.prototype.getImageData = function () {
  return this.context.getImageData(0, 0, this.width, this.height);
};
var u = function () {};
(u.prototype.getColor = function (t, r) {
  return void 0 === r && (r = 10), this.getPalette(t, 5, r)[0];
}),
  (u.prototype.getPalette = function (t, r, n) {
    var i = (function (t) {
        var r = t.colorCount,
          n = t.quality;
        if (void 0 !== r && Number.isInteger(r)) {
          if (1 === r)
            throw new Error(
              "colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()"
            );
          (r = Math.max(r, 2)), (r = Math.min(r, 20));
        } else r = 10;
        return (
          (void 0 === n || !Number.isInteger(n) || n < 1) && (n = 10),
          { colorCount: r, quality: n }
        );
      })({ colorCount: r, quality: n }),
      u = new e(t),
      a = (function (t, r, n) {
        for (var o, e, i, u, a, c = t, f = [], s = 0; s < r; s += n)
          (e = c[0 + (o = 4 * s)]),
            (i = c[o + 1]),
            (u = c[o + 2]),
            (void 0 === (a = c[o + 3]) || a >= 125) &&
              ((e > 250 && i > 250 && u > 250) || f.push([e, i, u]));
        return f;
      })(u.getImageData().data, u.width * u.height, i.quality),
      c = o(a, i.colorCount);
    return c ? c.palette() : null;
  }),
  (u.prototype.getColorFromUrl = function (t, r, n) {
    var o = this,
      e = document.createElement("img");
    e.addEventListener("load", function () {
      var i = o.getPalette(e, 5, n);
      r(i[0], t);
    }),
      (e.src = t);
  }),
  (u.prototype.getImageData = function (t, r) {
    var n = new XMLHttpRequest();
    n.open("GET", t, !0),
      (n.responseType = "arraybuffer"),
      (n.onload = function () {
        if (200 == this.status) {
          var t = new Uint8Array(this.response);
          i = t.length;
          for (var n = new Array(i), o = 0; o < t.length; o++)
            n[o] = String.fromCharCode(t[o]);
          var e = n.join(""),
            u = window.btoa(e);
          r("data:image/png;base64," + u);
        }
      }),
      n.send();
  }),
  (u.prototype.getColorAsync = function (t, r, n) {
    var o = this;
    this.getImageData(t, function (t) {
      var e = document.createElement("img");
      e.addEventListener("load", function () {
        var t = o.getPalette(e, 5, n);
        r(t[0], this);
      }),
        (e.src = t);
    });
  });
export { u as default };
