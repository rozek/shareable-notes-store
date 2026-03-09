var rr = (n) => {
  throw TypeError(n);
};
var Rt = (n, e, t) => e.has(n) || rr("Cannot " + t);
var m = (n, e, t) => (Rt(n, e, "read from private field"), t ? t.call(n) : e.get(n)), W = (n, e, t) => e.has(n) ? rr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), pe = (n, e, t, r) => (Rt(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), c = (n, e, t) => (Rt(n, e, "access private method"), t);
var jt = (n, e, t, r) => ({
  set _(s) {
    pe(n, e, s, t);
  },
  get _() {
    return m(n, e, r);
  }
});
import { DefaultWrapperCacheSize as tn, DefaultLiteralSizeLimit as rn, RootId as Pe, TrashId as z, LostAndFoundId as Ee, DefaultMIMEType as yt, SDS_Error as de, DefaultBinarySizeLimit as nn, SDS_Item as nr, SDS_Link as sr } from "@rozek/sds-core";
import { SDS_Entry as ds, SDS_Error as fs, SDS_Item as hs, SDS_Link as ms } from "@rozek/sds-core";
import { Model as sn } from "json-joy/lib/json-crdt/index.js";
import { s as _ } from "json-joy/lib/json-crdt-patch/schema.js";
import { Patch as ar } from "json-joy/lib/json-crdt-patch/index.js";
var q = Uint8Array, oe = Uint16Array, Qt = Int32Array, Ot = new q([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), Ct = new q([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Mt = new q([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Cr = function(n, e) {
  for (var t = new oe(31), r = 0; r < 31; ++r)
    t[r] = e += 1 << n[r - 1];
  for (var s = new Qt(t[30]), r = 1; r < 30; ++r)
    for (var a = t[r]; a < t[r + 1]; ++a)
      s[a] = a - t[r] << 5 | r;
  return { b: t, r: s };
}, Ar = Cr(Ot, 2), Rr = Ar.b, Pt = Ar.r;
Rr[28] = 258, Pt[258] = 28;
var jr = Cr(Ct, 0), an = jr.b, ir = jr.r, $t = new oe(32768);
for (var L = 0; L < 32768; ++L) {
  var Se = (L & 43690) >> 1 | (L & 21845) << 1;
  Se = (Se & 52428) >> 2 | (Se & 13107) << 2, Se = (Se & 61680) >> 4 | (Se & 3855) << 4, $t[L] = ((Se & 65280) >> 8 | (Se & 255) << 8) >> 1;
}
var _e = (function(n, e, t) {
  for (var r = n.length, s = 0, a = new oe(e); s < r; ++s)
    n[s] && ++a[n[s] - 1];
  var i = new oe(e);
  for (s = 1; s < e; ++s)
    i[s] = i[s - 1] + a[s - 1] << 1;
  var o;
  if (t) {
    o = new oe(1 << e);
    var u = 15 - e;
    for (s = 0; s < r; ++s)
      if (n[s])
        for (var d = s << 4 | n[s], f = e - n[s], p = i[n[s] - 1]++ << f, w = p | (1 << f) - 1; p <= w; ++p)
          o[$t[p] >> u] = d;
  } else
    for (o = new oe(r), s = 0; s < r; ++s)
      n[s] && (o[s] = $t[i[n[s] - 1]++] >> 15 - n[s]);
  return o;
}), Ze = new q(288);
for (var L = 0; L < 144; ++L)
  Ze[L] = 8;
for (var L = 144; L < 256; ++L)
  Ze[L] = 9;
for (var L = 256; L < 280; ++L)
  Ze[L] = 7;
for (var L = 280; L < 288; ++L)
  Ze[L] = 8;
var ft = new q(32);
for (var L = 0; L < 32; ++L)
  ft[L] = 5;
var on = /* @__PURE__ */ _e(Ze, 9, 0), ln = /* @__PURE__ */ _e(Ze, 9, 1), cn = /* @__PURE__ */ _e(ft, 5, 0), un = /* @__PURE__ */ _e(ft, 5, 1), Nt = function(n) {
  for (var e = n[0], t = 1; t < n.length; ++t)
    n[t] > e && (e = n[t]);
  return e;
}, fe = function(n, e, t) {
  var r = e / 8 | 0;
  return (n[r] | n[r + 1] << 8) >> (e & 7) & t;
}, Lt = function(n, e) {
  var t = e / 8 | 0;
  return (n[t] | n[t + 1] << 8 | n[t + 2] << 16) >> (e & 7);
}, Xt = function(n) {
  return (n + 7) / 8 | 0;
}, Nr = function(n, e, t) {
  return (t == null || t > n.length) && (t = n.length), new q(n.subarray(e, t));
}, dn = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], me = function(n, e, t) {
  var r = new Error(e || dn[n]);
  if (r.code = n, Error.captureStackTrace && Error.captureStackTrace(r, me), !t)
    throw r;
  return r;
}, fn = function(n, e, t, r) {
  var s = n.length, a = 0;
  if (!s || e.f && !e.l)
    return t || new q(0);
  var i = !t, o = i || e.i != 2, u = e.i;
  i && (t = new q(s * 3));
  var d = function(st) {
    var at = t.length;
    if (st > at) {
      var Fe = new q(Math.max(at * 2, st));
      Fe.set(t), t = Fe;
    }
  }, f = e.f || 0, p = e.p || 0, w = e.b || 0, R = e.l, b = e.d, N = e.m, J = e.n, P = s * 8;
  do {
    if (!R) {
      f = fe(n, p, 1);
      var Q = fe(n, p + 1, 3);
      if (p += 3, Q)
        if (Q == 1)
          R = ln, b = un, N = 9, J = 5;
        else if (Q == 2) {
          var ee = fe(n, p, 31) + 257, K = fe(n, p + 10, 15) + 4, j = ee + fe(n, p + 5, 31) + 1;
          p += 14;
          for (var I = new q(j), B = new q(19), $ = 0; $ < K; ++$)
            B[Mt[$]] = fe(n, p + $ * 3, 7);
          p += K * 3;
          for (var Y = Nt(B), Te = (1 << Y) - 1, ne = _e(B, Y, 1), $ = 0; $ < j; ) {
            var te = ne[fe(n, p, Te)];
            p += te & 15;
            var Z = te >> 4;
            if (Z < 16)
              I[$++] = Z;
            else {
              var U = 0, V = 0;
              for (Z == 16 ? (V = 3 + fe(n, p, 3), p += 2, U = I[$ - 1]) : Z == 17 ? (V = 3 + fe(n, p, 7), p += 3) : Z == 18 && (V = 11 + fe(n, p, 127), p += 7); V--; )
                I[$++] = U;
            }
          }
          var re = I.subarray(0, ee), F = I.subarray(ee);
          N = Nt(re), J = Nt(F), R = _e(re, N, 1), b = _e(F, J, 1);
        } else
          me(1);
      else {
        var Z = Xt(p) + 4, X = n[Z - 4] | n[Z - 3] << 8, H = Z + X;
        if (H > s) {
          u && me(0);
          break;
        }
        o && d(w + X), t.set(n.subarray(Z, H), w), e.b = w += X, e.p = p = H * 8, e.f = f;
        continue;
      }
      if (p > P) {
        u && me(0);
        break;
      }
    }
    o && d(w + 131072);
    for (var nt = (1 << N) - 1, ce = (1 << J) - 1, xe = p; ; xe = p) {
      var U = R[Lt(n, p) & nt], se = U >> 4;
      if (p += U & 15, p > P) {
        u && me(0);
        break;
      }
      if (U || me(2), se < 256)
        t[w++] = se;
      else if (se == 256) {
        xe = p, R = null;
        break;
      } else {
        var ae = se - 254;
        if (se > 264) {
          var $ = se - 257, M = Ot[$];
          ae = fe(n, p, (1 << M) - 1) + Rr[$], p += M;
        }
        var ve = b[Lt(n, p) & ce], Be = ve >> 4;
        ve || me(3), p += ve & 15;
        var F = an[Be];
        if (Be > 3) {
          var M = Ct[Be];
          F += Lt(n, p) & (1 << M) - 1, p += M;
        }
        if (p > P) {
          u && me(0);
          break;
        }
        o && d(w + 131072);
        var Ue = w + ae;
        if (w < F) {
          var pt = a - F, gt = Math.min(F, Ue);
          for (pt + w < 0 && me(3); w < gt; ++w)
            t[w] = r[pt + w];
        }
        for (; w < Ue; ++w)
          t[w] = t[w - F];
      }
    }
    e.l = R, e.p = xe, e.b = w, e.f = f, R && (f = 1, e.m = N, e.d = b, e.n = J);
  } while (!f);
  return w != t.length && i ? Nr(t, 0, w) : t.subarray(0, w);
}, ke = function(n, e, t) {
  t <<= e & 7;
  var r = e / 8 | 0;
  n[r] |= t, n[r + 1] |= t >> 8;
}, it = function(n, e, t) {
  t <<= e & 7;
  var r = e / 8 | 0;
  n[r] |= t, n[r + 1] |= t >> 8, n[r + 2] |= t >> 16;
}, Zt = function(n, e) {
  for (var t = [], r = 0; r < n.length; ++r)
    n[r] && t.push({ s: r, f: n[r] });
  var s = t.length, a = t.slice();
  if (!s)
    return { t: Zr, l: 0 };
  if (s == 1) {
    var i = new q(t[0].s + 1);
    return i[t[0].s] = 1, { t: i, l: 1 };
  }
  t.sort(function(H, ee) {
    return H.f - ee.f;
  }), t.push({ s: -1, f: 25001 });
  var o = t[0], u = t[1], d = 0, f = 1, p = 2;
  for (t[0] = { s: -1, f: o.f + u.f, l: o, r: u }; f != s - 1; )
    o = t[t[d].f < t[p].f ? d++ : p++], u = t[d != f && t[d].f < t[p].f ? d++ : p++], t[f++] = { s: -1, f: o.f + u.f, l: o, r: u };
  for (var w = a[0].s, r = 1; r < s; ++r)
    a[r].s > w && (w = a[r].s);
  var R = new oe(w + 1), b = zt(t[f - 1], R, 0);
  if (b > e) {
    var r = 0, N = 0, J = b - e, P = 1 << J;
    for (a.sort(function(ee, K) {
      return R[K.s] - R[ee.s] || ee.f - K.f;
    }); r < s; ++r) {
      var Q = a[r].s;
      if (R[Q] > e)
        N += P - (1 << b - R[Q]), R[Q] = e;
      else
        break;
    }
    for (N >>= J; N > 0; ) {
      var Z = a[r].s;
      R[Z] < e ? N -= 1 << e - R[Z]++ - 1 : ++r;
    }
    for (; r >= 0 && N; --r) {
      var X = a[r].s;
      R[X] == e && (--R[X], ++N);
    }
    b = e;
  }
  return { t: new q(R), l: b };
}, zt = function(n, e, t) {
  return n.s == -1 ? Math.max(zt(n.l, e, t + 1), zt(n.r, e, t + 1)) : e[n.s] = t;
}, or = function(n) {
  for (var e = n.length; e && !n[--e]; )
    ;
  for (var t = new oe(++e), r = 0, s = n[0], a = 1, i = function(u) {
    t[r++] = u;
  }, o = 1; o <= e; ++o)
    if (n[o] == s && o != e)
      ++a;
    else {
      if (!s && a > 2) {
        for (; a > 138; a -= 138)
          i(32754);
        a > 2 && (i(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
      } else if (a > 3) {
        for (i(s), --a; a > 6; a -= 6)
          i(8304);
        a > 2 && (i(a - 3 << 5 | 8208), a = 0);
      }
      for (; a--; )
        i(s);
      a = 1, s = n[o];
    }
  return { c: t.subarray(0, r), n: e };
}, ot = function(n, e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += n[r] * e[r];
  return t;
}, Lr = function(n, e, t) {
  var r = t.length, s = Xt(e + 2);
  n[s] = r & 255, n[s + 1] = r >> 8, n[s + 2] = n[s] ^ 255, n[s + 3] = n[s + 1] ^ 255;
  for (var a = 0; a < r; ++a)
    n[s + a + 4] = t[a];
  return (s + 4 + r) * 8;
}, lr = function(n, e, t, r, s, a, i, o, u, d, f) {
  ke(e, f++, t), ++s[256];
  for (var p = Zt(s, 15), w = p.t, R = p.l, b = Zt(a, 15), N = b.t, J = b.l, P = or(w), Q = P.c, Z = P.n, X = or(N), H = X.c, ee = X.n, K = new oe(19), j = 0; j < Q.length; ++j)
    ++K[Q[j] & 31];
  for (var j = 0; j < H.length; ++j)
    ++K[H[j] & 31];
  for (var I = Zt(K, 7), B = I.t, $ = I.l, Y = 19; Y > 4 && !B[Mt[Y - 1]]; --Y)
    ;
  var Te = d + 5 << 3, ne = ot(s, Ze) + ot(a, ft) + i, te = ot(s, w) + ot(a, N) + i + 14 + 3 * Y + ot(K, B) + 2 * K[16] + 3 * K[17] + 7 * K[18];
  if (u >= 0 && Te <= ne && Te <= te)
    return Lr(e, f, n.subarray(u, u + d));
  var U, V, re, F;
  if (ke(e, f, 1 + (te < ne)), f += 2, te < ne) {
    U = _e(w, R, 0), V = w, re = _e(N, J, 0), F = N;
    var nt = _e(B, $, 0);
    ke(e, f, Z - 257), ke(e, f + 5, ee - 1), ke(e, f + 10, Y - 4), f += 14;
    for (var j = 0; j < Y; ++j)
      ke(e, f + 3 * j, B[Mt[j]]);
    f += 3 * Y;
    for (var ce = [Q, H], xe = 0; xe < 2; ++xe)
      for (var se = ce[xe], j = 0; j < se.length; ++j) {
        var ae = se[j] & 31;
        ke(e, f, nt[ae]), f += B[ae], ae > 15 && (ke(e, f, se[j] >> 5 & 127), f += se[j] >> 12);
      }
  } else
    U = on, V = Ze, re = cn, F = ft;
  for (var j = 0; j < o; ++j) {
    var M = r[j];
    if (M > 255) {
      var ae = M >> 18 & 31;
      it(e, f, U[ae + 257]), f += V[ae + 257], ae > 7 && (ke(e, f, M >> 23 & 31), f += Ot[ae]);
      var ve = M & 31;
      it(e, f, re[ve]), f += F[ve], ve > 3 && (it(e, f, M >> 5 & 8191), f += Ct[ve]);
    } else
      it(e, f, U[M]), f += V[M];
  }
  return it(e, f, U[256]), f + V[256];
}, hn = /* @__PURE__ */ new Qt([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Zr = /* @__PURE__ */ new q(0), mn = function(n, e, t, r, s, a) {
  var i = a.z || n.length, o = new q(r + i + 5 * (1 + Math.ceil(i / 7e3)) + s), u = o.subarray(r, o.length - s), d = a.l, f = (a.r || 0) & 7;
  if (e) {
    f && (u[0] = a.r >> 3);
    for (var p = hn[e - 1], w = p >> 13, R = p & 8191, b = (1 << t) - 1, N = a.p || new oe(32768), J = a.h || new oe(b + 1), P = Math.ceil(t / 3), Q = 2 * P, Z = function(At) {
      return (n[At] ^ n[At + 1] << P ^ n[At + 2] << Q) & b;
    }, X = new Qt(25e3), H = new oe(288), ee = new oe(32), K = 0, j = 0, I = a.i || 0, B = 0, $ = a.w || 0, Y = 0; I + 2 < i; ++I) {
      var Te = Z(I), ne = I & 32767, te = J[Te];
      if (N[ne] = te, J[Te] = ne, $ <= I) {
        var U = i - I;
        if ((K > 7e3 || B > 24576) && (U > 423 || !d)) {
          f = lr(n, u, 0, X, H, ee, j, B, Y, I - Y, f), B = K = j = 0, Y = I;
          for (var V = 0; V < 286; ++V)
            H[V] = 0;
          for (var V = 0; V < 30; ++V)
            ee[V] = 0;
        }
        var re = 2, F = 0, nt = R, ce = ne - te & 32767;
        if (U > 2 && Te == Z(I - ce))
          for (var xe = Math.min(w, U) - 1, se = Math.min(32767, I), ae = Math.min(258, U); ce <= se && --nt && ne != te; ) {
            if (n[I + re] == n[I + re - ce]) {
              for (var M = 0; M < ae && n[I + M] == n[I + M - ce]; ++M)
                ;
              if (M > re) {
                if (re = M, F = ce, M > xe)
                  break;
                for (var ve = Math.min(ce, M - 2), Be = 0, V = 0; V < ve; ++V) {
                  var Ue = I - ce + V & 32767, pt = N[Ue], gt = Ue - pt & 32767;
                  gt > Be && (Be = gt, te = Ue);
                }
              }
            }
            ne = te, te = N[ne], ce += ne - te & 32767;
          }
        if (F) {
          X[B++] = 268435456 | Pt[re] << 18 | ir[F];
          var st = Pt[re] & 31, at = ir[F] & 31;
          j += Ot[st] + Ct[at], ++H[257 + st], ++ee[at], $ = I + re, ++K;
        } else
          X[B++] = n[I], ++H[n[I]];
      }
    }
    for (I = Math.max(I, $); I < i; ++I)
      X[B++] = n[I], ++H[n[I]];
    f = lr(n, u, d, X, H, ee, j, B, Y, I - Y, f), d || (a.r = f & 7 | u[f / 8 | 0] << 3, f -= 7, a.h = J, a.p = N, a.i = I, a.w = $);
  } else {
    for (var I = a.w || 0; I < i + d; I += 65535) {
      var Fe = I + 65535;
      Fe >= i && (u[f / 8 | 0] = d, Fe = i), f = Lr(u, f + 1, n.subarray(I, Fe));
    }
    a.i = i;
  }
  return Nr(o, 0, r + Xt(f) + s);
}, vn = /* @__PURE__ */ (function() {
  for (var n = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var t = e, r = 9; --r; )
      t = (t & 1 && -306674912) ^ t >>> 1;
    n[e] = t;
  }
  return n;
})(), pn = function() {
  var n = -1;
  return {
    p: function(e) {
      for (var t = n, r = 0; r < e.length; ++r)
        t = vn[t & 255 ^ e[r]] ^ t >>> 8;
      n = t;
    },
    d: function() {
      return ~n;
    }
  };
}, gn = function(n, e, t, r, s) {
  if (!s && (s = { l: 1 }, e.dictionary)) {
    var a = e.dictionary.subarray(-32768), i = new q(a.length + n.length);
    i.set(a), i.set(n, a.length), n = i, s.w = a.length;
  }
  return mn(n, e.level == null ? 6 : e.level, e.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(n.length))) * 1.5) : 20 : 12 + e.mem, t, r, s);
}, Dt = function(n, e, t) {
  for (; t; ++e)
    n[e] = t, t >>>= 8;
}, yn = function(n, e) {
  var t = e.filename;
  if (n[0] = 31, n[1] = 139, n[2] = 8, n[8] = e.level < 2 ? 4 : e.level == 9 ? 2 : 0, n[9] = 3, e.mtime != 0 && Dt(n, 4, Math.floor(new Date(e.mtime || Date.now()) / 1e3)), t) {
    n[3] = 8;
    for (var r = 0; r <= t.length; ++r)
      n[r + 10] = t.charCodeAt(r);
  }
}, _n = function(n) {
  (n[0] != 31 || n[1] != 139 || n[2] != 8) && me(6, "invalid gzip data");
  var e = n[3], t = 10;
  e & 4 && (t += (n[10] | n[11] << 8) + 2);
  for (var r = (e >> 3 & 1) + (e >> 4 & 1); r > 0; r -= !n[t++])
    ;
  return t + (e & 2);
}, wn = function(n) {
  var e = n.length;
  return (n[e - 4] | n[e - 3] << 8 | n[e - 2] << 16 | n[e - 1] << 24) >>> 0;
}, xn = function(n) {
  return 10 + (n.filename ? n.filename.length + 1 : 0);
};
function kn(n, e) {
  e || (e = {});
  var t = pn(), r = n.length;
  t.p(n);
  var s = gn(n, e, xn(e), 8), a = s.length;
  return yn(s, e), Dt(s, a - 8, t.d()), Dt(s, a - 4, r), s;
}
function bn(n, e) {
  var t = _n(n);
  return t + 8 > n.length && me(6, "invalid gzip data"), fn(n.subarray(t, -8), { i: 2 }, new q(wn(n)), e);
}
var In = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Tn = 0;
try {
  In.decode(Zr, { stream: !0 }), Tn = 1;
} catch {
}
const En = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function He(n, e, t) {
  const r = t[0];
  if (e != null && n >= e)
    throw new Error(n + " >= " + e);
  if (n.slice(-1) === r || e && e.slice(-1) === r)
    throw new Error("trailing zero");
  if (e) {
    let i = 0;
    for (; (n[i] || r) === e[i]; )
      i++;
    if (i > 0)
      return e.slice(0, i) + He(n.slice(i), e.slice(i), t);
  }
  const s = n ? t.indexOf(n[0]) : 0, a = e != null ? t.indexOf(e[0]) : t.length;
  if (a - s > 1) {
    const i = Math.round(0.5 * (s + a));
    return t[i];
  } else
    return e && e.length > 1 ? e.slice(0, 1) : t[s] + He(n.slice(1), null, t);
}
function Vr(n) {
  if (n.length !== Mr(n[0]))
    throw new Error("invalid integer part of order key: " + n);
}
function Mr(n) {
  if (n >= "a" && n <= "z")
    return n.charCodeAt(0) - 97 + 2;
  if (n >= "A" && n <= "Z")
    return 90 - n.charCodeAt(0) + 2;
  throw new Error("invalid order key head: " + n);
}
function ct(n) {
  const e = Mr(n[0]);
  if (e > n.length)
    throw new Error("invalid order key: " + n);
  return n.slice(0, e);
}
function cr(n, e) {
  if (n === "A" + e[0].repeat(26))
    throw new Error("invalid order key: " + n);
  const t = ct(n);
  if (n.slice(t.length).slice(-1) === e[0])
    throw new Error("invalid order key: " + n);
}
function ur(n, e) {
  Vr(n);
  const [t, ...r] = n.split("");
  let s = !0;
  for (let a = r.length - 1; s && a >= 0; a--) {
    const i = e.indexOf(r[a]) + 1;
    i === e.length ? r[a] = e[0] : (r[a] = e[i], s = !1);
  }
  if (s) {
    if (t === "Z")
      return "a" + e[0];
    if (t === "z")
      return null;
    const a = String.fromCharCode(t.charCodeAt(0) + 1);
    return a > "a" ? r.push(e[0]) : r.pop(), a + r.join("");
  } else
    return t + r.join("");
}
function Sn(n, e) {
  Vr(n);
  const [t, ...r] = n.split("");
  let s = !0;
  for (let a = r.length - 1; s && a >= 0; a--) {
    const i = e.indexOf(r[a]) - 1;
    i === -1 ? r[a] = e.slice(-1) : (r[a] = e[i], s = !1);
  }
  if (s) {
    if (t === "a")
      return "Z" + e.slice(-1);
    if (t === "A")
      return null;
    const a = String.fromCharCode(t.charCodeAt(0) - 1);
    return a < "Z" ? r.push(e.slice(-1)) : r.pop(), a + r.join("");
  } else
    return t + r.join("");
}
function lt(n, e, t = En) {
  if (n != null && cr(n, t), e != null && cr(e, t), n != null && e != null && n >= e)
    throw new Error(n + " >= " + e);
  if (n == null) {
    if (e == null)
      return "a" + t[0];
    const u = ct(e), d = e.slice(u.length);
    if (u === "A" + t[0].repeat(26))
      return u + He("", d, t);
    if (u < e)
      return u;
    const f = Sn(u, t);
    if (f == null)
      throw new Error("cannot decrement any more");
    return f;
  }
  if (e == null) {
    const u = ct(n), d = n.slice(u.length), f = ur(u, t);
    return f ?? u + He(d, null, t);
  }
  const r = ct(n), s = n.slice(r.length), a = ct(e), i = e.slice(a.length);
  if (r === a)
    return r + He(s, i, t);
  const o = ur(r, t);
  if (o == null)
    throw new Error("cannot increment any more");
  return o < e ? o : r + He(s, null, t);
}
const On = new Uint8Array([
  31,
  139,
  8,
  0,
  177,
  131,
  174,
  105,
  0,
  3,
  99,
  96,
  96,
  82,
  111,
  12,
  112,
  172,
  96,
  119,
  205,
  43,
  41,
  202,
  76,
  45,
  110,
  244,
  119,
  174,
  80,
  49,
  128,
  2,
  93,
  48,
  97,
  2,
  34,
  44,
  96,
  92,
  24,
  104,
  244,
  115,
  77,
  241,
  206,
  204,
  75,
  105,
  244,
  101,
  72,
  201,
  44,
  73,
  205,
  77,
  245,
  73,
  76,
  74,
  205,
  105,
  244,
  81,
  104,
  244,
  110,
  72,
  241,
  204,
  75,
  203,
  111,
  244,
  116,
  168,
  224,
  240,
  245,
  244,
  117,
  13,
  169,
  44,
  72,
  109,
  244,
  80,
  104,
  116,
  111,
  168,
  224,
  12,
  75,
  204,
  41,
  77,
  5,
  107,
  115,
  85,
  104,
  116,
  105,
  108,
  116,
  78,
  201,
  203,
  207,
  75,
  37,
  202,
  70,
  195,
  70,
  91,
  55,
  136,
  141,
  54,
  16,
  27,
  43,
  248,
  242,
  75,
  75,
  82,
  139,
  2,
  114,
  18,
  147,
  129,
  214,
  231,
  149,
  52,
  90,
  43,
  52,
  90,
  49,
  44,
  170,
  224,
  6,
  11,
  123,
  2,
  85,
  120,
  166,
  16,
  231,
  151,
  10,
  14,
  255,
  162,
  148,
  212,
  34,
  239,
  212,
  202,
  164,
  68,
  3,
  168,
  71,
  44,
  20,
  26,
  205,
  27,
  27,
  205,
  82,
  75,
  138,
  18,
  139,
  51,
  32,
  30,
  50,
  64,
  246,
  144,
  190,
  66,
  163,
  30,
  138,
  135,
  116,
  20,
  26,
  181,
  27,
  27,
  181,
  136,
  247,
  144,
  81,
  163,
  10,
  212,
  67,
  202,
  56,
  60,
  164,
  164,
  208,
  168,
  72,
  177,
  135,
  12,
  161,
  30,
  146,
  87,
  104,
  148,
  107,
  108,
  148,
  173,
  224,
  203,
  201,
  47,
  46,
  209,
  77,
  204,
  75,
  209,
  77,
  203,
  47,
  205,
  75,
  1,
  123,
  77,
  14,
  201,
  103,
  178,
  10,
  50,
  200,
  254,
  146,
  82,
  144,
  108,
  148,
  0,
  123,
  138,
  241,
  202,
  175,
  89,
  83,
  55,
  29,
  94,
  204,
  30,
  8,
  0,
  64,
  93,
  64,
  8,
  53,
  2,
  0,
  0
]);
var A;
(function(n) {
  n.assertEqual = (s) => {
  };
  function e(s) {
  }
  n.assertIs = e;
  function t(s) {
    throw new Error();
  }
  n.assertNever = t, n.arrayToEnum = (s) => {
    const a = {};
    for (const i of s)
      a[i] = i;
    return a;
  }, n.getValidEnumValues = (s) => {
    const a = n.objectKeys(s).filter((o) => typeof s[s[o]] != "number"), i = {};
    for (const o of a)
      i[o] = s[o];
    return n.objectValues(i);
  }, n.objectValues = (s) => n.objectKeys(s).map(function(a) {
    return s[a];
  }), n.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && a.push(i);
    return a;
  }, n.find = (s, a) => {
    for (const i of s)
      if (a(i))
        return i;
  }, n.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && Number.isFinite(s) && Math.floor(s) === s;
  function r(s, a = " | ") {
    return s.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  n.joinValues = r, n.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(A || (A = {}));
var dr;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(dr || (dr = {}));
const g = A.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Ce = (n) => {
  switch (typeof n) {
    case "undefined":
      return g.undefined;
    case "string":
      return g.string;
    case "number":
      return Number.isNaN(n) ? g.nan : g.number;
    case "boolean":
      return g.boolean;
    case "function":
      return g.function;
    case "bigint":
      return g.bigint;
    case "symbol":
      return g.symbol;
    case "object":
      return Array.isArray(n) ? g.array : n === null ? g.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? g.promise : typeof Map < "u" && n instanceof Map ? g.map : typeof Set < "u" && n instanceof Set ? g.set : typeof Date < "u" && n instanceof Date ? g.date : g.object;
    default:
      return g.unknown;
  }
}, h = A.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class Ie extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(a) {
      return a.message;
    }, r = { _errors: [] }, s = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(s);
        else if (i.code === "invalid_return_type")
          s(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          s(i.argumentsError);
        else if (i.path.length === 0)
          r._errors.push(t(i));
        else {
          let o = r, u = 0;
          for (; u < i.path.length; ) {
            const d = i.path[u];
            u === i.path.length - 1 ? (o[d] = o[d] || { _errors: [] }, o[d]._errors.push(t(i))) : o[d] = o[d] || { _errors: [] }, o = o[d], u++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof Ie))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, A.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const a = s.path[0];
        t[a] = t[a] || [], t[a].push(e(s));
      } else
        r.push(e(s));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ie.create = (n) => new Ie(n);
const Kt = (n, e) => {
  let t;
  switch (n.code) {
    case h.invalid_type:
      n.received === g.undefined ? t = "Required" : t = `Expected ${n.expected}, received ${n.received}`;
      break;
    case h.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(n.expected, A.jsonStringifyReplacer)}`;
      break;
    case h.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${A.joinValues(n.keys, ", ")}`;
      break;
    case h.invalid_union:
      t = "Invalid input";
      break;
    case h.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${A.joinValues(n.options)}`;
      break;
    case h.invalid_enum_value:
      t = `Invalid enum value. Expected ${A.joinValues(n.options)}, received '${n.received}'`;
      break;
    case h.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case h.invalid_return_type:
      t = "Invalid function return type";
      break;
    case h.invalid_date:
      t = "Invalid date";
      break;
    case h.invalid_string:
      typeof n.validation == "object" ? "includes" in n.validation ? (t = `Invalid input: must include "${n.validation.includes}"`, typeof n.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith" in n.validation ? t = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith" in n.validation ? t = `Invalid input: must end with "${n.validation.endsWith}"` : A.assertNever(n.validation) : n.validation !== "regex" ? t = `Invalid ${n.validation}` : t = "Invalid";
      break;
    case h.too_small:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} ${n.minimum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} ${n.minimum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "bigint" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(n.minimum))}` : t = "Invalid input";
      break;
    case h.too_big:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} ${n.maximum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} ${n.maximum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "bigint" ? t = `BigInt must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(n.maximum))}` : t = "Invalid input";
      break;
    case h.custom:
      t = "Invalid input";
      break;
    case h.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case h.not_multiple_of:
      t = `Number must be a multiple of ${n.multipleOf}`;
      break;
    case h.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, A.assertNever(n);
  }
  return { message: t };
};
let Cn = Kt;
function An() {
  return Cn;
}
const Rn = (n) => {
  const { data: e, path: t, errorMaps: r, issueData: s } = n, a = [...t, ...s.path || []], i = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let o = "";
  const u = r.filter((d) => !!d).slice().reverse();
  for (const d of u)
    o = d(i, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: a,
    message: o
  };
};
function v(n, e) {
  const t = An(), r = Rn({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      // contextual error map is first priority
      n.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === Kt ? void 0 : Kt
      // then global default map
    ].filter((s) => !!s)
  });
  n.common.issues.push(r);
}
class le {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const r = [];
    for (const s of t) {
      if (s.status === "aborted")
        return x;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const s of t) {
      const a = await s.key, i = await s.value;
      r.push({
        key: a,
        value: i
      });
    }
    return le.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const s of t) {
      const { key: a, value: i } = s;
      if (a.status === "aborted" || i.status === "aborted")
        return x;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) && (r[a.value] = i.value);
    }
    return { status: e.value, value: r };
  }
}
const x = Object.freeze({
  status: "aborted"
}), ut = (n) => ({ status: "dirty", value: n }), ue = (n) => ({ status: "valid", value: n }), fr = (n) => n.status === "aborted", hr = (n) => n.status === "dirty", Qe = (n) => n.status === "valid", kt = (n) => typeof Promise < "u" && n instanceof Promise;
var y;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(y || (y = {}));
class Ve {
  constructor(e, t, r, s) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const mr = (n, e) => {
  if (Qe(e))
    return { success: !0, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new Ie(n.common.issues);
      return this._error = t, this._error;
    }
  };
};
function T(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: s } = n;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (i, o) => {
    const { message: u } = n;
    return i.code === "invalid_enum_value" ? { message: u ?? o.defaultError } : typeof o.data > "u" ? { message: u ?? r ?? o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: u ?? t ?? o.defaultError };
  }, description: s };
}
class S {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Ce(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: Ce(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new le(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Ce(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (kt(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const r = this.safeParse(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    const r = {
      common: {
        issues: [],
        async: (t == null ? void 0 : t.async) ?? !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ce(e)
    }, s = this._parseSync({ data: e, path: r.path, parent: r });
    return mr(r, s);
  }
  "~validate"(e) {
    var r, s;
    const t = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ce(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: t });
        return Qe(a) ? {
          value: a.value
        } : {
          issues: t.common.issues
        };
      } catch (a) {
        (s = (r = a == null ? void 0 : a.message) == null ? void 0 : r.toLowerCase()) != null && s.includes("encountered") && (this["~standard"].async = !0), t.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then((a) => Qe(a) ? {
      value: a.value
    } : {
      issues: t.common.issues
    });
  }
  async parseAsync(e, t) {
    const r = await this.safeParseAsync(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ce(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), a = await (kt(s) ? s : Promise.resolve(s));
    return mr(r, a);
  }
  refine(e, t) {
    const r = (s) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(s) : t;
    return this._refinement((s, a) => {
      const i = e(s), o = () => a.addIssue({
        code: h.custom,
        ...r(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((u) => u ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof t == "function" ? t(r, s) : t), !1));
  }
  _refinement(e) {
    return new tt({
      schema: this,
      typeName: k.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (t) => this["~validate"](t)
    };
  }
  optional() {
    return Le.create(this, this._def);
  }
  nullable() {
    return rt.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return we.create(this);
  }
  promise() {
    return Et.create(this, this._def);
  }
  or(e) {
    return It.create([this, e], this._def);
  }
  and(e) {
    return Tt.create(this, e, this._def);
  }
  transform(e) {
    return new tt({
      ...T(this._def),
      schema: this,
      typeName: k.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Ut({
      ...T(this._def),
      innerType: this,
      defaultValue: t,
      typeName: k.ZodDefault
    });
  }
  brand() {
    return new es({
      typeName: k.ZodBranded,
      type: this,
      ...T(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Ft({
      ...T(this._def),
      innerType: this,
      catchValue: t,
      typeName: k.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return er.create(this, e);
  }
  readonly() {
    return Wt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const jn = /^c[^\s-]{8,}$/i, Nn = /^[0-9a-z]+$/, Ln = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Zn = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Vn = /^[a-z0-9_-]{21}$/i, Mn = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Pn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, $n = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, zn = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Vt;
const Dn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Kn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Bn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Un = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Fn = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Wn = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Pr = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", qn = new RegExp(`^${Pr}$`);
function $r(n) {
  let e = "[0-5]\\d";
  n.precision ? e = `${e}\\.\\d{${n.precision}}` : n.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = n.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function Jn(n) {
  return new RegExp(`^${$r(n)}$`);
}
function Hn(n) {
  let e = `${Pr}T${$r(n)}`;
  const t = [];
  return t.push(n.local ? "Z?" : "Z"), n.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function Yn(n, e) {
  return !!((e === "v4" || !e) && Dn.test(n) || (e === "v6" || !e) && Bn.test(n));
}
function Gn(n, e) {
  if (!Mn.test(n))
    return !1;
  try {
    const [t] = n.split(".");
    if (!t)
      return !1;
    const r = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), s = JSON.parse(atob(r));
    return !(typeof s != "object" || s === null || "typ" in s && (s == null ? void 0 : s.typ) !== "JWT" || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function Qn(n, e) {
  return !!((e === "v4" || !e) && Kn.test(n) || (e === "v6" || !e) && Un.test(n));
}
class Ne extends S {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== g.string) {
      const a = this._getOrReturnCtx(e);
      return v(a, {
        code: h.invalid_type,
        expected: g.string,
        received: a.parsedType
      }), x;
    }
    const r = new le();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), v(s, {
          code: h.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), v(s, {
          code: h.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (s = this._getOrReturnCtx(e, s), i ? v(s, {
          code: h.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && v(s, {
          code: h.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        $n.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
          validation: "email",
          code: h.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        Vt || (Vt = new RegExp(zn, "u")), Vt.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
          validation: "emoji",
          code: h.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        Zn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
          validation: "uuid",
          code: h.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "nanoid")
        Vn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
          validation: "nanoid",
          code: h.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        jn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
          validation: "cuid",
          code: h.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        Nn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
          validation: "cuid2",
          code: h.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        Ln.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
          validation: "ulid",
          code: h.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), v(s, {
            validation: "url",
            code: h.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
        validation: "regex",
        code: h.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? Hn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "date" ? qn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.invalid_string,
        validation: "date",
        message: a.message
      }), r.dirty()) : a.kind === "time" ? Jn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.invalid_string,
        validation: "time",
        message: a.message
      }), r.dirty()) : a.kind === "duration" ? Pn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
        validation: "duration",
        code: h.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? Yn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), v(s, {
        validation: "ip",
        code: h.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "jwt" ? Gn(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), v(s, {
        validation: "jwt",
        code: h.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "cidr" ? Qn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), v(s, {
        validation: "cidr",
        code: h.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64" ? Fn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
        validation: "base64",
        code: h.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64url" ? Wn.test(e.data) || (s = this._getOrReturnCtx(e, s), v(s, {
        validation: "base64url",
        code: h.invalid_string,
        message: a.message
      }), r.dirty()) : A.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((s) => e.test(s), {
      validation: t,
      code: h.invalid_string,
      ...y.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Ne({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...y.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...y.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...y.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...y.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...y.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...y.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...y.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...y.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...y.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...y.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...y.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...y.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...y.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (e == null ? void 0 : e.offset) ?? !1,
      local: (e == null ? void 0 : e.local) ?? !1,
      ...y.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...y.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...y.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...y.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...y.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...y.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...y.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...y.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...y.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...y.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, y.errToObj(e));
  }
  trim() {
    return new Ne({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Ne({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Ne({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Ne.create = (n) => new Ne({
  checks: [],
  typeName: k.ZodString,
  coerce: (n == null ? void 0 : n.coerce) ?? !1,
  ...T(n)
});
function Xn(n, e) {
  const t = (n.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = t > r ? t : r, a = Number.parseInt(n.toFixed(s).replace(".", "")), i = Number.parseInt(e.toFixed(s).replace(".", ""));
  return a % i / 10 ** s;
}
class Xe extends S {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== g.number) {
      const a = this._getOrReturnCtx(e);
      return v(a, {
        code: h.invalid_type,
        expected: g.number,
        received: a.parsedType
      }), x;
    }
    let r;
    const s = new le();
    for (const a of this._def.checks)
      a.kind === "int" ? A.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? Xn(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.not_finite,
        message: a.message
      }), s.dirty()) : A.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, y.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, y.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, y.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, y.toString(t));
  }
  setLimit(e, t, r, s) {
    return new Xe({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: y.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Xe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: y.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: y.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: y.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: y.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && A.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
Xe.create = (n) => new Xe({
  checks: [],
  typeName: k.ZodNumber,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...T(n)
});
class ht extends S {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== g.bigint)
      return this._getInvalidInput(e);
    let r;
    const s = new le();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), v(r, {
        code: h.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : A.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return v(t, {
      code: h.invalid_type,
      expected: g.bigint,
      received: t.parsedType
    }), x;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, y.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, y.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, y.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, y.toString(t));
  }
  setLimit(e, t, r, s) {
    return new ht({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: y.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ht({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
ht.create = (n) => new ht({
  checks: [],
  typeName: k.ZodBigInt,
  coerce: (n == null ? void 0 : n.coerce) ?? !1,
  ...T(n)
});
class vr extends S {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== g.boolean) {
      const r = this._getOrReturnCtx(e);
      return v(r, {
        code: h.invalid_type,
        expected: g.boolean,
        received: r.parsedType
      }), x;
    }
    return ue(e.data);
  }
}
vr.create = (n) => new vr({
  typeName: k.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...T(n)
});
class bt extends S {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== g.date) {
      const a = this._getOrReturnCtx(e);
      return v(a, {
        code: h.invalid_type,
        expected: g.date,
        received: a.parsedType
      }), x;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return v(a, {
        code: h.invalid_date
      }), x;
    }
    const r = new le();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), v(s, {
        code: h.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : A.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new bt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: y.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: y.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
bt.create = (n) => new bt({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || !1,
  typeName: k.ZodDate,
  ...T(n)
});
class pr extends S {
  _parse(e) {
    if (this._getType(e) !== g.symbol) {
      const r = this._getOrReturnCtx(e);
      return v(r, {
        code: h.invalid_type,
        expected: g.symbol,
        received: r.parsedType
      }), x;
    }
    return ue(e.data);
  }
}
pr.create = (n) => new pr({
  typeName: k.ZodSymbol,
  ...T(n)
});
class gr extends S {
  _parse(e) {
    if (this._getType(e) !== g.undefined) {
      const r = this._getOrReturnCtx(e);
      return v(r, {
        code: h.invalid_type,
        expected: g.undefined,
        received: r.parsedType
      }), x;
    }
    return ue(e.data);
  }
}
gr.create = (n) => new gr({
  typeName: k.ZodUndefined,
  ...T(n)
});
class yr extends S {
  _parse(e) {
    if (this._getType(e) !== g.null) {
      const r = this._getOrReturnCtx(e);
      return v(r, {
        code: h.invalid_type,
        expected: g.null,
        received: r.parsedType
      }), x;
    }
    return ue(e.data);
  }
}
yr.create = (n) => new yr({
  typeName: k.ZodNull,
  ...T(n)
});
class _r extends S {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return ue(e.data);
  }
}
_r.create = (n) => new _r({
  typeName: k.ZodAny,
  ...T(n)
});
class wr extends S {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return ue(e.data);
  }
}
wr.create = (n) => new wr({
  typeName: k.ZodUnknown,
  ...T(n)
});
class Me extends S {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return v(t, {
      code: h.invalid_type,
      expected: g.never,
      received: t.parsedType
    }), x;
  }
}
Me.create = (n) => new Me({
  typeName: k.ZodNever,
  ...T(n)
});
class xr extends S {
  _parse(e) {
    if (this._getType(e) !== g.undefined) {
      const r = this._getOrReturnCtx(e);
      return v(r, {
        code: h.invalid_type,
        expected: g.void,
        received: r.parsedType
      }), x;
    }
    return ue(e.data);
  }
}
xr.create = (n) => new xr({
  typeName: k.ZodVoid,
  ...T(n)
});
class we extends S {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), s = this._def;
    if (t.parsedType !== g.array)
      return v(t, {
        code: h.invalid_type,
        expected: g.array,
        received: t.parsedType
      }), x;
    if (s.exactLength !== null) {
      const i = t.data.length > s.exactLength.value, o = t.data.length < s.exactLength.value;
      (i || o) && (v(t, {
        code: i ? h.too_big : h.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && t.data.length < s.minLength.value && (v(t, {
      code: h.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && t.data.length > s.maxLength.value && (v(t, {
      code: h.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((i, o) => s.type._parseAsync(new Ve(t, i, t.path, o)))).then((i) => le.mergeArray(r, i));
    const a = [...t.data].map((i, o) => s.type._parseSync(new Ve(t, i, t.path, o)));
    return le.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new we({
      ...this._def,
      minLength: { value: e, message: y.toString(t) }
    });
  }
  max(e, t) {
    return new we({
      ...this._def,
      maxLength: { value: e, message: y.toString(t) }
    });
  }
  length(e, t) {
    return new we({
      ...this._def,
      exactLength: { value: e, message: y.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
we.create = (n, e) => new we({
  type: n,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: k.ZodArray,
  ...T(e)
});
function We(n) {
  if (n instanceof D) {
    const e = {};
    for (const t in n.shape) {
      const r = n.shape[t];
      e[t] = Le.create(We(r));
    }
    return new D({
      ...n._def,
      shape: () => e
    });
  } else return n instanceof we ? new we({
    ...n._def,
    type: We(n.element)
  }) : n instanceof Le ? Le.create(We(n.unwrap())) : n instanceof rt ? rt.create(We(n.unwrap())) : n instanceof Ke ? Ke.create(n.items.map((e) => We(e))) : n;
}
class D extends S {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = A.objectKeys(e);
    return this._cached = { shape: e, keys: t }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== g.object) {
      const d = this._getOrReturnCtx(e);
      return v(d, {
        code: h.invalid_type,
        expected: g.object,
        received: d.parsedType
      }), x;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof Me && this._def.unknownKeys === "strip"))
      for (const d in s.data)
        i.includes(d) || o.push(d);
    const u = [];
    for (const d of i) {
      const f = a[d], p = s.data[d];
      u.push({
        key: { status: "valid", value: d },
        value: f._parse(new Ve(s, p, s.path, d)),
        alwaysSet: d in s.data
      });
    }
    if (this._def.catchall instanceof Me) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const f of o)
          u.push({
            key: { status: "valid", value: f },
            value: { status: "valid", value: s.data[f] }
          });
      else if (d === "strict")
        o.length > 0 && (v(s, {
          code: h.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const f of o) {
        const p = s.data[f];
        u.push({
          key: { status: "valid", value: f },
          value: d._parse(
            new Ve(s, p, s.path, f)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: f in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const f of u) {
        const p = await f.key, w = await f.value;
        d.push({
          key: p,
          value: w,
          alwaysSet: f.alwaysSet
        });
      }
      return d;
    }).then((d) => le.mergeObjectSync(r, d)) : le.mergeObjectSync(r, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return y.errToObj, new D({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          var a, i;
          const s = ((i = (a = this._def).errorMap) == null ? void 0 : i.call(a, t, r).message) ?? r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: y.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new D({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new D({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new D({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new D({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: k.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new D({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    for (const r of A.objectKeys(e))
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    return new D({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    for (const r of A.objectKeys(this.shape))
      e[r] || (t[r] = this.shape[r]);
    return new D({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return We(this);
  }
  partial(e) {
    const t = {};
    for (const r of A.objectKeys(this.shape)) {
      const s = this.shape[r];
      e && !e[r] ? t[r] = s : t[r] = s.optional();
    }
    return new D({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    for (const r of A.objectKeys(this.shape))
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof Le; )
          a = a._def.innerType;
        t[r] = a;
      }
    return new D({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return zr(A.objectKeys(this.shape));
  }
}
D.create = (n, e) => new D({
  shape: () => n,
  unknownKeys: "strip",
  catchall: Me.create(),
  typeName: k.ZodObject,
  ...T(e)
});
D.strictCreate = (n, e) => new D({
  shape: () => n,
  unknownKeys: "strict",
  catchall: Me.create(),
  typeName: k.ZodObject,
  ...T(e)
});
D.lazycreate = (n, e) => new D({
  shape: n,
  unknownKeys: "strip",
  catchall: Me.create(),
  typeName: k.ZodObject,
  ...T(e)
});
class It extends S {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function s(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new Ie(o.ctx.common.issues));
      return v(t, {
        code: h.invalid_union,
        unionErrors: i
      }), x;
    }
    if (t.common.async)
      return Promise.all(r.map(async (a) => {
        const i = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: i
          }),
          ctx: i
        };
      })).then(s);
    {
      let a;
      const i = [];
      for (const u of r) {
        const d = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, f = u._parseSync({
          data: t.data,
          path: t.path,
          parent: d
        });
        if (f.status === "valid")
          return f;
        f.status === "dirty" && !a && (a = { result: f, ctx: d }), d.common.issues.length && i.push(d.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((u) => new Ie(u));
      return v(t, {
        code: h.invalid_union,
        unionErrors: o
      }), x;
    }
  }
  get options() {
    return this._def.options;
  }
}
It.create = (n, e) => new It({
  options: n,
  typeName: k.ZodUnion,
  ...T(e)
});
function Bt(n, e) {
  const t = Ce(n), r = Ce(e);
  if (n === e)
    return { valid: !0, data: n };
  if (t === g.object && r === g.object) {
    const s = A.objectKeys(e), a = A.objectKeys(n).filter((o) => s.indexOf(o) !== -1), i = { ...n, ...e };
    for (const o of a) {
      const u = Bt(n[o], e[o]);
      if (!u.valid)
        return { valid: !1 };
      i[o] = u.data;
    }
    return { valid: !0, data: i };
  } else if (t === g.array && r === g.array) {
    if (n.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < n.length; a++) {
      const i = n[a], o = e[a], u = Bt(i, o);
      if (!u.valid)
        return { valid: !1 };
      s.push(u.data);
    }
    return { valid: !0, data: s };
  } else return t === g.date && r === g.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
class Tt extends S {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = (a, i) => {
      if (fr(a) || fr(i))
        return x;
      const o = Bt(a.value, i.value);
      return o.valid ? ((hr(a) || hr(i)) && t.dirty(), { status: t.value, value: o.data }) : (v(r, {
        code: h.invalid_intersection_types
      }), x);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([a, i]) => s(a, i)) : s(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Tt.create = (n, e, t) => new Tt({
  left: n,
  right: e,
  typeName: k.ZodIntersection,
  ...T(t)
});
class Ke extends S {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.array)
      return v(r, {
        code: h.invalid_type,
        expected: g.array,
        received: r.parsedType
      }), x;
    if (r.data.length < this._def.items.length)
      return v(r, {
        code: h.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), x;
    !this._def.rest && r.data.length > this._def.items.length && (v(r, {
      code: h.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...r.data].map((i, o) => {
      const u = this._def.items[o] || this._def.rest;
      return u ? u._parse(new Ve(r, i, r.path, o)) : null;
    }).filter((i) => !!i);
    return r.common.async ? Promise.all(a).then((i) => le.mergeArray(t, i)) : le.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Ke({
      ...this._def,
      rest: e
    });
  }
}
Ke.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Ke({
    items: n,
    typeName: k.ZodTuple,
    rest: null,
    ...T(e)
  });
};
class kr extends S {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.map)
      return v(r, {
        code: h.invalid_type,
        expected: g.map,
        received: r.parsedType
      }), x;
    const s = this._def.keyType, a = this._def.valueType, i = [...r.data.entries()].map(([o, u], d) => ({
      key: s._parse(new Ve(r, o, r.path, [d, "key"])),
      value: a._parse(new Ve(r, u, r.path, [d, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of i) {
          const d = await u.key, f = await u.value;
          if (d.status === "aborted" || f.status === "aborted")
            return x;
          (d.status === "dirty" || f.status === "dirty") && t.dirty(), o.set(d.value, f.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const u of i) {
        const d = u.key, f = u.value;
        if (d.status === "aborted" || f.status === "aborted")
          return x;
        (d.status === "dirty" || f.status === "dirty") && t.dirty(), o.set(d.value, f.value);
      }
      return { status: t.value, value: o };
    }
  }
}
kr.create = (n, e, t) => new kr({
  valueType: e,
  keyType: n,
  typeName: k.ZodMap,
  ...T(t)
});
class mt extends S {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.set)
      return v(r, {
        code: h.invalid_type,
        expected: g.set,
        received: r.parsedType
      }), x;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (v(r, {
      code: h.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), t.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (v(r, {
      code: h.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function i(u) {
      const d = /* @__PURE__ */ new Set();
      for (const f of u) {
        if (f.status === "aborted")
          return x;
        f.status === "dirty" && t.dirty(), d.add(f.value);
      }
      return { status: t.value, value: d };
    }
    const o = [...r.data.values()].map((u, d) => a._parse(new Ve(r, u, r.path, d)));
    return r.common.async ? Promise.all(o).then((u) => i(u)) : i(o);
  }
  min(e, t) {
    return new mt({
      ...this._def,
      minSize: { value: e, message: y.toString(t) }
    });
  }
  max(e, t) {
    return new mt({
      ...this._def,
      maxSize: { value: e, message: y.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
mt.create = (n, e) => new mt({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: k.ZodSet,
  ...T(e)
});
class br extends S {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
br.create = (n, e) => new br({
  getter: n,
  typeName: k.ZodLazy,
  ...T(e)
});
class Ir extends S {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return v(t, {
        received: t.data,
        code: h.invalid_literal,
        expected: this._def.value
      }), x;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Ir.create = (n, e) => new Ir({
  value: n,
  typeName: k.ZodLiteral,
  ...T(e)
});
function zr(n, e) {
  return new et({
    values: n,
    typeName: k.ZodEnum,
    ...T(e)
  });
}
class et extends S {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return v(t, {
        expected: A.joinValues(r),
        received: t.parsedType,
        code: h.invalid_type
      }), x;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return v(t, {
        received: t.data,
        code: h.invalid_enum_value,
        options: r
      }), x;
    }
    return ue(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return et.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return et.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...t
    });
  }
}
et.create = zr;
class Tr extends S {
  _parse(e) {
    const t = A.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== g.string && r.parsedType !== g.number) {
      const s = A.objectValues(t);
      return v(r, {
        expected: A.joinValues(s),
        received: r.parsedType,
        code: h.invalid_type
      }), x;
    }
    if (this._cache || (this._cache = new Set(A.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = A.objectValues(t);
      return v(r, {
        received: r.data,
        code: h.invalid_enum_value,
        options: s
      }), x;
    }
    return ue(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Tr.create = (n, e) => new Tr({
  values: n,
  typeName: k.ZodNativeEnum,
  ...T(e)
});
class Et extends S {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== g.promise && t.common.async === !1)
      return v(t, {
        code: h.invalid_type,
        expected: g.promise,
        received: t.parsedType
      }), x;
    const r = t.parsedType === g.promise ? t.data : Promise.resolve(t.data);
    return ue(r.then((s) => this._def.type.parseAsync(s, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
Et.create = (n, e) => new Et({
  type: n,
  typeName: k.ZodPromise,
  ...T(e)
});
class tt extends S {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === k.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (i) => {
        v(r, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const i = s.transform(r.data, a);
      if (r.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (t.value === "aborted")
            return x;
          const u = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return u.status === "aborted" ? x : u.status === "dirty" || t.value === "dirty" ? ut(u.value) : u;
        });
      {
        if (t.value === "aborted")
          return x;
        const o = this._def.schema._parseSync({
          data: i,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? x : o.status === "dirty" || t.value === "dirty" ? ut(o.value) : o;
      }
    }
    if (s.type === "refinement") {
      const i = (o) => {
        const u = s.refinement(o, a);
        if (r.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? x : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? x : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Qe(i))
          return x;
        const o = s.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => Qe(i) ? Promise.resolve(s.transform(i.value, a)).then((o) => ({
          status: t.value,
          value: o
        })) : x);
    A.assertNever(s);
  }
}
tt.create = (n, e, t) => new tt({
  schema: n,
  typeName: k.ZodEffects,
  effect: e,
  ...T(t)
});
tt.createWithPreprocess = (n, e, t) => new tt({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: k.ZodEffects,
  ...T(t)
});
class Le extends S {
  _parse(e) {
    return this._getType(e) === g.undefined ? ue(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Le.create = (n, e) => new Le({
  innerType: n,
  typeName: k.ZodOptional,
  ...T(e)
});
class rt extends S {
  _parse(e) {
    return this._getType(e) === g.null ? ue(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
rt.create = (n, e) => new rt({
  innerType: n,
  typeName: k.ZodNullable,
  ...T(e)
});
class Ut extends S {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === g.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ut.create = (n, e) => new Ut({
  innerType: n,
  typeName: k.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...T(e)
});
class Ft extends S {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return kt(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Ie(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Ie(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Ft.create = (n, e) => new Ft({
  innerType: n,
  typeName: k.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...T(e)
});
class Er extends S {
  _parse(e) {
    if (this._getType(e) !== g.nan) {
      const r = this._getOrReturnCtx(e);
      return v(r, {
        code: h.invalid_type,
        expected: g.nan,
        received: r.parsedType
      }), x;
    }
    return { status: "valid", value: e.data };
  }
}
Er.create = (n) => new Er({
  typeName: k.ZodNaN,
  ...T(n)
});
class es extends S {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class er extends S {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? x : a.status === "dirty" ? (t.dirty(), ut(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? x : s.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new er({
      in: e,
      out: t,
      typeName: k.ZodPipeline
    });
  }
}
class Wt extends S {
  _parse(e) {
    const t = this._def.innerType._parse(e), r = (s) => (Qe(s) && (s.value = Object.freeze(s.value)), s);
    return kt(t) ? t.then((s) => r(s)) : r(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Wt.create = (n, e) => new Wt({
  innerType: n,
  typeName: k.ZodReadonly,
  ...T(e)
});
var k;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline", n.ZodReadonly = "ZodReadonly";
})(k || (k = {}));
const Dr = Ne.create, ts = Xe.create;
Me.create;
we.create;
It.create;
Tt.create;
Ke.create;
et.create;
Et.create;
Le.create;
rt.create;
const rs = Dr(), Sr = Dr().min(1), _t = ts().int().nonnegative().optional();
var C, vt, $e, be, ze, ie, Ae, Re, ge, ye, St, Ye, je, Ge, De, l, Kr, Br, Ur, Fr, E, G, Wr, qr, qt, Jr, Hr, he, Oe, qe, dt, Je, wt, xt, Yr, Jt, Gr, Ht, Yt, Gt, Qr, ns, O, Xr, en;
const tr = class tr {
  //----------------------------------------------------------------------------//
  //                                Construction                                //
  //----------------------------------------------------------------------------//
  /**** constructor — initialize store with model and configuration ****/
  constructor(e, t) {
    W(this, l);
    /**** private state ****/
    W(this, C);
    W(this, vt);
    W(this, $e);
    W(this, be, null);
    W(this, ze, /* @__PURE__ */ new Set());
    // reverse index: outerItemId → Set<entryId>
    W(this, ie, /* @__PURE__ */ new Map());
    // forward index: entryId → outerItemId (kept in sync with #ReverseIndex)
    W(this, Ae, /* @__PURE__ */ new Map());
    // incoming link index: targetId → Set<linkId>
    W(this, Re, /* @__PURE__ */ new Map());
    // link forward index: linkId → targetId (kept in sync with #LinkTargetIndex)
    W(this, ge, /* @__PURE__ */ new Map());
    // LRU wrapper cache
    W(this, ye, /* @__PURE__ */ new Map());
    W(this, St, tn);
    // transaction nesting
    W(this, Ye, 0);
    // ChangeSet accumulator inside a transaction
    W(this, je, {});
    // patch log for exportPatch() — only locally generated patches (as binaries)
    W(this, Ge, []);
    // suppress index updates / change tracking when applying remote patches
    W(this, De, !1);
    if (pe(this, C, e), pe(this, vt, (t == null ? void 0 : t.LiteralSizeLimit) ?? rn), pe(this, $e, (t == null ? void 0 : t.TrashTTLms) ?? null), c(this, l, Jr).call(this), m(this, $e) != null) {
      const r = (t == null ? void 0 : t.TrashCheckIntervalMs) ?? Math.min(Math.floor(m(this, $e) / 4), 36e5);
      pe(this, be, setInterval(
        () => {
          this.purgeExpiredTrashEntries();
        },
        r
      )), typeof m(this, be).unref == "function" && m(this, be).unref();
    }
  }
  /**** fromScratch — create store from canonical empty snapshot ****/
  static fromScratch(e) {
    return this.fromBinary(On, e);
  }
  /**** fromBinary — deserialize store from binary snapshot ****/
  static fromBinary(e, t) {
    const r = bn(e), s = sn.fromBinary(r);
    return new tr(s, t);
  }
  /**** fromJSON — deserialize store from base64-encoded JSON snapshot ****/
  static fromJSON(e, t) {
    const r = globalThis.Buffer, s = r != null ? new Uint8Array(r.from(String(e), "base64")) : Uint8Array.from(atob(String(e)), (a) => a.charCodeAt(0));
    return this.fromBinary(s, t);
  }
  //----------------------------------------------------------------------------//
  //                             Public Accessors                               //
  //----------------------------------------------------------------------------//
  /**** RootItem / TrashItem / LostAndFoundItem — access special items ****/
  get RootItem() {
    return c(this, l, G).call(this, Pe);
  }
  get TrashItem() {
    return c(this, l, G).call(this, z);
  }
  get LostAndFoundItem() {
    return c(this, l, G).call(this, Ee);
  }
  /**** EntryWithId — retrieve entry by id ****/
  EntryWithId(e) {
    if (c(this, l, E).call(this).Entries[e] != null)
      return c(this, l, G).call(this, e);
  }
  //----------------------------------------------------------------------------//
  //                             Public Mutators                                //
  //----------------------------------------------------------------------------//
  /**** newItemAt — create new data in specified location ****/
  newItemAt(e, t, r) {
    const s = t ?? yt;
    if (!Sr.safeParse(s).success)
      throw new de("invalid-argument", "MIMEType must be a non-empty string");
    return _t.parse(r), this.transact(() => {
      const i = crypto.randomUUID(), o = c(this, l, Je).call(this, e.Id, r), u = s === yt ? "" : s, d = _.obj({
        Kind: _.con("item"),
        outerPlacement: _.val(_.con({ outerItemId: e.Id, OrderKey: o })),
        Label: _.val(_.str("")),
        Info: _.obj({}),
        MIMEType: _.val(_.str(u)),
        ValueKind: _.val(_.str("none"))
      });
      return m(this, C).api.obj(["Entries"]).set({ [i]: d }), c(this, l, he).call(this, e.Id, i), c(this, l, O).call(this, e.Id, "innerEntryList"), c(this, l, O).call(this, i, "outerItem"), c(this, l, G).call(this, i);
    });
  }
  /**** newLinkAt — create new link in specified location ****/
  newLinkAt(e, t, r) {
    return _t.parse(r), c(this, l, Gt).call(this, e.Id), c(this, l, Gt).call(this, t.Id), this.transact(() => {
      const s = crypto.randomUUID(), a = c(this, l, Je).call(this, t.Id, r), i = _.obj({
        Kind: _.con("link"),
        outerPlacement: _.val(_.con({ outerItemId: t.Id, OrderKey: a })),
        Label: _.val(_.str("")),
        Info: _.obj({}),
        TargetId: _.con(e.Id)
      });
      return m(this, C).api.obj(["Entries"]).set({ [s]: i }), c(this, l, he).call(this, t.Id, s), c(this, l, qe).call(this, e.Id, s), c(this, l, O).call(this, t.Id, "innerEntryList"), c(this, l, O).call(this, s, "outerItem"), c(this, l, G).call(this, s);
    });
  }
  /**** deserializeItemInto — deserialize data from JSON into tree ****/
  deserializeItemInto(e, t, r) {
    if (_t.parse(r), e == null)
      throw new de("invalid-argument", "Serialisation must not be null");
    const s = [], a = /* @__PURE__ */ new Map(), i = (d, f) => {
      const p = typeof f == "string" ? f : f.Id, w = d.Id ?? crypto.randomUUID(), R = crypto.randomUUID();
      if (a.set(w, R), s.push({
        oldId: w,
        newId: R,
        outerId: p,
        Entry: d
      }), d.innerEntries && Array.isArray(d.innerEntries))
        for (const b of d.innerEntries)
          i(b, R);
    };
    i(e, t);
    const o = c(this, l, Je).call(this, t.Id, r), u = a.get(s[0].oldId);
    return this.transact(() => {
      var d;
      for (let f = 0; f < s.length; f++) {
        const { oldId: p, newId: w, outerId: R, Entry: b } = s[f], N = f === 0 ? t.Id : a.get(R) ?? R, J = f === 0 ? o : ((d = b.outerPlacement) == null ? void 0 : d.OrderKey) ?? "", P = {
          Kind: _.con(b.Kind),
          outerPlacement: _.val(_.con({ outerItemId: N, OrderKey: J })),
          Label: _.val(_.str(b.Label ?? "")),
          Info: _.obj({})
        };
        if (b.Kind === "item") {
          const Z = b.Type === "text/plain" ? "" : b.Type ?? "";
          P.MIMEType = _.val(_.str(Z)), P.ValueKind = _.val(_.str(b.ValueKind ?? "none")), b.literalValue && (P.literalValue = b.literalValue), b.binaryValue && (P.binaryValue = b.binaryValue), b.ValueRef && (P.ValueRef = b.ValueRef);
        } else if (b.Kind === "link") {
          const Z = b.TargetId ? a.get(b.TargetId) ?? b.TargetId : "";
          P.TargetId = _.con(Z);
        }
        const Q = _.obj(P);
        if (m(this, C).api.obj(["Entries"]).set({ [w]: Q }), c(this, l, he).call(this, N, w), b.Kind === "link" && b.TargetId) {
          const Z = a.get(b.TargetId) ?? b.TargetId;
          c(this, l, qe).call(this, Z, w);
        }
      }
      c(this, l, O).call(this, t.Id, "innerEntryList");
    }), c(this, l, G).call(this, u);
  }
  /**** deserializeLinkInto — deserialize link from JSON into tree ****/
  deserializeLinkInto(e, t, r) {
    const s = e.Id ?? crypto.randomUUID(), a = c(this, l, Je).call(this, t.Id, r), i = _.obj({
      Kind: _.con("link"),
      outerPlacement: _.val(_.con({ outerItemId: t.Id, OrderKey: a })),
      Label: _.val(_.str(e.Label ?? "")),
      Info: _.obj(e.Info ?? {}),
      TargetId: _.con(e.TargetId)
    });
    return m(this, C).api.obj(["Entries"]).set({ [s]: i }), c(this, l, he).call(this, t.Id, s), c(this, l, qe).call(this, e.TargetId, s), c(this, l, O).call(this, t.Id, "innerEntryList"), c(this, l, O).call(this, s, "outerItem"), c(this, l, G).call(this, s);
  }
  /**** EntryMayBeMovedTo — check if entry can be moved to target ****/
  EntryMayBeMovedTo(e, t, r) {
    return this._mayMoveEntryTo(e.Id, t.Id, r);
  }
  /**** moveEntryTo — move entry to new location in tree ****/
  moveEntryTo(e, t, r) {
    if (_t.parse(r), !this._mayMoveEntryTo(e.Id, t.Id, r))
      throw new de("move-would-cycle", "cannot move an entry into one of its own descendants");
    const s = this._outerItemIdOf(e.Id), a = c(this, l, Je).call(this, t.Id, r);
    this.transact(() => {
      if (m(this, C).api.val(["Entries", e.Id, "outerPlacement"]).set(_.con({ outerItemId: t.Id, OrderKey: a })), s === z && t.Id !== z) {
        const i = c(this, l, E).call(this).Entries[e.Id], o = i == null ? void 0 : i.Info;
        o != null && "_trashedAt" in o && (m(this, C).api.obj(["Entries", e.Id, "Info"]).del(["_trashedAt"]), c(this, l, O).call(this, e.Id, "Info._trashedAt"));
      }
      s != null && (c(this, l, Oe).call(this, s, e.Id), c(this, l, O).call(this, s, "innerEntryList")), c(this, l, he).call(this, t.Id, e.Id), c(this, l, O).call(this, t.Id, "innerEntryList"), c(this, l, O).call(this, e.Id, "outerItem");
    });
  }
  /**** EntryMayBeDeleted — check if entry can be deleted ****/
  EntryMayBeDeleted(e) {
    return this._mayDeleteEntry(e.Id);
  }
  /**** deleteEntry — move entry to trash ****/
  deleteEntry(e) {
    if (!this._mayDeleteEntry(e.Id))
      throw new de("delete-not-permitted", "this entry cannot be deleted");
    const t = this._outerItemIdOf(e.Id), r = c(this, l, wt).call(this, z), s = lt(r, null);
    this.transact(() => {
      m(this, C).api.val(["Entries", e.Id, "outerPlacement"]).set(_.con({ outerItemId: z, OrderKey: s })), c(this, l, Qr).call(this, e.Id), m(this, C).api.obj(["Entries", e.Id, "Info"]).set({ _trashedAt: _.val(_.json(Date.now())) }), t != null && (c(this, l, Oe).call(this, t, e.Id), c(this, l, O).call(this, t, "innerEntryList")), c(this, l, he).call(this, z, e.Id), c(this, l, O).call(this, z, "innerEntryList"), c(this, l, O).call(this, e.Id, "outerItem"), c(this, l, O).call(this, e.Id, "Info._trashedAt");
    });
  }
  /**** purgeEntry — permanently delete entry from trash ****/
  purgeEntry(e) {
    if (this._outerItemIdOf(e.Id) !== z)
      throw new de("purge-not-in-trash", "only direct children of TrashItem can be purged");
    if (c(this, l, Yr).call(this, e.Id))
      throw new de("purge-protected", "entry is protected by incoming links and cannot be purged");
    this.transact(() => {
      c(this, l, Yt).call(this, e.Id);
    });
  }
  /**** purgeExpiredTrashEntries — delete trash entries older than TTL ****/
  purgeExpiredTrashEntries(e) {
    var o, u;
    const t = e ?? m(this, $e);
    if (t == null)
      return 0;
    const r = Date.now(), s = c(this, l, E).call(this), a = Array.from(m(this, ie).get(z) ?? /* @__PURE__ */ new Set());
    let i = 0;
    for (const d of a) {
      const f = s.Entries[d];
      if (f == null || ((o = f.outerPlacement) == null ? void 0 : o.outerItemId) !== z)
        continue;
      const w = (u = f.Info) == null ? void 0 : u._trashedAt;
      if (typeof w == "number" && !(r - w < t))
        try {
          this.purgeEntry(c(this, l, G).call(this, d)), i++;
        } catch {
        }
    }
    return i;
  }
  /**** dispose — clean up resources ****/
  dispose() {
    m(this, be) != null && (clearInterval(m(this, be)), pe(this, be, null)), m(this, ze).clear();
  }
  //----------------------------------------------------------------------------//
  //                             Change Tracking                                //
  //----------------------------------------------------------------------------//
  /**** transact — execute callback within transaction ****/
  transact(e) {
    const t = m(this, Ye) === 0;
    jt(this, Ye)._++;
    let r;
    try {
      r = e();
    } finally {
      if (jt(this, Ye)._--, t) {
        const s = m(this, C).api.flush();
        if (!m(this, De))
          try {
            const o = s.toBinary();
            o.byteLength > 0 && m(this, Ge).push(o);
          } catch {
          }
        const a = m(this, je), i = m(this, De) ? "external" : "internal";
        pe(this, je, {}), c(this, l, Xr).call(this, i, a);
      }
    }
    return r;
  }
  /**** onChangeInvoke — register change listener ****/
  onChangeInvoke(e) {
    return m(this, ze).add(e), () => {
      m(this, ze).delete(e);
    };
  }
  /**** applyRemotePatch — apply external patch to model ****/
  applyRemotePatch(e) {
    pe(this, De, !0);
    try {
      this.transact(() => {
        if (e instanceof Uint8Array)
          try {
            const t = c(this, l, Fr).call(this, e);
            for (const r of t) {
              const s = ar.fromBinary(r);
              m(this, C).applyPatch(s);
            }
          } catch {
            const t = ar.fromBinary(e);
            m(this, C).applyPatch(t);
          }
        else
          m(this, C).applyPatch(e);
        c(this, l, Hr).call(this);
      });
    } finally {
      pe(this, De, !1);
    }
    this.recoverOrphans();
  }
  /**** currentCursor — get current sync position ****/
  get currentCursor() {
    return c(this, l, Kr).call(this, m(this, Ge).length);
  }
  /**** exportPatch — export patches since given cursor ****/
  exportPatch(e) {
    const t = e != null ? c(this, l, Br).call(this, e) : 0, r = m(this, Ge).slice(t);
    return c(this, l, Ur).call(this, r);
  }
  /**** recoverOrphans — move orphaned entries to LostAndFound ****/
  recoverOrphans() {
    this.transact(() => {
      var t;
      const e = c(this, l, E).call(this).Entries;
      for (const [r, s] of Object.entries(e)) {
        const a = (t = s.outerPlacement) == null ? void 0 : t.outerItemId;
        if (a && a !== Pe && a !== z && a !== Ee && !e[a]) {
          const i = c(this, l, wt).call(this, Ee), o = lt(i, null);
          m(this, C).api.obj(["Entries", r, "outerPlacement"]).set(_.val(_.con({
            outerItemId: Ee,
            OrderKey: o
          }))), c(this, l, Oe).call(this, a, r), c(this, l, he).call(this, Ee, r), c(this, l, O).call(this, a, "innerEntryList"), c(this, l, O).call(this, Ee, "innerEntryList"), c(this, l, O).call(this, r, "outerItem");
        }
      }
    });
  }
  /**** asBinary — serialize store to gzipped binary ****/
  asBinary() {
    return kn(m(this, C).toBinary());
  }
  /**** asJSON — serialize store to base64-encoded binary ****/
  asJSON() {
    const e = this.asBinary(), t = globalThis.Buffer;
    if (t != null)
      return t.from(e).toString("base64");
    let r = "";
    for (let s = 0; s < e.byteLength; s++)
      r += String.fromCharCode(e[s]);
    return btoa(r);
  }
  //----------------------------------------------------------------------------//
  //                               Proxies                                      //
  //----------------------------------------------------------------------------//
  /**** get — proxy handler for property access ****/
  get(e, t) {
    return t === "Entries" ? new Proxy(c(this, l, E).call(this).Entries, {
      get: (r, s) => c(this, l, G).call(this, s),
      set: () => !1,
      deleteProperty: () => !1,
      ownKeys: () => Object.keys(c(this, l, E).call(this).Entries),
      getOwnPropertyDescriptor: (r, s) => {
        if (Object.keys(c(this, l, E).call(this).Entries).includes(String(s)))
          return {
            configurable: !0,
            enumerable: !0,
            value: c(this, l, G).call(this, String(s))
          };
      }
    }) : c(this, l, E).call(this)[t];
  }
  /**** set / deleteProperty / ownKeys / getOwnPropertyDescriptor — proxy traps ****/
  set() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  ownKeys() {
    return Object.keys(c(this, l, E).call(this));
  }
  getOwnPropertyDescriptor() {
    return {
      configurable: !0,
      enumerable: !0
    };
  }
  //----------------------------------------------------------------------------//
  //              Internal helpers — called by SDS_Entry / Data / Link           //
  //----------------------------------------------------------------------------//
  /**** _KindOf — get entry kind (data or link) ****/
  _KindOf(e) {
    const t = c(this, l, E).call(this).Entries[e];
    if (t == null)
      throw new de("not-found", `entry '${e}' not found`);
    return t.Kind;
  }
  /**** _LabelOf — get entry label ****/
  _LabelOf(e) {
    const t = c(this, l, E).call(this).Entries[e];
    return t == null ? "" : String(t.Label ?? "");
  }
  /**** _setLabelOf — set entry label ****/
  _setLabelOf(e, t) {
    rs.parse(t), this.transact(() => {
      c(this, l, E).call(this).Entries[e] != null && (m(this, C).api.obj(["Entries", e]).set({ Label: t }), c(this, l, O).call(this, e, "Label"));
    });
  }
  /**** _TypeOf — get entry MIME type ****/
  _TypeOf(e) {
    const t = c(this, l, E).call(this).Entries[e], r = (t == null ? void 0 : t.MIMEType) ?? "";
    return r === "" ? yt : r;
  }
  /**** _setTypeOf — set entry MIME type ****/
  _setTypeOf(e, t) {
    Sr.parse(t);
    const r = t === yt ? "" : t;
    this.transact(() => {
      m(this, C).api.obj(["Entries", e]).set({ MIMEType: r }), c(this, l, O).call(this, e, "Type");
    });
  }
  /**** _ValueKindOf — get value storage kind ****/
  _ValueKindOf(e) {
    const t = c(this, l, E).call(this).Entries[e];
    return (t == null ? void 0 : t.ValueKind) ?? "none";
  }
  /**** _isLiteralOf — check if entry value is literal text ****/
  _isLiteralOf(e) {
    const t = this._ValueKindOf(e);
    return t === "literal" || t === "literal-reference";
  }
  /**** _isBinaryOf — check if entry value is binary ****/
  _isBinaryOf(e) {
    const t = this._ValueKindOf(e);
    return t === "binary" || t === "binary-reference";
  }
  /**** _readValueOf — read entry value ****/
  async _readValueOf(e) {
    const t = this._ValueKindOf(e);
    switch (!0) {
      case t === "none":
        return;
      case t === "literal": {
        const r = c(this, l, E).call(this).Entries[e], s = r == null ? void 0 : r.literalValue;
        return String(s ?? "");
      }
      case t === "binary": {
        const r = c(this, l, E).call(this).Entries[e];
        return r == null ? void 0 : r.binaryValue;
      }
      default:
        throw new de("not-implemented", "large value fetching requires a ValueStore");
    }
  }
  /**** _writeValueOf — write entry value ****/
  _writeValueOf(e, t) {
    this.transact(() => {
      if (c(this, l, E).call(this).Entries[e] != null) {
        switch (!0) {
          case t == null: {
            m(this, C).api.obj(["Entries", e]).set({ ValueKind: _.val(_.str("none")) });
            break;
          }
          case (typeof t == "string" && t.length <= m(this, vt)): {
            m(this, C).api.obj(["Entries", e]).set({
              ValueKind: _.val(_.str("literal")),
              literalValue: t
            });
            break;
          }
          case typeof t == "string": {
            const a = new TextEncoder().encode(t), i = `sha256-size-${a.byteLength}`;
            m(this, C).api.obj(["Entries", e]).set({
              ValueKind: _.val(_.str("literal-reference")),
              ValueRef: { Hash: i, Size: a.byteLength }
            });
            break;
          }
          case t.byteLength <= nn: {
            m(this, C).api.obj(["Entries", e]).set({
              ValueKind: _.val(_.str("binary")),
              binaryValue: t
            });
            break;
          }
          default: {
            const s = t, a = `sha256-size-${s.byteLength}`;
            m(this, C).api.obj(["Entries", e]).set({
              ValueKind: _.val(_.str("binary-reference")),
              ValueRef: { Hash: a, Size: s.byteLength }
            });
            break;
          }
        }
        c(this, l, O).call(this, e, "Value");
      }
    });
  }
  /**** _spliceValueOf — modify literal value in-place ****/
  _spliceValueOf(e, t, r, s) {
    if (this._ValueKindOf(e) !== "literal")
      throw new de("change-value-not-literal", "changeValue only works on items with ValueKind literal");
    this.transact(() => {
      var u;
      const i = String(((u = c(this, l, E).call(this).Entries[e]) == null ? void 0 : u.literalValue) ?? ""), o = i.slice(0, t) + s + i.slice(t + r);
      this._writeValueOf(e, o);
    });
  }
  /**** _innerEntriesOf — get sorted inner entries ****/
  _innerEntriesOf(e) {
    return c(this, l, xt).call(this, e).map((t) => c(this, l, G).call(this, t.Id));
  }
  /**** _outerItemOf — get outer data ****/
  _outerItemOf(e) {
    const t = this._outerItemIdOf(e);
    return t ? c(this, l, G).call(this, t) : void 0;
  }
  /**** _outerItemIdOf — get outer data id ****/
  _outerItemIdOf(e) {
    var s;
    const t = c(this, l, E).call(this).Entries[e];
    return ((s = t == null ? void 0 : t.outerPlacement) == null ? void 0 : s.outerItemId) ?? null;
  }
  /**** _outerItemChainOf — get ancestor data chain ****/
  _outerItemChainOf(e) {
    const t = [];
    let r = this._outerItemIdOf(e);
    for (; r != null; )
      t.push(c(this, l, G).call(this, r)), r = this._outerItemIdOf(r);
    return t;
  }
  /**** _outerItemIdsOf — get ancestor data id chain ****/
  _outerItemIdsOf(e) {
    const t = [];
    let r = this._outerItemIdOf(e);
    for (; r != null; )
      t.push(r), r = this._outerItemIdOf(r);
    return t;
  }
  /**** _InfoProxyOf — get proxy for metadata access ****/
  _InfoProxyOf(e) {
    const t = this;
    return new Proxy({}, {
      get(r, s) {
        var i, o;
        if (typeof s != "string")
          return;
        const a = (o = c(i = t, l, E).call(i).Entries[e]) == null ? void 0 : o.Info;
        return a == null ? void 0 : a[s];
      },
      set(r, s, a) {
        return typeof s != "string" ? !1 : (t.transact(() => {
          var i;
          m(t, C).api.obj(["Entries", e, "Info"]).set({ [s]: a }), c(i = t, l, O).call(i, e, `Info.${s}`);
        }), !0);
      },
      deleteProperty(r, s) {
        return typeof s != "string" ? !1 : (t.transact(() => {
          var a;
          m(t, C).api.obj(["Entries", e, "Info"]).del([s]), c(a = t, l, O).call(a, e, `Info.${s}`);
        }), !0);
      },
      ownKeys() {
        var s, a;
        const r = (a = c(s = t, l, E).call(s).Entries[e]) == null ? void 0 : a.Info;
        return r != null ? Object.keys(r) : [];
      },
      getOwnPropertyDescriptor(r, s) {
        var i, o;
        if (typeof s != "string")
          return;
        const a = (o = c(i = t, l, E).call(i).Entries[e]) == null ? void 0 : o.Info;
        if (!(a == null || !(s in a)))
          return { configurable: !0, enumerable: !0, value: a[s] };
      },
      has(r, s) {
        var i, o;
        if (typeof s != "string")
          return !1;
        const a = (o = c(i = t, l, E).call(i).Entries[e]) == null ? void 0 : o.Info;
        return a != null && s in a;
      }
    });
  }
  /**** _TargetOf — get link target data ****/
  _TargetOf(e) {
    const t = c(this, l, E).call(this).Entries[e], r = t == null ? void 0 : t.TargetId;
    return r ? c(this, l, G).call(this, r) : void 0;
  }
  /**** _EntryAsJSON — serialize entry to JSON ****/
  _EntryAsJSON(e) {
    const t = c(this, l, E).call(this).Entries[e];
    if (t == null)
      throw new de("not-found", `entry '${e}' not found`);
    return {
      Id: e,
      Kind: t.Kind,
      Label: t.Label,
      Info: t.Info,
      ...t.Kind === "item" && {
        Type: this._TypeOf(e),
        ValueKind: this._ValueKindOf(e),
        literalValue: t.literalValue,
        binaryValue: t.binaryValue,
        ValueRef: t.ValueRef
      },
      ...t.Kind === "link" && {
        TargetId: t.TargetId
      },
      innerEntries: this._innerEntriesOf(e).map((r) => r.asJSON())
    };
  }
  /**** _mayMoveEntryTo — check if move is valid ****/
  _mayMoveEntryTo(e, t, r) {
    return !(e === Pe || (e === z || e === Ee) && t !== Pe || c(this, l, en).call(this, e, t));
  }
  /**** _mayDeleteEntry — check if entry can be deleted ****/
  _mayDeleteEntry(e) {
    return !(e === Pe || e === z || e === Ee);
  }
};
C = new WeakMap(), vt = new WeakMap(), $e = new WeakMap(), be = new WeakMap(), ze = new WeakMap(), ie = new WeakMap(), Ae = new WeakMap(), Re = new WeakMap(), ge = new WeakMap(), ye = new WeakMap(), St = new WeakMap(), Ye = new WeakMap(), je = new WeakMap(), Ge = new WeakMap(), De = new WeakMap(), l = new WeakSet(), /**** #encodeUint32 — encode 32-bit integer as bytes ****/
Kr = function(e) {
  const t = new Uint8Array(4);
  return new DataView(t.buffer).setUint32(0, e >>> 0, !1), t;
}, /**** #decodeUint32 — decode 32-bit integer from bytes ****/
Br = function(e) {
  return e.byteLength < 4 ? 0 : new DataView(e.buffer, e.byteOffset, 4).getUint32(0, !1);
}, /**** #encodePatchArray — encode array of patches ****/
Ur = function(e) {
  const t = 4 + e.reduce((i, o) => i + 4 + o.byteLength, 0), r = new Uint8Array(t), s = new DataView(r.buffer);
  s.setUint32(0, e.length, !1);
  let a = 4;
  for (const i of e)
    s.setUint32(a, i.byteLength, !1), a += 4, r.set(i, a), a += i.byteLength;
  return r;
}, /**** #decodePatchArray — decode array of patches ****/
Fr = function(e) {
  const t = new DataView(e.buffer, e.byteOffset, e.byteLength), r = t.getUint32(0, !1), s = [];
  let a = 4;
  for (let i = 0; i < r; i++) {
    const o = t.getUint32(a, !1);
    a += 4, s.push(e.slice(a, a + o)), a += o;
  }
  return s;
}, //----------------------------------------------------------------------------//
//                             Private Helpers                                //
//----------------------------------------------------------------------------//
/**** #view — get current model state view ****/
E = function() {
  return m(this, C).api.view();
}, /**** #wrap — wrap raw entry data in SDS_Entry object ****/
G = function(e) {
  const r = c(this, l, E).call(this).Entries[e];
  if (r == null)
    return null;
  const s = r.Kind;
  return s === "item" ? c(this, l, Wr).call(this, e) : s === "link" ? c(this, l, qr).call(this, e) : null;
}, /**** #wrapItem — wrap raw data data in SDS_Item object ****/
Wr = function(e) {
  const t = m(this, ye).get(e);
  if (t instanceof nr)
    return t;
  const r = new nr(this, e);
  return c(this, l, qt).call(this, e, r), r;
}, /**** #wrapLink — wrap raw link data in SDS_Link object ****/
qr = function(e) {
  const t = m(this, ye).get(e);
  if (t instanceof sr)
    return t;
  const r = new sr(this, e);
  return c(this, l, qt).call(this, e, r), r;
}, /**** #cacheWrapper — add wrapper to LRU cache ****/
qt = function(e, t) {
  if (m(this, ye).size >= m(this, St)) {
    const r = m(this, ye).keys().next().value;
    r != null && m(this, ye).delete(r);
  }
  m(this, ye).set(e, t);
}, /**** #rebuildIndices — rebuild all indices from scratch ****/
Jr = function() {
  var t;
  m(this, ie).clear(), m(this, Ae).clear(), m(this, Re).clear(), m(this, ge).clear();
  const e = c(this, l, E).call(this).Entries;
  for (const [r, s] of Object.entries(e)) {
    const a = (t = s.outerPlacement) == null ? void 0 : t.outerItemId;
    if (a && c(this, l, he).call(this, a, r), s.Kind === "link") {
      const i = s.TargetId;
      i && c(this, l, qe).call(this, i, r);
    }
  }
}, /**** #updateIndicesFromView — update indices after patch applied ****/
Hr = function() {
  var a;
  const e = /* @__PURE__ */ new Set(), t = c(this, l, E).call(this).Entries;
  for (const [i, o] of Object.entries(t)) {
    e.add(i);
    const u = (a = o.outerPlacement) == null ? void 0 : a.outerItemId, d = m(this, Ae).get(i);
    if (u !== d && (d != null && (c(this, l, Oe).call(this, d, i), c(this, l, O).call(this, d, "innerEntryList")), u != null && (c(this, l, he).call(this, u, i), c(this, l, O).call(this, u, "innerEntryList")), c(this, l, O).call(this, i, "outerItem")), o.Kind === "link") {
      const f = o.TargetId, p = m(this, ge).get(i);
      f !== p && (p != null && c(this, l, dt).call(this, p, i), f != null && c(this, l, qe).call(this, f, i));
    } else m(this, ge).has(i) && c(this, l, dt).call(this, m(this, ge).get(i), i);
    c(this, l, O).call(this, i, "Label");
  }
  const r = Array.from(m(this, Ae).entries()).filter(([i]) => !e.has(i));
  for (const [i, o] of r)
    c(this, l, Oe).call(this, o, i), c(this, l, O).call(this, o, "innerEntryList");
  const s = Array.from(m(this, ge).entries()).filter(([i]) => !e.has(i));
  for (const [i, o] of s)
    c(this, l, dt).call(this, o, i);
}, /**** #addToReverseIndex — add entry to outer-data index ****/
he = function(e, t) {
  let r = m(this, ie).get(e);
  r == null && (r = /* @__PURE__ */ new Set(), m(this, ie).set(e, r)), r.add(t), m(this, Ae).set(t, e);
}, /**** #removeFromReverseIndex — remove entry from outer-data index ****/
Oe = function(e, t) {
  var r;
  (r = m(this, ie).get(e)) == null || r.delete(t), m(this, Ae).delete(t);
}, /**** #addToLinkTargetIndex — add link to target index ****/
qe = function(e, t) {
  let r = m(this, Re).get(e);
  r == null && (r = /* @__PURE__ */ new Set(), m(this, Re).set(e, r)), r.add(t), m(this, ge).set(t, e);
}, /**** #removeFromLinkTargetIndex — remove link from target index ****/
dt = function(e, t) {
  var r;
  (r = m(this, Re).get(e)) == null || r.delete(t), m(this, ge).delete(t);
}, /**** #orderKeyAt — generate order key for insertion position ****/
Je = function(e, t) {
  const r = c(this, l, xt).call(this, e);
  if (r.length === 0 || t == null) {
    const o = r.length > 0 ? r[r.length - 1].OrderKey : null;
    return lt(o, null);
  }
  const s = Math.max(0, Math.min(t, r.length)), a = s > 0 ? r[s - 1].OrderKey : null, i = s < r.length ? r[s].OrderKey : null;
  return lt(a, i);
}, /**** #lastOrderKeyOf — get order key of last inner entry ****/
wt = function(e) {
  const t = c(this, l, xt).call(this, e);
  return t.length > 0 ? t[t.length - 1].OrderKey : null;
}, /**** #sortedInnerEntriesOf — get sorted inner entries ****/
xt = function(e) {
  var a, i;
  const t = m(this, ie).get(e) ?? /* @__PURE__ */ new Set(), r = [], s = c(this, l, E).call(this).Entries;
  for (const o of t) {
    const u = s[o];
    ((a = u.outerPlacement) == null ? void 0 : a.outerItemId) === e && r.push({
      Id: o,
      OrderKey: ((i = u.outerPlacement) == null ? void 0 : i.OrderKey) ?? ""
    });
  }
  return r.sort(
    (o, u) => o.OrderKey < u.OrderKey ? -1 : o.OrderKey > u.OrderKey ? 1 : o.Id < u.Id ? -1 : o.Id > u.Id ? 1 : 0
  ), r;
}, /**** #isProtected — check if entry is protected by incoming links ****/
Yr = function(e) {
  const t = c(this, l, Ht).call(this), r = /* @__PURE__ */ new Set();
  let s = !0;
  for (; s; ) {
    s = !1;
    for (const a of m(this, ie).get(z) ?? /* @__PURE__ */ new Set())
      r.has(a) || c(this, l, Jt).call(this, a, t, r) && (r.add(a), s = !0);
  }
  return r.has(e);
}, /**** #subtreeHasIncomingLinks — check for incoming links to subtree ****/
Jt = function(e, t, r) {
  const s = [e], a = /* @__PURE__ */ new Set();
  for (; s.length > 0; ) {
    const i = s.pop();
    if (a.has(i))
      continue;
    a.add(i);
    const o = m(this, Re).get(i) ?? /* @__PURE__ */ new Set();
    for (const u of o) {
      if (t.has(u))
        return !0;
      const d = c(this, l, Gr).call(this, u);
      if (d != null && r.has(d))
        return !0;
    }
    for (const u of m(this, ie).get(i) ?? /* @__PURE__ */ new Set())
      a.has(u) || s.push(u);
  }
  return !1;
}, /**** #directTrashInnerEntryContaining — find direct inner entry of TrashItem containing entry ****/
Gr = function(e) {
  let t = e;
  for (; t != null; ) {
    const r = this._outerItemIdOf(t);
    if (r === z)
      return t;
    if (r === Pe || r == null)
      return null;
    t = r;
  }
  return null;
}, /**** #reachableFromRoot — compute reachable entries from root ****/
Ht = function() {
  const e = /* @__PURE__ */ new Set(), t = [Pe];
  for (; t.length > 0; ) {
    const r = t.pop();
    if (!e.has(r)) {
      e.add(r);
      for (const s of m(this, ie).get(r) ?? /* @__PURE__ */ new Set())
        e.has(s) || t.push(s);
    }
  }
  return e;
}, /**** #purgeSubtree — recursively purge entry and children ****/
Yt = function(e) {
  var u;
  const t = c(this, l, E).call(this).Entries[e];
  if (t == null)
    return;
  const r = t.Kind, s = (u = t.outerPlacement) == null ? void 0 : u.outerItemId, a = c(this, l, Ht).call(this), i = /* @__PURE__ */ new Set(), o = Array.from(m(this, ie).get(e) ?? /* @__PURE__ */ new Set());
  for (const d of o)
    if (c(this, l, Jt).call(this, d, a, i)) {
      const f = lt(c(this, l, wt).call(this, z), null);
      m(this, C).api.obj(["Entries", d, "outerPlacement"]).set({
        outerItemId: z,
        OrderKey: f
      }), c(this, l, Oe).call(this, e, d), c(this, l, he).call(this, z, d), c(this, l, O).call(this, z, "innerEntryList"), c(this, l, O).call(this, d, "outerItem");
    } else
      c(this, l, Yt).call(this, d);
  if (m(this, C).api.obj(["Entries"]).del([e]), s && (c(this, l, Oe).call(this, s, e), c(this, l, O).call(this, s, "innerEntryList")), r === "link") {
    const d = t.TargetId;
    d && c(this, l, dt).call(this, d, e);
  }
  m(this, ye).delete(e);
}, /**** #requireItemExists — throw if data doesn't exist ****/
Gt = function(e) {
  const r = c(this, l, E).call(this).Entries[e];
  if (r == null || r.Kind !== "item")
    throw new de("invalid-argument", `item '${e}' does not exist`);
}, /**** #ensureInfoExists — create Info object if missing ****/
Qr = function(e) {
  const t = c(this, l, E).call(this).Entries[e];
  (t == null ? void 0 : t.Info) == null && m(this, C).api.obj(["Entries", e]).set({ Info: _.obj({}) });
}, /**** #removeInfoIfEmpty — delete Info object if empty ****/
ns = function(e) {
  const t = c(this, l, E).call(this).Entries[e], r = t == null ? void 0 : t.Info;
  r != null && Object.keys(r).length === 0 && m(this, C).api.obj(["Entries", e]).del(["Info"]);
}, /**** #recordChange — track property change ****/
O = function(e, t) {
  m(this, je)[e] == null && (m(this, je)[e] = /* @__PURE__ */ new Set()), m(this, je)[e].add(t);
}, /**** #notifyHandlers — invoke change listeners ****/
Xr = function(e, t) {
  if (Object.keys(t).length !== 0)
    for (const r of m(this, ze))
      try {
        r(e, t);
      } catch {
      }
}, /**** #wouldCreateCycle — check if move would create an outer-data cycle ****/
en = function(e, t) {
  let r = t;
  for (; r != null; ) {
    if (r === e)
      return !0;
    r = this._outerItemIdOf(r);
  }
  return !1;
};
let Or = tr;
export {
  Or as SDS_DataStore,
  ds as SDS_Entry,
  fs as SDS_Error,
  hs as SDS_Item,
  ms as SDS_Link
};
