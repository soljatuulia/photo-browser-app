(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[915],{9347:function(t,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/albums/[id]",function(){return o(1401)}])},6484:function(t,e,o){"use strict";o.d(e,{I:function(){return E}});var n=o(5893),a=o(7294),r=o(1664),i=o.n(r),s=o(5675),l=o.n(s),c=o(1163),h=o(8207),u=o(8008),d=o(8318),p=o(6556),f=o(7502),_=o(356),g=o(5727),m=o(4410),x=o(8964),w=o(4998);let j=async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:12,o=await fetch("http://jsonplaceholder.typicode.com/photos?_page=".concat(t,"&_limit=").concat(e));if(!o.ok)throw Error("Failed to fetch photos");let n=Math.ceil(parseInt(o.headers.get("X-Total-Count")||"0",10)/e);return{photos:await o.json(),totalPages:n}},v=async function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:12,n=await fetch("https://jsonplaceholder.typicode.com/albums/".concat(t,"/photos?_page=").concat(e,"&_limit=").concat(o));if(!n.ok){if(404===n.status)throw Error("Album with ID ".concat(t," not found"));throw Error("Failed to fetch photos")}let a=Math.ceil(parseInt(n.headers.get("X-Total-Count")||"0",10)/o);return{photos:await n.json(),totalPages:a}};var y=o(5719),b=o.n(y);function E(t){let{initialPhotos:e,albumId:o,album:r}=t,s=(0,c.useRouter)(),y=Math.ceil(e.length/12),[E,N]=(0,a.useState)(Number(s.query.page)||1),[P,S]=(0,a.useState)(y),[k,C]=(0,a.useState)(Array.isArray(e)?e:[]),[I,T]=(0,a.useState)(""),[G,A]=(0,a.useState)(!1),M=(0,x.a)("(max-width: 768px)"),X=(0,x.a)("(max-width: 350px)");return(0,a.useEffect)(()=>{(async function(){A(!0);try{let t;let e=(t=o?await v(o,E):await j(E)).photos.filter(t=>t.title.toLowerCase().includes(I.toLowerCase()));C(e),S(t.totalPages),s.push({pathname:s.pathname,query:{...s.query,page:E}},void 0,{scroll:!1})}catch(t){}A(!1)})()},[E,o,I]),(0,n.jsx)("div",{children:(0,n.jsxs)(h.K,{gap:"lg",maw:500,className:b().container,children:[r?(0,n.jsxs)(u.D,{order:2,className:b().title,children:["Explore photos from ",r.title||"Untitled"]}):(0,n.jsx)(u.D,{order:2,children:"Explore All Photos"}),(0,n.jsx)(d.I,{className:b().search,placeholder:"Search photos by name",value:I,onChange:t=>T(t.currentTarget.value)}),G?(0,n.jsx)("div",{className:b().loader,children:(0,n.jsx)(p.a,{size:"lg",type:"bars",color:"pink"})}):k.length>0?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(f.M,{cols:X?1:M?2:3,spacing:15,children:k.map(t=>(0,n.jsx)("div",{"data-testid":"photo",children:(0,n.jsx)(i(),{href:"/photos/".concat(t.id),children:(0,n.jsx)(l(),{src:t.thumbnailUrl,alt:t.title,width:150,height:150,priority:!0})})},t.id))}),(0,n.jsx)(_.Z,{justify:"center",children:P>1&&(0,n.jsx)(g.t,{value:E,total:P,onChange:t=>{if(t<1||t>P){w.N9.show({title:"Oops!",color:"red",message:"Invalid page number"});return}N(t)},size:"md",color:"pink",siblings:1,boundaries:1})})]}):(0,n.jsx)(m.x,{children:"Sorry, no photos found!"})]})})}},1401:function(t,e,o){"use strict";o.r(e),o.d(e,{__N_SSG:function(){return r},default:function(){return i}});var n=o(5893),a=o(6484),r=!0;function i(t){let{photos:e=[],album:o,albumId:r}=t;return(0,n.jsx)("div",{children:(0,n.jsx)(a.I,{initialPhotos:e,albumId:r,album:o})})}},5719:function(t){t.exports={container:"PhotoGrid_container___Zp3b",title:"PhotoGrid_title__grEgl",search:"PhotoGrid_search__8cK2T",loader:"PhotoGrid_loader__Jehv2"}}},function(t){t.O(0,[967,381,888,774,179],function(){return t(t.s=9347)}),_N_E=t.O()}]);