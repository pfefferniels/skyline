(this.webpackJsonpskyline=this.webpackJsonpskyline||[]).push([[0],{124:function(e,t){},126:function(e,t){},144:function(e,t,n){},147:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(35),i=n.n(r),o=n(12),s=n(203),l=n(202),u=n(191),b=n(204),j=n(192),d=n(197),h=n(97),f=n.n(h),O=n(93),m=n(79),p=n(15),x=n(198),v=n(195),y=n(200),g=n(201),k=n(96),w=n(2),I=function(e){var t=e.item,n=e.factorX,c=e.factorY,r=e.connectToLastItem,i=e.startNewItem,s=e.removeItem,u=e.svgHeight,b=Object(a.useState)(!1),d=Object(o.a)(b,2),h=d[0],f=d[1],O=Object(a.useState)("#0000004d"),m=Object(o.a)(O,2),p=m[0],I=m[1],C=Object(a.useState)(""),N=Object(o.a)(C,2),S=N[0],F=N[1],M=function(){return f(!1)};return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("rect",{x:t.position*n,y:0,width:t.duration*n,height:t.duration*c,style:{fill:p,strokeWidth:t.selected?"2":"1",stroke:"black"},onClick:function(e){e.altKey&&e.shiftKey?s():e.altKey?f(!0):e.shiftKey?r(t):i(t)}}),Object(w.jsx)("text",{x:n*(t.duration/2+t.position),y:u-t.duration*c-5,textAnchor:"middle",style:{transform:"scale(1, -1)",transformOrigin:"center"},children:S}),Object(w.jsxs)(x.a,{open:h,onClose:M,children:[Object(w.jsx)(v.a,{children:"Edit Box"}),Object(w.jsxs)(y.a,{children:[Object(w.jsx)(j.a,{label:"Label",size:"small",value:S,onChange:function(e){return F(e.target.value)},autoFocus:!0}),Object(w.jsx)(k.a,{color:p,onChange:I})]}),Object(w.jsx)(g.a,{children:Object(w.jsx)(l.a,{onClick:M,children:"Close"})})]})]})},C=function(e){var t=e.ceiledMaxDuration,n=e.y,a=e.width;return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("line",{className:"orientationLine",x1:0,y1:n,x2:a,y2:n,stroke:"black",strokeDasharray:"4"}),Object(w.jsxs)("text",{x:0,y:40,style:{transform:"scale(1, -1)",transformOrigin:"center"},children:[t,"s"]})]})},N=function(e){return function(t,n,a,c){var r=c[a+e];if(a%e!==0||!r)return t;var i=parseFloat(n.data[0]),o=parseFloat(r.data[0]);if(isNaN(i))return t;var s={position:i,duration:o-i,label:n.data[1],selected:!1};return[].concat(Object(p.a)(t),[s])}},S=function(e){var t=e.data,n=e.upbeat,c=e.levels,r=e.factorX,i=e.factorY,s=Object(a.useState)([]),l=Object(o.a)(s,2),u=l[0],b=l[1],j=function(e){var t=u.at(-1);t.duration+=e.duration,t.position=Math.min(t.position,e.position),b((function(e){return[].concat(Object(p.a)(e.slice(0,-1)),[t])}))},d=function(e){var t=Object(m.a)(Object(m.a)({},e),{},{selected:!0}),n=u.at(-1);n?(n.selected=!1,b((function(e){return[].concat(Object(p.a)(e.slice(0,-1)),[n,t])}))):b((function(e){return[].concat(Object(p.a)(e),[t])}))};if(!t)return null;var h=c.map((function(e){return t.slice(n).reduce(N(e),[])})).reduce((function(e,t){return[].concat(Object(p.a)(e),[t])}),[]),f=h[c.indexOf(1)];if(f){var O=t.slice(0,n+1).reduce(N(1),[]);f.push.apply(f,Object(p.a)(O))}var x=Math.max.apply(Math,[].concat(Object(p.a)(t.reduce(N(Math.max.apply(Math,Object(p.a)(c))),[]).map((function(e){return e.duration}))),Object(p.a)(u.map((function(e){return e.duration}))))),v=10*Math.ceil(x/10),y=v*i+50,g=t.at(-1).data[0]*r;return Object(w.jsxs)("svg",{width:g,height:y,style:{bottom:"1rem",position:"absolute",transform:"scale(1, -1)",transformOrigin:"center"},children:[Object(w.jsx)("g",{className:"connectedItems",children:u.map((function(e,t){return Object(w.jsx)(I,{item:e,factorX:r,factorY:i,connectToLastItem:j,startNewItem:d,removeItem:function(){b(u.filter((function(t){return t!==e})))},svgHeight:y},"connectedItem".concat(t))}))}),h&&h.reverse().map((function(e,t){return Object(w.jsx)("g",{className:"level".concat(t),children:e.map((function(e,t){return Object(w.jsx)(I,{item:e,factorX:r,factorY:i,connectToLastItem:j,startNewItem:d,removeItem:function(){b(u.filter((function(t){return t.position!==e.position&&t.duration!==e.duration})))},svgHeight:y},"box".concat(t))}))},"durations".concat(t))})),Object(w.jsx)(C,{ceiledMaxDuration:v,y:v*i,width:g})]})},F=(n(144),function(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)(0),h=Object(o.a)(i,2),m=h[0],p=h[1],x=Object(a.useState)([]),v=Object(o.a)(x,2),y=v[0],g=v[1],k=Object(a.useState)(1),I=Object(o.a)(k,2),C=I[0],N=I[1],F=Object(a.useState)(5),M=Object(o.a)(F,2),z=M[0],L=M[1],H=Object(a.useState)(!1),Y=Object(o.a)(H,2),X=Y[0],D=Y[1],E=c.a.createRef(),K=c.a.createRef(),R=function(e){E.current&&E.current.open(e)},T=function(e){E.current&&(E.current.removeFile(e),r(null))};return Object(w.jsxs)("div",{children:[Object(w.jsx)("div",{className:"options",children:Object(w.jsxs)(s.a,{children:[Object(w.jsx)(l.a,{onClick:function(){return D(!0)},children:"How to use?"}),Object(w.jsx)(O.a,{ref:E,onFileLoad:r,onError:function(e,t,n,a){return console.warn(e)},onRemoveFile:function(){r([])},children:function(e){var t=e.file;return Object(w.jsxs)("div",{className:"import",children:[Object(w.jsx)(l.a,{size:"small",variant:"contained",onClick:R,children:"open CSV file"}),t&&Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("div",{className:"filename",children:t&&t.name}),Object(w.jsx)(u.a,{title:"Delete",children:Object(w.jsx)(b.a,{onClick:T,children:Object(w.jsx)(f.a,{})})})]})]})}}),Object(w.jsx)(j.a,{size:"small",label:"Upbeat length",type:"number",value:m,onChange:function(e){return p(parseInt(e.target.value,10))}}),Object(w.jsx)(j.a,{size:"small",label:"Levels",placeholder:"e.g. 1, 3, 6",inputRef:K,onChange:function(){if(K.current){var e=K.current.value;if(e){var t=e.split(",").map((function(e){var t=parseInt(e,10);return isNaN(t)?0:t}));g(t)}else console.log("no level specified")}}}),Object(w.jsx)(j.a,{size:"small",label:"Horizontal stretch",placeholder:"must be a number",type:"number",value:C,onChange:function(e){return N(parseInt(e.target.value,10))}}),Object(w.jsx)(j.a,{size:"small",label:"Vertical stretch",placeholder:"must be a number",value:z,type:"number",onChange:function(e){return L(parseInt(e.target.value,10))}})]})}),Object(w.jsx)(S,{data:n,upbeat:m,levels:y,factorX:C,factorY:z}),Object(w.jsxs)(d.a,{className:"help",anchor:"right",open:X,onClose:function(){return D(!1)},children:[Object(w.jsx)("p",{children:"This tool takes time instants exported as a CSV file from Sonic Visualiser as input."}),Object(w.jsxs)("p",{children:['In the "levels" field you can specify, how the different metrical layers are combined. When putting "1", only the lowest metrical unit is displayed, meaning that every time instant is displayed as a box. When putting "3", every ',Object(w.jsx)("i",{children:"third"}),' instant is taken into account, meaning that the boxes combine three metrical units. When putting "1,3", both metrical layers are being displayed. You can specify an arbitrary amount of layers.']}),Object(w.jsx)("p",{children:"Upbeat measures can be specified by defining the number of instants that are part of an upbeat."}),Object(w.jsxs)("p",{children:["In case you want to combine two boxes outside a regular scheme that applies for the whole piece, you can do so be clicking on the first first box, then keeping the ",Object(w.jsx)("kbd",{children:"shift"})," key down and clicking on an adjecent box. A new box will appear that includes both."]}),Object(w.jsxs)("p",{children:["In order to delete wrongly combined boxes, hold ",Object(w.jsx)("kbd",{children:"shift"})," and ",Object(w.jsx)("kbd",{children:"alt"})," at the same time and click on the box to be delted."]}),Object(w.jsxs)("p",{children:["In order to change the visual appearence of a box, hold the ",Object(w.jsx)("kbd",{children:"alt"})," key and click on the box you want to edit. Here you can add a label text and change color and transparency of a box."]}),Object(w.jsx)("h2",{children:"Example"}),Object(w.jsx)("p",{children:"..."})]})]})}),M=document.getElementById("root");i.a.render(Object(w.jsx)(a.StrictMode,{children:Object(w.jsx)(F,{})}),M)}},[[147,1,2]]]);
//# sourceMappingURL=main.aa7cf5d1.chunk.js.map