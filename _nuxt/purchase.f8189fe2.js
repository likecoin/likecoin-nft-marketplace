import{a as p,B as m,_ as N}from"./cosmos.d884c707.js";import{_ as b}from"./UserLink.vue_vue_type_script_setup_true_lang.51748efb.js";import{a as F,b as g,r as k,e as w,u as a,f as o,h as l,F as y,i as B,j as v,o as u,t as _,k as s,l as e}from"./entry.fae9e558.js";const C={key:0},T=l("h2",null,"Recent NFT Purchases",-1),L=l("thead",null,[l("tr",null,[l("th",null,"#"),l("th",null,"NFT information"),l("th",null,"Purchase Price")])],-1),V=l("br",null,null,-1),x=l("br",null,null,-1),E=l("br",null,null,-1),$=["onClick"],K=F({__name:"purchase",setup(D){const d=g(),t=k([]);w(async()=>{t.value=await p()});function h(r){d.push({path:`/listings/${r}`})}return(r,I)=>{const c=N,i=b;return a(t).length?(u(),o("section",C,[T,l("table",null,[L,l("tbody",null,[(u(!0),o(y,null,B(a(t),(n,f)=>(u(),o("tr",null,[l("td",null,"#"+_(f+1),1),l("td",null,[l("div",null,[s(" Class ID: "),e(c,{"class-id":n.class_id},null,8,["class-id"]),V,s(" NFT ID: "),e(c,{"class-id":n.class_id,"nft-id":n.nft_id},null,8,["class-id","nft-id"]),x,s(" Seller: "),e(i,{wallet:n.seller},null,8,["wallet"]),E,s(" Buyer: "),e(i,{wallet:n.creator},null,8,["wallet"])]),l("button",{onClick:P=>h(n.class_id)},"View NFT Class Listing",8,$)]),l("td",null,[l("section",null,[l("div",null,_(new a(m)(n.price).shiftedBy(-9).toFixed())+"LIKE",1)])])]))),256))])])])):v("",!0)}}});export{K as default};
