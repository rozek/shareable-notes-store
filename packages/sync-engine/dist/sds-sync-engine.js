var se = Object.defineProperty;
var F = (h) => {
  throw TypeError(h);
};
var ie = (h, t, s) => t in h ? se(h, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : h[t] = s;
var G = (h, t, s) => ie(h, typeof t != "symbol" ? t + "" : t, s), A = (h, t, s) => t.has(h) || F("Cannot " + s);
var e = (h, t, s) => (A(h, t, "read from private field"), s ? s.call(h) : t.get(h)), r = (h, t, s) => t.has(h) ? F("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(h) : t.set(h, s), c = (h, t, s, i) => (A(h, t, "write to private field"), i ? i.call(h, s) : t.set(h, s), s), p = (h, t, s) => (A(h, t, "access private method"), s);
var J = (h, t, s, i) => ({
  set _(o) {
    c(h, t, o, s);
  },
  get _() {
    return e(h, t, i);
  }
});
import { SDS_Error as E } from "@rozek/sds-core";
const oe = 512 * 1024;
var l, d, a, H, D, I, N, x, L, M, w, T, B, b, k, g, C, S, _, R, m, y, n, K, W, X, Y, Z, Q, O, j, $, ee, z;
class ae {
  //----------------------------------------------------------------------------//
  //                                Constructor                                 //
  //----------------------------------------------------------------------------//
  constructor(t, s = {}) {
    r(this, n);
    r(this, l);
    r(this, d);
    r(this, a);
    r(this, H);
    r(this, D);
    G(this, "PeerId", crypto.randomUUID());
    r(this, I);
    r(this, N);
    r(this, x, []);
    // outgoing patch queue (patches created while disconnected)
    r(this, L, 0);
    // accumulated patch bytes since last checkpoint
    r(this, M, 0);
    // sequence number of the last saved snapshot
    r(this, w, 0);
    // current patch sequence # (append-monotonic counter, managed by SyncEngine)
    // CRDT cursor captured after the last processed local change;
    // passed to Store.exportPatch() to retrieve exactly that one change.
    // Initialised to an empty cursor; updated in #loadAndRestore and after
    // each local mutation.  Backend-agnostic: the DataStore owns the format.
    r(this, T, new Uint8Array(0));
    // heartbeat timer
    r(this, B);
    r(this, b);
    // presence peer tracking
    r(this, k, /* @__PURE__ */ new Map());
    r(this, g, /* @__PURE__ */ new Map());
    r(this, C, /* @__PURE__ */ new Set());
    // BroadcastChannel (optional, browser/tauri only)
    r(this, S);
    // connection state mirror
    r(this, _, "disconnected");
    r(this, R, /* @__PURE__ */ new Set());
    // unsubscribe functions for registered handlers
    r(this, m, []);
    // tracks entryId → blob hash for all entries whose value is in a *-reference kind;
    // used to call releaseValue() when the entry's value changes or the entry is purged
    r(this, y, /* @__PURE__ */ new Map());
    var o;
    c(this, l, t), c(this, d, s.PersistenceProvider ?? void 0), c(this, a, s.NetworkProvider ?? void 0), c(this, H, s.PresenceProvider ?? (typeof ((o = s.NetworkProvider) == null ? void 0 : o.onRemoteState) == "function" ? s.NetworkProvider : void 0)), c(this, D, s.PresenceTimeoutMs ?? 12e4), (s.BroadcastChannel ?? !0) && typeof BroadcastChannel < "u" && e(this, a) != null && c(this, S, new BroadcastChannel(`sds:${e(this, a).StoreId}`));
  }
  //----------------------------------------------------------------------------//
  //                                 Lifecycle                                  //
  //----------------------------------------------------------------------------//
  /**** start ****/
  async start() {
    if (e(this, d) != null) {
      const t = e(this, d);
      e(this, l).setValueBlobLoader((s) => t.loadValue(s));
    }
    await p(this, n, K).call(this), p(this, n, W).call(this), p(this, n, X).call(this), p(this, n, Y).call(this), p(this, n, Z).call(this), e(this, a) != null && e(this, a).onConnectionChange((t) => {
      c(this, _, t);
      for (const s of e(this, R))
        try {
          s(t);
        } catch (i) {
          console.error("[SDS] connection-change handler threw:", i.message ?? i);
        }
      t === "connected" && p(this, n, O).call(this);
    });
  }
  /**** stop ****/
  async stop() {
    var t, s, i;
    e(this, B) != null && (clearInterval(e(this, B)), c(this, B, void 0));
    for (const o of e(this, g).values())
      clearTimeout(o);
    e(this, g).clear();
    for (const o of e(this, m))
      try {
        o();
      } catch {
      }
    c(this, m, []), (t = e(this, S)) == null || t.close(), c(this, S, void 0), (s = e(this, a)) == null || s.disconnect(), e(this, d) != null && await p(this, n, Q).call(this), await ((i = e(this, d)) == null ? void 0 : i.close());
  }
  //----------------------------------------------------------------------------//
  //                             Network Connection                             //
  //----------------------------------------------------------------------------//
  /**** connectTo ****/
  async connectTo(t, s) {
    if (e(this, a) == null)
      throw new E("no-network-provider", "no NetworkProvider configured");
    c(this, I, t), c(this, N, s), await e(this, a).connect(t, s);
  }
  /**** disconnect ****/
  disconnect() {
    if (e(this, a) == null)
      throw new E("no-network-provider", "no NetworkProvider configured");
    e(this, a).disconnect();
  }
  /**** reconnect ****/
  async reconnect() {
    if (e(this, a) == null)
      throw new E("no-network-provider", "no NetworkProvider configured");
    if (e(this, I) == null)
      throw new E(
        "not-yet-connected",
        "connectTo() has not been called yet; cannot reconnect"
      );
    await e(this, a).connect(e(this, I), e(this, N));
  }
  /**** ConnectionState ****/
  get ConnectionState() {
    return e(this, _);
  }
  /**** onConnectionChange ****/
  onConnectionChange(t) {
    return e(this, R).add(t), () => {
      e(this, R).delete(t);
    };
  }
  //----------------------------------------------------------------------------//
  //                                  Presence                                  //
  //----------------------------------------------------------------------------//
  /**** setPresenceTo ****/
  setPresenceTo(t) {
    var i, o;
    c(this, b, t);
    const s = { ...t, PeerId: this.PeerId };
    (i = e(this, H)) == null || i.sendLocalState(t), (o = e(this, S)) == null || o.postMessage({ type: "presence", payload: s, senderId: this.PeerId });
    for (const u of e(this, C))
      try {
        u(this.PeerId, s, "local");
      } catch (f) {
        console.error("SDS: presence handler failed", f);
      }
  }
  /**** PeerSet (remote peers only) ****/
  get PeerSet() {
    return e(this, k);
  }
  /**** onPresenceChange ****/
  onPresenceChange(t) {
    return e(this, C).add(t), () => {
      e(this, C).delete(t);
    };
  }
}
l = new WeakMap(), d = new WeakMap(), a = new WeakMap(), H = new WeakMap(), D = new WeakMap(), I = new WeakMap(), N = new WeakMap(), x = new WeakMap(), L = new WeakMap(), M = new WeakMap(), w = new WeakMap(), T = new WeakMap(), B = new WeakMap(), b = new WeakMap(), k = new WeakMap(), g = new WeakMap(), C = new WeakMap(), S = new WeakMap(), _ = new WeakMap(), R = new WeakMap(), m = new WeakMap(), y = new WeakMap(), n = new WeakSet(), K = async function() {
  if (e(this, d) == null)
    return;
  await e(this, d).loadSnapshot();
  const t = await e(this, d).loadPatchesSince(e(this, M));
  for (const s of t)
    try {
      e(this, l).applyRemotePatch(s);
    } catch {
    }
  t.length > 0 && c(this, w, e(this, M) + t.length), c(this, T, e(this, l).currentCursor);
}, //----------------------------------------------------------------------------//
//                                   Wiring                                   //
//----------------------------------------------------------------------------//
/**** #wireStoreToProviders — subscribes to local store changes and routes them to persistence and network ****/
W = function() {
  const t = e(this, l).onChangeInvoke((s, i) => {
    var f, q;
    if (s === "external") {
      p(this, n, j).call(this, i, "request").catch((v) => {
        console.error("[SDS] value-request failed:", v.message ?? v);
      });
      return;
    }
    const o = e(this, T);
    J(this, w)._++;
    const u = e(this, l).exportPatch(o);
    c(this, T, e(this, l).currentCursor), u.byteLength !== 0 && (e(this, d) != null && (e(this, d).appendPatch(u, e(this, w)).catch((v) => {
      console.error("[SDS] appendPatch failed:", v.message ?? v);
    }), c(this, L, e(this, L) + u.byteLength), e(this, L) >= oe && p(this, n, Q).call(this).catch((v) => {
      console.error("[SDS] checkpoint failed:", v.message ?? v);
    })), ((f = e(this, a)) == null ? void 0 : f.ConnectionState) === "connected" ? (e(this, a).sendPatch(u), (q = e(this, S)) == null || q.postMessage({ type: "patch", payload: u, senderId: this.PeerId })) : e(this, x).push(u), p(this, n, j).call(this, i, "send").catch((v) => {
      console.error("[SDS] value-send failed:", v.message ?? v);
    }));
  });
  e(this, m).push(t);
}, /**** #wireNetworkToStore — subscribes to incoming network patches and presence events ****/
X = function() {
  if (e(this, a) != null) {
    const s = e(this, a).onPatch((o) => {
      try {
        e(this, l).applyRemotePatch(o);
      } catch {
      }
    });
    e(this, m).push(s);
    const i = e(this, a).onValue(async (o, u) => {
      var f;
      e(this, l).storeValueBlob(o, u), await ((f = e(this, d)) == null ? void 0 : f.saveValue(o, u));
    });
    e(this, m).push(i);
  }
  const t = e(this, H);
  if (t != null) {
    const s = t.onRemoteState((i, o) => {
      p(this, n, $).call(this, i, o);
    });
    e(this, m).push(s);
  }
}, /**** #wirePresenceHeartbeat — starts a periodic timer to re-broadcast local presence state ****/
Y = function() {
  const t = e(this, D) / 4;
  c(this, B, setInterval(() => {
    var s, i;
    if (e(this, b) != null) {
      (s = e(this, H)) == null || s.sendLocalState(e(this, b));
      const o = { ...e(this, b), PeerId: this.PeerId };
      (i = e(this, S)) == null || i.postMessage({ type: "presence", payload: o, senderId: this.PeerId });
    }
  }, t));
}, /**** #wireBroadcastChannel — wires the BroadcastChannel for cross-tab patch and presence relay ****/
Z = function() {
  e(this, S) != null && (e(this, S).onmessage = (t) => {
    const s = t.data;
    if (s.senderId !== this.PeerId)
      switch (!0) {
        case s.type === "patch":
          try {
            e(this, l).applyRemotePatch(s.payload);
          } catch (i) {
            console.error("[SDS] failed to apply BC patch:", i.message ?? i);
          }
          break;
        case s.type === "presence":
          p(this, n, $).call(this, s.payload.PeerId ?? s.senderId ?? "unknown", s.payload);
          break;
      }
  });
}, Q = async function() {
  if (e(this, d) == null)
    return;
  const t = await e(this, d).loadPatchesSince(e(this, w));
  for (const s of t)
    try {
      e(this, l).applyRemotePatch(s);
    } catch {
    }
  t.length > 0 && (c(this, w, e(this, w) + t.length), c(this, T, e(this, l).currentCursor)), await e(this, d).saveSnapshot(e(this, l).asBinary(), e(this, w)), e(this, a) != null && (await e(this, d).prunePatches(e(this, w)), c(this, M, e(this, w))), c(this, L, 0);
}, //----------------------------------------------------------------------------//
//                            Offline Queue Flush                             //
//----------------------------------------------------------------------------//
/**** #flushOfflineQueue — sends all queued offline patches to the network ****/
O = function() {
  var s;
  const t = e(this, x).splice(0);
  for (const i of t)
    try {
      (s = e(this, a)) == null || s.sendPatch(i);
    } catch (o) {
      console.error("SDS: failed to send queued patch", o);
    }
}, j = async function(t, s) {
  var i, o, u;
  for (const [f, q] of Object.entries(t)) {
    const v = q;
    if (v.has("Existence")) {
      const V = e(this, y).get(f);
      V != null && (await ((i = e(this, d)) == null ? void 0 : i.releaseValue(V)), e(this, y).delete(f));
    }
    if (!v.has("Value"))
      continue;
    const U = e(this, y).get(f), P = e(this, l)._getValueRefOf(f), te = P == null ? void 0 : P.Hash;
    if (U != null && U !== te && (await ((o = e(this, d)) == null ? void 0 : o.releaseValue(U)), e(this, y).delete(f)), P != null) {
      if (e(this, a) == null) {
        e(this, y).set(f, P.Hash);
        continue;
      }
      if (s === "send") {
        const V = e(this, l).getValueBlobByHash(P.Hash);
        V != null && (await ((u = e(this, d)) == null ? void 0 : u.saveValue(P.Hash, V)), e(this, y).set(f, P.Hash), e(this, a).ConnectionState === "connected" && e(this, a).sendValue(P.Hash, V));
      } else
        e(this, y).set(f, P.Hash), !e(this, l).hasValueBlob(P.Hash) && e(this, a).ConnectionState === "connected" && e(this, a).requestValue(P.Hash);
    }
  }
}, //----------------------------------------------------------------------------//
//                              Remote Presence                               //
//----------------------------------------------------------------------------//
/**** #handleRemotePresence — updates the peer set and notifies handlers when a presence update arrives ****/
$ = function(t, s) {
  if (s == null) {
    p(this, n, z).call(this, t);
    return;
  }
  const i = { ...s, _lastSeen: Date.now() };
  e(this, k).set(t, i), p(this, n, ee).call(this, t);
  for (const o of e(this, C))
    try {
      o(t, s, "remote");
    } catch (u) {
      console.error("SDS: presence handler failed", u);
    }
}, /**** #resetPeerTimeout — arms a timeout to remove a peer if no heartbeat arrives within PresenceTimeoutMs ****/
ee = function(t) {
  const s = e(this, g).get(t);
  s != null && clearTimeout(s);
  const i = setTimeout(
    () => {
      p(this, n, z).call(this, t);
    },
    e(this, D)
  );
  e(this, g).set(t, i);
}, /**** #removePeer — removes a peer from the peer set and notifies presence change handlers ****/
z = function(t) {
  if (!e(this, k).has(t))
    return;
  e(this, k).delete(t);
  const s = e(this, g).get(t);
  s != null && (clearTimeout(s), e(this, g).delete(t));
  for (const i of e(this, C))
    try {
      i(t, void 0, "remote");
    } catch (o) {
      console.error("SDS: presence handler failed", o);
    }
};
export {
  ae as SDS_SyncEngine
};
