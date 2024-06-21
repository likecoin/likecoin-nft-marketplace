import{c as S,_ as E}from"./index.bc15b548.js";import{_ as I}from"./UserLink.vue.432cdb06.js";import{f as T,g as V,r as k,h as x,i as M,o as l,c as i,j as a,a as t,F as R,k as D,l as w,t as c,d,b as u}from"./entry.7beecde4.js";import{g as P,a as j,B as z}from"./cosmos.d773931a.js";import{u as K}from"./metadata.90d43393.js";const O={key:0},U=t("h2",null,"Recent NFT Listings",-1),q=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"NFT information"),t("th",null,"Listing Price")])],-1),A=["src"],G=t("br",null,null,-1),H=t("br",null,null,-1),J=t("br",null,null,-1),Q=["onClick"],W=["onClick"],nt=T({__name:"index",setup(X){const N=V(),o=k([]),_=k([]),y=K(),{getClassMetadataById:r,lazyFetchClassMetadata:C}=y;x(async()=>{o.value=await P(),_.value=await j(),await Promise.all(o.value.map(e=>C(e.class_id)))});const b=M(()=>{const e=new Set(_.value.map(n=>`${n.message.class_id}_${n.message.nft_id}_${n.message.seller}`));return o.value.filter(n=>!e.has(`${n.class_id}_${n.nft_id}_${n.creator}`))});function m(e){N.push({path:`/listings/${e}`})}return(e,n)=>{const f=E,F=I;return l(),i("div",null,[a(o).length?(l(),i("section",O,[U,t("table",null,[q,t("tbody",null,[(l(!0),i(R,null,D(a(b),(s,L)=>{var g,h,p,v,$;return l(),i("tr",{key:`${s.class_id}_${s.nft_id}`},[t("td",null,"#"+c(L+1),1),t("td",null,[t("div",null,[t("h4",null,c((g=a(r)(s.class_id))==null?void 0:g.name),1),(v=(p=(h=a(r)(s.class_id))==null?void 0:h.data)==null?void 0:p.metadata)!=null&&v.image?(l(),i("img",{key:0,src:("convertImageSrc"in e?e.convertImageSrc:a(S))(($=a(r)(s.class_id).data)==null?void 0:$.metadata.image),height:"64",width:"64"},null,8,A)):w("",!0),G,d(" Class ID: "),u(f,{"class-id":s.class_id},null,8,["class-id"]),H,d(" NFT ID: "),u(f,{"class-id":s.class_id,"nft-id":s.nft_id},null,8,["class-id","nft-id"]),J,d(" Owner: "),u(F,{wallet:s.creator},null,8,["wallet"])]),t("button",{onClick:B=>m(s.class_id)},"View NFT Class Listing",8,Q)]),t("td",null,[t("section",null,[t("div",null,c(new a(z)(s.price).shiftedBy(-9).toFixed())+"LIKE",1),t("div",null,"till "+c(s.expiration),1)]),t("button",{onClick:B=>m(s.class_id)},"View",8,W)])])}),128))])])])):w("",!0)])}}});export{nt as default};