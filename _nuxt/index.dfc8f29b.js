import{c as v,_ as N}from"./cosmos.6ec794fe.js";import{a as C,b as F,s as T,r as b,e as L,w as I,f as n,u as o,k as c,h as t,v as V,F as $,i as x,o as e,t as m,j as S,l as p}from"./entry.253d321c.js";import{c as B}from"./index.c279530c.js";import{u as D}from"./wallet.b2e934e2.js";const M=t("h2",null,"View my NFTs",-1),O={key:0},R={key:1},Y={key:0},j={key:1},q=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"NFT information"),t("th",null,"Your Listing")])],-1),E=["src"],P=t("br",null,null,-1),W=t("br",null,null,-1),z=t("br",null,null,-1),A=["onClick"],G=["onClick"],X=C({__name:"index",setup(H){const u=F(),_=D(),{wallet:l}=T(_),d=b([]);L(async()=>{l.value||await r(),l.value&&h()}),I(l,a=>{a&&h()});const{connect:r}=_;async function h(){d.value=await v(l.value)}async function w(a){u.push({path:`/listings/${a}`})}async function k(a,i){u.push({path:`/sell/${a}/${i}`})}return(a,i)=>{const f=N;return e(),n("div",null,[M,o(l)?(e(),n("section",R,[o(d).length?(e(),n("table",j,[q,t("tbody",null,[(e(!0),n($,null,x(o(d),(s,y)=>(e(),n("tr",null,[t("td",null,"#"+m(y+1),1),t("td",null,[t("h4",null,m(s.data.metadata.name),1),s.data.metadata.image?(e(),n("img",{key:0,src:o(B)(s.data.metadata.image),width:"64",height:"64"},null,8,E)):S("",!0),P,c(" Class ID: "),p(f,{"class-id":s.classId},null,8,["class-id"]),W,c(" NFT ID: "),p(f,{"class-id":s.classId,"nft-id":s.id},null,8,["class-id","nft-id"]),z,t("button",{onClick:g=>w(s.classId)},"View NFT Class Listing",8,A)]),t("td",null,[t("button",{onClick:g=>k(s.classId,s.id)},"Sell",8,G)])]))),256))])])):(e(),n("div",Y,"You don't own any NFT on LikeCoin chain"))])):(e(),n("div",O,[c("Please "),t("a",{href:"#",onClick:i[0]||(i[0]=V((...s)=>o(r)&&o(r)(...s),["prevent"]))},"connect"),c(" wallet")]))])}}});export{X as default};
