import { jsxs as Ea, jsx as Xe } from "react/jsx-runtime";
import br, { createContext as zs, forwardRef as Hs, useRef as Mt, useEffect as ds, useState as Lt, useLayoutEffect as Ws, useCallback as ps, useMemo as Fs } from "react";
import { createPortal as $s } from "react-dom";
function Ns(I) {
  return I && I.__esModule && Object.prototype.hasOwnProperty.call(I, "default") ? I.default : I;
}
var Co = {};
/**
 * @license React
 * react-dom-server-legacy.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vs;
function Vs() {
  if (vs) return Co;
  vs = 1;
  var I = br;
  function b(a) {
    for (var u = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, h = 1; h < arguments.length; h++) u += "&args[]=" + encodeURIComponent(arguments[h]);
    return "Minified React error #" + a + "; visit " + u + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var R = Object.prototype.hasOwnProperty, L = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, f = {}, _ = {};
  function $(a) {
    return R.call(_, a) ? !0 : R.call(f, a) ? !1 : L.test(a) ? _[a] = !0 : (f[a] = !0, !1);
  }
  function W(a, u, h, m, C, x, F) {
    this.acceptsBooleans = u === 2 || u === 3 || u === 4, this.attributeName = m, this.attributeNamespace = C, this.mustUseProperty = h, this.propertyName = a, this.type = u, this.sanitizeURL = x, this.removeEmptyString = F;
  }
  var y = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    y[a] = new W(a, 0, !1, a, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var u = a[0];
    y[u] = new W(u, 1, !1, a[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    y[a] = new W(a, 2, !1, a.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    y[a] = new W(a, 2, !1, a, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    y[a] = new W(a, 3, !1, a.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    y[a] = new W(a, 3, !0, a, null, !1, !1);
  }), ["capture", "download"].forEach(function(a) {
    y[a] = new W(a, 4, !1, a, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(a) {
    y[a] = new W(a, 6, !1, a, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(a) {
    y[a] = new W(a, 5, !1, a.toLowerCase(), null, !1, !1);
  });
  var w = /[\-:]([a-z])/g;
  function X(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var u = a.replace(
      w,
      X
    );
    y[u] = new W(u, 1, !1, a, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var u = a.replace(w, X);
    y[u] = new W(u, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var u = a.replace(w, X);
    y[u] = new W(u, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(a) {
    y[a] = new W(a, 1, !1, a.toLowerCase(), null, !1, !1);
  }), y.xlinkHref = new W("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(a) {
    y[a] = new W(a, 1, !1, a.toLowerCase(), null, !0, !0);
  });
  var A = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Y = ["Webkit", "ms", "Moz", "O"];
  Object.keys(A).forEach(function(a) {
    Y.forEach(function(u) {
      u = u + a.charAt(0).toUpperCase() + a.substring(1), A[u] = A[a];
    });
  });
  var se = /["'&<>]/;
  function G(a) {
    if (typeof a == "boolean" || typeof a == "number") return "" + a;
    a = "" + a;
    var u = se.exec(a);
    if (u) {
      var h = "", m, C = 0;
      for (m = u.index; m < a.length; m++) {
        switch (a.charCodeAt(m)) {
          case 34:
            u = "&quot;";
            break;
          case 38:
            u = "&amp;";
            break;
          case 39:
            u = "&#x27;";
            break;
          case 60:
            u = "&lt;";
            break;
          case 62:
            u = "&gt;";
            break;
          default:
            continue;
        }
        C !== m && (h += a.substring(C, m)), C = m + 1, h += u;
      }
      a = C !== m ? h + a.substring(C, m) : h;
    }
    return a;
  }
  var ce = /([A-Z])/g, P = /^ms-/, S = Array.isArray;
  function K(a, u) {
    return { insertionMode: a, selectedValue: u };
  }
  function J(a, u, h) {
    switch (u) {
      case "select":
        return K(1, h.value != null ? h.value : h.defaultValue);
      case "svg":
        return K(2, null);
      case "math":
        return K(3, null);
      case "foreignObject":
        return K(1, null);
      case "table":
        return K(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return K(5, null);
      case "colgroup":
        return K(7, null);
      case "tr":
        return K(6, null);
    }
    return 4 <= a.insertionMode || a.insertionMode === 0 ? K(1, null) : a;
  }
  var re = /* @__PURE__ */ new Map();
  function M(a, u, h) {
    if (typeof h != "object") throw Error(b(62));
    u = !0;
    for (var m in h) if (R.call(h, m)) {
      var C = h[m];
      if (C != null && typeof C != "boolean" && C !== "") {
        if (m.indexOf("--") === 0) {
          var x = G(m);
          C = G(("" + C).trim());
        } else {
          x = m;
          var F = re.get(x);
          F !== void 0 || (F = G(x.replace(ce, "-$1").toLowerCase().replace(P, "-ms-")), re.set(x, F)), x = F, C = typeof C == "number" ? C === 0 || R.call(A, m) ? "" + C : C + "px" : G(("" + C).trim());
        }
        u ? (u = !1, a.push(' style="', x, ":", C)) : a.push(";", x, ":", C);
      }
    }
    u || a.push('"');
  }
  function le(a, u, h, m) {
    switch (h) {
      case "style":
        M(a, u, m);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < h.length) || h[0] !== "o" && h[0] !== "O" || h[1] !== "n" && h[1] !== "N") {
      if (u = y.hasOwnProperty(h) ? y[h] : null, u !== null) {
        switch (typeof m) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!u.acceptsBooleans) return;
        }
        switch (h = u.attributeName, u.type) {
          case 3:
            m && a.push(" ", h, '=""');
            break;
          case 4:
            m === !0 ? a.push(" ", h, '=""') : m !== !1 && a.push(" ", h, '="', G(m), '"');
            break;
          case 5:
            isNaN(m) || a.push(" ", h, '="', G(m), '"');
            break;
          case 6:
            !isNaN(m) && 1 <= m && a.push(" ", h, '="', G(m), '"');
            break;
          default:
            u.sanitizeURL && (m = "" + m), a.push(" ", h, '="', G(m), '"');
        }
      } else if ($(h)) {
        switch (typeof m) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (u = h.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") return;
        }
        a.push(" ", h, '="', G(m), '"');
      }
    }
  }
  function ne(a, u, h) {
    if (u != null) {
      if (h != null) throw Error(b(60));
      if (typeof u != "object" || !("__html" in u)) throw Error(b(61));
      u = u.__html, u != null && a.push("" + u);
    }
  }
  function Ae(a) {
    var u = "";
    return I.Children.forEach(a, function(h) {
      h != null && (u += h);
    }), u;
  }
  function fe(a, u, h, m) {
    a.push(Se(h));
    var C = h = null, x;
    for (x in u) if (R.call(u, x)) {
      var F = u[x];
      if (F != null) switch (x) {
        case "children":
          h = F;
          break;
        case "dangerouslySetInnerHTML":
          C = F;
          break;
        default:
          le(a, m, x, F);
      }
    }
    return a.push(">"), ne(a, C, h), typeof h == "string" ? (a.push(G(h)), null) : h;
  }
  var we = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Pe = /* @__PURE__ */ new Map();
  function Se(a) {
    var u = Pe.get(a);
    if (u === void 0) {
      if (!we.test(a)) throw Error(b(65, a));
      u = "<" + a, Pe.set(a, u);
    }
    return u;
  }
  function Fe(a, u, h, m, C) {
    switch (u) {
      case "select":
        a.push(Se("select"));
        var x = null, F = null;
        for (ee in h) if (R.call(h, ee)) {
          var j = h[ee];
          if (j != null) switch (ee) {
            case "children":
              x = j;
              break;
            case "dangerouslySetInnerHTML":
              F = j;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              le(a, m, ee, j);
          }
        }
        return a.push(">"), ne(a, F, x), x;
      case "option":
        F = C.selectedValue, a.push(Se("option"));
        var q = j = null, ae = null, ee = null;
        for (x in h) if (R.call(h, x)) {
          var xe = h[x];
          if (xe != null) switch (x) {
            case "children":
              j = xe;
              break;
            case "selected":
              ae = xe;
              break;
            case "dangerouslySetInnerHTML":
              ee = xe;
              break;
            case "value":
              q = xe;
            default:
              le(a, m, x, xe);
          }
        }
        if (F != null) if (h = q !== null ? "" + q : Ae(j), S(F)) {
          for (m = 0; m < F.length; m++)
            if ("" + F[m] === h) {
              a.push(' selected=""');
              break;
            }
        } else "" + F === h && a.push(' selected=""');
        else ae && a.push(' selected=""');
        return a.push(">"), ne(a, ee, j), j;
      case "textarea":
        a.push(Se("textarea")), ee = F = x = null;
        for (j in h) if (R.call(h, j) && (q = h[j], q != null)) switch (j) {
          case "children":
            ee = q;
            break;
          case "value":
            x = q;
            break;
          case "defaultValue":
            F = q;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(b(91));
          default:
            le(
              a,
              m,
              j,
              q
            );
        }
        if (x === null && F !== null && (x = F), a.push(">"), ee != null) {
          if (x != null) throw Error(b(92));
          if (S(ee) && 1 < ee.length) throw Error(b(93));
          x = "" + ee;
        }
        return typeof x == "string" && x[0] === `
` && a.push(`
`), x !== null && a.push(G("" + x)), null;
      case "input":
        a.push(Se("input")), q = ee = j = x = null;
        for (F in h) if (R.call(h, F) && (ae = h[F], ae != null)) switch (F) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(b(399, "input"));
          case "defaultChecked":
            q = ae;
            break;
          case "defaultValue":
            j = ae;
            break;
          case "checked":
            ee = ae;
            break;
          case "value":
            x = ae;
            break;
          default:
            le(a, m, F, ae);
        }
        return ee !== null ? le(a, m, "checked", ee) : q !== null && le(a, m, "checked", q), x !== null ? le(a, m, "value", x) : j !== null && le(a, m, "value", j), a.push("/>"), null;
      case "menuitem":
        a.push(Se("menuitem"));
        for (var rt in h) if (R.call(h, rt) && (x = h[rt], x != null)) switch (rt) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(b(400));
          default:
            le(a, m, rt, x);
        }
        return a.push(">"), null;
      case "title":
        a.push(Se("title")), x = null;
        for (xe in h) if (R.call(h, xe) && (F = h[xe], F != null)) switch (xe) {
          case "children":
            x = F;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(b(434));
          default:
            le(a, m, xe, F);
        }
        return a.push(">"), x;
      case "listing":
      case "pre":
        a.push(Se(u)), F = x = null;
        for (q in h) if (R.call(h, q) && (j = h[q], j != null)) switch (q) {
          case "children":
            x = j;
            break;
          case "dangerouslySetInnerHTML":
            F = j;
            break;
          default:
            le(a, m, q, j);
        }
        if (a.push(">"), F != null) {
          if (x != null) throw Error(b(60));
          if (typeof F != "object" || !("__html" in F)) throw Error(b(61));
          h = F.__html, h != null && (typeof h == "string" && 0 < h.length && h[0] === `
` ? a.push(`
`, h) : a.push("" + h));
        }
        return typeof x == "string" && x[0] === `
` && a.push(`
`), x;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        a.push(Se(u));
        for (var nt in h) if (R.call(h, nt) && (x = h[nt], x != null)) switch (nt) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(b(399, u));
          default:
            le(a, m, nt, x);
        }
        return a.push("/>"), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return fe(
          a,
          h,
          u,
          m
        );
      case "html":
        return C.insertionMode === 0 && a.push("<!DOCTYPE html>"), fe(a, h, u, m);
      default:
        if (u.indexOf("-") === -1 && typeof h.is != "string") return fe(a, h, u, m);
        a.push(Se(u)), F = x = null;
        for (ae in h) if (R.call(h, ae) && (j = h[ae], j != null)) switch (ae) {
          case "children":
            x = j;
            break;
          case "dangerouslySetInnerHTML":
            F = j;
            break;
          case "style":
            M(a, m, j);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            break;
          default:
            $(ae) && typeof j != "function" && typeof j != "symbol" && a.push(" ", ae, '="', G(j), '"');
        }
        return a.push(">"), ne(a, F, x), x;
    }
  }
  function Le(a, u, h) {
    if (a.push('<!--$?--><template id="'), h === null) throw Error(b(395));
    return a.push(h), a.push('"></template>');
  }
  function We(a, u, h, m) {
    switch (h.insertionMode) {
      case 0:
      case 1:
        return a.push('<div hidden id="'), a.push(u.segmentPrefix), u = m.toString(16), a.push(u), a.push('">');
      case 2:
        return a.push('<svg aria-hidden="true" style="display:none" id="'), a.push(u.segmentPrefix), u = m.toString(16), a.push(u), a.push('">');
      case 3:
        return a.push('<math aria-hidden="true" style="display:none" id="'), a.push(u.segmentPrefix), u = m.toString(16), a.push(u), a.push('">');
      case 4:
        return a.push('<table hidden id="'), a.push(u.segmentPrefix), u = m.toString(16), a.push(u), a.push('">');
      case 5:
        return a.push('<table hidden><tbody id="'), a.push(u.segmentPrefix), u = m.toString(16), a.push(u), a.push('">');
      case 6:
        return a.push('<table hidden><tr id="'), a.push(u.segmentPrefix), u = m.toString(16), a.push(u), a.push('">');
      case 7:
        return a.push('<table hidden><colgroup id="'), a.push(u.segmentPrefix), u = m.toString(16), a.push(u), a.push('">');
      default:
        throw Error(b(397));
    }
  }
  function be(a, u) {
    switch (u.insertionMode) {
      case 0:
      case 1:
        return a.push("</div>");
      case 2:
        return a.push("</svg>");
      case 3:
        return a.push("</math>");
      case 4:
        return a.push("</table>");
      case 5:
        return a.push("</tbody></table>");
      case 6:
        return a.push("</tr></table>");
      case 7:
        return a.push("</colgroup></table>");
      default:
        throw Error(b(397));
    }
  }
  var Ie = /[<\u2028\u2029]/g;
  function je(a) {
    return JSON.stringify(a).replace(Ie, function(u) {
      switch (u) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  function ze(a, u) {
    return u = u === void 0 ? "" : u, { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: u + "P:", segmentPrefix: u + "S:", boundaryPrefix: u + "B:", idPrefix: u, nextSuspenseID: 0, sentCompleteSegmentFunction: !1, sentCompleteBoundaryFunction: !1, sentClientRenderFunction: !1, generateStaticMarkup: a };
  }
  function U(a, u, h, m) {
    return h.generateStaticMarkup ? (a.push(G(u)), !1) : (u === "" ? a = m : (m && a.push("<!-- -->"), a.push(G(u)), a = !0), a);
  }
  var H = Object.assign, Q = Symbol.for("react.element"), pe = Symbol.for("react.portal"), oe = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), Z = Symbol.for("react.profiler"), de = Symbol.for("react.provider"), ge = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), Te = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), Ee = Symbol.for("react.lazy"), $e = Symbol.for("react.scope"), Bt = Symbol.for("react.debug_trace_mode"), ar = Symbol.for("react.legacy_hidden"), cn = Symbol.for("react.default_value"), pt = Symbol.iterator;
  function ir(a) {
    if (a == null) return null;
    if (typeof a == "function") return a.displayName || a.name || null;
    if (typeof a == "string") return a;
    switch (a) {
      case oe:
        return "Fragment";
      case pe:
        return "Portal";
      case Z:
        return "Profiler";
      case te:
        return "StrictMode";
      case ve:
        return "Suspense";
      case Te:
        return "SuspenseList";
    }
    if (typeof a == "object") switch (a.$$typeof) {
      case ge:
        return (a.displayName || "Context") + ".Consumer";
      case de:
        return (a._context.displayName || "Context") + ".Provider";
      case he:
        var u = a.render;
        return a = a.displayName, a || (a = u.displayName || u.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
      case N:
        return u = a.displayName || null, u !== null ? u : ir(a.type) || "Memo";
      case Ee:
        u = a._payload, a = a._init;
        try {
          return ir(a(u));
        } catch {
        }
    }
    return null;
  }
  var lr = {};
  function fn(a, u) {
    if (a = a.contextTypes, !a) return lr;
    var h = {}, m;
    for (m in a) h[m] = u[m];
    return h;
  }
  var ht = null;
  function Qe(a, u) {
    if (a !== u) {
      a.context._currentValue2 = a.parentValue, a = a.parent;
      var h = u.parent;
      if (a === null) {
        if (h !== null) throw Error(b(401));
      } else {
        if (h === null) throw Error(b(401));
        Qe(a, h);
      }
      u.context._currentValue2 = u.value;
    }
  }
  function Ge(a) {
    a.context._currentValue2 = a.parentValue, a = a.parent, a !== null && Ge(a);
  }
  function Br(a) {
    var u = a.parent;
    u !== null && Br(u), a.context._currentValue2 = a.value;
  }
  function Ur(a, u) {
    if (a.context._currentValue2 = a.parentValue, a = a.parent, a === null) throw Error(b(402));
    a.depth === u.depth ? Qe(a, u) : Ur(a, u);
  }
  function jr(a, u) {
    var h = u.parent;
    if (h === null) throw Error(b(402));
    a.depth === h.depth ? Qe(a, h) : jr(a, h), u.context._currentValue2 = u.value;
  }
  function Ne(a) {
    var u = ht;
    u !== a && (u === null ? Br(a) : a === null ? Ge(u) : u.depth === a.depth ? Qe(u, a) : u.depth > a.depth ? Ur(u, a) : jr(u, a), ht = a);
  }
  var zr = { isMounted: function() {
    return !1;
  }, enqueueSetState: function(a, u) {
    a = a._reactInternals, a.queue !== null && a.queue.push(u);
  }, enqueueReplaceState: function(a, u) {
    a = a._reactInternals, a.replace = !0, a.queue = [u];
  }, enqueueForceUpdate: function() {
  } };
  function dn(a, u, h, m) {
    var C = a.state !== void 0 ? a.state : null;
    a.updater = zr, a.props = h, a.state = C;
    var x = { queue: [], replace: !1 };
    a._reactInternals = x;
    var F = u.contextType;
    if (a.context = typeof F == "object" && F !== null ? F._currentValue2 : m, F = u.getDerivedStateFromProps, typeof F == "function" && (F = F(h, C), C = F == null ? C : H({}, C, F), a.state = C), typeof u.getDerivedStateFromProps != "function" && typeof a.getSnapshotBeforeUpdate != "function" && (typeof a.UNSAFE_componentWillMount == "function" || typeof a.componentWillMount == "function")) if (u = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), u !== a.state && zr.enqueueReplaceState(a, a.state, null), x.queue !== null && 0 < x.queue.length) if (u = x.queue, F = x.replace, x.queue = null, x.replace = !1, F && u.length === 1) a.state = u[0];
    else {
      for (x = F ? u[0] : a.state, C = !0, F = F ? 1 : 0; F < u.length; F++) {
        var j = u[F];
        j = typeof j == "function" ? j.call(a, x, h, m) : j, j != null && (C ? (C = !1, x = H({}, x, j)) : H(x, j));
      }
      a.state = x;
    }
    else x.queue = null;
  }
  var pn = { id: 1, overflow: "" };
  function Hr(a, u, h) {
    var m = a.id;
    a = a.overflow;
    var C = 32 - wr(m) - 1;
    m &= ~(1 << C), h += 1;
    var x = 32 - wr(u) + C;
    if (30 < x) {
      var F = C - C % 5;
      return x = (m & (1 << F) - 1).toString(32), m >>= F, C -= F, { id: 1 << 32 - wr(u) + C | h << C | m, overflow: x + a };
    }
    return { id: 1 << x | h << C | m, overflow: a };
  }
  var wr = Math.clz32 ? Math.clz32 : Nt, $n = Math.log, Wr = Math.LN2;
  function Nt(a) {
    return a >>>= 0, a === 0 ? 32 : 31 - ($n(a) / Wr | 0) | 0;
  }
  function $r(a, u) {
    return a === u && (a !== 0 || 1 / a === 1 / u) || a !== a && u !== u;
  }
  var hn = typeof Object.is == "function" ? Object.is : $r, qe = null, Tt = null, Vt = null, Re = null, Yt = !1, xr = !1, sr = 0, Ct = null, kr = 0;
  function Ut() {
    if (qe === null) throw Error(b(321));
    return qe;
  }
  function Ze() {
    if (0 < kr) throw Error(b(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Nr() {
    return Re === null ? Vt === null ? (Yt = !1, Vt = Re = Ze()) : (Yt = !0, Re = Vt) : Re.next === null ? (Yt = !1, Re = Re.next = Ze()) : (Yt = !0, Re = Re.next), Re;
  }
  function Vr() {
    Tt = qe = null, xr = !1, Vt = null, kr = 0, Re = Ct = null;
  }
  function vn(a, u) {
    return typeof u == "function" ? u(a) : u;
  }
  function Ve(a, u, h) {
    if (qe = Ut(), Re = Nr(), Yt) {
      var m = Re.queue;
      if (u = m.dispatch, Ct !== null && (h = Ct.get(m), h !== void 0)) {
        Ct.delete(m), m = Re.memoizedState;
        do
          m = a(m, h.action), h = h.next;
        while (h !== null);
        return Re.memoizedState = m, [m, u];
      }
      return [Re.memoizedState, u];
    }
    return a = a === vn ? typeof u == "function" ? u() : u : h !== void 0 ? h(u) : u, Re.memoizedState = a, a = Re.queue = { last: null, dispatch: null }, a = a.dispatch = Nn.bind(null, qe, a), [Re.memoizedState, a];
  }
  function Yr(a, u) {
    if (qe = Ut(), Re = Nr(), u = u === void 0 ? null : u, Re !== null) {
      var h = Re.memoizedState;
      if (h !== null && u !== null) {
        var m = h[1];
        e: if (m === null) m = !1;
        else {
          for (var C = 0; C < m.length && C < u.length; C++) if (!hn(u[C], m[C])) {
            m = !1;
            break e;
          }
          m = !0;
        }
        if (m) return h[0];
      }
    }
    return a = a(), Re.memoizedState = [a, u], a;
  }
  function Nn(a, u, h) {
    if (25 <= kr) throw Error(b(301));
    if (a === qe) if (xr = !0, a = { action: h, next: null }, Ct === null && (Ct = /* @__PURE__ */ new Map()), h = Ct.get(u), h === void 0) Ct.set(u, a);
    else {
      for (u = h; u.next !== null; ) u = u.next;
      u.next = a;
    }
  }
  function Vn() {
    throw Error(b(394));
  }
  function Et() {
  }
  var Gr = { readContext: function(a) {
    return a._currentValue2;
  }, useContext: function(a) {
    return Ut(), a._currentValue2;
  }, useMemo: Yr, useReducer: Ve, useRef: function(a) {
    qe = Ut(), Re = Nr();
    var u = Re.memoizedState;
    return u === null ? (a = { current: a }, Re.memoizedState = a) : u;
  }, useState: function(a) {
    return Ve(vn, a);
  }, useInsertionEffect: Et, useLayoutEffect: function() {
  }, useCallback: function(a, u) {
    return Yr(function() {
      return a;
    }, u);
  }, useImperativeHandle: Et, useEffect: Et, useDebugValue: Et, useDeferredValue: function(a) {
    return Ut(), a;
  }, useTransition: function() {
    return Ut(), [
      !1,
      Vn
    ];
  }, useId: function() {
    var a = Tt.treeContext, u = a.overflow;
    a = a.id, a = (a & ~(1 << 32 - wr(a) - 1)).toString(32) + u;
    var h = Tr;
    if (h === null) throw Error(b(404));
    return u = sr++, a = ":" + h.idPrefix + "R" + a, 0 < u && (a += "H" + u.toString(32)), a + ":";
  }, useMutableSource: function(a, u) {
    return Ut(), u(a._source);
  }, useSyncExternalStore: function(a, u, h) {
    if (h === void 0) throw Error(b(407));
    return h();
  } }, Tr = null, Gt = I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function at(a) {
    return console.error(a), null;
  }
  function Rt() {
  }
  function Cr(a, u, h, m, C, x, F, j, q) {
    var ae = [], ee = /* @__PURE__ */ new Set();
    return u = { destination: null, responseState: u, progressiveChunkSize: m === void 0 ? 12800 : m, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: ee, pingedTasks: ae, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: C === void 0 ? at : C, onAllReady: Rt, onShellReady: F === void 0 ? Rt : F, onShellError: Rt, onFatalError: Rt }, h = Zt(u, 0, null, h, !1, !1), h.parentFlushed = !0, a = Xt(u, a, null, h, ee, lr, null, pn), ae.push(a), u;
  }
  function Xt(a, u, h, m, C, x, F, j) {
    a.allPendingTasks++, h === null ? a.pendingRootTasks++ : h.pendingTasks++;
    var q = { node: u, ping: function() {
      var ae = a.pingedTasks;
      ae.push(q), ae.length === 1 && et(a);
    }, blockedBoundary: h, blockedSegment: m, abortSet: C, legacyContext: x, context: F, treeContext: j };
    return C.add(q), q;
  }
  function Zt(a, u, h, m, C, x) {
    return { status: 0, id: -1, index: u, parentFlushed: !1, chunks: [], children: [], formatContext: m, boundary: h, lastPushedText: C, textEmbedded: x };
  }
  function It(a, u) {
    if (a = a.onError(u), a != null && typeof a != "string") throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
    return a;
  }
  function Jt(a, u) {
    var h = a.onShellError;
    h(u), h = a.onFatalError, h(u), a.destination !== null ? (a.status = 2, a.destination.destroy(u)) : (a.status = 1, a.fatalError = u);
  }
  function it(a, u, h, m, C) {
    for (qe = {}, Tt = u, sr = 0, a = h(m, C); xr; ) xr = !1, sr = 0, kr += 1, Re = null, a = h(m, C);
    return Vr(), a;
  }
  function mn(a, u, h, m) {
    var C = h.render(), x = m.childContextTypes;
    if (x != null) {
      var F = u.legacyContext;
      if (typeof h.getChildContext != "function") m = F;
      else {
        h = h.getChildContext();
        for (var j in h) if (!(j in x)) throw Error(b(108, ir(m) || "Unknown", j));
        m = H({}, F, h);
      }
      u.legacyContext = m, Ye(a, u, C), u.legacyContext = F;
    } else Ye(a, u, C);
  }
  function gn(a, u) {
    if (a && a.defaultProps) {
      u = H({}, u), a = a.defaultProps;
      for (var h in a) u[h] === void 0 && (u[h] = a[h]);
      return u;
    }
    return u;
  }
  function jt(a, u, h, m, C) {
    if (typeof h == "function") if (h.prototype && h.prototype.isReactComponent) {
      C = fn(h, u.legacyContext);
      var x = h.contextType;
      x = new h(m, typeof x == "object" && x !== null ? x._currentValue2 : C), dn(x, h, m, C), mn(a, u, x, h);
    } else {
      x = fn(h, u.legacyContext), C = it(a, u, h, m, x);
      var F = sr !== 0;
      if (typeof C == "object" && C !== null && typeof C.render == "function" && C.$$typeof === void 0) dn(C, h, m, x), mn(a, u, C, h);
      else if (F) {
        m = u.treeContext, u.treeContext = Hr(m, 1, 0);
        try {
          Ye(a, u, C);
        } finally {
          u.treeContext = m;
        }
      } else Ye(a, u, C);
    }
    else if (typeof h == "string") {
      switch (C = u.blockedSegment, x = Fe(C.chunks, h, m, a.responseState, C.formatContext), C.lastPushedText = !1, F = C.formatContext, C.formatContext = J(F, h, m), At(a, u, x), C.formatContext = F, h) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          C.chunks.push("</", h, ">");
      }
      C.lastPushedText = !1;
    } else {
      switch (h) {
        case ar:
        case Bt:
        case te:
        case Z:
        case oe:
          Ye(a, u, m.children);
          return;
        case Te:
          Ye(a, u, m.children);
          return;
        case $e:
          throw Error(b(343));
        case ve:
          e: {
            h = u.blockedBoundary, C = u.blockedSegment, x = m.fallback, m = m.children, F = /* @__PURE__ */ new Set();
            var j = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: F, errorDigest: null }, q = Zt(a, C.chunks.length, j, C.formatContext, !1, !1);
            C.children.push(q), C.lastPushedText = !1;
            var ae = Zt(a, 0, null, C.formatContext, !1, !1);
            ae.parentFlushed = !0, u.blockedBoundary = j, u.blockedSegment = ae;
            try {
              if (At(
                a,
                u,
                m
              ), a.responseState.generateStaticMarkup || ae.lastPushedText && ae.textEmbedded && ae.chunks.push("<!-- -->"), ae.status = 1, vt(j, ae), j.pendingTasks === 0) break e;
            } catch (ee) {
              ae.status = 4, j.forceClientRender = !0, j.errorDigest = It(a, ee);
            } finally {
              u.blockedBoundary = h, u.blockedSegment = C;
            }
            u = Xt(a, x, h, q, F, u.legacyContext, u.context, u.treeContext), a.pingedTasks.push(u);
          }
          return;
      }
      if (typeof h == "object" && h !== null) switch (h.$$typeof) {
        case he:
          if (m = it(a, u, h.render, m, C), sr !== 0) {
            h = u.treeContext, u.treeContext = Hr(h, 1, 0);
            try {
              Ye(a, u, m);
            } finally {
              u.treeContext = h;
            }
          } else Ye(a, u, m);
          return;
        case N:
          h = h.type, m = gn(h, m), jt(a, u, h, m, C);
          return;
        case de:
          if (C = m.children, h = h._context, m = m.value, x = h._currentValue2, h._currentValue2 = m, F = ht, ht = m = { parent: F, depth: F === null ? 0 : F.depth + 1, context: h, parentValue: x, value: m }, u.context = m, Ye(a, u, C), a = ht, a === null) throw Error(b(403));
          m = a.parentValue, a.context._currentValue2 = m === cn ? a.context._defaultValue : m, a = ht = a.parent, u.context = a;
          return;
        case ge:
          m = m.children, m = m(h._currentValue2), Ye(a, u, m);
          return;
        case Ee:
          C = h._init, h = C(h._payload), m = gn(h, m), jt(
            a,
            u,
            h,
            m,
            void 0
          );
          return;
      }
      throw Error(b(130, h == null ? h : typeof h, ""));
    }
  }
  function Ye(a, u, h) {
    if (u.node = h, typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Q:
          jt(a, u, h.type, h.props, h.ref);
          return;
        case pe:
          throw Error(b(257));
        case Ee:
          var m = h._init;
          h = m(h._payload), Ye(a, u, h);
          return;
      }
      if (S(h)) {
        Pt(a, u, h);
        return;
      }
      if (h === null || typeof h != "object" ? m = null : (m = pt && h[pt] || h["@@iterator"], m = typeof m == "function" ? m : null), m && (m = m.call(h))) {
        if (h = m.next(), !h.done) {
          var C = [];
          do
            C.push(h.value), h = m.next();
          while (!h.done);
          Pt(a, u, C);
        }
        return;
      }
      throw a = Object.prototype.toString.call(h), Error(b(31, a === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : a));
    }
    typeof h == "string" ? (m = u.blockedSegment, m.lastPushedText = U(u.blockedSegment.chunks, h, a.responseState, m.lastPushedText)) : typeof h == "number" && (m = u.blockedSegment, m.lastPushedText = U(u.blockedSegment.chunks, "" + h, a.responseState, m.lastPushedText));
  }
  function Pt(a, u, h) {
    for (var m = h.length, C = 0; C < m; C++) {
      var x = u.treeContext;
      u.treeContext = Hr(x, m, C);
      try {
        At(a, u, h[C]);
      } finally {
        u.treeContext = x;
      }
    }
  }
  function At(a, u, h) {
    var m = u.blockedSegment.formatContext, C = u.legacyContext, x = u.context;
    try {
      return Ye(a, u, h);
    } catch (q) {
      if (Vr(), typeof q == "object" && q !== null && typeof q.then == "function") {
        h = q;
        var F = u.blockedSegment, j = Zt(a, F.chunks.length, null, F.formatContext, F.lastPushedText, !0);
        F.children.push(j), F.lastPushedText = !1, a = Xt(a, u.node, u.blockedBoundary, j, u.abortSet, u.legacyContext, u.context, u.treeContext).ping, h.then(a, a), u.blockedSegment.formatContext = m, u.legacyContext = C, u.context = x, Ne(x);
      } else throw u.blockedSegment.formatContext = m, u.legacyContext = C, u.context = x, Ne(x), q;
    }
  }
  function Qt(a) {
    var u = a.blockedBoundary;
    a = a.blockedSegment, a.status = 3, Ft(this, u, a);
  }
  function Er(a, u, h) {
    var m = a.blockedBoundary;
    a.blockedSegment.status = 3, m === null ? (u.allPendingTasks--, u.status !== 2 && (u.status = 2, u.destination !== null && u.destination.push(null))) : (m.pendingTasks--, m.forceClientRender || (m.forceClientRender = !0, a = h === void 0 ? Error(b(432)) : h, m.errorDigest = u.onError(a), m.parentFlushed && u.clientRenderedBoundaries.push(m)), m.fallbackAbortableTasks.forEach(function(C) {
      return Er(C, u, h);
    }), m.fallbackAbortableTasks.clear(), u.allPendingTasks--, u.allPendingTasks === 0 && (m = u.onAllReady, m()));
  }
  function vt(a, u) {
    if (u.chunks.length === 0 && u.children.length === 1 && u.children[0].boundary === null) {
      var h = u.children[0];
      h.id = u.id, h.parentFlushed = !0, h.status === 1 && vt(a, h);
    } else a.completedSegments.push(u);
  }
  function Ft(a, u, h) {
    if (u === null) {
      if (h.parentFlushed) {
        if (a.completedRootSegment !== null) throw Error(b(389));
        a.completedRootSegment = h;
      }
      a.pendingRootTasks--, a.pendingRootTasks === 0 && (a.onShellError = Rt, u = a.onShellReady, u());
    } else u.pendingTasks--, u.forceClientRender || (u.pendingTasks === 0 ? (h.parentFlushed && h.status === 1 && vt(u, h), u.parentFlushed && a.completedBoundaries.push(u), u.fallbackAbortableTasks.forEach(Qt, a), u.fallbackAbortableTasks.clear()) : h.parentFlushed && h.status === 1 && (vt(u, h), u.completedSegments.length === 1 && u.parentFlushed && a.partialBoundaries.push(u)));
    a.allPendingTasks--, a.allPendingTasks === 0 && (a = a.onAllReady, a());
  }
  function et(a) {
    if (a.status !== 2) {
      var u = ht, h = Gt.current;
      Gt.current = Gr;
      var m = Tr;
      Tr = a.responseState;
      try {
        var C = a.pingedTasks, x;
        for (x = 0; x < C.length; x++) {
          var F = C[x], j = a, q = F.blockedSegment;
          if (q.status === 0) {
            Ne(F.context);
            try {
              Ye(j, F, F.node), j.responseState.generateStaticMarkup || q.lastPushedText && q.textEmbedded && q.chunks.push("<!-- -->"), F.abortSet.delete(F), q.status = 1, Ft(j, F.blockedBoundary, q);
            } catch (ot) {
              if (Vr(), typeof ot == "object" && ot !== null && typeof ot.then == "function") {
                var ae = F.ping;
                ot.then(ae, ae);
              } else {
                F.abortSet.delete(F), q.status = 4;
                var ee = F.blockedBoundary, xe = ot, rt = It(j, xe);
                if (ee === null ? Jt(j, xe) : (ee.pendingTasks--, ee.forceClientRender || (ee.forceClientRender = !0, ee.errorDigest = rt, ee.parentFlushed && j.clientRenderedBoundaries.push(ee))), j.allPendingTasks--, j.allPendingTasks === 0) {
                  var nt = j.onAllReady;
                  nt();
                }
              }
            } finally {
            }
          }
        }
        C.splice(0, x), a.destination !== null && tt(a, a.destination);
      } catch (ot) {
        It(a, ot), Jt(a, ot);
      } finally {
        Tr = m, Gt.current = h, h === Gr && Ne(u);
      }
    }
  }
  function Kt(a, u, h) {
    switch (h.parentFlushed = !0, h.status) {
      case 0:
        var m = h.id = a.nextSegmentId++;
        return h.lastPushedText = !1, h.textEmbedded = !1, a = a.responseState, u.push('<template id="'), u.push(a.placeholderPrefix), a = m.toString(16), u.push(a), u.push('"></template>');
      case 1:
        h.status = 2;
        var C = !0;
        m = h.chunks;
        var x = 0;
        h = h.children;
        for (var F = 0; F < h.length; F++) {
          for (C = h[F]; x < C.index; x++) u.push(m[x]);
          C = ur(a, u, C);
        }
        for (; x < m.length - 1; x++) u.push(m[x]);
        return x < m.length && (C = u.push(m[x])), C;
      default:
        throw Error(b(390));
    }
  }
  function ur(a, u, h) {
    var m = h.boundary;
    if (m === null) return Kt(a, u, h);
    if (m.parentFlushed = !0, m.forceClientRender) return a.responseState.generateStaticMarkup || (m = m.errorDigest, u.push("<!--$!-->"), u.push("<template"), m && (u.push(' data-dgst="'), m = G(m), u.push(m), u.push('"')), u.push("></template>")), Kt(a, u, h), a = a.responseState.generateStaticMarkup ? !0 : u.push("<!--/$-->"), a;
    if (0 < m.pendingTasks) {
      m.rootSegmentID = a.nextSegmentId++, 0 < m.completedSegments.length && a.partialBoundaries.push(m);
      var C = a.responseState, x = C.nextSuspenseID++;
      return C = C.boundaryPrefix + x.toString(16), m = m.id = C, Le(u, a.responseState, m), Kt(a, u, h), u.push("<!--/$-->");
    }
    if (m.byteSize > a.progressiveChunkSize) return m.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(m), Le(u, a.responseState, m.id), Kt(a, u, h), u.push("<!--/$-->");
    if (a.responseState.generateStaticMarkup || u.push("<!--$-->"), h = m.completedSegments, h.length !== 1) throw Error(b(391));
    return ur(a, u, h[0]), a = a.responseState.generateStaticMarkup ? !0 : u.push("<!--/$-->"), a;
  }
  function Rr(a, u, h) {
    return We(u, a.responseState, h.formatContext, h.id), ur(a, u, h), be(u, h.formatContext);
  }
  function ft(a, u, h) {
    for (var m = h.completedSegments, C = 0; C < m.length; C++) _t(a, u, h, m[C]);
    if (m.length = 0, a = a.responseState, m = h.id, h = h.rootSegmentID, u.push(a.startInlineScript), a.sentCompleteBoundaryFunction ? u.push('$RC("') : (a.sentCompleteBoundaryFunction = !0, u.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')), m === null) throw Error(b(395));
    return h = h.toString(16), u.push(m), u.push('","'), u.push(a.segmentPrefix), u.push(h), u.push('")<\/script>');
  }
  function _t(a, u, h, m) {
    if (m.status === 2) return !0;
    var C = m.id;
    if (C === -1) {
      if ((m.id = h.rootSegmentID) === -1) throw Error(b(392));
      return Rr(a, u, m);
    }
    return Rr(a, u, m), a = a.responseState, u.push(a.startInlineScript), a.sentCompleteSegmentFunction ? u.push('$RS("') : (a.sentCompleteSegmentFunction = !0, u.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), u.push(a.segmentPrefix), C = C.toString(16), u.push(C), u.push('","'), u.push(a.placeholderPrefix), u.push(C), u.push('")<\/script>');
  }
  function tt(a, u) {
    try {
      var h = a.completedRootSegment;
      if (h !== null && a.pendingRootTasks === 0) {
        ur(a, u, h), a.completedRootSegment = null;
        var m = a.responseState.bootstrapChunks;
        for (h = 0; h < m.length - 1; h++) u.push(m[h]);
        h < m.length && u.push(m[h]);
      }
      var C = a.clientRenderedBoundaries, x;
      for (x = 0; x < C.length; x++) {
        var F = C[x];
        m = u;
        var j = a.responseState, q = F.id, ae = F.errorDigest, ee = F.errorMessage, xe = F.errorComponentStack;
        if (m.push(j.startInlineScript), j.sentClientRenderFunction ? m.push('$RX("') : (j.sentClientRenderFunction = !0, m.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')), q === null) throw Error(b(395));
        if (m.push(q), m.push('"'), ae || ee || xe) {
          m.push(",");
          var rt = je(ae || "");
          m.push(rt);
        }
        if (ee || xe) {
          m.push(",");
          var nt = je(ee || "");
          m.push(nt);
        }
        if (xe) {
          m.push(",");
          var ot = je(xe);
          m.push(ot);
        }
        if (!m.push(")<\/script>")) {
          a.destination = null, x++, C.splice(0, x);
          return;
        }
      }
      C.splice(0, x);
      var qt = a.completedBoundaries;
      for (x = 0; x < qt.length; x++) if (!ft(a, u, qt[x])) {
        a.destination = null, x++, qt.splice(0, x);
        return;
      }
      qt.splice(0, x);
      var Dt = a.partialBoundaries;
      for (x = 0; x < Dt.length; x++) {
        var Pr = Dt[x];
        e: {
          C = a, F = u;
          var er = Pr.completedSegments;
          for (j = 0; j < er.length; j++) if (!_t(C, F, Pr, er[j])) {
            j++, er.splice(0, j);
            var cr = !1;
            break e;
          }
          er.splice(0, j), cr = !0;
        }
        if (!cr) {
          a.destination = null, x++, Dt.splice(0, x);
          return;
        }
      }
      Dt.splice(0, x);
      var zt = a.completedBoundaries;
      for (x = 0; x < zt.length; x++) if (!ft(a, u, zt[x])) {
        a.destination = null, x++, zt.splice(0, x);
        return;
      }
      zt.splice(0, x);
    } finally {
      a.allPendingTasks === 0 && a.pingedTasks.length === 0 && a.clientRenderedBoundaries.length === 0 && a.completedBoundaries.length === 0 && u.push(null);
    }
  }
  function Ir(a, u) {
    try {
      var h = a.abortableTasks;
      h.forEach(function(m) {
        return Er(m, a, u);
      }), h.clear(), a.destination !== null && tt(a, a.destination);
    } catch (m) {
      It(a, m), Jt(a, m);
    }
  }
  function Je() {
  }
  function lt(a, u, h, m) {
    var C = !1, x = null, F = "", j = { push: function(ae) {
      return ae !== null && (F += ae), !0;
    }, destroy: function(ae) {
      C = !0, x = ae;
    } }, q = !1;
    if (a = Cr(a, ze(h, u ? u.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, 1 / 0, Je, void 0, function() {
      q = !0;
    }), et(a), Ir(a, m), a.status === 1) a.status = 2, j.destroy(a.fatalError);
    else if (a.status !== 2 && a.destination === null) {
      a.destination = j;
      try {
        tt(a, j);
      } catch (ae) {
        It(a, ae), Jt(a, ae);
      }
    }
    if (C) throw x;
    if (!q) throw Error(b(426));
    return F;
  }
  return Co.renderToNodeStream = function() {
    throw Error(b(207));
  }, Co.renderToStaticMarkup = function(a, u) {
    return lt(a, u, !0, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  }, Co.renderToStaticNodeStream = function() {
    throw Error(b(208));
  }, Co.renderToString = function(a, u) {
    return lt(a, u, !1, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  }, Co.version = "18.3.1", Co;
}
var ol = {};
/**
 * @license React
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ms;
function Ys() {
  if (ms) return ol;
  ms = 1;
  var I = br;
  function b(i) {
    for (var s = "https://reactjs.org/docs/error-decoder.html?invariant=" + i, d = 1; d < arguments.length; d++) s += "&args[]=" + encodeURIComponent(arguments[d]);
    return "Minified React error #" + i + "; visit " + s + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var R = null, L = 0;
  function f(i, s) {
    if (s.length !== 0) if (512 < s.length) 0 < L && (i.enqueue(new Uint8Array(R.buffer, 0, L)), R = new Uint8Array(512), L = 0), i.enqueue(s);
    else {
      var d = R.length - L;
      d < s.length && (d === 0 ? i.enqueue(R) : (R.set(s.subarray(0, d), L), i.enqueue(R), s = s.subarray(d)), R = new Uint8Array(512), L = 0), R.set(s, L), L += s.length;
    }
  }
  function _(i, s) {
    return f(i, s), !0;
  }
  function $(i) {
    R && 0 < L && (i.enqueue(new Uint8Array(R.buffer, 0, L)), R = null, L = 0);
  }
  var W = new TextEncoder();
  function y(i) {
    return W.encode(i);
  }
  function w(i) {
    return W.encode(i);
  }
  function X(i, s) {
    typeof i.error == "function" ? i.error(s) : i.close();
  }
  var A = Object.prototype.hasOwnProperty, Y = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, se = {}, G = {};
  function ce(i) {
    return A.call(G, i) ? !0 : A.call(se, i) ? !1 : Y.test(i) ? G[i] = !0 : (se[i] = !0, !1);
  }
  function P(i, s, d, v, E, T, D) {
    this.acceptsBooleans = s === 2 || s === 3 || s === 4, this.attributeName = v, this.attributeNamespace = E, this.mustUseProperty = d, this.propertyName = i, this.type = s, this.sanitizeURL = T, this.removeEmptyString = D;
  }
  var S = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(i) {
    S[i] = new P(i, 0, !1, i, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(i) {
    var s = i[0];
    S[s] = new P(s, 1, !1, i[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(i) {
    S[i] = new P(i, 2, !1, i.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(i) {
    S[i] = new P(i, 2, !1, i, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(i) {
    S[i] = new P(i, 3, !1, i.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(i) {
    S[i] = new P(i, 3, !0, i, null, !1, !1);
  }), ["capture", "download"].forEach(function(i) {
    S[i] = new P(i, 4, !1, i, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(i) {
    S[i] = new P(i, 6, !1, i, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(i) {
    S[i] = new P(i, 5, !1, i.toLowerCase(), null, !1, !1);
  });
  var K = /[\-:]([a-z])/g;
  function J(i) {
    return i[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(i) {
    var s = i.replace(
      K,
      J
    );
    S[s] = new P(s, 1, !1, i, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(i) {
    var s = i.replace(K, J);
    S[s] = new P(s, 1, !1, i, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(i) {
    var s = i.replace(K, J);
    S[s] = new P(s, 1, !1, i, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(i) {
    S[i] = new P(i, 1, !1, i.toLowerCase(), null, !1, !1);
  }), S.xlinkHref = new P("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(i) {
    S[i] = new P(i, 1, !1, i.toLowerCase(), null, !0, !0);
  });
  var re = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, M = ["Webkit", "ms", "Moz", "O"];
  Object.keys(re).forEach(function(i) {
    M.forEach(function(s) {
      s = s + i.charAt(0).toUpperCase() + i.substring(1), re[s] = re[i];
    });
  });
  var le = /["'&<>]/;
  function ne(i) {
    if (typeof i == "boolean" || typeof i == "number") return "" + i;
    i = "" + i;
    var s = le.exec(i);
    if (s) {
      var d = "", v, E = 0;
      for (v = s.index; v < i.length; v++) {
        switch (i.charCodeAt(v)) {
          case 34:
            s = "&quot;";
            break;
          case 38:
            s = "&amp;";
            break;
          case 39:
            s = "&#x27;";
            break;
          case 60:
            s = "&lt;";
            break;
          case 62:
            s = "&gt;";
            break;
          default:
            continue;
        }
        E !== v && (d += i.substring(E, v)), E = v + 1, d += s;
      }
      i = E !== v ? d + i.substring(E, v) : d;
    }
    return i;
  }
  var Ae = /([A-Z])/g, fe = /^ms-/, we = Array.isArray, Pe = w("<script>"), Se = w("<\/script>"), Fe = w('<script src="'), Le = w('<script type="module" src="'), We = w('" async=""><\/script>'), be = /(<\/|<)(s)(cript)/gi;
  function Ie(i, s, d, v) {
    return "" + s + (d === "s" ? "\\u0073" : "\\u0053") + v;
  }
  function je(i, s, d, v, E) {
    i = i === void 0 ? "" : i, s = s === void 0 ? Pe : w('<script nonce="' + ne(s) + '">');
    var T = [];
    if (d !== void 0 && T.push(s, y(("" + d).replace(be, Ie)), Se), v !== void 0) for (d = 0; d < v.length; d++) T.push(Fe, y(ne(v[d])), We);
    if (E !== void 0) for (v = 0; v < E.length; v++) T.push(Le, y(ne(E[v])), We);
    return { bootstrapChunks: T, startInlineScript: s, placeholderPrefix: w(i + "P:"), segmentPrefix: w(i + "S:"), boundaryPrefix: i + "B:", idPrefix: i, nextSuspenseID: 0, sentCompleteSegmentFunction: !1, sentCompleteBoundaryFunction: !1, sentClientRenderFunction: !1 };
  }
  function ze(i, s) {
    return { insertionMode: i, selectedValue: s };
  }
  function U(i) {
    return ze(i === "http://www.w3.org/2000/svg" ? 2 : i === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null);
  }
  function H(i, s, d) {
    switch (s) {
      case "select":
        return ze(1, d.value != null ? d.value : d.defaultValue);
      case "svg":
        return ze(2, null);
      case "math":
        return ze(3, null);
      case "foreignObject":
        return ze(1, null);
      case "table":
        return ze(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return ze(5, null);
      case "colgroup":
        return ze(7, null);
      case "tr":
        return ze(6, null);
    }
    return 4 <= i.insertionMode || i.insertionMode === 0 ? ze(1, null) : i;
  }
  var Q = w("<!-- -->");
  function pe(i, s, d, v) {
    return s === "" ? v : (v && i.push(Q), i.push(y(ne(s))), !0);
  }
  var oe = /* @__PURE__ */ new Map(), te = w(' style="'), Z = w(":"), de = w(";");
  function ge(i, s, d) {
    if (typeof d != "object") throw Error(b(62));
    s = !0;
    for (var v in d) if (A.call(d, v)) {
      var E = d[v];
      if (E != null && typeof E != "boolean" && E !== "") {
        if (v.indexOf("--") === 0) {
          var T = y(ne(v));
          E = y(ne(("" + E).trim()));
        } else {
          T = v;
          var D = oe.get(T);
          D !== void 0 || (D = w(ne(T.replace(Ae, "-$1").toLowerCase().replace(fe, "-ms-"))), oe.set(T, D)), T = D, E = typeof E == "number" ? E === 0 || A.call(re, v) ? y("" + E) : y(E + "px") : y(ne(("" + E).trim()));
        }
        s ? (s = !1, i.push(te, T, Z, E)) : i.push(de, T, Z, E);
      }
    }
    s || i.push(Te);
  }
  var he = w(" "), ve = w('="'), Te = w('"'), N = w('=""');
  function Ee(i, s, d, v) {
    switch (d) {
      case "style":
        ge(i, s, v);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < d.length) || d[0] !== "o" && d[0] !== "O" || d[1] !== "n" && d[1] !== "N") {
      if (s = S.hasOwnProperty(d) ? S[d] : null, s !== null) {
        switch (typeof v) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!s.acceptsBooleans) return;
        }
        switch (d = y(s.attributeName), s.type) {
          case 3:
            v && i.push(he, d, N);
            break;
          case 4:
            v === !0 ? i.push(he, d, N) : v !== !1 && i.push(he, d, ve, y(ne(v)), Te);
            break;
          case 5:
            isNaN(v) || i.push(he, d, ve, y(ne(v)), Te);
            break;
          case 6:
            !isNaN(v) && 1 <= v && i.push(he, d, ve, y(ne(v)), Te);
            break;
          default:
            s.sanitizeURL && (v = "" + v), i.push(he, d, ve, y(ne(v)), Te);
        }
      } else if (ce(d)) {
        switch (typeof v) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (s = d.toLowerCase().slice(0, 5), s !== "data-" && s !== "aria-") return;
        }
        i.push(he, y(d), ve, y(ne(v)), Te);
      }
    }
  }
  var $e = w(">"), Bt = w("/>");
  function ar(i, s, d) {
    if (s != null) {
      if (d != null) throw Error(b(60));
      if (typeof s != "object" || !("__html" in s)) throw Error(b(61));
      s = s.__html, s != null && i.push(y("" + s));
    }
  }
  function cn(i) {
    var s = "";
    return I.Children.forEach(i, function(d) {
      d != null && (s += d);
    }), s;
  }
  var pt = w(' selected=""');
  function ir(i, s, d, v) {
    i.push(Qe(d));
    var E = d = null, T;
    for (T in s) if (A.call(s, T)) {
      var D = s[T];
      if (D != null) switch (T) {
        case "children":
          d = D;
          break;
        case "dangerouslySetInnerHTML":
          E = D;
          break;
        default:
          Ee(i, v, T, D);
      }
    }
    return i.push($e), ar(i, E, d), typeof d == "string" ? (i.push(y(ne(d))), null) : d;
  }
  var lr = w(`
`), fn = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, ht = /* @__PURE__ */ new Map();
  function Qe(i) {
    var s = ht.get(i);
    if (s === void 0) {
      if (!fn.test(i)) throw Error(b(65, i));
      s = w("<" + i), ht.set(i, s);
    }
    return s;
  }
  var Ge = w("<!DOCTYPE html>");
  function Br(i, s, d, v, E) {
    switch (s) {
      case "select":
        i.push(Qe("select"));
        var T = null, D = null;
        for (me in d) if (A.call(d, me)) {
          var z = d[me];
          if (z != null) switch (me) {
            case "children":
              T = z;
              break;
            case "dangerouslySetInnerHTML":
              D = z;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              Ee(i, v, me, z);
          }
        }
        return i.push($e), ar(i, D, T), T;
      case "option":
        D = E.selectedValue, i.push(Qe("option"));
        var ie = z = null, ye = null, me = null;
        for (T in d) if (A.call(d, T)) {
          var Me = d[T];
          if (Me != null) switch (T) {
            case "children":
              z = Me;
              break;
            case "selected":
              ye = Me;
              break;
            case "dangerouslySetInnerHTML":
              me = Me;
              break;
            case "value":
              ie = Me;
            default:
              Ee(i, v, T, Me);
          }
        }
        if (D != null) if (d = ie !== null ? "" + ie : cn(z), we(D)) {
          for (v = 0; v < D.length; v++)
            if ("" + D[v] === d) {
              i.push(pt);
              break;
            }
        } else "" + D === d && i.push(pt);
        else ye && i.push(pt);
        return i.push($e), ar(i, me, z), z;
      case "textarea":
        i.push(Qe("textarea")), me = D = T = null;
        for (z in d) if (A.call(d, z) && (ie = d[z], ie != null)) switch (z) {
          case "children":
            me = ie;
            break;
          case "value":
            T = ie;
            break;
          case "defaultValue":
            D = ie;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(b(91));
          default:
            Ee(i, v, z, ie);
        }
        if (T === null && D !== null && (T = D), i.push($e), me != null) {
          if (T != null) throw Error(b(92));
          if (we(me) && 1 < me.length) throw Error(b(93));
          T = "" + me;
        }
        return typeof T == "string" && T[0] === `
` && i.push(lr), T !== null && i.push(y(ne("" + T))), null;
      case "input":
        i.push(Qe("input")), ie = me = z = T = null;
        for (D in d) if (A.call(d, D) && (ye = d[D], ye != null)) switch (D) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(b(399, "input"));
          case "defaultChecked":
            ie = ye;
            break;
          case "defaultValue":
            z = ye;
            break;
          case "checked":
            me = ye;
            break;
          case "value":
            T = ye;
            break;
          default:
            Ee(i, v, D, ye);
        }
        return me !== null ? Ee(
          i,
          v,
          "checked",
          me
        ) : ie !== null && Ee(i, v, "checked", ie), T !== null ? Ee(i, v, "value", T) : z !== null && Ee(i, v, "value", z), i.push(Bt), null;
      case "menuitem":
        i.push(Qe("menuitem"));
        for (var ut in d) if (A.call(d, ut) && (T = d[ut], T != null)) switch (ut) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(b(400));
          default:
            Ee(i, v, ut, T);
        }
        return i.push($e), null;
      case "title":
        i.push(Qe("title")), T = null;
        for (Me in d) if (A.call(d, Me) && (D = d[Me], D != null)) switch (Me) {
          case "children":
            T = D;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(b(434));
          default:
            Ee(i, v, Me, D);
        }
        return i.push($e), T;
      case "listing":
      case "pre":
        i.push(Qe(s)), D = T = null;
        for (ie in d) if (A.call(d, ie) && (z = d[ie], z != null)) switch (ie) {
          case "children":
            T = z;
            break;
          case "dangerouslySetInnerHTML":
            D = z;
            break;
          default:
            Ee(i, v, ie, z);
        }
        if (i.push($e), D != null) {
          if (T != null) throw Error(b(60));
          if (typeof D != "object" || !("__html" in D)) throw Error(b(61));
          d = D.__html, d != null && (typeof d == "string" && 0 < d.length && d[0] === `
` ? i.push(lr, y(d)) : i.push(y("" + d)));
        }
        return typeof T == "string" && T[0] === `
` && i.push(lr), T;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        i.push(Qe(s));
        for (var gt in d) if (A.call(d, gt) && (T = d[gt], T != null)) switch (gt) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(b(399, s));
          default:
            Ee(i, v, gt, T);
        }
        return i.push(Bt), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return ir(i, d, s, v);
      case "html":
        return E.insertionMode === 0 && i.push(Ge), ir(i, d, s, v);
      default:
        if (s.indexOf("-") === -1 && typeof d.is != "string") return ir(i, d, s, v);
        i.push(Qe(s)), D = T = null;
        for (ye in d) if (A.call(d, ye) && (z = d[ye], z != null)) switch (ye) {
          case "children":
            T = z;
            break;
          case "dangerouslySetInnerHTML":
            D = z;
            break;
          case "style":
            ge(i, v, z);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            break;
          default:
            ce(ye) && typeof z != "function" && typeof z != "symbol" && i.push(he, y(ye), ve, y(ne(z)), Te);
        }
        return i.push($e), ar(i, D, T), T;
    }
  }
  var Ur = w("</"), jr = w(">"), Ne = w('<template id="'), zr = w('"></template>'), dn = w("<!--$-->"), pn = w('<!--$?--><template id="'), Hr = w('"></template>'), wr = w("<!--$!-->"), $n = w("<!--/$-->"), Wr = w("<template"), Nt = w('"'), $r = w(' data-dgst="');
  w(' data-msg="'), w(' data-stck="');
  var hn = w("></template>");
  function qe(i, s, d) {
    if (f(i, pn), d === null) throw Error(b(395));
    return f(i, d), _(i, Hr);
  }
  var Tt = w('<div hidden id="'), Vt = w('">'), Re = w("</div>"), Yt = w('<svg aria-hidden="true" style="display:none" id="'), xr = w('">'), sr = w("</svg>"), Ct = w('<math aria-hidden="true" style="display:none" id="'), kr = w('">'), Ut = w("</math>"), Ze = w('<table hidden id="'), Nr = w('">'), Vr = w("</table>"), vn = w('<table hidden><tbody id="'), Ve = w('">'), Yr = w("</tbody></table>"), Nn = w('<table hidden><tr id="'), Vn = w('">'), Et = w("</tr></table>"), Gr = w('<table hidden><colgroup id="'), Tr = w('">'), Gt = w("</colgroup></table>");
  function at(i, s, d, v) {
    switch (d.insertionMode) {
      case 0:
      case 1:
        return f(i, Tt), f(i, s.segmentPrefix), f(i, y(v.toString(16))), _(i, Vt);
      case 2:
        return f(i, Yt), f(i, s.segmentPrefix), f(i, y(v.toString(16))), _(i, xr);
      case 3:
        return f(i, Ct), f(i, s.segmentPrefix), f(i, y(v.toString(16))), _(i, kr);
      case 4:
        return f(i, Ze), f(i, s.segmentPrefix), f(i, y(v.toString(16))), _(i, Nr);
      case 5:
        return f(i, vn), f(i, s.segmentPrefix), f(i, y(v.toString(16))), _(i, Ve);
      case 6:
        return f(i, Nn), f(i, s.segmentPrefix), f(i, y(v.toString(16))), _(i, Vn);
      case 7:
        return f(
          i,
          Gr
        ), f(i, s.segmentPrefix), f(i, y(v.toString(16))), _(i, Tr);
      default:
        throw Error(b(397));
    }
  }
  function Rt(i, s) {
    switch (s.insertionMode) {
      case 0:
      case 1:
        return _(i, Re);
      case 2:
        return _(i, sr);
      case 3:
        return _(i, Ut);
      case 4:
        return _(i, Vr);
      case 5:
        return _(i, Yr);
      case 6:
        return _(i, Et);
      case 7:
        return _(i, Gt);
      default:
        throw Error(b(397));
    }
  }
  var Cr = w('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), Xt = w('$RS("'), Zt = w('","'), It = w('")<\/script>'), Jt = w('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), it = w('$RC("'), mn = w('","'), gn = w('")<\/script>'), jt = w('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), Ye = w('$RX("'), Pt = w('"'), At = w(")<\/script>"), Qt = w(","), Er = /[<\u2028\u2029]/g;
  function vt(i) {
    return JSON.stringify(i).replace(Er, function(s) {
      switch (s) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  var Ft = Object.assign, et = Symbol.for("react.element"), Kt = Symbol.for("react.portal"), ur = Symbol.for("react.fragment"), Rr = Symbol.for("react.strict_mode"), ft = Symbol.for("react.profiler"), _t = Symbol.for("react.provider"), tt = Symbol.for("react.context"), Ir = Symbol.for("react.forward_ref"), Je = Symbol.for("react.suspense"), lt = Symbol.for("react.suspense_list"), a = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), h = Symbol.for("react.scope"), m = Symbol.for("react.debug_trace_mode"), C = Symbol.for("react.legacy_hidden"), x = Symbol.for("react.default_value"), F = Symbol.iterator;
  function j(i) {
    if (i == null) return null;
    if (typeof i == "function") return i.displayName || i.name || null;
    if (typeof i == "string") return i;
    switch (i) {
      case ur:
        return "Fragment";
      case Kt:
        return "Portal";
      case ft:
        return "Profiler";
      case Rr:
        return "StrictMode";
      case Je:
        return "Suspense";
      case lt:
        return "SuspenseList";
    }
    if (typeof i == "object") switch (i.$$typeof) {
      case tt:
        return (i.displayName || "Context") + ".Consumer";
      case _t:
        return (i._context.displayName || "Context") + ".Provider";
      case Ir:
        var s = i.render;
        return i = i.displayName, i || (i = s.displayName || s.name || "", i = i !== "" ? "ForwardRef(" + i + ")" : "ForwardRef"), i;
      case a:
        return s = i.displayName || null, s !== null ? s : j(i.type) || "Memo";
      case u:
        s = i._payload, i = i._init;
        try {
          return j(i(s));
        } catch {
        }
    }
    return null;
  }
  var q = {};
  function ae(i, s) {
    if (i = i.contextTypes, !i) return q;
    var d = {}, v;
    for (v in i) d[v] = s[v];
    return d;
  }
  var ee = null;
  function xe(i, s) {
    if (i !== s) {
      i.context._currentValue = i.parentValue, i = i.parent;
      var d = s.parent;
      if (i === null) {
        if (d !== null) throw Error(b(401));
      } else {
        if (d === null) throw Error(b(401));
        xe(i, d);
      }
      s.context._currentValue = s.value;
    }
  }
  function rt(i) {
    i.context._currentValue = i.parentValue, i = i.parent, i !== null && rt(i);
  }
  function nt(i) {
    var s = i.parent;
    s !== null && nt(s), i.context._currentValue = i.value;
  }
  function ot(i, s) {
    if (i.context._currentValue = i.parentValue, i = i.parent, i === null) throw Error(b(402));
    i.depth === s.depth ? xe(i, s) : ot(i, s);
  }
  function qt(i, s) {
    var d = s.parent;
    if (d === null) throw Error(b(402));
    i.depth === d.depth ? xe(i, d) : qt(i, d), s.context._currentValue = s.value;
  }
  function Dt(i) {
    var s = ee;
    s !== i && (s === null ? nt(i) : i === null ? rt(s) : s.depth === i.depth ? xe(s, i) : s.depth > i.depth ? ot(s, i) : qt(s, i), ee = i);
  }
  var Pr = { isMounted: function() {
    return !1;
  }, enqueueSetState: function(i, s) {
    i = i._reactInternals, i.queue !== null && i.queue.push(s);
  }, enqueueReplaceState: function(i, s) {
    i = i._reactInternals, i.replace = !0, i.queue = [s];
  }, enqueueForceUpdate: function() {
  } };
  function er(i, s, d, v) {
    var E = i.state !== void 0 ? i.state : null;
    i.updater = Pr, i.props = d, i.state = E;
    var T = { queue: [], replace: !1 };
    i._reactInternals = T;
    var D = s.contextType;
    if (i.context = typeof D == "object" && D !== null ? D._currentValue : v, D = s.getDerivedStateFromProps, typeof D == "function" && (D = D(d, E), E = D == null ? E : Ft({}, E, D), i.state = E), typeof s.getDerivedStateFromProps != "function" && typeof i.getSnapshotBeforeUpdate != "function" && (typeof i.UNSAFE_componentWillMount == "function" || typeof i.componentWillMount == "function")) if (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && Pr.enqueueReplaceState(i, i.state, null), T.queue !== null && 0 < T.queue.length) if (s = T.queue, D = T.replace, T.queue = null, T.replace = !1, D && s.length === 1) i.state = s[0];
    else {
      for (T = D ? s[0] : i.state, E = !0, D = D ? 1 : 0; D < s.length; D++) {
        var z = s[D];
        z = typeof z == "function" ? z.call(i, T, d, v) : z, z != null && (E ? (E = !1, T = Ft({}, T, z)) : Ft(T, z));
      }
      i.state = T;
    }
    else T.queue = null;
  }
  var cr = { id: 1, overflow: "" };
  function zt(i, s, d) {
    var v = i.id;
    i = i.overflow;
    var E = 32 - fr(v) - 1;
    v &= ~(1 << E), d += 1;
    var T = 32 - fr(s) + E;
    if (30 < T) {
      var D = E - E % 5;
      return T = (v & (1 << D) - 1).toString(32), v >>= D, E -= D, { id: 1 << 32 - fr(s) + E | d << E | v, overflow: T + i };
    }
    return { id: 1 << T | d << E | v, overflow: i };
  }
  var fr = Math.clz32 ? Math.clz32 : yn, Ra = Math.log, Ia = Math.LN2;
  function yn(i) {
    return i >>>= 0, i === 0 ? 32 : 31 - (Ra(i) / Ia | 0) | 0;
  }
  function Ot(i, s) {
    return i === s && (i !== 0 || 1 / i === 1 / s) || i !== i && s !== s;
  }
  var Pa = typeof Object.is == "function" ? Object.is : Ot, Ht = null, Yn = null, bn = null, _e = null, dr = !1, Sn = !1, pr = 0, tr = null, wn = 0;
  function rr() {
    if (Ht === null) throw Error(b(321));
    return Ht;
  }
  function mt() {
    if (0 < wn) throw Error(b(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Gn() {
    return _e === null ? bn === null ? (dr = !1, bn = _e = mt()) : (dr = !0, _e = bn) : _e.next === null ? (dr = !1, _e = _e.next = mt()) : (dr = !0, _e = _e.next), _e;
  }
  function Xr() {
    Yn = Ht = null, Sn = !1, bn = null, wn = 0, _e = tr = null;
  }
  function Io(i, s) {
    return typeof s == "function" ? s(i) : s;
  }
  function xn(i, s, d) {
    if (Ht = rr(), _e = Gn(), dr) {
      var v = _e.queue;
      if (s = v.dispatch, tr !== null && (d = tr.get(v), d !== void 0)) {
        tr.delete(v), v = _e.memoizedState;
        do
          v = i(v, d.action), d = d.next;
        while (d !== null);
        return _e.memoizedState = v, [v, s];
      }
      return [_e.memoizedState, s];
    }
    return i = i === Io ? typeof s == "function" ? s() : s : d !== void 0 ? d(s) : s, _e.memoizedState = i, i = _e.queue = { last: null, dispatch: null }, i = i.dispatch = Aa.bind(null, Ht, i), [_e.memoizedState, i];
  }
  function Po(i, s) {
    if (Ht = rr(), _e = Gn(), s = s === void 0 ? null : s, _e !== null) {
      var d = _e.memoizedState;
      if (d !== null && s !== null) {
        var v = d[1];
        e: if (v === null) v = !1;
        else {
          for (var E = 0; E < v.length && E < s.length; E++) if (!Pa(s[E], v[E])) {
            v = !1;
            break e;
          }
          v = !0;
        }
        if (v) return d[0];
      }
    }
    return i = i(), _e.memoizedState = [i, s], i;
  }
  function Aa(i, s, d) {
    if (25 <= wn) throw Error(b(301));
    if (i === Ht) if (Sn = !0, i = { action: d, next: null }, tr === null && (tr = /* @__PURE__ */ new Map()), d = tr.get(s), d === void 0) tr.set(s, i);
    else {
      for (s = d; s.next !== null; ) s = s.next;
      s.next = i;
    }
  }
  function Fa() {
    throw Error(b(394));
  }
  function kn() {
  }
  var Ao = { readContext: function(i) {
    return i._currentValue;
  }, useContext: function(i) {
    return rr(), i._currentValue;
  }, useMemo: Po, useReducer: xn, useRef: function(i) {
    Ht = rr(), _e = Gn();
    var s = _e.memoizedState;
    return s === null ? (i = { current: i }, _e.memoizedState = i) : s;
  }, useState: function(i) {
    return xn(Io, i);
  }, useInsertionEffect: kn, useLayoutEffect: function() {
  }, useCallback: function(i, s) {
    return Po(function() {
      return i;
    }, s);
  }, useImperativeHandle: kn, useEffect: kn, useDebugValue: kn, useDeferredValue: function(i) {
    return rr(), i;
  }, useTransition: function() {
    return rr(), [!1, Fa];
  }, useId: function() {
    var i = Yn.treeContext, s = i.overflow;
    i = i.id, i = (i & ~(1 << 32 - fr(i) - 1)).toString(32) + s;
    var d = Zr;
    if (d === null) throw Error(b(404));
    return s = pr++, i = ":" + d.idPrefix + "R" + i, 0 < s && (i += "H" + s.toString(32)), i + ":";
  }, useMutableSource: function(i, s) {
    return rr(), s(i._source);
  }, useSyncExternalStore: function(i, s, d) {
    if (d === void 0) throw Error(b(407));
    return d();
  } }, Zr = null, Xn = I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function _a(i) {
    return console.error(i), null;
  }
  function Ar() {
  }
  function Zn(i, s, d, v, E, T, D, z, ie) {
    var ye = [], me = /* @__PURE__ */ new Set();
    return s = { destination: null, responseState: s, progressiveChunkSize: v === void 0 ? 12800 : v, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: me, pingedTasks: ye, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: E === void 0 ? _a : E, onAllReady: T === void 0 ? Ar : T, onShellReady: D === void 0 ? Ar : D, onShellError: z === void 0 ? Ar : z, onFatalError: ie === void 0 ? Ar : ie }, d = Fr(s, 0, null, d, !1, !1), d.parentFlushed = !0, i = Jn(s, i, null, d, me, q, null, cr), ye.push(i), s;
  }
  function Jn(i, s, d, v, E, T, D, z) {
    i.allPendingTasks++, d === null ? i.pendingRootTasks++ : d.pendingTasks++;
    var ie = { node: s, ping: function() {
      var ye = i.pingedTasks;
      ye.push(ie), ye.length === 1 && Bo(i);
    }, blockedBoundary: d, blockedSegment: v, abortSet: E, legacyContext: T, context: D, treeContext: z };
    return E.add(ie), ie;
  }
  function Fr(i, s, d, v, E, T) {
    return { status: 0, id: -1, index: s, parentFlushed: !1, chunks: [], children: [], formatContext: v, boundary: d, lastPushedText: E, textEmbedded: T };
  }
  function Jr(i, s) {
    if (i = i.onError(s), i != null && typeof i != "string") throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof i + '" instead');
    return i;
  }
  function Tn(i, s) {
    var d = i.onShellError;
    d(s), d = i.onFatalError, d(s), i.destination !== null ? (i.status = 2, X(i.destination, s)) : (i.status = 1, i.fatalError = s);
  }
  function Fo(i, s, d, v, E) {
    for (Ht = {}, Yn = s, pr = 0, i = d(v, E); Sn; ) Sn = !1, pr = 0, wn += 1, _e = null, i = d(v, E);
    return Xr(), i;
  }
  function _o(i, s, d, v) {
    var E = d.render(), T = v.childContextTypes;
    if (T != null) {
      var D = s.legacyContext;
      if (typeof d.getChildContext != "function") v = D;
      else {
        d = d.getChildContext();
        for (var z in d) if (!(z in T)) throw Error(b(108, j(v) || "Unknown", z));
        v = Ft({}, D, d);
      }
      s.legacyContext = v, st(i, s, E), s.legacyContext = D;
    } else st(i, s, E);
  }
  function Do(i, s) {
    if (i && i.defaultProps) {
      s = Ft({}, s), i = i.defaultProps;
      for (var d in i) s[d] === void 0 && (s[d] = i[d]);
      return s;
    }
    return s;
  }
  function Cn(i, s, d, v, E) {
    if (typeof d == "function") if (d.prototype && d.prototype.isReactComponent) {
      E = ae(d, s.legacyContext);
      var T = d.contextType;
      T = new d(v, typeof T == "object" && T !== null ? T._currentValue : E), er(T, d, v, E), _o(i, s, T, d);
    } else {
      T = ae(d, s.legacyContext), E = Fo(i, s, d, v, T);
      var D = pr !== 0;
      if (typeof E == "object" && E !== null && typeof E.render == "function" && E.$$typeof === void 0) er(E, d, v, T), _o(i, s, E, d);
      else if (D) {
        v = s.treeContext, s.treeContext = zt(v, 1, 0);
        try {
          st(i, s, E);
        } finally {
          s.treeContext = v;
        }
      } else st(i, s, E);
    }
    else if (typeof d == "string") {
      switch (E = s.blockedSegment, T = Br(E.chunks, d, v, i.responseState, E.formatContext), E.lastPushedText = !1, D = E.formatContext, E.formatContext = H(D, d, v), En(i, s, T), E.formatContext = D, d) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          E.chunks.push(Ur, y(d), jr);
      }
      E.lastPushedText = !1;
    } else {
      switch (d) {
        case C:
        case m:
        case Rr:
        case ft:
        case ur:
          st(i, s, v.children);
          return;
        case lt:
          st(i, s, v.children);
          return;
        case h:
          throw Error(b(343));
        case Je:
          e: {
            d = s.blockedBoundary, E = s.blockedSegment, T = v.fallback, v = v.children, D = /* @__PURE__ */ new Set();
            var z = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: D, errorDigest: null }, ie = Fr(i, E.chunks.length, z, E.formatContext, !1, !1);
            E.children.push(ie), E.lastPushedText = !1;
            var ye = Fr(i, 0, null, E.formatContext, !1, !1);
            ye.parentFlushed = !0, s.blockedBoundary = z, s.blockedSegment = ye;
            try {
              if (En(
                i,
                s,
                v
              ), ye.lastPushedText && ye.textEmbedded && ye.chunks.push(Q), ye.status = 1, Rn(z, ye), z.pendingTasks === 0) break e;
            } catch (me) {
              ye.status = 4, z.forceClientRender = !0, z.errorDigest = Jr(i, me);
            } finally {
              s.blockedBoundary = d, s.blockedSegment = E;
            }
            s = Jn(i, T, d, ie, D, s.legacyContext, s.context, s.treeContext), i.pingedTasks.push(s);
          }
          return;
      }
      if (typeof d == "object" && d !== null) switch (d.$$typeof) {
        case Ir:
          if (v = Fo(i, s, d.render, v, E), pr !== 0) {
            d = s.treeContext, s.treeContext = zt(d, 1, 0);
            try {
              st(i, s, v);
            } finally {
              s.treeContext = d;
            }
          } else st(i, s, v);
          return;
        case a:
          d = d.type, v = Do(d, v), Cn(i, s, d, v, E);
          return;
        case _t:
          if (E = v.children, d = d._context, v = v.value, T = d._currentValue, d._currentValue = v, D = ee, ee = v = { parent: D, depth: D === null ? 0 : D.depth + 1, context: d, parentValue: T, value: v }, s.context = v, st(i, s, E), i = ee, i === null) throw Error(b(403));
          v = i.parentValue, i.context._currentValue = v === x ? i.context._defaultValue : v, i = ee = i.parent, s.context = i;
          return;
        case tt:
          v = v.children, v = v(d._currentValue), st(i, s, v);
          return;
        case u:
          E = d._init, d = E(d._payload), v = Do(d, v), Cn(i, s, d, v, void 0);
          return;
      }
      throw Error(b(
        130,
        d == null ? d : typeof d,
        ""
      ));
    }
  }
  function st(i, s, d) {
    if (s.node = d, typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case et:
          Cn(i, s, d.type, d.props, d.ref);
          return;
        case Kt:
          throw Error(b(257));
        case u:
          var v = d._init;
          d = v(d._payload), st(i, s, d);
          return;
      }
      if (we(d)) {
        Oo(i, s, d);
        return;
      }
      if (d === null || typeof d != "object" ? v = null : (v = F && d[F] || d["@@iterator"], v = typeof v == "function" ? v : null), v && (v = v.call(d))) {
        if (d = v.next(), !d.done) {
          var E = [];
          do
            E.push(d.value), d = v.next();
          while (!d.done);
          Oo(i, s, E);
        }
        return;
      }
      throw i = Object.prototype.toString.call(d), Error(b(31, i === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : i));
    }
    typeof d == "string" ? (v = s.blockedSegment, v.lastPushedText = pe(s.blockedSegment.chunks, d, i.responseState, v.lastPushedText)) : typeof d == "number" && (v = s.blockedSegment, v.lastPushedText = pe(s.blockedSegment.chunks, "" + d, i.responseState, v.lastPushedText));
  }
  function Oo(i, s, d) {
    for (var v = d.length, E = 0; E < v; E++) {
      var T = s.treeContext;
      s.treeContext = zt(T, v, E);
      try {
        En(i, s, d[E]);
      } finally {
        s.treeContext = T;
      }
    }
  }
  function En(i, s, d) {
    var v = s.blockedSegment.formatContext, E = s.legacyContext, T = s.context;
    try {
      return st(i, s, d);
    } catch (ie) {
      if (Xr(), typeof ie == "object" && ie !== null && typeof ie.then == "function") {
        d = ie;
        var D = s.blockedSegment, z = Fr(i, D.chunks.length, null, D.formatContext, D.lastPushedText, !0);
        D.children.push(z), D.lastPushedText = !1, i = Jn(i, s.node, s.blockedBoundary, z, s.abortSet, s.legacyContext, s.context, s.treeContext).ping, d.then(i, i), s.blockedSegment.formatContext = v, s.legacyContext = E, s.context = T, Dt(T);
      } else throw s.blockedSegment.formatContext = v, s.legacyContext = E, s.context = T, Dt(T), ie;
    }
  }
  function Da(i) {
    var s = i.blockedBoundary;
    i = i.blockedSegment, i.status = 3, Lo(this, s, i);
  }
  function Mo(i, s, d) {
    var v = i.blockedBoundary;
    i.blockedSegment.status = 3, v === null ? (s.allPendingTasks--, s.status !== 2 && (s.status = 2, s.destination !== null && s.destination.close())) : (v.pendingTasks--, v.forceClientRender || (v.forceClientRender = !0, i = d === void 0 ? Error(b(432)) : d, v.errorDigest = s.onError(i), v.parentFlushed && s.clientRenderedBoundaries.push(v)), v.fallbackAbortableTasks.forEach(function(E) {
      return Mo(E, s, d);
    }), v.fallbackAbortableTasks.clear(), s.allPendingTasks--, s.allPendingTasks === 0 && (v = s.onAllReady, v()));
  }
  function Rn(i, s) {
    if (s.chunks.length === 0 && s.children.length === 1 && s.children[0].boundary === null) {
      var d = s.children[0];
      d.id = s.id, d.parentFlushed = !0, d.status === 1 && Rn(i, d);
    } else i.completedSegments.push(s);
  }
  function Lo(i, s, d) {
    if (s === null) {
      if (d.parentFlushed) {
        if (i.completedRootSegment !== null) throw Error(b(389));
        i.completedRootSegment = d;
      }
      i.pendingRootTasks--, i.pendingRootTasks === 0 && (i.onShellError = Ar, s = i.onShellReady, s());
    } else s.pendingTasks--, s.forceClientRender || (s.pendingTasks === 0 ? (d.parentFlushed && d.status === 1 && Rn(s, d), s.parentFlushed && i.completedBoundaries.push(s), s.fallbackAbortableTasks.forEach(Da, i), s.fallbackAbortableTasks.clear()) : d.parentFlushed && d.status === 1 && (Rn(s, d), s.completedSegments.length === 1 && s.parentFlushed && i.partialBoundaries.push(s)));
    i.allPendingTasks--, i.allPendingTasks === 0 && (i = i.onAllReady, i());
  }
  function Bo(i) {
    if (i.status !== 2) {
      var s = ee, d = Xn.current;
      Xn.current = Ao;
      var v = Zr;
      Zr = i.responseState;
      try {
        var E = i.pingedTasks, T;
        for (T = 0; T < E.length; T++) {
          var D = E[T], z = i, ie = D.blockedSegment;
          if (ie.status === 0) {
            Dt(D.context);
            try {
              st(z, D, D.node), ie.lastPushedText && ie.textEmbedded && ie.chunks.push(Q), D.abortSet.delete(D), ie.status = 1, Lo(z, D.blockedBoundary, ie);
            } catch (yt) {
              if (Xr(), typeof yt == "object" && yt !== null && typeof yt.then == "function") {
                var ye = D.ping;
                yt.then(ye, ye);
              } else {
                D.abortSet.delete(D), ie.status = 4;
                var me = D.blockedBoundary, Me = yt, ut = Jr(z, Me);
                if (me === null ? Tn(z, Me) : (me.pendingTasks--, me.forceClientRender || (me.forceClientRender = !0, me.errorDigest = ut, me.parentFlushed && z.clientRenderedBoundaries.push(me))), z.allPendingTasks--, z.allPendingTasks === 0) {
                  var gt = z.onAllReady;
                  gt();
                }
              }
            } finally {
            }
          }
        }
        E.splice(0, T), i.destination !== null && Qn(i, i.destination);
      } catch (yt) {
        Jr(i, yt), Tn(i, yt);
      } finally {
        Zr = v, Xn.current = d, d === Ao && Dt(s);
      }
    }
  }
  function In(i, s, d) {
    switch (d.parentFlushed = !0, d.status) {
      case 0:
        var v = d.id = i.nextSegmentId++;
        return d.lastPushedText = !1, d.textEmbedded = !1, i = i.responseState, f(s, Ne), f(s, i.placeholderPrefix), i = y(v.toString(16)), f(s, i), _(s, zr);
      case 1:
        d.status = 2;
        var E = !0;
        v = d.chunks;
        var T = 0;
        d = d.children;
        for (var D = 0; D < d.length; D++) {
          for (E = d[D]; T < E.index; T++) f(s, v[T]);
          E = Pn(i, s, E);
        }
        for (; T < v.length - 1; T++) f(s, v[T]);
        return T < v.length && (E = _(s, v[T])), E;
      default:
        throw Error(b(390));
    }
  }
  function Pn(i, s, d) {
    var v = d.boundary;
    if (v === null) return In(i, s, d);
    if (v.parentFlushed = !0, v.forceClientRender) v = v.errorDigest, _(s, wr), f(s, Wr), v && (f(s, $r), f(s, y(ne(v))), f(s, Nt)), _(s, hn), In(i, s, d);
    else if (0 < v.pendingTasks) {
      v.rootSegmentID = i.nextSegmentId++, 0 < v.completedSegments.length && i.partialBoundaries.push(v);
      var E = i.responseState, T = E.nextSuspenseID++;
      E = w(E.boundaryPrefix + T.toString(16)), v = v.id = E, qe(s, i.responseState, v), In(i, s, d);
    } else if (v.byteSize > i.progressiveChunkSize) v.rootSegmentID = i.nextSegmentId++, i.completedBoundaries.push(v), qe(s, i.responseState, v.id), In(i, s, d);
    else {
      if (_(s, dn), d = v.completedSegments, d.length !== 1) throw Error(b(391));
      Pn(i, s, d[0]);
    }
    return _(s, $n);
  }
  function Uo(i, s, d) {
    return at(s, i.responseState, d.formatContext, d.id), Pn(i, s, d), Rt(s, d.formatContext);
  }
  function jo(i, s, d) {
    for (var v = d.completedSegments, E = 0; E < v.length; E++) zo(i, s, d, v[E]);
    if (v.length = 0, i = i.responseState, v = d.id, d = d.rootSegmentID, f(s, i.startInlineScript), i.sentCompleteBoundaryFunction ? f(s, it) : (i.sentCompleteBoundaryFunction = !0, f(s, Jt)), v === null) throw Error(b(395));
    return d = y(d.toString(16)), f(s, v), f(s, mn), f(s, i.segmentPrefix), f(s, d), _(s, gn);
  }
  function zo(i, s, d, v) {
    if (v.status === 2) return !0;
    var E = v.id;
    if (E === -1) {
      if ((v.id = d.rootSegmentID) === -1) throw Error(b(392));
      return Uo(i, s, v);
    }
    return Uo(i, s, v), i = i.responseState, f(s, i.startInlineScript), i.sentCompleteSegmentFunction ? f(s, Xt) : (i.sentCompleteSegmentFunction = !0, f(s, Cr)), f(s, i.segmentPrefix), E = y(E.toString(16)), f(s, E), f(s, Zt), f(s, i.placeholderPrefix), f(s, E), _(s, It);
  }
  function Qn(i, s) {
    R = new Uint8Array(512), L = 0;
    try {
      var d = i.completedRootSegment;
      if (d !== null && i.pendingRootTasks === 0) {
        Pn(i, s, d), i.completedRootSegment = null;
        var v = i.responseState.bootstrapChunks;
        for (d = 0; d < v.length - 1; d++) f(s, v[d]);
        d < v.length && _(s, v[d]);
      }
      var E = i.clientRenderedBoundaries, T;
      for (T = 0; T < E.length; T++) {
        var D = E[T];
        v = s;
        var z = i.responseState, ie = D.id, ye = D.errorDigest, me = D.errorMessage, Me = D.errorComponentStack;
        if (f(v, z.startInlineScript), z.sentClientRenderFunction ? f(v, Ye) : (z.sentClientRenderFunction = !0, f(
          v,
          jt
        )), ie === null) throw Error(b(395));
        f(v, ie), f(v, Pt), (ye || me || Me) && (f(v, Qt), f(v, y(vt(ye || "")))), (me || Me) && (f(v, Qt), f(v, y(vt(me || "")))), Me && (f(v, Qt), f(v, y(vt(Me)))), _(v, At);
      }
      E.splice(0, T);
      var ut = i.completedBoundaries;
      for (T = 0; T < ut.length; T++) jo(i, s, ut[T]);
      ut.splice(0, T), $(s), R = new Uint8Array(512), L = 0;
      var gt = i.partialBoundaries;
      for (T = 0; T < gt.length; T++) {
        var yt = gt[T];
        e: {
          E = i, D = s;
          var An = yt.completedSegments;
          for (z = 0; z < An.length; z++) if (!zo(
            E,
            D,
            yt,
            An[z]
          )) {
            z++, An.splice(0, z);
            var Wo = !1;
            break e;
          }
          An.splice(0, z), Wo = !0;
        }
        if (!Wo) {
          i.destination = null, T++, gt.splice(0, T);
          return;
        }
      }
      gt.splice(0, T);
      var Qr = i.completedBoundaries;
      for (T = 0; T < Qr.length; T++) jo(i, s, Qr[T]);
      Qr.splice(0, T);
    } finally {
      $(s), i.allPendingTasks === 0 && i.pingedTasks.length === 0 && i.clientRenderedBoundaries.length === 0 && i.completedBoundaries.length === 0 && s.close();
    }
  }
  function Ho(i, s) {
    try {
      var d = i.abortableTasks;
      d.forEach(function(v) {
        return Mo(v, i, s);
      }), d.clear(), i.destination !== null && Qn(i, i.destination);
    } catch (v) {
      Jr(i, v), Tn(i, v);
    }
  }
  return ol.renderToReadableStream = function(i, s) {
    return new Promise(function(d, v) {
      var E, T, D = new Promise(function(me, Me) {
        T = me, E = Me;
      }), z = Zn(i, je(s ? s.identifierPrefix : void 0, s ? s.nonce : void 0, s ? s.bootstrapScriptContent : void 0, s ? s.bootstrapScripts : void 0, s ? s.bootstrapModules : void 0), U(s ? s.namespaceURI : void 0), s ? s.progressiveChunkSize : void 0, s ? s.onError : void 0, T, function() {
        var me = new ReadableStream({ type: "bytes", pull: function(Me) {
          if (z.status === 1) z.status = 2, X(Me, z.fatalError);
          else if (z.status !== 2 && z.destination === null) {
            z.destination = Me;
            try {
              Qn(z, Me);
            } catch (ut) {
              Jr(z, ut), Tn(z, ut);
            }
          }
        }, cancel: function() {
          Ho(z);
        } }, { highWaterMark: 0 });
        me.allReady = D, d(me);
      }, function(me) {
        D.catch(function() {
        }), v(me);
      }, E);
      if (s && s.signal) {
        var ie = s.signal, ye = function() {
          Ho(z, ie.reason), ie.removeEventListener("abort", ye);
        };
        ie.addEventListener("abort", ye);
      }
      Bo(z);
    });
  }, ol.version = "18.3.1", ol;
}
var Eo = {};
/**
 * @license React
 * react-dom-server-legacy.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gs;
function Gs() {
  return gs || (gs = 1, process.env.NODE_ENV !== "production" && function() {
    var I = br, b = "18.3.1", R = I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function L(e) {
      {
        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          r[o - 1] = arguments[o];
        _("warn", e, r);
      }
    }
    function f(e) {
      {
        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          r[o - 1] = arguments[o];
        _("error", e, r);
      }
    }
    function _(e, t, r) {
      {
        var o = R.ReactDebugCurrentFrame, l = o.getStackAddendum();
        l !== "" && (t += "%s", r = r.concat([l]));
        var c = r.map(function(p) {
          return String(p);
        });
        c.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, c);
      }
    }
    function $(e) {
      e();
    }
    function W(e) {
    }
    function y(e, t) {
      w(e, t);
    }
    function w(e, t) {
      return e.push(t);
    }
    function X(e) {
    }
    function A(e) {
      e.push(null);
    }
    function Y(e) {
      return e;
    }
    function se(e) {
      return e;
    }
    function G(e, t) {
      e.destroy(t);
    }
    function ce(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, r = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return r;
      }
    }
    function P(e) {
      try {
        return S(e), !1;
      } catch {
        return !0;
      }
    }
    function S(e) {
      return "" + e;
    }
    function K(e, t) {
      if (P(e))
        return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ce(e)), S(e);
    }
    function J(e, t) {
      if (P(e))
        return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ce(e)), S(e);
    }
    function re(e) {
      if (P(e))
        return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", ce(e)), S(e);
    }
    var M = Object.prototype.hasOwnProperty, le = 0, ne = 1, Ae = 2, fe = 3, we = 4, Pe = 5, Se = 6, Fe = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Le = Fe + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", We = new RegExp("^[" + Fe + "][" + Le + "]*$"), be = {}, Ie = {};
    function je(e) {
      return M.call(Ie, e) ? !0 : M.call(be, e) ? !1 : We.test(e) ? (Ie[e] = !0, !0) : (be[e] = !0, f("Invalid attribute name: `%s`", e), !1);
    }
    function ze(e, t, r, o) {
      if (r !== null && r.type === le)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (r !== null)
            return !r.acceptsBooleans;
          var l = e.toLowerCase().slice(0, 5);
          return l !== "data-" && l !== "aria-";
        }
        default:
          return !1;
      }
    }
    function U(e) {
      return Q.hasOwnProperty(e) ? Q[e] : null;
    }
    function H(e, t, r, o, l, c, p) {
      this.acceptsBooleans = t === Ae || t === fe || t === we, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = p;
    }
    var Q = {}, pe = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    pe.forEach(function(e) {
      Q[e] = new H(
        e,
        le,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], r = e[1];
      Q[t] = new H(
        t,
        ne,
        !1,
        // mustUseProperty
        r,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      Q[e] = new H(
        e,
        Ae,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      Q[e] = new H(
        e,
        Ae,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      Q[e] = new H(
        e,
        fe,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Q[e] = new H(
        e,
        fe,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Q[e] = new H(
        e,
        we,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Q[e] = new H(
        e,
        Se,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      Q[e] = new H(
        e,
        Pe,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var oe = /[\-\:]([a-z])/g, te = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(oe, te);
      Q[t] = new H(
        t,
        ne,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(oe, te);
      Q[t] = new H(
        t,
        ne,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(oe, te);
      Q[t] = new H(
        t,
        ne,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Q[e] = new H(
        e,
        ne,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Z = "xlinkHref";
    Q[Z] = new H(
      "xlinkHref",
      ne,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Q[e] = new H(
        e,
        ne,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var de = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function ge(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var he = ["Webkit", "ms", "Moz", "O"];
    Object.keys(de).forEach(function(e) {
      he.forEach(function(t) {
        de[ge(t, e)] = de[e];
      });
    });
    var ve = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Te(e, t) {
      ve[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function N(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Ee = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, $e = {}, Bt = new RegExp("^(aria)-[" + Le + "]*$"), ar = new RegExp("^(aria)[A-Z][" + Le + "]*$");
    function cn(e, t) {
      {
        if (M.call($e, t) && $e[t])
          return !0;
        if (ar.test(t)) {
          var r = "aria-" + t.slice(4).toLowerCase(), o = Ee.hasOwnProperty(r) ? r : null;
          if (o == null)
            return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), $e[t] = !0, !0;
          if (t !== o)
            return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), $e[t] = !0, !0;
        }
        if (Bt.test(t)) {
          var l = t.toLowerCase(), c = Ee.hasOwnProperty(l) ? l : null;
          if (c == null)
            return $e[t] = !0, !1;
          if (t !== c)
            return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, c), $e[t] = !0, !0;
        }
      }
      return !0;
    }
    function pt(e, t) {
      {
        var r = [];
        for (var o in t) {
          var l = cn(e, o);
          l || r.push(o);
        }
        var c = r.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        r.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", c, e) : r.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", c, e);
      }
    }
    function ir(e, t) {
      N(e, t) || pt(e, t);
    }
    var lr = !1;
    function fn(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !lr && (lr = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var ht = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, Qe = function() {
    };
    {
      var Ge = {}, Br = /^on./, Ur = /^on[^A-Z]/, jr = new RegExp("^(aria)-[" + Le + "]*$"), Ne = new RegExp("^(aria)[A-Z][" + Le + "]*$");
      Qe = function(e, t, r, o) {
        if (M.call(Ge, t) && Ge[t])
          return !0;
        var l = t.toLowerCase();
        if (l === "onfocusin" || l === "onfocusout")
          return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Ge[t] = !0, !0;
        if (o != null) {
          var c = o.registrationNameDependencies, p = o.possibleRegistrationNames;
          if (c.hasOwnProperty(t))
            return !0;
          var g = p.hasOwnProperty(l) ? p[l] : null;
          if (g != null)
            return f("Invalid event handler property `%s`. Did you mean `%s`?", t, g), Ge[t] = !0, !0;
          if (Br.test(t))
            return f("Unknown event handler property `%s`. It will be ignored.", t), Ge[t] = !0, !0;
        } else if (Br.test(t))
          return Ur.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Ge[t] = !0, !0;
        if (jr.test(t) || Ne.test(t))
          return !0;
        if (l === "innerhtml")
          return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Ge[t] = !0, !0;
        if (l === "aria")
          return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Ge[t] = !0, !0;
        if (l === "is" && r !== null && r !== void 0 && typeof r != "string")
          return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof r), Ge[t] = !0, !0;
        if (typeof r == "number" && isNaN(r))
          return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Ge[t] = !0, !0;
        var k = U(t), O = k !== null && k.type === le;
        if (ht.hasOwnProperty(l)) {
          var B = ht[l];
          if (B !== t)
            return f("Invalid DOM property `%s`. Did you mean `%s`?", t, B), Ge[t] = !0, !0;
        } else if (!O && t !== l)
          return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, l), Ge[t] = !0, !0;
        return typeof r == "boolean" && ze(t, r, k) ? (r ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', r, t, t, r, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', r, t, t, r, t, t, t), Ge[t] = !0, !0) : O ? !0 : ze(t, r, k) ? (Ge[t] = !0, !1) : ((r === "false" || r === "true") && k !== null && k.type === fe && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", r, t, r === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, r), Ge[t] = !0), !0);
      };
    }
    var zr = function(e, t, r) {
      {
        var o = [];
        for (var l in t) {
          var c = Qe(e, l, t[l], r);
          c || o.push(l);
        }
        var p = o.map(function(g) {
          return "`" + g + "`";
        }).join(", ");
        o.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", p, e) : o.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", p, e);
      }
    };
    function dn(e, t, r) {
      N(e, t) || zr(e, t, r);
    }
    var pn = function() {
    };
    {
      var Hr = /^(?:webkit|moz|o)[A-Z]/, wr = /^-ms-/, $n = /-(.)/g, Wr = /;\s*$/, Nt = {}, $r = {}, hn = !1, qe = !1, Tt = function(e) {
        return e.replace($n, function(t, r) {
          return r.toUpperCase();
        });
      }, Vt = function(e) {
        Nt.hasOwnProperty(e) && Nt[e] || (Nt[e] = !0, f(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Tt(e.replace(wr, "ms-"))
        ));
      }, Re = function(e) {
        Nt.hasOwnProperty(e) && Nt[e] || (Nt[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Yt = function(e, t) {
        $r.hasOwnProperty(t) && $r[t] || ($r[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Wr, "")));
      }, xr = function(e, t) {
        hn || (hn = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
      }, sr = function(e, t) {
        qe || (qe = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      pn = function(e, t) {
        e.indexOf("-") > -1 ? Vt(e) : Hr.test(e) ? Re(e) : Wr.test(t) && Yt(e, t), typeof t == "number" && (isNaN(t) ? xr(e, t) : isFinite(t) || sr(e, t));
      };
    }
    var Ct = pn, kr = /["'&<>]/;
    function Ut(e) {
      re(e);
      var t = "" + e, r = kr.exec(t);
      if (!r)
        return t;
      var o, l = "", c, p = 0;
      for (c = r.index; c < t.length; c++) {
        switch (t.charCodeAt(c)) {
          case 34:
            o = "&quot;";
            break;
          case 38:
            o = "&amp;";
            break;
          case 39:
            o = "&#x27;";
            break;
          case 60:
            o = "&lt;";
            break;
          case 62:
            o = "&gt;";
            break;
          default:
            continue;
        }
        p !== c && (l += t.substring(p, c)), p = c + 1, l += o;
      }
      return p !== c ? l + t.substring(p, c) : l;
    }
    function Ze(e) {
      return typeof e == "boolean" || typeof e == "number" ? "" + e : Ut(e);
    }
    var Nr = /([A-Z])/g, Vr = /^ms-/;
    function vn(e) {
      return e.replace(Nr, "-$1").toLowerCase().replace(Vr, "-ms-");
    }
    var Ve = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Yr = !1;
    function Nn(e) {
      !Yr && Ve.test(e) && (Yr = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    var Vn = Array.isArray;
    function Et(e) {
      return Vn(e);
    }
    var Gr = "<script>";
    function Tr(e, t, r, o, l) {
      var c = e === void 0 ? "" : e, p = Gr, g = [];
      return {
        bootstrapChunks: g,
        startInlineScript: p,
        placeholderPrefix: c + "P:",
        segmentPrefix: c + "S:",
        boundaryPrefix: c + "B:",
        idPrefix: c,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: !1,
        sentCompleteBoundaryFunction: !1,
        sentClientRenderFunction: !1
      };
    }
    var Gt = 0, at = 1, Rt = 2, Cr = 3, Xt = 4, Zt = 5, It = 6, Jt = 7;
    function it(e, t) {
      return {
        insertionMode: e,
        selectedValue: t
      };
    }
    function mn(e, t, r) {
      switch (t) {
        case "select":
          return it(at, r.value != null ? r.value : r.defaultValue);
        case "svg":
          return it(Rt, null);
        case "math":
          return it(Cr, null);
        case "foreignObject":
          return it(at, null);
        case "table":
          return it(Xt, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return it(Zt, null);
        case "colgroup":
          return it(Jt, null);
        case "tr":
          return it(It, null);
      }
      return e.insertionMode >= Xt || e.insertionMode === Gt ? it(at, null) : e;
    }
    var gn = null;
    function jt(e) {
      var t = e.nextSuspenseID++;
      return e.boundaryPrefix + t.toString(16);
    }
    function Ye(e, t, r) {
      var o = e.idPrefix, l = ":" + o + "R" + t;
      return r > 0 && (l += "H" + r.toString(32)), l + ":";
    }
    function Pt(e) {
      return Ze(e);
    }
    var At = "<!-- -->";
    function Qt(e, t, r, o) {
      return t === "" ? o : (o && e.push(At), e.push(Pt(t)), !0);
    }
    function Er(e, t, r, o) {
      r && o && e.push(At);
    }
    var vt = /* @__PURE__ */ new Map();
    function Ft(e) {
      var t = vt.get(e);
      if (t !== void 0)
        return t;
      var r = Ze(vn(e));
      return vt.set(e, r), r;
    }
    var et = ' style="', Kt = ":", ur = ";";
    function Rr(e, t, r) {
      if (typeof r != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      var o = !0;
      for (var l in r)
        if (M.call(r, l)) {
          var c = r[l];
          if (!(c == null || typeof c == "boolean" || c === "")) {
            var p = void 0, g = void 0, k = l.indexOf("--") === 0;
            k ? (p = Ze(l), J(c, l), g = Ze(("" + c).trim())) : (Ct(l, c), p = Ft(l), typeof c == "number" ? c !== 0 && !M.call(de, l) ? g = c + "px" : g = "" + c : (J(c, l), g = Ze(("" + c).trim()))), o ? (o = !1, e.push(et, p, Kt, g)) : e.push(ur, p, Kt, g);
          }
        }
      o || e.push(tt);
    }
    var ft = " ", _t = '="', tt = '"', Ir = '=""';
    function Je(e, t, r, o) {
      switch (r) {
        case "style": {
          Rr(e, t, o);
          return;
        }
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (
        // shouldIgnoreAttribute
        // We have already filtered out null/undefined and reserved words.
        !(r.length > 2 && (r[0] === "o" || r[0] === "O") && (r[1] === "n" || r[1] === "N"))
      ) {
        var l = U(r);
        if (l !== null) {
          switch (typeof o) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!l.acceptsBooleans)
                return;
          }
          var c = l.attributeName, p = c;
          switch (l.type) {
            case fe:
              o && e.push(ft, p, Ir);
              return;
            case we:
              o === !0 ? e.push(ft, p, Ir) : o === !1 || e.push(ft, p, _t, Ze(o), tt);
              return;
            case Pe:
              isNaN(o) || e.push(ft, p, _t, Ze(o), tt);
              break;
            case Se:
              !isNaN(o) && o >= 1 && e.push(ft, p, _t, Ze(o), tt);
              break;
            default:
              l.sanitizeURL && (K(o, c), o = "" + o, Nn(o)), e.push(ft, p, _t, Ze(o), tt);
          }
        } else if (je(r)) {
          switch (typeof o) {
            case "function":
            case "symbol":
              return;
            case "boolean": {
              var g = r.toLowerCase().slice(0, 5);
              if (g !== "data-" && g !== "aria-")
                return;
            }
          }
          e.push(ft, r, _t, Ze(o), tt);
        }
      }
    }
    var lt = ">", a = "/>";
    function u(e, t, r) {
      if (t != null) {
        if (r != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t != "object" || !("__html" in t))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        var o = t.__html;
        o != null && (re(o), e.push("" + o));
      }
    }
    var h = !1, m = !1, C = !1, x = !1, F = !1, j = !1, q = !1;
    function ae(e, t) {
      {
        var r = e[t];
        if (r != null) {
          var o = Et(r);
          e.multiple && !o ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.", t) : !e.multiple && o && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", t);
        }
      }
    }
    function ee(e, t, r) {
      Te("select", t), ae(t, "value"), ae(t, "defaultValue"), t.value !== void 0 && t.defaultValue !== void 0 && !C && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), C = !0), e.push(Ot("select"));
      var o = null, l = null;
      for (var c in t)
        if (M.call(t, c)) {
          var p = t[c];
          if (p == null)
            continue;
          switch (c) {
            case "children":
              o = p;
              break;
            case "dangerouslySetInnerHTML":
              l = p;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              Je(e, r, c, p);
              break;
          }
        }
      return e.push(lt), u(e, l, o), o;
    }
    function xe(e) {
      var t = "";
      return I.Children.forEach(e, function(r) {
        r != null && (t += r, !F && typeof r != "string" && typeof r != "number" && (F = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }), t;
    }
    var rt = ' selected=""';
    function nt(e, t, r, o) {
      var l = o.selectedValue;
      e.push(Ot("option"));
      var c = null, p = null, g = null, k = null;
      for (var O in t)
        if (M.call(t, O)) {
          var B = t[O];
          if (B == null)
            continue;
          switch (O) {
            case "children":
              c = B;
              break;
            case "selected":
              g = B, q || (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), q = !0);
              break;
            case "dangerouslySetInnerHTML":
              k = B;
              break;
            case "value":
              p = B;
            default:
              Je(e, r, O, B);
              break;
          }
        }
      if (l != null) {
        var V;
        if (p !== null ? (K(p, "value"), V = "" + p) : (k !== null && (j || (j = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), V = xe(c)), Et(l))
          for (var ue = 0; ue < l.length; ue++) {
            K(l[ue], "value");
            var Ce = "" + l[ue];
            if (Ce === V) {
              e.push(rt);
              break;
            }
          }
        else
          K(l, "select.value"), "" + l === V && e.push(rt);
      } else g && e.push(rt);
      return e.push(lt), u(e, k, c), c;
    }
    function ot(e, t, r) {
      Te("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !m && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", t.type), m = !0), t.value !== void 0 && t.defaultValue !== void 0 && !h && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", t.type), h = !0), e.push(Ot("input"));
      var o = null, l = null, c = null, p = null;
      for (var g in t)
        if (M.call(t, g)) {
          var k = t[g];
          if (k == null)
            continue;
          switch (g) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "defaultChecked":
              p = k;
              break;
            case "defaultValue":
              l = k;
              break;
            case "checked":
              c = k;
              break;
            case "value":
              o = k;
              break;
            default:
              Je(e, r, g, k);
              break;
          }
        }
      return c !== null ? Je(e, r, "checked", c) : p !== null && Je(e, r, "checked", p), o !== null ? Je(e, r, "value", o) : l !== null && Je(e, r, "value", l), e.push(a), null;
    }
    function qt(e, t, r) {
      Te("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !x && (f("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), x = !0), e.push(Ot("textarea"));
      var o = null, l = null, c = null;
      for (var p in t)
        if (M.call(t, p)) {
          var g = t[p];
          if (g == null)
            continue;
          switch (p) {
            case "children":
              c = g;
              break;
            case "value":
              o = g;
              break;
            case "defaultValue":
              l = g;
              break;
            case "dangerouslySetInnerHTML":
              throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
            default:
              Je(e, r, p, g);
              break;
          }
        }
      if (o === null && l !== null && (o = l), e.push(lt), c != null) {
        if (f("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), o != null)
          throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
        if (Et(c)) {
          if (c.length > 1)
            throw new Error("<textarea> can only have at most one child.");
          re(c[0]), o = "" + c[0];
        }
        re(c), o = "" + c;
      }
      return typeof o == "string" && o[0] === `
` && e.push(fr), o !== null && (K(o, "value"), e.push(Pt("" + o))), null;
    }
    function Dt(e, t, r, o) {
      e.push(Ot(r));
      for (var l in t)
        if (M.call(t, l)) {
          var c = t[l];
          if (c == null)
            continue;
          switch (l) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw new Error(r + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            default:
              Je(e, o, l, c);
              break;
          }
        }
      return e.push(a), null;
    }
    function Pr(e, t, r) {
      e.push(Ot("menuitem"));
      for (var o in t)
        if (M.call(t, o)) {
          var l = t[o];
          if (l == null)
            continue;
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              Je(e, r, o, l);
              break;
          }
        }
      return e.push(lt), null;
    }
    function er(e, t, r) {
      e.push(Ot("title"));
      var o = null;
      for (var l in t)
        if (M.call(t, l)) {
          var c = t[l];
          if (c == null)
            continue;
          switch (l) {
            case "children":
              o = c;
              break;
            case "dangerouslySetInnerHTML":
              throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
            default:
              Je(e, r, l, c);
              break;
          }
        }
      e.push(lt);
      {
        var p = Array.isArray(o) && o.length < 2 ? o[0] || null : o;
        Array.isArray(o) && o.length > 1 ? f("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : p != null && p.$$typeof != null ? f("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : p != null && typeof p != "string" && typeof p != "number" && f("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
      }
      return o;
    }
    function cr(e, t, r, o) {
      e.push(Ot(r));
      var l = null, c = null;
      for (var p in t)
        if (M.call(t, p)) {
          var g = t[p];
          if (g == null)
            continue;
          switch (p) {
            case "children":
              l = g;
              break;
            case "dangerouslySetInnerHTML":
              c = g;
              break;
            default:
              Je(e, o, p, g);
              break;
          }
        }
      return e.push(lt), u(e, c, l), typeof l == "string" ? (e.push(Pt(l)), null) : l;
    }
    function zt(e, t, r, o) {
      e.push(Ot(r));
      var l = null, c = null;
      for (var p in t)
        if (M.call(t, p)) {
          var g = t[p];
          if (g == null)
            continue;
          switch (p) {
            case "children":
              l = g;
              break;
            case "dangerouslySetInnerHTML":
              c = g;
              break;
            case "style":
              Rr(e, o, g);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              je(p) && typeof g != "function" && typeof g != "symbol" && e.push(ft, p, _t, Ze(g), tt);
              break;
          }
        }
      return e.push(lt), u(e, c, l), l;
    }
    var fr = `
`;
    function Ra(e, t, r, o) {
      e.push(Ot(r));
      var l = null, c = null;
      for (var p in t)
        if (M.call(t, p)) {
          var g = t[p];
          if (g == null)
            continue;
          switch (p) {
            case "children":
              l = g;
              break;
            case "dangerouslySetInnerHTML":
              c = g;
              break;
            default:
              Je(e, o, p, g);
              break;
          }
        }
      if (e.push(lt), c != null) {
        if (l != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof c != "object" || !("__html" in c))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        var k = c.__html;
        k != null && (typeof k == "string" && k.length > 0 && k[0] === `
` ? e.push(fr, k) : (re(k), e.push("" + k)));
      }
      return typeof l == "string" && l[0] === `
` && e.push(fr), l;
    }
    var Ia = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, yn = /* @__PURE__ */ new Map();
    function Ot(e) {
      var t = yn.get(e);
      if (t === void 0) {
        if (!Ia.test(e))
          throw new Error("Invalid tag: " + e);
        t = "<" + e, yn.set(e, t);
      }
      return t;
    }
    var Pa = "<!DOCTYPE html>";
    function Ht(e, t, r, o, l) {
      switch (ir(t, r), fn(t, r), dn(t, r, null), !r.suppressContentEditableWarning && r.contentEditable && r.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), l.insertionMode !== Rt && l.insertionMode !== Cr && t.indexOf("-") === -1 && typeof r.is != "string" && t.toLowerCase() !== t && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", t), t) {
        case "select":
          return ee(e, r, o);
        case "option":
          return nt(e, r, o, l);
        case "textarea":
          return qt(e, r, o);
        case "input":
          return ot(e, r, o);
        case "menuitem":
          return Pr(e, r, o);
        case "title":
          return er(e, r, o);
        case "listing":
        case "pre":
          return Ra(e, r, t, o);
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          return Dt(e, r, t, o);
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return cr(e, r, t, o);
        case "html":
          return l.insertionMode === Gt && e.push(Pa), cr(e, r, t, o);
        default:
          return t.indexOf("-") === -1 && typeof r.is != "string" ? cr(e, r, t, o) : zt(e, r, t, o);
      }
    }
    var Yn = "</", bn = ">";
    function _e(e, t, r) {
      switch (t) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          e.push(Yn, t, bn);
      }
    }
    function dr(e, t) {
      for (var r = t.bootstrapChunks, o = 0; o < r.length - 1; o++)
        y(e, r[o]);
      return o < r.length ? w(e, r[o]) : !0;
    }
    var Sn = '<template id="', pr = '"></template>';
    function tr(e, t, r) {
      y(e, Sn), y(e, t.placeholderPrefix);
      var o = r.toString(16);
      return y(e, o), w(e, pr);
    }
    var wn = "<!--$-->", rr = '<!--$?--><template id="', mt = '"></template>', Gn = "<!--$!-->", Xr = "<!--/$-->", Io = "<template", xn = '"', Po = ' data-dgst="', Aa = ' data-msg="', Fa = ' data-stck="', kn = "></template>";
    function Ao(e, t) {
      return w(e, wn);
    }
    function Zr(e, t, r) {
      if (y(e, rr), r === null)
        throw new Error("An ID must have been assigned before we can complete the boundary.");
      return y(e, r), w(e, mt);
    }
    function Xn(e, t, r, o, l) {
      var c;
      return c = w(e, Gn), y(e, Io), r && (y(e, Po), y(e, Ze(r)), y(e, xn)), o && (y(e, Aa), y(e, Ze(o)), y(e, xn)), l && (y(e, Fa), y(e, Ze(l)), y(e, xn)), c = w(e, kn), c;
    }
    function _a(e, t) {
      return w(e, Xr);
    }
    function Ar(e, t) {
      return w(e, Xr);
    }
    function Zn(e, t) {
      return w(e, Xr);
    }
    var Jn = '<div hidden id="', Fr = '">', Jr = "</div>", Tn = '<svg aria-hidden="true" style="display:none" id="', Fo = '">', _o = "</svg>", Do = '<math aria-hidden="true" style="display:none" id="', Cn = '">', st = "</math>", Oo = '<table hidden id="', En = '">', Da = "</table>", Mo = '<table hidden><tbody id="', Rn = '">', Lo = "</tbody></table>", Bo = '<table hidden><tr id="', In = '">', Pn = "</tr></table>", Uo = '<table hidden><colgroup id="', jo = '">', zo = "</colgroup></table>";
    function Qn(e, t, r, o) {
      switch (r.insertionMode) {
        case Gt:
        case at:
          return y(e, Jn), y(e, t.segmentPrefix), y(e, o.toString(16)), w(e, Fr);
        case Rt:
          return y(e, Tn), y(e, t.segmentPrefix), y(e, o.toString(16)), w(e, Fo);
        case Cr:
          return y(e, Do), y(e, t.segmentPrefix), y(e, o.toString(16)), w(e, Cn);
        case Xt:
          return y(e, Oo), y(e, t.segmentPrefix), y(e, o.toString(16)), w(e, En);
        case Zt:
          return y(e, Mo), y(e, t.segmentPrefix), y(e, o.toString(16)), w(e, Rn);
        case It:
          return y(e, Bo), y(e, t.segmentPrefix), y(e, o.toString(16)), w(e, In);
        case Jt:
          return y(e, Uo), y(e, t.segmentPrefix), y(e, o.toString(16)), w(e, jo);
        default:
          throw new Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function Ho(e, t) {
      switch (t.insertionMode) {
        case Gt:
        case at:
          return w(e, Jr);
        case Rt:
          return w(e, _o);
        case Cr:
          return w(e, st);
        case Xt:
          return w(e, Da);
        case Zt:
          return w(e, Lo);
        case It:
          return w(e, Pn);
        case Jt:
          return w(e, zo);
        default:
          throw new Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var i = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}", s = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}', d = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}', v = i + ';$RS("', E = '$RS("', T = '","', D = '")<\/script>';
    function z(e, t, r) {
      y(e, t.startInlineScript), t.sentCompleteSegmentFunction ? y(e, E) : (t.sentCompleteSegmentFunction = !0, y(e, v)), y(e, t.segmentPrefix);
      var o = r.toString(16);
      return y(e, o), y(e, T), y(e, t.placeholderPrefix), y(e, o), w(e, D);
    }
    var ie = s + ';$RC("', ye = '$RC("', me = '","', Me = '")<\/script>';
    function ut(e, t, r, o) {
      if (y(e, t.startInlineScript), t.sentCompleteBoundaryFunction ? y(e, ye) : (t.sentCompleteBoundaryFunction = !0, y(e, ie)), r === null)
        throw new Error("An ID must have been assigned before we can complete the boundary.");
      var l = o.toString(16);
      return y(e, r), y(e, me), y(e, t.segmentPrefix), y(e, l), w(e, Me);
    }
    var gt = d + ';$RX("', yt = '$RX("', An = '"', Wo = ")<\/script>", Qr = ",";
    function ll(e, t, r, o, l, c) {
      if (y(e, t.startInlineScript), t.sentClientRenderFunction ? y(e, yt) : (t.sentClientRenderFunction = !0, y(e, gt)), r === null)
        throw new Error("An ID must have been assigned before we can complete the boundary.");
      return y(e, r), y(e, An), (o || l || c) && (y(e, Qr), y(e, Oa(o || ""))), (l || c) && (y(e, Qr), y(e, Oa(l || ""))), c && (y(e, Qr), y(e, Oa(c))), w(e, Wo);
    }
    var sl = /[<\u2028\u2029]/g;
    function Oa(e) {
      var t = JSON.stringify(e);
      return t.replace(sl, function(r) {
        switch (r) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    function ul(e, t) {
      var r = Tr(t);
      return {
        // Keep this in sync with ReactDOMServerFormatConfig
        bootstrapChunks: r.bootstrapChunks,
        startInlineScript: r.startInlineScript,
        placeholderPrefix: r.placeholderPrefix,
        segmentPrefix: r.segmentPrefix,
        boundaryPrefix: r.boundaryPrefix,
        idPrefix: r.idPrefix,
        nextSuspenseID: r.nextSuspenseID,
        sentCompleteSegmentFunction: r.sentCompleteSegmentFunction,
        sentCompleteBoundaryFunction: r.sentCompleteBoundaryFunction,
        sentClientRenderFunction: r.sentClientRenderFunction,
        // This is an extra field for the legacy renderer
        generateStaticMarkup: e
      };
    }
    function cl() {
      return {
        insertionMode: at,
        // We skip the root mode because we don't want to emit the DOCTYPE in legacy mode.
        selectedValue: null
      };
    }
    function yi(e, t, r, o) {
      return r.generateStaticMarkup ? (e.push(Ze(t)), !1) : Qt(e, t, r, o);
    }
    function bi(e, t, r, o) {
      if (!t.generateStaticMarkup)
        return Er(e, t, r, o);
    }
    function fl(e, t) {
      return t.generateStaticMarkup ? !0 : Ao(e);
    }
    function dl(e, t, r, o, l) {
      return t.generateStaticMarkup ? !0 : Xn(e, t, r, o, l);
    }
    function pl(e, t) {
      return t.generateStaticMarkup ? !0 : _a(e);
    }
    function hl(e, t) {
      return t.generateStaticMarkup ? !0 : Zn(e);
    }
    var dt = Object.assign, vl = Symbol.for("react.element"), Si = Symbol.for("react.portal"), $o = Symbol.for("react.fragment"), bt = Symbol.for("react.strict_mode"), wi = Symbol.for("react.profiler"), No = Symbol.for("react.provider"), Vo = Symbol.for("react.context"), Yo = Symbol.for("react.forward_ref"), Go = Symbol.for("react.suspense"), Kn = Symbol.for("react.suspense_list"), qn = Symbol.for("react.memo"), Fn = Symbol.for("react.lazy"), Ma = Symbol.for("react.scope"), La = Symbol.for("react.debug_trace_mode"), Ba = Symbol.for("react.legacy_hidden"), Xo = Symbol.for("react.default_value"), xi = Symbol.iterator, ml = "@@iterator";
    function gl(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = xi && e[xi] || e[ml];
      return typeof t == "function" ? t : null;
    }
    function yl(e, t, r) {
      var o = e.displayName;
      if (o)
        return o;
      var l = t.displayName || t.name || "";
      return l !== "" ? r + "(" + l + ")" : r;
    }
    function Ua(e) {
      return e.displayName || "Context";
    }
    function He(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case $o:
          return "Fragment";
        case Si:
          return "Portal";
        case wi:
          return "Profiler";
        case bt:
          return "StrictMode";
        case Go:
          return "Suspense";
        case Kn:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Vo:
            var t = e;
            return Ua(t) + ".Consumer";
          case No:
            var r = e;
            return Ua(r._context) + ".Provider";
          case Yo:
            return yl(e, e.render, "ForwardRef");
          case qn:
            var o = e.displayName || null;
            return o !== null ? o : He(e.type) || "Memo";
          case Fn: {
            var l = e, c = l._payload, p = l._init;
            try {
              return He(p(c));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var eo = 0, ki, ja, Ue, _n, za, Ha, Wa;
    function $a() {
    }
    $a.__reactDisabledLog = !0;
    function Ti() {
      {
        if (eo === 0) {
          ki = console.log, ja = console.info, Ue = console.warn, _n = console.error, za = console.group, Ha = console.groupCollapsed, Wa = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: $a,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        eo++;
      }
    }
    function Ci() {
      {
        if (eo--, eo === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: dt({}, e, {
              value: ki
            }),
            info: dt({}, e, {
              value: ja
            }),
            warn: dt({}, e, {
              value: Ue
            }),
            error: dt({}, e, {
              value: _n
            }),
            group: dt({}, e, {
              value: za
            }),
            groupCollapsed: dt({}, e, {
              value: Ha
            }),
            groupEnd: dt({}, e, {
              value: Wa
            })
          });
        }
        eo < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Zo = R.ReactCurrentDispatcher, Jo;
    function to(e, t, r) {
      {
        if (Jo === void 0)
          try {
            throw Error();
          } catch (l) {
            var o = l.stack.trim().match(/\n( *(at )?)/);
            Jo = o && o[1] || "";
          }
        return `
` + Jo + e;
      }
    }
    var Na = !1, Dn;
    {
      var Va = typeof WeakMap == "function" ? WeakMap : Map;
      Dn = new Va();
    }
    function Kr(e, t) {
      if (!e || Na)
        return "";
      {
        var r = Dn.get(e);
        if (r !== void 0)
          return r;
      }
      var o;
      Na = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var c;
      c = Zo.current, Zo.current = null, Ti();
      try {
        if (t) {
          var p = function() {
            throw Error();
          };
          if (Object.defineProperty(p.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(p, []);
            } catch (Ke) {
              o = Ke;
            }
            Reflect.construct(e, [], p);
          } else {
            try {
              p.call();
            } catch (Ke) {
              o = Ke;
            }
            e.call(p.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ke) {
            o = Ke;
          }
          e();
        }
      } catch (Ke) {
        if (Ke && o && typeof Ke.stack == "string") {
          for (var g = Ke.stack.split(`
`), k = o.stack.split(`
`), O = g.length - 1, B = k.length - 1; O >= 1 && B >= 0 && g[O] !== k[B]; )
            B--;
          for (; O >= 1 && B >= 0; O--, B--)
            if (g[O] !== k[B]) {
              if (O !== 1 || B !== 1)
                do
                  if (O--, B--, B < 0 || g[O] !== k[B]) {
                    var V = `
` + g[O].replace(" at new ", " at ");
                    return e.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", e.displayName)), typeof e == "function" && Dn.set(e, V), V;
                  }
                while (O >= 1 && B >= 0);
              break;
            }
        }
      } finally {
        Na = !1, Zo.current = c, Ci(), Error.prepareStackTrace = l;
      }
      var ue = e ? e.displayName || e.name : "", Ce = ue ? to(ue) : "";
      return typeof e == "function" && Dn.set(e, Ce), Ce;
    }
    function Ya(e, t, r) {
      return Kr(e, !0);
    }
    function ro(e, t, r) {
      return Kr(e, !1);
    }
    function bl(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function no(e, t, r) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Kr(e, bl(e));
      if (typeof e == "string")
        return to(e);
      switch (e) {
        case Go:
          return to("Suspense");
        case Kn:
          return to("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Yo:
            return ro(e.render);
          case qn:
            return no(e.type, t, r);
          case Fn: {
            var o = e, l = o._payload, c = o._init;
            try {
              return no(c(l), t, r);
            } catch {
            }
          }
        }
      return "";
    }
    var Ei = {}, Ga = R.ReactDebugCurrentFrame;
    function Qo(e) {
      if (e) {
        var t = e._owner, r = no(e.type, e._source, t ? t.type : null);
        Ga.setExtraStackFrame(r);
      } else
        Ga.setExtraStackFrame(null);
    }
    function Ko(e, t, r, o, l) {
      {
        var c = Function.call.bind(M);
        for (var p in e)
          if (c(e, p)) {
            var g = void 0;
            try {
              if (typeof e[p] != "function") {
                var k = Error((o || "React class") + ": " + r + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw k.name = "Invariant Violation", k;
              }
              g = e[p](t, p, o, r, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              g = O;
            }
            g && !(g instanceof Error) && (Qo(l), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", r, p, typeof g), Qo(null)), g instanceof Error && !(g.message in Ei) && (Ei[g.message] = !0, Qo(l), f("Failed %s type: %s", r, g.message), Qo(null));
          }
      }
    }
    var qo;
    qo = {};
    var oo = {};
    Object.freeze(oo);
    function ao(e, t) {
      {
        var r = e.contextTypes;
        if (!r)
          return oo;
        var o = {};
        for (var l in r)
          o[l] = t[l];
        {
          var c = He(e) || "Unknown";
          Ko(r, o, "context", c);
        }
        return o;
      }
    }
    function Ri(e, t, r, o) {
      {
        if (typeof e.getChildContext != "function") {
          {
            var l = He(t) || "Unknown";
            qo[l] || (qo[l] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", l, l));
          }
          return r;
        }
        var c = e.getChildContext();
        for (var p in c)
          if (!(p in o))
            throw new Error((He(t) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var g = He(t) || "Unknown";
          Ko(o, c, "child context", g);
        }
        return dt({}, r, c);
      }
    }
    var qr;
    qr = {};
    var ea = null, _r = null;
    function Xa(e) {
      e.context._currentValue2 = e.parentValue;
    }
    function en(e) {
      e.context._currentValue2 = e.value;
    }
    function ta(e, t) {
      if (e !== t) {
        Xa(e);
        var r = e.parent, o = t.parent;
        if (r === null) {
          if (o !== null)
            throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
          if (o === null)
            throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
          ta(r, o);
        }
        en(t);
      }
    }
    function Dr(e) {
      Xa(e);
      var t = e.parent;
      t !== null && Dr(t);
    }
    function ra(e) {
      var t = e.parent;
      t !== null && ra(t), en(e);
    }
    function na(e, t) {
      Xa(e);
      var r = e.parent;
      if (r === null)
        throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      r.depth === t.depth ? ta(r, t) : na(r, t);
    }
    function io(e, t) {
      var r = t.parent;
      if (r === null)
        throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      e.depth === r.depth ? ta(e, r) : io(e, r), en(t);
    }
    function lo(e) {
      var t = _r, r = e;
      t !== r && (t === null ? ra(r) : r === null ? Dr(t) : t.depth === r.depth ? ta(t, r) : t.depth > r.depth ? na(t, r) : io(t, r), _r = r);
    }
    function Ii(e, t) {
      var r;
      r = e._currentValue2, e._currentValue2 = t, e._currentRenderer2 !== void 0 && e._currentRenderer2 !== null && e._currentRenderer2 !== qr && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), e._currentRenderer2 = qr;
      var o = _r, l = {
        parent: o,
        depth: o === null ? 0 : o.depth + 1,
        context: e,
        parentValue: r,
        value: t
      };
      return _r = l, l;
    }
    function Pi(e) {
      var t = _r;
      if (t === null)
        throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
      t.context !== e && f("The parent context is not the expected context. This is probably a bug in React.");
      {
        var r = t.parentValue;
        r === Xo ? t.context._currentValue2 = t.context._defaultValue : t.context._currentValue2 = r, e._currentRenderer2 !== void 0 && e._currentRenderer2 !== null && e._currentRenderer2 !== qr && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), e._currentRenderer2 = qr;
      }
      return _r = t.parent;
    }
    function Ai() {
      return _r;
    }
    function Or(e) {
      var t = e._currentValue2;
      return t;
    }
    function Za(e) {
      return e._reactInternals;
    }
    function Sl(e, t) {
      e._reactInternals = t;
    }
    var Fi = {}, On = {}, so, Ja, oa, aa, ia, Mn, uo, co, la;
    {
      so = /* @__PURE__ */ new Set(), Ja = /* @__PURE__ */ new Set(), oa = /* @__PURE__ */ new Set(), uo = /* @__PURE__ */ new Set(), aa = /* @__PURE__ */ new Set(), co = /* @__PURE__ */ new Set(), la = /* @__PURE__ */ new Set();
      var fo = /* @__PURE__ */ new Set();
      Mn = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var r = t + "_" + e;
          fo.has(r) || (fo.add(r), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, ia = function(e, t) {
        if (t === void 0) {
          var r = He(e) || "Component";
          aa.has(r) || (aa.add(r), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", r));
        }
      };
    }
    function sa(e, t) {
      {
        var r = e.constructor, o = r && He(r) || "ReactClass", l = o + "." + t;
        if (Fi[l])
          return;
        f(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, t, t, o), Fi[l] = !0;
      }
    }
    var ua = {
      isMounted: function(e) {
        return !1;
      },
      enqueueSetState: function(e, t, r) {
        var o = Za(e);
        o.queue === null ? sa(e, "setState") : (o.queue.push(t), r != null && Mn(r, "setState"));
      },
      enqueueReplaceState: function(e, t, r) {
        var o = Za(e);
        o.replace = !0, o.queue = [t], r != null && Mn(r, "setState");
      },
      enqueueForceUpdate: function(e, t) {
        var r = Za(e);
        r.queue === null ? sa(e, "forceUpdate") : t != null && Mn(t, "setState");
      }
    };
    function Qa(e, t, r, o, l) {
      var c = r(l, o);
      ia(t, c);
      var p = c == null ? o : dt({}, o, c);
      return p;
    }
    function _i(e, t, r) {
      var o = oo, l = e.contextType;
      if ("contextType" in e) {
        var c = (
          // Allow null for conditional declaration
          l === null || l !== void 0 && l.$$typeof === Vo && l._context === void 0
        );
        if (!c && !la.has(e)) {
          la.add(e);
          var p = "";
          l === void 0 ? p = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? p = " However, it is set to a " + typeof l + "." : l.$$typeof === No ? p = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? p = " Did you accidentally pass the Context.Consumer instead?" : p = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", He(e) || "Component", p);
        }
      }
      typeof l == "object" && l !== null ? o = Or(l) : o = r;
      var g = new e(t, o);
      {
        if (typeof e.getDerivedStateFromProps == "function" && (g.state === null || g.state === void 0)) {
          var k = He(e) || "Component";
          so.has(k) || (so.add(k), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", k, g.state === null ? "null" : "undefined", k));
        }
        if (typeof e.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var O = null, B = null, V = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? B = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (B = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? V = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (V = "UNSAFE_componentWillUpdate"), O !== null || B !== null || V !== null) {
            var ue = He(e) || "Component", Ce = typeof e.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            oa.has(ue) || (oa.add(ue), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ue, Ce, O !== null ? `
  ` + O : "", B !== null ? `
  ` + B : "", V !== null ? `
  ` + V : ""));
          }
        }
      }
      return g;
    }
    function Di(e, t, r) {
      {
        var o = He(t) || "Component", l = e.render;
        l || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", o) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", o)), e.getInitialState && !e.getInitialState.isReactClassApproved && !e.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), e.getDefaultProps && !e.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), e.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", o), e.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), e.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", o), t.contextType && t.contextTypes && !co.has(t) && (co.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", o)), typeof e.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), t.prototype && t.prototype.isPureReactComponent && typeof e.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", He(t) || "A pure component"), typeof e.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof e.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof e.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof e.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o);
        var c = e.props !== r;
        e.props !== void 0 && c && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o, o), e.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof e.getSnapshotBeforeUpdate == "function" && typeof e.componentDidUpdate != "function" && !Ja.has(t) && (Ja.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", He(t))), typeof e.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof e.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o);
        var p = e.state;
        p && (typeof p != "object" || Et(p)) && f("%s.state: must be set to an object or null", o), typeof e.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o);
      }
    }
    function Oi(e, t) {
      var r = t.state;
      if (typeof t.componentWillMount == "function") {
        if (t.componentWillMount.__suppressDeprecationWarning !== !0) {
          var o = He(e) || "Unknown";
          On[o] || (L(
            // keep this warning in sync with ReactStrictModeWarning.js
            `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
            o
          ), On[o] = !0);
        }
        t.componentWillMount();
      }
      typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), r !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", He(e) || "Component"), ua.enqueueReplaceState(t, t.state, null));
    }
    function wl(e, t, r, o) {
      if (e.queue !== null && e.queue.length > 0) {
        var l = e.queue, c = e.replace;
        if (e.queue = null, e.replace = !1, c && l.length === 1)
          t.state = l[0];
        else {
          for (var p = c ? l[0] : t.state, g = !0, k = c ? 1 : 0; k < l.length; k++) {
            var O = l[k], B = typeof O == "function" ? O.call(t, p, r, o) : O;
            B != null && (g ? (g = !1, p = dt({}, p, B)) : dt(p, B));
          }
          t.state = p;
        }
      } else
        e.queue = null;
    }
    function Mi(e, t, r, o) {
      Di(e, t, r);
      var l = e.state !== void 0 ? e.state : null;
      e.updater = ua, e.props = r, e.state = l;
      var c = {
        queue: [],
        replace: !1
      };
      Sl(e, c);
      var p = t.contextType;
      if (typeof p == "object" && p !== null ? e.context = Or(p) : e.context = o, e.state === r) {
        var g = He(t) || "Component";
        uo.has(g) || (uo.add(g), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", g));
      }
      var k = t.getDerivedStateFromProps;
      typeof k == "function" && (e.state = Qa(e, t, k, l, r)), typeof t.getDerivedStateFromProps != "function" && typeof e.getSnapshotBeforeUpdate != "function" && (typeof e.UNSAFE_componentWillMount == "function" || typeof e.componentWillMount == "function") && (Oi(t, e), wl(c, e, r, o));
    }
    var xl = {
      id: 1,
      overflow: ""
    };
    function kl(e) {
      var t = e.overflow, r = e.id, o = r & ~Tl(r);
      return o.toString(32) + t;
    }
    function Ka(e, t, r) {
      var o = e.id, l = e.overflow, c = po(o) - 1, p = o & ~(1 << c), g = r + 1, k = po(t) + c;
      if (k > 30) {
        var O = c - c % 5, B = (1 << O) - 1, V = (p & B).toString(32), ue = p >> O, Ce = c - O, Ke = po(t) + Ce, sn = g << Ce, un = sn | ue, yr = V + l;
        return {
          id: 1 << Ke | un,
          overflow: yr
        };
      } else {
        var Wn = g << c, rs = Wn | p, js = l;
        return {
          id: 1 << k | rs,
          overflow: js
        };
      }
    }
    function po(e) {
      return 32 - Cl(e);
    }
    function Tl(e) {
      return 1 << po(e) - 1;
    }
    var Cl = Math.clz32 ? Math.clz32 : El, qa = Math.log, ca = Math.LN2;
    function El(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (qa(t) / ca | 0) | 0;
    }
    function Rl(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Il = typeof Object.is == "function" ? Object.is : Rl, hr = null, ei = null, fa = null, Be = null, St = !1, Ln = !1, tn = 0, ke = null, Mr = 0, da = 25, wt = !1, xt;
    function nr() {
      if (hr === null)
        throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return wt && f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), hr;
    }
    function Pl(e, t) {
      if (t === null)
        return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", xt), !1;
      e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, xt, "[" + e.join(", ") + "]", "[" + t.join(", ") + "]");
      for (var r = 0; r < t.length && r < e.length; r++)
        if (!Il(e[r], t[r]))
          return !1;
      return !0;
    }
    function Wt() {
      if (Mr > 0)
        throw new Error("Rendered more hooks than during the previous render");
      return {
        memoizedState: null,
        queue: null,
        next: null
      };
    }
    function Lr() {
      return Be === null ? fa === null ? (St = !1, fa = Be = Wt()) : (St = !0, Be = fa) : Be.next === null ? (St = !1, Be = Be.next = Wt()) : (St = !0, Be = Be.next), Be;
    }
    function rn(e, t) {
      hr = t, ei = e, wt = !1, tn = 0;
    }
    function Al(e, t, r, o) {
      for (; Ln; )
        Ln = !1, tn = 0, Mr += 1, Be = null, r = e(t, o);
      return ho(), r;
    }
    function ti() {
      var e = tn !== 0;
      return e;
    }
    function ho() {
      wt = !1, hr = null, ei = null, Ln = !1, fa = null, Mr = 0, ke = null, Be = null;
    }
    function Fl(e) {
      return wt && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), Or(e);
    }
    function _l(e) {
      return xt = "useContext", nr(), Or(e);
    }
    function pa(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function ri(e) {
      return xt = "useState", Li(
        pa,
        // useReducer has a special case to support lazy useState initializers
        e
      );
    }
    function Li(e, t, r) {
      if (e !== pa && (xt = "useReducer"), hr = nr(), Be = Lr(), St) {
        var o = Be.queue, l = o.dispatch;
        if (ke !== null) {
          var c = ke.get(o);
          if (c !== void 0) {
            ke.delete(o);
            var p = Be.memoizedState, g = c;
            do {
              var k = g.action;
              wt = !0, p = e(p, k), wt = !1, g = g.next;
            } while (g !== null);
            return Be.memoizedState = p, [p, l];
          }
        }
        return [Be.memoizedState, l];
      } else {
        wt = !0;
        var O;
        e === pa ? O = typeof t == "function" ? t() : t : O = r !== void 0 ? r(t) : t, wt = !1, Be.memoizedState = O;
        var B = Be.queue = {
          last: null,
          dispatch: null
        }, V = B.dispatch = Ui.bind(null, hr, B);
        return [Be.memoizedState, V];
      }
    }
    function Bi(e, t) {
      hr = nr(), Be = Lr();
      var r = t === void 0 ? null : t;
      if (Be !== null) {
        var o = Be.memoizedState;
        if (o !== null && r !== null) {
          var l = o[1];
          if (Pl(r, l))
            return o[0];
        }
      }
      wt = !0;
      var c = e();
      return wt = !1, Be.memoizedState = [c, r], c;
    }
    function ni(e) {
      hr = nr(), Be = Lr();
      var t = Be.memoizedState;
      if (t === null) {
        var r = {
          current: e
        };
        return Object.seal(r), Be.memoizedState = r, r;
      } else
        return t;
    }
    function Dl(e, t) {
      xt = "useLayoutEffect", f("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
    }
    function Ui(e, t, r) {
      if (Mr >= da)
        throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
      if (e === hr) {
        Ln = !0;
        var o = {
          action: r,
          next: null
        };
        ke === null && (ke = /* @__PURE__ */ new Map());
        var l = ke.get(t);
        if (l === void 0)
          ke.set(t, o);
        else {
          for (var c = l; c.next !== null; )
            c = c.next;
          c.next = o;
        }
      }
    }
    function ji(e, t) {
      return Bi(function() {
        return e;
      }, t);
    }
    function Ol(e, t, r) {
      return nr(), t(e._source);
    }
    function Ml(e, t, r) {
      if (r === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      return r();
    }
    function Ll(e) {
      return nr(), e;
    }
    function Bl() {
      throw new Error("startTransition cannot be called during server rendering.");
    }
    function Ul() {
      return nr(), [!1, Bl];
    }
    function jl() {
      var e = ei, t = kl(e.treeContext), r = oi;
      if (r === null)
        throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
      var o = tn++;
      return Ye(r, t, o);
    }
    function ha() {
    }
    var zi = {
      readContext: Fl,
      useContext: _l,
      useMemo: Bi,
      useReducer: Li,
      useRef: ni,
      useState: ri,
      useInsertionEffect: ha,
      useLayoutEffect: Dl,
      useCallback: ji,
      // useImperativeHandle is not run in the server environment
      useImperativeHandle: ha,
      // Effects are not run in the server environment.
      useEffect: ha,
      // Debugging effect
      useDebugValue: ha,
      useDeferredValue: Ll,
      useTransition: Ul,
      useId: jl,
      // Subscriptions are not setup in a server environment.
      useMutableSource: Ol,
      useSyncExternalStore: Ml
    }, oi = null;
    function Hi(e) {
      oi = e;
    }
    function va(e) {
      try {
        var t = "", r = e;
        do {
          switch (r.tag) {
            case 0:
              t += to(r.type, null, null);
              break;
            case 1:
              t += ro(r.type, null, null);
              break;
            case 2:
              t += Ya(r.type, null, null);
              break;
          }
          r = r.parent;
        } while (r);
        return t;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    var ma = R.ReactCurrentDispatcher, vo = R.ReactDebugCurrentFrame, ga = 0, Bn = 1, ya = 2, ba = 3, Sa = 4, Un = 0, ai = 1, nn = 2, Wi = 12800;
    function zl(e) {
      return console.error(e), null;
    }
    function jn() {
    }
    function zn(e, t, r, o, l, c, p, g, k) {
      var O = [], B = /* @__PURE__ */ new Set(), V = {
        destination: null,
        responseState: t,
        progressiveChunkSize: o === void 0 ? Wi : o,
        status: Un,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: B,
        pingedTasks: O,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: l === void 0 ? zl : l,
        onAllReady: jn,
        onShellReady: p === void 0 ? jn : p,
        onShellError: jn,
        onFatalError: jn
      }, ue = wa(
        V,
        0,
        null,
        r,
        // Root segments are never embedded in Text on either edge
        !1,
        !1
      );
      ue.parentFlushed = !0;
      var Ce = on(V, e, null, ue, B, oo, ea, xl);
      return O.push(Ce), V;
    }
    function Hl(e, t) {
      var r = e.pingedTasks;
      r.push(t), r.length === 1 && $(function() {
        return vi(e);
      });
    }
    function Wl(e, t) {
      return {
        id: gn,
        rootSegmentID: -1,
        parentFlushed: !1,
        pendingTasks: 0,
        forceClientRender: !1,
        completedSegments: [],
        byteSize: 0,
        fallbackAbortableTasks: t,
        errorDigest: null
      };
    }
    function on(e, t, r, o, l, c, p, g) {
      e.allPendingTasks++, r === null ? e.pendingRootTasks++ : r.pendingTasks++;
      var k = {
        node: t,
        ping: function() {
          return Hl(e, k);
        },
        blockedBoundary: r,
        blockedSegment: o,
        abortSet: l,
        legacyContext: c,
        context: p,
        treeContext: g
      };
      return k.componentStack = null, l.add(k), k;
    }
    function wa(e, t, r, o, l, c) {
      return {
        status: ga,
        id: -1,
        // lazily assigned later
        index: t,
        parentFlushed: !1,
        chunks: [],
        children: [],
        formatContext: o,
        boundary: r,
        lastPushedText: l,
        textEmbedded: c
      };
    }
    var vr = null;
    function ii() {
      return vr === null || vr.componentStack === null ? "" : va(vr.componentStack);
    }
    function an(e, t) {
      e.componentStack = {
        tag: 0,
        parent: e.componentStack,
        type: t
      };
    }
    function mo(e, t) {
      e.componentStack = {
        tag: 1,
        parent: e.componentStack,
        type: t
      };
    }
    function mr(e, t) {
      e.componentStack = {
        tag: 2,
        parent: e.componentStack,
        type: t
      };
    }
    function or(e) {
      e.componentStack === null ? f("Unexpectedly popped too many stack frames. This is a bug in React.") : e.componentStack = e.componentStack.parent;
    }
    var gr = null;
    function xa(e, t) {
      {
        var r;
        typeof t == "string" ? r = t : t && typeof t.message == "string" ? r = t.message : r = String(t);
        var o = gr || ii();
        gr = null, e.errorMessage = r, e.errorComponentStack = o;
      }
    }
    function go(e, t) {
      var r = e.onError(t);
      if (r != null && typeof r != "string")
        throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof r + '" instead');
      return r;
    }
    function $t(e, t) {
      var r = e.onShellError;
      r(t);
      var o = e.onFatalError;
      o(t), e.destination !== null ? (e.status = nn, G(e.destination, t)) : (e.status = ai, e.fatalError = t);
    }
    function yo(e, t, r) {
      an(t, "Suspense");
      var o = t.blockedBoundary, l = t.blockedSegment, c = r.fallback, p = r.children, g = /* @__PURE__ */ new Set(), k = Wl(e, g), O = l.chunks.length, B = wa(
        e,
        O,
        k,
        l.formatContext,
        // boundaries never require text embedding at their edges because comment nodes bound them
        !1,
        !1
      );
      l.children.push(B), l.lastPushedText = !1;
      var V = wa(
        e,
        0,
        null,
        l.formatContext,
        // boundaries never require text embedding at their edges because comment nodes bound them
        !1,
        !1
      );
      V.parentFlushed = !0, t.blockedBoundary = k, t.blockedSegment = V;
      try {
        if (ct(e, t, p), bi(V.chunks, e.responseState, V.lastPushedText, V.textEmbedded), V.status = Bn, Hn(k, V), k.pendingTasks === 0) {
          or(t);
          return;
        }
      } catch (Ce) {
        V.status = Sa, k.forceClientRender = !0, k.errorDigest = go(e, Ce), xa(k, Ce);
      } finally {
        t.blockedBoundary = o, t.blockedSegment = l;
      }
      var ue = on(e, c, o, B, g, t.legacyContext, t.context, t.treeContext);
      ue.componentStack = t.componentStack, e.pingedTasks.push(ue), or(t);
    }
    function li(e, t, r, o) {
      an(t, r);
      var l = t.blockedSegment, c = Ht(l.chunks, r, o, e.responseState, l.formatContext);
      l.lastPushedText = !1;
      var p = l.formatContext;
      l.formatContext = mn(p, r, o), ct(e, t, c), l.formatContext = p, _e(l.chunks, r), l.lastPushedText = !1, or(t);
    }
    function bo(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function So(e, t, r, o, l) {
      var c = {};
      rn(t, c);
      var p = r(o, l);
      return Al(r, o, p, l);
    }
    function $i(e, t, r, o, l) {
      var c = r.render();
      r.props !== l && (ui || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", He(o) || "a component"), ui = !0);
      {
        var p = o.childContextTypes;
        if (p != null) {
          var g = t.legacyContext, k = Ri(r, o, g, p);
          t.legacyContext = k, kt(e, t, c), t.legacyContext = g;
          return;
        }
      }
      kt(e, t, c);
    }
    function $l(e, t, r, o) {
      mr(t, r);
      var l = ao(r, t.legacyContext), c = _i(r, o, l);
      Mi(c, r, o, l), $i(e, t, c, r, o), or(t);
    }
    var Ni = {}, wo = {}, si = {}, Vi = {}, ui = !1, xo = {}, ci = !1, fi = !1, di = !1;
    function Yi(e, t, r, o) {
      var l;
      if (l = ao(r, t.legacyContext), mo(t, r), r.prototype && typeof r.prototype.render == "function") {
        var c = He(r) || "Unknown";
        Ni[c] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", c, c), Ni[c] = !0);
      }
      var p = So(e, t, r, o, l), g = ti();
      if (typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var k = He(r) || "Unknown";
        wo[k] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", k, k, k), wo[k] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var O = He(r) || "Unknown";
          wo[O] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", O, O, O), wo[O] = !0);
        }
        Mi(p, r, o, l), $i(e, t, p, r, o);
      } else if (Gi(r), g) {
        var B = t.treeContext, V = 1, ue = 0;
        t.treeContext = Ka(B, V, ue);
        try {
          kt(e, t, p);
        } finally {
          t.treeContext = B;
        }
      } else
        kt(e, t, p);
      or(t);
    }
    function Gi(e) {
      {
        if (e && e.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", e.displayName || e.name || "Component"), e.defaultProps !== void 0) {
          var t = He(e) || "Unknown";
          xo[t] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", t), xo[t] = !0);
        }
        if (typeof e.getDerivedStateFromProps == "function") {
          var r = He(e) || "Unknown";
          Vi[r] || (f("%s: Function components do not support getDerivedStateFromProps.", r), Vi[r] = !0);
        }
        if (typeof e.contextType == "object" && e.contextType !== null) {
          var o = He(e) || "Unknown";
          si[o] || (f("%s: Function components do not support contextType.", o), si[o] = !0);
        }
      }
    }
    function pi(e, t) {
      if (e && e.defaultProps) {
        var r = dt({}, t), o = e.defaultProps;
        for (var l in o)
          r[l] === void 0 && (r[l] = o[l]);
        return r;
      }
      return t;
    }
    function Xi(e, t, r, o, l) {
      mo(t, r.render);
      var c = So(e, t, r.render, o, l), p = ti();
      if (p) {
        var g = t.treeContext, k = 1, O = 0;
        t.treeContext = Ka(g, k, O);
        try {
          kt(e, t, c);
        } finally {
          t.treeContext = g;
        }
      } else
        kt(e, t, c);
      or(t);
    }
    function Nl(e, t, r, o, l) {
      var c = r.type, p = pi(c, o);
      hi(e, t, c, p, l);
    }
    function Vl(e, t, r, o) {
      r._context === void 0 ? r !== r.Consumer && (di || (di = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : r = r._context;
      var l = o.children;
      typeof l != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
      var c = Or(r), p = l(c);
      kt(e, t, p);
    }
    function Zi(e, t, r, o) {
      var l = r._context, c = o.value, p = o.children, g;
      g = t.context, t.context = Ii(l, c), kt(e, t, p), t.context = Pi(l), g !== t.context && f("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
    }
    function Yl(e, t, r, o, l) {
      an(t, "Lazy");
      var c = r._payload, p = r._init, g = p(c), k = pi(g, o);
      hi(e, t, g, k, l), or(t);
    }
    function hi(e, t, r, o, l) {
      if (typeof r == "function")
        if (bo(r)) {
          $l(e, t, r, o);
          return;
        } else {
          Yi(e, t, r, o);
          return;
        }
      if (typeof r == "string") {
        li(e, t, r, o);
        return;
      }
      switch (r) {
        case Ba:
        case La:
        case bt:
        case wi:
        case $o: {
          kt(e, t, o.children);
          return;
        }
        case Kn: {
          an(t, "SuspenseList"), kt(e, t, o.children), or(t);
          return;
        }
        case Ma:
          throw new Error("ReactDOMServer does not yet support scope components.");
        case Go: {
          yo(e, t, o);
          return;
        }
      }
      if (typeof r == "object" && r !== null)
        switch (r.$$typeof) {
          case Yo: {
            Xi(e, t, r, o, l);
            return;
          }
          case qn: {
            Nl(e, t, r, o, l);
            return;
          }
          case No: {
            Zi(e, t, r, o);
            return;
          }
          case Vo: {
            Vl(e, t, r, o);
            return;
          }
          case Fn: {
            Yl(e, t, r, o);
            return;
          }
        }
      var c = "";
      throw (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (r == null ? r : typeof r) + "." + c));
    }
    function Gl(e, t) {
      typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
      e[Symbol.toStringTag] === "Generator" && (ci || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), ci = !0), e.entries === t && (fi || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), fi = !0);
    }
    function kt(e, t, r) {
      try {
        return Xl(e, t, r);
      } catch (o) {
        throw typeof o == "object" && o !== null && typeof o.then == "function" || (gr = gr !== null ? gr : ii()), o;
      }
    }
    function Xl(e, t, r) {
      if (t.node = r, typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case vl: {
            var o = r, l = o.type, c = o.props, p = o.ref;
            hi(e, t, l, c, p);
            return;
          }
          case Si:
            throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case Fn: {
            var g = r, k = g._payload, O = g._init, B;
            try {
              B = O(k);
            } catch (Wn) {
              throw typeof Wn == "object" && Wn !== null && typeof Wn.then == "function" && an(t, "Lazy"), Wn;
            }
            kt(e, t, B);
            return;
          }
        }
        if (Et(r)) {
          ka(e, t, r);
          return;
        }
        var V = gl(r);
        if (V) {
          Gl(r, V);
          var ue = V.call(r);
          if (ue) {
            var Ce = ue.next();
            if (!Ce.done) {
              var Ke = [];
              do
                Ke.push(Ce.value), Ce = ue.next();
              while (!Ce.done);
              ka(e, t, Ke);
              return;
            }
            return;
          }
        }
        var sn = Object.prototype.toString.call(r);
        throw new Error("Objects are not valid as a React child (found: " + (sn === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : sn) + "). If you meant to render a collection of children, use an array instead.");
      }
      if (typeof r == "string") {
        var un = t.blockedSegment;
        un.lastPushedText = yi(t.blockedSegment.chunks, r, e.responseState, un.lastPushedText);
        return;
      }
      if (typeof r == "number") {
        var yr = t.blockedSegment;
        yr.lastPushedText = yi(t.blockedSegment.chunks, "" + r, e.responseState, yr.lastPushedText);
        return;
      }
      typeof r == "function" && f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
    function ka(e, t, r) {
      for (var o = r.length, l = 0; l < o; l++) {
        var c = t.treeContext;
        t.treeContext = Ka(c, o, l);
        try {
          ct(e, t, r[l]);
        } finally {
          t.treeContext = c;
        }
      }
    }
    function Zl(e, t, r) {
      var o = t.blockedSegment, l = o.chunks.length, c = wa(
        e,
        l,
        null,
        o.formatContext,
        // Adopt the parent segment's leading text embed
        o.lastPushedText,
        // Assume we are text embedded at the trailing edge
        !0
      );
      o.children.push(c), o.lastPushedText = !1;
      var p = on(e, t.node, t.blockedBoundary, c, t.abortSet, t.legacyContext, t.context, t.treeContext);
      t.componentStack !== null && (p.componentStack = t.componentStack.parent);
      var g = p.ping;
      r.then(g, g);
    }
    function ct(e, t, r) {
      var o = t.blockedSegment.formatContext, l = t.legacyContext, c = t.context, p = null;
      p = t.componentStack;
      try {
        return kt(e, t, r);
      } catch (g) {
        if (ho(), typeof g == "object" && g !== null && typeof g.then == "function") {
          Zl(e, t, g), t.blockedSegment.formatContext = o, t.legacyContext = l, t.context = c, lo(c), t.componentStack = p;
          return;
        } else
          throw t.blockedSegment.formatContext = o, t.legacyContext = l, t.context = c, lo(c), t.componentStack = p, g;
      }
    }
    function Jl(e, t, r, o) {
      var l = go(e, o);
      if (t === null ? $t(e, o) : (t.pendingTasks--, t.forceClientRender || (t.forceClientRender = !0, t.errorDigest = l, xa(t, o), t.parentFlushed && e.clientRenderedBoundaries.push(t))), e.allPendingTasks--, e.allPendingTasks === 0) {
        var c = e.onAllReady;
        c();
      }
    }
    function Ji(e) {
      var t = this, r = e.blockedBoundary, o = e.blockedSegment;
      o.status = ba, Ki(t, r, o);
    }
    function Qi(e, t, r) {
      var o = e.blockedBoundary, l = e.blockedSegment;
      if (l.status = ba, o === null)
        t.allPendingTasks--, t.status !== nn && (t.status = nn, t.destination !== null && A(t.destination));
      else {
        if (o.pendingTasks--, !o.forceClientRender) {
          o.forceClientRender = !0;
          var c = r === void 0 ? new Error("The render was aborted by the server without a reason.") : r;
          o.errorDigest = t.onError(c);
          {
            var p = "The server did not finish this Suspense boundary: ";
            c && typeof c.message == "string" ? c = p + c.message : c = p + String(c);
            var g = vr;
            vr = e;
            try {
              xa(o, c);
            } finally {
              vr = g;
            }
          }
          o.parentFlushed && t.clientRenderedBoundaries.push(o);
        }
        if (o.fallbackAbortableTasks.forEach(function(O) {
          return Qi(O, t, r);
        }), o.fallbackAbortableTasks.clear(), t.allPendingTasks--, t.allPendingTasks === 0) {
          var k = t.onAllReady;
          k();
        }
      }
    }
    function Hn(e, t) {
      if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null) {
        var r = t.children[0];
        r.id = t.id, r.parentFlushed = !0, r.status === Bn && Hn(e, r);
      } else {
        var o = e.completedSegments;
        o.push(t);
      }
    }
    function Ki(e, t, r) {
      if (t === null) {
        if (r.parentFlushed) {
          if (e.completedRootSegment !== null)
            throw new Error("There can only be one root segment. This is a bug in React.");
          e.completedRootSegment = r;
        }
        if (e.pendingRootTasks--, e.pendingRootTasks === 0) {
          e.onShellError = jn;
          var o = e.onShellReady;
          o();
        }
      } else if (t.pendingTasks--, !t.forceClientRender) {
        if (t.pendingTasks === 0)
          r.parentFlushed && r.status === Bn && Hn(t, r), t.parentFlushed && e.completedBoundaries.push(t), t.fallbackAbortableTasks.forEach(Ji, e), t.fallbackAbortableTasks.clear();
        else if (r.parentFlushed && r.status === Bn) {
          Hn(t, r);
          var l = t.completedSegments;
          l.length === 1 && t.parentFlushed && e.partialBoundaries.push(t);
        }
      }
      if (e.allPendingTasks--, e.allPendingTasks === 0) {
        var c = e.onAllReady;
        c();
      }
    }
    function Ql(e, t) {
      var r = t.blockedSegment;
      if (r.status === ga) {
        lo(t.context);
        var o = null;
        o = vr, vr = t;
        try {
          kt(e, t, t.node), bi(r.chunks, e.responseState, r.lastPushedText, r.textEmbedded), t.abortSet.delete(t), r.status = Bn, Ki(e, t.blockedBoundary, r);
        } catch (c) {
          if (ho(), typeof c == "object" && c !== null && typeof c.then == "function") {
            var l = t.ping;
            c.then(l, l);
          } else
            t.abortSet.delete(t), r.status = Sa, Jl(e, t.blockedBoundary, r, c);
        } finally {
          vr = o;
        }
      }
    }
    function vi(e) {
      if (e.status !== nn) {
        var t = Ai(), r = ma.current;
        ma.current = zi;
        var o;
        o = vo.getCurrentStack, vo.getCurrentStack = ii;
        var l = oi;
        Hi(e.responseState);
        try {
          var c = e.pingedTasks, p;
          for (p = 0; p < c.length; p++) {
            var g = c[p];
            Ql(e, g);
          }
          c.splice(0, p), e.destination !== null && Ca(e, e.destination);
        } catch (k) {
          go(e, k), $t(e, k);
        } finally {
          Hi(l), ma.current = r, vo.getCurrentStack = o, r === zi && lo(t);
        }
      }
    }
    function ln(e, t, r) {
      switch (r.parentFlushed = !0, r.status) {
        case ga: {
          var o = r.id = e.nextSegmentId++;
          return r.lastPushedText = !1, r.textEmbedded = !1, tr(t, e.responseState, o);
        }
        case Bn: {
          r.status = ya;
          for (var l = !0, c = r.chunks, p = 0, g = r.children, k = 0; k < g.length; k++) {
            for (var O = g[k]; p < O.index; p++)
              y(t, c[p]);
            l = ko(e, t, O);
          }
          for (; p < c.length - 1; p++)
            y(t, c[p]);
          return p < c.length && (l = w(t, c[p])), l;
        }
        default:
          throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
      }
    }
    function ko(e, t, r) {
      var o = r.boundary;
      if (o === null)
        return ln(e, t, r);
      if (o.parentFlushed = !0, o.forceClientRender)
        return dl(t, e.responseState, o.errorDigest, o.errorMessage, o.errorComponentStack), ln(e, t, r), hl(t, e.responseState);
      if (o.pendingTasks > 0) {
        o.rootSegmentID = e.nextSegmentId++, o.completedSegments.length > 0 && e.partialBoundaries.push(o);
        var l = o.id = jt(e.responseState);
        return Zr(t, e.responseState, l), ln(e, t, r), Ar(t, e.responseState);
      } else {
        if (o.byteSize > e.progressiveChunkSize)
          return o.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(o), Zr(t, e.responseState, o.id), ln(e, t, r), Ar(t, e.responseState);
        fl(t, e.responseState);
        var c = o.completedSegments;
        if (c.length !== 1)
          throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        var p = c[0];
        return ko(e, t, p), pl(t, e.responseState);
      }
    }
    function Kl(e, t, r) {
      return ll(t, e.responseState, r.id, r.errorDigest, r.errorMessage, r.errorComponentStack);
    }
    function mi(e, t, r) {
      return Qn(t, e.responseState, r.formatContext, r.id), ko(e, t, r), Ho(t, r.formatContext);
    }
    function To(e, t, r) {
      for (var o = r.completedSegments, l = 0; l < o.length; l++) {
        var c = o[l];
        qi(e, t, r, c);
      }
      return o.length = 0, ut(t, e.responseState, r.id, r.rootSegmentID);
    }
    function Ta(e, t, r) {
      for (var o = r.completedSegments, l = 0; l < o.length; l++) {
        var c = o[l];
        if (!qi(e, t, r, c))
          return l++, o.splice(0, l), !1;
      }
      return o.splice(0, l), !0;
    }
    function qi(e, t, r, o) {
      if (o.status === ya)
        return !0;
      var l = o.id;
      if (l === -1) {
        var c = o.id = r.rootSegmentID;
        if (c === -1)
          throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
        return mi(e, t, o);
      } else
        return mi(e, t, o), z(t, e.responseState, l);
    }
    function Ca(e, t) {
      try {
        var r = e.completedRootSegment;
        r !== null && e.pendingRootTasks === 0 && (ko(e, t, r), e.completedRootSegment = null, dr(t, e.responseState));
        var o = e.clientRenderedBoundaries, l;
        for (l = 0; l < o.length; l++) {
          var c = o[l];
          if (!Kl(e, t, c)) {
            e.destination = null, l++, o.splice(0, l);
            return;
          }
        }
        o.splice(0, l);
        var p = e.completedBoundaries;
        for (l = 0; l < p.length; l++) {
          var g = p[l];
          if (!To(e, t, g)) {
            e.destination = null, l++, p.splice(0, l);
            return;
          }
        }
        p.splice(0, l);
        var k = e.partialBoundaries;
        for (l = 0; l < k.length; l++) {
          var O = k[l];
          if (!Ta(e, t, O)) {
            e.destination = null, l++, k.splice(0, l);
            return;
          }
        }
        k.splice(0, l);
        var B = e.completedBoundaries;
        for (l = 0; l < B.length; l++) {
          var V = B[l];
          if (!To(e, t, V)) {
            e.destination = null, l++, B.splice(0, l);
            return;
          }
        }
        B.splice(0, l);
      } finally {
        e.allPendingTasks === 0 && e.pingedTasks.length === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && (e.abortableTasks.size !== 0 && f("There was still abortable task at the root when we closed. This is a bug in React."), A(t));
      }
    }
    function el(e) {
      $(function() {
        return vi(e);
      });
    }
    function ql(e, t) {
      if (e.status === ai) {
        e.status = nn, G(t, e.fatalError);
        return;
      }
      if (e.status !== nn && e.destination === null) {
        e.destination = t;
        try {
          Ca(e, t);
        } catch (r) {
          go(e, r), $t(e, r);
        }
      }
    }
    function tl(e, t) {
      try {
        var r = e.abortableTasks;
        r.forEach(function(o) {
          return Qi(o, e, t);
        }), r.clear(), e.destination !== null && Ca(e, e.destination);
      } catch (o) {
        go(e, o), $t(e, o);
      }
    }
    function gi() {
    }
    function rl(e, t, r, o) {
      var l = !1, c = null, p = "", g = {
        push: function(V) {
          return V !== null && (p += V), !0;
        },
        destroy: function(V) {
          l = !0, c = V;
        }
      }, k = !1;
      function O() {
        k = !0;
      }
      var B = zn(e, ul(r, t ? t.identifierPrefix : void 0), cl(), 1 / 0, gi, void 0, O);
      if (el(B), tl(B, o), ql(B, g), l)
        throw c;
      if (!k)
        throw new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
      return p;
    }
    function es(e, t) {
      return rl(e, t, !1, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
    }
    function nl(e, t) {
      return rl(e, t, !0, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
    }
    function ts() {
      throw new Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
    }
    function n() {
      throw new Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
    }
    Eo.renderToNodeStream = ts, Eo.renderToStaticMarkup = nl, Eo.renderToStaticNodeStream = n, Eo.renderToString = es, Eo.version = b;
  }()), Eo;
}
var al = {};
/**
 * @license React
 * react-dom-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ys;
function Xs() {
  return ys || (ys = 1, process.env.NODE_ENV !== "production" && function() {
    var I = br, b = "18.3.1", R = I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function L(n) {
      {
        for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
          t[r - 1] = arguments[r];
        _("warn", n, t);
      }
    }
    function f(n) {
      {
        for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
          t[r - 1] = arguments[r];
        _("error", n, t);
      }
    }
    function _(n, e, t) {
      {
        var r = R.ReactDebugCurrentFrame, o = r.getStackAddendum();
        o !== "" && (e += "%s", t = t.concat([o]));
        var l = t.map(function(c) {
          return String(c);
        });
        l.unshift("Warning: " + e), Function.prototype.apply.call(console[n], console, l);
      }
    }
    function $(n) {
      n();
    }
    var W = 512, y = null, w = 0;
    function X(n) {
      y = new Uint8Array(W), w = 0;
    }
    function A(n, e) {
      if (e.length !== 0) {
        if (e.length > W) {
          w > 0 && (n.enqueue(new Uint8Array(y.buffer, 0, w)), y = new Uint8Array(W), w = 0), n.enqueue(e);
          return;
        }
        var t = e, r = y.length - w;
        r < t.length && (r === 0 ? n.enqueue(y) : (y.set(t.subarray(0, r), w), n.enqueue(y), t = t.subarray(r)), y = new Uint8Array(W), w = 0), y.set(t, w), w += t.length;
      }
    }
    function Y(n, e) {
      return A(n, e), !0;
    }
    function se(n) {
      y && w > 0 && (n.enqueue(new Uint8Array(y.buffer, 0, w)), y = null, w = 0);
    }
    function G(n) {
      n.close();
    }
    var ce = new TextEncoder();
    function P(n) {
      return ce.encode(n);
    }
    function S(n) {
      return ce.encode(n);
    }
    function K(n, e) {
      typeof n.error == "function" ? n.error(e) : n.close();
    }
    function J(n) {
      {
        var e = typeof Symbol == "function" && Symbol.toStringTag, t = e && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return t;
      }
    }
    function re(n) {
      try {
        return M(n), !1;
      } catch {
        return !0;
      }
    }
    function M(n) {
      return "" + n;
    }
    function le(n, e) {
      if (re(n))
        return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", e, J(n)), M(n);
    }
    function ne(n, e) {
      if (re(n))
        return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", e, J(n)), M(n);
    }
    function Ae(n) {
      if (re(n))
        return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", J(n)), M(n);
    }
    var fe = Object.prototype.hasOwnProperty, we = 0, Pe = 1, Se = 2, Fe = 3, Le = 4, We = 5, be = 6, Ie = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", je = Ie + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", ze = new RegExp("^[" + Ie + "][" + je + "]*$"), U = {}, H = {};
    function Q(n) {
      return fe.call(H, n) ? !0 : fe.call(U, n) ? !1 : ze.test(n) ? (H[n] = !0, !0) : (U[n] = !0, f("Invalid attribute name: `%s`", n), !1);
    }
    function pe(n, e, t, r) {
      if (t !== null && t.type === we)
        return !1;
      switch (typeof e) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (t !== null)
            return !t.acceptsBooleans;
          var o = n.toLowerCase().slice(0, 5);
          return o !== "data-" && o !== "aria-";
        }
        default:
          return !1;
      }
    }
    function oe(n) {
      return Z.hasOwnProperty(n) ? Z[n] : null;
    }
    function te(n, e, t, r, o, l, c) {
      this.acceptsBooleans = e === Se || e === Fe || e === Le, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = t, this.propertyName = n, this.type = e, this.sanitizeURL = l, this.removeEmptyString = c;
    }
    var Z = {}, de = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    de.forEach(function(n) {
      Z[n] = new te(
        n,
        we,
        !1,
        // mustUseProperty
        n,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
      var e = n[0], t = n[1];
      Z[e] = new te(
        e,
        Pe,
        !1,
        // mustUseProperty
        t,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
      Z[n] = new te(
        n,
        Se,
        !1,
        // mustUseProperty
        n.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
      Z[n] = new te(
        n,
        Se,
        !1,
        // mustUseProperty
        n,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(n) {
      Z[n] = new te(
        n,
        Fe,
        !1,
        // mustUseProperty
        n.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(n) {
      Z[n] = new te(
        n,
        Fe,
        !0,
        // mustUseProperty
        n,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(n) {
      Z[n] = new te(
        n,
        Le,
        !1,
        // mustUseProperty
        n,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(n) {
      Z[n] = new te(
        n,
        be,
        !1,
        // mustUseProperty
        n,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(n) {
      Z[n] = new te(
        n,
        We,
        !1,
        // mustUseProperty
        n.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ge = /[\-\:]([a-z])/g, he = function(n) {
      return n[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(n) {
      var e = n.replace(ge, he);
      Z[e] = new te(
        e,
        Pe,
        !1,
        // mustUseProperty
        n,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(n) {
      var e = n.replace(ge, he);
      Z[e] = new te(
        e,
        Pe,
        !1,
        // mustUseProperty
        n,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(n) {
      var e = n.replace(ge, he);
      Z[e] = new te(
        e,
        Pe,
        !1,
        // mustUseProperty
        n,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(n) {
      Z[n] = new te(
        n,
        Pe,
        !1,
        // mustUseProperty
        n.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ve = "xlinkHref";
    Z[ve] = new te(
      "xlinkHref",
      Pe,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(n) {
      Z[n] = new te(
        n,
        Pe,
        !1,
        // mustUseProperty
        n.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Te = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function N(n, e) {
      return n + e.charAt(0).toUpperCase() + e.substring(1);
    }
    var Ee = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Te).forEach(function(n) {
      Ee.forEach(function(e) {
        Te[N(e, n)] = Te[n];
      });
    });
    var $e = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Bt(n, e) {
      $e[e.type] || e.onChange || e.onInput || e.readOnly || e.disabled || e.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), e.onChange || e.readOnly || e.disabled || e.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function ar(n, e) {
      if (n.indexOf("-") === -1)
        return typeof e.is == "string";
      switch (n) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var cn = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, pt = {}, ir = new RegExp("^(aria)-[" + je + "]*$"), lr = new RegExp("^(aria)[A-Z][" + je + "]*$");
    function fn(n, e) {
      {
        if (fe.call(pt, e) && pt[e])
          return !0;
        if (lr.test(e)) {
          var t = "aria-" + e.slice(4).toLowerCase(), r = cn.hasOwnProperty(t) ? t : null;
          if (r == null)
            return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", e), pt[e] = !0, !0;
          if (e !== r)
            return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", e, r), pt[e] = !0, !0;
        }
        if (ir.test(e)) {
          var o = e.toLowerCase(), l = cn.hasOwnProperty(o) ? o : null;
          if (l == null)
            return pt[e] = !0, !1;
          if (e !== l)
            return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", e, l), pt[e] = !0, !0;
        }
      }
      return !0;
    }
    function ht(n, e) {
      {
        var t = [];
        for (var r in e) {
          var o = fn(n, r);
          o || t.push(r);
        }
        var l = t.map(function(c) {
          return "`" + c + "`";
        }).join(", ");
        t.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", l, n) : t.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", l, n);
      }
    }
    function Qe(n, e) {
      ar(n, e) || ht(n, e);
    }
    var Ge = !1;
    function Br(n, e) {
      {
        if (n !== "input" && n !== "textarea" && n !== "select")
          return;
        e != null && e.value === null && !Ge && (Ge = !0, n === "select" && e.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", n) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", n));
      }
    }
    var Ur = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, jr = function() {
    };
    {
      var Ne = {}, zr = /^on./, dn = /^on[^A-Z]/, pn = new RegExp("^(aria)-[" + je + "]*$"), Hr = new RegExp("^(aria)[A-Z][" + je + "]*$");
      jr = function(n, e, t, r) {
        if (fe.call(Ne, e) && Ne[e])
          return !0;
        var o = e.toLowerCase();
        if (o === "onfocusin" || o === "onfocusout")
          return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Ne[e] = !0, !0;
        if (r != null) {
          var l = r.registrationNameDependencies, c = r.possibleRegistrationNames;
          if (l.hasOwnProperty(e))
            return !0;
          var p = c.hasOwnProperty(o) ? c[o] : null;
          if (p != null)
            return f("Invalid event handler property `%s`. Did you mean `%s`?", e, p), Ne[e] = !0, !0;
          if (zr.test(e))
            return f("Unknown event handler property `%s`. It will be ignored.", e), Ne[e] = !0, !0;
        } else if (zr.test(e))
          return dn.test(e) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", e), Ne[e] = !0, !0;
        if (pn.test(e) || Hr.test(e))
          return !0;
        if (o === "innerhtml")
          return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Ne[e] = !0, !0;
        if (o === "aria")
          return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Ne[e] = !0, !0;
        if (o === "is" && t !== null && t !== void 0 && typeof t != "string")
          return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof t), Ne[e] = !0, !0;
        if (typeof t == "number" && isNaN(t))
          return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", e), Ne[e] = !0, !0;
        var g = oe(e), k = g !== null && g.type === we;
        if (Ur.hasOwnProperty(o)) {
          var O = Ur[o];
          if (O !== e)
            return f("Invalid DOM property `%s`. Did you mean `%s`?", e, O), Ne[e] = !0, !0;
        } else if (!k && e !== o)
          return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", e, o), Ne[e] = !0, !0;
        return typeof t == "boolean" && pe(e, t, g) ? (t ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', t, e, e, t, e) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', t, e, e, t, e, e, e), Ne[e] = !0, !0) : k ? !0 : pe(e, t, g) ? (Ne[e] = !0, !1) : ((t === "false" || t === "true") && g !== null && g.type === Fe && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", t, e, t === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', e, t), Ne[e] = !0), !0);
      };
    }
    var wr = function(n, e, t) {
      {
        var r = [];
        for (var o in e) {
          var l = jr(n, o, e[o], t);
          l || r.push(o);
        }
        var c = r.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        r.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", c, n) : r.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", c, n);
      }
    };
    function $n(n, e, t) {
      ar(n, e) || wr(n, e, t);
    }
    var Wr = function() {
    };
    {
      var Nt = /^(?:webkit|moz|o)[A-Z]/, $r = /^-ms-/, hn = /-(.)/g, qe = /;\s*$/, Tt = {}, Vt = {}, Re = !1, Yt = !1, xr = function(n) {
        return n.replace(hn, function(e, t) {
          return t.toUpperCase();
        });
      }, sr = function(n) {
        Tt.hasOwnProperty(n) && Tt[n] || (Tt[n] = !0, f(
          "Unsupported style property %s. Did you mean %s?",
          n,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          xr(n.replace($r, "ms-"))
        ));
      }, Ct = function(n) {
        Tt.hasOwnProperty(n) && Tt[n] || (Tt[n] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", n, n.charAt(0).toUpperCase() + n.slice(1)));
      }, kr = function(n, e) {
        Vt.hasOwnProperty(e) && Vt[e] || (Vt[e] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, n, e.replace(qe, "")));
      }, Ut = function(n, e) {
        Re || (Re = !0, f("`NaN` is an invalid value for the `%s` css style property.", n));
      }, Ze = function(n, e) {
        Yt || (Yt = !0, f("`Infinity` is an invalid value for the `%s` css style property.", n));
      };
      Wr = function(n, e) {
        n.indexOf("-") > -1 ? sr(n) : Nt.test(n) ? Ct(n) : qe.test(e) && kr(n, e), typeof e == "number" && (isNaN(e) ? Ut(n, e) : isFinite(e) || Ze(n, e));
      };
    }
    var Nr = Wr, Vr = /["'&<>]/;
    function vn(n) {
      Ae(n);
      var e = "" + n, t = Vr.exec(e);
      if (!t)
        return e;
      var r, o = "", l, c = 0;
      for (l = t.index; l < e.length; l++) {
        switch (e.charCodeAt(l)) {
          case 34:
            r = "&quot;";
            break;
          case 38:
            r = "&amp;";
            break;
          case 39:
            r = "&#x27;";
            break;
          case 60:
            r = "&lt;";
            break;
          case 62:
            r = "&gt;";
            break;
          default:
            continue;
        }
        c !== l && (o += e.substring(c, l)), c = l + 1, o += r;
      }
      return c !== l ? o + e.substring(c, l) : o;
    }
    function Ve(n) {
      return typeof n == "boolean" || typeof n == "number" ? "" + n : vn(n);
    }
    var Yr = /([A-Z])/g, Nn = /^ms-/;
    function Vn(n) {
      return n.replace(Yr, "-$1").toLowerCase().replace(Nn, "-ms-");
    }
    var Et = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Gr = !1;
    function Tr(n) {
      !Gr && Et.test(n) && (Gr = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(n)));
    }
    var Gt = Array.isArray;
    function at(n) {
      return Gt(n);
    }
    var Rt = S("<script>"), Cr = S("<\/script>"), Xt = S('<script src="'), Zt = S('<script type="module" src="'), It = S('" async=""><\/script>');
    function Jt(n) {
      return Ae(n), ("" + n).replace(it, mn);
    }
    var it = /(<\/|<)(s)(cript)/gi, mn = function(n, e, t, r) {
      return "" + e + (t === "s" ? "\\u0073" : "\\u0053") + r;
    };
    function gn(n, e, t, r, o) {
      var l = n === void 0 ? "" : n, c = e === void 0 ? Rt : S('<script nonce="' + Ve(e) + '">'), p = [];
      if (t !== void 0 && p.push(c, P(Jt(t)), Cr), r !== void 0)
        for (var g = 0; g < r.length; g++)
          p.push(Xt, P(Ve(r[g])), It);
      if (o !== void 0)
        for (var k = 0; k < o.length; k++)
          p.push(Zt, P(Ve(o[k])), It);
      return {
        bootstrapChunks: p,
        startInlineScript: c,
        placeholderPrefix: S(l + "P:"),
        segmentPrefix: S(l + "S:"),
        boundaryPrefix: l + "B:",
        idPrefix: l,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: !1,
        sentCompleteBoundaryFunction: !1,
        sentClientRenderFunction: !1
      };
    }
    var jt = 0, Ye = 1, Pt = 2, At = 3, Qt = 4, Er = 5, vt = 6, Ft = 7;
    function et(n, e) {
      return {
        insertionMode: n,
        selectedValue: e
      };
    }
    function Kt(n) {
      var e = n === "http://www.w3.org/2000/svg" ? Pt : n === "http://www.w3.org/1998/Math/MathML" ? At : jt;
      return et(e, null);
    }
    function ur(n, e, t) {
      switch (e) {
        case "select":
          return et(Ye, t.value != null ? t.value : t.defaultValue);
        case "svg":
          return et(Pt, null);
        case "math":
          return et(At, null);
        case "foreignObject":
          return et(Ye, null);
        case "table":
          return et(Qt, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return et(Er, null);
        case "colgroup":
          return et(Ft, null);
        case "tr":
          return et(vt, null);
      }
      return n.insertionMode >= Qt || n.insertionMode === jt ? et(Ye, null) : n;
    }
    var Rr = null;
    function ft(n) {
      var e = n.nextSuspenseID++;
      return S(n.boundaryPrefix + e.toString(16));
    }
    function _t(n, e, t) {
      var r = n.idPrefix, o = ":" + r + "R" + e;
      return t > 0 && (o += "H" + t.toString(32)), o + ":";
    }
    function tt(n) {
      return Ve(n);
    }
    var Ir = S("<!-- -->");
    function Je(n, e, t, r) {
      return e === "" ? r : (r && n.push(Ir), n.push(P(tt(e))), !0);
    }
    function lt(n, e, t, r) {
      t && r && n.push(Ir);
    }
    var a = /* @__PURE__ */ new Map();
    function u(n) {
      var e = a.get(n);
      if (e !== void 0)
        return e;
      var t = S(Ve(Vn(n)));
      return a.set(n, t), t;
    }
    var h = S(' style="'), m = S(":"), C = S(";");
    function x(n, e, t) {
      if (typeof t != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      var r = !0;
      for (var o in t)
        if (fe.call(t, o)) {
          var l = t[o];
          if (!(l == null || typeof l == "boolean" || l === "")) {
            var c = void 0, p = void 0, g = o.indexOf("--") === 0;
            g ? (c = P(Ve(o)), ne(l, o), p = P(Ve(("" + l).trim()))) : (Nr(o, l), c = u(o), typeof l == "number" ? l !== 0 && !fe.call(Te, o) ? p = P(l + "px") : p = P("" + l) : (ne(l, o), p = P(Ve(("" + l).trim())))), r ? (r = !1, n.push(h, c, m, p)) : n.push(C, c, m, p);
          }
        }
      r || n.push(q);
    }
    var F = S(" "), j = S('="'), q = S('"'), ae = S('=""');
    function ee(n, e, t, r) {
      switch (t) {
        case "style": {
          x(n, e, r);
          return;
        }
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (
        // shouldIgnoreAttribute
        // We have already filtered out null/undefined and reserved words.
        !(t.length > 2 && (t[0] === "o" || t[0] === "O") && (t[1] === "n" || t[1] === "N"))
      ) {
        var o = oe(t);
        if (o !== null) {
          switch (typeof r) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!o.acceptsBooleans)
                return;
          }
          var l = o.attributeName, c = P(l);
          switch (o.type) {
            case Fe:
              r && n.push(F, c, ae);
              return;
            case Le:
              r === !0 ? n.push(F, c, ae) : r === !1 || n.push(F, c, j, P(Ve(r)), q);
              return;
            case We:
              isNaN(r) || n.push(F, c, j, P(Ve(r)), q);
              break;
            case be:
              !isNaN(r) && r >= 1 && n.push(F, c, j, P(Ve(r)), q);
              break;
            default:
              o.sanitizeURL && (le(r, l), r = "" + r, Tr(r)), n.push(F, c, j, P(Ve(r)), q);
          }
        } else if (Q(t)) {
          switch (typeof r) {
            case "function":
            case "symbol":
              return;
            case "boolean": {
              var p = t.toLowerCase().slice(0, 5);
              if (p !== "data-" && p !== "aria-")
                return;
            }
          }
          n.push(F, P(t), j, P(Ve(r)), q);
        }
      }
    }
    var xe = S(">"), rt = S("/>");
    function nt(n, e, t) {
      if (e != null) {
        if (t != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof e != "object" || !("__html" in e))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        var r = e.__html;
        r != null && (Ae(r), n.push(P("" + r)));
      }
    }
    var ot = !1, qt = !1, Dt = !1, Pr = !1, er = !1, cr = !1, zt = !1;
    function fr(n, e) {
      {
        var t = n[e];
        if (t != null) {
          var r = at(t);
          n.multiple && !r ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.", e) : !n.multiple && r && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", e);
        }
      }
    }
    function Ra(n, e, t) {
      Bt("select", e), fr(e, "value"), fr(e, "defaultValue"), e.value !== void 0 && e.defaultValue !== void 0 && !Dt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Dt = !0), n.push(mt("select"));
      var r = null, o = null;
      for (var l in e)
        if (fe.call(e, l)) {
          var c = e[l];
          if (c == null)
            continue;
          switch (l) {
            case "children":
              r = c;
              break;
            case "dangerouslySetInnerHTML":
              o = c;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              ee(n, t, l, c);
              break;
          }
        }
      return n.push(xe), nt(n, o, r), r;
    }
    function Ia(n) {
      var e = "";
      return I.Children.forEach(n, function(t) {
        t != null && (e += t, !er && typeof t != "string" && typeof t != "number" && (er = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }), e;
    }
    var yn = S(' selected=""');
    function Ot(n, e, t, r) {
      var o = r.selectedValue;
      n.push(mt("option"));
      var l = null, c = null, p = null, g = null;
      for (var k in e)
        if (fe.call(e, k)) {
          var O = e[k];
          if (O == null)
            continue;
          switch (k) {
            case "children":
              l = O;
              break;
            case "selected":
              p = O, zt || (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), zt = !0);
              break;
            case "dangerouslySetInnerHTML":
              g = O;
              break;
            case "value":
              c = O;
            default:
              ee(n, t, k, O);
              break;
          }
        }
      if (o != null) {
        var B;
        if (c !== null ? (le(c, "value"), B = "" + c) : (g !== null && (cr || (cr = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), B = Ia(l)), at(o))
          for (var V = 0; V < o.length; V++) {
            le(o[V], "value");
            var ue = "" + o[V];
            if (ue === B) {
              n.push(yn);
              break;
            }
          }
        else
          le(o, "select.value"), "" + o === B && n.push(yn);
      } else p && n.push(yn);
      return n.push(xe), nt(n, g, l), l;
    }
    function Pa(n, e, t) {
      Bt("input", e), e.checked !== void 0 && e.defaultChecked !== void 0 && !qt && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", e.type), qt = !0), e.value !== void 0 && e.defaultValue !== void 0 && !ot && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", e.type), ot = !0), n.push(mt("input"));
      var r = null, o = null, l = null, c = null;
      for (var p in e)
        if (fe.call(e, p)) {
          var g = e[p];
          if (g == null)
            continue;
          switch (p) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "defaultChecked":
              c = g;
              break;
            case "defaultValue":
              o = g;
              break;
            case "checked":
              l = g;
              break;
            case "value":
              r = g;
              break;
            default:
              ee(n, t, p, g);
              break;
          }
        }
      return l !== null ? ee(n, t, "checked", l) : c !== null && ee(n, t, "checked", c), r !== null ? ee(n, t, "value", r) : o !== null && ee(n, t, "value", o), n.push(rt), null;
    }
    function Ht(n, e, t) {
      Bt("textarea", e), e.value !== void 0 && e.defaultValue !== void 0 && !Pr && (f("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Pr = !0), n.push(mt("textarea"));
      var r = null, o = null, l = null;
      for (var c in e)
        if (fe.call(e, c)) {
          var p = e[c];
          if (p == null)
            continue;
          switch (c) {
            case "children":
              l = p;
              break;
            case "value":
              r = p;
              break;
            case "defaultValue":
              o = p;
              break;
            case "dangerouslySetInnerHTML":
              throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
            default:
              ee(n, t, c, p);
              break;
          }
        }
      if (r === null && o !== null && (r = o), n.push(xe), l != null) {
        if (f("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), r != null)
          throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
        if (at(l)) {
          if (l.length > 1)
            throw new Error("<textarea> can only have at most one child.");
          Ae(l[0]), r = "" + l[0];
        }
        Ae(l), r = "" + l;
      }
      return typeof r == "string" && r[0] === `
` && n.push(pr), r !== null && (le(r, "value"), n.push(P(tt("" + r)))), null;
    }
    function Yn(n, e, t, r) {
      n.push(mt(t));
      for (var o in e)
        if (fe.call(e, o)) {
          var l = e[o];
          if (l == null)
            continue;
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw new Error(t + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            default:
              ee(n, r, o, l);
              break;
          }
        }
      return n.push(rt), null;
    }
    function bn(n, e, t) {
      n.push(mt("menuitem"));
      for (var r in e)
        if (fe.call(e, r)) {
          var o = e[r];
          if (o == null)
            continue;
          switch (r) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              ee(n, t, r, o);
              break;
          }
        }
      return n.push(xe), null;
    }
    function _e(n, e, t) {
      n.push(mt("title"));
      var r = null;
      for (var o in e)
        if (fe.call(e, o)) {
          var l = e[o];
          if (l == null)
            continue;
          switch (o) {
            case "children":
              r = l;
              break;
            case "dangerouslySetInnerHTML":
              throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
            default:
              ee(n, t, o, l);
              break;
          }
        }
      n.push(xe);
      {
        var c = Array.isArray(r) && r.length < 2 ? r[0] || null : r;
        Array.isArray(r) && r.length > 1 ? f("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : c != null && c.$$typeof != null ? f("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : c != null && typeof c != "string" && typeof c != "number" && f("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
      }
      return r;
    }
    function dr(n, e, t, r) {
      n.push(mt(t));
      var o = null, l = null;
      for (var c in e)
        if (fe.call(e, c)) {
          var p = e[c];
          if (p == null)
            continue;
          switch (c) {
            case "children":
              o = p;
              break;
            case "dangerouslySetInnerHTML":
              l = p;
              break;
            default:
              ee(n, r, c, p);
              break;
          }
        }
      return n.push(xe), nt(n, l, o), typeof o == "string" ? (n.push(P(tt(o))), null) : o;
    }
    function Sn(n, e, t, r) {
      n.push(mt(t));
      var o = null, l = null;
      for (var c in e)
        if (fe.call(e, c)) {
          var p = e[c];
          if (p == null)
            continue;
          switch (c) {
            case "children":
              o = p;
              break;
            case "dangerouslySetInnerHTML":
              l = p;
              break;
            case "style":
              x(n, r, p);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              Q(c) && typeof p != "function" && typeof p != "symbol" && n.push(F, P(c), j, P(Ve(p)), q);
              break;
          }
        }
      return n.push(xe), nt(n, l, o), o;
    }
    var pr = S(`
`);
    function tr(n, e, t, r) {
      n.push(mt(t));
      var o = null, l = null;
      for (var c in e)
        if (fe.call(e, c)) {
          var p = e[c];
          if (p == null)
            continue;
          switch (c) {
            case "children":
              o = p;
              break;
            case "dangerouslySetInnerHTML":
              l = p;
              break;
            default:
              ee(n, r, c, p);
              break;
          }
        }
      if (n.push(xe), l != null) {
        if (o != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof l != "object" || !("__html" in l))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        var g = l.__html;
        g != null && (typeof g == "string" && g.length > 0 && g[0] === `
` ? n.push(pr, P(g)) : (Ae(g), n.push(P("" + g))));
      }
      return typeof o == "string" && o[0] === `
` && n.push(pr), o;
    }
    var wn = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, rr = /* @__PURE__ */ new Map();
    function mt(n) {
      var e = rr.get(n);
      if (e === void 0) {
        if (!wn.test(n))
          throw new Error("Invalid tag: " + n);
        e = S("<" + n), rr.set(n, e);
      }
      return e;
    }
    var Gn = S("<!DOCTYPE html>");
    function Xr(n, e, t, r, o) {
      switch (Qe(e, t), Br(e, t), $n(e, t, null), !t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), o.insertionMode !== Pt && o.insertionMode !== At && e.indexOf("-") === -1 && typeof t.is != "string" && e.toLowerCase() !== e && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e) {
        case "select":
          return Ra(n, t, r);
        case "option":
          return Ot(n, t, r, o);
        case "textarea":
          return Ht(n, t, r);
        case "input":
          return Pa(n, t, r);
        case "menuitem":
          return bn(n, t, r);
        case "title":
          return _e(n, t, r);
        case "listing":
        case "pre":
          return tr(n, t, e, r);
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          return Yn(n, t, e, r);
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return dr(n, t, e, r);
        case "html":
          return o.insertionMode === jt && n.push(Gn), dr(n, t, e, r);
        default:
          return e.indexOf("-") === -1 && typeof t.is != "string" ? dr(n, t, e, r) : Sn(n, t, e, r);
      }
    }
    var Io = S("</"), xn = S(">");
    function Po(n, e, t) {
      switch (e) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          n.push(Io, P(e), xn);
      }
    }
    function Aa(n, e) {
      for (var t = e.bootstrapChunks, r = 0; r < t.length - 1; r++)
        A(n, t[r]);
      return r < t.length ? Y(n, t[r]) : !0;
    }
    var Fa = S('<template id="'), kn = S('"></template>');
    function Ao(n, e, t) {
      A(n, Fa), A(n, e.placeholderPrefix);
      var r = P(t.toString(16));
      return A(n, r), Y(n, kn);
    }
    var Zr = S("<!--$-->"), Xn = S('<!--$?--><template id="'), _a = S('"></template>'), Ar = S("<!--$!-->"), Zn = S("<!--/$-->"), Jn = S("<template"), Fr = S('"'), Jr = S(' data-dgst="'), Tn = S(' data-msg="'), Fo = S(' data-stck="'), _o = S("></template>");
    function Do(n, e) {
      return Y(n, Zr);
    }
    function Cn(n, e, t) {
      if (A(n, Xn), t === null)
        throw new Error("An ID must have been assigned before we can complete the boundary.");
      return A(n, t), Y(n, _a);
    }
    function st(n, e, t, r, o) {
      var l;
      return l = Y(n, Ar), A(n, Jn), t && (A(n, Jr), A(n, P(Ve(t))), A(n, Fr)), r && (A(n, Tn), A(n, P(Ve(r))), A(n, Fr)), o && (A(n, Fo), A(n, P(Ve(o))), A(n, Fr)), l = Y(n, _o), l;
    }
    function Oo(n, e) {
      return Y(n, Zn);
    }
    function En(n, e) {
      return Y(n, Zn);
    }
    function Da(n, e) {
      return Y(n, Zn);
    }
    var Mo = S('<div hidden id="'), Rn = S('">'), Lo = S("</div>"), Bo = S('<svg aria-hidden="true" style="display:none" id="'), In = S('">'), Pn = S("</svg>"), Uo = S('<math aria-hidden="true" style="display:none" id="'), jo = S('">'), zo = S("</math>"), Qn = S('<table hidden id="'), Ho = S('">'), i = S("</table>"), s = S('<table hidden><tbody id="'), d = S('">'), v = S("</tbody></table>"), E = S('<table hidden><tr id="'), T = S('">'), D = S("</tr></table>"), z = S('<table hidden><colgroup id="'), ie = S('">'), ye = S("</colgroup></table>");
    function me(n, e, t, r) {
      switch (t.insertionMode) {
        case jt:
        case Ye:
          return A(n, Mo), A(n, e.segmentPrefix), A(n, P(r.toString(16))), Y(n, Rn);
        case Pt:
          return A(n, Bo), A(n, e.segmentPrefix), A(n, P(r.toString(16))), Y(n, In);
        case At:
          return A(n, Uo), A(n, e.segmentPrefix), A(n, P(r.toString(16))), Y(n, jo);
        case Qt:
          return A(n, Qn), A(n, e.segmentPrefix), A(n, P(r.toString(16))), Y(n, Ho);
        case Er:
          return A(n, s), A(n, e.segmentPrefix), A(n, P(r.toString(16))), Y(n, d);
        case vt:
          return A(n, E), A(n, e.segmentPrefix), A(n, P(r.toString(16))), Y(n, T);
        case Ft:
          return A(n, z), A(n, e.segmentPrefix), A(n, P(r.toString(16))), Y(n, ie);
        default:
          throw new Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function Me(n, e) {
      switch (e.insertionMode) {
        case jt:
        case Ye:
          return Y(n, Lo);
        case Pt:
          return Y(n, Pn);
        case At:
          return Y(n, zo);
        case Qt:
          return Y(n, i);
        case Er:
          return Y(n, v);
        case vt:
          return Y(n, D);
        case Ft:
          return Y(n, ye);
        default:
          throw new Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var ut = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}", gt = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}', yt = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}', An = S(ut + ';$RS("'), Wo = S('$RS("'), Qr = S('","'), ll = S('")<\/script>');
    function sl(n, e, t) {
      A(n, e.startInlineScript), e.sentCompleteSegmentFunction ? A(n, Wo) : (e.sentCompleteSegmentFunction = !0, A(n, An)), A(n, e.segmentPrefix);
      var r = P(t.toString(16));
      return A(n, r), A(n, Qr), A(n, e.placeholderPrefix), A(n, r), Y(n, ll);
    }
    var Oa = S(gt + ';$RC("'), ul = S('$RC("'), cl = S('","'), yi = S('")<\/script>');
    function bi(n, e, t, r) {
      if (A(n, e.startInlineScript), e.sentCompleteBoundaryFunction ? A(n, ul) : (e.sentCompleteBoundaryFunction = !0, A(n, Oa)), t === null)
        throw new Error("An ID must have been assigned before we can complete the boundary.");
      var o = P(r.toString(16));
      return A(n, t), A(n, cl), A(n, e.segmentPrefix), A(n, o), Y(n, yi);
    }
    var fl = S(yt + ';$RX("'), dl = S('$RX("'), pl = S('"'), hl = S(")<\/script>"), dt = S(",");
    function vl(n, e, t, r, o, l) {
      if (A(n, e.startInlineScript), e.sentClientRenderFunction ? A(n, dl) : (e.sentClientRenderFunction = !0, A(n, fl)), t === null)
        throw new Error("An ID must have been assigned before we can complete the boundary.");
      return A(n, t), A(n, pl), (r || o || l) && (A(n, dt), A(n, P($o(r || "")))), (o || l) && (A(n, dt), A(n, P($o(o || "")))), l && (A(n, dt), A(n, P($o(l)))), Y(n, hl);
    }
    var Si = /[<\u2028\u2029]/g;
    function $o(n) {
      var e = JSON.stringify(n);
      return e.replace(Si, function(t) {
        switch (t) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    var bt = Object.assign, wi = Symbol.for("react.element"), No = Symbol.for("react.portal"), Vo = Symbol.for("react.fragment"), Yo = Symbol.for("react.strict_mode"), Go = Symbol.for("react.profiler"), Kn = Symbol.for("react.provider"), qn = Symbol.for("react.context"), Fn = Symbol.for("react.forward_ref"), Ma = Symbol.for("react.suspense"), La = Symbol.for("react.suspense_list"), Ba = Symbol.for("react.memo"), Xo = Symbol.for("react.lazy"), xi = Symbol.for("react.scope"), ml = Symbol.for("react.debug_trace_mode"), gl = Symbol.for("react.legacy_hidden"), yl = Symbol.for("react.default_value"), Ua = Symbol.iterator, He = "@@iterator";
    function eo(n) {
      if (n === null || typeof n != "object")
        return null;
      var e = Ua && n[Ua] || n[He];
      return typeof e == "function" ? e : null;
    }
    function ki(n, e, t) {
      var r = n.displayName;
      if (r)
        return r;
      var o = e.displayName || e.name || "";
      return o !== "" ? t + "(" + o + ")" : t;
    }
    function ja(n) {
      return n.displayName || "Context";
    }
    function Ue(n) {
      if (n == null)
        return null;
      if (typeof n.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof n == "function")
        return n.displayName || n.name || null;
      if (typeof n == "string")
        return n;
      switch (n) {
        case Vo:
          return "Fragment";
        case No:
          return "Portal";
        case Go:
          return "Profiler";
        case Yo:
          return "StrictMode";
        case Ma:
          return "Suspense";
        case La:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case qn:
            var e = n;
            return ja(e) + ".Consumer";
          case Kn:
            var t = n;
            return ja(t._context) + ".Provider";
          case Fn:
            return ki(n, n.render, "ForwardRef");
          case Ba:
            var r = n.displayName || null;
            return r !== null ? r : Ue(n.type) || "Memo";
          case Xo: {
            var o = n, l = o._payload, c = o._init;
            try {
              return Ue(c(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var _n = 0, za, Ha, Wa, $a, Ti, Ci, Zo;
    function Jo() {
    }
    Jo.__reactDisabledLog = !0;
    function to() {
      {
        if (_n === 0) {
          za = console.log, Ha = console.info, Wa = console.warn, $a = console.error, Ti = console.group, Ci = console.groupCollapsed, Zo = console.groupEnd;
          var n = {
            configurable: !0,
            enumerable: !0,
            value: Jo,
            writable: !0
          };
          Object.defineProperties(console, {
            info: n,
            log: n,
            warn: n,
            error: n,
            group: n,
            groupCollapsed: n,
            groupEnd: n
          });
        }
        _n++;
      }
    }
    function Na() {
      {
        if (_n--, _n === 0) {
          var n = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: bt({}, n, {
              value: za
            }),
            info: bt({}, n, {
              value: Ha
            }),
            warn: bt({}, n, {
              value: Wa
            }),
            error: bt({}, n, {
              value: $a
            }),
            group: bt({}, n, {
              value: Ti
            }),
            groupCollapsed: bt({}, n, {
              value: Ci
            }),
            groupEnd: bt({}, n, {
              value: Zo
            })
          });
        }
        _n < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Dn = R.ReactCurrentDispatcher, Va;
    function Kr(n, e, t) {
      {
        if (Va === void 0)
          try {
            throw Error();
          } catch (o) {
            var r = o.stack.trim().match(/\n( *(at )?)/);
            Va = r && r[1] || "";
          }
        return `
` + Va + n;
      }
    }
    var Ya = !1, ro;
    {
      var bl = typeof WeakMap == "function" ? WeakMap : Map;
      ro = new bl();
    }
    function no(n, e) {
      if (!n || Ya)
        return "";
      {
        var t = ro.get(n);
        if (t !== void 0)
          return t;
      }
      var r;
      Ya = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = Dn.current, Dn.current = null, to();
      try {
        if (e) {
          var c = function() {
            throw Error();
          };
          if (Object.defineProperty(c.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(c, []);
            } catch (Ce) {
              r = Ce;
            }
            Reflect.construct(n, [], c);
          } else {
            try {
              c.call();
            } catch (Ce) {
              r = Ce;
            }
            n.call(c.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ce) {
            r = Ce;
          }
          n();
        }
      } catch (Ce) {
        if (Ce && r && typeof Ce.stack == "string") {
          for (var p = Ce.stack.split(`
`), g = r.stack.split(`
`), k = p.length - 1, O = g.length - 1; k >= 1 && O >= 0 && p[k] !== g[O]; )
            O--;
          for (; k >= 1 && O >= 0; k--, O--)
            if (p[k] !== g[O]) {
              if (k !== 1 || O !== 1)
                do
                  if (k--, O--, O < 0 || p[k] !== g[O]) {
                    var B = `
` + p[k].replace(" at new ", " at ");
                    return n.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", n.displayName)), typeof n == "function" && ro.set(n, B), B;
                  }
                while (k >= 1 && O >= 0);
              break;
            }
        }
      } finally {
        Ya = !1, Dn.current = l, Na(), Error.prepareStackTrace = o;
      }
      var V = n ? n.displayName || n.name : "", ue = V ? Kr(V) : "";
      return typeof n == "function" && ro.set(n, ue), ue;
    }
    function Ei(n, e, t) {
      return no(n, !0);
    }
    function Ga(n, e, t) {
      return no(n, !1);
    }
    function Qo(n) {
      var e = n.prototype;
      return !!(e && e.isReactComponent);
    }
    function Ko(n, e, t) {
      if (n == null)
        return "";
      if (typeof n == "function")
        return no(n, Qo(n));
      if (typeof n == "string")
        return Kr(n);
      switch (n) {
        case Ma:
          return Kr("Suspense");
        case La:
          return Kr("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case Fn:
            return Ga(n.render);
          case Ba:
            return Ko(n.type, e, t);
          case Xo: {
            var r = n, o = r._payload, l = r._init;
            try {
              return Ko(l(o), e, t);
            } catch {
            }
          }
        }
      return "";
    }
    var qo = {}, oo = R.ReactDebugCurrentFrame;
    function ao(n) {
      if (n) {
        var e = n._owner, t = Ko(n.type, n._source, e ? e.type : null);
        oo.setExtraStackFrame(t);
      } else
        oo.setExtraStackFrame(null);
    }
    function Ri(n, e, t, r, o) {
      {
        var l = Function.call.bind(fe);
        for (var c in n)
          if (l(n, c)) {
            var p = void 0;
            try {
              if (typeof n[c] != "function") {
                var g = Error((r || "React class") + ": " + t + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw g.name = "Invariant Violation", g;
              }
              p = n[c](e, c, r, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              p = k;
            }
            p && !(p instanceof Error) && (ao(o), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", r || "React class", t, c, typeof p), ao(null)), p instanceof Error && !(p.message in qo) && (qo[p.message] = !0, ao(o), f("Failed %s type: %s", t, p.message), ao(null));
          }
      }
    }
    var qr;
    qr = {};
    var ea = {};
    Object.freeze(ea);
    function _r(n, e) {
      {
        var t = n.contextTypes;
        if (!t)
          return ea;
        var r = {};
        for (var o in t)
          r[o] = e[o];
        {
          var l = Ue(n) || "Unknown";
          Ri(t, r, "context", l);
        }
        return r;
      }
    }
    function Xa(n, e, t, r) {
      {
        if (typeof n.getChildContext != "function") {
          {
            var o = Ue(e) || "Unknown";
            qr[o] || (qr[o] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", o, o));
          }
          return t;
        }
        var l = n.getChildContext();
        for (var c in l)
          if (!(c in r))
            throw new Error((Ue(e) || "Unknown") + '.getChildContext(): key "' + c + '" is not defined in childContextTypes.');
        {
          var p = Ue(e) || "Unknown";
          Ri(r, l, "child context", p);
        }
        return bt({}, t, l);
      }
    }
    var en;
    en = {};
    var ta = null, Dr = null;
    function ra(n) {
      n.context._currentValue = n.parentValue;
    }
    function na(n) {
      n.context._currentValue = n.value;
    }
    function io(n, e) {
      if (n !== e) {
        ra(n);
        var t = n.parent, r = e.parent;
        if (t === null) {
          if (r !== null)
            throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
          if (r === null)
            throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
          io(t, r);
        }
        na(e);
      }
    }
    function lo(n) {
      ra(n);
      var e = n.parent;
      e !== null && lo(e);
    }
    function Ii(n) {
      var e = n.parent;
      e !== null && Ii(e), na(n);
    }
    function Pi(n, e) {
      ra(n);
      var t = n.parent;
      if (t === null)
        throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      t.depth === e.depth ? io(t, e) : Pi(t, e);
    }
    function Ai(n, e) {
      var t = e.parent;
      if (t === null)
        throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      n.depth === t.depth ? io(n, t) : Ai(n, t), na(e);
    }
    function Or(n) {
      var e = Dr, t = n;
      e !== t && (e === null ? Ii(t) : t === null ? lo(e) : e.depth === t.depth ? io(e, t) : e.depth > t.depth ? Pi(e, t) : Ai(e, t), Dr = t);
    }
    function Za(n, e) {
      var t;
      t = n._currentValue, n._currentValue = e, n._currentRenderer !== void 0 && n._currentRenderer !== null && n._currentRenderer !== en && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), n._currentRenderer = en;
      var r = Dr, o = {
        parent: r,
        depth: r === null ? 0 : r.depth + 1,
        context: n,
        parentValue: t,
        value: e
      };
      return Dr = o, o;
    }
    function Sl(n) {
      var e = Dr;
      if (e === null)
        throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
      e.context !== n && f("The parent context is not the expected context. This is probably a bug in React.");
      {
        var t = e.parentValue;
        t === yl ? e.context._currentValue = e.context._defaultValue : e.context._currentValue = t, n._currentRenderer !== void 0 && n._currentRenderer !== null && n._currentRenderer !== en && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), n._currentRenderer = en;
      }
      return Dr = e.parent;
    }
    function Fi() {
      return Dr;
    }
    function On(n) {
      var e = n._currentValue;
      return e;
    }
    function so(n) {
      return n._reactInternals;
    }
    function Ja(n, e) {
      n._reactInternals = e;
    }
    var oa = {}, aa = {}, ia, Mn, uo, co, la, fo, sa, ua, Qa;
    {
      ia = /* @__PURE__ */ new Set(), Mn = /* @__PURE__ */ new Set(), uo = /* @__PURE__ */ new Set(), sa = /* @__PURE__ */ new Set(), co = /* @__PURE__ */ new Set(), ua = /* @__PURE__ */ new Set(), Qa = /* @__PURE__ */ new Set();
      var _i = /* @__PURE__ */ new Set();
      fo = function(n, e) {
        if (!(n === null || typeof n == "function")) {
          var t = e + "_" + n;
          _i.has(t) || (_i.add(t), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", e, n));
        }
      }, la = function(n, e) {
        if (e === void 0) {
          var t = Ue(n) || "Component";
          co.has(t) || (co.add(t), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t));
        }
      };
    }
    function Di(n, e) {
      {
        var t = n.constructor, r = t && Ue(t) || "ReactClass", o = r + "." + e;
        if (oa[o])
          return;
        f(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, e, e, r), oa[o] = !0;
      }
    }
    var Oi = {
      isMounted: function(n) {
        return !1;
      },
      enqueueSetState: function(n, e, t) {
        var r = so(n);
        r.queue === null ? Di(n, "setState") : (r.queue.push(e), t != null && fo(t, "setState"));
      },
      enqueueReplaceState: function(n, e, t) {
        var r = so(n);
        r.replace = !0, r.queue = [e], t != null && fo(t, "setState");
      },
      enqueueForceUpdate: function(n, e) {
        var t = so(n);
        t.queue === null ? Di(n, "forceUpdate") : e != null && fo(e, "setState");
      }
    };
    function wl(n, e, t, r, o) {
      var l = t(o, r);
      la(e, l);
      var c = l == null ? r : bt({}, r, l);
      return c;
    }
    function Mi(n, e, t) {
      var r = ea, o = n.contextType;
      if ("contextType" in n) {
        var l = (
          // Allow null for conditional declaration
          o === null || o !== void 0 && o.$$typeof === qn && o._context === void 0
        );
        if (!l && !Qa.has(n)) {
          Qa.add(n);
          var c = "";
          o === void 0 ? c = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof o != "object" ? c = " However, it is set to a " + typeof o + "." : o.$$typeof === Kn ? c = " Did you accidentally pass the Context.Provider instead?" : o._context !== void 0 ? c = " Did you accidentally pass the Context.Consumer instead?" : c = " However, it is set to an object with keys {" + Object.keys(o).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ue(n) || "Component", c);
        }
      }
      typeof o == "object" && o !== null ? r = On(o) : r = t;
      var p = new n(e, r);
      {
        if (typeof n.getDerivedStateFromProps == "function" && (p.state === null || p.state === void 0)) {
          var g = Ue(n) || "Component";
          ia.has(g) || (ia.add(g), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", g, p.state === null ? "null" : "undefined", g));
        }
        if (typeof n.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function") {
          var k = null, O = null, B = null;
          if (typeof p.componentWillMount == "function" && p.componentWillMount.__suppressDeprecationWarning !== !0 ? k = "componentWillMount" : typeof p.UNSAFE_componentWillMount == "function" && (k = "UNSAFE_componentWillMount"), typeof p.componentWillReceiveProps == "function" && p.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? O = "componentWillReceiveProps" : typeof p.UNSAFE_componentWillReceiveProps == "function" && (O = "UNSAFE_componentWillReceiveProps"), typeof p.componentWillUpdate == "function" && p.componentWillUpdate.__suppressDeprecationWarning !== !0 ? B = "componentWillUpdate" : typeof p.UNSAFE_componentWillUpdate == "function" && (B = "UNSAFE_componentWillUpdate"), k !== null || O !== null || B !== null) {
            var V = Ue(n) || "Component", ue = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            uo.has(V) || (uo.add(V), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, V, ue, k !== null ? `
  ` + k : "", O !== null ? `
  ` + O : "", B !== null ? `
  ` + B : ""));
          }
        }
      }
      return p;
    }
    function xl(n, e, t) {
      {
        var r = Ue(e) || "Component", o = n.render;
        o || (e.prototype && typeof e.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), n.getInitialState && !n.getInitialState.isReactClassApproved && !n.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), n.getDefaultProps && !n.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), n.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), n.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), n.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), e.contextType && e.contextTypes && !ua.has(e) && (ua.add(e), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof n.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), e.prototype && e.prototype.isPureReactComponent && typeof n.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ue(e) || "A pure component"), typeof n.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof n.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof n.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof n.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
        var l = n.props !== t;
        n.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), n.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof n.getSnapshotBeforeUpdate == "function" && typeof n.componentDidUpdate != "function" && !Mn.has(e) && (Mn.add(e), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ue(e))), typeof n.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof n.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof e.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
        var c = n.state;
        c && (typeof c != "object" || at(c)) && f("%s.state: must be set to an object or null", r), typeof n.getChildContext == "function" && typeof e.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
      }
    }
    function kl(n, e) {
      var t = e.state;
      if (typeof e.componentWillMount == "function") {
        if (e.componentWillMount.__suppressDeprecationWarning !== !0) {
          var r = Ue(n) || "Unknown";
          aa[r] || (L(
            // keep this warning in sync with ReactStrictModeWarning.js
            `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
            r
          ), aa[r] = !0);
        }
        e.componentWillMount();
      }
      typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), t !== e.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ue(n) || "Component"), Oi.enqueueReplaceState(e, e.state, null));
    }
    function Ka(n, e, t, r) {
      if (n.queue !== null && n.queue.length > 0) {
        var o = n.queue, l = n.replace;
        if (n.queue = null, n.replace = !1, l && o.length === 1)
          e.state = o[0];
        else {
          for (var c = l ? o[0] : e.state, p = !0, g = l ? 1 : 0; g < o.length; g++) {
            var k = o[g], O = typeof k == "function" ? k.call(e, c, t, r) : k;
            O != null && (p ? (p = !1, c = bt({}, c, O)) : bt(c, O));
          }
          e.state = c;
        }
      } else
        n.queue = null;
    }
    function po(n, e, t, r) {
      xl(n, e, t);
      var o = n.state !== void 0 ? n.state : null;
      n.updater = Oi, n.props = t, n.state = o;
      var l = {
        queue: [],
        replace: !1
      };
      Ja(n, l);
      var c = e.contextType;
      if (typeof c == "object" && c !== null ? n.context = On(c) : n.context = r, n.state === t) {
        var p = Ue(e) || "Component";
        sa.has(p) || (sa.add(p), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
      }
      var g = e.getDerivedStateFromProps;
      typeof g == "function" && (n.state = wl(n, e, g, o, t)), typeof e.getDerivedStateFromProps != "function" && typeof n.getSnapshotBeforeUpdate != "function" && (typeof n.UNSAFE_componentWillMount == "function" || typeof n.componentWillMount == "function") && (kl(e, n), Ka(l, n, t, r));
    }
    var Tl = {
      id: 1,
      overflow: ""
    };
    function Cl(n) {
      var e = n.overflow, t = n.id, r = t & ~El(t);
      return r.toString(32) + e;
    }
    function qa(n, e, t) {
      var r = n.id, o = n.overflow, l = ca(r) - 1, c = r & ~(1 << l), p = t + 1, g = ca(e) + l;
      if (g > 30) {
        var k = l - l % 5, O = (1 << k) - 1, B = (c & O).toString(32), V = c >> k, ue = l - k, Ce = ca(e) + ue, Ke = p << ue, sn = Ke | V, un = B + o;
        return {
          id: 1 << Ce | sn,
          overflow: un
        };
      } else {
        var yr = p << l, Wn = yr | c, rs = o;
        return {
          id: 1 << g | Wn,
          overflow: rs
        };
      }
    }
    function ca(n) {
      return 32 - Rl(n);
    }
    function El(n) {
      return 1 << ca(n) - 1;
    }
    var Rl = Math.clz32 ? Math.clz32 : ei, Il = Math.log, hr = Math.LN2;
    function ei(n) {
      var e = n >>> 0;
      return e === 0 ? 32 : 31 - (Il(e) / hr | 0) | 0;
    }
    function fa(n, e) {
      return n === e && (n !== 0 || 1 / n === 1 / e) || n !== n && e !== e;
    }
    var Be = typeof Object.is == "function" ? Object.is : fa, St = null, Ln = null, tn = null, ke = null, Mr = !1, da = !1, wt = 0, xt = null, nr = 0, Pl = 25, Wt = !1, Lr;
    function rn() {
      if (St === null)
        throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return Wt && f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), St;
    }
    function Al(n, e) {
      if (e === null)
        return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Lr), !1;
      n.length !== e.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, Lr, "[" + n.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var t = 0; t < e.length && t < n.length; t++)
        if (!Be(n[t], e[t]))
          return !1;
      return !0;
    }
    function ti() {
      if (nr > 0)
        throw new Error("Rendered more hooks than during the previous render");
      return {
        memoizedState: null,
        queue: null,
        next: null
      };
    }
    function ho() {
      return ke === null ? tn === null ? (Mr = !1, tn = ke = ti()) : (Mr = !0, ke = tn) : ke.next === null ? (Mr = !1, ke = ke.next = ti()) : (Mr = !0, ke = ke.next), ke;
    }
    function Fl(n, e) {
      St = e, Ln = n, Wt = !1, wt = 0;
    }
    function _l(n, e, t, r) {
      for (; da; )
        da = !1, wt = 0, nr += 1, ke = null, t = n(e, r);
      return ri(), t;
    }
    function pa() {
      var n = wt !== 0;
      return n;
    }
    function ri() {
      Wt = !1, St = null, Ln = null, da = !1, tn = null, nr = 0, xt = null, ke = null;
    }
    function Li(n) {
      return Wt && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), On(n);
    }
    function Bi(n) {
      return Lr = "useContext", rn(), On(n);
    }
    function ni(n, e) {
      return typeof e == "function" ? e(n) : e;
    }
    function Dl(n) {
      return Lr = "useState", Ui(
        ni,
        // useReducer has a special case to support lazy useState initializers
        n
      );
    }
    function Ui(n, e, t) {
      if (n !== ni && (Lr = "useReducer"), St = rn(), ke = ho(), Mr) {
        var r = ke.queue, o = r.dispatch;
        if (xt !== null) {
          var l = xt.get(r);
          if (l !== void 0) {
            xt.delete(r);
            var c = ke.memoizedState, p = l;
            do {
              var g = p.action;
              Wt = !0, c = n(c, g), Wt = !1, p = p.next;
            } while (p !== null);
            return ke.memoizedState = c, [c, o];
          }
        }
        return [ke.memoizedState, o];
      } else {
        Wt = !0;
        var k;
        n === ni ? k = typeof e == "function" ? e() : e : k = t !== void 0 ? t(e) : e, Wt = !1, ke.memoizedState = k;
        var O = ke.queue = {
          last: null,
          dispatch: null
        }, B = O.dispatch = Ll.bind(null, St, O);
        return [ke.memoizedState, B];
      }
    }
    function ji(n, e) {
      St = rn(), ke = ho();
      var t = e === void 0 ? null : e;
      if (ke !== null) {
        var r = ke.memoizedState;
        if (r !== null && t !== null) {
          var o = r[1];
          if (Al(t, o))
            return r[0];
        }
      }
      Wt = !0;
      var l = n();
      return Wt = !1, ke.memoizedState = [l, t], l;
    }
    function Ol(n) {
      St = rn(), ke = ho();
      var e = ke.memoizedState;
      if (e === null) {
        var t = {
          current: n
        };
        return Object.seal(t), ke.memoizedState = t, t;
      } else
        return e;
    }
    function Ml(n, e) {
      Lr = "useLayoutEffect", f("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
    }
    function Ll(n, e, t) {
      if (nr >= Pl)
        throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
      if (n === St) {
        da = !0;
        var r = {
          action: t,
          next: null
        };
        xt === null && (xt = /* @__PURE__ */ new Map());
        var o = xt.get(e);
        if (o === void 0)
          xt.set(e, r);
        else {
          for (var l = o; l.next !== null; )
            l = l.next;
          l.next = r;
        }
      }
    }
    function Bl(n, e) {
      return ji(function() {
        return n;
      }, e);
    }
    function Ul(n, e, t) {
      return rn(), e(n._source);
    }
    function jl(n, e, t) {
      if (t === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      return t();
    }
    function ha(n) {
      return rn(), n;
    }
    function zi() {
      throw new Error("startTransition cannot be called during server rendering.");
    }
    function oi() {
      return rn(), [!1, zi];
    }
    function Hi() {
      var n = Ln, e = Cl(n.treeContext), t = vo;
      if (t === null)
        throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
      var r = wt++;
      return _t(t, e, r);
    }
    function va() {
    }
    var ma = {
      readContext: Li,
      useContext: Bi,
      useMemo: ji,
      useReducer: Ui,
      useRef: Ol,
      useState: Dl,
      useInsertionEffect: va,
      useLayoutEffect: Ml,
      useCallback: Bl,
      // useImperativeHandle is not run in the server environment
      useImperativeHandle: va,
      // Effects are not run in the server environment.
      useEffect: va,
      // Debugging effect
      useDebugValue: va,
      useDeferredValue: ha,
      useTransition: oi,
      useId: Hi,
      // Subscriptions are not setup in a server environment.
      useMutableSource: Ul,
      useSyncExternalStore: jl
    }, vo = null;
    function ga(n) {
      vo = n;
    }
    function Bn(n) {
      try {
        var e = "", t = n;
        do {
          switch (t.tag) {
            case 0:
              e += Kr(t.type, null, null);
              break;
            case 1:
              e += Ga(t.type, null, null);
              break;
            case 2:
              e += Ei(t.type, null, null);
              break;
          }
          t = t.parent;
        } while (t);
        return e;
      } catch (r) {
        return `
Error generating stack: ` + r.message + `
` + r.stack;
      }
    }
    var ya = R.ReactCurrentDispatcher, ba = R.ReactDebugCurrentFrame, Sa = 0, Un = 1, ai = 2, nn = 3, Wi = 4, zl = 0, jn = 1, zn = 2, Hl = 12800;
    function Wl(n) {
      return console.error(n), null;
    }
    function on() {
    }
    function wa(n, e, t, r, o, l, c, p, g) {
      var k = [], O = /* @__PURE__ */ new Set(), B = {
        destination: null,
        responseState: e,
        progressiveChunkSize: r === void 0 ? Hl : r,
        status: zl,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: O,
        pingedTasks: k,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: o === void 0 ? Wl : o,
        onAllReady: l === void 0 ? on : l,
        onShellReady: c === void 0 ? on : c,
        onShellError: p === void 0 ? on : p,
        onFatalError: g === void 0 ? on : g
      }, V = mo(
        B,
        0,
        null,
        t,
        // Root segments are never embedded in Text on either edge
        !1,
        !1
      );
      V.parentFlushed = !0;
      var ue = an(B, n, null, V, O, ea, ta, Tl);
      return k.push(ue), B;
    }
    function vr(n, e) {
      var t = n.pingedTasks;
      t.push(e), t.length === 1 && $(function() {
        return mi(n);
      });
    }
    function ii(n, e) {
      return {
        id: Rr,
        rootSegmentID: -1,
        parentFlushed: !1,
        pendingTasks: 0,
        forceClientRender: !1,
        completedSegments: [],
        byteSize: 0,
        fallbackAbortableTasks: e,
        errorDigest: null
      };
    }
    function an(n, e, t, r, o, l, c, p) {
      n.allPendingTasks++, t === null ? n.pendingRootTasks++ : t.pendingTasks++;
      var g = {
        node: e,
        ping: function() {
          return vr(n, g);
        },
        blockedBoundary: t,
        blockedSegment: r,
        abortSet: o,
        legacyContext: l,
        context: c,
        treeContext: p
      };
      return g.componentStack = null, o.add(g), g;
    }
    function mo(n, e, t, r, o, l) {
      return {
        status: Sa,
        id: -1,
        // lazily assigned later
        index: e,
        parentFlushed: !1,
        chunks: [],
        children: [],
        formatContext: r,
        boundary: t,
        lastPushedText: o,
        textEmbedded: l
      };
    }
    var mr = null;
    function or() {
      return mr === null || mr.componentStack === null ? "" : Bn(mr.componentStack);
    }
    function gr(n, e) {
      n.componentStack = {
        tag: 0,
        parent: n.componentStack,
        type: e
      };
    }
    function xa(n, e) {
      n.componentStack = {
        tag: 1,
        parent: n.componentStack,
        type: e
      };
    }
    function go(n, e) {
      n.componentStack = {
        tag: 2,
        parent: n.componentStack,
        type: e
      };
    }
    function $t(n) {
      n.componentStack === null ? f("Unexpectedly popped too many stack frames. This is a bug in React.") : n.componentStack = n.componentStack.parent;
    }
    var yo = null;
    function li(n, e) {
      {
        var t;
        typeof e == "string" ? t = e : e && typeof e.message == "string" ? t = e.message : t = String(e);
        var r = yo || or();
        yo = null, n.errorMessage = t, n.errorComponentStack = r;
      }
    }
    function bo(n, e) {
      var t = n.onError(e);
      if (t != null && typeof t != "string")
        throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof t + '" instead');
      return t;
    }
    function So(n, e) {
      var t = n.onShellError;
      t(e);
      var r = n.onFatalError;
      r(e), n.destination !== null ? (n.status = zn, K(n.destination, e)) : (n.status = jn, n.fatalError = e);
    }
    function $i(n, e, t) {
      gr(e, "Suspense");
      var r = e.blockedBoundary, o = e.blockedSegment, l = t.fallback, c = t.children, p = /* @__PURE__ */ new Set(), g = ii(n, p), k = o.chunks.length, O = mo(
        n,
        k,
        g,
        o.formatContext,
        // boundaries never require text embedding at their edges because comment nodes bound them
        !1,
        !1
      );
      o.children.push(O), o.lastPushedText = !1;
      var B = mo(
        n,
        0,
        null,
        o.formatContext,
        // boundaries never require text embedding at their edges because comment nodes bound them
        !1,
        !1
      );
      B.parentFlushed = !0, e.blockedBoundary = g, e.blockedSegment = B;
      try {
        if (Hn(n, e, c), lt(B.chunks, n.responseState, B.lastPushedText, B.textEmbedded), B.status = Un, ln(g, B), g.pendingTasks === 0) {
          $t(e);
          return;
        }
      } catch (ue) {
        B.status = Wi, g.forceClientRender = !0, g.errorDigest = bo(n, ue), li(g, ue);
      } finally {
        e.blockedBoundary = r, e.blockedSegment = o;
      }
      var V = an(n, l, r, O, p, e.legacyContext, e.context, e.treeContext);
      V.componentStack = e.componentStack, n.pingedTasks.push(V), $t(e);
    }
    function $l(n, e, t, r) {
      gr(e, t);
      var o = e.blockedSegment, l = Xr(o.chunks, t, r, n.responseState, o.formatContext);
      o.lastPushedText = !1;
      var c = o.formatContext;
      o.formatContext = ur(c, t, r), Hn(n, e, l), o.formatContext = c, Po(o.chunks, t), o.lastPushedText = !1, $t(e);
    }
    function Ni(n) {
      return n.prototype && n.prototype.isReactComponent;
    }
    function wo(n, e, t, r, o) {
      var l = {};
      Fl(e, l);
      var c = t(r, o);
      return _l(t, r, c, o);
    }
    function si(n, e, t, r, o) {
      var l = t.render();
      t.props !== o && (di || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ue(r) || "a component"), di = !0);
      {
        var c = r.childContextTypes;
        if (c != null) {
          var p = e.legacyContext, g = Xa(t, r, p, c);
          e.legacyContext = g, ct(n, e, l), e.legacyContext = p;
          return;
        }
      }
      ct(n, e, l);
    }
    function Vi(n, e, t, r) {
      go(e, t);
      var o = _r(t, e.legacyContext), l = Mi(t, r, o);
      po(l, t, r, o), si(n, e, l, t, r), $t(e);
    }
    var ui = {}, xo = {}, ci = {}, fi = {}, di = !1, Yi = {}, Gi = !1, pi = !1, Xi = !1;
    function Nl(n, e, t, r) {
      var o;
      if (o = _r(t, e.legacyContext), xa(e, t), t.prototype && typeof t.prototype.render == "function") {
        var l = Ue(t) || "Unknown";
        ui[l] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", l, l), ui[l] = !0);
      }
      var c = wo(n, e, t, r, o), p = pa();
      if (typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0) {
        var g = Ue(t) || "Unknown";
        xo[g] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), xo[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0
      ) {
        {
          var k = Ue(t) || "Unknown";
          xo[k] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", k, k, k), xo[k] = !0);
        }
        po(c, t, r, o), si(n, e, c, t, r);
      } else if (Vl(t), p) {
        var O = e.treeContext, B = 1, V = 0;
        e.treeContext = qa(O, B, V);
        try {
          ct(n, e, c);
        } finally {
          e.treeContext = O;
        }
      } else
        ct(n, e, c);
      $t(e);
    }
    function Vl(n) {
      {
        if (n && n.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", n.displayName || n.name || "Component"), n.defaultProps !== void 0) {
          var e = Ue(n) || "Unknown";
          Yi[e] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", e), Yi[e] = !0);
        }
        if (typeof n.getDerivedStateFromProps == "function") {
          var t = Ue(n) || "Unknown";
          fi[t] || (f("%s: Function components do not support getDerivedStateFromProps.", t), fi[t] = !0);
        }
        if (typeof n.contextType == "object" && n.contextType !== null) {
          var r = Ue(n) || "Unknown";
          ci[r] || (f("%s: Function components do not support contextType.", r), ci[r] = !0);
        }
      }
    }
    function Zi(n, e) {
      if (n && n.defaultProps) {
        var t = bt({}, e), r = n.defaultProps;
        for (var o in r)
          t[o] === void 0 && (t[o] = r[o]);
        return t;
      }
      return e;
    }
    function Yl(n, e, t, r, o) {
      xa(e, t.render);
      var l = wo(n, e, t.render, r, o), c = pa();
      if (c) {
        var p = e.treeContext, g = 1, k = 0;
        e.treeContext = qa(p, g, k);
        try {
          ct(n, e, l);
        } finally {
          e.treeContext = p;
        }
      } else
        ct(n, e, l);
      $t(e);
    }
    function hi(n, e, t, r, o) {
      var l = t.type, c = Zi(l, r);
      ka(n, e, l, c, o);
    }
    function Gl(n, e, t, r) {
      t._context === void 0 ? t !== t.Consumer && (Xi || (Xi = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : t = t._context;
      var o = r.children;
      typeof o != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
      var l = On(t), c = o(l);
      ct(n, e, c);
    }
    function kt(n, e, t, r) {
      var o = t._context, l = r.value, c = r.children, p;
      p = e.context, e.context = Za(o, l), ct(n, e, c), e.context = Sl(o), p !== e.context && f("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
    }
    function Xl(n, e, t, r, o) {
      gr(e, "Lazy");
      var l = t._payload, c = t._init, p = c(l), g = Zi(p, r);
      ka(n, e, p, g, o), $t(e);
    }
    function ka(n, e, t, r, o) {
      if (typeof t == "function")
        if (Ni(t)) {
          Vi(n, e, t, r);
          return;
        } else {
          Nl(n, e, t, r);
          return;
        }
      if (typeof t == "string") {
        $l(n, e, t, r);
        return;
      }
      switch (t) {
        case gl:
        case ml:
        case Yo:
        case Go:
        case Vo: {
          ct(n, e, r.children);
          return;
        }
        case La: {
          gr(e, "SuspenseList"), ct(n, e, r.children), $t(e);
          return;
        }
        case xi:
          throw new Error("ReactDOMServer does not yet support scope components.");
        case Ma: {
          $i(n, e, r);
          return;
        }
      }
      if (typeof t == "object" && t !== null)
        switch (t.$$typeof) {
          case Fn: {
            Yl(n, e, t, r, o);
            return;
          }
          case Ba: {
            hi(n, e, t, r, o);
            return;
          }
          case Kn: {
            kt(n, e, t, r);
            return;
          }
          case qn: {
            Gl(n, e, t, r);
            return;
          }
          case Xo: {
            Xl(n, e, t, r);
            return;
          }
        }
      var l = "";
      throw (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (t == null ? t : typeof t) + "." + l));
    }
    function Zl(n, e) {
      typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
      n[Symbol.toStringTag] === "Generator" && (Gi || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Gi = !0), n.entries === e && (pi || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), pi = !0);
    }
    function ct(n, e, t) {
      try {
        return Jl(n, e, t);
      } catch (r) {
        throw typeof r == "object" && r !== null && typeof r.then == "function" || (yo = yo !== null ? yo : or()), r;
      }
    }
    function Jl(n, e, t) {
      if (e.node = t, typeof t == "object" && t !== null) {
        switch (t.$$typeof) {
          case wi: {
            var r = t, o = r.type, l = r.props, c = r.ref;
            ka(n, e, o, l, c);
            return;
          }
          case No:
            throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case Xo: {
            var p = t, g = p._payload, k = p._init, O;
            try {
              O = k(g);
            } catch (yr) {
              throw typeof yr == "object" && yr !== null && typeof yr.then == "function" && gr(e, "Lazy"), yr;
            }
            ct(n, e, O);
            return;
          }
        }
        if (at(t)) {
          Ji(n, e, t);
          return;
        }
        var B = eo(t);
        if (B) {
          Zl(t, B);
          var V = B.call(t);
          if (V) {
            var ue = V.next();
            if (!ue.done) {
              var Ce = [];
              do
                Ce.push(ue.value), ue = V.next();
              while (!ue.done);
              Ji(n, e, Ce);
              return;
            }
            return;
          }
        }
        var Ke = Object.prototype.toString.call(t);
        throw new Error("Objects are not valid as a React child (found: " + (Ke === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : Ke) + "). If you meant to render a collection of children, use an array instead.");
      }
      if (typeof t == "string") {
        var sn = e.blockedSegment;
        sn.lastPushedText = Je(e.blockedSegment.chunks, t, n.responseState, sn.lastPushedText);
        return;
      }
      if (typeof t == "number") {
        var un = e.blockedSegment;
        un.lastPushedText = Je(e.blockedSegment.chunks, "" + t, n.responseState, un.lastPushedText);
        return;
      }
      typeof t == "function" && f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
    function Ji(n, e, t) {
      for (var r = t.length, o = 0; o < r; o++) {
        var l = e.treeContext;
        e.treeContext = qa(l, r, o);
        try {
          Hn(n, e, t[o]);
        } finally {
          e.treeContext = l;
        }
      }
    }
    function Qi(n, e, t) {
      var r = e.blockedSegment, o = r.chunks.length, l = mo(
        n,
        o,
        null,
        r.formatContext,
        // Adopt the parent segment's leading text embed
        r.lastPushedText,
        // Assume we are text embedded at the trailing edge
        !0
      );
      r.children.push(l), r.lastPushedText = !1;
      var c = an(n, e.node, e.blockedBoundary, l, e.abortSet, e.legacyContext, e.context, e.treeContext);
      e.componentStack !== null && (c.componentStack = e.componentStack.parent);
      var p = c.ping;
      t.then(p, p);
    }
    function Hn(n, e, t) {
      var r = e.blockedSegment.formatContext, o = e.legacyContext, l = e.context, c = null;
      c = e.componentStack;
      try {
        return ct(n, e, t);
      } catch (p) {
        if (ri(), typeof p == "object" && p !== null && typeof p.then == "function") {
          Qi(n, e, p), e.blockedSegment.formatContext = r, e.legacyContext = o, e.context = l, Or(l), e.componentStack = c;
          return;
        } else
          throw e.blockedSegment.formatContext = r, e.legacyContext = o, e.context = l, Or(l), e.componentStack = c, p;
      }
    }
    function Ki(n, e, t, r) {
      var o = bo(n, r);
      if (e === null ? So(n, r) : (e.pendingTasks--, e.forceClientRender || (e.forceClientRender = !0, e.errorDigest = o, li(e, r), e.parentFlushed && n.clientRenderedBoundaries.push(e))), n.allPendingTasks--, n.allPendingTasks === 0) {
        var l = n.onAllReady;
        l();
      }
    }
    function Ql(n) {
      var e = this, t = n.blockedBoundary, r = n.blockedSegment;
      r.status = nn, ko(e, t, r);
    }
    function vi(n, e, t) {
      var r = n.blockedBoundary, o = n.blockedSegment;
      if (o.status = nn, r === null)
        e.allPendingTasks--, e.status !== zn && (e.status = zn, e.destination !== null && G(e.destination));
      else {
        if (r.pendingTasks--, !r.forceClientRender) {
          r.forceClientRender = !0;
          var l = t === void 0 ? new Error("The render was aborted by the server without a reason.") : t;
          r.errorDigest = e.onError(l);
          {
            var c = "The server did not finish this Suspense boundary: ";
            l && typeof l.message == "string" ? l = c + l.message : l = c + String(l);
            var p = mr;
            mr = n;
            try {
              li(r, l);
            } finally {
              mr = p;
            }
          }
          r.parentFlushed && e.clientRenderedBoundaries.push(r);
        }
        if (r.fallbackAbortableTasks.forEach(function(k) {
          return vi(k, e, t);
        }), r.fallbackAbortableTasks.clear(), e.allPendingTasks--, e.allPendingTasks === 0) {
          var g = e.onAllReady;
          g();
        }
      }
    }
    function ln(n, e) {
      if (e.chunks.length === 0 && e.children.length === 1 && e.children[0].boundary === null) {
        var t = e.children[0];
        t.id = e.id, t.parentFlushed = !0, t.status === Un && ln(n, t);
      } else {
        var r = n.completedSegments;
        r.push(e);
      }
    }
    function ko(n, e, t) {
      if (e === null) {
        if (t.parentFlushed) {
          if (n.completedRootSegment !== null)
            throw new Error("There can only be one root segment. This is a bug in React.");
          n.completedRootSegment = t;
        }
        if (n.pendingRootTasks--, n.pendingRootTasks === 0) {
          n.onShellError = on;
          var r = n.onShellReady;
          r();
        }
      } else if (e.pendingTasks--, !e.forceClientRender) {
        if (e.pendingTasks === 0)
          t.parentFlushed && t.status === Un && ln(e, t), e.parentFlushed && n.completedBoundaries.push(e), e.fallbackAbortableTasks.forEach(Ql, n), e.fallbackAbortableTasks.clear();
        else if (t.parentFlushed && t.status === Un) {
          ln(e, t);
          var o = e.completedSegments;
          o.length === 1 && e.parentFlushed && n.partialBoundaries.push(e);
        }
      }
      if (n.allPendingTasks--, n.allPendingTasks === 0) {
        var l = n.onAllReady;
        l();
      }
    }
    function Kl(n, e) {
      var t = e.blockedSegment;
      if (t.status === Sa) {
        Or(e.context);
        var r = null;
        r = mr, mr = e;
        try {
          ct(n, e, e.node), lt(t.chunks, n.responseState, t.lastPushedText, t.textEmbedded), e.abortSet.delete(e), t.status = Un, ko(n, e.blockedBoundary, t);
        } catch (l) {
          if (ri(), typeof l == "object" && l !== null && typeof l.then == "function") {
            var o = e.ping;
            l.then(o, o);
          } else
            e.abortSet.delete(e), t.status = Wi, Ki(n, e.blockedBoundary, t, l);
        } finally {
          mr = r;
        }
      }
    }
    function mi(n) {
      if (n.status !== zn) {
        var e = Fi(), t = ya.current;
        ya.current = ma;
        var r;
        r = ba.getCurrentStack, ba.getCurrentStack = or;
        var o = vo;
        ga(n.responseState);
        try {
          var l = n.pingedTasks, c;
          for (c = 0; c < l.length; c++) {
            var p = l[c];
            Kl(n, p);
          }
          l.splice(0, c), n.destination !== null && gi(n, n.destination);
        } catch (g) {
          bo(n, g), So(n, g);
        } finally {
          ga(o), ya.current = t, ba.getCurrentStack = r, t === ma && Or(e);
        }
      }
    }
    function To(n, e, t) {
      switch (t.parentFlushed = !0, t.status) {
        case Sa: {
          var r = t.id = n.nextSegmentId++;
          return t.lastPushedText = !1, t.textEmbedded = !1, Ao(e, n.responseState, r);
        }
        case Un: {
          t.status = ai;
          for (var o = !0, l = t.chunks, c = 0, p = t.children, g = 0; g < p.length; g++) {
            for (var k = p[g]; c < k.index; c++)
              A(e, l[c]);
            o = Ta(n, e, k);
          }
          for (; c < l.length - 1; c++)
            A(e, l[c]);
          return c < l.length && (o = Y(e, l[c])), o;
        }
        default:
          throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
      }
    }
    function Ta(n, e, t) {
      var r = t.boundary;
      if (r === null)
        return To(n, e, t);
      if (r.parentFlushed = !0, r.forceClientRender)
        return st(e, n.responseState, r.errorDigest, r.errorMessage, r.errorComponentStack), To(n, e, t), Da(e, n.responseState);
      if (r.pendingTasks > 0) {
        r.rootSegmentID = n.nextSegmentId++, r.completedSegments.length > 0 && n.partialBoundaries.push(r);
        var o = r.id = ft(n.responseState);
        return Cn(e, n.responseState, o), To(n, e, t), En(e, n.responseState);
      } else {
        if (r.byteSize > n.progressiveChunkSize)
          return r.rootSegmentID = n.nextSegmentId++, n.completedBoundaries.push(r), Cn(e, n.responseState, r.id), To(n, e, t), En(e, n.responseState);
        Do(e, n.responseState);
        var l = r.completedSegments;
        if (l.length !== 1)
          throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        var c = l[0];
        return Ta(n, e, c), Oo(e, n.responseState);
      }
    }
    function qi(n, e, t) {
      return vl(e, n.responseState, t.id, t.errorDigest, t.errorMessage, t.errorComponentStack);
    }
    function Ca(n, e, t) {
      return me(e, n.responseState, t.formatContext, t.id), Ta(n, e, t), Me(e, t.formatContext);
    }
    function el(n, e, t) {
      for (var r = t.completedSegments, o = 0; o < r.length; o++) {
        var l = r[o];
        tl(n, e, t, l);
      }
      return r.length = 0, bi(e, n.responseState, t.id, t.rootSegmentID);
    }
    function ql(n, e, t) {
      for (var r = t.completedSegments, o = 0; o < r.length; o++) {
        var l = r[o];
        if (!tl(n, e, t, l))
          return o++, r.splice(0, o), !1;
      }
      return r.splice(0, o), !0;
    }
    function tl(n, e, t, r) {
      if (r.status === ai)
        return !0;
      var o = r.id;
      if (o === -1) {
        var l = r.id = t.rootSegmentID;
        if (l === -1)
          throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
        return Ca(n, e, r);
      } else
        return Ca(n, e, r), sl(e, n.responseState, o);
    }
    function gi(n, e) {
      X();
      try {
        var t = n.completedRootSegment;
        t !== null && n.pendingRootTasks === 0 && (Ta(n, e, t), n.completedRootSegment = null, Aa(e, n.responseState));
        var r = n.clientRenderedBoundaries, o;
        for (o = 0; o < r.length; o++) {
          var l = r[o];
          qi(n, e, l);
        }
        r.splice(0, o);
        var c = n.completedBoundaries;
        for (o = 0; o < c.length; o++) {
          var p = c[o];
          el(n, e, p);
        }
        c.splice(0, o), se(e), X(e);
        var g = n.partialBoundaries;
        for (o = 0; o < g.length; o++) {
          var k = g[o];
          if (!ql(n, e, k)) {
            n.destination = null, o++, g.splice(0, o);
            return;
          }
        }
        g.splice(0, o);
        var O = n.completedBoundaries;
        for (o = 0; o < O.length; o++) {
          var B = O[o];
          el(n, e, B);
        }
        O.splice(0, o);
      } finally {
        se(e), n.allPendingTasks === 0 && n.pingedTasks.length === 0 && n.clientRenderedBoundaries.length === 0 && n.completedBoundaries.length === 0 && (n.abortableTasks.size !== 0 && f("There was still abortable task at the root when we closed. This is a bug in React."), G(e));
      }
    }
    function rl(n) {
      $(function() {
        return mi(n);
      });
    }
    function es(n, e) {
      if (n.status === jn) {
        n.status = zn, K(e, n.fatalError);
        return;
      }
      if (n.status !== zn && n.destination === null) {
        n.destination = e;
        try {
          gi(n, e);
        } catch (t) {
          bo(n, t), So(n, t);
        }
      }
    }
    function nl(n, e) {
      try {
        var t = n.abortableTasks;
        t.forEach(function(r) {
          return vi(r, n, e);
        }), t.clear(), n.destination !== null && gi(n, n.destination);
      } catch (r) {
        bo(n, r), So(n, r);
      }
    }
    function ts(n, e) {
      return new Promise(function(t, r) {
        var o, l, c = new Promise(function(V, ue) {
          l = V, o = ue;
        });
        function p() {
          var V = new ReadableStream(
            {
              type: "bytes",
              pull: function(ue) {
                es(k, ue);
              },
              cancel: function(ue) {
                nl(k);
              }
            },
            // $FlowFixMe size() methods are not allowed on byte streams.
            {
              highWaterMark: 0
            }
          );
          V.allReady = c, t(V);
        }
        function g(V) {
          c.catch(function() {
          }), r(V);
        }
        var k = wa(n, gn(e ? e.identifierPrefix : void 0, e ? e.nonce : void 0, e ? e.bootstrapScriptContent : void 0, e ? e.bootstrapScripts : void 0, e ? e.bootstrapModules : void 0), Kt(e ? e.namespaceURI : void 0), e ? e.progressiveChunkSize : void 0, e ? e.onError : void 0, l, p, g, o);
        if (e && e.signal) {
          var O = e.signal, B = function() {
            nl(k, O.reason), O.removeEventListener("abort", B);
          };
          O.addEventListener("abort", B);
        }
        rl(k);
      });
    }
    al.renderToReadableStream = ts, al.version = b;
  }()), al;
}
var Ro, cs;
process.env.NODE_ENV === "production" ? (Ro = Vs(), cs = Ys()) : (Ro = Gs(), cs = Xs());
Ro.version;
var Zs = Ro.renderToString;
Ro.renderToStaticMarkup;
Ro.renderToNodeStream;
Ro.renderToStaticNodeStream;
cs.renderToReadableStream;
var fs = { exports: {} }, il = { exports: {} }, De = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bs;
function Js() {
  if (bs) return De;
  bs = 1;
  var I = typeof Symbol == "function" && Symbol.for, b = I ? Symbol.for("react.element") : 60103, R = I ? Symbol.for("react.portal") : 60106, L = I ? Symbol.for("react.fragment") : 60107, f = I ? Symbol.for("react.strict_mode") : 60108, _ = I ? Symbol.for("react.profiler") : 60114, $ = I ? Symbol.for("react.provider") : 60109, W = I ? Symbol.for("react.context") : 60110, y = I ? Symbol.for("react.async_mode") : 60111, w = I ? Symbol.for("react.concurrent_mode") : 60111, X = I ? Symbol.for("react.forward_ref") : 60112, A = I ? Symbol.for("react.suspense") : 60113, Y = I ? Symbol.for("react.suspense_list") : 60120, se = I ? Symbol.for("react.memo") : 60115, G = I ? Symbol.for("react.lazy") : 60116, ce = I ? Symbol.for("react.block") : 60121, P = I ? Symbol.for("react.fundamental") : 60117, S = I ? Symbol.for("react.responder") : 60118, K = I ? Symbol.for("react.scope") : 60119;
  function J(M) {
    if (typeof M == "object" && M !== null) {
      var le = M.$$typeof;
      switch (le) {
        case b:
          switch (M = M.type, M) {
            case y:
            case w:
            case L:
            case _:
            case f:
            case A:
              return M;
            default:
              switch (M = M && M.$$typeof, M) {
                case W:
                case X:
                case G:
                case se:
                case $:
                  return M;
                default:
                  return le;
              }
          }
        case R:
          return le;
      }
    }
  }
  function re(M) {
    return J(M) === w;
  }
  return De.AsyncMode = y, De.ConcurrentMode = w, De.ContextConsumer = W, De.ContextProvider = $, De.Element = b, De.ForwardRef = X, De.Fragment = L, De.Lazy = G, De.Memo = se, De.Portal = R, De.Profiler = _, De.StrictMode = f, De.Suspense = A, De.isAsyncMode = function(M) {
    return re(M) || J(M) === y;
  }, De.isConcurrentMode = re, De.isContextConsumer = function(M) {
    return J(M) === W;
  }, De.isContextProvider = function(M) {
    return J(M) === $;
  }, De.isElement = function(M) {
    return typeof M == "object" && M !== null && M.$$typeof === b;
  }, De.isForwardRef = function(M) {
    return J(M) === X;
  }, De.isFragment = function(M) {
    return J(M) === L;
  }, De.isLazy = function(M) {
    return J(M) === G;
  }, De.isMemo = function(M) {
    return J(M) === se;
  }, De.isPortal = function(M) {
    return J(M) === R;
  }, De.isProfiler = function(M) {
    return J(M) === _;
  }, De.isStrictMode = function(M) {
    return J(M) === f;
  }, De.isSuspense = function(M) {
    return J(M) === A;
  }, De.isValidElementType = function(M) {
    return typeof M == "string" || typeof M == "function" || M === L || M === w || M === _ || M === f || M === A || M === Y || typeof M == "object" && M !== null && (M.$$typeof === G || M.$$typeof === se || M.$$typeof === $ || M.$$typeof === W || M.$$typeof === X || M.$$typeof === P || M.$$typeof === S || M.$$typeof === K || M.$$typeof === ce);
  }, De.typeOf = J, De;
}
var Oe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ss;
function Qs() {
  return Ss || (Ss = 1, process.env.NODE_ENV !== "production" && function() {
    var I = typeof Symbol == "function" && Symbol.for, b = I ? Symbol.for("react.element") : 60103, R = I ? Symbol.for("react.portal") : 60106, L = I ? Symbol.for("react.fragment") : 60107, f = I ? Symbol.for("react.strict_mode") : 60108, _ = I ? Symbol.for("react.profiler") : 60114, $ = I ? Symbol.for("react.provider") : 60109, W = I ? Symbol.for("react.context") : 60110, y = I ? Symbol.for("react.async_mode") : 60111, w = I ? Symbol.for("react.concurrent_mode") : 60111, X = I ? Symbol.for("react.forward_ref") : 60112, A = I ? Symbol.for("react.suspense") : 60113, Y = I ? Symbol.for("react.suspense_list") : 60120, se = I ? Symbol.for("react.memo") : 60115, G = I ? Symbol.for("react.lazy") : 60116, ce = I ? Symbol.for("react.block") : 60121, P = I ? Symbol.for("react.fundamental") : 60117, S = I ? Symbol.for("react.responder") : 60118, K = I ? Symbol.for("react.scope") : 60119;
    function J(N) {
      return typeof N == "string" || typeof N == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      N === L || N === w || N === _ || N === f || N === A || N === Y || typeof N == "object" && N !== null && (N.$$typeof === G || N.$$typeof === se || N.$$typeof === $ || N.$$typeof === W || N.$$typeof === X || N.$$typeof === P || N.$$typeof === S || N.$$typeof === K || N.$$typeof === ce);
    }
    function re(N) {
      if (typeof N == "object" && N !== null) {
        var Ee = N.$$typeof;
        switch (Ee) {
          case b:
            var $e = N.type;
            switch ($e) {
              case y:
              case w:
              case L:
              case _:
              case f:
              case A:
                return $e;
              default:
                var Bt = $e && $e.$$typeof;
                switch (Bt) {
                  case W:
                  case X:
                  case G:
                  case se:
                  case $:
                    return Bt;
                  default:
                    return Ee;
                }
            }
          case R:
            return Ee;
        }
      }
    }
    var M = y, le = w, ne = W, Ae = $, fe = b, we = X, Pe = L, Se = G, Fe = se, Le = R, We = _, be = f, Ie = A, je = !1;
    function ze(N) {
      return je || (je = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), U(N) || re(N) === y;
    }
    function U(N) {
      return re(N) === w;
    }
    function H(N) {
      return re(N) === W;
    }
    function Q(N) {
      return re(N) === $;
    }
    function pe(N) {
      return typeof N == "object" && N !== null && N.$$typeof === b;
    }
    function oe(N) {
      return re(N) === X;
    }
    function te(N) {
      return re(N) === L;
    }
    function Z(N) {
      return re(N) === G;
    }
    function de(N) {
      return re(N) === se;
    }
    function ge(N) {
      return re(N) === R;
    }
    function he(N) {
      return re(N) === _;
    }
    function ve(N) {
      return re(N) === f;
    }
    function Te(N) {
      return re(N) === A;
    }
    Oe.AsyncMode = M, Oe.ConcurrentMode = le, Oe.ContextConsumer = ne, Oe.ContextProvider = Ae, Oe.Element = fe, Oe.ForwardRef = we, Oe.Fragment = Pe, Oe.Lazy = Se, Oe.Memo = Fe, Oe.Portal = Le, Oe.Profiler = We, Oe.StrictMode = be, Oe.Suspense = Ie, Oe.isAsyncMode = ze, Oe.isConcurrentMode = U, Oe.isContextConsumer = H, Oe.isContextProvider = Q, Oe.isElement = pe, Oe.isForwardRef = oe, Oe.isFragment = te, Oe.isLazy = Z, Oe.isMemo = de, Oe.isPortal = ge, Oe.isProfiler = he, Oe.isStrictMode = ve, Oe.isSuspense = Te, Oe.isValidElementType = J, Oe.typeOf = re;
  }()), Oe;
}
var ws;
function _s() {
  return ws || (ws = 1, process.env.NODE_ENV === "production" ? il.exports = Js() : il.exports = Qs()), il.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ns, xs;
function Ks() {
  if (xs) return ns;
  xs = 1;
  var I = Object.getOwnPropertySymbols, b = Object.prototype.hasOwnProperty, R = Object.prototype.propertyIsEnumerable;
  function L(_) {
    if (_ == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(_);
  }
  function f() {
    try {
      if (!Object.assign)
        return !1;
      var _ = new String("abc");
      if (_[5] = "de", Object.getOwnPropertyNames(_)[0] === "5")
        return !1;
      for (var $ = {}, W = 0; W < 10; W++)
        $["_" + String.fromCharCode(W)] = W;
      var y = Object.getOwnPropertyNames($).map(function(X) {
        return $[X];
      });
      if (y.join("") !== "0123456789")
        return !1;
      var w = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(X) {
        w[X] = X;
      }), Object.keys(Object.assign({}, w)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ns = f() ? Object.assign : function(_, $) {
    for (var W, y = L(_), w, X = 1; X < arguments.length; X++) {
      W = Object(arguments[X]);
      for (var A in W)
        b.call(W, A) && (y[A] = W[A]);
      if (I) {
        w = I(W);
        for (var Y = 0; Y < w.length; Y++)
          R.call(W, w[Y]) && (y[w[Y]] = W[w[Y]]);
      }
    }
    return y;
  }, ns;
}
var os, ks;
function hs() {
  if (ks) return os;
  ks = 1;
  var I = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return os = I, os;
}
var as, Ts;
function Ds() {
  return Ts || (Ts = 1, as = Function.call.bind(Object.prototype.hasOwnProperty)), as;
}
var is, Cs;
function qs() {
  if (Cs) return is;
  Cs = 1;
  var I = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var b = hs(), R = {}, L = Ds();
    I = function(_) {
      var $ = "Warning: " + _;
      typeof console < "u" && console.error($);
      try {
        throw new Error($);
      } catch {
      }
    };
  }
  function f(_, $, W, y, w) {
    if (process.env.NODE_ENV !== "production") {
      for (var X in _)
        if (L(_, X)) {
          var A;
          try {
            if (typeof _[X] != "function") {
              var Y = Error(
                (y || "React class") + ": " + W + " type `" + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof _[X] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw Y.name = "Invariant Violation", Y;
            }
            A = _[X]($, X, y, W, null, b);
          } catch (G) {
            A = G;
          }
          if (A && !(A instanceof Error) && I(
            (y || "React class") + ": type specification of " + W + " `" + X + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof A + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), A instanceof Error && !(A.message in R)) {
            R[A.message] = !0;
            var se = w ? w() : "";
            I(
              "Failed " + W + " type: " + A.message + (se ?? "")
            );
          }
        }
    }
  }
  return f.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (R = {});
  }, is = f, is;
}
var ls, Es;
function eu() {
  if (Es) return ls;
  Es = 1;
  var I = _s(), b = Ks(), R = hs(), L = Ds(), f = qs(), _ = function() {
  };
  process.env.NODE_ENV !== "production" && (_ = function(W) {
    var y = "Warning: " + W;
    typeof console < "u" && console.error(y);
    try {
      throw new Error(y);
    } catch {
    }
  });
  function $() {
    return null;
  }
  return ls = function(W, y) {
    var w = typeof Symbol == "function" && Symbol.iterator, X = "@@iterator";
    function A(U) {
      var H = U && (w && U[w] || U[X]);
      if (typeof H == "function")
        return H;
    }
    var Y = "<<anonymous>>", se = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: K(),
      arrayOf: J,
      element: re(),
      elementType: M(),
      instanceOf: le,
      node: we(),
      objectOf: Ae,
      oneOf: ne,
      oneOfType: fe,
      shape: Se,
      exact: Fe
    };
    function G(U, H) {
      return U === H ? U !== 0 || 1 / U === 1 / H : U !== U && H !== H;
    }
    function ce(U, H) {
      this.message = U, this.data = H && typeof H == "object" ? H : {}, this.stack = "";
    }
    ce.prototype = Error.prototype;
    function P(U) {
      if (process.env.NODE_ENV !== "production")
        var H = {}, Q = 0;
      function pe(te, Z, de, ge, he, ve, Te) {
        if (ge = ge || Y, ve = ve || de, Te !== R) {
          if (y) {
            var N = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw N.name = "Invariant Violation", N;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ee = ge + ":" + de;
            !H[Ee] && // Avoid spamming the console because they are often not actionable except for lib authors
            Q < 3 && (_(
              "You are manually calling a React.PropTypes validation function for the `" + ve + "` prop on `" + ge + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), H[Ee] = !0, Q++);
          }
        }
        return Z[de] == null ? te ? Z[de] === null ? new ce("The " + he + " `" + ve + "` is marked as required " + ("in `" + ge + "`, but its value is `null`.")) : new ce("The " + he + " `" + ve + "` is marked as required in " + ("`" + ge + "`, but its value is `undefined`.")) : null : U(Z, de, ge, he, ve);
      }
      var oe = pe.bind(null, !1);
      return oe.isRequired = pe.bind(null, !0), oe;
    }
    function S(U) {
      function H(Q, pe, oe, te, Z, de) {
        var ge = Q[pe], he = be(ge);
        if (he !== U) {
          var ve = Ie(ge);
          return new ce(
            "Invalid " + te + " `" + Z + "` of type " + ("`" + ve + "` supplied to `" + oe + "`, expected ") + ("`" + U + "`."),
            { expectedType: U }
          );
        }
        return null;
      }
      return P(H);
    }
    function K() {
      return P($);
    }
    function J(U) {
      function H(Q, pe, oe, te, Z) {
        if (typeof U != "function")
          return new ce("Property `" + Z + "` of component `" + oe + "` has invalid PropType notation inside arrayOf.");
        var de = Q[pe];
        if (!Array.isArray(de)) {
          var ge = be(de);
          return new ce("Invalid " + te + " `" + Z + "` of type " + ("`" + ge + "` supplied to `" + oe + "`, expected an array."));
        }
        for (var he = 0; he < de.length; he++) {
          var ve = U(de, he, oe, te, Z + "[" + he + "]", R);
          if (ve instanceof Error)
            return ve;
        }
        return null;
      }
      return P(H);
    }
    function re() {
      function U(H, Q, pe, oe, te) {
        var Z = H[Q];
        if (!W(Z)) {
          var de = be(Z);
          return new ce("Invalid " + oe + " `" + te + "` of type " + ("`" + de + "` supplied to `" + pe + "`, expected a single ReactElement."));
        }
        return null;
      }
      return P(U);
    }
    function M() {
      function U(H, Q, pe, oe, te) {
        var Z = H[Q];
        if (!I.isValidElementType(Z)) {
          var de = be(Z);
          return new ce("Invalid " + oe + " `" + te + "` of type " + ("`" + de + "` supplied to `" + pe + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return P(U);
    }
    function le(U) {
      function H(Q, pe, oe, te, Z) {
        if (!(Q[pe] instanceof U)) {
          var de = U.name || Y, ge = ze(Q[pe]);
          return new ce("Invalid " + te + " `" + Z + "` of type " + ("`" + ge + "` supplied to `" + oe + "`, expected ") + ("instance of `" + de + "`."));
        }
        return null;
      }
      return P(H);
    }
    function ne(U) {
      if (!Array.isArray(U))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? _(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : _("Invalid argument supplied to oneOf, expected an array.")), $;
      function H(Q, pe, oe, te, Z) {
        for (var de = Q[pe], ge = 0; ge < U.length; ge++)
          if (G(de, U[ge]))
            return null;
        var he = JSON.stringify(U, function(Te, N) {
          var Ee = Ie(N);
          return Ee === "symbol" ? String(N) : N;
        });
        return new ce("Invalid " + te + " `" + Z + "` of value `" + String(de) + "` " + ("supplied to `" + oe + "`, expected one of " + he + "."));
      }
      return P(H);
    }
    function Ae(U) {
      function H(Q, pe, oe, te, Z) {
        if (typeof U != "function")
          return new ce("Property `" + Z + "` of component `" + oe + "` has invalid PropType notation inside objectOf.");
        var de = Q[pe], ge = be(de);
        if (ge !== "object")
          return new ce("Invalid " + te + " `" + Z + "` of type " + ("`" + ge + "` supplied to `" + oe + "`, expected an object."));
        for (var he in de)
          if (L(de, he)) {
            var ve = U(de, he, oe, te, Z + "." + he, R);
            if (ve instanceof Error)
              return ve;
          }
        return null;
      }
      return P(H);
    }
    function fe(U) {
      if (!Array.isArray(U))
        return process.env.NODE_ENV !== "production" && _("Invalid argument supplied to oneOfType, expected an instance of array."), $;
      for (var H = 0; H < U.length; H++) {
        var Q = U[H];
        if (typeof Q != "function")
          return _(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + je(Q) + " at index " + H + "."
          ), $;
      }
      function pe(oe, te, Z, de, ge) {
        for (var he = [], ve = 0; ve < U.length; ve++) {
          var Te = U[ve], N = Te(oe, te, Z, de, ge, R);
          if (N == null)
            return null;
          N.data && L(N.data, "expectedType") && he.push(N.data.expectedType);
        }
        var Ee = he.length > 0 ? ", expected one of type [" + he.join(", ") + "]" : "";
        return new ce("Invalid " + de + " `" + ge + "` supplied to " + ("`" + Z + "`" + Ee + "."));
      }
      return P(pe);
    }
    function we() {
      function U(H, Q, pe, oe, te) {
        return Le(H[Q]) ? null : new ce("Invalid " + oe + " `" + te + "` supplied to " + ("`" + pe + "`, expected a ReactNode."));
      }
      return P(U);
    }
    function Pe(U, H, Q, pe, oe) {
      return new ce(
        (U || "React class") + ": " + H + " type `" + Q + "." + pe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + oe + "`."
      );
    }
    function Se(U) {
      function H(Q, pe, oe, te, Z) {
        var de = Q[pe], ge = be(de);
        if (ge !== "object")
          return new ce("Invalid " + te + " `" + Z + "` of type `" + ge + "` " + ("supplied to `" + oe + "`, expected `object`."));
        for (var he in U) {
          var ve = U[he];
          if (typeof ve != "function")
            return Pe(oe, te, Z, he, Ie(ve));
          var Te = ve(de, he, oe, te, Z + "." + he, R);
          if (Te)
            return Te;
        }
        return null;
      }
      return P(H);
    }
    function Fe(U) {
      function H(Q, pe, oe, te, Z) {
        var de = Q[pe], ge = be(de);
        if (ge !== "object")
          return new ce("Invalid " + te + " `" + Z + "` of type `" + ge + "` " + ("supplied to `" + oe + "`, expected `object`."));
        var he = b({}, Q[pe], U);
        for (var ve in he) {
          var Te = U[ve];
          if (L(U, ve) && typeof Te != "function")
            return Pe(oe, te, Z, ve, Ie(Te));
          if (!Te)
            return new ce(
              "Invalid " + te + " `" + Z + "` key `" + ve + "` supplied to `" + oe + "`.\nBad object: " + JSON.stringify(Q[pe], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(U), null, "  ")
            );
          var N = Te(de, ve, oe, te, Z + "." + ve, R);
          if (N)
            return N;
        }
        return null;
      }
      return P(H);
    }
    function Le(U) {
      switch (typeof U) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !U;
        case "object":
          if (Array.isArray(U))
            return U.every(Le);
          if (U === null || W(U))
            return !0;
          var H = A(U);
          if (H) {
            var Q = H.call(U), pe;
            if (H !== U.entries) {
              for (; !(pe = Q.next()).done; )
                if (!Le(pe.value))
                  return !1;
            } else
              for (; !(pe = Q.next()).done; ) {
                var oe = pe.value;
                if (oe && !Le(oe[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function We(U, H) {
      return U === "symbol" ? !0 : H ? H["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && H instanceof Symbol : !1;
    }
    function be(U) {
      var H = typeof U;
      return Array.isArray(U) ? "array" : U instanceof RegExp ? "object" : We(H, U) ? "symbol" : H;
    }
    function Ie(U) {
      if (typeof U > "u" || U === null)
        return "" + U;
      var H = be(U);
      if (H === "object") {
        if (U instanceof Date)
          return "date";
        if (U instanceof RegExp)
          return "regexp";
      }
      return H;
    }
    function je(U) {
      var H = Ie(U);
      switch (H) {
        case "array":
        case "object":
          return "an " + H;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + H;
        default:
          return H;
      }
    }
    function ze(U) {
      return !U.constructor || !U.constructor.name ? Y : U.constructor.name;
    }
    return se.checkPropTypes = f, se.resetWarningCache = f.resetWarningCache, se.PropTypes = se, se;
  }, ls;
}
var ss, Rs;
function tu() {
  if (Rs) return ss;
  Rs = 1;
  var I = hs();
  function b() {
  }
  function R() {
  }
  return R.resetWarningCache = b, ss = function() {
    function L($, W, y, w, X, A) {
      if (A !== I) {
        var Y = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw Y.name = "Invariant Violation", Y;
      }
    }
    L.isRequired = L;
    function f() {
      return L;
    }
    var _ = {
      array: L,
      bigint: L,
      bool: L,
      func: L,
      number: L,
      object: L,
      string: L,
      symbol: L,
      any: L,
      arrayOf: f,
      element: L,
      elementType: L,
      instanceOf: f,
      node: L,
      objectOf: f,
      oneOf: f,
      oneOfType: f,
      shape: f,
      exact: f,
      checkPropTypes: R,
      resetWarningCache: b
    };
    return _.PropTypes = _, _;
  }, ss;
}
if (process.env.NODE_ENV !== "production") {
  var ru = _s(), nu = !0;
  fs.exports = eu()(ru.isElement, nu);
} else
  fs.exports = tu()();
var ou = fs.exports;
const Sr = /* @__PURE__ */ Ns(ou);
var au = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Os(I, b) {
  return I(b = { exports: {} }, b.exports), b.exports;
}
var iu = Os(function(I) {
  (function(b) {
    var R = function(P, S, K) {
      if (!y(S) || X(S) || A(S) || Y(S) || W(S)) return S;
      var J, re = 0, M = 0;
      if (w(S)) for (J = [], M = S.length; re < M; re++) J.push(R(P, S[re], K));
      else for (var le in J = {}, S) Object.prototype.hasOwnProperty.call(S, le) && (J[P(le, K)] = R(P, S[le], K));
      return J;
    }, L = function(P) {
      return se(P) ? P : (P = P.replace(/[\-_\s]+(.)?/g, function(S, K) {
        return K ? K.toUpperCase() : "";
      })).substr(0, 1).toLowerCase() + P.substr(1);
    }, f = function(P) {
      var S = L(P);
      return S.substr(0, 1).toUpperCase() + S.substr(1);
    }, _ = function(P, S) {
      return function(K, J) {
        var re = (J = J || {}).separator || "_", M = J.split || /(?=[A-Z])/;
        return K.split(M).join(re);
      }(P, S).toLowerCase();
    }, $ = Object.prototype.toString, W = function(P) {
      return typeof P == "function";
    }, y = function(P) {
      return P === Object(P);
    }, w = function(P) {
      return $.call(P) == "[object Array]";
    }, X = function(P) {
      return $.call(P) == "[object Date]";
    }, A = function(P) {
      return $.call(P) == "[object RegExp]";
    }, Y = function(P) {
      return $.call(P) == "[object Boolean]";
    }, se = function(P) {
      return (P -= 0) == P;
    }, G = function(P, S) {
      var K = S && "process" in S ? S.process : S;
      return typeof K != "function" ? P : function(J, re) {
        return K(J, P, re);
      };
    }, ce = { camelize: L, decamelize: _, pascalize: f, depascalize: _, camelizeKeys: function(P, S) {
      return R(G(L, S), P);
    }, decamelizeKeys: function(P, S) {
      return R(G(_, S), P, S);
    }, pascalizeKeys: function(P, S) {
      return R(G(f, S), P);
    }, depascalizeKeys: function() {
      return this.decamelizeKeys.apply(this, arguments);
    } };
    I.exports ? I.exports = ce : b.humps = ce;
  })(au);
}).decamelize, lu = function(I) {
  if (Array.isArray(I)) return I;
}, su = function(I, b) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(I)) {
    var R = [], L = !0, f = !1, _ = void 0;
    try {
      for (var $, W = I[Symbol.iterator](); !(L = ($ = W.next()).done) && (R.push($.value), !b || R.length !== b); L = !0) ;
    } catch (y) {
      f = !0, _ = y;
    } finally {
      try {
        L || W.return == null || W.return();
      } finally {
        if (f) throw _;
      }
    }
    return R;
  }
}, Is = function(I, b) {
  (b == null || b > I.length) && (b = I.length);
  for (var R = 0, L = new Array(b); R < b; R++) L[R] = I[R];
  return L;
}, uu = function(I, b) {
  if (I) {
    if (typeof I == "string") return Is(I, b);
    var R = Object.prototype.toString.call(I).slice(8, -1);
    return R === "Object" && I.constructor && (R = I.constructor.name), R === "Map" || R === "Set" ? Array.from(I) : R === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(R) ? Is(I, b) : void 0;
  }
}, cu = function() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}, fu = function(I, b) {
  return lu(I) || su(I, b) || uu(I, b) || cu();
}, Ms = Os(function(I) {
  function b() {
    return I.exports = b = Object.assign || function(R) {
      for (var L = 1; L < arguments.length; L++) {
        var f = arguments[L];
        for (var _ in f) Object.prototype.hasOwnProperty.call(f, _) && (R[_] = f[_]);
      }
      return R;
    }, b.apply(this, arguments);
  }
  I.exports = b;
}), du = function(I, b) {
  if (I == null) return {};
  var R, L, f = {}, _ = Object.keys(I);
  for (L = 0; L < _.length; L++) R = _[L], b.indexOf(R) >= 0 || (f[R] = I[R]);
  return f;
}, Ls = function(I, b) {
  if (I == null) return {};
  var R, L, f = du(I, b);
  if (Object.getOwnPropertySymbols) {
    var _ = Object.getOwnPropertySymbols(I);
    for (L = 0; L < _.length; L++) R = _[L], b.indexOf(R) >= 0 || Object.prototype.propertyIsEnumerable.call(I, R) && (f[R] = I[R]);
  }
  return f;
}, pu = zs(null);
function Bs(I) {
  var b = I.children, R = b === void 0 ? "" : b, L = Ls(I, ["children"]);
  return typeof R != "string" && (R = Zs(R)), br.createElement("template", Ms({}, L, { dangerouslySetInnerHTML: { __html: R } }));
}
function Us(I) {
  var b = I.root, R = I.children;
  return $s(R === void 0 ? null : R, b);
}
function hu(I) {
  var b = Hs(function(R, L) {
    var f, _, $ = R.mode, W = $ === void 0 ? "open" : $, y = R.delegatesFocus, w = y !== void 0 && y, X = R.styleSheets, A = X === void 0 ? [] : X, Y = R.ssr, se = Y !== void 0 && Y, G = R.children, ce = Ls(R, ["mode", "delegatesFocus", "styleSheets", "ssr", "children"]), P = (_ = Mt((f = L) && f.current), ds(function() {
      f && (f.current = _.current);
    }, [f]), _), S = Lt(null), K = fu(S, 2), J = K[0], re = K[1], M = "node_".concat(W).concat(w);
    return Ws(function() {
      if (P.current) try {
        if (typeof L == "function" && L(P.current), se) {
          var le = P.current.shadowRoot;
          return void re(le);
        }
        var ne = P.current.attachShadow({ mode: W, delegatesFocus: w });
        A.length > 0 && (ne.adoptedStyleSheets = A), re(ne);
      } catch (Ae) {
        (function(fe) {
          var we = fe.error, Pe = fe.styleSheets, Se = fe.root;
          switch (we.name) {
            case "NotSupportedError":
              Pe.length > 0 && (Se.adoptedStyleSheets = Pe);
              break;
            default:
              throw we;
          }
        })({ error: Ae, styleSheets: A, root: J });
      }
    }, [L, P, A]), br.createElement(br.Fragment, null, br.createElement(I.tag, Ms({ key: M, ref: P }, ce), (J || se) && br.createElement(pu.Provider, { value: J }, se ? br.createElement(Bs, { shadowroot: W, shadowrootmode: W }, I.render({ root: J, ssr: se, children: G })) : br.createElement(Us, { root: J }, I.render({ root: J, ssr: se, children: G })))));
  });
  return b.propTypes = { mode: Sr.oneOf(["open", "closed"]), delegatesFocus: Sr.bool, styleSheets: Sr.arrayOf(Sr.instanceOf(globalThis.CSSStyleSheet)), ssr: Sr.bool, children: Sr.node }, b;
}
Bs.propTypes = { children: Sr.oneOfType([Sr.string, Sr.node]) }, Us.propTypes = { root: Sr.object.isRequired, children: Sr.node };
var us = /* @__PURE__ */ new Map();
function vu() {
  var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "core", R = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(L) {
    return L.children;
  };
  return new Proxy(I, { get: function(L, f) {
    var _ = iu(f, { separator: "-" }), $ = "".concat(b, "-").concat(_);
    return us.has($) || us.set($, hu({ tag: _, render: R })), us.get($);
  } });
}
var mu = vu();
function gu(I, b, R, L) {
  var f = this, _ = Mt(null), $ = Mt(0), W = Mt(0), y = Mt(null), w = Mt([]), X = Mt(), A = Mt(), Y = Mt(I), se = Mt(!0), G = Mt(), ce = Mt();
  Y.current = I;
  var P = typeof window < "u", S = !b && b !== 0 && P;
  if (typeof I != "function") throw new TypeError("Expected a function");
  b = +b || 0;
  var K = !!(R = R || {}).leading, J = !("trailing" in R) || !!R.trailing, re = !!R.flushOnExit && J, M = "maxWait" in R, le = "debounceOnServer" in R && !!R.debounceOnServer, ne = M ? Math.max(+R.maxWait || 0, b) : null, Ae = Fs(function() {
    var fe = function(be) {
      var Ie = w.current, je = X.current;
      return w.current = X.current = null, $.current = be, W.current = W.current || be, A.current = Y.current.apply(je, Ie);
    }, we = function(be, Ie) {
      S && cancelAnimationFrame(y.current), y.current = S ? requestAnimationFrame(be) : setTimeout(be, Ie);
    }, Pe = function(be) {
      if (!se.current) return !1;
      var Ie = be - _.current;
      return !_.current || Ie >= b || Ie < 0 || M && be - $.current >= ne;
    }, Se = function(be) {
      return y.current = null, J && w.current ? fe(be) : (w.current = X.current = null, A.current);
    }, Fe = function be() {
      var Ie = Date.now();
      if (K && W.current === $.current && Le(), Pe(Ie)) return Se(Ie);
      if (se.current) {
        var je = b - (Ie - _.current), ze = M ? Math.min(je, ne - (Ie - $.current)) : je;
        we(be, ze);
      }
    }, Le = function() {
      L && L({});
    }, We = function() {
      if (P || le) {
        var be, Ie = Date.now(), je = Pe(Ie);
        if (w.current = [].slice.call(arguments), X.current = f, _.current = Ie, re && !G.current && (G.current = function() {
          var ze;
          ((ze = global.document) == null ? void 0 : ze.visibilityState) === "hidden" && ce.current.flush();
        }, (be = global.document) == null || be.addEventListener == null || be.addEventListener("visibilitychange", G.current)), je) {
          if (!y.current && se.current) return $.current = _.current, we(Fe, b), K ? fe(_.current) : A.current;
          if (M) return we(Fe, b), fe(_.current);
        }
        return y.current || we(Fe, b), A.current;
      }
    };
    return We.cancel = function() {
      var be = y.current;
      be && (S ? cancelAnimationFrame(y.current) : clearTimeout(y.current)), $.current = 0, w.current = _.current = X.current = y.current = null, be && L && L({});
    }, We.isPending = function() {
      return !!y.current;
    }, We.flush = function() {
      return y.current ? Se(Date.now()) : A.current;
    }, We;
  }, [K, M, b, ne, J, re, S, P, le, L]);
  return ce.current = Ae, ds(function() {
    return se.current = !0, function() {
      var fe;
      re && ce.current.flush(), G.current && ((fe = global.document) == null || fe.removeEventListener == null || fe.removeEventListener("visibilitychange", G.current), G.current = null), se.current = !1;
    };
  }, [re]), Ae;
}
function yu(I, b) {
  return I === b;
}
function Ps(I, b, R) {
  var L = yu, f = Mt(I), _ = Lt({})[1], $ = gu(ps(function(y) {
    f.current = y, _({});
  }, [_]), b, R, _), W = Mt(I);
  return L(W.current, I) || ($(I), W.current = I), [f.current, $];
}
function bu(I, b = 1) {
  const { apiUrl: R, apiKey: L, productId: f } = I, [_, $] = Lt(""), [W, y] = Lt(""), [w] = Ps(_, 400), [X] = Ps(W, 400), [A, Y] = Lt(null), [se, G] = Lt(null), [ce, P] = Lt(!1), [S, K] = Lt(null), [J, re] = Lt(null), [M, le] = Lt(null), [ne, Ae] = Lt(null);
  return ds(() => {
    const fe = parseFloat(w), we = parseFloat(X);
    if (!w || !X || isNaN(fe) || isNaN(we)) {
      Y(null), G(null), K(null), P(!1);
      return;
    }
    const Pe = new AbortController();
    return (async () => {
      P(!0), K(null);
      try {
        const Fe = new URL(`${R}/api/v1/products/${f}/price`);
        Fe.searchParams.set("width", w), Fe.searchParams.set("height", X), Fe.searchParams.set("quantity", String(b));
        const Le = await fetch(Fe.toString(), {
          headers: {
            "X-API-Key": L
          },
          signal: Pe.signal
        });
        if (!Le.ok) {
          if (Le.status === 401)
            K("Authentication failed");
          else {
            const be = await Le.json();
            K(be.detail || "Failed to fetch price");
          }
          Y(null), G(null), P(!1);
          return;
        }
        const We = await Le.json();
        Y(We.price), G(We.total), K(null), J === null && re(We.currency), M === null && le(We.dimensions.unit), ne === null && Ae(We.dimensionRange), P(!1);
      } catch (Fe) {
        if (Fe instanceof Error && Fe.name === "AbortError")
          return;
        K("Network error"), Y(null), G(null), P(!1);
      }
    })(), () => {
      Pe.abort();
    };
  }, [w, X, b, R, L, f, J, M, ne]), {
    width: _,
    height: W,
    setWidth: $,
    setHeight: y,
    price: A,
    total: se,
    loading: ce,
    error: S,
    currency: J,
    unit: M,
    dimensionRange: ne
  };
}
function Su(I) {
  const { apiUrl: b, apiKey: R } = I, [L, f] = Lt(!1), [_, $] = Lt(null);
  return {
    createDraftOrder: ps(
      async (y) => {
        const { productId: w, width: X, height: A, quantity: Y } = y;
        f(!0), $(null);
        try {
          const se = `${b}/api/v1/draft-orders`, G = await fetch(se, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": R
            },
            body: JSON.stringify({
              productId: w,
              width: X,
              height: A,
              quantity: Y
            })
          });
          if (!G.ok) {
            if (G.status === 401) {
              const K = "Authentication failed";
              throw $(K), f(!1), new Error(K);
            }
            const S = (await G.json()).detail || "Failed to create Draft Order";
            throw $(S), f(!1), new Error(S);
          }
          const ce = await G.json();
          return f(!1), $(null), ce;
        } catch (se) {
          if (se instanceof Error)
            throw f(!1), se;
          const G = "Network error";
          throw $(G), f(!1), new Error(G);
        }
      },
      [b, R]
    ),
    creating: L,
    error: _
  };
}
function As(I) {
  const { label: b, value: R, onChange: L, unit: f, min: _, max: $, error: W } = I, y = _ !== null && $ !== null ? `${_} - ${$}` : "", w = _ !== null && $ !== null && f ? `${_} - ${$} ${f}` : "";
  return /* @__PURE__ */ Ea("div", { className: "pm-dimension-input", children: [
    /* @__PURE__ */ Xe("label", { className: "pm-dimension-label", children: b }),
    /* @__PURE__ */ Ea("div", { className: "pm-dimension-field-wrapper", children: [
      /* @__PURE__ */ Xe(
        "input",
        {
          type: "text",
          inputMode: "decimal",
          className: "pm-dimension-field",
          value: R,
          onChange: (X) => L(X.target.value),
          placeholder: y
        }
      ),
      f && /* @__PURE__ */ Xe("span", { className: "pm-dimension-unit", children: f })
    ] }),
    w && !W && /* @__PURE__ */ Xe("div", { className: "pm-dimension-helper", children: w }),
    W && /* @__PURE__ */ Xe("div", { className: "pm-dimension-error", children: W })
  ] });
}
function wu(I) {
  const { price: b, currency: R, loading: L, error: f } = I, _ = Fs(() => R ? new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: R
  }) : null, [R]);
  return b === null && !L && !f ? null : L ? /* @__PURE__ */ Xe("div", { className: "pm-price-display", children: /* @__PURE__ */ Xe("div", { className: "pm-skeleton" }) }) : f ? /* @__PURE__ */ Xe("div", { className: "pm-price-display", children: /* @__PURE__ */ Xe("div", { className: "pm-price-error", children: f }) }) : b !== null && _ ? /* @__PURE__ */ Xe("div", { className: "pm-price-display", children: /* @__PURE__ */ Xe("div", { className: "pm-price-value", children: _.format(b) }) }) : null;
}
function xu(I) {
  const { quantity: b, onChange: R } = I, L = () => {
    b > 1 && R(b - 1);
  }, f = () => {
    R(b + 1);
  };
  return /* @__PURE__ */ Ea("div", { className: "pm-quantity", children: [
    /* @__PURE__ */ Xe("label", { className: "pm-quantity-label", children: "Quantity" }),
    /* @__PURE__ */ Ea("div", { className: "pm-quantity-controls", children: [
      /* @__PURE__ */ Xe(
        "button",
        {
          type: "button",
          className: "pm-quantity-btn",
          onClick: L,
          disabled: b <= 1,
          "aria-label": "Decrease quantity",
          children: "-"
        }
      ),
      /* @__PURE__ */ Xe("span", { className: "pm-quantity-value", children: b }),
      /* @__PURE__ */ Xe(
        "button",
        {
          type: "button",
          className: "pm-quantity-btn",
          onClick: f,
          "aria-label": "Increase quantity",
          children: "+"
        }
      )
    ] })
  ] });
}
function ku(I) {
  const { onClick: b, disabled: R, loading: L } = I;
  return /* @__PURE__ */ Xe(
    "button",
    {
      type: "button",
      className: "pm-add-to-cart",
      onClick: b,
      disabled: R || L,
      children: L ? /* @__PURE__ */ Xe("span", { className: "pm-add-to-cart-spinner" }) : "Add to Cart"
    }
  );
}
const Tu = `
  /* CSS custom property defaults */
  :host {
    --pm-primary-color: #5c6ac4;
    --pm-text-color: #202223;
    --pm-border-color: #c9cccf;
    --pm-border-radius: 8px;
    --pm-font-size: 14px;
    --pm-error-color: #d72c0d;
  }

  /* Widget container */
  .pm-widget {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: var(--pm-font-size);
    color: var(--pm-text-color);
    max-width: 400px;
    box-sizing: border-box;
  }

  .pm-widget *,
  .pm-widget *::before,
  .pm-widget *::after {
    box-sizing: border-box;
  }

  /* Dimension input wrapper */
  .pm-dimension-input {
    margin-bottom: 16px;
  }

  .pm-dimension-label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    font-size: var(--pm-font-size);
    color: var(--pm-text-color);
  }

  .pm-dimension-field-wrapper {
    position: relative;
  }

  .pm-dimension-field {
    width: 100%;
    padding: 10px 40px 10px 12px;
    border: 1px solid var(--pm-border-color);
    border-radius: var(--pm-border-radius);
    font-size: var(--pm-font-size);
    font-family: inherit;
    color: var(--pm-text-color);
    transition: border-color 0.15s ease;
  }

  .pm-dimension-field:focus {
    outline: none;
    border-color: var(--pm-primary-color);
    box-shadow: 0 0 0 1px var(--pm-primary-color);
  }

  .pm-dimension-field--error {
    border-color: var(--pm-error-color);
  }

  .pm-dimension-field--error:focus {
    border-color: var(--pm-error-color);
    box-shadow: 0 0 0 1px var(--pm-error-color);
  }

  .pm-dimension-unit {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #637381;
    font-size: var(--pm-font-size);
    pointer-events: none;
  }

  .pm-dimension-helper {
    margin-top: 4px;
    font-size: 12px;
    color: #637381;
  }

  .pm-dimension-error {
    margin-top: 4px;
    font-size: 12px;
    color: var(--pm-error-color);
    font-weight: 500;
  }

  /* Price display */
  .pm-price-display {
    margin: 20px 0;
    min-height: 36px;
  }

  .pm-price-value {
    font-size: 24px;
    font-weight: bold;
    color: var(--pm-text-color);
  }

  .pm-price-error {
    color: var(--pm-error-color);
    font-size: var(--pm-font-size);
  }

  /* Loading skeleton */
  .pm-skeleton {
    width: 120px;
    height: 32px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: pm-shimmer 1.5s infinite;
    border-radius: 4px;
  }

  @keyframes pm-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Quantity selector */
  .pm-quantity {
    margin-bottom: 16px;
  }

  .pm-quantity-label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    font-size: var(--pm-font-size);
    color: var(--pm-text-color);
  }

  .pm-quantity-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pm-quantity-btn {
    width: 32px;
    height: 32px;
    border: 1px solid var(--pm-border-color);
    border-radius: var(--pm-border-radius);
    background: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    color: var(--pm-text-color);
    transition: background-color 0.15s ease, opacity 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pm-quantity-btn:hover:not(:disabled) {
    background-color: #f6f6f7;
  }

  .pm-quantity-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .pm-quantity-value {
    min-width: 30px;
    text-align: center;
    font-size: var(--pm-font-size);
    font-weight: 600;
    color: var(--pm-text-color);
  }

  /* Add to Cart button */
  .pm-add-to-cart {
    width: 100%;
    padding: 14px 20px;
    background: var(--pm-primary-color);
    color: white;
    font-weight: bold;
    font-size: var(--pm-font-size);
    border: none;
    border-radius: var(--pm-border-radius);
    cursor: pointer;
    transition: background-color 0.15s ease, opacity 0.15s ease;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
  }

  .pm-add-to-cart:hover:not(:disabled) {
    background: color-mix(in srgb, var(--pm-primary-color) 85%, black);
  }

  .pm-add-to-cart:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading spinner (CSS only) */
  .pm-add-to-cart-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: pm-spin 0.6s linear infinite;
  }

  @keyframes pm-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
function Iu(I) {
  const { apiUrl: b, apiKey: R, productId: L, theme: f, onAddToCart: _ } = I, [$, W] = Lt(1), {
    width: y,
    height: w,
    setWidth: X,
    setHeight: A,
    total: Y,
    loading: se,
    error: G,
    currency: ce,
    unit: P,
    dimensionRange: S
  } = bu({ apiUrl: b, apiKey: R, productId: L }, $), { createDraftOrder: K, creating: J, error: re } = Su({ apiUrl: b, apiKey: R }), M = parseFloat(y), le = parseFloat(w), ne = y ? isNaN(M) || M <= 0 ? "Must be a positive number" : S && M < S.minWidth ? `Minimum ${S.minWidth}${P || ""}` : S && M > S.maxWidth ? `Maximum ${S.maxWidth}${P || ""}` : null : null, Ae = w ? isNaN(le) || le <= 0 ? "Must be a positive number" : S && le < S.minHeight ? `Minimum ${S.minHeight}${P || ""}` : S && le > S.maxHeight ? `Maximum ${S.maxHeight}${P || ""}` : null : null, fe = ps(async () => {
    if (!(!Y || ne || Ae || J))
      try {
        const Se = await K({
          productId: L,
          width: M,
          height: le,
          quantity: $
        });
        if (_) {
          const Fe = {
            draftOrderId: Se.draftOrderId,
            checkoutUrl: Se.checkoutUrl,
            price: Se.price,
            total: parseFloat(Se.total),
            dimensions: {
              width: M,
              height: le,
              unit: Se.dimensions.unit
            },
            quantity: $
          };
          _(Fe);
        }
        window.location.href = Se.checkoutUrl;
      } catch (Se) {
        console.error("Failed to create Draft Order:", Se);
      }
  }, [
    Y,
    ne,
    Ae,
    J,
    K,
    L,
    M,
    le,
    $,
    _
  ]), we = {};
  f != null && f.primaryColor && (we["--pm-primary-color"] = f.primaryColor), f != null && f.textColor && (we["--pm-text-color"] = f.textColor), f != null && f.borderColor && (we["--pm-border-color"] = f.borderColor), f != null && f.borderRadius && (we["--pm-border-radius"] = f.borderRadius), f != null && f.fontSize && (we["--pm-font-size"] = f.fontSize), f != null && f.errorColor && (we["--pm-error-color"] = f.errorColor);
  const Pe = !Y || !!ne || !!Ae || J;
  return /* @__PURE__ */ Ea(mu.div, { style: we, children: [
    /* @__PURE__ */ Xe("style", { children: Tu }),
    /* @__PURE__ */ Ea("div", { className: "pm-widget", children: [
      /* @__PURE__ */ Xe(
        As,
        {
          label: "Width",
          value: y,
          onChange: X,
          unit: P,
          min: (S == null ? void 0 : S.minWidth) ?? null,
          max: (S == null ? void 0 : S.maxWidth) ?? null,
          error: ne
        }
      ),
      /* @__PURE__ */ Xe(
        As,
        {
          label: "Height",
          value: w,
          onChange: A,
          unit: P,
          min: (S == null ? void 0 : S.minHeight) ?? null,
          max: (S == null ? void 0 : S.maxHeight) ?? null,
          error: Ae
        }
      ),
      /* @__PURE__ */ Xe(xu, { quantity: $, onChange: W }),
      /* @__PURE__ */ Xe(
        wu,
        {
          price: Y,
          currency: ce,
          loading: se,
          error: G || re
        }
      ),
      /* @__PURE__ */ Xe(
        ku,
        {
          onClick: fe,
          disabled: Pe,
          loading: J
        }
      )
    ] })
  ] });
}
export {
  Iu as PriceMatrixWidget
};
