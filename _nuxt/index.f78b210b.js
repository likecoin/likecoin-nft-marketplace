import{c as E,_ as T}from"./index.1d8bb831.js";import{_ as x}from"./UserLink.vue_vue_type_script_setup_true_lang.0cd03fb6.js";import{a as S,b as V,r as k,e as I,f as M,h as l,u as n,i as t,F as R,j as D,k as w,o as i,t as c,l as d,m as u}from"./entry.cadb6f01.js";import{g as P,a as j,B as z}from"./cosmos.50c2661b.js";import{u as K}from"./metadata.6dceb473.js";const O={key:0},U=t("h2",null,"Recent NFT Listings",-1),q=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"NFT information"),t("th",null,"Listing Price")])],-1),A=["src"],G=t("br",null,null,-1),H=t("br",null,null,-1),J=t("br",null,null,-1),Q=["onClick"],W=["onClick"],nt=S({__name:"index",setup(X){const N=V(),o=k([]),_=k([]),y=K(),{getClassMetadataById:r,lazyFetchClassMetadata:C}=y;I(async()=>{o.value=await P(),_.value=await j(),await Promise.all(o.value.map(a=>C(a.class_id)))});const b=M(()=>{const a=new Set(_.value.map(e=>`${e.class_id}_${e.nft_id}_${e.seller}`));return o.value.filter(e=>!a.has(`${e.class_id}_${e.nft_id}_${e.creator}`))});function f(a){N.push({path:`/listings/${a}`})}return(a,e)=>{const h=T,F=x;return i(),l("div",null,[n(o).length?(i(),l("section",O,[U,t("table",null,[q,t("tbody",null,[(i(!0),l(R,null,D(n(b),(s,L)=>{var m,p,g,v,$;return i(),l("tr",{key:`${s.class_id}_${s.nft_id}`},[t("td",null,"#"+c(L+1),1),t("td",null,[t("div",null,[t("h4",null,c((m=n(r)(s.class_id))==null?void 0:m.name),1),(v=(g=(p=n(r)(s.class_id))==null?void 0:p.data)==null?void 0:g.metadata)!=null&&v.image?(i(),l("img",{key:0,src:n(E)(($=n(r)(s.class_id).data)==null?void 0:$.metadata.image),height:"64",width:"64"},null,8,A)):w("",!0),G,d(" Class ID: "),u(h,{"class-id":s.class_id},null,8,["class-id"]),H,d(" NFT ID: "),u(h,{"class-id":s.class_id,"nft-id":s.nft_id},null,8,["class-id","nft-id"]),J,d(" Owner: "),u(F,{wallet:s.creator},null,8,["wallet"])]),t("button",{onClick:B=>f(s.class_id)},"View NFT Class Listing",8,Q)]),t("td",null,[t("section",null,[t("div",null,c(new n(z)(s.price).shiftedBy(-9).toFixed())+"LIKE",1),t("div",null,"till "+c(s.expiration),1)]),t("button",{onClick:B=>f(s.class_id)},"View",8,W)])])}),128))])])])):w("",!0)])}}});export{nt as default};
